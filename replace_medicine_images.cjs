const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'units', 'edexcel_medicine');

const replacements = {
  'medieval_pano_1784551792993.png': 'authentic_medieval.jpg',
  'renaissance_pano_1784551804068.png': 'authentic_renaissance.jpg',
  'industrial_pano_1784551813599.png': 'authentic_18th_19th.jpg',
  'modern_pano_1784551822373.png': 'authentic_modern.jpg',
  'western_front_pano_1784551831887.png': 'authentic_western_front.jpg',
  '../../assets/banners/': '../../units/edexcel_medicine/assets/', // fix path in some workbooks
};

fs.readdirSync(dir).forEach((file) => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    Object.entries(replacements).forEach(([oldStr, newStr]) => {
      if (content.includes(oldStr)) {
        content = content.split(oldStr).join(newStr);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
