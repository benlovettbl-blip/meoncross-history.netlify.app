import fs from 'fs';

const cmeDir = 'c:/Projects/meoncross-history.netlify.app/cme_new';
const dataPath = `${cmeDir}/data.js`;
const content = fs.readFileSync(dataPath, 'utf8');

// Parse data
let jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
const unitData = eval('(' + jsonStr + ')');

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Quiz Pack</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 20mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 12pt; line-height: 1.6; color: #000; background: #fff; }
    h1 { font-family: 'Playfair Display', serif; font-size: 28pt; text-align: center; border-bottom: 3px solid #1a237e; padding-bottom: 10px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 18pt; color: #1a237e; margin-top: 30px; border-bottom: 2px solid #ccc; padding-bottom: 5px; }
    .page-break { page-break-before: always; }
    .question-list { list-style: none; padding: 0; }
    .question-item { margin-bottom: 35px; }
    .q-text { font-weight: 600; font-size: 13pt; margin-bottom: 10px; }
    .a-lines { border-bottom: 1px dotted #666; height: 30px; margin-top: 10px; width: 100%; }
    .answer-box { background: #f0fdf4; border-left: 5px solid #16a34a; padding: 15px; margin-top: 10px; border-radius: 4px; }
    .explanation { font-style: italic; color: #475569; margin-top: 5px; font-size: 11pt; }
    .header-box { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; font-weight: bold; font-size: 14pt; }
  </style>
</head>
<body>
`;

// Extract questions from each lesson
const allLessons = unitData.lessons.map(lesson => {
  let questions = [];
  
  if (lesson.do_now && lesson.do_now.type === "questions") {
    lesson.do_now.items.forEach(q => questions.push({ q: q.question, a: q.answer }));
  }
  
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        block.tasks.forEach(task => {
          // Skip long exam questions with marks
          if (/\\(\\d+\\s*marks?\\)/i.test(task.text)) return;
          
          let cleanQ = task.text.replace(/^(Q\\d+:|Task \\d+:|Question \\d+[a-z]?:|Enquiry Task:)\\s*/i, '').replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '');
          questions.push({ q: cleanQ, a: task.model || 'Model answer to be discussed in class.' });
        });
      }
    });
  }
  
  // NOTE: Intentionally skipping \`lesson.tasks\` because in GCSE these are long 4-mark and 8-mark questions!
  
  return { title: lesson.title, questions };
});

// ==========================================
// SECTION 1: STUDENT QUESTION SHEETS
// ==========================================
html += `<h1>${unitData.title} - Revision Quiz Pack</h1>`;
html += `<p style="text-align: center; font-style: italic;">Student Question Sheets</p>`;

allLessons.forEach((lesson, idx) => {
  if (lesson.questions.length === 0) return;
  
  if (idx > 0) html += `<div class="page-break"></div>`;
  
  html += `
  <div class="header-box">
    <div>Name: ______________________</div>
    <div>Class: _________</div>
    <div>Score: ____ / ${lesson.questions.length}</div>
  </div>
  <h2>${lesson.title}</h2>
  <ul class="question-list">
  `;
  
  lesson.questions.forEach((item, qIdx) => {
    let cleanQ = item.q.replace(/^\\d+\\.\\s*/, "");
    html += `
      <li class="question-item">
        <div class="q-text">Q${qIdx + 1}. ${cleanQ}</div>
        <div class="a-lines"></div>
        <div class="a-lines"></div>
        <div class="a-lines"></div>
      </li>
    `;
  });
  
  html += `</ul>`;
});

// ==========================================
// SECTION 2: TEACHER ANSWER KEY
// ==========================================
html += `<div class="page-break"></div>`;
html += `<h1>Teacher Answer Key & Explanations</h1>`;
html += `<p style="text-align: center; font-style: italic;">For Teacher Use Only</p>`;

allLessons.forEach(lesson => {
  if (lesson.questions.length === 0) return;
  
  html += `<h2>${lesson.title}</h2>`;
  html += `<ul class="question-list">`;
  
  lesson.questions.forEach((item, qIdx) => {
    let cleanQ = item.q.replace(/^\\d+\\.\\s*/, "");
    html += `
      <li class="question-item">
        <div class="q-text">Q${qIdx + 1}. ${cleanQ}</div>
        <div class="answer-box">
          <strong>Model Answer:</strong><br/>
          ${item.a}
        </div>
      </li>
    `;
  });
  
  html += `</ul>`;
});

html += `
</body>
</html>
`;

fs.writeFileSync(`${cmeDir}/quiz_pack.html`, html);
console.log("Generated updated quiz_pack.html");
