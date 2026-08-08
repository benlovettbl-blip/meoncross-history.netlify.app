const fs = require('fs');
const path = require('path');

async function checkImages() {
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  console.log("Checking image files for all individuals:");
  
  for (const person of data.key_individuals) {
    const imgProp = person.image_url || person.image;
    if (imgProp) {
      let imgPath = imgProp;
      if (imgPath.startsWith('/')) {
        imgPath = imgPath.substring(1); // remove leading slash
      }
      
      const absolutePath = path.join(__dirname, 'public', imgPath);
      
      if (!fs.existsSync(absolutePath)) {
        console.log(`❌ MISSING FILE: ${person.name} -> ${imgProp}`);
      } else {
        console.log(`✅ FOUND: ${person.name}`);
      }
    } else {
      console.log(`⚠️ NO IMAGE PROPERTY: ${person.name}`);
    }
  }
}

checkImages().catch(console.error);
