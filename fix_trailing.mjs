import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Strip out any trailing non-JSON characters
dataContent = dataContent.replace(/;\\n$/, ';');

fs.writeFileSync(dataPath, dataContent);
console.log("Fixed trailing chars");
