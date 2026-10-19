const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const unitFolders = fs.readdirSync(unitsDir).filter((f) => {
  return (
    fs.statSync(path.join(unitsDir, f)).isDirectory() &&
    fs.existsSync(path.join(unitsDir, f, 'data.js'))
  );
});

const { pathToFileURL } = require('url');

async function runAudit() {
  console.log(`Auditing Do Now tasks across ${unitFolders.length} units...\n`);
  const suspiciousLessons = [];

  for (const unit of unitFolders) {
    try {
      const dataFilePath = path.join(unitsDir, unit, 'data.js');
      const dataModule = await import(pathToFileURL(dataFilePath).href);
      const unitData = dataModule.default || dataModule.unitData;
      if (!unitData || !unitData.lessons) continue;

      unitData.lessons.forEach((lesson, idx) => {
        const doNows = lesson.do_now || lesson.do_now_tasks || [];
        if (!doNows || doNows.length === 0) return;

        // Extract key distinguishing entities from lesson title
        // Remove common words like 'KT1.1', 'The', 'And', 'Of', 'In', 'c1250', dates, etc.
        const cleanTitle = (lesson.title || '')
          .replace(/KT\d+\.?\d*/gi, '')
          .replace(/Enquiry\s*\d+/gi, '')
          .replace(/Lesson\s*\d+/gi, '')
          .replace(/\([^)]*\)/g, '')
          .replace(/[0-9–—\-]/g, ' ')
          .replace(/[:&]/g, ' ');

        const words = cleanTitle
          .split(/\s+/)
          .map((w) => w.trim().toLowerCase())
          .filter(
            (w) =>
              w.length >= 4 &&
              ![
                'what',
                'when',
                'where',
                'which',
                'their',
                'under',
                'from',
                'with',
                'about',
                'after',
                'before',
                'first',
                'second',
                'third',
                'part',
                'early',
                'late',
                'great',
                'world',
                'british',
                'britain',
                'history',
              ].includes(w),
          );

        const matches = [];
        doNows.forEach((item, qIdx) => {
          const qText = (item.q || item.question || '').toLowerCase();
          const matchedWords = words.filter((word) => qText.includes(word));
          if (matchedWords.length > 0) {
            matches.push({ qIdx: qIdx + 1, q: item.q || item.question, matchedWords });
          }
        });

        // If more than 30% of questions match the current lesson's specific title words, flag it!
        if (matches.length >= 2 || (doNows.length > 0 && matches.length / doNows.length >= 0.3)) {
          suspiciousLessons.push({
            unit,
            lessonIdx: idx,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            totalQ: doNows.length,
            flaggedCount: matches.length,
            matches: matches.slice(0, 4), // Show top 4 matches
          });
        }
      });
    } catch (err) {
      // console.error(`Error loading ${unit}:`, err.message);
    }
  }

  console.log(
    `Found ${suspiciousLessons.length} lessons with potentially self-referencing Do Now tasks:\n`,
  );
  suspiciousLessons.forEach((s) => {
    console.log(`[${s.unit}] Lesson ${s.lessonIdx + 1} (${s.lessonId}): "${s.lessonTitle}"`);
    console.log(`   Total Qs: ${s.totalQ} | Flagged self-testing Qs: ${s.flaggedCount}`);
    s.matches.forEach((m) => {
      console.log(`   - Q${m.qIdx}: "${m.q}" (matched: ${m.matchedWords.join(', ')})`);
    });
    console.log('');
  });
}

runAudit();
