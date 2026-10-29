const fs = require('fs');
const path = require('path');

const usa = require('../units/usa/data.js').default || require('../units/usa/data.js');

console.log('======================================================================');
console.log('AUDITING USA (1954–1975) 16 LESSONS: SOURCES VS 5 STAGES CHRONOLOGY');
console.log('======================================================================\n');

usa.lessons.forEach((l, idx) => {
  console.log(`\n----------------------------------------------------------------------`);
  console.log(`LESSON ${idx + 1} [${l.id}]: ${l.title}`);
  console.log(`----------------------------------------------------------------------`);

  const stages = (l.causal_domino_spine && l.causal_domino_spine.stages) || [];
  console.log('STAGES (1–5):');
  stages.forEach((s) => {
    console.log(`  [Stage ${s.step}] (${s.date}) ${s.title}`);
  });

  console.log('\nSOURCES (A–E):');
  (l.sources || []).forEach((s) => {
    // Extract date from title or text
    const dateMatch = s.title.match(/\(([^)]+)\)$/) || s.caption.match(/\b(19\d\d)\b/);
    const dateStr = dateMatch ? dateMatch[1] : 'No date';
    console.log(`  [Source ${s.letter}] (${dateStr}) ${s.title}`);
  });
});
