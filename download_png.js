const { execSync } = require('child_process');

try {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png/500px-William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png';
  const dest = 'public/images/industry_idleness.png';
  execSync(`curl -s -A "Mozilla/5.0" "${url}" -o ${dest}`);
  const fs = require('fs');
  const size = fs.statSync(dest).size;
  if (size < 3000) {
      console.log('Thumbnail failed, downloading original...');
      const orig = 'https://upload.wikimedia.org/wikipedia/commons/d/d6/William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png';
      execSync(`curl -s -A "Mozilla/5.0" "${orig}" -o ${dest}`);
  }
} catch (e) {
  console.error(e.message);
}
