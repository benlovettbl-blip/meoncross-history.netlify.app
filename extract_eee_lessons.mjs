import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eeePath = path.join(__dirname, 'eee', 'data.js');
const dataContent = fs.readFileSync(eeePath, 'utf8');

const regex = /"id": "(lesson_[^"]+)",\s*"title": "([^"]+)",\s*"enquiry": "([^"]+)"/g;
let match;
const lessons = [];

while ((match = regex.exec(dataContent)) !== null) {
    lessons.push({
        id: match[1],
        title: match[2],
        enquiry: match[3]
    });
}

console.log(JSON.stringify(lessons, null, 2));
