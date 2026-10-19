const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('=== APP UNITS & SOURCES INVENTORY ===\n');

let totalUnits = 0;
let totalLessons = 0;
let unitsSummary = [];

for (const [key, val] of Object.entries(db)) {
  const u = val.data || val;
  if (!u.lessons || !Array.isArray(u.lessons)) continue;

  totalUnits++;
  const lessonsCount = u.lessons.length;
  totalLessons += lessonsCount;

  let unitSources = [];

  u.lessons.forEach((l, idx) => {
    let sourceContextText = '';
    if (l.teacher_notes && l.teacher_notes.source_context) {
      if (typeof l.teacher_notes.source_context === 'string') {
        sourceContextText = l.teacher_notes.source_context;
      } else {
        sourceContextText = JSON.stringify(l.teacher_notes.source_context);
      }
    }

    // Check for explicit sources array or visual_sources
    let explicitSources = [];
    ['sources', 'visual_sources', 'primary_sources'].forEach((sk) => {
      if (l[sk] && Array.isArray(l[sk])) {
        explicitSources.push(...l[sk]);
      }
    });

    const str = JSON.stringify(l);
    const urlMatches = str.match(/https?:\/\/[^\s"'<>]+/g) || [];

    unitSources.push({
      lessonNum: idx + 1,
      title: l.title || 'Untitled',
      sourceContext: sourceContextText,
      hasExplicitSources: explicitSources.length > 0,
      explicitSourcesCount: explicitSources.length,
      urlsCount: urlMatches.length,
    });
  });

  unitsSummary.push({
    key,
    title: u.title || key,
    keyStage: u.keyStage || (u.is_ks2 ? 'KS2' : u.is_ks3 ? 'KS3' : u.isGCSE ? 'GCSE' : 'Secondary'),
    lessonsCount,
    lessonsWithContext: unitSources.filter((s) => s.sourceContext).length,
    lessonsWithUrls: unitSources.filter((s) => s.urlsCount > 0).length,
    lessonsWithExplicitSources: unitSources.filter((s) => s.hasExplicitSources).length,
    unitSources,
  });
}

console.log(`Total Units in DB: ${totalUnits}`);
console.log(`Total Lessons in DB: ${totalLessons}\n`);

console.log('| Unit ID | Unit Title | Lessons | Source Context Notes | Explicit URLs in DB |');
console.log('| :--- | :--- | :---: | :---: | :---: |');
unitsSummary.forEach((u) => {
  console.log(
    `| ${u.key} | ${u.title} | ${u.lessonsCount} | ${u.lessonsWithContext} / ${u.lessonsCount} | ${u.lessonsWithUrls} / ${u.lessonsCount} |`,
  );
});
