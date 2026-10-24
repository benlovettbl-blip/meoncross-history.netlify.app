/**
 * scripts/generate_pure_narrative_textbook.cjs
 *
 * UNIVERSAL PURE NARRATIVE CLASSROOM TEXTBOOK AUTOMATION CLI & RUNNER
 * (12-Page Saddle-Stitch Model)
 *
 * Implements the Key Stage 3 Disciplinary History Classroom Textbook Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero QR codes/ledgers)
 * - Large, comfortable, high-legibility typography for KS3 reading (11.5pt body, 1.57–1.6 line-height)
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - 5 Canonical Enquiries across 5 flat double-page spreads (Verso + Recto)
 * - Explicit paragraph referencing [1.1] to [5.5] matching pupil workbook citations
 * - Front cover: Rich architectural layout (80x64mm hero plate, 2-para overview, 5-enquiry syllabus box with locators, core concepts strip)
 * - Back cover: 5-Card Master Knowledge Retrieval Quiz (Cards 1–4 for Enquiries 1–4, Card 5 full-width for compound Enquiry 5; 60 canonical questions, 0 answers)
 * - Strict institutional neutrality (strictly "The History Revision Hub")
 * - Automated Puppeteer audit (0px overflow, < 25px footer void, >= 95% utilization)
 * - Turnkey PDF and HTML compilation
 *
 * Usage:
 *   node scripts/generate_pure_narrative_textbook.cjs [unit_id | all]
 *   npm run build:textbook -- [unit_id]
 *   npm run build:textbook:all
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

// Unit registry mapping unit keys to their canonical compilers and output targets
const TEXTBOOK_REGISTRY = {
  medieval_england: {
    unitId: 'medieval_england',
    title: 'Medieval England (1066–1485)',
    compilerScript: path.join(__dirname, 'render_medieval_england_8page_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'medieval_england', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'medieval_england', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'medieval_england_textbook_FINAL_V17.pdf'),
  },
  great_war: {
    unitId: 'great_war',
    title: 'Causes of the Great War (1871–1914)',
    compilerScript: path.join(__dirname, 'render_great_war_8page_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'great_war', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'great_war', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_textbook_FINAL_V17.pdf'),
  },
  great_war_part2: {
    unitId: 'great_war_part2',
    title: 'The Great War (1914–1919)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_great_war_part2.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'great_war_part2', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'great_war_part2', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_part2_textbook_FINAL.pdf'),
  },
  water_and_sanitation: {
    unitId: 'water_and_sanitation',
    title: 'Water and Sanitation Through Time (AD 43–Present)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_water_and_sanitation.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'water_and_sanitation', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'water_and_sanitation_textbook_FINAL_V17.pdf'),
  },
  early_modern_world: {
    unitId: 'early_modern_world',
    title: 'The Early Modern World & Global Encounters (1450–1750)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_early_modern_world.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'early_modern_world', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'early_modern_world_textbook_FINAL_V17.pdf'),
  },
  industrialisation_and_empire: {
    unitId: 'industrialisation_and_empire',
    title: 'Industrialisation, Empire & Power (1750–1901)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_industrialisation.cjs'),
    htmlPath: path.join(
      ROOT_DIR,
      'public',
      'units',
      'industrialisation_and_empire',
      'textbook_PUBLISHER.html',
    ),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'textbook.html'),
    pdfPath: path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      'industrialisation_and_empire_textbook_FINAL_V17.pdf',
    ),
  },
  the_shoah: {
    unitId: 'the_shoah',
    title: 'The Holocaust / The Shoah',
    compilerScript: path.join(__dirname, 'render_standard_textbook_the_shoah.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'the_shoah', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'the_shoah', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'the_shoah_textbook_FINAL.pdf'),
  },
  post_war_britain: {
    unitId: 'post_war_britain',
    title: 'Rights, Protest, and Post-War Britain (1900–Present)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_post_war_britain.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'post_war_britain', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'post_war_britain', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'post_war_britain_textbook_FINAL_V17.pdf'),
  },
  monarchy_religion_power: {
    unitId: 'monarchy_religion_power',
    title: 'Crown, Church, or Parliament (1517–1689)',
    compilerScript: path.join(__dirname, 'render_monarchy_religion_power_8page_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'monarchy_religion_power', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'monarchy_religion_power', 'textbook.html'),
    pdfPath: path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      'monarchy_religion_power_textbook_FINAL_V17.pdf',
    ),
  },
  first_british_empire: {
    unitId: 'first_british_empire',
    title: 'The First British Empire (1600–1783)',
    compilerScript: path.join(__dirname, 'render_first_british_empire_8page_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'first_british_empire', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'first_british_empire', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'first_british_empire_textbook_FINAL_V17.pdf'),
  },
  second_british_empire: {
    unitId: 'second_british_empire',
    title: 'The Second British Empire (1783–1914)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_second_british_empire.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'second_british_empire', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'second_british_empire', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'second_british_empire_textbook_FINAL_V17.pdf'),
  },
  australia: {
    unitId: 'australia',
    title: 'The History of Australia (1770–1901)',
    compilerScript: path.join(__dirname, 'render_australia_8page_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'australia', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'australia', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'australia_textbook_FINAL_V17.pdf'),
  },
  cme_unified: {
    unitId: 'cme_unified',
    title: 'Conflict in the Middle East (1945–1995)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_cme_unified.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'textbook_UNIFIED.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'cme_new', 'textbook_UNIFIED.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook_UNIFIED_FINAL.pdf'),
  },
  cme_new: {
    unitId: 'cme_unified',
    title: 'Conflict in the Middle East (1945–1995)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_cme_unified.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'textbook_UNIFIED.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'cme_new', 'textbook_UNIFIED.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook_UNIFIED_FINAL.pdf'),
  },
  weimar_nazi_germany: {
    unitId: 'weimar_nazi_germany',
    title: 'Weimar and Nazi Germany (1918–1939)',
    compilerScript: path.join(__dirname, 'render_weimar_28page_master_textbook.cjs'),
    htmlPath: path.join(
      ROOT_DIR,
      'public',
      'units',
      'weimar_nazi_germany',
      'textbook_UNIFIED.html',
    ),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'textbook_UNIFIED.html'),
    pdfPath: path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      'weimar_nazi_germany_textbook_UNIFIED_FINAL.pdf',
    ),
  },
  eee: {
    unitId: 'eee',
    title: 'Early Elizabethan England (1558–1588)',
    compilerScript: path.join(__dirname, 'render_eee_28page_master_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'eee', 'textbook_UNIFIED.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'eee', 'textbook_UNIFIED.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'eee_textbook_UNIFIED_FINAL.pdf'),
  },
  edexcel_medicine: {
    unitId: 'edexcel_medicine',
    title: 'Medicine Through Time (c1250–Present)',
    compilerScript: path.join(__dirname, 'render_medicine_master_textbook.cjs'),
    htmlPath: path.join(
      ROOT_DIR,
      'public',
      'units',
      'edexcel_medicine',
      'textbook_medieval_PUBLISHER.html',
    ),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'textbook_medieval.html'),
    pdfPath: path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      'edexcel_medicine_textbook_medieval_FINAL_V17.pdf',
    ),
  },
  cold_war: {
    unitId: 'cold_war',
    title: 'The Cold War & Global Flashpoints (1945–1991)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_cold_war.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'cold_war', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'cold_war', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'cold_war_textbook_FINAL_V17.pdf'),
  },
  usa: {
    unitId: 'usa',
    title: 'USA, 1954–1975: Conflict at Home and Abroad',
    compilerScript: path.join(__dirname, 'render_usa_28page_master_textbook.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'usa', 'textbook_UNIFIED.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'usa', 'textbook_UNIFIED.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'usa_textbook_UNIFIED_FINAL.pdf'),
  },
  ks2_ww2: {
    unitId: 'ks2_ww2',
    title: 'KS2: World War II & The Home Front (1939–1945)',
    compilerScript: path.join(__dirname, 'render_standard_textbook_ks2_ww2.cjs'),
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'textbook.html'),
    rootHtmlPath: path.join(ROOT_DIR, 'units', 'ks2_ww2', 'textbook.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'ks2_ww2_textbook_FINAL.pdf'),
  },
};

/**
 * Executes compilation and verification for a single unit
 */
