/**
 * History Revision Hub — Universal Master Textbook CLI & Registry
 *
 * Compiles Master Textbooks across Key Stage 3 and GCSE units using
 * the publisher-grade dual-column prose architecture:
 * - medieval_england: 20-Page A4 Publisher Master Textbook (9 Enquiries + Living Back Cover)
 * - early_modern_world: 20-Page A4 Publisher Master Textbook (9 Enquiries + Living Back Cover)
 * - industrialisation_and_empire: 18-Page A4 Publisher Master Textbook (8 Enquiries + Living Back Cover)
 * - great_war: 14-Page A4 Publisher Master Textbook (6 Enquiries + Living Back Cover)
 * - weimar_nazi_germany: 10-Page A4 Publisher Master Textbooks for KT1, KT2, KT3, KT4
 *
 * Usage:
 *   node scripts/generate_master_textbook.cjs <unit_id> [sub_arg]
 *
 * Examples:
 *   node scripts/generate_master_textbook.cjs medieval_england
 *   node scripts/generate_master_textbook.cjs early_modern_world
 *   node scripts/generate_master_textbook.cjs industrialisation_and_empire
 *   node scripts/generate_master_textbook.cjs weimar_nazi_germany kt1
 *   node scripts/generate_master_textbook.cjs weimar_nazi_germany all
 *   node scripts/generate_master_textbook.cjs all
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const UNIT_REGISTRY = {
  medieval_england: {
    title: 'Medieval England & The Struggle for Power (1066–1485)',
    year: 7,
    compile: async (subArg) => {
      const {
        renderMedievalMasterTextbook,
      } = require('./render_standard_textbook_medieval_england.cjs');
      return await renderMedievalMasterTextbook();
    },
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'medieval_england', 'textbook_PUBLISHER.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'medieval_england_textbook_PUBLISHER.pdf'),
  },
  early_modern_world: {
    title: 'The Early Modern World & The English Civil War (1509–1745)',
    year: 8,
    compile: async (subArg) => {
      const { runEarlyModernWorld } = require('./render_standard_textbook_early_modern_world.cjs');
      return await runEarlyModernWorld();
    },
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'early_modern_world_textbook.pdf'),
  },
  industrialisation_and_empire: {
    title: 'Industrialisation, Empire & Power (1750–1901)',
    year: 8,
    compile: async (subArg) => {
      const {
        renderPublisherTextbook,
      } = require('./render_standard_textbook_industrialisation.cjs');
      return await renderPublisherTextbook();
    },
    htmlPath: path.join(
      ROOT_DIR,
      'public',
      'units',
      'industrialisation_and_empire',
      'textbook_PUBLISHER.html',
    ),
    pdfPath: path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      'industrialisation_and_empire_textbook_PUBLISHER.pdf',
    ),
  },
  great_war: {
    title: 'The Great War & The Western Front (1871–1918)',
    year: 9,
    compile: async (subArg) => {
      const { runGreatWar } = require('./render_standard_textbook_great_war.cjs');
      return await runGreatWar();
    },
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'great_war', 'textbook_PUBLISHER.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_textbook_PUBLISHER.pdf'),
  },
  weimar_nazi_germany: {
    title: 'Weimar & Nazi Germany (1918–1939) [GCSE Paper 3]',
    year: 10,
    compile: async (subArg) => {
      const { renderTextbookPdf } = require('./render_weimar_master_textbook.cjs');
      const target = (subArg || 'all').toLowerCase();
      if (target === 'all') {
        for (const kt of ['kt1', 'kt2', 'kt3', 'kt4']) {
          await renderTextbookPdf(kt);
        }
      } else if (['kt1', 'kt2', 'kt3', 'kt4'].includes(target)) {
        await renderTextbookPdf(target);
      } else {
        throw new Error(`Unknown Weimar key topic "${target}". Choose kt1, kt2, kt3, kt4, or all.`);
      }
    },
    htmlPath: path.join(
      ROOT_DIR,
      'public',
      'units',
      'weimar_nazi_germany',
      'textbook_kt1_PUBLISHER.html',
    ),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'weimar_textbook_kt1_PUBLISHER.pdf'),
  },
};

// Aliases for convenience
UNIT_REGISTRY['industrialisation'] = UNIT_REGISTRY['industrialisation_and_empire'];
UNIT_REGISTRY['weimar'] = UNIT_REGISTRY['weimar_nazi_germany'];

async function main() {
  const allArgs = process.argv.slice(2);
  if (allArgs.includes('--help') || allArgs.includes('-h') || allArgs.includes('help')) {
    console.log(`\n=============================================================`);
    console.log(`📚 THE HISTORY REVISION HUB — MASTER TEXTBOOK PUBLISHING REGISTRY`);
    console.log(`=============================================================`);
    console.log(`Usage: node scripts/generate_master_textbook.cjs <unit_id> [sub_arg]\n`);
    console.log(`Available units:`);
    console.log(`  - medieval_england           (Year 7: 20-page A4 Master Textbook)`);
    console.log(`  - early_modern_world         (Year 8: 20-page A4 Master Textbook)`);
    console.log(`  - industrialisation_and_empire (Year 8: 18-page A4 Master Textbook)`);
    console.log(`  - great_war                  (Year 9: 14-page A4 Master Textbook)`);
    console.log(`  - weimar_nazi_germany        (GCSE Paper 3: 10-page A4 Master Textbooks)`);
    console.log(`  - all                        (Sequential batch compile of all units)\n`);
    return;
  }

  const args = allArgs.filter((a) => !a.startsWith('--'));
  const rawTarget = args[0] || 'medieval_england';
  const subArg = args[1];

  console.log(`\n=============================================================`);
  console.log(`📚 THE HISTORY REVISION HUB — MASTER TEXTBOOK PUBLISHING REGISTRY`);
  console.log(`=============================================================`);

  if (rawTarget === 'all') {
    const unitsToCompile = [
      'medieval_england',
      'early_modern_world',
      'industrialisation_and_empire',
      'great_war',
      'weimar_nazi_germany',
    ];
    console.log(
      `Initiating sequential compilation across ${unitsToCompile.length} core master textbook series...\n`,
    );

    for (const uId of unitsToCompile) {
      const entry = UNIT_REGISTRY[uId];
      console.log(`\n-------------------------------------------------------------`);
      console.log(`▶ Compiling: ${entry.title} [${uId}]`);
      console.log(`-------------------------------------------------------------`);
      await entry.compile();
      console.log(`✅ Completed: ${entry.title}`);
    }

    console.log(`\n=============================================================`);
    console.log(`🎉 100% SUCCESS: All Master Textbooks successfully compiled!`);
    console.log(`=============================================================\n`);
    return;
  }

  const unitKey = rawTarget.toLowerCase();
  const entry = UNIT_REGISTRY[unitKey];

  if (!entry) {
    console.error(`❌ Unknown unit identifier: "${rawTarget}".`);
    console.log(`Available units in Master Registry:`);
    Object.keys(UNIT_REGISTRY).forEach((k) => {
      if (k !== 'industrialisation' && k !== 'weimar') {
        console.log(`  - ${k} (${UNIT_REGISTRY[k].title})`);
      }
    });
    console.log(`  - all (compile entire catalogue)`);
    process.exit(1);
  }

  console.log(`Target Unit: ${entry.title}`);
  console.log(`Execution Mode: Master Textbook Compilation & Layout Audit`);
  if (subArg) console.log(`Sub-target argument: ${subArg}`);
  console.log(`-------------------------------------------------------------\n`);

  const startTime = Date.now();
  await entry.compile(subArg);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n=============================================================`);
  console.log(`🎉 Master Textbook compilation for [${unitKey}] completed in ${elapsed}s!`);
  console.log(`=============================================================\n`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(`\n❌ Fatal Compilation Error in Master Textbook Registry:`, err);
    process.exit(1);
  });
}

module.exports = {
  UNIT_REGISTRY,
  main,
};
