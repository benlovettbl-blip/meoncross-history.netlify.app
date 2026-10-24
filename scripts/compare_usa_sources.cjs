const fs = require('fs');

const inv = JSON.parse(fs.readFileSync('scripts/usa_source_inventory.json', 'utf8'));

console.log('Total placements:', inv.placements.length);

inv.placements.forEach((p, idx) => {
  console.log(
    `\n--- [${idx + 1}/${inv.placements.length}] Lesson ${p.lesson_num} (${p.lesson_id}) | Block: ${p.block_id || p.source_id} ---`,
  );
  console.log(`Image: ${p.image}`);
  console.log(`Caption: ${p.caption}`);
  console.log(`Alt: ${p.image_alt}`);
  console.log(`Context: ${p.image_context ? p.image_context.slice(0, 120) + '...' : 'NONE'}`);
});
