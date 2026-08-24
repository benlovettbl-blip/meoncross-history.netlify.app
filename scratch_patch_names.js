const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// Patch Lesson 2
content = content.replace('Drake and his cousin, , had sailed', 'Drake and his cousin, John Hawkins, had sailed');
content = content.replace('against  of Spain', 'against King Philip II of Spain');

// Patch Lesson 5 (Diggers)
content = content.replace("Led by  in 1649", "Led by Gerrard Winstanley in 1649");
content = content.replace("'The True Levellers Standard Advanced' by .", "'The True Levellers Standard Advanced' by Gerrard Winstanley.");

fs.writeFileSync('early_modern_world/data.js', content);
console.log('Patched missing names!');
