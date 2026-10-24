const fs = require('fs');
const inv = JSON.parse(fs.readFileSync('scripts/usa_source_inventory.json', 'utf8'));

console.log('Unique images list:');
inv.uniqueImages.forEach((img, i) => {
  const placements = inv.placements.filter((p) => p.image === img);
  console.log(`[${i + 1}] ${img} (used in ${placements.length} places)`);
  placements.forEach((p) => {
    console.log(`     L${p.lesson_num} (${p.lesson_id}): "${p.caption}"`);
  });
});
