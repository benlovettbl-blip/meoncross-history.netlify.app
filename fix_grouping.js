const fs = require('fs');

async function fixGrouping() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  data.key_individuals.forEach(p => {
    if (p.type === 'historical') {
      p.group = 'Historical Figures';
    } else if (p.type === 'historian') {
      p.group = 'Historians';
    }
    // Clean up the temporary 'type' property
    delete p.type;
  });

  // Sort so Historical Figures come first, then Historians
  data.key_individuals.sort((a, b) => {
    if (a.group === 'Historical Figures' && b.group === 'Historians') return -1;
    if (a.group === 'Historians' && b.group === 'Historical Figures') return 1;
    return 0; // maintain relative order otherwise
  });

  const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(file, output);
  console.log("Successfully fixed grouping in data.js!");
}

fixGrouping().catch(console.error);
