const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const html = fs.readFileSync(
  path.join(ROOT_DIR, 'units/early_modern_world/pupil_workbook.html'),
  'utf8',
);
const databasePath = path.join(ROOT_DIR, 'public/database.json');
const db = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
const unitData = db['early_modern_world'].data;

const rendererSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/engine/lesson_renderer.js'), 'utf8');
const fnStart = rendererSrc.indexOf('export function assignQuestionNumbers');
const fnEnd = rendererSrc.indexOf('export function renderPoetryDossiersHTML');
const fnCode = rendererSrc.slice(fnStart, fnEnd).replace('export function', 'function');
eval(fnCode);

// Extract all H2 positions
const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
let m;
const h2List = [];
while ((m = h2Regex.exec(html)) !== null) {
  h2List.push({ index: m.index, text: m[1].replace(/\s+/g, ' ').trim() });
}

// Lessons in workbook start from the 3rd H2: "L1: Who held global power in 1450?"
const lessonH2s = h2List.filter((h) => /^L\d+:/.test(h.text));
const endH2 = h2List.find((h) => h.text.includes('End of Unit'));

unitData.lessons.forEach((lesson, idx) => {
  console.log(`\n================================================================`);
  console.log(`LESSON ${idx + 1}: ${lesson.title}`);
  console.log(`================================================================`);

  const start = lessonH2s[idx].index;
  const end = lessonH2s[idx + 1] ? lessonH2s[idx + 1].index : endH2 ? endH2.index : html.length;

  const lessonHtml = html.slice(start, end);

  // Extract questions from lessonHtml
  const re = /(?:<strong>|<h4>)Q(\d+)\.?\s*([^<]+)(?:<\/strong>|<\/h4>)/g;
  let qMatch;
  const wbQuestions = [];
  while ((qMatch = re.exec(lessonHtml)) !== null) {
    wbQuestions.push({ num: parseInt(qMatch[1]), text: qMatch[2].trim().replace(/\s+/g, ' ') });
  }

  // Also check drawing tasks
  const drawRe = /Drawing Task:\s*Q(\d+)\s*([^<]+)/g;
  while ((qMatch = drawRe.exec(lessonHtml)) !== null) {
    const num = parseInt(qMatch[1]);
    if (!wbQuestions.find((q) => q.num === num)) {
      wbQuestions.push({ num, text: ('Drawing Task: ' + qMatch[2]).trim().replace(/\s+/g, ' ') });
    }
  }

  // Get app questions
  const cloned = JSON.parse(JSON.stringify(lesson));
  assignQuestionNumbers(cloned, 'early_modern_world');
  const appQuestions = [];
  if (cloned.narrative_blocks) {
    cloned.narrative_blocks.forEach((b, bi) => {
      if (b.source && b.source.qNum)
        appQuestions.push({
          num: b.source.qNum,
          text: (b.source.question || '').replace(/\s+/g, ' '),
        });
      if (b.tasks)
        b.tasks.forEach((t) => {
          if (t && t.qNum)
            appQuestions.push({
              num: t.qNum,
              text: (t.question || t.title || t.text || '').replace(/\s+/g, ' '),
            });
        });
    });
  }
  if (cloned.extended && cloned.extended.qNum) {
    appQuestions.push({
      num: cloned.extended.qNum,
      text: (cloned.extended.question || '').replace(/\s+/g, ' '),
    });
  }

  console.log(
    `Printed Workbook Questions: ${wbQuestions.length} | App Questions: ${appQuestions.length}`,
  );

  const maxQ = Math.max(...wbQuestions.map((q) => q.num), ...appQuestions.map((q) => q.num), 0);
  let matchCount = 0;
  let diffCount = 0;
  for (let q = 1; q <= maxQ; q++) {
    const wq = wbQuestions.find((x) => x.num === q);
    const aq = appQuestions.find((x) => x.num === q);
    if (wq && aq) {
      matchCount++;
      console.log(
        `  ✅ Q${q}: [MATCH] Wb: "${wq.text.slice(0, 32)}..." <==> App: "${aq.text.slice(0, 32)}..."`,
      );
    } else if (wq && !aq) {
      diffCount++;
      console.log(`  ⚠️ Q${q}: [IN WORKBOOK ONLY] Wb: "${wq.text.slice(0, 45)}..."`);
    } else if (!wq && aq) {
      diffCount++;
      console.log(`  ⚠️ Q${q}: [IN APP ONLY] App: "${aq.text.slice(0, 45)}..."`);
    }
  }
  console.log(`Summary: ${matchCount} matches, ${diffCount} differences.`);
});
