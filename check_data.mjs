import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;\s*$/, '');
let unitData;
try {
  unitData = JSON.parse(jsonContent);
} catch (e) {
  // If there's trailing stuff, just eval it
  console.log("JSON parse error, trying eval");
  const script = dataContent.replace('export const unitData = ', 'module.exports = ');
  fs.writeFileSync('temp_data.cjs', script);
  unitData = require('./temp_data.cjs');
}

unitData.lessons.forEach((l, i) => {
  console.log('Lesson ' + (i+1) + ': ' + l.title);
  if (l.primary_source) console.log('  Primary Source: ' + l.primary_source.title + ' (src: ' + l.primary_source.src + ')');
  if (l.do_now) {
    console.log('  Do Now Type: ' + l.do_now.type);
    if (l.do_now.items) l.do_now.items.forEach(q => console.log('    ' + q.question));
  }
});
