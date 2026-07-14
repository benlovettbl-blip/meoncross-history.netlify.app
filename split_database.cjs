const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
const dataDir = path.join(__dirname, 'public', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

Object.keys(db).forEach(unitId => {
  const unitData = db[unitId];
  const unitFilePath = path.join(dataDir, `${unitId}.json`);
  fs.writeFileSync(unitFilePath, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`Extracted: ${unitId}.json`);
});

console.log('Database splitting complete!');
