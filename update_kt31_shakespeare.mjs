import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'eee', 'data.js');

let content = fs.readFileSync(dataFilePath, 'utf8');

let jsonStr = content.replace('export const unitData = ', '').trim();
if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
}

let unitData = eval('(' + jsonStr + ')');

const shakespeare = {
    "id": "william_shakespeare",
    "name": "William Shakespeare",
    "role": "Playwright & Poet",
    "bio": "The most famous Elizabethan playwright, known for his comedies, tragedies, and histories. His work flourished under the patronage of the nobility during the Golden Age of the Theatre.",
    "image": "/assets/placeholder_cover.jpg"
};

if (!unitData.key_individuals.find(k => k.id === shakespeare.id)) {
    unitData.key_individuals.push(shakespeare);
}

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully added Shakespeare to eee/data.js");
