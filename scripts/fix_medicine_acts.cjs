const fs = require('fs');

const d =
  require('../units/edexcel_medicine/data.js').default ||
  require('../units/edexcel_medicine/data.js');

d.lessons.forEach((l) => {
  l.narrative_blocks.forEach((b, i) => {
    if (b.act === undefined) b.act = i + 1;
  });
});

const output = `const edexcel_medicine_data = ${JSON.stringify(d, null, 2)};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = edexcel_medicine_data;
}
export default edexcel_medicine_data;
`;

fs.writeFileSync('units/edexcel_medicine/data.js', output, 'utf8');
fs.writeFileSync('public/units/edexcel_medicine/data.js', output, 'utf8');
console.log('✅ Successfully added act: 1..5 to all edexcel_medicine lessons!');
