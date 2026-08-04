const fs = require('fs');

const dataContent = fs.readFileSync('public/units/cme_new/data.js', 'utf8');
const startIndex = dataContent.indexOf('export const unitData = {') !== -1 ? dataContent.indexOf('export const unitData = {') + 24 : dataContent.indexOf('{', dataContent.indexOf('import') !== -1 ? dataContent.indexOf('\n') : 0);
const endIndex = dataContent.lastIndexOf('}');
const jsonStr = dataContent.substring(startIndex, endIndex + 1);

let unitData;
try {
  unitData = eval('(function(){ const mock_exams=[]; return ' + jsonStr + ';})()');
  unitData.lessons.forEach((l, i) => {
    console.log(`Index ${i + 1} (L${i + 1}): ${l.title}`);
  });
} catch (e) {
  console.error(e);
}
