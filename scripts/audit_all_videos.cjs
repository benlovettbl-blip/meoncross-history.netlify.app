const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const unitsDir = path.join(__dirname, '..', 'units');

function parseIsoDuration(iso) {
  if (!iso || !iso.startsWith('PT')) return null;
  let hours = 0,
    minutes = 0,
    seconds = 0;
  const hMatch = iso.match(/(\d+)H/);
  const mMatch = iso.match(/(\d+)M/);
  const sMatch = iso.match(/(\d+)S/);
  if (hMatch) hours = parseInt(hMatch[1], 10);
  if (mMatch) minutes = parseInt(mMatch[1], 10);
  if (sMatch) seconds = parseInt(sMatch[1], 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let formatted = '';
  if (hours > 0) {
    formatted = `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    formatted = `${minutes} min${minutes !== 1 ? 's' : ''} ${seconds} sec${seconds !== 1 ? 's' : ''}`;
  } else {
    formatted = `${seconds} sec${seconds !== 1 ? 's' : ''}`;
  }
  return { hours, minutes, seconds, totalSeconds, formatted };
}

function fetchUrlMeta(targetUrl) {
  return new Promise((resolve) => {
    if (!targetUrl || typeof targetUrl !== 'string') {
      return resolve({ statusCode: 0, error: 'Empty or invalid URL string' });
    }

    if (targetUrl.startsWith('/')) {
      // Local media file
      const localPath = path.join(__dirname, '..', 'public', targetUrl);
      const exists = fs.existsSync(localPath);
      return resolve({
        statusCode: exists ? 200 : 404,
        isLocal: true,
        localPath: targetUrl,
        officialTitle: path.basename(targetUrl),
        durationParsed: null,
      });
    }

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      return resolve({ statusCode: 0, error: `Unsupported protocol: ${targetUrl}` });
    }

    let client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(
      targetUrl,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        timeout: 10000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (redirectUrl.startsWith('/')) {
            try {
              const parsed = new URL(targetUrl);
              redirectUrl = `${parsed.origin}${redirectUrl}`;
            } catch (e) {
              return resolve({ statusCode: res.statusCode, error: 'Bad redirect URL' });
            }
          }
          return resolve(fetchUrlMeta(redirectUrl));
        }

        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
          if (body.length > 250000) {
            res.destroy();
          }
        });

        res.on('close', () => {
          const meta = {
            statusCode: res.statusCode,
            officialTitle: null,
            durationIso: null,
            durationParsed: null,
            synopsis: null,
            series: null,
            episode: null,
          };

          // 1. Check JSON-LD
          const ldMatch = body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
          if (ldMatch) {
            try {
              const ld = JSON.parse(ldMatch[1]);
              if (ld.name) meta.officialTitle = ld.name;
              if (ld.duration) {
                meta.durationIso = ld.duration;
                meta.durationParsed = parseIsoDuration(ld.duration);
              }
              if (ld.description) meta.synopsis = ld.description;
              if (ld.partOfSeries && ld.partOfSeries.name) meta.series = ld.partOfSeries.name;
            } catch (e) {}
          }

          // 2. Check HTML Duration banner if not in JSON-LD
          if (!meta.durationParsed) {
            const durBannerMatch = body.match(/Duration:<\/span>\s*(\d+)'(\d+)''/i);
            if (durBannerMatch) {
              const m = parseInt(durBannerMatch[1], 10);
              const s = parseInt(durBannerMatch[2], 10);
              const totalSec = m * 60 + s;
              meta.durationParsed = {
                hours: 0,
                minutes: m,
                seconds: s,
                totalSeconds: totalSec,
                formatted: `${m} mins ${s} secs`,
              };
            }
          }

          // 3. Fallback Title
          if (!meta.officialTitle) {
            const titleTag = body.match(/<title>([^<]+)<\/title>/i);
            if (titleTag) {
              meta.officialTitle = titleTag[1]
                .replace(/ - Educational Recording Agency.*$/i, '')
                .trim();
            }
          }

          // 4. Programme Details
          const progMatch = body.match(/Programme:\s*([^<\n]+)/i);
          if (progMatch)
            meta.series = (meta.series ? meta.series + ' / ' : '') + progMatch[1].trim();

          const epMatch = body.match(/Episode:\s*([^<\n]+)/i);
          if (epMatch) meta.episode = epMatch[1].trim();

          resolve(meta);
        });
      },
    );

    req.on('error', (err) => resolve({ statusCode: 0, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ statusCode: 0, error: 'timeout' });
    });
  });
}

async function run() {
  console.log('🚀 Scanning all unit data.js files for videos...');
  const dirs = fs
    .readdirSync(unitsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const allVideos = [];

  for (const unitId of dirs) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) continue;
    try {
      const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
      const mod = await import(fileUrl);
      const data = mod.default || mod.unitData || mod[unitId];
      if (data && data.lessons) {
        data.lessons.forEach((lesson, lIdx) => {
          const vList = lesson.video || lesson.videos || [];
          if (Array.isArray(vList)) {
            vList.forEach((v, vIdx) => {
              allVideos.push({
                unitId,
                unitTitle: data.title || unitId,
                lessonIndex: lIdx + 1,
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                videoIndex: vIdx,
                currentTitle: v.title,
                currentDuration: v.duration,
                currentGuidance: v.teacher_guidance || '',
                url: v.url,
              });
            });
          }
        });
      }
    } catch (err) {
      console.warn(`Could not import ${unitId}:`, err.message);
    }
  }

  console.log(
    `Found ${allVideos.length} total videos across repository. Starting metadata fetch...`,
  );

  // Batch process with concurrency limit of 5
  const concurrency = 6;
  const results = [];
  let completed = 0;

  async function worker(queue) {
    while (queue.length > 0) {
      const item = queue.shift();
      const meta = await fetchUrlMeta(item.url);
      results.push({ ...item, meta });
      completed++;
      if (completed % 20 === 0 || completed === allVideos.length) {
        console.log(
          `  Progress: ${completed}/${allVideos.length} (${Math.round((completed / allVideos.length) * 100)}%)`,
        );
      }
    }
  }

  const queue = [...allVideos];
  const workers = [];
  for (let i = 0; i < concurrency; i++) {
    workers.push(worker(queue));
  }
  await Promise.all(workers);

  // Analyze findings
  const durationDiscrepancies = [];
  const deadLinks = [];
  const fullDocumentarySurveys = [];
  const potentialMismatches = [];

  for (const item of results) {
    const meta = item.meta;
    if (meta.statusCode !== 200) {
      deadLinks.push(item);
      continue;
    }

    // Check duration discrepancy (if actual duration differs by > 3 minutes)
    if (meta.durationParsed && item.currentDuration) {
      const recordedMinutesMatch = item.currentDuration.match(/(\d+)\s*mins?/i);
      const recordedSecondsMatch = item.currentDuration.match(/(\d+)\s*secs?/i);
      let recordedTotalSec = 0;
      if (recordedMinutesMatch) recordedTotalSec += parseInt(recordedMinutesMatch[1], 10) * 60;
      if (recordedSecondsMatch) recordedTotalSec += parseInt(recordedSecondsMatch[1], 10);

      const diffSec = Math.abs(recordedTotalSec - meta.durationParsed.totalSeconds);
      if (diffSec > 180) {
        // > 3 minutes difference
        durationDiscrepancies.push({
          unitId: item.unitId,
          lesson: `L${item.lessonIndex}: ${item.lessonTitle}`,
          videoTitle: item.currentTitle,
          url: item.url,
          recordedDuration: item.currentDuration,
          actualDuration: meta.durationParsed.formatted,
          diffMinutes: Math.round(diffSec / 60),
        });
      }
    }

    // Check for full documentary surveys (> 18 mins) placed in specific topical lessons
    if (meta.durationParsed && meta.durationParsed.totalSeconds >= 1200) {
      const isHistoryFile =
        (meta.officialTitle && meta.officialTitle.includes('History File')) ||
        (item.currentTitle && item.currentTitle.includes('History File'));
      fullDocumentarySurveys.push({
        unitId: item.unitId,
        lesson: `L${item.lessonIndex}: ${item.lessonTitle}`,
        videoTitle: item.currentTitle,
        officialTitle: meta.officialTitle,
        duration: meta.durationParsed.formatted,
        isHistoryFile,
        url: item.url,
      });
    }

    // Check for obvious thematic/chronological anomalies
    const lessonLower = item.lessonTitle.toLowerCase();
    const vidLower = (
      (item.currentTitle || '') +
      ' ' +
      (meta.officialTitle || '') +
      ' ' +
      (meta.synopsis || '')
    ).toLowerCase();

    if (item.unitId === 'edexcel_medicine') {
      if (
        lessonLower.includes('renaissance') &&
        vidLower.includes('middle ages') &&
        !vidLower.includes('renaissance')
      ) {
        potentialMismatches.push({
          unitId: item.unitId,
          lesson: `L${item.lessonIndex}: ${item.lessonTitle}`,
          videoTitle: item.currentTitle,
          issue: 'Medieval video placed in Renaissance lesson',
          url: item.url,
        });
      }
      if (lessonLower.includes('germ theory') && vidLower.includes('four humours')) {
        potentialMismatches.push({
          unitId: item.unitId,
          lesson: `L${item.lessonIndex}: ${item.lessonTitle}`,
          videoTitle: item.currentTitle,
          issue: 'Ancient/Medieval concept in 19th Century Germ Theory lesson',
          url: item.url,
        });
      }
    }
  }

  const report = {
    totalScanned: results.length,
    deadLinksCount: deadLinks.length,
    durationDiscrepanciesCount: durationDiscrepancies.length,
    fullDocumentarySurveysCount: fullDocumentarySurveys.length,
    potentialMismatchesCount: potentialMismatches.length,
    deadLinks,
    durationDiscrepancies,
    fullDocumentarySurveys,
    potentialMismatches,
    allResults: results,
  };

  const outputPath = path.join(__dirname, '..', 'public', 'video_audit_cache.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n✅ Audit complete! Cached raw data to public/video_audit_cache.json`);
  console.log(`- Total Scanned: ${results.length}`);
  console.log(`- Dead / Error Links: ${deadLinks.length}`);
  console.log(
    `- Significant Duration Discrepancies (>3 mins off): ${durationDiscrepancies.length}`,
  );
  console.log(
    `- Full-Length Documentary Surveys (>=20 mins in lesson): ${fullDocumentarySurveys.length}`,
  );
  console.log(`- Obvious Topic/Period Mismatches: ${potentialMismatches.length}`);
}

run().catch((err) => {
  console.error('Fatal error in audit script:', err);
  process.exit(1);
});
