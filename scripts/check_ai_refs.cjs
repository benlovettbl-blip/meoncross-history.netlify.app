const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'ks2_ww2.json');
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const aiFilenames = [
  'gas_mask_box_1939',
  'tube_station_shelter_1940',
  'ration_book_coupons_1940',
  'land_army_poster_1941',
  've_day_children_table_1945',
];

console.log('=== CHECKING DATA REFERENCES FOR THE 5 AI IMAGES ===\n');

data.lessons.forEach((l, idx) => {
  const lStr = JSON.stringify(l);
  aiFilenames.forEach((fn) => {
    if (lStr.includes(fn)) {
      console.log(`Lesson ${idx + 1} (${l.title}):`);
      console.log(`  Source A:`, l.source_a ? l.source_a.title : 'none');
      console.log(`  Source B:`, l.source_b ? l.source_b.title : 'none');
      console.log(`  Image field:`, l.image || l.hero_image || 'none');
      console.log(`  Matches: ${fn}\n`);
    }
  });
});
