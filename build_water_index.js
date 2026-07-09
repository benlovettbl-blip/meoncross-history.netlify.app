const fs = require('fs');
const path = require('path');

const dataContent = fs.readFileSync(path.join(__dirname, 'water_and_sanitation', 'data.js'), 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unitData = JSON.parse(jsonContent);

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Digital Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- Screen-Only Navigation Header -->
  <header class="no-print-header" style="background: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 1rem 2rem; position: sticky; top: 0; z-index: 1000; box-shadow: var(--shadow-sm);">
    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div>
            <h1 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 0.5rem;">
              🚰 Water and Sanitation Through Time
            </h1>
            <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted); display: block; margin-top: 2px; font-family: var(--font-title);">
              Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?
            </span>
          </div>
        </div>
      </div>
      
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary no-print" onclick="document.body.classList.toggle('dyslexia-mode')" style="padding: 0.5rem 0.75rem;">
          <i class="fa-solid fa-glasses"></i> Dyslexia Font
        </button>
        <button class="btn btn-secondary no-print" onclick="window.printWorkbook()" style="padding: 0.5rem 0.75rem;">
          <i class="fa-solid fa-print"></i> Print Workbook
        </button>
      </div>
    </div>
  </header>

  <nav class="no-print-header tb-nav" id="workbookTabs" style="background: var(--bg-surface-alt); border-bottom: 1px solid var(--border-color); padding: 0 2rem;">
    <div style="display: flex; gap: 1.5rem; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; align-items: center;">
      <a href="../index.html" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; text-decoration: none; font-size: 0.82rem; font-family: var(--font-title); font-weight: 700; color: var(--text-main); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-color); background: rgba(79, 70, 229, 0.05); margin-right: 10px;">
        <i class="fa-solid fa-arrow-left"></i> Portal
      </a>
      <button class="tb-tab nav-tab active" data-tab="cover">📚 Cover & Plans</button>
      <button class="tb-tab nav-tab" data-tab="timeline">⏳ Timeline</button>
`;

unitData.lessons.forEach((lesson, i) => {
  html += `      <button class="tb-tab nav-tab" data-tab="lesson${i+1}">L${i+1}: ${lesson.title.split(':')[1].split('and')[0].trim()}</button>\n`;
});

html += `      <button class="tb-tab nav-tab" data-tab="assessment">📝 Assessment</button>
    </div>
  </nav>

  <div class="workbook-container" id="engine-workbook-container" style="position: relative; z-index: 1;">

    <!-- Cover Page -->
    <div class="page active" id="page-cover">
      <h1 style="margin-top: 50px; margin-bottom: 10px; font-family: var(--font-heading); text-align: center; color: var(--navy); font-size: 32pt;">${unitData.title}</h1>
      <p style="text-align:center; font-size:16pt; margin-top: 0; color: var(--text-muted);">Student Workbook</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <img src="../water_and_sanitation/assets/images/primary/roman_baths.jpg" style="max-width: 80%; border: 3px solid var(--navy); border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Roman Baths">
      </div>

      <div style="margin: 40px 10%; border: 2px solid var(--navy); background: #f8f9fa; padding: 20px; border-radius: 8px; box-shadow: 2px 2px 5px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; margin-bottom: 15px; color: var(--navy); text-align: center; font-family: var(--font-heading); font-size: 16pt;">Key Enquiry Questions</h3>
        <ul style="font-size: 12.5pt; font-weight: 500; color: #333; margin-bottom: 0;">
          ${unitData.lessons.map(l => '<li style="margin-bottom: 10px;">' + l.title + '</li>').join('')}
        </ul>
      </div>
      
      <div style="margin-top: 50px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt;">Name: </div>
      <div style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt;">Class: </div>
    </div>

    <!-- Timeline Page -->
    <div class="page" id="page-timeline">
      <h2 class="lesson-title">Chronological Big Picture</h2>
      <div class="page-content">
        <p class="narrative-col">Throughout history, the approach to water and sanitation in Britain has changed dramatically. Review the timeline below.</p>
        <div style="margin-top: 20px;">
          ${unitData.lessons[0].do_now && unitData.lessons[0].do_now.type === 'timeline' ? unitData.lessons[0].do_now.events.map(ev => '<p><strong>' + ev.year + ':</strong> ' + ev.title + ' - <em>' + ev.detail + '</em></p>').join('') : '<p>Timeline events go here.</p>'}
        </div>
      </div>
    </div>
