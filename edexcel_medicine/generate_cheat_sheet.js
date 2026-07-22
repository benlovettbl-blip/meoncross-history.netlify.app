const fs = require('fs');
const path = require('path');

// Extract the directory name from where the script is executed
// If run from a specific unit folder, __dirname is that folder.
// Since we want this script to be copied into every unit folder, we assume it's running inside the unit folder.

const unitDir = __dirname;
const dataPath = path.join(unitDir, 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error(`Error: data.js not found in ${unitDir}`);
  process.exit(1);
}

const unitData = require(dataPath);
if (unitData.unitData) {
  // Handle case where it's exported as { unitData }
  Object.assign(unitData, unitData.unitData);
}

let masterVocab = [];
let examTasks = [];

if (unitData.lessons) {
  unitData.lessons.forEach(lesson => {
    if (lesson.vocab) {
      masterVocab = masterVocab.concat(lesson.vocab);
    }
    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
        lesson.gcse_task.tasks.forEach(t => {
          examTasks.push({ topic: lesson.title, text: t.text, type: t.type });
        });
      } else if (lesson.gcse_task.sources) {
        examTasks.push({ topic: lesson.title, text: `How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}? (8 marks)`, type: 'source_utility' });
      }
    }
    if (lesson.extended && lesson.extended.question) {
      examTasks.push({ topic: lesson.title, text: lesson.extended.question, type: 'essay' });
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
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 20px; color: #333; line-height: 1.4; }
    h1 { color: #1e3a8a; border-bottom: 3px solid #1e3a8a; padding-bottom: 5px; text-align: center; }
    h2 { color: #b45309; border-bottom: 2px solid #e2e8f0; margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11pt; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #f8fafc; color: #334155; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
    .card { border: 1px solid #cbd5e1; padding: 10px; background: #fff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .card-title { font-weight: bold; color: #1e3a8a; font-size: 13pt; margin-bottom: 5px; }
    .card-role { font-size: 11pt; color: #64748b; font-style: italic; margin-bottom: 5px; }
    .card-bio { font-size: 11pt; }
    .exam-list { padding-left: 20px; }
    .exam-list li { margin-bottom: 8px; }
    @media print {
      body { margin: 0; font-size: 11pt; }
      h1 { font-size: 20pt; }
      h2 { font-size: 16pt; page-break-after: avoid; }
      .grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .card { page-break-inside: avoid; }
      table { page-break-inside: auto; }
      tr { page-break-inside: avoid; page-break-after: auto; }
    }
  </style>
</head>
<body>

  <h1>${unitData.title}<br><span style="font-size:14pt; color:#666;">High-Yield Revision Cheat Sheet</span></h1>

`;

// Section 1: Key Vocabulary
if (uniqueVocab.length > 0) {
  html += `<h2>1. Master Glossary</h2>`;
  html += `<table>
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

// Section 2: Key Individuals Matrix
if (unitData.key_individuals && unitData.key_individuals.length > 0) {
  html += `<h2>2. Key Individuals Matrix</h2>`;
  html += `<div class="grid">`;
  unitData.key_individuals.forEach(person => {
    html += `
      <div class="card">
        <div class="card-title">${person.name}</div>
        <div class="card-role">${person.role || ''}</div>`;
        
    if (person.actions || person.achievements || person.limitations) {
      if (person.actions) html += `<div style="font-size: 10pt; margin-top: 8px;"><strong>Actions:</strong> ${person.actions}</div>`;
      if (person.achievements) html += `<div style="font-size: 10pt; margin-top: 4px; color: #15803d;"><strong>Impact:</strong> ${person.achievements}</div>`;
      if (person.limitations) html += `<div style="font-size: 10pt; margin-top: 4px; color: #b91c1c;"><strong>Limitations:</strong> ${person.limitations}</div>`;
    } else {
      html += `<div class="card-bio">${person.bio}</div>`;
    }
    
    html += `
      </div>
    `;
  });
  html += `</div>`;
}

// Section 3: Exam Question Bank
if (examTasks.length > 0) {
  html += `<h2>3. Exam Question Bank</h2>`;
  html += `<ul class="exam-list">`;
  examTasks.forEach(t => {
    html += `<li>[${t.topic}] ${t.text}</li>`;
  });
  html += `</ul>`;
}

html += `
</body>
</html>
`;

const outPath = path.join(unitDir, 'cheat_sheet.html');
fs.writeFileSync(outPath, html);
console.log('Successfully generated cheat_sheet.html for', unitData.title);
