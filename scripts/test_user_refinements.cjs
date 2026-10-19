const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const specPath = path.join(ROOT_DIR, 'public', 'data', 'cme_new_spec.json');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

console.log('Specification Title:', spec.title);
console.log('Specification Subtitle:', spec.subtitle);

spec.sections.forEach((s, sIdx) => {
  console.log(`\nSection ${sIdx + 1}: ${s.title}`);
  s.topics.forEach((t, tIdx) => {
    console.log(`  Topic ${tIdx + 1}: ${t.title}`);
    t.points.forEach((p, pIdx) => {
      console.log(`    Point ${pIdx + 1}: ${p}`);
    });
  });
});
