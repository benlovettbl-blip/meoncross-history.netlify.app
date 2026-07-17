const fs = require('fs');

const dbPath = './database.json';
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (db['water_and_sanitation'] && db['water_and_sanitation'].data) {
    db['water_and_sanitation'].data.enquiry = 'Why did it take so long to clean up Britain?';
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Set enquiry in database.json');
}

const db2Path = './public/units/water_and_sanitation/data.json';
if (fs.existsSync(db2Path)) {
    let db2 = JSON.parse(fs.readFileSync(db2Path, 'utf8'));
    db2.enquiry = 'Why did it take so long to clean up Britain?';
    fs.writeFileSync(db2Path, JSON.stringify(db2, null, 2), 'utf8');
    console.log('Set enquiry in public data.json');
}
