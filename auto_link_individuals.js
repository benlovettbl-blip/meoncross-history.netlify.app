const fs = require('fs');
const file = 'early_modern_world/data.js';

import('./early_modern_world/data.js').then(m => {
  const data = m.unitData || m.default || Object.values(m)[0];
  
  if (!data || !data.key_individuals) {
    console.error("No key_individuals found.");
    return;
  }
  
  const names = data.key_individuals.map(p => p.name).filter(n => n);
  
  // Track which names we have already linked to ensure we only link the VERY first occurrence globally in the source code
  const linkedNames = new Set();
  
  data.lessons.forEach(lesson => {
    if (!lesson.blocks) return;
    lesson.blocks.forEach(block => {
      if (block.text) {
        names.forEach(name => {
          if (linkedNames.has(name)) return; // Already linked once
          
          // Use regex with word boundaries to find the name
          const regex = new RegExp(`\\\\b(${name})\\\\b`, 'i');
          if (regex.test(block.text)) {
            // Replace only the first occurrence
            block.text = block.text.replace(regex, `[Key Individual: $1]`);
            linkedNames.add(name);
          }
        });
      }
      
      if (block.level_4) {
        names.forEach(name => {
          if (linkedNames.has(name)) return;
          const regex = new RegExp(`\\\\b(${name})\\\\b`, 'i');
          if (regex.test(block.level_4)) {
            block.level_4 = block.level_4.replace(regex, `[Key Individual: $1]`);
            linkedNames.add(name);
          }
        });
      }
    });
  });
  
  // We need to write this back as a module
  const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(file, output);
  console.log("Successfully auto-hyperlinked key individuals.");
}).catch(err => {
  console.error("Failed to parse data.js", err);
});
