const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT_DIR = path.join(__dirname, '..');
const unitsDir = path.join(ROOT_DIR, 'units');

const targetUnit = process.argv[2];

// Extract YouTube Video ID from various URL formats
function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i,
  );
  return match ? match[1] : null;
}

// Check if a YouTube video is live using the official public oEmbed endpoint
function checkYouTubeLive(videoId) {
  return new Promise((resolve) => {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const req = https.get(
      oembedUrl,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 8000 },
      (res) => {
        if (res.statusCode === 200) {
          resolve({ live: true, status: 200 });
        } else if (res.statusCode === 404) {
          resolve({ live: false, status: 404, reason: 'Video Deleted or Not Found' });
        } else if (res.statusCode === 401 || res.statusCode === 403) {
          resolve({ live: false, status: res.statusCode, reason: 'Video Private or Restricted' });
        } else {
          // Other status codes (e.g., 400 Bad Request, etc.)
          resolve({ live: false, status: res.statusCode, reason: `HTTP ${res.statusCode}` });
        }
      },
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ live: false, status: 0, reason: 'Connection Timeout (8s)' });
    });

    req.on('error', (err) => {
      resolve({ live: false, status: 0, reason: err.message });
    });
  });
}

// Sleep helper to avoid overwhelming YouTube rate limits
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log('======================================================');
  console.log('🛡️ VIDEO LINK HEALTH CHECKER & REPOSITORY AUDIT');
  console.log('======================================================');
  console.log(
    'Safeguard Rule: All ERA (era.org.uk) resources are explicitly preserved and never pinged.',
  );
  console.log('Audit Target: Checking YouTube video availability via official oEmbed endpoint.\n');

  const unitDirs = fs
    .readdirSync(unitsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((id) => !targetUnit || id === targetUnit);

  let totalVideos = 0;
  let totalEra = 0;
  let totalYouTube = 0;
  let liveCount = 0;
  let brokenCount = 0;
  const brokenList = [];

  for (const unitId of unitDirs) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) continue;

    let unitData;
    try {
      const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
      const module = await import(fileUrl);
      unitData = module.default || module.unitData || module[unitId];
    } catch (e) {
      continue;
    }

    if (!unitData || !Array.isArray(unitData.lessons)) continue;

    console.log(`\n📚 Checking Unit: [${unitId}] (${unitData.title || unitId})`);
    let unitBrokenCount = 0;

    for (const lesson of unitData.lessons) {
      if (!lesson.video) continue;

      const videoList = Array.isArray(lesson.video) ? lesson.video : [lesson.video];

      for (const v of videoList) {
        if (!v || !v.url) continue;
        totalVideos++;

        // SAFEGUARD: Skip ERA (Educational Recording Agency) links completely
        if (v.url.includes('era.org.uk') || v.type === 'era') {
          totalEra++;
          continue;
        }

        const ytId = getYouTubeId(v.url);
        if (ytId) {
          totalYouTube++;
          process.stdout.write(`   ▶ [${lesson.id}] "${v.title || 'Untitled'}"... `);

          const result = await checkYouTubeLive(ytId);
          await sleep(150); // slight throttle

          if (result.live) {
            console.log(`✅ Live`);
            liveCount++;
          } else {
            console.log(`❌ BROKEN (${result.reason})`);
            brokenCount++;
            unitBrokenCount++;
            brokenList.push({
              unit: unitId,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              videoTitle: v.title || 'Untitled',
              url: v.url,
              reason: result.reason,
            });
          }
        }
      }
    }

    if (unitBrokenCount === 0) {
      console.log(`   ✨ All checked videos in ${unitId} are 100% healthy.`);
    }
  }

  console.log('\n======================================================');
  console.log('📊 AUDIT SUMMARY REPORT');
  console.log('======================================================');
  console.log(`Total Video References Scanned: ${totalVideos}`);
  console.log(`🔒 ERA Institutional Links Safely Protected: ${totalEra}`);
  console.log(`▶️ YouTube Videos Checked: ${totalYouTube}`);
  console.log(`✅ Healthy / Live Videos: ${liveCount}`);
  console.log(`❌ Broken / Unavailable Videos: ${brokenCount}`);
  console.log('======================================================\n');

  if (brokenList.length > 0) {
    console.log('🚨 BROKEN VIDEOS REQUIRING ATTENTION:');
    brokenList.forEach((item, idx) => {
      console.log(`\n${idx + 1}. [${item.unit} / ${item.lessonId}] ${item.videoTitle}`);
      console.log(`   Lesson: ${item.lessonTitle}`);
      console.log(`   URL:    ${item.url}`);
      console.log(`   Issue:  ${item.reason}`);
    });
    console.log(
      '\nTip: You can safely remove or replace these video links without affecting ERA content.',
    );
  } else {
    console.log('🎉 100% HEALTHY: No dead YouTube links found across scanned units!');
  }
})();
