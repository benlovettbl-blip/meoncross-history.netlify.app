const fs = require('fs');
const path = require('path');

const units = ['edexcel_medicine', 'cme_new', 'eee', 'usa', 'cold_war', 'weimar_nazi_germany'];

async function scanGhostPrompts() {
  console.log('======================================================');
  console.log('🔍 AUDITING GCSE UNITS FOR GHOST SOURCE PROMPTS');
  console.log('======================================================');

  let totalGhosts = 0;

  for (const u of units) {
    const dataPath = path.resolve(__dirname, '..', 'units', u, 'data.js');
    if (!fs.existsSync(dataPath)) continue;
    const raw = await import('file:///' + dataPath.replace(/\\/g, '/'));
    const d = raw.default || raw.unitData || raw[u] || raw.lessons;
    const lessons = Array.isArray(d) ? d : d.lessons || [];

    console.log(`\n▶ Unit: [${u}] (${lessons.length} lessons)`);
    let unitGhosts = 0;

    lessons.forEach((l, lIdx) => {
      const lessonNum = lIdx + 1;
      const tasks = l.tasks || [];
      const sourcesAvailable = new Set();

      if (l.sources) {
        l.sources.forEach((s) => {
          const m = (s.title || s.letter || '').match(/Source\s+([A-Z])/i);
          if (m) sourcesAvailable.add(m[1].toUpperCase());
          else if (s.letter) sourcesAvailable.add(s.letter.toUpperCase());
        });
      }

      (l.narrative_blocks || []).forEach((b) => {
        if (b.source) {
          const m = (b.source.title || b.source.letter || '').match(/Source\s+([A-Z])/i);
          if (m) sourcesAvailable.add(m[1].toUpperCase());
        }
        if (b.sources && Array.isArray(b.sources)) {
          b.sources.forEach((s) => {
            const m = (s.title || s.letter || '').match(/Source\s+([A-Z])/i);
            if (m) sourcesAvailable.add(m[1].toUpperCase());
          });
        }
      });

      if (l.exam_practice && l.exam_practice.stimulus) {
        l.exam_practice.stimulus.forEach((s) => {
          const m = (s.title || '').match(/Source\s+([A-Z])/i);
          if (m) sourcesAvailable.add(m[1].toUpperCase());
        });
      }

      // Check tasks
      tasks.forEach((t, tIdx) => {
        const q = t.question || t.prompt || '';
        const matches = q.match(/\bSource\s+([A-Z])\b/gi);
        if (matches) {
          matches.forEach((m) => {
            const letter = m.replace(/Source\s+/i, '').toUpperCase();
            if (!sourcesAvailable.has(letter)) {
              console.log(
                `  ❌ [L${lessonNum} Task ${tIdx + 1}] Ghost reference to "${m}" in question: "${q.slice(0, 70)}..."`,
              );
              console.log(
                `     Available sources in lesson: [${Array.from(sourcesAvailable).join(', ') || 'NONE'}]`,
              );
              unitGhosts++;
              totalGhosts++;
            }
          });
        }
      });

      // Also check exam questions
      const examQuestions = (l.exam_practice && l.exam_practice.questions) || [];
      examQuestions.forEach((eq, eqIdx) => {
        const q = eq.question || eq.prompt || '';
        const matches = q.match(/\bSource\s+([A-Z])\b/gi);
        if (matches) {
          matches.forEach((m) => {
            const letter = m.replace(/Source\s+/i, '').toUpperCase();
            if (!sourcesAvailable.has(letter)) {
              console.log(
                `  ❌ [L${lessonNum} Exam Q${eqIdx + 1}] Ghost reference to "${m}" in exam question: "${q.slice(0, 70)}..."`,
              );
              console.log(
                `     Available sources in lesson: [${Array.from(sourcesAvailable).join(', ') || 'NONE'}]`,
              );
              unitGhosts++;
              totalGhosts++;
            }
          });
        }
      });
    });

    if (unitGhosts === 0) {
      console.log(`  🎉 100% CLEAN: Zero ghost source references detected in [${u}].`);
    } else {
      console.log(`  ⚠️ Detected ${unitGhosts} ghost reference(s) in [${u}].`);
    }
  }

  if (totalGhosts > 0) {
    console.error(`❌ Audit failed: ${totalGhosts} ghost source prompt(s) detected!`);
    process.exit(1);
  } else {
    console.log(`🎉 100% CLEAN: All GCSE tasks and exam questions have valid source residency.`);
    process.exit(0);
  }
}

scanGhostPrompts();
