const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

unitData.lessons.forEach(lesson => {
  if (lesson.tasks) {
    let pCount = lesson.narrative ? lesson.narrative.filter(p => !p.startsWith('"')).length : 0;
    let writtenTasks = lesson.tasks.filter(t => t.type === 'written');
    
    writtenTasks.forEach((task, index) => {
      if (task.text.match(/\(P\d/)) return;
      
      let pNum = Math.min(index + 1, pCount);
      if (lesson.title.includes("Unification")) {
        if (index === 0) pNum = 2; // Q1
        else if (index === 1) pNum = 3; // Q2
        else if (index === 2) pNum = 4; // Q3
        else if (index === 3) pNum = 4; // Q4
        else if (index === 4) pNum = 1; // Q5
      } else {
        pNum = Math.ceil(((index + 1) / writtenTasks.length) * pCount);
        if (pNum < 1) pNum = 1;
      }
      
      task.text = `${task.text} (P${pNum})`;
    });
  }
  
  if (lesson.extended && lesson.extended.question) {
    if (!lesson.extended.question.match(/\(Ext P/)) {
      lesson.extended.question = `${lesson.extended.question} (Ext P1-3)`;
    }
  }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js updated with paragraph scaffolding tags.");
