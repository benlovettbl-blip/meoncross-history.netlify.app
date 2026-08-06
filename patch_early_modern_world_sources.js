const fs = require('fs');
let data = fs.readFileSync('early_modern_world/data.js', 'utf8');

const replacements = [
  {
    target: `"do_now": {
                "title": "Do Now: Knowledge Retrieval",
                "type": "questions",
                "items": [
                    {
                        "question": "Recall from Year 7: What was the main purpose of a medieval castle?",
                        "answer": "Castles were primarily military structures used by lords and kings to maintain control over a region. They defended and controlled the surrounding land."
                    }
                ]
            }`,
    replacement: `"do_now": {
                "title": "Do Now: The Cover Connection",
                "type": "questions",
                "items": [
                    {
                        "question": "Look at the four images on the front cover of your workbook. What connections can you draw between them? How do they show that the world was becoming more connected?",
                        "answer": "The images show wealth and power shifting across the globe. For example, the East India Company trading in China (Canton) connects to the bustling River Thames in London. The Mercator map shows how exploration made these global trade routes possible, while the image of Britannia receiving riches shows how Britain benefited from this worldwide network."
                    }
                ]
            }`
  },
  {
    target: `"image_caption": "A historical fresco depicting the Siege of Constantinople (1453), marking the dramatic expansion of the Ottoman Empire."`,
    replacement: `"image_caption": "A historical fresco depicting the Siege of Constantinople (1453), marking the dramatic expansion of the Ottoman Empire. This expansion terrified Western European rulers, as the Ottomans now controlled the vital land routes to Asia, forcing Europeans to seek new oceanic trade routes or face economic ruin."`
  },
  {
    target: `"image_caption": "A 15th-century Benin Bronze plaque showing the Oba of Benin with attendants."`,
    replacement: `"image_caption": "A 15th-century Benin Bronze plaque showing the Oba of Benin with attendants. Crafted with highly sophisticated metallurgy techniques, this plaque demonstrates the immense wealth, power, and cultural advancement of West African kingdoms long before European colonization."`
  },
  {
    target: `"image_caption": "Sir Francis Drake, whose personal vendetta against Spain helped transform England into a global maritime power."`,
    replacement: `"image_caption": "Sir Francis Drake, whose personal vendetta against Spain helped transform England into a global maritime power. Initially operating as a state-sponsored pirate (privateer), Drake's circumnavigation of the globe brought immense stolen wealth back to Queen Elizabeth I, fueling England's naval ambitions."`
  },
  {
    target: `"image_caption": "A 16th-century Nautical Planisphere (Mercator World Map). This map revolutionized oceanic travel, showing complex ocean trade routes, wind currents, and the terrifying scale of the vast unknown oceans that European sailors faced."`,
    replacement: `"image_caption": "A 16th-century Nautical Planisphere (Mercator World Map). This map revolutionized oceanic travel, showing complex ocean trade routes, wind currents, and the terrifying scale of the vast unknown oceans that European sailors faced. By accurately depicting the curvature of the Earth for navigation, it empowered European sailors to finally cross the treacherous Atlantic and Indian Oceans."`
  },
  {
    target: `"image_caption": "The 1494 Treaty of Tordesillas divided the newly discovered lands outside Europe between the Portuguese Empire and the Spanish Empire."`,
    replacement: `"image_caption": "The 1494 Treaty of Tordesillas divided the newly discovered lands outside Europe between the Portuguese Empire and the Spanish Empire. Brokered by the Pope, this treaty audaciously ignored the millions of Indigenous people already living in these lands, viewing the entire non-European world as property to be claimed."`
  },
  {
    target: `"image_caption": "The 1607 triangular plan of James Fort, demonstrating the heavily militarized and defensive nature of early English settlements in America."`,
    replacement: `"image_caption": "The 1607 triangular plan of James Fort, demonstrating the heavily militarized and defensive nature of early English settlements in America. Surrounded by the powerful Powhatan Confederacy, the English settlers lived in constant fear of attack, disease, and starvation, clinging desperately to the edge of the continent."`
  },
  {
    target: `"image_caption": "The famous 1788 abolitionist plan showing the horrific tight stowage on the slave ship Brookes, used to shock the British public."`,
    replacement: `"image_caption": "The famous 1788 abolitionist plan showing the horrific tight stowage on the slave ship Brookes, used to shock the British public. This diagram became one of history's most effective pieces of political propaganda, forcing the public to confront the brutal, industrial scale of the transatlantic slave trade."`
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
  console.log('Successfully patched early_modern_world/data.js');
} else {
  console.log('Failed to patch some items. No changes made.');
}
