const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// Remove homepage_background
content = content.replace(/\s*"homepage_background":\s*".*?",\n?/, '\n');

// Rename cover_sources to visual_sources
content = content.replace(/"cover_sources":/g, '"visual_sources":');

fs.writeFileSync('early_modern_world/data.js', content, 'utf8');
console.log('Successfully updated early_modern_world/data.js');
