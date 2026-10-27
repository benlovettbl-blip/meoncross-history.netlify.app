const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/weimar_nazi_germany.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};
export default unitData;
export { unitData };
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(path.join(__dirname, '../units/weimar_nazi_germany/data.js'), jsContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '../public/units/weimar_nazi_germany/data.js'), jsContent, 'utf8');
console.log('Successfully synced data.js files for weimar_nazi_germany');
