const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

function findKey(obj, path = '') {
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj)) {
    const curPath = path ? `${path}.${k}` : k;
    if (typeof v === 'string') {
      if (
        v.includes('blitz_targets_map') ||
        v.includes('atlantic_lifeline_map') ||
        v.includes('kindertransport_route_map') ||
        v.includes('evacuation_map_1939')
      ) {
        console.log(`FOUND in string at ${curPath}: ${v}`);
      }
    } else {
      findKey(v, curPath);
    }
  }
}

findKey(db);
