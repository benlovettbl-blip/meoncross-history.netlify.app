const fs = require('fs');
const path = require('path');

// 1. Read and parse the JS data file
const dataContent = fs.readFileSync(path.join(__dirname, 'src', 'lessons_data.js'), 'utf8');
const cleanObjStr = dataContent.replace('export const LESSONS_DATA =', '').trim();
const LESSONS_DATA = (new Function("return " + cleanObjStr.replace(/;$/, '')))();

// 1b. Read WORKBOOK_DATA to get vocabulary
const workbookContent = fs.readFileSync(path.join(__dirname, 'src', 'workbook_data.js'), 'utf8');
const cleanWorkbookStr = workbookContent.replace('export const WORKBOOK_DATA =', '').trim();
const WORKBOOK_DATA = (new Function("return " + cleanWorkbookStr.replace(/;$/, '')))();

const keyTopics = [
  { 
    id: 'KT1', 
    title: 'Key Topic 1: The Birth of the State of Israel (1945-63)', 
    subtopics: ['subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3'],
    bullets: [
      "1.1 The British withdrawal and the creation of Israel",
      "1.2 Aftermath of the 1948-49 war",
      "1.3 Increased tension, 1955-63"
    ]
  },
  { 
    id: 'KT2', 
    title: 'Key Topic 2: The Escalating Conflict (1964-73)', 
    subtopics: ['subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3'],
    bullets: [
      "2.1 The Six Day War, 1967",
      "2.2 Aftermath of the 1967 war",
      "2.3 Israel and Egypt, 1967-73"
    ]
  },
  { 
    id: 'KT3', 
    title: 'Key Topic 3: Attempts at a solution (1974-95)', 
    subtopics: ['subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'],
    bullets: [
      "3.1 Diplomatic negotiations",
      "3.2 The Palestinian issue",
      "3.3 Attempts at a solution"
    ]
  }
];

const scratchDir = path.join(__dirname, 'workbook_stash');

