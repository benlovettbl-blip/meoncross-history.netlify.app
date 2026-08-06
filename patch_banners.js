const fs = require('fs');

const FILE_PATH = 'early_modern_world/data.js';
let content = fs.readFileSync(FILE_PATH, 'utf8');
const prefix = 'export const unitData = ';
const jsonStr = content.replace(prefix, '').trim().replace(/;$/, '');
let unit = eval('(' + jsonStr + ')');

const banners = [
  {
    image: "/images/early_mod_l1_banner.jpg",
    prompt: "A wide horizontal crop of the Catalan Atlas (1375) showing Mansa Musa of Mali holding a gold coin, alongside Asian caravan routes.",
    alt: "Catalan Atlas (1375) showing Mansa Musa"
  },
  {
    image: "/images/early_mod_l2_banner.jpg",
    prompt: "Panorama of the Spanish Armada off the English Coast (1588) by Hendrick Cornelisz Vroom.",
    alt: "Panorama of the Spanish Armada (1588)"
  },
  {
    image: "/images/early_mod_l3_banner.jpg",
    prompt: "Panoramic painting of the Fort St. George at Madras (Chennai) or the East India Company docks at Surat.",
    alt: "Panoramic painting of the East India Company docks"
  },
  {
    image: "/images/early_mod_l4_banner.jpg",
    prompt: "A wide interior engraving or painting of the 18th-century House of Commons in session alongside the Royal Exchange.",
    alt: "18th-century House of Commons in session alongside the Royal Exchange"
  },
  {
    image: "/images/early_mod_l5_banner.jpg",
    prompt: "The horizontal fold-out cross-section diagram of the Slave Ship Brooks (1788).",
    alt: "Fold-out cross-section diagram of the Slave Ship Brooks (1788)"
  },
  {
    image: "/images/early_mod_l6_banner.jpg",
    prompt: "Panoramic split view of 18th-Century London from Southwark / London Bridge showing merchant shipping on the Thames alongside urban congestion.",
    alt: "Panoramic split view of 18th-Century London from Southwark / London Bridge"
  }
];

for (let i = 0; i < 6; i++) {
  if (unit.lessons[i]) {
    // 1. Set the lesson banner
    unit.lessons[i].banner = banners[i].prompt;
    
    // 2. Modify the first narrative block to have side-by-side images
    if (unit.lessons[i].narrative_blocks && unit.lessons[i].narrative_blocks.length > 0) {
      let firstBlock = unit.lessons[i].narrative_blocks[0];
      
      let sideBySideImages = [
        {
          image: banners[i].prompt,
          image_alt: banners[i].alt
        }
      ];
      
      // If the block already had an image, add it as the second image
      if (firstBlock.image) {
        sideBySideImages.push({
          image: firstBlock.image,
          image_alt: firstBlock.image_alt,
          image_caption: firstBlock.image_caption
        });
        delete firstBlock.image;
        delete firstBlock.image_alt;
        delete firstBlock.image_caption;
      }
      
      firstBlock.images = sideBySideImages;
    }
  }
}

const updatedContent = prefix + JSON.stringify(unit, null, 2) + ';\n';
fs.writeFileSync(FILE_PATH, updatedContent, 'utf8');
console.log("Successfully patched banners into early_modern_world/data.js");
