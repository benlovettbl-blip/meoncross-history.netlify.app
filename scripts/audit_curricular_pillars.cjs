const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const launchpadPath = path.join(rootDir, 'src', 'engine', 'hero_launchpad.js');
const launchpadContent = fs.readFileSync(launchpadPath, 'utf8');

const match = launchpadContent.match(
  /export const CURRICULAR_PILLARS_CATALOG = ({[\s\S]*?});\n\n\/\*\*/,
);
if (!match) {
  console.error('Could not parse CURRICULAR_PILLARS_CATALOG');
  process.exit(1);
}

const catalog = eval('(' + match[1] + ')');

const units = [
  'ks2_ww2',
  'medieval_england',
  'monarchy_religion_power',
  'first_british_empire',
  'second_british_empire',
  'industrialisation_and_empire',
  'great_war',
  'great_war_part2',
  'the_shoah',
  'water_and_sanitation',
  'post_war_britain',
  'australia',
  'cme_new',
  'usa',
  'edexcel_medicine',
  'weimar_nazi_germany',
  'eee',
  'cold_war',
];

const pdfDir = path.join(rootDir, 'public', 'pdfs');
const allPdfs = fs.existsSync(pdfDir) ? fs.readdirSync(pdfDir) : [];

console.log(
  'UNIT'.padEnd(28) + 'TEXTBOOK'.padEnd(20) + 'WORKBOOK'.padEnd(20) + 'RETRIEVAL'.padEnd(20),
);
console.log('-'.repeat(88));

const missing = [];

units.forEach((u) => {
  const cat = catalog[u] || {};

  function statusStr(item, type) {
    if (!item) {
      const unitDir = path.join(rootDir, 'units', u);
      const htmlCandidates = fs.existsSync(unitDir)
        ? fs
            .readdirSync(unitDir)
            .filter(
              (f) =>
                f.includes('textbook') ||
                f.includes('workbook') ||
                f.includes('quiz') ||
                f.includes('companion') ||
                f.includes('mastery'),
            )
        : [];
      const pdfCandidates = allPdfs.filter((f) => f.toLowerCase().includes(u.toLowerCase()));

      missing.push({ unit: u, type, htmlCandidates, pdfCandidates });
      return '❌ MISSING';
    }
    const pdfExists = fs.existsSync(path.join(rootDir, 'public', item.pdfUrl.replace(/^\//, '')));
    const htmlExists =
      fs.existsSync(path.join(rootDir, 'public', item.htmlUrl.replace(/^\//, ''))) ||
      fs.existsSync(path.join(rootDir, item.htmlUrl.replace(/^\//, '')));

    if (pdfExists && htmlExists) return '✅ OK (PDF+HTML)';
    if (pdfExists && !htmlExists) return '⚠️ PDF only';
    if (!pdfExists && htmlExists) return '⚠️ HTML only';
    return '❌ 404 (Neither)';
  }

  const tb = statusStr(cat.textbook, 'textbook');
  const wb = statusStr(cat.workbook, 'workbook');
  const ret = statusStr(cat.retrieval, 'retrieval');

  console.log(u.padEnd(28) + tb.padEnd(20) + wb.padEnd(20) + ret.padEnd(20));
});

if (missing.length > 0) {
  console.log('\n--- DETAILED MISSING ITEMS & DISK FINDS ---');
  missing.forEach((m) => {
    console.log(`❌ [${m.unit}] Missing: ${m.type.toUpperCase()}`);
    console.log(`   HTMLs in units/${m.unit}: ${m.htmlCandidates.join(', ') || 'NONE'}`);
    console.log(`   PDFs in public/pdfs: ${m.pdfCandidates.join(', ') || 'NONE'}`);
  });
  console.error(`\n❌ AUDIT FAILED: ${missing.length} curricular pillar defect(s) detected.`);
  process.exit(1);
} else {
  console.log(
    '\n✅ 100% CURRICULAR PILLAR AUDIT PASSED: All 18 units have complete Textbook, Workbook, and Retrieval Companion assets.',
  );
  process.exit(0);
}
