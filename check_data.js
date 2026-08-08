const fs = require('fs');

async function checkData() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const names = ['Sir John Seeley', 'Prof. Shashi Tharoor', 'Prof. Christopher Hill'];
  const hist = data.key_individuals.filter(p => names.includes(p.name));
  
  console.log(JSON.stringify(hist, null, 2));
}

checkData().catch(console.error);
