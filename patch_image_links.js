const fs = require('fs');

async function patchImages() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const existingImages = {
    "Admiral Zheng He": "/images/individuals/admiral_zheng_he.jpg",
    "John Hawkins": "/images/individuals/john_hawkins.JPG",
    "King Philip II": "/images/individuals/king_philip_ii.jpg",
    "Pope Alexander VI": "/images/individuals/pope_alexander_vi.jpg",
    "King James I": "/images/individuals/king_james_i.jpg",
    "Chief Powhatan": "/images/individuals/chief_powhatan.jpg",
    "John Bradshaw": "/images/individuals/john_bradshaw.png",
    "Charles II": "/images/individuals/king_charles_ii.jpg"
  };

  let updatedCount = 0;
  for (const person of data.key_individuals) {
    if (existingImages[person.name]) {
      person.image = existingImages[person.name];
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(file, output);
    console.log(`Updated ${updatedCount} missing image links in data.js`);
  } else {
    console.log("No images were updated.");
  }
}

patchImages().catch(console.error);
