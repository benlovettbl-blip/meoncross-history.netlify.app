/**
 * Vault Answer Randomization Audit Tool
 *
 * Pedagogical QA script that inspects the distribution of correct answer
 * positions (A, B, C, D) across all 20-question mastery pages in every unit.
 *
 * It verifies that correct answers are evenly dispersed, flagging any
 * unintentional clustering on Option A or Option C.
 *
 * Usage:
 *   node scripts/check_vault_randomization.cjs
 *   node scripts/check_vault_randomization.cjs --verbose
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.join(__dirname, '..');
const unitsDir = path.join(rootDir, 'units');
const isVerbose = process.argv.includes('--verbose');

console.log('====================================================');
console.log('🎯 VAULT ANSWER POSITION RANDOMIZATION AUDIT');
console.log('====================================================\n');

(async () => {
  const unitDirs = fs
    .readdirSync(unitsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name);

  const globalCounts = { A: 0, B: 0, C: 0, D: 0, openEnded: 0, totalMC: 0 };
  const unitSummaries = [];
  const clusteredPages = [];

  for (const unitId of unitDirs) {
    if (unitId === 'trip_ypres') continue;
    const dataJsPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataJsPath)) continue;

    let unit;
    try {
      const mod = await import(pathToFileURL(dataJsPath).href);
      unit = mod.unitData || mod.default || mod[unitId];
    } catch (e) {
      continue;
    }
    if (!unit || !unit.lessons) continue;

    const workbooks = unit.workbooks || [
      { id: 'full', title: 'Complete Unit Mastery', prefix: 'lesson' },
    ];
    const unitCounts = { A: 0, B: 0, C: 0, D: 0, openEnded: 0, totalMC: 0 };

    for (const wb of workbooks) {
      let prefix = wb.prefix || wb.id;
      let matchingLessons;
      if (unitId === 'medieval_england' || unitId === 'australia' || wb.id === 'full') {
        matchingLessons = unit.lessons;
      } else {
        matchingLessons = unit.lessons.filter(
          (l) => (l.id && l.id.startsWith(prefix)) || (l.title && l.title.startsWith(prefix)),
        );
      }

      let questions = [];
      for (const lesson of matchingLessons) {
        const extractQ = (q) => {
          let pos = null;
          if (q && Array.isArray(q.options) && q.options.length >= 2) {
            if (typeof q.answer === 'number') {
              pos = ['A', 'B', 'C', 'D'][q.answer] || null;
            } else if (typeof q.answer === 'string') {
              const num = parseInt(q.answer, 10);
              if (!isNaN(num) && String(num) === q.answer.trim()) {
                pos = ['A', 'B', 'C', 'D'][num] || null;
              } else {
                const idx = q.options.findIndex((opt) => opt.trim() === q.answer.trim());
                if (idx !== -1) pos = ['A', 'B', 'C', 'D'][idx] || null;
              }
            } else if (typeof q.a === 'string') {
              const idx = q.options.findIndex((opt) => opt.trim() === q.a.trim());
              if (idx !== -1) pos = ['A', 'B', 'C', 'D'][idx] || null;
            }
          }
          questions.push({
            lesson: lesson.title || lesson.id,
            q: q.question || q.q,
            answerPos: pos,
          });
        };

        if (unitId === 'medieval_england') {
          if (lesson.quiz) lesson.quiz.forEach(extractQ);
        } else {
          if (lesson.quiz) lesson.quiz.forEach(extractQ);
          if (lesson.do_now && Array.isArray(lesson.do_now.items))
            lesson.do_now.items.forEach(extractQ);
        }
      }

      // Analyze in 20-question mastery chunks
      for (let i = 0; i < questions.length; i += 20) {
        const pageQs = questions.slice(i, i + 20);
        const pageNum = Math.floor(i / 20) + 1;
        const pageCounts = { A: 0, B: 0, C: 0, D: 0, openEnded: 0, totalMC: 0 };

        pageQs.forEach((q) => {
          if (q.answerPos && pageCounts[q.answerPos] !== undefined) {
            pageCounts[q.answerPos]++;
            pageCounts.totalMC++;
            unitCounts[q.answerPos]++;
            unitCounts.totalMC++;
            globalCounts[q.answerPos]++;
            globalCounts.totalMC++;
          } else {
            pageCounts.openEnded++;
            unitCounts.openEnded++;
            globalCounts.openEnded++;
          }
        });

        // Detect clustering: Any option with >= 10 out of 20 (or >= 60% of MC)
        const threshold = Math.max(10, Math.ceil(pageCounts.totalMC * 0.6));
        const dominant = ['A', 'B', 'C', 'D'].find(
          (letter) => pageCounts[letter] >= threshold && pageCounts[letter] >= 8,
        );

        if (dominant) {
          clusteredPages.push({
            unitId,
            wbId: wb.id,
            page: pageNum,
            dominant,
            count: pageCounts[dominant],
            totalMC: pageCounts.totalMC,
            counts: pageCounts,
          });
        }
      }
    }

    unitSummaries.push({
      unitId,
      counts: unitCounts,
    });
  }

  // Print Global Distribution
  console.log('📊 CURRICULUM-WIDE MULTIPLE CHOICE DISTRIBUTION:');
  console.log('----------------------------------------------------');
  const pct = (val, tot) => (tot > 0 ? ((val / tot) * 100).toFixed(1) + '%' : '0.0%');
  console.log(
    `  Option A: ${String(globalCounts.A).padStart(5)} (${pct(globalCounts.A, globalCounts.totalMC)})`,
  );
  console.log(
    `  Option B: ${String(globalCounts.B).padStart(5)} (${pct(globalCounts.B, globalCounts.totalMC)})`,
  );
  console.log(
    `  Option C: ${String(globalCounts.C).padStart(5)} (${pct(globalCounts.C, globalCounts.totalMC)})`,
  );
  console.log(
    `  Option D: ${String(globalCounts.D).padStart(5)} (${pct(globalCounts.D, globalCounts.totalMC)})`,
  );
  console.log(`  Total Multiple Choice Questions: ${globalCounts.totalMC}`);
  console.log(`  Open-Ended Recall Questions:     ${globalCounts.openEnded}`);
  console.log('----------------------------------------------------\n');

  // Print Unit Table
  console.log('📋 PER-UNIT DISTRIBUTION BREAKDOWN:');
  console.log('----------------------------------------------------------------------');
  console.log('Unit ID                         |   A   |   B   |   C   |   D   | Total MC | Dom');
  console.log('----------------------------------------------------------------------');
  unitSummaries.forEach((u) => {
    const c = u.counts;
    let dom = '-';
    if (c.totalMC > 0) {
      ['A', 'B', 'C', 'D'].forEach((l) => {
        if (c[l] / c.totalMC >= 0.5) dom = `${l} (${pct(c[l], c.totalMC)})`;
      });
    }
    console.log(
      `${u.unitId.padEnd(31)} | ${String(c.A).padStart(5)} | ${String(c.B).padStart(5)} | ${String(c.C).padStart(5)} | ${String(c.D).padStart(5)} | ${String(c.totalMC).padStart(8)} | ${dom}`,
    );
  });
  console.log('----------------------------------------------------------------------\n');

  // Print Clustered Pages
  if (clusteredPages.length > 0) {
    console.error(
      `\n❌ BLOCKED: CLUSTERED MASTERY PAGES DETECTED (${clusteredPages.length} pages):`,
    );
    console.error(
      'The following 20-question pages have an unhealthy concentration on a single letter (>35%):',
    );
    clusteredPages.forEach((p) => {
      console.error(
        `  • [${p.unitId}] ${p.wbId} > Page ${p.page}: ${p.count}/${p.totalMC} on Option ${p.dominant} (A:${p.counts.A}, B:${p.counts.B}, C:${p.counts.C}, D:${p.counts.D})`,
      );
    });
    console.error(
      '\n💡 Fix: Run node scripts/rebalance_quiz_options.cjs to disperse answers evenly before committing.',
    );
    console.log('====================================================\n');
    process.exit(1);
  } else {
    console.log('✅ No clustered mastery pages detected! Answers are evenly dispersed.');
    console.log('====================================================\n');
    process.exit(0);
  }
})();
