const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// Fix Wailing Wall path to use the famous photo
txt = txt.replace(
  /\/images\/paratroopers_western_wall\.jpg/g,
  '/images/israeli_troops_wall.jpg'
);

fs.writeFileSync(dataFile, txt);
console.log('Fixed wailing wall image path.');
