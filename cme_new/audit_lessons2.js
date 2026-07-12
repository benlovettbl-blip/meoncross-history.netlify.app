const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(targetPath, 'utf8');

let data;
try {
  data = new Function(content.replace('export const unitData = ', 'return ').replace(/;$/, '') + ';')();
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

let report = "";

data.lessons.forEach(lesson => {
  if (lesson.id === 'lesson_1') return; // already fixed
  
  report += `\n=== ${lesson.title} ===\n`;
  if (lesson.tasks && lesson.tasks.length > 0) {
    report += "UNASSIGNED TASKS FOUND:\n";
    lesson.tasks.forEach(t => report += `  - ${t.text}\n`);
  } else {
    report += "No unassigned tasks found.\n";
  }
});

fs.writeFileSync(path.join(__dirname, 'audit_report2.txt'), report, 'utf8');
console.log("Audit complete. Wrote audit_report2.txt");
