const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// Patch Lesson 5 Block 2
content = content.replace('— <strong></strong>, President of the High Court', '— <strong>John Bradshaw</strong>, President of the High Court');
content = content.replace('— <strong>Adapted from a pamphlet by </strong>, London merchant', '— <strong>Adapted from a pamphlet by Maurice Thompson</strong>, London merchant');
content = content.replace("<strong>Source D: ’s Speech", "<strong>Source D: Oliver Cromwell’s Speech");

fs.writeFileSync('early_modern_world/data.js', content);
console.log('Patched Lesson 5 missing names!');
