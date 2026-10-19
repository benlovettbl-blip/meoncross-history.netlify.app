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

// Find all occurrences of "Source A" and "Source B" and surrounding HTML
const regex = /(Source [AB][\s\S]*?)(?=<\/div>|<\/section>|Source [AB]|$)/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  // strip huge base64 strings so we can see the markup
  const cleaned = match[1].replace(
    /data:image\/[^;]+;base64,[A-Za-z0-9+/=]{100,}/g,
    '[BASE64_IMAGE_DATA]',
  );
  console.log('--- MATCH ---');
  console.log(cleaned.substring(0, 500));
}
