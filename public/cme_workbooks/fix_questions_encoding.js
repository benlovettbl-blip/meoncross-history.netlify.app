const fs = require('fs');

const filePath = 'questions.js';
console.log(`Reading ${filePath}...`);
let content = fs.readFileSync(filePath, 'utf8');

// Replacements for common CP437 corruptions of UTF-8 characters:
// \xE2\x80\x93 (en-dash '–') -> CP437 'ÔÇô'
// \xE2\x80\x99 (smart apostrophe '’') -> CP437 'ÔÇÖ'
// \xE2\x80\x9C (left double quote '“') -> CP437 'ÔÇ£'
// \xE2\x80\x9D (right double quote '”') -> CP437 'ÔÇØ' or 'ÔÇ'
// \xE2\x80\x98 (left single quote '‘') -> CP437 'ÔÇÿ'
// \xE2\x80\x94 (em-dash '—') -> CP437 'ÔÇö'

const replacements = [
  { search: /ÔÇô/g, replace: '-' },
  { search: /ÔÇÖ/g, replace: "'" },
  { search: /ÔÇ£/g, replace: '"' },
  { search: /ÔÇØ/g, replace: '"' },
  { search: /ÔÇÿ/g, replace: "'" },
  { search: /ÔÇö/g, replace: '--' },
  { search: /ÔÇÖ/g, replace: "'" }, // double check just in case
  // Sometimes it's ÔÇÖ itself represented differently
];

let replacedCount = 0;
replacements.forEach(rep => {
  const matches = content.match(rep.search);
  if (matches) {
    replacedCount += matches.length;
    content = content.replace(rep.search, rep.replace);
  }
});

console.log(`Found and replaced ${replacedCount} encoding issues.`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("File saved successfully.");
