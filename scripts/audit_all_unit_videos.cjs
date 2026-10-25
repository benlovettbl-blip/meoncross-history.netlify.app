const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

console.log('--- PLATFORM VIDEO AUDIT REPORT ---');
for (const [unitId, unitObj] of Object.entries(db)) {
  const unit = unitObj.data || unitObj;
  const lessons = unit.lessons || [];
  let videoCount = 0;
  let lessonsWithVideos = 0;
  let threeTierCount = 0;

  lessons.forEach(l => {
    let vids = [];
    if (Array.isArray(l.video)) vids = vids.concat(l.video);
    else if (l.video) vids.push(l.video);
    if (Array.isArray(l.extra_videos)) vids = vids.concat(l.extra_videos);

    if (vids.length > 0) {
      lessonsWithVideos++;
      videoCount += vids.length;
      vids.forEach(v => {
        if (v.viewing_task && v.viewing_task.includes('Recall:') && v.viewing_task.includes('Explain:') && v.viewing_task.includes('Challenge:')) {
          threeTierCount++;
        }
      });
    }
  });

  console.log(`${unitId.padEnd(28)} | ${lessonsWithVideos.toString().padStart(2)}/${lessons.length.toString().padEnd(2)} lessons | ${videoCount.toString().padStart(3)} videos | ${threeTierCount.toString().padStart(2)} gold 3-tier`);
}