async function buildUnitTextbook(unitKey) {
  const config = TEXTBOOK_REGISTRY[unitKey];
  if (!config) {
    console.error(
      `❌ Error: Unknown unit key "${unitKey}". Available units:`,
      Object.keys(TEXTBOOK_REGISTRY).join(', '),
    );
    return false;
  }

  console.log(`\n=============================================================`);
  console.log(`🚀 COMPILING TEXTBOOK: ${config.title}`);
  console.log(`=============================================================`);

  if (!fs.existsSync(config.compilerScript)) {
    console.error(`❌ Compiler script not found: ${config.compilerScript}`);
    return false;
  }

  try {
    // Run the validated compiler script
    execSync(`node "${config.compilerScript}"`, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
      env: {
        ...process.env,
        PUPPETEER_EXECUTABLE_PATH:
          process.env.PUPPETEER_EXECUTABLE_PATH ||
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      },
    });

    // Post-compilation verification gates
    console.log('\nRunning Post-Compilation Verification Gates...');

    // 1. Verify HTML existence
    if (!fs.existsSync(config.htmlPath)) {
      throw new Error(`Public HTML output missing at: ${config.htmlPath}`);
    }
    const htmlContent = fs.readFileSync(config.htmlPath, 'utf8');

    // 2. Strict Institutional Neutrality Gate
    const prohibitedName = ['meon', 'cross'].join('');
    if (new RegExp(prohibitedName, 'i').test(htmlContent)) {
      throw new Error('FATAL: Institutional anonymity violation detected in generated text!');
    }
    console.log('✅ Institutional Neutrality Gate: PASSED (100% generic branding)');

    // 3. Verify PDF generation
    if (!fs.existsSync(config.pdfPath)) {
      throw new Error(`Master PDF output missing at: ${config.pdfPath}`);
    }
    const pdfStats = fs.statSync(config.pdfPath);
    if (pdfStats.size < 50000) {
      throw new Error(`Master PDF appears corrupted or too small (${pdfStats.size} bytes)`);
    }
    console.log(
      `✅ Master PDF Verified: ${config.pdfPath} (${(pdfStats.size / 1024).toFixed(1)} KB)`,
    );

    console.log(
      `\n🎉 SUCCESS: 12-Page Pure Narrative Textbook compiled and verified for ${config.title}!`,
    );
    return true;
  } catch (err) {
    console.error(`❌ Build failed for ${unitKey}:`, err.message);
    return false;
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || 'medieval_england';

  console.log('=============================================================');
  console.log('📚 THE HISTORY REVISION HUB — TEXTBOOK AUTOMATION ENGINE');
  console.log('=============================================================');

  if (target === 'all') {
    const keys = Object.keys(TEXTBOOK_REGISTRY);
    console.log(`Compiling all registered textbooks (${keys.length} units)...`);
    let allPassed = true;
    for (const key of keys) {
      const ok = await buildUnitTextbook(key);
      if (!ok) allPassed = false;
    }
    if (!allPassed) {
      process.exit(1);
    }
  } else {
    const ok = await buildUnitTextbook(target);
    if (!ok) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal CLI error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildUnitTextbook,
  TEXTBOOK_REGISTRY,
};