for (const kt of keyTopics) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Conflict in the Middle East - ${kt.id} Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 20mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 11pt; line-height: 1.6; color: #000; background: #fff; }
    h1 { font-family: 'Playfair Display', serif; font-size: 32pt; text-align: center; margin-top: 50px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 18pt; color: #1a237e; border-bottom: 2px solid #ccc; padding-bottom: 5px; page-break-before: always; margin-bottom: 20px; }
    h3 { font-size: 14pt; color: #333; margin-top: 25px; font-weight: 600; }
    
    /* Text formatting */
    p { margin-bottom: 12pt; text-align: justify; }
    ul { margin-bottom: 15pt; }
    li { margin-bottom: 5pt; }
    
    /* Premium Textbook Boxes */
    .do-now-box { border: 2px solid #1a237e; padding: 15px; margin-bottom: 25px; background: #fff; border-radius: 4px; box-shadow: 2px 2px 0px #1a237e; }
    .do-now-title { font-weight: 800; margin-bottom: 15px; font-size: 12pt; border-bottom: 1px solid #1a237e; padding-bottom: 5px; color: #1a237e; text-transform: uppercase; letter-spacing: 1px; }
    .do-now-q { margin-bottom: 8px; font-weight: 600; font-size: 11pt; }
    
    .examiner-tip-box { background: #e8eaf6; border: 1px solid #9fa8da; border-left: 5px solid #3f51b5; padding: 15px; margin: 20px 0; font-size: 10.5pt; border-radius: 2px; }
    .examiner-tip-title { font-weight: bold; color: #1a237e; margin-bottom: 5px; display: block; font-size: 11pt; }
    
    .scholarly-box { background: #fff3e0; border: 1px solid #ffcc80; border-left: 5px solid #ff9800; padding: 15px; margin: 20px 0; font-size: 10.5pt; border-radius: 2px; }
    .scholarly-title { font-weight: bold; color: #e65100; margin-bottom: 5px; display: block; font-size: 11pt; }
    
    .source-container { text-align: center; margin: 25px 0; page-break-inside: avoid; border: 2px solid #37474f; padding: 20px; background: #eceff1; border-radius: 4px; position: relative; }
    .source-title { font-weight: 800; color: #263238; margin-bottom: 12px; font-size: 12pt; text-align: left; border-bottom: 1px solid #cfd8dc; padding-bottom: 8px; text-transform: uppercase; }
    .source-container img { max-width: 100%; max-height: 400px; border: 1px solid #78909c; box-shadow: 3px 3px 6px rgba(0,0,0,0.15); margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; }
    .source-caption { font-style: italic; font-size: 10.5pt; color: #455a64; text-align: justify; background: #fff; padding: 12px; border: 1px solid #cfd8dc; }
    
    /* Task Lines */
    .task-lines-small { border-bottom: 1px dashed #9ca3af; height: 25px; margin-top: 5px; width: 100%; }
    .task-lines-large { border-bottom: 1px dashed #9ca3af; height: 35px; margin-top: 5px; width: 100%; }
    
    /* Comprehension Tasks Box */
    .tasks-box { margin-top: 35px; border: 2px solid #424242; padding: 20px; page-break-inside: avoid; border-radius: 4px; box-shadow: 3px 3px 0px #e0e0e0; }
    .tasks-title { font-weight: 800; font-size: 14pt; margin-bottom: 20px; font-family: 'Playfair Display', serif; color: #212121; text-transform: uppercase; border-bottom: 2px solid #424242; padding-bottom: 5px; display: inline-block; }
    .task-q { font-weight: bold; margin-top: 15px; margin-bottom: 10px; font-size: 11pt; }
    
  </style>
</head>
<body>

  <h1>Conflict in the Middle East</h1>
  <p style="text-align:center; font-size:16pt; margin-top: 0; color: #555;">${kt.title}</p>
  <p style="text-align:center; font-size:14pt; font-style: italic;">Student Workbook</p>
  
  <div style="text-align:center; margin: 20px 0;">
    <img src="../public/assets/sources/${kt.id.toLowerCase()}_cover.png" alt="Middle East Cover" onerror="this.src='../public/assets/sources/kt1_cover.png'" style="max-width: 65%; height: auto; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 3px 3px 10px rgba(0,0,0,0.15);">
  </div>

  <div style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt;">Name: </div>
  <div style="margin-top: 25px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; margin-bottom: 40px;">Class: </div>
  
  <div style="margin: 30px 5%; padding: 0;">
    <h3 style="margin-top: 0; margin-bottom: 15px; color: #1a237e; text-align: center; font-family: 'Playfair Display', serif; font-size: 16pt;">Specification Checklist & Inquiries</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt; border: 2px solid #1a237e;">
      <thead>
        <tr style="background: #e8eaf6; border-bottom: 2px solid #1a237e;">
          <th style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center; width: 8%;">Done</th>
          <th style="padding: 10px; border-right: 1px solid #9fa8da; text-align: left; width: 46%;">Key Topic 1: The Birth of the State of Israel (1945-63)</th>
          <th style="padding: 10px; text-align: left; width: 46%;">Core Inquiry Question</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #9fa8da;">
          <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
          <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">Conflicting interests and demands of Jews and Arabs within the British Mandate.</td>
          <td style="padding: 10px; font-style: italic; color: #333;">Why were the conflicting demands impossible for the British to resolve?</td>
        </tr>
        <tr style="border-bottom: 1px solid #9fa8da;">
          <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
          <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">Key events leading to the end of the British Mandate, partition and the creation of Israel, including the significance of the bombing of the King David Hotel and UN Resolution 181.</td>
          <td style="padding: 10px; font-style: italic; color: #333;">How did violence and international pressure force the British to withdraw?</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
          <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">Key events of the Arab-Israeli war (1948–49).</td>
          <td style="padding: 10px; font-style: italic; color: #333;">Why did Israel survive the invasion, and how did it completely change the map?</td>
        </tr>
      </tbody>
    </table>
  </div>
`;// 3. Render Each Lesson
kt.subtopics.forEach((subId, lessonIndex) => {
  const lesson = LESSONS_DATA[subId];
  if (!lesson) return;

  const cleanTitle = lesson.headerTitle.replace(/<[^>]+>/g, '').trim();
  html += `<h2>${cleanTitle}</h2>`;

  // --- DO NOW SECTION ---
  if (lesson.do_now && lesson.do_now.items) {
    html += `
    <div class="do-now-box">
      <div class="do-now-title">Do Now: Recall from Previous Lesson</div>
      ${lesson.do_now.items.map((item) => `
        <div class="do-now-q">${item.question}</div>
        <div class="task-lines-small"></div>
        <div class="task-lines-small" style="margin-bottom: 15px;"></div>
      `).join('')}
    </div>`;
  }

  
  // --- VOCABULARY ---
  const vocabData = WORKBOOK_DATA[subId] && WORKBOOK_DATA[subId].vocabulary;
  if (vocabData && vocabData.length > 0) {
    html += `
    <div class="vocab-box" style="border: 2px solid #004d40; padding: 15px; margin-bottom: 25px; background: #e0f2f1; border-radius: 4px; box-shadow: 2px 2px 0px #004d40;">
      <div class="vocab-title" style="font-weight: 800; margin-bottom: 15px; font-size: 12pt; border-bottom: 1px solid #004d40; padding-bottom: 5px; color: #004d40; text-transform: uppercase; letter-spacing: 1px;">Key Vocabulary</div>
      <ul style="margin: 0; padding-left: 20px;">
        ${vocabData.map(v => `<li style="margin-bottom: 8px;"><strong style="color: #004d40;">${v.term}:</strong> ${v.definition}</li>`).join('')}
      </ul>
    </div>`;
  }

  // --- NARRATIVE ---
  if (lesson.narrative && lesson.narrative.length > 0) {
    lesson.narrative.forEach(para => {
      html += `<p>${para}</p>`;
    });
  }

  // --- SCHOLARLY PERSPECTIVE & SOURCES (MASONRY LAYOUT) ---
  const hasScholarly = lesson.scholarlyDepth ? true : false;
  const hasSources = lesson.sources && lesson.sources.length > 0;
  
  if (hasScholarly || hasSources) {
    html += `<div style="column-count: 2; column-gap: 20px; margin: 25px 0;">`;
    
    if (hasScholarly) {
      html += `
      <div class="scholarly-box" style="break-inside: avoid; page-break-inside: avoid; margin: 0 0 20px 0; display: inline-block; width: 100%; box-sizing: border-box;">
        <span class="scholarly-title">🎓 ${lesson.scholarlyDepth.title}</span>
        ${lesson.scholarlyDepth.body}
      </div>`;
    }
    
    if (hasSources) {
      lesson.sources.forEach(source => {
        let srcPath = source.src || '';
        if (srcPath.startsWith('assets/')) {
          srcPath = '../public/' + srcPath;
        }
        html += `
        <div class="source-container" style="break-inside: avoid; page-break-inside: avoid; margin: 0 0 20px 0; display: inline-block; width: 100%; box-sizing: border-box; padding: 20px; background: #eceff1; border-radius: 4px; border: 2px solid #37474f;">
          <div class="source-title"><i class="fa-solid fa-search"></i> ${source.title}</div>
          ${srcPath ? `<img src="${srcPath}" alt="Source Image">` : ''}
          ${source.caption ? `<div class="source-caption">"${source.caption}"</div>` : ''}
        </div>`;
      });
    }
    html += `</div>`;
  }

  // --- DUAL PERSPECTIVE ---
  if (lesson.dualPerspective) {
    html += `
    <div style="border: 2px solid #5e35b1; border-radius: 4px; margin: 25px 0; background: #f3e5f5; page-break-inside: avoid;">
      <div style="background: #5e35b1; color: white; padding: 10px 15px; font-weight: bold; font-size: 12pt; text-align: center;">
        ${lesson.dualPerspective.neutralTitle}
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; padding: 15px; vertical-align: top; border-right: 1px solid #ce93d8;">
            <strong style="color: #4527a0; display: block; margin-bottom: 10px; font-size: 11pt;">${lesson.dualPerspective.leftHeadline}</strong>
            <div style="font-size: 10.5pt; text-align: justify; line-height: 1.5;">${lesson.dualPerspective.leftText}</div>
          </td>
          <td style="width: 50%; padding: 15px; vertical-align: top;">
            <strong style="color: #4527a0; display: block; margin-bottom: 10px; font-size: 11pt;">${lesson.dualPerspective.rightHeadline}</strong>
            <div style="font-size: 10.5pt; text-align: justify; line-height: 1.5;">${lesson.dualPerspective.rightText}</div>
          </td>
        </tr>
      </table>
    </div>`;
  }

  // --- COMPREHENSION TASKS ---
  if (lesson.tasks && lesson.tasks.length > 0) {
    html += `
    <div class="tasks-box">
      <div class="tasks-title">Comprehension Tasks</div>
      <div style="margin-bottom: 20px;">
    `;
    
    let totalTaskLines = 0;
    lesson.tasks.forEach((task, idx) => {
      let lines = 4;
      if (task.type === 'complex') lines = 8;
      totalTaskLines += lines;
      
      let text = task.text;
      if (!text.match(/^Q\d/)) {
        text = `Q${idx + 1}: ${text}`;
      }
      
      html += `
        <div class="task-q" style="margin-top: 8px; margin-bottom: 8px;">${text}</div>
      `;
    });
    
    html += `</div>`;
    
    for(let i=0; i<totalTaskLines; i++) {
      html += `<div class="task-lines-small"></div>`;
    }
    
    html += `</div>`;
  }

  // --- FALLBACK FOR OLD STEPS ---
  if (lesson.steps && lesson.steps.length > 0) {
    lesson.steps.forEach(step => {
      html += `<h3>${step.title}</h3>`;
      let content = step.bodyHtml;
      content = content.replace(/src="assets\//g, 'src="../public/assets/');
      content = content.replace(/style="[^"]*"/g, ''); // strip inline styles to let print CSS take over
      html += `<div>${content}</div>`;
      if (step.scholarlyDepth) {
        html += `
        <div class="scholarly-box">
          <span class="scholarly-title">🎓 ${step.scholarlyDepth.title}</span>
          ${step.scholarlyDepth.body}
        </div>`;
      }
    });
  }

  // --- EXAM PRACTICE ---
  if (lesson.questionVault && lesson.questionVault.length > 0) {
    html += `
    <div style="page-break-before: always; margin-top: 30px;">
      <h2 style="border: none; page-break-before: avoid;">Exam Practice: ${cleanTitle}</h2>
      <p style="font-style: italic; margin-bottom: 25px;">Use the blank lined pages below to answer the exam questions. Pay attention to the mark allocation.</p>
      
      <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #c5cae9; background: #e8eaf6; border-radius: 4px; page-break-inside: avoid;">
    `;

    lesson.questionVault.forEach((q, idx) => {
      html += `
        <div style="font-weight: 800; font-size: 11.5pt; color: #1a237e; margin-bottom: 12px;">Q${idx + 1}: ${q.question}</div>
      `;
    });
    
    html += `</div>`;
    
    // Page 1 of lined space
    html += `<div style="page-break-before: always;">`;
    for (let i = 0; i < 28; i++) {
      html += `<div class="task-lines-large"></div>`;
    }
    html += `</div>`;
    
    // Page 2 of lined space
    html += `<div style="page-break-before: always;">`;
    for (let i = 0; i < 28; i++) {
      html += `<div class="task-lines-large"></div>`;
    }
    html += `</div>`;
    
    html += `</div>`;
  }
});

html += `
</body>
</html>`;

// 4. Save the file
const outDir = path.join(__dirname, 'workbook_stash');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const outPath = path.join(outDir, `workbook_${kt.id}_v2.html`);
fs.writeFileSync(outPath, html, 'utf8');

console.log(`Successfully generated new ${kt.id} Workbook at: ` + outPath);
} // end for loop
