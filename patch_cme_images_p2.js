const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// 1. Missing Names in Captions
txt = txt.replace(
  '"caption": " declaring the establishment of the State of Israel on May 14, 1948."',
  '"caption": "David Ben-Gurion declaring the establishment of the State of Israel on May 14, 1948."'
);
txt = txt.replace(
  '"caption": "British Prime Minister  (center), whose career was ruined by the failure of the Suez intervention."',
  '"caption": "British Prime Minister Anthony Eden (center), whose career was ruined by the failure of the Suez intervention."'
);
txt = txt.replace(
  '"caption": "Yitzhak Rabin, Yasser Arafat, and  sealing the Oslo I Accord on the White House lawn."',
  '"caption": "Yitzhak Rabin, Yasser Arafat, and Bill Clinton sealing the Oslo I Accord on the White House lawn."'
);

// 2. Suez Crisis Image
txt = txt.replace(
  '"src": "/assets/cme_suez_crisis.jpg"',
  '"src": "/units/cme_new/assets/cme_port_said_from_air.jpg"'
);

// 3. Top Trumps Replacements
txt = txt.replace(
  '"src": "/units/cme_new/assets/card_golda.png"',
  '"src": "/images/golda_meir.jpg"'
);
txt = txt.replace(
  '"src": "/units/cme_new/assets/card_shamir.png"',
  '"src": "/images/yitzhak_shamir.jpg"'
);
txt = txt.replace(
  '"src": "/units/cme_new/assets/card_hussein.png"',
  '"src": "/images/king_hussein.jpg"'
);

// 4. Oslo Handshake Image
txt = txt.replace(
  '"src": "/units/cme_new/assets/yitzhak_rabin.jpg",\n            "custom_style": "max-height: 150px; width: auto; object-fit: contain;",\n            "caption": "Yitzhak Rabin, Yasser Arafat, and Bill Clinton sealing the Oslo I Accord on the White House lawn."',
  '"src": "/images/oslo_handshake.jpg",\n            "custom_style": "max-height: 250px; width: auto; object-fit: contain;",\n            "caption": "Yitzhak Rabin, Yasser Arafat, and Bill Clinton sealing the Oslo I Accord on the White House lawn."'
);
txt = txt.replace(
  '"src": "/units/cme_new/assets/yitzhak_rabin.jpg",\n            "custom_style": "max-height: 150px; width: auto; object-fit: contain;",\n            "caption": "Yitzhak Rabin, Yasser Arafat, and  sealing the Oslo I Accord on the White House lawn."',
  '"src": "/images/oslo_handshake.jpg",\n            "custom_style": "max-height: 250px; width: auto; object-fit: contain;",\n            "caption": "Yitzhak Rabin, Yasser Arafat, and Bill Clinton sealing the Oslo I Accord on the White House lawn."'
);
txt = txt.replace(
  '"src": "/units/cme_new/assets/yitzhak_rabin.jpg"',
  '"src": "/images/oslo_handshake.jpg"'
);

fs.writeFileSync(dataFile, txt);

// Copy it to public folder as well
fs.copyFileSync(dataFile, 'public/units/cme_new/data.js');

console.log('Patched all missing images, captions, and links');
