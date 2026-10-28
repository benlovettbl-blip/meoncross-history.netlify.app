const fs = require('fs');
const path = require('path');

const targetUnits = [
  'great_war',
  'great_war_part2',
  'second_british_empire',
  'industrialisation_and_empire',
  'post_war_britain',
  'australia'
];

targetUnits.forEach(unit => {
  const p = path.join(__dirname, `../units/${unit}/data.js`);
  if (!fs.existsSync(p)) return;

  let raw = fs.readFileSync(p, 'utf8');
  const countBefore = (raw.match(/"provenance_clues"/g) || []).length;

  let cleaned = raw.replace(/,\s*"provenance_clues":\s*(\[[^\]]*\]|{[^}]*})/g, '');
  cleaned = cleaned.replace(/"provenance_clues":\s*(\[[^\]]*\]|{[^}]*}),\s*/g, '');

  fs.writeFileSync(p, cleaned, 'utf8');

  // Also update public/units/<unit>/data.js if it exists
  const pubUnitPath = path.join(__dirname, `../public/units/${unit}/data.js`);
  if (fs.existsSync(pubUnitPath)) {
    fs.writeFileSync(pubUnitPath, cleaned, 'utf8');
  }

  // Also update data/<unit>.json and public/data/<unit>.json
  const jsonPath = path.join(__dirname, `../data/${unit}.json`);
  if (fs.existsSync(jsonPath)) {
    let jRaw = fs.readFileSync(jsonPath, 'utf8');
    let jClean = jRaw.replace(/,\s*"provenance_clues":\s*(\[[^\]]*\]|{[^}]*})/g, '');
    jClean = jClean.replace(/"provenance_clues":\s*(\[[^\]]*\]|{[^}]*}),\s*/g, '');
    fs.writeFileSync(jsonPath, jClean, 'utf8');
  }

  const pubJsonPath = path.join(__dirname, `../public/data/${unit}.json`);
  if (fs.existsSync(pubJsonPath)) {
    let pjRaw = fs.readFileSync(pubJsonPath, 'utf8');
    let pjClean = pjRaw.replace(/,\s*"provenance_clues":\s*(\[[^\]]*\]|{[^}]*})/g, '');
    pjClean = pjClean.replace(/"provenance_clues":\s*(\[[^\]]*\]|{[^}]*}),\s*/g, '');
    fs.writeFileSync(pubJsonPath, pjClean, 'utf8');
  }

  console.log(`Unit ${unit}: successfully stripped ${countBefore} provenance_clues!`);
});
