const fs = require('fs');
const path = require('path');

const unitsDir = path.resolve('units');
const unitDirs = fs
  .readdirSync(unitsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((id) => id !== 'trip_ypres'); // Ignoring battlefield tour as requested by user

(async () => {
  const table = [];
  const lessonsWithoutVideos = [];
  const lessonsWithVideos = [];
  let totalLessonsAcrossApp = 0;
  let totalLessonsWithVideos = 0;
  let totalVideosCount = 0;
  let totalYouTubeCount = 0;
  let totalEraCount = 0;
  let missingDurationsCount = 0;
  let hasDurationsCount = 0;

  for (const unitId of unitDirs) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) continue;

    let mod;
    try {
      mod = await import('file:///' + dataPath.replace(/\\/g, '/'));
    } catch (e) {
      console.error('Failed to import ' + unitId, e.message);
      continue;
    }
    const unitData = mod.default || mod.unitData || mod[unitId];
    if (!unitData || !Array.isArray(unitData.lessons)) continue;

    let unitWithVideo = 0;
    let unitVideos = 0;
    let unitYt = 0;
    let unitEra = 0;

    unitData.lessons.forEach((l, idx) => {
      totalLessonsAcrossApp++;
      let vids = [];
      if (l.video) vids = vids.concat(Array.isArray(l.video) ? l.video : [l.video]);
      if (l.extra_videos)
        vids = vids.concat(Array.isArray(l.extra_videos) ? l.extra_videos : [l.extra_videos]);
      vids = vids.filter((v) => v && (v.url || v.youtube_id));

      if (vids.length > 0) {
        unitWithVideo++;
        totalLessonsWithVideos++;
        unitVideos += vids.length;
        totalVideosCount += vids.length;

        vids.forEach((v) => {
          const isYt = v.url?.includes('youtu') || v.youtube_id || v.type === 'youtube';
          const isEra = v.url?.includes('era.org.uk') || v.type === 'era';
          if (isYt) {
            unitYt++;
            totalYouTubeCount++;
          } else if (isEra) {
            unitEra++;
            totalEraCount++;
          }

          if (
            v.duration &&
            !v.duration.includes('not found') &&
            !v.duration.includes('Placeholder') &&
            !v.duration.includes('Short clip')
          ) {
            hasDurationsCount++;
          } else {
            missingDurationsCount++;
          }
        });

        lessonsWithVideos.push({
          unitId,
          unitTitle: unitData.title || unitId,
          lessonIndex: idx + 1,
          lessonTitle: l.title,
          videoCount: vids.length,
          videos: vids.map((v) => ({
            title: v.title,
            url: v.url,
            duration: v.duration || 'MISSING DURATION',
          })),
        });
      } else {
        lessonsWithoutVideos.push({
          unitId,
          unitTitle: unitData.title || unitId,
          lessonIndex: idx + 1,
          lessonTitle: l.title,
        });
      }
    });

    table.push({
      id: unitId,
      title: (unitData.title || unitId).substring(0, 32),
      lessons: unitData.lessons.length,
      withVideo: unitWithVideo,
      noVideo: unitData.lessons.length - unitWithVideo,
      videos: unitVideos,
      youtube: unitYt,
      era: unitEra,
    });
  }

  console.log('=== APP-WIDE CURRICULUM VIDEO AUDIT (Excluding Battlefield Tour) ===\n');
  console.table(table);

  console.log('----------------------------------------------------');
  console.log(`📊 TOTAL LESSONS IN CURRICULUM: ${totalLessonsAcrossApp}`);
  console.log(
    `✅ LESSONS WITH EMBEDDED VIDEOS: ${totalLessonsWithVideos} (${Math.round((totalLessonsWithVideos / totalLessonsAcrossApp) * 100)}%)`,
  );
  console.log(
    `❌ LESSONS WITHOUT ANY VIDEOS:   ${lessonsWithoutVideos.length} (${Math.round((lessonsWithoutVideos.length / totalLessonsAcrossApp) * 100)}%)`,
  );
  console.log(
    `🎬 TOTAL VIDEO CLIPS EMBEDDED:   ${totalVideosCount} (YouTube: ${totalYouTubeCount}, ERA Broadcasts: ${totalEraCount})`,
  );
  console.log(`⏱️ VIDEOS WITH EXPLICIT DURATION: ${hasDurationsCount}`);
  console.log(`⚠️ VIDEOS MISSING DURATION:      ${missingDurationsCount}`);
  console.log('----------------------------------------------------\n');

  console.log(`=== FULL LIST OF ${lessonsWithoutVideos.length} LESSONS WITHOUT ANY VIDEOS ===`);
  const groupedByUnit = {};
  lessonsWithoutVideos.forEach((l) => {
    if (!groupedByUnit[l.unitTitle]) groupedByUnit[l.unitTitle] = [];
    groupedByUnit[l.unitTitle].push(l);
  });

  Object.keys(groupedByUnit).forEach((unitName) => {
    console.log(`\n📁 ${unitName} (${groupedByUnit[unitName].length} lessons missing videos):`);
    groupedByUnit[unitName].forEach((l) => {
      console.log(`   • Lesson ${l.lessonIndex}: ${l.lessonTitle}`);
    });
  });

  // Also output JSON for detailed programmatic access
  fs.writeFileSync(
    path.join(__dirname, 'lessons_without_videos.json'),
    JSON.stringify(lessonsWithoutVideos, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(__dirname, 'lessons_with_videos.json'),
    JSON.stringify(lessonsWithVideos, null, 2),
    'utf8',
  );
})();
