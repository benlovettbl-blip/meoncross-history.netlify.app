const fs = require('fs');

let file = 'early_modern_world/data.js';
let content = fs.readFileSync(file, 'utf8');

// Replace "Source A: Fresco..." -> "Fresco..."
content = content.replace(/\"(image_alt|image_caption|title)\":\s*\"Source [A-Z]:\s*/g, '"$1": "');

// We also need to fix tasks in Lesson 1 that were hardcoded to Source A and Source B.
// In Lesson 1:
// - The Fresco is Source C (because it's the 3rd source). The tasks say "Study Source A".
content = content.replace(/Study Source A/g, 'Study Source C');
content = content.replace(/Study Source A \(/g, 'Study Source C (');

// - The Benin Bronze is Source D. The tasks say "Study Source B (the 16th-Century Benin Bronze Plaque)".
content = content.replace(/Study Source B/g, 'Study Source D');

fs.writeFileSync(file, content);
console.log('Fixed prefixes and task source references.');
