const fs = require('fs');
const path = require('path');

async function verifySourceSync() {
  console.log('====================================================');
  console.log('🔍 CME_NEW SOURCE-QUESTION SYNCHRONIZATION AUDITOR');
  console.log('====================================================');

  // Load cme_new data
  const dataPath = path.resolve(__dirname, '../units/cme_new/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.unitData;

  let totalErrors = 0;
  let totalSourcesChecked = 0;

  unitData.lessons.forEach((lesson, lIdx) => {
    const lessonNum = lIdx + 1;
    console.log(`\nLesson ${lessonNum}: ${lesson.title}`);

    const sources = [];
    if (lesson.primary_source) {
      sources.push({
        type: 'primary_source',
        location: 'lesson.primary_source',
        source: lesson.primary_source,
      });
    }

    (lesson.narrative_blocks || []).forEach((block, bIdx) => {
      if (block.source) {
        sources.push({
          type: 'narrative_block',
          location: `narrative_blocks[${bIdx}].source`,
          source: block.source,
        });
      }
    });

    const seenLetters = new Set();
    let expectedCharCode = 65; // 'A'

    sources.forEach((item, sIdx) => {
      totalSourcesChecked++;
      const s = item.source;
      const expectedLetter = String.fromCharCode(expectedCharCode++);
      const titleMatch = (s.title || '').match(/Source\s+([A-Z0-9]+)/i);
      const actualLetter = titleMatch ? titleMatch[1].toUpperCase() : null;

      if (!actualLetter) {
        console.error(`  ❌ [${item.location}] Missing 'Source [Letter]' in title: "${s.title}"`);
        totalErrors++;
        return;
      }

      if (actualLetter !== expectedLetter) {
        console.error(
          `  ❌ [${item.location}] Out-of-sequence letter: expected 'Source ${expectedLetter}', found 'Source ${actualLetter}' (title: "${s.title}")`,
        );
        totalErrors++;
      }

      if (seenLetters.has(actualLetter)) {
        console.error(
          `  ❌ [${item.location}] Duplicate source letter 'Source ${actualLetter}' in lesson!`,
        );
        totalErrors++;
      }
      seenLetters.add(actualLetter);

      // Check forbidden phrase: "Source Detective"
      if (/Source\s*Detective/i.test(s.title) || /Source\s*Detective/i.test(s.question || '')) {
        console.error(
          `  ❌ [${item.location}] Contains forbidden phrase 'Source Detective'! Title: "${s.title}", Q: "${s.question}"`,
        );
        totalErrors++;
      }

      // Check question
      if (!s.question || typeof s.question !== 'string' || !s.question.trim()) {
        console.error(`  ❌ [${item.location}] Missing question for Source ${actualLetter}!`);
        totalErrors++;
      } else {
        if (!s.question.startsWith(`Study Source ${actualLetter}.`)) {
          console.error(
            `  ❌ [${item.location}] Question must start with 'Study Source ${actualLetter}.'! Found: "${s.question.slice(0, 60)}..."`,
          );
          totalErrors++;
        }

        // If question references "Source X" or "Study Source X" (where X is a single letter A-Z), verify X matches actualLetter
        const qMatches = [...s.question.matchAll(/(?:Study\s+)?Source\s+([A-Z])\b/gi)];
        qMatches.forEach((match) => {
          const qLetter = match[1].toUpperCase();
          if (qLetter !== actualLetter) {
            console.error(
              `  ❌ [${item.location}] Question refers to 'Source ${qLetter}', but source title is 'Source ${actualLetter}'! Question: "${s.question.slice(0, 80)}..."`,
            );
            totalErrors++;
          }
        });
      }

      console.log(
        `  ✅ Source ${actualLetter}: "${s.title.replace(/^Source\s+[A-Z0-9]+:\s*/i, '').slice(0, 45)}..." -> Q verified`,
      );
    });
  });

  console.log('\n====================================================');
  if (totalErrors === 0) {
    console.log(
      `🎉 100% SUCCESS: All ${totalSourcesChecked} sources across 10 lessons are perfectly sequenced (A, B, C, D...) with matching questions!`,
    );
    console.log('====================================================\n');
    process.exit(0);
  } else {
    console.error(
      `🚨 FAILED: Found ${totalErrors} source synchronization error(s). Please resolve all issues above.`,
    );
    console.log('====================================================\n');
    process.exit(1);
  }
}

verifySourceSync().catch((err) => {
  console.error('Fatal error running verifySourceSync:', err);
  process.exit(1);
});
