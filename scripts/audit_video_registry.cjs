const fs = require('fs');
const path = require('path');

const targetUnit = process.argv[2] || 'edexcel_medicine';
const dataPath = path.join(__dirname, '..', 'units', targetUnit, 'data.js');

const { pathToFileURL } = require('url');

if (!fs.existsSync(dataPath)) {
  console.error(`Error: Unit data not found at ${dataPath}`);
  process.exit(1);
}

// Simple in-memory cache to avoid duplicate network calls
const cache = new Map();

function parseIsoDuration(durationStr) {
  // e.g. PT5M13S, PT1H2M3S, PT45S
  if (!durationStr || !durationStr.startsWith('PT')) return null;
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
  }
  return `${minutes} min${minutes !== 1 ? 's' : ''} ${seconds} sec${seconds !== 1 ? 's' : ''}`;
}

function parseEraDuration(rawDuration) {
  // e.g. 5'00'', 24'08'', 1h 24'
  if (!rawDuration) return null;
  const clean = rawDuration.trim();
  const mMatch = clean.match(/(\d+)'(\d+)''/);
  if (mMatch) {
    const mins = parseInt(mMatch[1], 10);
    const secs = parseInt(mMatch[2], 10);
    return `${mins} min${mins !== 1 ? 's' : ''} ${secs} sec${secs !== 1 ? 's' : ''}`;
  }
  return clean;
}

async function fetchMetadata(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const result = {
    url,
    provider: 'Unknown',
    realTitle: null,
    realDuration: null,
    realDesc: null,
    channel: null,
    programme: null,
    episode: null,
    status: null,
    error: null,
  };

  try {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      result.provider = 'YouTube';
      // Fetch oEmbed for clean title and author
      try {
        const oembedRes = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
        );
        if (oembedRes.ok) {
          const oe = await oembedRes.json();
          result.realTitle = oe.title;
          result.channel = oe.author_name;
        }
      } catch (e) {
        // ignore oembed failure
      }

      // Fetch page for duration and description
      const pageRes = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-GB,en;q=0.9',
        },
      });
      result.status = pageRes.status;
      if (pageRes.ok) {
        const html = await pageRes.text();
        const durMatch = html.match(/itemprop="duration" content="([^"]+)"/i);
        if (durMatch) {
          result.realDuration = parseIsoDuration(durMatch[1]);
        }
        const descMatch = html.match(/<meta name="description" content="([^"]+)"/i);
        if (descMatch) {
          result.realDesc = descMatch[1]
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
        }
      }
    } else if (url.includes('era.org.uk')) {
      result.provider = 'ERA';
      const pageRes = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-GB,en;q=0.9',
        },
      });
      result.status = pageRes.status;
      if (pageRes.ok) {
        const html = await pageRes.text();

        // Title
        const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i);
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (ogTitle) {
          result.realTitle = ogTitle[1]
            .replace(/\s*\|\s*Educational Recording Agency/i, '')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, '&');
        } else if (titleMatch) {
          result.realTitle = titleMatch[1]
            .replace(/\s*\|\s*Educational Recording Agency/i, '')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, '&');
        }

        // Duration
        const durMatch = html.match(
          /<span class="resource-image-banner__label">Duration:<\/span>\s*([^<]+)<\/p>/i,
        );
        if (durMatch) {
          result.realDuration = parseEraDuration(durMatch[1]);
        }

        // Description
        const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/i);
        if (ogDesc) {
          result.realDesc = ogDesc[1]
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
        }

        // Programme info
        const progMatch = html.match(/<li>Programme:\s*([^<]+)<\/li>/i);
        if (progMatch) result.programme = progMatch[1].trim();

        const epMatch = html.match(/<li>Episode:\s*([^<]+)<\/li>/i);
        if (epMatch) result.episode = epMatch[1].trim();
      }
    } else {
      result.provider = 'Other';
      result.status = 200;
    }
  } catch (err) {
    result.error = err.message;
  }

  cache.set(url, result);
  return result;
}

