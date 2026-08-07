const fs = require('fs');

const file = 'early_modern_world/data.js';
let data = fs.readFileSync(file, 'utf8');

// 1. Replace Columbus
const oldColumbus = `"name": "Christopher Columbus",
    "role": "Explorer",
    "lifespan": "1451 – 1506",
    "bio": "An Italian explorer funded by Spain. His 1492 voyage to find a western sea route to Asia accidentally encountered the Americas, changing world history forever.",
    "actions": "Initiated European colonisation of the Americas.",
    "image": "/images/individuals/christopher_columbus.jpg"`;

const newColumbus = `"name": "Christopher Columbus",
    "role": "Explorer",
    "lifespan": "1451 – 1506",
    "bio": "An Italian explorer funded by Spain. His 1492 voyage to find a western sea route to Asia accidentally encountered the Americas, changing world history forever.",
    "actions": "<ul><li>Led four transatlantic voyages between 1492 and 1502.</li><li>Established the first permanent European settlements in the Americas.</li><li>Initiated the devastating Spanish colonisation of the New World.</li></ul>",
    "achievements": ["Opened the Americas to European colonisation and trade.", "Sparked the 'Columbian Exchange' of plants, animals, and diseases between hemispheres."],
    "limitations": "His arrival directly caused the catastrophic collapse of indigenous populations (like the Taíno people) through brutal forced labor, warfare, and the introduction of European diseases.",
    "image": "/images/individuals/christopher_columbus.jpg"`;

data = data.replace(oldColumbus, newColumbus);

// 2. Add Nanny of the Maroons
// We will find the very end of the key_individuals array:
//     "image": "/images/individuals/olaudah_equiano.png"
//   }
// ]
const oldEnd = `"image": "/images/individuals/olaudah_equiano.png"
  }
]`;

const newEnd = `"image": "/images/individuals/olaudah_equiano.png"
  },
  {
    "name": "Nanny of the Maroons",
    "role": "Maroon Leader & National Hero",
    "lifespan": "c. 1686 – c. 1733",
    "bio": "An iconic Jamaican leader of the Windward Maroons. Born in West Africa, she escaped slavery in Jamaica and led a highly successful guerrilla war against the British colonial forces.",
    "actions": "<ul><li>United escaped enslaved people to form secure, fortified mountain communities (Nanny Town).</li><li>Orchestrated decades of successful guerrilla warfare against British soldiers.</li><li>Freed over 800 enslaved people during raids on plantations.</li></ul>",
    "achievements": ["Forced the mighty British Empire to sign a peace treaty granting the Maroons land and freedom in 1739.", "Recognized today as a National Hero of Jamaica."],
    "image": "/images/individuals/queen_nanny_nanny_of_the_maroons.jpg"
  }
]`;

data = data.replace(oldEnd, newEnd);

fs.writeFileSync(file, data);
console.log("Successfully updated Columbus and added Nanny of the Maroons.");
