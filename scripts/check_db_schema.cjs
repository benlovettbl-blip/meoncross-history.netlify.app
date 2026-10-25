const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./scripts/master_rights_database.json', 'utf8'));

console.log('Total units in DB:', Object.keys(db.units).length);
for (const [unitId, u] of Object.entries(db.units)) {
  console.log(`Unit: ${unitId} | Title: "${u.unit_title}" | Total sources: ${u.sources ? u.sources.length : 0}`);
}
