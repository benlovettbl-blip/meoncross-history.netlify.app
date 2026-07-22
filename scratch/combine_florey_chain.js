const fs = require('fs');
const path = require('path');

async function combineFloreyChain() {
  const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
  let fileContent = fs.readFileSync(dataPath, 'utf8');

  const startIndex = fileContent.indexOf('{');
  const endIndex = fileContent.lastIndexOf('}');
  const jsonStr = fileContent.substring(startIndex, endIndex + 1);

  const data = eval('(' + jsonStr + ')');

  // Find index of florey and chain
  const floreyIdx = data.key_individuals.findIndex(i => i.id === 'florey');
  const chainIdx = data.key_individuals.findIndex(i => i.id === 'chain');

  if (floreyIdx !== -1 && chainIdx !== -1) {
    const florey = data.key_individuals[floreyIdx];
    const chain = data.key_individuals[chainIdx];

    const combined = {
      id: 'florey_chain',
      name: 'Howard Florey & Ernst Chain',
      role: 'Pharmacologist & Biochemist',
      bio: 'Co-leaders of the Oxford University research team that successfully developed Penicillin into a usable medical drug during WWII. Florey travelled to the USA in 1941 to secure funding and industrial resources, while Chain discovered the complex chemical method to extract and purify Penicillin from the mould.',
      image_url: florey.image_url, // Using Florey's image or maybe a combined one if we had it. We'll stick to Florey's for now.
      actions: florey.actions, // They are identical based on previous script injection
      achievements: florey.achievements,
      limitations: florey.limitations
    };

    // Remove old ones
    // Delete the one with larger index first to avoid shifting issues
    if (floreyIdx > chainIdx) {
      data.key_individuals.splice(floreyIdx, 1);
      data.key_individuals.splice(chainIdx, 1, combined);
    } else {
      data.key_individuals.splice(chainIdx, 1);
      data.key_individuals.splice(floreyIdx, 1, combined);
    }

    const newJsonStr = JSON.stringify(data, null, 2);
    const newContent = fileContent.substring(0, startIndex) + newJsonStr + fileContent.substring(endIndex + 1);
    
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Successfully combined Florey and Chain!');
  } else {
    console.log('Florey or Chain not found, might be already combined.');
  }
}

combineFloreyChain();
