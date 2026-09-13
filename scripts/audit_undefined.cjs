const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const units = ['medieval_england', 'great_war_part2'];

console.log('====================================================');
console.log('🔍 AUDITING FOR UNDEFINED STRINGS & PAGE COUNTS');
console.log('====================================================');

let totalUndefined = 0;

units.forEach((unitId) => {
  console.log(`\n▶ Unit: [${unitId}]`);

  // Check data.js
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const uMatch = raw.match(/undefined/gi) || [];
    console.log(`  - units/${unitId}/data.js: ${uMatch.length} undefined occurrence(s)`);
    if (uMatch.length > 0) totalUndefined += uMatch.length;
  }

  // Check generated HTML in units/ and public/units/
  const locations = [
    path.join(ROOT_DIR, 'units', unitId),
    path.join(ROOT_DIR, 'public', 'units', unitId),
  ];

  const auditedFiles = new Set();

  locations.forEach((loc) => {
    if (!fs.existsSync(loc)) return;
    const files = fs.readdirSync(loc).filter((f) => f.endsWith('.html'));
    files.forEach((file) => {
      const full = path.join(loc, file);
      const rel = path.relative(ROOT_DIR, full);
      if (auditedFiles.has(full)) return;
      auditedFiles.add(full);

      const content = fs.readFileSync(full, 'utf8');
      const uCount = (content.match(/undefined/gi) || []).length;
      const pages = (content.match(/id=["']page-\d+["']/g) || []).length;

      console.log(
        `  - ${rel}: ${uCount} undefined occurrence(s) ${pages > 0 ? `(${pages} pages)` : ''}`,
      );
      if (uCount > 0) {
        totalUndefined += uCount;
        // Print snippet of undefined
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (/undefined/i.test(l)) {
            console.log(`      Line ${idx + 1}: ${l.trim().slice(0, 100)}`);
          }
        });
      }
    });
  });
});

// Check database.json
const dbPath = path.join(ROOT_DIR, 'public', 'database.json');
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  units.forEach((unitId) => {
    const unitObj = db[unitId];
    if (unitObj) {
      const str = JSON.stringify(unitObj);
      const uCount = (str.match(/undefined/gi) || []).length;
      console.log(`\n  - public/database.json [${unitId}]: ${uCount} undefined occurrence(s)`);
      if (uCount > 0) totalUndefined += uCount;
    }
  });
}

console.log('\n====================================================');
if (totalUndefined === 0) {
  console.log('🎉 100% CLEAN: Zero occurrences of "undefined" found!');
} else {
  console.log(`⚠️ FOUND ${totalUndefined} OCCURRENCE(S) OF "UNDEFINED"!`);
}
console.log('====================================================');
