const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./scripts/master_rights_database.json', 'utf8'));

console.log('--- EEE in DB ---');
const eeeSources = (db.units.eee && db.units.eee.sources) || [];
eeeSources.filter(s => (s.asset_path || '').includes('gravelines') || (s.asset_path || '').includes('cadiz') || (s.artifact_title || '').toLowerCase().includes('gravelines') || (s.artifact_title || '').toLowerCase().includes('cadiz')).forEach(s => console.log(s));

console.log('--- MRP in DB ---');
const mrpSources = (db.units.monarchy_religion_power && db.units.monarchy_religion_power.sources) || [];
mrpSources.filter(s => (s.asset_path || '').includes('gravelines') || (s.asset_path || '').includes('cadiz') || (s.artifact_title || '').toLowerCase().includes('gravelines') || (s.artifact_title || '').toLowerCase().includes('cadiz')).forEach(s => console.log(s));
