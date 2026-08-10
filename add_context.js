const fs = require('fs');
const path = './public/units/early_modern_world/data.js';

let code = fs.readFileSync(path, 'utf8');
code = code.replace(/export const unitData\s*=\s*/, 'module.exports = ');
fs.writeFileSync('temp_data.js', code);

const data = require('./temp_data');

// Add context block at the beginning of Lesson 1 for lower-ability pupils
const introBlock = {
  title: "Setting the Scene: The World in 1450",
  text: "Before we explore who held global power, it is important to understand what the world was like in 1450. At this time, Europe was recovering from the devastating Black Death and was relatively poor compared to the rest of the world. They desperately wanted luxury goods like silk and spices, which could only be found in Asia. However, the powerful empires of the East—such as the Ming Dynasty in China and the Ottoman Empire in the Middle East—controlled all the major trade routes, meaning Europe was effectively cut off from global wealth."
};

if (data.lessons[0] && data.lessons[0].narrative_blocks) {
  // Check if we already added it
  if (data.lessons[0].narrative_blocks[0].title !== "Setting the Scene: The World in 1450") {
    data.lessons[0].narrative_blocks.unshift(introBlock);
  }
}

const newCode = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(path, newCode);
console.log('Background context added to data.js');
