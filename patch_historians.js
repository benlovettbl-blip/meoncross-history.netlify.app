const fs = require('fs');

async function patchData() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const historiansMap = {
    "Kritovoulos of Imbros": "kritovoulos_of_imbros.jpg",
    "Dr. Geoffrey Parker": "dr__geoffrey_parker.jpg",
    "Sir John Seeley": "sir_john_seeley.jpg",
    "Prof. Christopher Hill": "prof__christopher_hill.jpg",
    "Reginald Coupland": "reginald_coupland.jpg",
    "Prof. Roy Porter": "prof__roy_porter.jpg",
    "Prof. J.C.D. Clark": "prof__j_c_d__clark.jpg"
  };

  let updatedCount = 0;
  for (const person of data.key_individuals) {
    if (historiansMap[person.name]) {
      // Check if file exists in public/images
      const fs = require('fs');
      if (fs.existsSync(`./public/images/${historiansMap[person.name]}`)) {
        person.image = `/images/${historiansMap[person.name]}`;
        updatedCount++;
      }
    }
  }

  if (updatedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(file, output);
    console.log(`Updated ${updatedCount} historian images in data.js`);
  }
}

patchData().catch(console.error);
