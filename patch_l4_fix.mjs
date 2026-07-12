import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

const l4 = data.lessons.find(l => l.id === "lesson_4");
if (l4) {
  // Fix do_now
  if (l4.do_now && l4.do_now.tasks) {
    l4.do_now.items = l4.do_now.tasks;
    delete l4.do_now.tasks;
  }
  
  // Fix tasks
  if (l4.tasks) {
    l4.tasks.forEach(t => {
      if (t.question && !t.text) {
        t.text = t.question;
        delete t.question;
      }
    });
  }
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully patched Lesson 4 in cme_new/data.js");
