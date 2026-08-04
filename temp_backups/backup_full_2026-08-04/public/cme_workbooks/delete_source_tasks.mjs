import fs from 'fs';

let data = fs.readFileSync('src/workbook_data.js', 'utf8');

// Regex to match "sourceTasks": [ ... ],
// This regex needs to be careful. Since it's JSON-like, it can span multiple lines.
// "sourceTasks": [
//   { ... },
//   { ... }
// ],
const regex = /"sourceTasks":\s*\[[\s\S]*?\]\s*,/g;

data = data.replace(regex, '');

fs.writeFileSync('src/workbook_data.js', data);
console.log("Deleted sourceTasks from workbook_data.js");
