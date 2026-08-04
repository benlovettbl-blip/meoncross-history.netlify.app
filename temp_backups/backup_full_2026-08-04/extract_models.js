const fs = require('fs');
['great_war/data.js', 'great_war_part2/data.js'].forEach(file => {
  let text = fs.readFileSync(file, 'utf8');
  let jsonStr = text.replace(/export const unitData = |export default /, '').trim().replace(/;$/, '');
  let obj = JSON.parse(jsonStr);
  let id = 1;
  const findModels = (node) => {
    if (typeof node === 'object' && node !== null) {
      if (node.model && typeof node.model === 'string' && !node.model.includes('<strong>')) {
        console.log(`\n--- ${file} MODEL ${id++} ---`);
        console.log(node.model);
      }
      for (let key in node) {
        findModels(node[key]);
      }
    }
  }
  findModels(obj);
});
