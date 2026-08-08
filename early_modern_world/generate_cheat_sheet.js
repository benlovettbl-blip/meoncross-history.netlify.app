const fs = require('fs');
const path = require('path');

const unitDir = __dirname;
const dataPath = path.join(unitDir, 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error(`Error: data.js not found in ${unitDir}`);
  process.exit(1);
}

// Since data.js exports a variable, we can require it safely if it's commonjs or extract it.
// In this repo, data.js is ES module format (`export const unitData =`). 
// So we extract the JSON part directly.
let f = fs.readFileSync(dataPath, 'utf8');
let jsonStr = f.substring(f.indexOf('export const unitData = ') + 24);
jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(';') > -1 ? jsonStr.lastIndexOf(';') : jsonStr.length);
const unitData = JSON.parse(jsonStr);

let masterVocab = [];
let hingeQuestions = [];
let examTasks = [];

if (unitData.lessons) {
  unitData.lessons.forEach(lesson => {
    // Vocab
    if (lesson.vocab) {
      masterVocab = masterVocab.concat(lesson.vocab);
    }
    // Hinge questions from image contexts
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(b => {
         if (b.images) {
            b.images.forEach(img => {
                if (img.image_context && img.image_context.includes('Hinge Question:')) {
                    let text = img.image_context;
                    let match = text.match(/Hinge Question:\*\*\s*(.+)$/i) || text.match(/Hinge Question:\s*\*\*(.+)\*\*/i) || text.match(/Hinge Question: (.*)$/i);
                    if (match) hingeQuestions.push(match[1]);
                }
            });
         }
      });
    }
    // Exam tasks
    if (lesson.gcse_task && lesson.gcse_task.tasks) {
      lesson.gcse_task.tasks.forEach(t => {
        examTasks.push(t.text);
      });
    }
  });
}

// Deduplicate vocab
const uniqueVocabMap = new Map();
masterVocab.forEach(v => {
  uniqueVocabMap.set(v.term.toLowerCase(), v);
});
const uniqueVocab = Array.from(uniqueVocabMap.values()).sort((a, b) => a.term.localeCompare(b.term));

