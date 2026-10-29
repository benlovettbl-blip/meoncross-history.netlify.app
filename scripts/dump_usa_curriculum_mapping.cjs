const fs = require('fs');
const path = require('path');

const usa = require('../units/usa/data.js').default || require('../units/usa/data.js');

usa.lessons.forEach((l, idx) => {
  console.log('\n======================================================');
  console.log(`LESSON ${idx + 1} [${l.id}]: ${l.title}`);
  console.log('------------------------------------------------------');
  console.log('STAGES (5):');
  const stages = (l.causal_domino_spine && l.causal_domino_spine.stages) || [];
  stages.forEach((s) => {
    console.log(`  Stage ${s.step} (${s.date}): ${s.title}`);
    console.log(`    Question: "${s.question}"`);
  });

  console.log(`CURRENT NARRATIVE BLOCKS (${(l.narrative_blocks || []).length}):`);
  (l.narrative_blocks || []).forEach((b, bIdx) => {
    const sList = b.sources || (b.source ? [b.source] : []);
    console.log(
      `  Block ${bIdx + 1}: ${b.title} [${(b.paragraphs || []).length} paras] [Sources: ${sList.map((s) => s.letter).join(',')}]`,
    );
  });

  console.log(`SOURCES (${(l.sources || []).length}):`);
  (l.sources || []).forEach((s) => {
    console.log(`  Source ${s.letter}: ${s.title}`);
  });
});
