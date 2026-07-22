const fs = require('fs');
const path = require('path');

const units = [
  'edexcel_medicine',
  'change_1450_1750',
  'water_and_sanitation',
  'great_war',
  'great_war_part2',
  'eee'
];

units.forEach(unit => {
  const filePath = path.join(__dirname, `../${unit}/generate_worksheets.js`);
  if (!fs.existsSync(filePath)) {
     console.log(`Skipping ${unit}, file not found.`);
     return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. In Narrative Blocks: Filter out exam questions
  const oldTasksBlock = `      if (block.tasks && block.tasks.length > 0) {
        html += \`<div class="task-box">\`;
        block.tasks.forEach(task => {
          if (task.type === 'draw') {
             html += \`<div class="draw-task"><i class="fa-solid fa-pencil"></i> Q\${task.qNum}: \${task.text || task.question}</div>\`;
          } else {
             html += \`<p style="margin-top:10px;"><strong>Q\${task.qNum}. \${task.text || task.question}</strong></p>\`;
             html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
          }
        });
        html += \`</div>\`;
      }`;
  
  const newTasksBlock = `      if (block.tasks && block.tasks.length > 0) {
        let nonExamTasks = block.tasks.filter(t => {
            let txt = t.text || t.question || '';
            return !txt.includes('marks)');
        });
        if (nonExamTasks.length > 0) {
          html += \`<div class="task-box">\`;
          nonExamTasks.forEach(task => {
            if (task.type === 'draw') {
               html += \`<div class="draw-task"><i class="fa-solid fa-pencil"></i> Q\${task.qNum}: \${task.text || task.question}</div>\`;
            } else {
               html += \`<p style="margin-top:10px;"><strong>Q\${task.qNum}. \${task.text || task.question}</strong></p>\`;
               html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
            }
          });
          html += \`</div>\`;
        }
      }`;

  if (content.includes(oldTasksBlock)) {
      content = content.replace(oldTasksBlock, newTasksBlock);
      console.log(`Updated narrative block tasks in ${unit}`);
  }

  // 2. In GCSE Exam Practice: Add the pulled exam tasks
  const oldGCSE = `  // GCSE Cross-Source Analysis & Exam Practice
  let hasExamTask = lesson.gcse_task || (lesson.extended && lesson.extended.question);
  if (hasExamTask) {
    html += \`<div style="page-break-before: always;">\`;
    html += \`<h2 style="margin-top: 0;">GCSE Exam Practice</h2>\`;`;

  const newGCSE = `  // Extract exam tasks from narrative blocks or lesson tasks
  let extractedExamTasks = [];
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        let eTasks = block.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
        extractedExamTasks = extractedExamTasks.concat(eTasks);
      }
    });
  }
  if (lesson.tasks) {
    let eTasks = lesson.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
    extractedExamTasks = extractedExamTasks.concat(eTasks);
  }

  // GCSE Cross-Source Analysis & Exam Practice
  let hasExamTask = lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0;
  if (hasExamTask) {
    html += \`<div style="page-break-before: always;">\`;
    html += \`<h2 style="margin-top: 0;">GCSE Exam Practice</h2>\`;`;

  if (content.includes(oldGCSE)) {
      content = content.replace(oldGCSE, newGCSE);
  } else {
      console.log(`Could not find oldGCSE in ${unit}`);
  }

  // 3. Render the extracted exam tasks at the bottom of the Exam Practice section
  const oldEndGCSE = `    }
    
    html += \`</div>\`;
  }`;

  const newEndGCSE = `    }

    if (extractedExamTasks.length > 0) {
      extractedExamTasks.forEach(task => {
         let text = task.text || task.question || '';
         html += \`<div style="margin-top: 20px;"><strong>Q\${task.qNum ? task.qNum + '.' : ''} \${text}</strong></div>\`;
         let lines = 8;
         if (text.includes("16 marks")) lines = 42;
         else if (text.includes("12 marks") || text.includes("Explain why")) lines = 22;
         else if (text.includes("8 marks")) lines = 12;
         for(let i=0; i<lines; i++) {
             html += \`<div class="task-lines-large"></div>\`;
         }
      });
    }
    
    html += \`</div>\`;
  }`;

  // We need to be careful with replacing this ending block because it might match multiple things.
  // Actually, we can just replace the LAST occurrence of `html += \`</div>\`;\n  }` before `// Inject Discreet Grading Footer`
  const splitPoint = `// Inject Discreet Grading Footer`;
  if (content.includes(splitPoint)) {
      let parts = content.split(splitPoint);
      let part1 = parts[0];
      
      let lastDiv = `    html += \`</div>\`;
  }`;
      let lastDivIndex = part1.lastIndexOf(lastDiv);
      if (lastDivIndex !== -1) {
          part1 = part1.substring(0, lastDivIndex) + `    if (extractedExamTasks.length > 0) {
      extractedExamTasks.forEach(task => {
         let text = task.text || task.question || '';
         html += \`<div style="margin-top: 30px;"><strong>Q\${task.qNum ? task.qNum + '.' : ''} \${text}</strong></div>\`;
         let lines = 8;
         if (text.includes("16 marks")) lines = 42;
         else if (text.includes("12 marks") || text.includes("Explain why")) lines = 22;
         else if (text.includes("8 marks")) lines = 12;
         for(let i=0; i<lines; i++) {
             html += \`<div class="task-lines-large"></div>\`;
         }
      });
    }
    
    html += \`</div>\`;
  }
` + "\n\n  ";
          content = part1 + splitPoint + parts[1];
          console.log(`Successfully updated exam practice block in ${unit}`);
      }
  }

  fs.writeFileSync(filePath, content, 'utf8');
});