// HTML Generation
let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - High-Yield Revision Cheat Sheet</title>
  <style>
    :root {
      --primary: #1e3a8a;
      --secondary: #b45309;
      --bg: #f8fafc;
      --border: #cbd5e1;
      --text: #334155;
    }
    body { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 30px; color: var(--text); line-height: 1.5; background: #fff; }
    h1 { color: var(--primary); border-bottom: 4px solid var(--primary); padding-bottom: 10px; text-align: center; font-size: 24pt; margin-bottom: 30px; }
    h2 { color: var(--secondary); border-bottom: 2px solid var(--border); margin-top: 35px; padding-bottom: 5px; font-size: 16pt; display: flex; align-items: center; gap: 10px;}
    
    /* Timeline */
    .timeline-container { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; border-left: 3px solid var(--primary); padding-left: 15px; }
    .timeline-event { background: var(--bg); border: 1px solid var(--border); padding: 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .timeline-date { font-weight: bold; color: var(--primary); font-size: 11pt; }
    .timeline-title { font-weight: bold; font-size: 11pt; margin-left: 10px; }
    
    /* Individuals */
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin-bottom: 20px; }
    .card { border: 1px solid var(--border); padding: 12px; background: var(--bg); border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-top: 4px solid var(--primary); }
    .card-title { font-weight: bold; color: var(--primary); font-size: 12pt; margin-bottom: 4px; }
    .card-role { font-size: 9pt; color: var(--secondary); font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .card-bio { font-size: 9.5pt; }

    /* Thematic Glossary */
    .glossary-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .glossary-table th, .glossary-table td { border: 1px solid var(--border); padding: 10px; text-align: left; vertical-align: top; }
    .glossary-table th { background: var(--primary); color: #fff; font-weight: bold; }
    .glossary-table tr:nth-child(even) { background: var(--bg); }

    /* Hinge Questions */
    .hinge-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .hinge-list { margin: 0; padding-left: 20px; font-size: 10.5pt; font-weight: bold; color: #92400e; }
    .hinge-list li { margin-bottom: 8px; }

    /* Exam Reminders */
    .exam-box { background: #e0e7ff; border: 2px dashed #4f46e5; padding: 15px; border-radius: 8px; margin-top: 30px; }
    .exam-box h3 { color: #4338ca; margin-top: 0; margin-bottom: 10px; }
    .exam-box p { font-size: 9.5pt; margin: 0 0 10px 0; }

    @media print {
      body { margin: 0; font-size: 9pt; }
      h1 { font-size: 18pt; margin-bottom: 15px; }
      h2 { font-size: 13pt; margin-top: 20px; page-break-after: avoid; }
      .grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .card, .timeline-event, .hinge-box, .exam-box { page-break-inside: avoid; }
      .glossary-table { page-break-inside: auto; }
      tr { page-break-inside: avoid; page-break-after: auto; }
    }
  </style>
</head>
<body>

  <h1>${unitData.title}<br><span style="font-size:12pt; color:#64748b; font-weight:normal;">Ultimate Revision Cheat Sheet</span></h1>

`;

// 1. Timeline
if (unitData.timeline && unitData.timeline.length > 0) {
  html += `<h2>⏱️ 1. Core Chronology</h2>`;
  html += `<div class="timeline-container">`;
  unitData.timeline.forEach(t => {
    html += `<div class="timeline-event">
      <span class="timeline-date">${t.date}</span>
      <span class="timeline-title">${t.title}</span>
      <div style="font-size: 9.5pt; margin-top: 5px;">${t.description}</div>
    </div>`;
  });
  html += `</div>`;
}

// 2. Individuals
if (unitData.key_individuals && unitData.key_individuals.length > 0) {
  html += `<h2>👤 2. Key Individuals</h2>`;
  html += `<div class="grid">`;
  unitData.key_individuals.forEach(person => {
    html += `
      <div class="card">
        <div class="card-title">${person.name}</div>
        <div class="card-role">${person.role || 'Historical Figure'}</div>
        <div class="card-bio">${person.bio}</div>
      </div>
    `;
  });
  html += `</div>`;
}

// 3. Glossary
if (uniqueVocab.length > 0) {
  html += `<h2>📖 3. Master Glossary</h2>`;
  html += `<table class="glossary-table">
    <thead>
      <tr>
        <th style="width: 25%;">Term</th>
        <th style="width: 75%;">Definition</th>
      </tr>
    </thead>
    <tbody>
  `;
  uniqueVocab.forEach(v => {
    html += `<tr>
      <td><strong>${v.term}</strong></td>
      <td>${v.definition}</td>
    </tr>`;
  });
  html += `</tbody></table>`;
}

// 4. Hinge Questions
if (hingeQuestions.length > 0) {
    html += `<h2>🧠 4. Core Concepts & Big Questions</h2>`;
    html += `<div class="hinge-box"><ul class="hinge-list">`;
    hingeQuestions.forEach(q => {
        html += `<li>${q}</li>`;
    });
    html += `</ul></div>`;
}

// 5. Exam Skills
if (examTasks.length > 0) {
    html += `
    <div class="exam-box">
        <h3>📝 Exam Technique Reminders</h3>
        <p><strong>Utility Questions (8 marks):</strong> Always assess both the Content (what it shows) and the Provenance (who made it, when, and why). Use your contextual knowledge to test if the source is accurate.</p>
        <p><strong>Common Topics to Prepare For:</strong></p>
        <ul style="font-size: 9.5pt; margin: 0; padding-left: 20px;">
    `;
    examTasks.forEach(t => {
        html += `<li>${t}</li>`;
    });
    html += `</ul></div>`;
}


html += `
</body>
</html>
`;

const outPath = path.join(unitDir, 'cheat_sheet.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Successfully generated NEW cheat_sheet.html for', unitData.title);
