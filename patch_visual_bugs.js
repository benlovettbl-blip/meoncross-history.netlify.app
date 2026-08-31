const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// 1. Fix Western Wall
txt = txt.replace(
  /\/units\/cme_new\/assets\/western_wall_1967\.jpg/g,
  '/images/cme_wailing_wall_1967.jpg'
);

// 2. Fix Operation Focus aircraft
txt = txt.replace(
  /\/images\/fouga_magister_iaf\.jpg/g,
  '/images/operation_focus_historic.jpg'
);

// 3. Fix Ariel Sharon
txt = txt.replace(
  /\/units\/cme_new\/assets\/ariel_sharon\.webp/g,
  '/images/sharon_yom_kippur.jpg'
);

// 4. Fix Black September Flowchart CSS
txt = txt.replace(
  /<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba\(0,0,0,0\.05\); margin: 20px 0;">/g,
  '<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 10px 0; page-break-inside: avoid;">'
);
txt = txt.replace(
  /<div style=\\"background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba\(0,0,0,0\.05\); margin: 20px 0;\\">/g,
  '<div style=\\"background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 10px 0; page-break-inside: avoid;\\">'
);

fs.writeFileSync(dataFile, txt);
fs.copyFileSync(dataFile, 'public/units/cme_new/data.js');

console.log('Fixed visual bugs');
