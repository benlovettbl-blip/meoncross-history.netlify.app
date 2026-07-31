const fs = require('fs');

let data = fs.readFileSync('./public/units/cme_new/data.js', 'utf8');

// Replacements for mismatching image paths
data = data.replace(/"src": "\/units\/cme_new\/assets\/map_lesson1\.png"/g, '"src": "/units/cme_new/assets/cme_palestinian_refugees_leaving_gaza_gettyimages_1354487454.webp"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/map_lesson2\.png"/g, '"src": "/units/cme_new/assets/palestinian_refugees_1948.jpg"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/nasser_suez\.png"/g, '"src": "/units/cme_new/assets/cme_port_said_from_air.jpg"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/eden_cover\.png"/g, '"src": "/units/cme_new/assets/cme_georges_bidault__anthony_eden_and_john_foster_dulles__cropped_.jpg"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/map_lesson3\.png"/g, '"src": "/units/cme_new/assets/western_wall_1967.jpg"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/card_dayan\.png"/g, '"src": "/units/cme_new/assets/idf_fighter_planes.jpg"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/map_lesson4\.png"/g, '"src": "/units/cme_new/assets/card_nasser.png"');
data = data.replace(/"src": "\/units\/cme_new\/assets\/arafat_1988\.svg"/g, '"src": "/units/cme_new/assets/arafat_1999.jpg"');

// Fix captions
data = data.replace(
  /"caption": "Israeli tanks pushing back across the Sinai desert towards Egypt in the later stages of the Yom Kippur War\."/g,
  '"caption": "General Ariel Sharon leading the Israeli counter-offensive across the Sinai desert towards Egypt in the later stages of the Yom Kippur War."'
);

data = data.replace(
  /"caption": "Israeli soldiers patrolling the occupied territories, attempting to enforce Defense Minister Rabin's 'Iron Fist' policy\."/g,
  '"caption": "Israeli Prime Minister Yitzhak Shamir, who implemented a harsh \'Iron Fist\' policy in response to the Intifada."'
);

data = data.replace(
  /"caption": "The signing of the peace treaty between Israel and Jordan, further normalizing relations in the region\."/g,
  '"caption": "King Hussein of Jordan, who signed the historic peace treaty with Israel in 1994, normalizing relations between the two countries."'
);

data = data.replace(
  /"caption": "Yitzhak Rabin at the Tel Aviv peace rally on November 4, 1995, moments before he was assassinated by an Israeli extremist\."/g,
  '"caption": "The book cover of \'Yitzhak Rabin: Soldier, Leader, Statesman\' depicting Rabin, who was assassinated by an Israeli extremist at a Tel Aviv peace rally."'
);

// We should also replace the 1967 map in the interactive maps to use the conquered territories one just in case it looks better? 
// No, palestine_1967_map.png is fine for the interactive map. We only change the one in the sources array if needed, but they are both fine.

fs.writeFileSync('./public/units/cme_new/data.js', data, 'utf8');
console.log('Fixed captions and images');
