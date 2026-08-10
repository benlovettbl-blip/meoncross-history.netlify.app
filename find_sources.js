const fs = require('fs');
const dataContent = fs.readFileSync('early_modern_world/data.js', 'utf8');
const match = dataContent.match(/export const unitData = ([\s\S]+);/);
const unitData = eval('(' + match[1] + ')');

function findSources(obj, path, results) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => findSources(item, `${path}[${idx}]`, results));
  } else {
    for (let key in obj) {
      if (key === 'sources') {
        results.push({ path: path + '.sources', value: obj[key] });
      } else {
        findSources(obj[key], `${path}.${key}`, results);
      }
    }
  }
}

unitData.lessons.forEach((lesson, index) => {
  let results = [];
  findSources(lesson, `Lesson ${index + 1}`, results);
  console.log(`Lesson ${index + 1}:`);
  if (results.length === 0) {
    console.log('  None');
  } else {
    results.forEach(res => {
      console.log(`  ${res.path} -> ${res.value.length} sources`);
      res.value.forEach((s, i) => console.log(`    ${String.fromCharCode(65 + i)}: ${s.title || s.type}`));
    });
  }
});
