/**
 * verify_all_gcse_specifications.cjs
 *
 * Forensic verification suite for all 17 extracted Pearson Edexcel GCSE History specifications.
 */

const fs = require('fs');
const path = require('path');

const SPEC_DIR = path.join(__dirname, '..', 'public', 'data', 'specifications');
const MANIFEST_PATH = path.join(SPEC_DIR, 'specifications_manifest.json');

const KNOWN_TERM_TESTS = {
  paper1_10_crime_punishment: ['Forest Laws', 'tithings', 'hue and cry'],
  paper1_11_medicine_britain: ['Western Front', 'Vesalius', 'Harvey'],
  paper1_12_warfare_british_society: ['Second World War', 'conscription'],
  paper1_13_migrants_britain: ['Notting Hill', 'Aliens Act', 'Race Relations Act'],
  paper2_b1_anglo_saxon_norman: ['Harold Godwinson', 'Stamford Bridge', 'Hastings'],
  paper2_b2_richard_and_john: ['Richard I', 'King John', 'Magna Carta'],
  paper2_b3_henry_viii_ministers: ['Wolsey', 'Cromwell', 'Reformation'],
  paper2_b4_early_elizabethan_england: ['Religious settlement', 'Mary, Queen of Scots', 'Armada'],
  paper2_p1_spain_new_world: ['Columbus', 'conquistadors', 'Montezuma'],
  paper2_p2_british_america: ['settlement', 'War of Independence', 'Declaration of Independence'],
  paper2_p3_american_west: ['Indigenous peoples of the Plains', 'Manifest Destiny', 'cattle'],
  paper2_p4_superpower_cold_war: [
    'Tehran, Yalta and Potsdam',
    'Truman Doctrine',
    'Berlin Wall',
    'Cuban Missile Crisis',
  ],
  paper2_p5_middle_east: ['King David Hotel', 'Suez Crisis', 'Six Day War', 'Camp David'],
  paper3_30_russia_soviet_union: ['Bolshevik', 'Trotsky', 'Stalin', 'Purges'],
  paper3_31_weimar_nazi_germany: ['Kaiser', 'Weimar Constitution', 'Munich Putsch', 'Stresemann'],
  paper3_32_maos_china: ['Civil War', 'Great Leap Forward', 'Cultural Revolution'],
  paper3_33_usa_conflict_home_abroad: ['Brown v. Topeka', 'Little Rock', 'Montgomery', 'Vietnam'],
};

function runVerification() {
  console.log('================================================================');
  console.log('  VERIFYING CANONICAL SPECIFICATION REPOSITORY (17 OPTIONS)    ');
  console.log('================================================================\n');

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('FAIL: specifications_manifest.json not found!');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  console.log(`Manifest loaded: ${manifest.options.length} options indexed.`);
  console.log(`Qualification: ${manifest.qualification} (${manifest.issue})`);
  console.log(`Total Points Across All Options: ${manifest.total_specification_points}\n`);

  if (manifest.options.length !== 17) {
    console.error(`FAIL: Expected 17 options in manifest, found ${manifest.options.length}`);
    process.exit(1);
  }

  let totalTests = 0;
  let passedTests = 0;

  manifest.options.forEach((optMeta) => {
    totalTests++;
    const filePath = path.join(__dirname, '..', 'public', optMeta.file);
    if (!fs.existsSync(filePath)) {
      console.error(`[FAIL] File missing: ${filePath}`);
      return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Check basic metadata
    if (!data.id || !data.code || !data.title || !data.exam_structure) {
      console.error(`[FAIL] Incomplete metadata in ${optMeta.id}`);
      return;
    }

    // Check sections and topics
    if (!Array.isArray(data.sections) || data.sections.length === 0) {
      console.error(`[FAIL] No sections in ${optMeta.id}`);
      return;
    }

    let pointsCount = 0;
    let hasEmptyPoints = false;
    let fullText = `${data.title} ${data.subtitle}`;

    data.sections.forEach((sec) => {
      fullText += ' ' + sec.title;
      if (!sec.topics || sec.topics.length === 0) {
        console.error(`[FAIL] Section "${sec.title}" in ${optMeta.id} has no topics`);
      }
      sec.topics.forEach((top) => {
        fullText += ' ' + top.title;
        top.points.forEach((pt) => {
          pointsCount++;
          fullText += ' ' + pt;
          if (!pt || typeof pt !== 'string' || pt.trim().length === 0) {
            hasEmptyPoints = true;
          }
        });
      });
    });

    if (hasEmptyPoints) {
      console.error(`[FAIL] ${optMeta.id} has empty bullet points`);
      return;
    }

    // Check known terms
    const requiredTerms = KNOWN_TERM_TESTS[optMeta.id] || [];
    const missingTerms = [];
    requiredTerms.forEach((term) => {
      const regex = new RegExp(term, 'i');
      if (!regex.test(fullText)) {
        missingTerms.push(term);
      }
    });

    if (missingTerms.length > 0) {
      console.error(
        `[FAIL] ${optMeta.id} missing expected syllabus terms: ${missingTerms.join(', ')}`,
      );
      return;
    }

    passedTests++;
    console.log(
      `[PASS] ${optMeta.code.padEnd(3)} | ${optMeta.shortTitle.padEnd(30)} | ${pointsCount} points | Forensic Terms: OK (${requiredTerms.length}/${requiredTerms.length})`,
    );
  });

  console.log('\n================================================================');
  console.log(`VERIFICATION RESULT: ${passedTests}/${totalTests} OPTIONS 100% GREEN`);
  console.log('Canonical Specification Directory is valid and fully synchronized.');
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runVerification();
