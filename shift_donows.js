const fs = require('fs');
const path = require('path');

const units = [
  'water_and_sanitation',
  'early_modern_world',
  'great_war',
  'cme_new',
  'edexcel_medicine'
];

function extractDoNows(content) {
  const blocks = [];
  let currentIndex = 0;
  
  while (true) {
    const match = content.indexOf('"do_now": {', currentIndex);
    const match2 = content.indexOf('"do_now": [', currentIndex); // Some might be arrays
    
    let startIndex = -1;
    let isArray = false;
    
    if (match !== -1 && (match2 === -1 || match < match2)) {
      startIndex = match;
    } else if (match2 !== -1 && (match === -1 || match2 < match)) {
      startIndex = match2;
      isArray = true;
    }
    
    if (startIndex === -1) break;
    
    const startChar = isArray ? '[' : '{';
    const endChar = isArray ? ']' : '}';
    
    let openCount = 0;
    let endIndex = -1;
    let inString = false;
    let escape = false;
    
    const blockStart = content.indexOf(startChar, startIndex);
    
    for (let i = blockStart; i < content.length; i++) {
      const char = content[i];
      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
      }
      
      if (!inString) {
        if (char === startChar) openCount++;
        else if (char === endChar) {
          openCount--;
          if (openCount === 0) {
            endIndex = i;
            break;
          }
        }
      }
    }
    
    if (endIndex !== -1) {
      // capture the preceding '"do_now": ' as well to safely replace it
      const fullBlock = content.substring(startIndex, endIndex + 1);
      blocks.push({
        fullBlock: fullBlock,
        startIndex: startIndex,
        endIndex: endIndex
      });
      currentIndex = endIndex + 1;
    } else {
      break;
    }
  }
  return blocks;
}

units.forEach(unit => {
  const dataPath = path.join(__dirname, 'public', 'units', unit, 'data.js');
  if (!fs.existsSync(dataPath)) return;
  
  let content = fs.readFileSync(dataPath, 'utf8');
  if (content.includes('// DONOWS_SHIFTED')) {
    console.log(`${unit} Do Nows are already shifted. Skipping.`);
    return;
  }
  const doNowBlocks = extractDoNows(content);
  
  if (doNowBlocks.length <= 1) {
    console.log(`${unit} has ${doNowBlocks.length} do_now blocks, skipping shift.`);
    return;
  }
  
  console.log(`Found ${doNowBlocks.length} do_now blocks in ${unit}. Shifting...`);
  
  // We need to replace from back to front to avoid messing up indices
  for (let i = doNowBlocks.length - 1; i > 0; i--) {
    const currentBlock = doNowBlocks[i];
    const previousBlockText = doNowBlocks[i-1].fullBlock;
    
    content = content.substring(0, currentBlock.startIndex) + 
              previousBlockText + 
              content.substring(currentBlock.endIndex + 1);
  }
  
  content += '\n// DONOWS_SHIFTED\n';
  fs.writeFileSync(dataPath, content);
  console.log(`Successfully shifted Do Nows for ${unit}`);
});
