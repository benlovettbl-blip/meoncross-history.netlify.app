const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Find where "israeli_start" is defined
const startIdx = content.indexOf('israeli_start:{');
if (startIdx !== -1) {
  // Let's grab a chunk of 50000 characters around it to encompass the whole database
  const chunk = content.substring(startIdx - 100, startIdx + 30000);
  fs.writeFileSync('scratch/extracted_sim_raw.txt', chunk);
  console.log("Extracted simulator database chunk to scratch/extracted_sim_raw.txt");
} else {
  console.log("Could not find 'israeli_start:{' in app.js");
}
