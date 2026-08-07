const fs = require('fs');

async function fixData() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  // 1. Expand Columbus
  const columbusIndex = data.key_individuals.findIndex(p => p.name === 'Christopher Columbus');
  if (columbusIndex !== -1) {
    data.key_individuals[columbusIndex] = {
      "name": "Christopher Columbus",
      "role": "Explorer",
      "lifespan": "1451 – 1506",
      "bio": "An Italian explorer funded by Spain. His 1492 voyage to find a western sea route to Asia accidentally encountered the Americas, changing world history forever.",
      "actions": "<ul><li>Led four transatlantic voyages between 1492 and 1502.</li><li>Established the first permanent European settlements in the Americas.</li><li>Initiated the devastating Spanish colonisation of the New World.</li></ul>",
      "achievements": ["Opened the Americas to European colonisation and trade.", "Sparked the 'Columbian Exchange' of plants, animals, and diseases between hemispheres."],
      "limitations": "His arrival directly caused the catastrophic collapse of indigenous populations (like the Taíno people) through brutal forced labor, warfare, and the introduction of European diseases.",
      "image": "/images/individuals/christopher_columbus.jpg"
    };
  }

  // 2. Add Nanny of the Maroons
  const nannyExists = data.key_individuals.find(p => p.name === 'Nanny of the Maroons');
  if (!nannyExists) {
    data.key_individuals.push({
      "name": "Nanny of the Maroons",
      "role": "Maroon Leader & National Hero",
      "lifespan": "c. 1686 – c. 1733",
      "bio": "An iconic Jamaican leader of the Windward Maroons. Born in West Africa, she escaped slavery in Jamaica and led a highly successful guerrilla war against the British colonial forces.",
      "actions": "<ul><li>United escaped enslaved people to form secure, fortified mountain communities (Nanny Town).</li><li>Orchestrated decades of successful guerrilla warfare against British soldiers.</li><li>Freed over 800 enslaved people during raids on plantations.</li></ul>",
      "achievements": ["Forced the mighty British Empire to sign a peace treaty granting the Maroons land and freedom in 1739.", "Recognized today as a National Hero of Jamaica."],
      "image": "/images/individuals/queen_nanny_nanny_of_the_maroons.jpg"
    });
  }

  // We write it back
  const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(file, output);
  console.log("Successfully fixed early_modern_world/data.js");
}

fixData().catch(console.error);
