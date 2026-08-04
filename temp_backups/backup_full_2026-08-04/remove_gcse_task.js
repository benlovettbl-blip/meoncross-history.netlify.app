const fs = require('fs');
const {unitData} = require('./weimar_nazi_germany/data.js');

unitData.lessons.forEach(l => {
  delete l.gcse_task;
});

const fileStr = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nif (typeof module !== "undefined") {\n  module.exports = { unitData };\n}\n';
fs.writeFileSync('weimar_nazi_germany/data.js', fileStr);
console.log('Removed gcse_task from all lessons.');
