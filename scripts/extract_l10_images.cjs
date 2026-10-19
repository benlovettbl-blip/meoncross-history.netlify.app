const fs = require('fs');
const path = require('path');

const file = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'worksheets',
  'lesson_10_ve_day_remembrance_worksheet.html',
);
const content = fs.readFileSync(file, 'utf8');

// Find all base64 images
const matches = [...content.matchAll(/src="(data:image\/jpeg;base64,([A-Za-z0-9+/=]+))"/g)];
console.log('Found', matches.length, 'base64 images in lesson 10');

matches.forEach((m, idx) => {
  const buf = Buffer.from(m[2], 'base64');
  const outPath = path.join(__dirname, '..', `lesson10_img_${idx + 1}.jpg`);
  fs.writeFileSync(outPath, buf);
  console.log(`Saved image ${idx + 1} (${buf.length} bytes) to ${outPath}`);
});
