const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/units/early_modern_world/data.json', 'utf8'));
console.log(Object.keys(data));
if (data.data) console.log(Object.keys(data.data));
if (data.data && data.data.key_individuals) {
  console.log(JSON.stringify(data.data.key_individuals.find(p => p.name.includes('Clark')), null, 2));
}
