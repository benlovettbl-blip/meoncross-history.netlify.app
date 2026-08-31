const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// Fix Wailing Wall path to use the valid local paratroopers photo
txt = txt.replace(
  /\/images\/cme_wailing_wall_1967\.jpg/g,
  '/images/paratroopers_western_wall.jpg'
);

// Fix Nasser photo path
txt = txt.replace(
  /\/units\/cme_new\/assets\/nasser_1958\.jpg/g,
  '/units/cme_new/assets/cme_stevan_kragujevic__gamal_abdel_naser_u_beogradu__1962.jpg'
);

// Fix Port Said photo path to Nasser Suez (since aerial photo was incorrect)
txt = txt.replace(
  /\/units\/cme_new\/assets\/cme_port_said_from_air\.jpg/g,
  '/units/cme_new/assets/nasser_suez.png'
);

fs.writeFileSync(dataFile, txt);
console.log('Fixed broken image paths.');
