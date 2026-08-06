const fs = require('fs');
let data = fs.readFileSync('early_modern_world/data.js', 'utf8');

const replacements = [
  {
    target: `"image_caption": "An 18th-century painting showing the foreign trading factories at Canton (Guangzhou) along the Pearl River in China. This was the bustling, highly regulated district where British, Dutch, and French East India Companies were forced to operate under strict Chinese imperial oversight."`,
    replacement: `"image_caption": "An 18th-century painting showing the foreign trading factories at Canton (Guangzhou) along the Pearl River in China. By the 1700s, this port handled massive quantities of tea, silk, and porcelain destined for European markets, fueling an enormous global trading network."`
  },
  {
    target: `"image_caption": "A historical fresco depicting the Siege of Constantinople (1453), marking the dramatic expansion of the Ottoman Empire. This expansion terrified Western European rulers, as the Ottomans now controlled the vital land routes to Asia, forcing Europeans to seek new oceanic trade routes or face economic ruin."`,
    replacement: `"image_caption": "A historical fresco depicting the Siege of Constantinople (1453), marking the dramatic expansion of the Ottoman Empire. The 53-day siege utilized massive cannons that shattered the ancient walls, effectively ending the 1,000-year-old Byzantine Empire."`
  },
  {
    target: `"image_caption": "The 1607 triangular plan of James Fort, demonstrating the heavily militarized and defensive nature of early English settlements in America. Surrounded by the powerful Powhatan Confederacy, the English settlers lived in constant fear of attack, disease, and starvation, clinging desperately to the edge of the continent."`,
    replacement: `"image_caption": "The 1607 triangular plan of James Fort, demonstrating the heavily militarized and defensive nature of early English settlements in America. The fort was built in just 19 days on a swampy peninsula, with wooden palisades enclosing a church, storehouse, and living quarters."`
  },
  {
    target: `"image_caption": "Sir Francis Drake, whose personal vendetta against Spain helped transform England into a global maritime power. Initially operating as a state-sponsored pirate (privateer), Drake's circumnavigation of the globe brought immense stolen wealth back to Queen Elizabeth I, fueling England's naval ambitions."`,
    replacement: `"image_caption": "Sir Francis Drake, whose personal vendetta against Spain helped transform England into a global maritime power. In 1577, he set sail on the Pelican (later renamed the Golden Hind), becoming the first Englishman to successfully circumnavigate the globe."`
  }
];

let allGood = true;
for (const {target, replacement} of replacements) {
  if (!data.includes(target)) {
    console.error('Could not find target:', target.substring(0, 50) + '...');
    allGood = false;
  } else {
    data = data.replace(target, replacement);
  }
}

if (allGood) {
  fs.writeFileSync('early_modern_world/data.js', data, 'utf8');
  console.log('Successfully patched early_modern_world/data.js with fact-based captions');
} else {
  console.log('Failed to patch some items. No changes made.');
}