`;

// Build Lessons
unitData.lessons.forEach((lesson, i) => {
  let lessonNum = i + 1;
  let qNum = 1;
  html += `
    <!-- Lesson ${lessonNum} -->
    <div class="page" id="page-lesson${lessonNum}">
      <div class="lesson-header-flex" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--navy); padding-bottom: 4px; margin-bottom: 12px;">
        <h2 class="lesson-title" style="margin: 0; border: none; padding: 0;">${lesson.title}</h2>
        <button class="btn btn-secondary btn-sm no-print speak-btn" onclick="window.readAloud('page-lesson${lessonNum}')" style="font-size: 8pt; padding: 4px 8px; cursor: pointer;"><i class="fa-solid fa-volume-high"></i> Listen</button>
      </div>
      <div class="page-content">
  `;

  // Primary Source
  if (lesson.primary_source) {
    let src = lesson.primary_source.src.startsWith('../') ? lesson.primary_source.src : '../water_and_sanitation/' + lesson.primary_source.src;
    html += `
        <div class="map-container" style="border: 1.5px solid var(--border-color); border-radius: 6px; padding: 10px; background-color: #faf9f6; margin-bottom: 15px; display: flex; flex-direction: column; align-items: center; width: 100%; box-sizing: border-box;">
          ${lesson.primary_source.title ? '<strong style="font-size: 9.5pt; color: var(--navy); margin-bottom: 6px; display: block; text-transform: uppercase; letter-spacing: 0.5px; align-self: flex-start;"><i class="fa-solid fa-image"></i> ' + lesson.primary_source.title + '</strong>' : ''}
          <img src="${src}" alt="Primary Source" style="max-height: 250px; object-fit: contain; border-radius: 4px; border: 1px solid var(--border-color);">
          ${lesson.primary_source.caption ? '<div style="font-size: 10.5pt; color: #475569; margin-top: 6px; text-align: center; width: 100%; font-style: italic;">' + lesson.primary_source.caption + '</div>' : ''}
          ${lesson.primary_source.question ? `
            <div style="align-self: flex-start; margin-top: 10px; width: 100%;">
              <strong>Question ${qNum++}:</strong> ${lesson.primary_source.question.replace('Enquiry: ', '')}
              <textarea class="student-answer-input" style="width:100%; height:40px; margin-top:5px; border-radius:4px; border:1px solid #ccc; padding:8px;"></textarea>
            </div>
          ` : ''}
        </div>
    `;
  }

  // Do Now
  if (lesson.do_now && lesson.do_now.type === "questions") {
    html += `
        <h4 class="task-heading" style="margin-top: 0;"><i class="fa-solid fa-brain"></i> DO NOW RETRIEVAL TASK</h4>
        <div class="do-now-grid" id="doNowGrid${lessonNum}">
    `;
    lesson.do_now.items.forEach(item => {
      html += `
          <div class="do-now-cell">
            <span><strong>Q${qNum++}:</strong> ${item.question.replace(/^\d+\.\s*/, '')}</span>
            <div class="do-now-answer">${item.answer}</div>
          </div>
      `;
    });
    html += `
        </div>
        <div class="no-print" style="margin-top: 8px; text-align: right; margin-bottom: 20px;">
          <button class="btn btn-secondary btn-sm" onclick="toggleDoNow(${lessonNum})" style="font-size: 8pt; padding: 4px 8px;"><i class="fa-solid fa-eye"></i> Reveal Do Now Answers</button>
        </div>
    `;
  }

  // Two Column Layout
  html += `
        <div style="display: flex; gap: 20px; margin-top: 20px;">
          <div style="flex: 1;">
  `;
  
  // Narrative
  if (lesson.narrative) {
    let pCounter = 1;
    lesson.narrative.forEach(para => {
      if (para.startsWith('"')) {
        html += `<p class="narrative-col" style="font-style: italic; background-color: var(--light-gray); padding: 8px; border: 1.2px solid var(--border-color); border-radius: 4px; margin-bottom: 8px;">${para.replace(/"/g, '')}</p>`;
      } else {
        html += `<p class="narrative-col" id="para-${lessonNum}-${pCounter++}">${para}</p>`;
      }
    });
  }

  // Glossary
  if (lesson.glossary) {
    html += `
      <div class="vocab-container" style="margin-top: 15px;">
        <h4 class="task-heading" style="margin-top: 0; font-size: 11pt; border-bottom: 1px solid var(--gold); padding-bottom: 4px;"><i class="fa-solid fa-book"></i> Core Vocabulary</h4>
        <div class="vocab-grid" style="font-size: 9pt;">
    `;
    Object.entries(lesson.glossary).forEach(([term, definition]) => {
      html += `<div class="vocab-item"><strong>${term}:</strong> ${definition}</div>`;
    });
    html += `
        </div>
      </div>
    `;
  }

  html += `
          </div>
          <div style="flex: 1;">
  `;

  // Tasks
  if (lesson.tasks) {
    lesson.tasks.forEach(task => {
      if (task.type === 'draw') {
        html += `<div class="task-box" style="margin-bottom: 15px; padding: 10px; background: #e8eaf6; border: 1px solid var(--navy); border-radius: 4px;"><strong>Q${qNum++}:</strong> ${task.text}</div>`;
      } else {
        html += `
            <div class="task-box" style="margin-bottom: 15px;">
              <strong class="task-question">Q${qNum++}: ${task.text.replace(/^(Q\d+: |Task \d+: |Question \d+[a-z]?: |Enquiry Task: )/, '')}</strong>
              <textarea class="student-answer-input" style="width:100%; height:80px; margin-top:5px; border-radius:4px; border:1px solid #ccc; padding:8px;"></textarea>
            </div>
        `;
      }
    });
  }

  // Extended
  if (lesson.extended) {
    html += `
      <div style="margin-top: 20px; padding: 15px; border: 2px dashed #9ca3af; border-radius: 8px; background: #f9fafb;">
        <h4 style="margin-top: 0; color: #4b5563;"><i class="fa-solid fa-graduation-cap"></i> Extended Scholarship</h4>
    `;
    if (lesson.extended.paragraphs) {
      lesson.extended.paragraphs.forEach(para => {
        html += `<p style="font-size: 9pt;">${para}</p>`;
      });
    }
    if (lesson.extended.question) {
      html += `
        <strong class="task-question">Q${qNum++}: ${lesson.extended.question}</strong>
        <textarea class="student-answer-input" style="width:100%; height:60px; margin-top:5px; border-radius:4px; border:1px solid #ccc; padding:8px;"></textarea>
      `
    }
    html += `</div>`;
  }

  html += `
          </div>
        </div>
  `;

  // GCSE Task
  if (lesson.gcse_task) {
    html += `
        <div class="tasks-section" style="margin-top: 40px; background: #e3f2fd; border: 2px solid #90caf9; border-radius: 8px; padding: 20px;">
          <h3 style="color: #1565c0; margin-top: 0; border-bottom: 2px solid #bbdefb; padding-bottom: 10px;"><i class="fa-solid fa-scale-balanced"></i> GCSE Analysis</h3>
          <p style="font-weight: bold; font-size: 1.1rem; color: #0d47a1;">${lesson.gcse_task.question}</p>
          <textarea class="student-answer-input" style="width: 100%; height: 150px; margin-top: 10px; padding: 10px; border: 1px solid #90caf9; border-radius: 6px; font-family: inherit; resize: vertical;" placeholder="Write your full evaluation here..."></textarea>
        </div>
    `;
  }

  html += `
      </div>
    </div>
  `;
});

// Assessment Page
html += `
    <div class="page" id="page-assessment">
      <h2 class="lesson-title">Unit Assessment</h2>
      <div class="page-content">
        <p class="narrative-col">Prepare for your final assessment using the flashcards and practice tasks from previous lessons.</p>
        <div style="margin-top: 20px; text-align: center;">
          <button class="btn btn-primary" onclick="window.location.href='../index.html'"><i class="fa-solid fa-gamepad"></i> Go to Taboo Recall Quiz Bank</button>
        </div>
      </div>
    </div>
`;

html += `
  </div>
  
  <script src="app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'water_and_sanitation', 'index.html'), html);
console.log("Successfully built water_and_sanitation/index.html");
