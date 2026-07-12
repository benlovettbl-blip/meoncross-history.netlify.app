import fs from 'fs';

const oldDataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(oldDataPath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

// 1. Fix Lesson 1 tasks
if (data.lessons[0].gcse_task && !data.lessons[0].tasks) {
  data.lessons[0].tasks = [
    {
      text: data.lessons[0].gcse_task.topic,
      model: data.lessons[0].gcse_task.model
    }
  ];
}

// 2. Fix Lesson 2 tasks & flashcards
if (data.lessons[1].gcse_task && !data.lessons[1].tasks) {
  data.lessons[1].tasks = [
    {
      text: data.lessons[1].gcse_task.topic,
      model: data.lessons[1].gcse_task.model
    }
  ];
}

if (data.lessons[1].vocab && !data.lessons[1].flashcards) {
  data.lessons[1].flashcards = [...data.lessons[1].vocab];
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(oldDataPath, output, 'utf8');
console.log("Successfully patched data.js for Lesson 2 tasks and flashcards");
