
const fs = require('fs');

const tb = fs.readFileSync('public/units/edexcel_medicine/textbook_medieval.html', 'utf8');
const wb = fs.readFileSync('public/units/edexcel_medicine/pupil_workbook_medieval.html', 'utf8');

const regex = /Q\d+[.:]?\s*(?:[A-Z][a-z0-9 ]+)/g;

let tbQs = [...tb.matchAll(regex)].map(m => m[0]);
let wbQs = [...wb.matchAll(regex)].map(m => m[0]);

console.log('--- TEXTBOOK Qs ---');
console.log(tbQs.join('\n'));
console.log('\n--- WORKBOOK Qs ---');
console.log(wbQs.join('\n'));

