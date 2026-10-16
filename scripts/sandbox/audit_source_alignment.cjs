const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..', '..');

function auditAlignment(unitId) {
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  const raw = require(dataPath);
  const unitData = raw.default || raw.unitData || raw;

  console.log(`\n======================================================`);
  console.log(`SOURCE & TASK ALIGNMENT AUDIT: [${unitId}]`);
  console.log(`======================================================`);

  unitData.lessons.forEach((l, idx) => {
    // Find visual source
    let visualSource = null;
    if (l.primary_source && l.primary_source.type === 'visual') visualSource = l.primary_source;
    if (!visualSource && Array.isArray(l.sources)) {
      visualSource = l.sources.find((s) => s.type === 'visual' || s.image || s.src);
    }
    if (!visualSource && Array.isArray(l.narrative_blocks)) {
      const b = l.narrative_blocks.find((b) => b.source);
      if (b) visualSource = b.source;
    }

    // Check exam practice questions
    const examQuestions = [];
    if (l.exam_practice && Array.isArray(l.exam_practice.questions)) {
      l.exam_practice.questions.forEach((q) => examQuestions.push(q));
    }

    console.log(`Lesson ${idx + 1} (${l.id}):`);
    if (visualSource) {
      console.log(`  Source: [${visualSource.title || visualSource.caption}]`);
      console.log(`    File: ${visualSource.src || visualSource.image}`);
      console.log(`    Context: ${visualSource.source_context || visualSource.context || 'NONE'}`);
      console.log(`    Hinge: ${visualSource.hinge_question || 'NONE'}`);
    } else {
      console.log(`  ⚠️ No visual source!`);
    }

    const sourceRefsInExam = examQuestions.filter(
      (q) => (q.question || '').includes('Source') || (q.prompt || '').includes('Source'),
    );
    if (sourceRefsInExam.length > 0) {
      sourceRefsInExam.forEach((q) =>
        console.log(`  Exam Q Ref: "${(q.question || '').slice(0, 70)}..."`),
      );
    }
  });
}

auditAlignment('weimar_nazi_germany');
auditAlignment('eee');
