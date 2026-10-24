/**
 * scripts/audit_narrative_budget.cjs
 *
 * Word-Budget Editorial Guardrail Engine for Classroom Textbooks
 * Audits word count per lesson against physical A4 print budgets to warn
 * curriculum authors of underflow voids or overflow risks before printing.
 *
 * Usage:
 *   node scripts/audit_narrative_budget.cjs
 *   npm run audit:textbook-budget
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');

const UNIT_BUDGET_CONFIGS = [
  // Key Stage 2 Model 1 Single Wide-Column Anthologies (1 page per enquiry)
  {
    id: 'ks2_ww2',
    title: 'KS2 World War II & The Home Front',
    model: '16-Page KS2 Wide-Column',
    minWords: 320,
    maxWords: 520,
    lessons: 10,
  },

  // KS3 8-Page Anthologies (1 page per enquiry)
  {
    id: 'australia',
    title: 'The History of Australia',
    model: '8-Page',
    minWords: 340,
    maxWords: 560,
    lessons: 5,
  },
  {
    id: 'post_war_britain',
    title: 'Rights, Protest & Post-War Britain',
    model: '8-Page',
    minWords: 340,
    maxWords: 560,
    lessons: 5,
  },
  {
    id: 'great_war',
    title: 'Causes of the Great War',
    model: '8-Page',
    minWords: 340,
    maxWords: 560,
    lessons: 5,
  },
  {
    id: 'medieval_england',
    title: 'Medieval England',
    model: '8-Page',
    minWords: 340,
    maxWords: 560,
    lessons: 5,
  },
  {
    id: 'monarchy_religion_power',
    title: 'Monarchy, Religion & Power',
    model: '8-Page',
    minWords: 340,
    maxWords: 560,
    lessons: 5,
  },
  {
    id: 'first_british_empire',
    title: 'The First British Empire',
    model: '8-Page',
    minWords: 340,
    maxWords: 560,
    lessons: 5,
  },

  // KS3 12-Page Double-Page Spread Anthologies (2 pages per enquiry)
  {
    id: 'great_war_part2',
    title: 'The Great War (Part 2)',
    model: '12-Page',
    minWords: 680,
    maxWords: 1100,
    lessons: 5,
  },
  {
    id: 'second_british_empire',
    title: 'The Second British Empire',
    model: '12-Page',
    minWords: 680,
    maxWords: 1100,
    lessons: 5,
  },
  {
    id: 'the_shoah',
    title: 'The Holocaust / The Shoah',
    model: '12-Page',
    minWords: 380,
    maxWords: 650,
    lessons: 7,
  }, // 1 page per enquiry

  // GCSE 28-Page Master Editions (2 pages per enquiry across 12 lessons)
  {
    id: 'weimar_nazi_germany',
    title: 'Weimar & Nazi Germany',
    model: '28-Page',
    minWords: 720,
    maxWords: 1150,
    lessons: 12,
  },
  {
    id: 'cme_new',
    title: 'Conflict in the Middle East',
    model: '28-Page',
    minWords: 720,
    maxWords: 1150,
    lessons: 12,
  },
  {
    id: 'eee',
    title: 'Early Elizabethan England',
    model: '28-Page',
    minWords: 720,
    maxWords: 1150,
    lessons: 12,
  },
  {
    id: 'usa',
    title: 'USA: Conflict at Home & Abroad',
    model: '28-Page',
    minWords: 720,
    maxWords: 1150,
    lessons: 12,
  },
  {
    id: 'edexcel_medicine',
    title: 'Medicine in Britain',
    model: '28-Page',
    minWords: 720,
    maxWords: 1150,
    lessons: 12,
  },
];

function loadData(unitId) {
  const p = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(p)) return null;
  let raw = fs.readFileSync(p, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+[^;]+;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  try {
    return vm.runInNewContext(raw);
  } catch (err) {
    try {
      const sandbox = { module: { exports: {} }, exports: {} };
      vm.createContext(sandbox);
      vm.runInContext(raw, sandbox);
      return (
        sandbox.unitData ||
        sandbox.module.exports.unitData ||
        sandbox.module.exports[unitId] ||
        sandbox.module.exports
      );
    } catch (e2) {
      return null;
    }
  }
}

function countWords(str) {
  if (!str) return 0;
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

console.log('='.repeat(75));
console.log('📊 EDITORIAL NARRATIVE WORD-BUDGET AUDIT (PRINT REPROGRAPHICS)');
console.log('='.repeat(75));

let totalAudited = 0;
let totalWarnings = 0;

UNIT_BUDGET_CONFIGS.forEach((cfg) => {
  const data = loadData(cfg.id);
  if (!data || !data.lessons) {
    console.log(`⚠️ [${cfg.id}] Unable to load unit lessons data`);
    return;
  }

  console.log(
    `\n📘 ${cfg.title} [${cfg.id}] — Format: ${cfg.model} (Optimal: ${cfg.minWords}–${cfg.maxWords} words/enquiry)`,
  );

  const lessonSlice = data.lessons.slice(0, cfg.lessons);
  lessonSlice.forEach((l, idx) => {
    totalAudited++;
    const blocks = (l.narrative_blocks || []).filter((b) => b.text && b.type !== 'photo_slider');
    let words = 0;
    blocks.forEach((b) => {
      words += countWords(b.text);
    });

    let status = '✅ OPTIMAL';
    let advisory = '';

    if (words < cfg.minWords) {
      const diff = cfg.minWords - words;
      status = '⚠️ UNDERFLOW RISK';
      advisory = `(-${diff} words below optimal target)`;
      totalWarnings++;
    } else if (words > cfg.maxWords) {
      const diff = words - cfg.maxWords;
      status = '⚠️ OVERFLOW RISK';
      advisory = `(+${diff} words above optimal target)`;
      totalWarnings++;
    }

    const titleShort = (l.title || `Enquiry ${idx + 1}`)
      .replace(/^Enquiry\s+\d+:\s*/i, '')
      .slice(0, 42);
    console.log(
      `   Enquiry ${String(idx + 1).padStart(2, '0')}: ${titleShort.padEnd(44)} | ${String(words).padStart(4, ' ')} words | ${status} ${advisory}`,
    );
  });
});

console.log('\n' + '='.repeat(75));
console.log(
  `Audit Complete: ${totalAudited} lessons audited across ${UNIT_BUDGET_CONFIGS.length} units.`,
);
if (totalWarnings === 0) {
  console.log('🎉 100% of lessons fall squarely inside physical print reprographic budgets!');
} else {
  console.log(
    `Notice: ${totalWarnings} lessons have density advisories (calibrated by auto-balancer).`,
  );
}
console.log('='.repeat(75) + '\n');
