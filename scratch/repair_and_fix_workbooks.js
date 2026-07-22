const fs = require('fs');
const path = require('path');

const units = [
  'edexcel_medicine',
  'change_1450_1750',
  'water_and_sanitation',
  'great_war',
  'great_war_part2'
];

units.forEach(unit => {
  const filePath = path.join(__dirname, `../${unit}/generate_worksheets.js`);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Tracker
  const oldTrackerStart = "  let trackerRows = '';";
  const oldTrackerEnd = "  });";
  if (content.includes(oldTrackerStart) && content.includes(oldTrackerEnd)) {
      let startIdx = content.indexOf(oldTrackerStart);
      let endIdx = content.indexOf(oldTrackerEnd, startIdx) + oldTrackerEnd.length;
      let trackerBlock = content.substring(startIdx, endIdx);
      
      let newTrackerBlock = [
          "  let trackerRows = '';",
          "  periodLessons.forEach(l => {",
          "    let maxScore = 5;",
          "    if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;",
          "    trackerRows += `<tr style=\"background-color: #f1f5f9;\"><td style=\"border:1px solid #333; padding:6px; font-weight:bold;\">${l.title}</td><td style=\"border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;\">Do Now: / ${maxScore}</td><td style=\"border:1px solid #333; padding:6px; width:60px;\"></td><td style=\"border:1px solid #333; padding:6px;\"></td></tr>`;",
          "    ",
          "    const addExamRow = (qText) => {",
          "      if (!qText) return;",
          "      let marksMatch = qText.match(/\\((\\d+)\\s*marks?\\)/i);",
          "      let marks = marksMatch ? marksMatch[1] : '?';",
          "      let shortText = qText.split(' ').slice(0, 10).join(' ') + '...';",
          "      shortText = shortText.replace(/<[^>]*>?/gm, '');",
          "      trackerRows += `<tr><td style=\"border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;\">&#x21b3; Exam: ${shortText}</td><td style=\"border:1px solid #333; padding:6px; text-align:center; font-weight:bold;\">&nbsp;&nbsp;&nbsp;&nbsp; / ${marks}</td><td style=\"border:1px solid #333; padding:6px;\"></td><td style=\"border:1px solid #333; padding:6px;\"></td></tr>`;",
          "    };",
          "    if (l.extended && l.extended.question) addExamRow(l.extended.question);",
          "    if (l.gcse_task && l.gcse_task.tasks) l.gcse_task.tasks.forEach(t => addExamRow(t.text));",
          "    if (l.narrative_blocks) {",
          "        l.narrative_blocks.forEach(block => {",
          "            if (block.tasks) block.tasks.forEach(t => {",
          "                let txt = t.text || t.question || '';",
          "                if (txt.includes('marks)')) addExamRow(txt);",
          "            });",
          "        });",
          "    }",
          "    if (l.tasks) {",
          "        l.tasks.forEach(t => {",
          "            let txt = t.text || t.question || '';",
          "            if (txt.includes('marks)')) addExamRow(txt);",
          "        });",
          "    }",
          "  });"
      ].join('\n');
      content = content.replace(trackerBlock, newTrackerBlock);
      console.log(`Updated tracker in ${unit}`);
  }

  // Remove rogue blocks
  const rogue1 = /    if \(extractedExamTasks\.length > 0\) \{[\s\S]*?html \+= `<\/div>`;\n  \}\n\n  \/\/ Inject Discreet Grading Footer/g;
  if (rogue1.test(content)) content = content.replace(rogue1, `// Inject Discreet Grading Footer`);
  const rogue2 = /    if \(extractedExamTasks\.length > 0\) \{[\s\S]*?html \+= `<\/div>`;\n  \}\n  \/\/ Inject Discreet Grading Footer/g;
  if (rogue2.test(content)) content = content.replace(rogue2, `  // Inject Discreet Grading Footer`);

  // Fix Narrative blocks loop
  const oldTasksBlock = [
      "      if (block.tasks && block.tasks.length > 0) {",
      "        html += `<div class=\"task-box\">`;",
      "        block.tasks.forEach(task => {",
      "          if (task.type === 'draw') {",
      "             html += `<div class=\"draw-task\"><i class=\"fa-solid fa-pencil\"></i> Q${task.qNum}: ${task.text || task.question}</div>`;",
      "          } else {",
      "             html += `<p style=\"margin-top:10px;\"><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>`;",
      "             html += `<div class=\"task-lines\"></div><div class=\"task-lines\"></div><div class=\"task-lines\"></div>`;",
      "          }",
      "        });",
      "        html += `</div>`;",
      "      }"
  ].join('\n');
  
  const newTasksBlock = [
      "      if (block.tasks && block.tasks.length > 0) {",
      "        let nonExamTasks = block.tasks.filter(t => !((t.text || t.question || '').includes('marks)')));",
      "        if (nonExamTasks.length > 0) {",
      "          html += `<div class=\"task-box\">`;",
      "          nonExamTasks.forEach(task => {",
      "            if (task.type === 'draw') {",
      "               html += `<div class=\"draw-task\"><i class=\"fa-solid fa-pencil\"></i> Q${task.qNum}: ${task.text || task.question}</div>`;",
      "            } else {",
      "               html += `<p style=\"margin-top:10px;\"><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>`;",
      "               html += `<div class=\"task-lines\"></div><div class=\"task-lines\"></div><div class=\"task-lines\"></div>`;",
      "            }",
      "          });",
      "          html += `</div>`;",
      "        }",
      "      }"
  ].join('\n');

  if (content.includes(oldTasksBlock)) {
      content = content.replace(oldTasksBlock, newTasksBlock);
  }

  // Rewrite GCSE block
  const startMarker = `// GCSE Cross-Source Analysis & Exam Practice`;
  const endMarker = `// Inject Discreet Grading Footer for the Lesson`;
  
  if (content.includes(startMarker) && content.includes(endMarker)) {
      let parts = content.split(startMarker);
      let before = parts[0];
      let subParts = parts[1].split(endMarker);
      let after = subParts[1];
      
      let newSection = [
          "  // Extract exam tasks from narrative blocks or lesson tasks",
          "  let extractedExamTasks = [];",
          "  if (lesson.narrative_blocks) {",
          "    lesson.narrative_blocks.forEach(block => {",
          "      if (block.tasks) extractedExamTasks = extractedExamTasks.concat(block.tasks.filter(t => (t.text || t.question || '').includes('marks)')));",
          "    });",
          "  }",
          "  if (lesson.tasks) extractedExamTasks = extractedExamTasks.concat(lesson.tasks.filter(t => (t.text || t.question || '').includes('marks)')));",
          "",
          "  let hasExamTask = lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0;",
          "  if (hasExamTask) {",
          "    html += `<div style=\"page-break-before: always;\">`;",
          "    html += `<h2 style=\"margin-top: 0;\">GCSE Exam Practice</h2>`;",
          "",
          "    const renderLines = (text) => {",
          "        let lines = 12;",
          "        if (text.includes(\"16 marks\")) lines = 42;",
          "        else if (text.includes(\"12 marks\") || text.includes(\"Explain why\")) lines = 22;",
          "        for(let i=0; i<lines; i++) html += `<div class=\"task-lines-large\"></div>`;",
          "    };",
          "",
          "    if (lesson.gcse_task) {",
          "        if (lesson.gcse_task.tasks) {",
          "          lesson.gcse_task.tasks.forEach(task => {",
          "             html += `<div style=\"margin-top: 15px;\"><strong>Q${task.qNum ? task.qNum + '.' : ''} ${task.text}</strong></div>`;",
          "             renderLines(task.text);",
          "             html += `<br>`;",
          "          });",
          "        } else if (lesson.gcse_task.sources) {",
          "          html += `<p style=\"font-weight: bold; font-size: 13pt;\">How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}?</p>`;",
          "          let sourceHTML = '<div style=\"display: flex; gap: 20px; margin-bottom: 20px;\">';",
          "          lesson.gcse_task.sources.forEach(srcObj => {",
          "            sourceHTML += '<div style=\"flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;\">';",
          "            if (srcObj.type === 'visual') {",
          "              let imgSrc = srcObj.src.startsWith('../') ? srcObj.src : `..${srcObj.src}`;",
          "              sourceHTML += `<img src=\"${imgSrc}\" style=\"max-width: 100%; max-height: 250px;\">`;",
          "            } else {",
          "              sourceHTML += `<blockquote style=\"font-size: 11pt; font-style: italic; margin: 0 0 10px 0; text-align: left;\">${srcObj.text}</blockquote>`;",
          "            }",
          "            sourceHTML += `<p style=\"font-size: 10pt; font-weight: bold; margin-top: 5px;\">${srcObj.title}</p>`;",
          "            sourceHTML += '</div>';",
          "          });",
          "          sourceHTML += '</div>';",
          "          html += sourceHTML;",
          "          html += `<h3 style=\"margin-top: 0;\">Source Evaluation Notes</h3>`;",
          "          html += `",
          "            <table style=\"width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: avoid;\">",
          "              <tr><th style=\"border: 2px solid #000; padding: 8px; width: 10%;\">Source</th><th style=\"border: 2px solid #000; padding: 8px; width: 30%;\">N.O.P. (Nature, Origin, Purpose)</th><th style=\"border: 2px solid #000; padding: 8px; width: 30%;\">Content (What it shows/says)</th><th style=\"border: 2px solid #000; padding: 8px; width: 30%;\">Contextual Knowledge</th></tr>",
          "              <tr><td style=\"border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;\">A</td><td style=\"border: 2px solid #000; padding: 8px;\"></td><td style=\"border: 2px solid #000; padding: 8px;\"></td><td style=\"border: 2px solid #000; padding: 8px;\"></td></tr>",
          "              <tr><td style=\"border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;\">B</td><td style=\"border: 2px solid #000; padding: 8px;\"></td><td style=\"border: 2px solid #000; padding: 8px;\"></td><td style=\"border: 2px solid #000; padding: 8px;\"></td></tr>",
          "            </table>",
          "          `;",
          "          html += `<h3 style=\"margin-top: 0;\">Final Written Evaluation</h3>`;",
          "          for(let i=0; i<20; i++) html += `<div class=\"task-lines-large\"></div>`;",
          "        }",
          "    }",
          "",
          "    if (lesson.extended && lesson.extended.question) {",
          "        html += `<div style=\"margin-top: 20px;\"><strong>Q${lesson.extended.qNum}. ${lesson.extended.question}</strong></div>`;",
          "        renderLines(lesson.extended.question);",
          "    }",
          "    ",
          "    if (extractedExamTasks.length > 0) {",
          "        extractedExamTasks.forEach(task => {",
          "           let text = task.text || task.question || '';",
          "           html += `<div style=\"margin-top: 20px;\"><strong>Q${task.qNum ? task.qNum + '.' : ''} ${text}</strong></div>`;",
          "           renderLines(text);",
          "        });",
          "    }",
          "",
          "    html += `</div>`;",
          "  }",
          "",
          "  "
      ].join('\n');
      
      content = before + startMarker + '\n' + newSection + '\n  ' + endMarker + after;
  }

  fs.writeFileSync(filePath, content, 'utf8');
});
