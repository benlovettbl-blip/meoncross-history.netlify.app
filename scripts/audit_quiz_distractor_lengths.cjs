const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const UNITS_DIR = path.join(ROOT_DIR, 'units');

const unitDirs = fs
  .readdirSync(UNITS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

console.log('========================================================================================');
console.log('🔍 GLOBAL QUIZ LENGTH & DISTRACTOR BIAS AUDIT (ALL UNITS)');
console.log('========================================================================================\n');

const results = [];

for (const unitId of unitDirs) {
  const dataPath = path.join(UNITS_DIR, unitId, 'data.js');
  if (!fs.existsSync(dataPath)) continue;

  try {
    const mod = require(dataPath);
    const unitData = mod.unitData || mod.default || mod[unitId] || mod;
    if (!unitData || !unitData.lessons) continue;

    let totalQuestions = 0;
    let rankCounts = { 1: 0, 2: 0, 3: 0, 4: 0, other: 0 };
    let strictlyLongestCount = 0;
    let totalLengthDisparity = 0;
    let lessonStats = [];

    unitData.lessons.forEach((l, lIdx) => {
      const quizQuestions = l.quiz || l.quiz_questions || l.quick_quiz || [];
      if (!Array.isArray(quizQuestions) || quizQuestions.length === 0) return;

      let lTotal = 0;
      let lLongest = 0;

      quizQuestions.forEach((q) => {
        const options = q.options || [];
        if (!Array.isArray(options) || options.length < 2) return;

        // Resolve correct answer text
        let correctText = '';
        if (typeof q.answer === 'number' && options[q.answer] !== undefined) {
          correctText = String(options[q.answer]);
        } else if (typeof q.answer === 'string') {
          if (/^\d+$/.test(q.answer) && options[parseInt(q.answer, 10)] !== undefined) {
            correctText = String(options[parseInt(q.answer, 10)]);
          } else {
            correctText = q.answer;
          }
        } else if (q.a !== undefined) {
          if (typeof q.a === 'number' && options[q.a] !== undefined) {
            correctText = String(options[q.a]);
          } else if (/^\d+$/.test(q.a) && options[parseInt(q.a, 10)] !== undefined) {
            correctText = String(options[parseInt(q.a, 10)]);
          } else {
            correctText = String(q.a);
          }
        } else if (q.correct !== undefined) {
          correctText = String(q.correct);
        }

        if (!correctText) return;

        totalQuestions++;
        lTotal++;

        // Calculate option lengths
        const optionObjs = options.map((opt) => {
          const s = String(opt);
          return {
            text: s,
            len: s.length,
            isCorrect: s.trim().toLowerCase() === correctText.trim().toLowerCase(),
          };
        });

        // Sort descending by length
        optionObjs.sort((a, b) => b.len - a.len);

        const correctIdxInSorted = optionObjs.findIndex((o) => o.isCorrect);
        const rank = correctIdxInSorted !== -1 ? correctIdxInSorted + 1 : null;

        if (rank >= 1 && rank <= 4) {
          rankCounts[rank]++;
        } else {
          rankCounts.other++;
        }

        const isLongest = rank === 1;
        const isStrictlyLongest =
          isLongest && optionObjs.length > 1 && optionObjs[0].len > optionObjs[1].len;

        if (isLongest) {
          lLongest++;
        }
        if (isStrictlyLongest) {
          strictlyLongestCount++;
        }

        // Measure disparity vs average distractor length
        const distractors = optionObjs.filter((o) => !o.isCorrect);
        if (distractors.length > 0) {
          const avgDistractorLen =
            distractors.reduce((sum, d) => sum + d.len, 0) / distractors.length;
          const correctObj = optionObjs.find((o) => o.isCorrect);
          if (correctObj) {
            totalLengthDisparity += correctObj.len - avgDistractorLen;
          }
        }
      });

      if (lTotal > 0) {
        lessonStats.push({
          index: lIdx + 1,
          title: l.title || `Lesson ${lIdx + 1}`,
          total: lTotal,
          longest: lLongest,
          pct: ((lLongest / lTotal) * 100).toFixed(0),
        });
      }
    });

    if (totalQuestions > 0) {
      const longestPct = (rankCounts[1] / totalQuestions) * 100;
      const avgDisparity = totalLengthDisparity / totalQuestions;
      results.push({
        unitId,
        totalQuestions,
        longestCount: rankCounts[1],
        longestPct,
        strictlyLongestCount,
        strictlyPct: (strictlyLongestCount / totalQuestions) * 100,
        rank1: rankCounts[1],
        rank2: rankCounts[2],
        rank3: rankCounts[3],
        rank4: rankCounts[4],
        avgDisparity,
        lessonStats,
      });
    }
  } catch (err) {
    console.error(`Error processing ${unitId}:`, err.message);
  }
}

// Sort from worst bias (highest % longest) to least biased
results.sort((a, b) => b.longestPct - a.longestPct);

console.log(
  '| Unit ID                        | Questions | Longest is Correct | % Longest | Avg Len Disparity | Severity |',
);
console.log(
  '| :----------------------------- | :-------: | :----------------: | :-------: | :---------------: | :------: |',
);

for (const r of results) {
  let severity = '🟢 Balanced (<35%)';
  if (r.longestPct >= 75) severity = '🚨 CRITICAL (>75%)';
  else if (r.longestPct >= 50) severity = '⚠️ HIGH (50–74%)';
  else if (r.longestPct >= 35) severity = '🟡 MODERATE (35–49%)';

  console.log(
    `| ${r.unitId.padEnd(30, ' ')} | ${String(r.totalQuestions).padStart(9, ' ')} | ${String(r.longestCount).padStart(7, ' ')} / ${String(r.totalQuestions).padEnd(6, ' ')} | ${r.longestPct.toFixed(1).padStart(7, ' ')}% | ${(r.avgDisparity > 0 ? '+' : '') + r.avgDisparity.toFixed(1).padStart(14, ' ')} ch | ${severity} |`,
  );
}

console.log('\n========================================================================================');
console.log('CRITICAL UNITS BREAKDOWN & DETAILED RANK SPREAD:');
console.log('========================================================================================');

for (const r of results) {
  if (r.longestPct >= 50) {
    console.log(`\n📌 Unit: [${r.unitId}] — ${r.totalQuestions} Questions total`);
    console.log(`   Longest is Correct: ${r.longestCount} (${r.longestPct.toFixed(1)}%) | Strictly Longest: ${r.strictlyLongestCount} (${r.strictlyPct.toFixed(1)}%)`);
    console.log(`   Rank 1 (Longest): ${r.rank1} | Rank 2: ${r.rank2} | Rank 3: ${r.rank3} | Rank 4 (Shortest): ${r.rank4}`);
    console.log(`   Lessons:`);
    r.lessonStats.forEach((ls) => {
      console.log(`     - L${ls.index}: ${ls.longest} / ${ls.total} (${ls.pct}%) — "${ls.title.slice(0, 50)}"`);
    });
  }
}
