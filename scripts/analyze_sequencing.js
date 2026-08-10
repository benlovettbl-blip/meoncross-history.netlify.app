const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let data;
try {
  data = JSON.parse(jsonStr);
} catch(e) {
  data = eval(`(${jsonStr})`);
}

let report = '';

data.lessons.forEach((lesson, i) => {
  report += `\n========================================\n`;
  report += `Lesson ${i+1}: ${lesson.title}\n`;
  report += `========================================\n`;
  
  let lessonWordCount = 0;
  let lessonTaskCount = 0;
  let allSources = new Set();
  let usedSources = new Set();
  
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block, bIdx) => {
      report += `  Block ${bIdx}: ${block.title || 'No Title'}\n`;
      
      let blockWords = 0;
      if (block.text) blockWords += block.text.split(/\s+/).length;
      if (block.caption) blockWords += block.caption.split(/\s+/).length;
      lessonWordCount += blockWords;
      
      // Track sources
      if (block.source_letter) allSources.add(block.source_letter);
      else if (block.caption && block.caption.match(/Source [A-Z]/)) {
        const match = block.caption.match(/Source ([A-Z])/);
        allSources.add(match[1]);
      }
      else if (block.text && block.text.match(/Source [A-Z]:/)) {
        const matches = [...block.text.matchAll(/Source ([A-Z]):/g)];
        matches.forEach(m => allSources.add(m[1]));
      }
      
      let blockTasks = block.tasks ? block.tasks.length : 0;
      lessonTaskCount += blockTasks;
      
      report += `    Type: ${block.image ? 'Image ' : ''}${block.text ? 'Text ' : ''}${blockTasks ? `Tasks(${blockTasks}) ` : ''}\n`;
      if (block.image) {
        report += `    Image: ${block.image} (Source ${block.source_letter || '?'})\n`;
      }
      if (block.text && block.text.length > 50) {
        report += `    Text preview: ${block.text.substring(0, 50)}...\n`;
      }
      
      if (block.tasks) {
        block.tasks.forEach((t, tIdx) => {
          let taskStr = t.question || t.text || '';
          report += `      Task ${tIdx}: ${taskStr.substring(0, 60)}...\n`;
          // Find used sources in tasks
          const matches = [...taskStr.matchAll(/Source ([A-Z])/g)];
          matches.forEach(m => usedSources.add(m[1]));
        });
      }
    });
  }
  
  let unused = [...allSources].filter(s => !usedSources.has(s));
  
  report += `\n  Summary:\n`;
  report += `  - Word Count: ~${lessonWordCount}\n`;
  report += `  - Task Count: ${lessonTaskCount}\n`;
  report += `  - Declared Sources: ${[...allSources].join(', ') || 'None'}\n`;
  report += `  - Unused Sources: ${unused.join(', ') || 'None'}\n`;
});

fs.writeFileSync(path.join(__dirname, 'sequence_report.txt'), report);
console.log('Report generated at sequence_report.txt');
