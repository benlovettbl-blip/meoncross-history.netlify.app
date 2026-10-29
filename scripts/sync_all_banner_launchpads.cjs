/**
 * scripts/sync_all_banner_launchpads.cjs
 *
 * Synchronizes the Hero Banner Launchpad (src/engine/hero_launchpad.js),
 * the Workbooks Zone (src/workbooks_zone.js), and all public/ HTML/PDF aliases
 * so that when the site is pushed to Netlify, every single unit banner's
 * "Retrieval Companion" button immediately opens the brand-new, unified Master Companion.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const PDFS_DIR = path.join(PUBLIC_DIR, 'pdfs');

console.log('🚀 Starting Universal Banner & Launchpad Synchronization...');

// 1. Ensure file aliases in public/units and public/pdfs
const KS3_UNITS = [
  { key: 'great_war', title: 'Causes_of_the_Great_War', qs: 30 },
  { key: 'great_war_part2', title: 'The_Course_of_the_Great_War', qs: 30 },
  { key: 'medieval_england', title: 'Medieval_England', qs: 30 },
  { key: 'monarchy_religion_power', title: 'Crown_Church_or_Parliament', qs: 30 },
  { key: 'first_british_empire', title: 'The_First_British_Empire', qs: 30 },
  { key: 'second_british_empire', title: 'The_Second_British_Empire', qs: 30 },
  { key: 'industrialisation_and_empire', title: 'Industrialisation_Power_and_Protest', qs: 30 },
  { key: 'water_and_sanitation', title: 'Water_and_Sanitation', qs: 30 },
  { key: 'the_shoah', title: 'The_Shoah', qs: 30 },
  { key: 'post_war_britain', title: 'Post_War_Britain', qs: 30 },
  { key: 'australia', title: 'History_of_Australia', qs: 30 },
];

KS3_UNITS.forEach((u) => {
  const masterHtml = path.join(PUBLIC_DIR, 'units', u.key, `${u.key}_retrieval_companion.html`);
  const aliasHtml = path.join(PUBLIC_DIR, 'units', u.key, 'quiz_pack.html');
  if (fs.existsSync(masterHtml)) {
    fs.copyFileSync(masterHtml, aliasHtml);
    console.log(`✅ Synced HTML alias: ${u.key}/quiz_pack.html`);
  }

  const masterPdf = path.join(PDFS_DIR, `${u.title}_Master_Knowledge_Retrieval_Companion.pdf`);
  if (fs.existsSync(masterPdf)) {
    const alias1 = path.join(PDFS_DIR, `${u.key}_quiz_pack.pdf`);
    const alias2 = path.join(PDFS_DIR, `${u.key}_quiz_pack_FINAL_V1.pdf`);
    const alias3 = path.join(PDFS_DIR, `${u.key}_quiz_pack_FINAL_V17.pdf`);
    fs.copyFileSync(masterPdf, alias1);
    fs.copyFileSync(masterPdf, alias2);
    fs.copyFileSync(masterPdf, alias3);
    console.log(`✅ Synced PDF aliases for: ${u.key}`);
  }
});

// Medicine Through Time aliases
const medMaster = path.join(
  PDFS_DIR,
  'Medicine_Through_Time_Master_Knowledge_Retrieval_Companion.pdf',
);
const medThematic = path.join(
  PDFS_DIR,
  'Medicine_Thematic_Study_Master_Knowledge_Retrieval_Companion.pdf',
);
if (fs.existsSync(medMaster)) {
  fs.copyFileSync(medMaster, medThematic);
  console.log(
    '✅ Synced Medicine PDF: Medicine_Thematic_Study_Master_Knowledge_Retrieval_Companion.pdf',
  );
}

// Cold War aliases
const cwMasterHtml = path.join(
  PUBLIC_DIR,
  'units',
  'cold_war',
  'cold_war_master_retrieval_companion.html',
);
const cwAliasHtml = path.join(PUBLIC_DIR, 'units', 'cold_war', 'quiz_pack.html');
if (fs.existsSync(cwMasterHtml)) {
  fs.copyFileSync(cwMasterHtml, cwAliasHtml);
  console.log('✅ Synced Cold War HTML alias: cold_war/quiz_pack.html');
}

const cwMasterPdf = path.join(
  PDFS_DIR,
  'Superpower_Relations_and_Cold_War_Master_Knowledge_Retrieval_Companion.pdf',
);
if (fs.existsSync(cwMasterPdf)) {
  fs.copyFileSync(cwMasterPdf, path.join(PDFS_DIR, 'cold_war_quiz_pack.pdf'));
  fs.copyFileSync(cwMasterPdf, path.join(PDFS_DIR, 'cold_war_quiz_pack_FINAL_V17.pdf'));
  console.log('✅ Synced Cold War PDF aliases');
}

// KS2 aliases
const ks2MasterPdf = path.join(PDFS_DIR, 'ks2_ww2_quiz_pack.pdf');
if (fs.existsSync(ks2MasterPdf)) {
  fs.copyFileSync(ks2MasterPdf, path.join(PDFS_DIR, 'ks2_ww2_quiz_pack_FINAL_V17.pdf'));
  console.log('✅ Synced KS2 PDF alias: ks2_ww2_quiz_pack_FINAL_V17.pdf');
}

// 2. Update src/engine/hero_launchpad.js
const launchpadFile = path.join(ROOT_DIR, 'src', 'engine', 'hero_launchpad.js');
let lpCode = fs.readFileSync(launchpadFile, 'utf8');

// Update KS3 units in hero_launchpad.js
KS3_UNITS.forEach((u) => {
  // Regex to match the retrieval block for u.key
  const reg = new RegExp(
    `(${u.key}:\\s*{[\\s\\S]*?retrieval:\\s*{[\\s\\S]*?htmlUrl:\\s*['"])[^'"]+(['"],\\s*pdfUrl:\\s*['"])[^'"]+(['"])`,
  );
  if (reg.test(lpCode)) {
    lpCode = lpCode.replace(
      reg,
      `$1/units/${u.key}/${u.key}_retrieval_companion.html$2/pdfs/${u.title}_Master_Knowledge_Retrieval_Companion.pdf$3`,
    );
    console.log(`✅ Updated hero_launchpad.js for: ${u.key}`);
  }
});

// Update cold_war in hero_launchpad.js
const cwReg =
  /(cold_war:\s*{[\s\S]*?retrieval:\s*{[\s\S]*?htmlUrl:\s*['"])[^'"]+(['"],\s*pdfUrl:\s*['"])[^'"]+(['"])/;
if (cwReg.test(lpCode)) {
  lpCode = lpCode.replace(
    cwReg,
    `$1/units/cold_war/cold_war_master_retrieval_companion.html$2/pdfs/Superpower_Relations_and_Cold_War_Master_Knowledge_Retrieval_Companion.pdf$3`,
  );
  console.log('✅ Updated hero_launchpad.js for: cold_war');
}

// Update edexcel_medicine in hero_launchpad.js
const medReg =
  /(edexcel_medicine:\s*{[\s\S]*?retrieval:\s*{[\s\S]*?htmlUrl:\s*['"])[^'"]+(['"],\s*pdfUrl:\s*['"])[^'"]+(['"])/;
if (medReg.test(lpCode)) {
  lpCode = lpCode.replace(
    medReg,
    `$1/units/edexcel_medicine/medicine_master_retrieval_companion.html$2/pdfs/Medicine_Through_Time_Master_Knowledge_Retrieval_Companion.pdf$3`,
  );
  console.log('✅ Updated hero_launchpad.js for: edexcel_medicine');
}

fs.writeFileSync(launchpadFile, lpCode, 'utf8');
console.log('🎉 Successfully synchronized src/engine/hero_launchpad.js!');
