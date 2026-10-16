const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));
const units = db.units || db;

console.log(`Auditing banners across ${Object.keys(units).length} units in database.json...\n`);

let totalLessonsWithBanner = 0;
let totalBannersInSources = 0;
let totalBannersMissingFromSources = 0;

const missingReport = {};

for (const [unitId, rawUnit] of Object.entries(units)) {
  const unit = rawUnit.data || rawUnit;
  if (!unit || !Array.isArray(unit.lessons)) continue;

  const unitMissing = [];

  unit.lessons.forEach((lesson, idx) => {
    let bannerImg = '';
    let bannerCaption = '';
    if (lesson.banner) {
      if (typeof lesson.banner === 'string') bannerImg = lesson.banner;
      else if (typeof lesson.banner === 'object') {
        bannerImg = lesson.banner.image || lesson.banner.url || lesson.banner.src || '';
        bannerCaption = lesson.banner.caption || '';
      }
    }

    if (!bannerImg) return;
    totalLessonsWithBanner++;

    const bannerFilename = path.basename(bannerImg.split('?')[0]);

    // Collect actual sources
    const actualSources = [];
    if (Array.isArray(lesson.sources)) {
      lesson.sources.forEach((s) => {
        const img = s.image || s.src || s.image_url || '';
        if (img) actualSources.push(path.basename(img.split('?')[0]));
      });
    }
    if (Array.isArray(lesson.narrative_blocks)) {
      lesson.narrative_blocks.forEach((nb) => {
        if (nb.source) {
          const img = nb.source.image || nb.source.src || '';
          if (img) actualSources.push(path.basename(img.split('?')[0]));
        }
      });
    }
    if (lesson.right_page_task && lesson.right_page_task.visual_source) {
      const img =
        lesson.right_page_task.visual_source.image ||
        lesson.right_page_task.visual_source.src ||
        '';
      if (img) actualSources.push(path.basename(img.split('?')[0]));
    }

    const isMatch = actualSources.includes(bannerFilename);
    if (isMatch) {
      totalBannersInSources++;
    } else {
      totalBannersMissingFromSources++;
      unitMissing.push({
        lessonId: lesson.id || `lesson_${idx + 1}`,
        lessonTitle: lesson.title,
        bannerImg,
        bannerFilename,
        bannerCaption,
      });
    }
  });

  if (unitMissing.length > 0) {
    missingReport[unitId] = unitMissing;
  }
}

console.log(`TOTAL LESSONS WITH BANNER: ${totalLessonsWithBanner}`);
console.log(`BANNERS ALREADY IN SOURCES: ${totalBannersInSources}`);
console.log(`BANNERS MISSING FROM SOURCES: ${totalBannersMissingFromSources}\n`);

for (const [unitId, missingList] of Object.entries(missingReport)) {
  console.log(`=== ${unitId.toUpperCase()} (${missingList.length} missing) ===`);
  missingList.forEach((m) => {
    console.log(`  - [${m.lessonId}] "${m.lessonTitle}"`);
    console.log(`    Banner: ${m.bannerFilename} (${m.bannerCaption || 'No caption'})`);
  });
  console.log('');
}