async function auditUnit() {
  console.log(`\n========================================================================`);
  console.log(`🔍 AUDITING VIDEO REGISTRY FOR UNIT: [${targetUnit}]`);
  console.log(`========================================================================\n`);

  const unitModule = await import(pathToFileURL(dataPath).href);
  const unit = unitModule.unitData;
  const lessons = unit.lessons || [];

  const urlRegistry = new Map(); // url -> list of lessons using it
  const discrepancies = [];
  const thematicSurveys = [];
  const duplicateAlerts = [];

  let totalVideos = 0;

  for (let idx = 0; idx < lessons.length; idx++) {
    const lesson = lessons[idx];
    let raw = lesson.videos || lesson.video || [];
    const vids = Array.isArray(raw) ? raw : [raw];
    if (vids.length === 0) continue;

    console.log(`[Lesson ${idx + 1}/${lessons.length}] ${lesson.title}`);

    for (let vIdx = 0; vIdx < vids.length; vIdx++) {
      const v = vids[vIdx];
      totalVideos++;
      if (!v.url) {
        discrepancies.push({
          lesson: lesson.title,
          lessonId: lesson.id,
          issue: 'Missing URL in video entry',
          details: v,
        });
        continue;
      }

      // Track duplicate URLs
      if (!urlRegistry.has(v.url)) {
        urlRegistry.set(v.url, []);
      }
      urlRegistry.get(v.url).push({
        lessonIdx: idx + 1,
        lessonTitle: lesson.title,
        statedTitle: v.title,
      });

      process.stdout.write(`   Fetching metadata for: ${v.url.slice(0, 60)}... `);
      const meta = await fetchMetadata(v.url);
      console.log(`[${meta.provider}] HTTP ${meta.status || 'ERR'}`);

      // Check duration
      const statedDuration = (v.duration || '').trim();
      const realDuration = (meta.realDuration || '').trim();

      const itemAudit = {
        lessonIndex: idx + 1,
        lessonTitle: lesson.title,
        lessonId: lesson.id,
        statedTitle: v.title,
        statedDuration: statedDuration,
        realTitle: meta.realTitle,
        realDuration: realDuration,
        realDesc: meta.realDesc,
        programme: meta.programme,
        episode: meta.episode,
        url: v.url,
        flags: [],
      };

      // Flag duration mismatches
      if (realDuration && statedDuration) {
        // Normalise numbers for comparison
        const statedDigits = (statedDuration.match(/\d+/g) || []).join(':');
        const realDigits = (realDuration.match(/\d+/g) || []).join(':');
        if (statedDigits !== realDigits) {
          // If difference is significant (>1 min)
          itemAudit.flags.push(
            `DURATION MISMATCH: Stated "${statedDuration}" vs Real "${realDuration}"`,
          );
        }
      }

      // Flag History File / Multi-period surveys
      const isHistoryFile =
        (meta.realTitle && meta.realTitle.toLowerCase().includes('history file')) ||
        (meta.programme && meta.programme.toLowerCase().includes('history file')) ||
        v.url.includes('history-file');
      if (isHistoryFile) {
        itemAudit.flags.push(
          `THEMATIC SURVEY: BBC History File (broad cross-period series, 20+ mins)`,
        );
        thematicSurveys.push(itemAudit);
      }

      // Flag period mismatch
      const lessonTitleLower = lesson.title.toLowerCase();
      const metaTitleLower = (meta.realTitle || '').toLowerCase();
      const metaDescLower = (meta.realDesc || '').toLowerCase();

      // Check if Medieval video in Renaissance or 19th Century
      if (
        (lessonTitleLower.includes('c1500') ||
          lessonTitleLower.includes('renaissance') ||
          lessonTitleLower.includes('c1700')) &&
        (metaTitleLower.includes('middle ages') ||
          metaTitleLower.includes('medieval') ||
          metaDescLower.includes('middle ages'))
      ) {
        itemAudit.flags.push(`PERIOD MISMATCH: Medieval video found in Renaissance lesson`);
      }
      if (
        (lessonTitleLower.includes('1861') ||
          lessonTitleLower.includes('germ theory') ||
          lessonTitleLower.includes('19th century') ||
          lessonTitleLower.includes('kt3.')) &&
        (metaTitleLower.includes('middle ages') || metaTitleLower.includes('galen and leonardo'))
      ) {
        itemAudit.flags.push(`PERIOD MISMATCH: Pre-modern video found in 19th Century lesson`);
      }

      if (itemAudit.flags.length > 0) {
        discrepancies.push(itemAudit);
      }
    }
  }

  // Check for duplicates
  for (const [url, uses] of urlRegistry.entries()) {
    if (uses.length > 1) {
      duplicateAlerts.push({
        url,
        uses,
      });
    }
  }

  // Print Summary Report
  console.log(`\n========================================================================`);
  console.log(`📋 AUDIT RESULTS FOR [${targetUnit}]`);
  console.log(`   Total Lessons: ${lessons.length}`);
  console.log(`   Total Videos Audited: ${totalVideos}`);
  console.log(`   Flagged Issues: ${discrepancies.length}`);
  console.log(`   Duplicate URLs Across Lessons: ${duplicateAlerts.length}`);
  console.log(`   Thematic Cross-Period Surveys (History File): ${thematicSurveys.length}`);
  console.log(`========================================================================\n`);

  if (duplicateAlerts.length > 0) {
    console.log(`🚨 DUPLICATE URLS PASTED INTO MULTIPLE LESSONS:`);
    duplicateAlerts.forEach((dup, i) => {
      console.log(`\n[Duplicate ${i + 1}] URL: ${dup.url}`);
      dup.uses.forEach((u) => {
        console.log(`   - Lesson ${u.lessonIdx}: "${u.lessonTitle}"`);
        console.log(`     Pasted Title: "${u.statedTitle}"`);
      });
    });
  }

  if (discrepancies.length > 0) {
    console.log(`\n⚠️ FLAGGED DISCREPANCIES & REALIGNMENT OPPORTUNITIES:`);
    discrepancies.forEach((d, i) => {
      console.log(`\n[Issue ${i + 1}] Lesson ${d.lessonIndex}: ${d.lessonTitle}`);
      console.log(`   URL: ${d.url}`);
      console.log(`   Stated Title: "${d.statedTitle}"`);
      console.log(`   Real Title:   "${d.realTitle}"`);
      console.log(`   Stated Time:  ${d.statedDuration} | Real Time: ${d.realDuration}`);
      if (d.realDesc) {
        console.log(`   Real Desc:    ${d.realDesc.slice(0, 140)}...`);
      }
      d.flags.forEach((f) => console.log(`   🚩 ${f}`));
    });
  }

  // Save report to scratch
  const reportPath = path.join(__dirname, '..', 'scratch', `video_audit_${targetUnit}.json`);
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        unit: targetUnit,
        date: new Date().toISOString(),
        totalVideos,
        discrepancies,
        duplicateAlerts,
        thematicSurveys,
      },
      null,
      2,
    ),
  );

  console.log(`\nDetailed JSON report saved to: ${reportPath}`);
}

auditUnit().catch(console.error);
