import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'eee', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');
let jsonStr = content.replace('export const unitData = ', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

let unitData = eval('(' + jsonStr + ')');
let lesson = unitData.lessons[0];

console.log("lesson.title:", typeof lesson.title);
if (lesson.tasks) {
  lesson.tasks.forEach((t, i) => {
    console.log(`task ${i} q:`, typeof (t.question || t.text));
    console.log(`task ${i} a:`, typeof t.answer);
  });
}

if (lesson.narrative_blocks) {
  lesson.narrative_blocks.forEach((block, i) => {
    if (block.tasks) {
       block.tasks.forEach((t, j) => {
          console.log(`block ${i} task ${j} q:`, typeof (t.question || t.text));
          console.log(`block ${i} task ${j} a:`, typeof t.answer);
       });
    }
  });
}
