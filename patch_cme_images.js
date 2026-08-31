const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// 1. Fix Western Wall paratroopers
txt = txt.replace(
  '"src": "/images/paratroopers_western_wall.jpg"',
  '"src": "/units/cme_new/assets/western_wall_1967.jpg"'
);

// 2. Fix Khartoum Resolution Nasser card
txt = txt.replace(
  '"src": "/units/cme_new/assets/card_nasser.png"',
  '"src": "/units/cme_new/assets/nasser_1958.jpg"'
);

// 3. Fix Yasser Arafat UN olive branch
txt = txt.replace(
  '"src": "/units/cme_new/assets/yasser_arafat.jpg",\n            "custom_style": "max-height: 150px; width: auto; object-fit: contain;",\n            "caption": "Yasser Arafat, leader of the PLO, addressing the UN General Assembly with an olive branch and a gun."',
  '"src": "/units/cme_new/assets/arafat_1974.svg",\n            "custom_style": "max-height: 250px; width: auto; object-fit: contain;",\n            "caption": "Yasser Arafat, leader of the PLO, addressing the UN General Assembly with an olive branch and a gun."'
);

// 4. Fix Black September page break spillover
txt = txt.replace(
  /<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba\(0,0,0,0\.05\); margin: 20px 0;">/g,
  '<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 20px 0; page-break-inside: avoid;">'
);

fs.writeFileSync(dataFile, txt);

// Also copy it directly to public/units/cme_new/data.js
fs.copyFileSync(dataFile, 'public/units/cme_new/data.js');
console.log('Patched images and layout in data.js');
