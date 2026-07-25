const fs = require('fs');
const path = require('path');

const fallbacks = require('./fallbacks_list.json');

let resolved = 0;
fallbacks.forEach(q => {
  const exp = q.explanation;
  if (exp.includes(';')) {
    resolved++;
    console.log(`[${q.id}]`);
    console.log(`  EXP: ${exp}`);
    const parts = exp.split(/;\s+/);
    console.log(`  C: ${parts[0]}`);
    console.log(`  S: ${parts[1]}`);
  }
});
console.log("Total resolved by semicolon:", resolved);
