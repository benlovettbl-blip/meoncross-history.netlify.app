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
  if (!lesson.narrative_blocks) {
    report += "No narrative blocks found.\n";
    return;
  }
  
  lesson.narrative_blocks.forEach((block, index) => {
    let textPreview = block.text ? block.text.substring(0, 50).replace(/\n/g, ' ') + '...' : (block.type || "Unknown block");
    report += `Block ${index}: ${textPreview}\n`;
    if (block.tasks && block.tasks.length > 0) {
      block.tasks.forEach(task => {
        report += `   -> Q: ${task.text}\n`;
      });
    } else {
      if (block.text) {
        report += `   -> (No tasks assigned to this paragraph)\n`;
      }
    }
  });
});

fs.writeFileSync(path.join(__dirname, 'audit_report.txt'), report, 'utf8');
console.log("Audit complete. Wrote audit_report.txt");
