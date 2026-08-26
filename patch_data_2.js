const fs = require('fs');
const path = require('path');

const unitsToPatch = ['change_1450_1750', 'early_modern_world'];
const baseDir = 'C:/Projects/meoncross-history.netlify.app/public/units';

unitsToPatch.forEach(unit => {
  const dataPath = path.join(baseDir, unit, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.log(`Skipping ${unit}, data.js not found at ${dataPath}`);
    return;
  }
  
  let content = fs.readFileSync(dataPath, 'utf8');
  let originalContent = content;

  // L3: Remove Canton
  content = content.replace(/"image":\s*"\/images\/global_canton\.jpg",/g, '');
  content = content.replace(/"image_alt":\s*"View of the Thirteen Factories in Canton \(c\. 1800\)",/g, '');
  content = content.replace(/"image_caption":\s*"View of the Thirteen Factories in Canton \(c\. 1800\)"/g, '');
  
  // L6 and L9: Remove Britannia
  content = content.replace(/"image":\s*"\/images\/global_britannia\.jpg",/g, '');
  content = content.replace(/"image_alt":\s*"The East Offering its Riches to Britannia \(1778\)",/g, '');
  content = content.replace(/"image_caption":\s*"The East Offering its Riches to Britannia \(1778\)"/g, '');

  // Lesson 9 UI text
  content = content.replace(/\(Weighing the Evidence toggle tabs\)/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(dataPath, content, 'utf8');
    console.log(`Patched ${unit} memory bleed strings via regex.`);
  }
});
