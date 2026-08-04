import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'cme_new', 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

const regex = /"id":\s*"(lesson_[^"]+)",\s*"title":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(data)) !== null) {
    console.log(`${match[1]}: ${match[2]}`);
}
