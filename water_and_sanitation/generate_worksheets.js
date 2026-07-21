const fs = require('fs');
const path = require('path');

const dataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unitData = JSON.parse(jsonContent);

const dataParserSrc = fs.readFileSync(path.join(__dirname, '../src/data_parser.js'), 'utf8');
const dataParserCode = dataParserSrc.replace(/export /g, '');
eval(dataParserCode);

unitData.lessons.forEach(lesson => {
  sanitizeLessonData(lesson);
});

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Printable Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 20mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 12pt; line-height: 1.6; color: #000; }
    h1 { font-family: 'Playfair Display', serif; font-size: 32pt; text-align: center; margin-top: 100px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 20pt; color: #1a237e; border-bottom: 2px solid #ccc; padding-bottom: 5px; page-break-before: always; }
    h3 { font-size: 14pt; color: #333; margin-top: 20px; }
    .narrative-block { margin-bottom: 15pt; text-align: justify; }
    .task-box { border: 2px solid #333; padding: 15px; margin-top: 20px; background: #fafafa; page-break-inside: avoid; }
    .task-lines { border-bottom: 1px solid #ccc; height: 30px; margin-top: 10px; }
    .task-lines-large { border-bottom: 1px solid #ccc; height: 45px; margin-top: 10px; }
    .source-container { text-align: center; margin: 20px 0; }
    .source-container img { max-width: 100%; max-height: 350px; border: 1px solid #000; }
    .source-caption { font-size: 10pt; font-style: italic; margin-top: 5px; }
    .do-now-box { border: 2px solid #1a237e; padding: 15px; margin-bottom: 30px; background: #f8f9fa; page-break-inside: avoid; }
    .do-now-q { margin-top: 15px; font-weight: 500; font-size: 11pt; }
    .draw-task { background: #e8eaf6; padding: 10px; margin-top: 10px; font-weight: bold; text-align: center; border-radius: 5px; border: 1px solid #1a237e; page-break-inside: avoid; }
    .grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc; page-break-inside: avoid; }
    .grading-boxes { display: flex; justify-content: space-between; }
    .grade-box { display: flex; align-items: center; gap: 5px; }
    .grade-box input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border: 1px solid #777; border-radius: 2px; background: #fff; }
    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
  </style>
</head>
<body>
`;

  let trackerRows = '';
  periodLessons.forEach(l => {
    let maxScore = 5;
    if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
    trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;">Do Now: / ${maxScore}</td><td style="border:1px solid #333; padding:6px; width:60px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
    
    const addExamRow = (qText) => {
      if (!qText) return;
      let marksMatch = qText.match(/\((\d+)\s*marks?\)/i);
      let marks = marksMatch ? marksMatch[1] : '?';
      let shortText = qText.split(' ').slice(0, 10).join(' ') + '...';
      shortText = shortText.replace(/<[^>]*>?/gm, '');
      trackerRows += `<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Exam: ${shortText}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / ${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
    };
    if (l.extended && l.extended.question) addExamRow(l.extended.question);
    if (l.gcse_task && l.gcse_task.tasks) l.gcse_task.tasks.forEach(t => addExamRow(t.text));
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(block => {
            if (block.tasks) block.tasks.forEach(t => {
                let txt = t.text || t.question || '';
                if (txt.includes('marks)')) addExamRow(txt);
            });
        });
    }
    if (l.tasks) {
        l.tasks.forEach(t => {
            let txt = t.text || t.question || '';
            if (txt.includes('marks)')) addExamRow(txt);
        });
    }
  });
  if (unitData.assessments) {
    unitData.assessments.forEach(a => {
      trackerRows += `<tr><td style="border:1px solid #333; padding:4px;">${a.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; background:#eee;">N/A</td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>`;
    });
  }

  html += `
  <h1 style="margin-top: 20px; margin-bottom: 5px; font-size: 28pt;">${unitData.title}</h1>
  <p style="text-align:center; font-size:14pt; margin-top: 0; margin-bottom: 15px;">Student Workbook</p>
  
  <!-- Top Section: Name, Class, Guide and Image -->
  <div style="display: flex; gap: 30px; margin: 0 5%; width: 90%; align-items: stretch;">
    
    <div style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; gap: 10px;">
        <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 3px; font-weight: 500; font-size: 11pt;">Name: </div>
        <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 3px; font-weight: 500; font-size: 11pt;">Class: </div>
      </div>
      
      <div style="border: 2px solid #1a237e; background: #f8f9fa; padding: 12px; border-radius: 6px; font-size: 9.5pt;">
        <h3 style="margin-top: 0; margin-bottom: 10px; color: #1a237e; text-align: center; font-size: 11pt;">Assessment Levels Guide</h3>
        <ul style="margin: 0; padding-left: 15px; color: #333; line-height: 1.4;">
          <li style="margin-bottom: 4px;"><strong>Emerging (1-2):</strong> Basic understanding of key events.</li>
          <li style="margin-bottom: 4px;"><strong>Emerging+ (3):</strong> Describes events with some historical details.</li>
          <li style="margin-bottom: 4px;"><strong>Expected (4-5):</strong> Explains causes, consequences, and significance clearly.</li>
          <li style="margin-bottom: 4px;"><strong>Expected+ (6-7):</strong> Analyzes context and links different factors.</li>
          <li><strong>Greater Depth (8-9):</strong> Highly detailed, analytical, and evaluates complex changes.</li>
        </ul>
      </div>
    </div>

    <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
      <img src="..${unitData.cover_image}" style="max-width: 100%; max-height: 230px; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Roman Communal Latrine">
    </div>

  </div>

  <!-- Bottom Section: Tracker Table -->
  <div style="margin: 25px 5% 0 5%; width: 90%;">
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 9.5pt;">
      <thead>
        <tr style="background: #1a237e; color: white;">
          <th style="border: 1px solid #333; padding: 6px; width: 35%;">Progress & Assessment Tracker</th>
          <th style="border: 1px solid #333; padding: 6px; width: 12%; text-align: center;">Do Now</th>
          <th style="border: 1px solid #333; padding: 6px; width: 13%; text-align: center;">Level</th>
          <th style="border: 1px solid #333; padding: 6px; width: 40%;">Teacher Comment</th>
        </tr>
      </thead>
      <tbody>
        ${trackerRows}
        <tr style="background: #e8eaf6; font-weight: bold;">
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">Final Unit Grade:</td>
          <td style="border: 1px solid #333; padding: 8px; background:#eee;"></td>
          <td style="border: 1px solid #333; padding: 8px;"></td>
          <td style="border: 1px solid #333; padding: 8px;"></td>
        </tr>
      </tbody>
    </table>
  </div>

  
  `;


  

unitData.lessons.forEach((lesson, lessonIndex) => {
  let globalQNum = 1;
  if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
  if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
  if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
  if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
  if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); if (block.hinge_question) block.hinge_question.qNum = globalQNum++; });
  if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
  if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
  if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
  
  html += `<h2 style="margin-bottom: 20px;">Lesson ${lessonIndex + 1}: ${lesson.title}</h2>`;

  // Primary Source at the top
  if (lesson.primary_source) {
    let src = lesson.primary_source.src.startsWith('../') || lesson.primary_source.src.startsWith('http') ? lesson.primary_source.src : `..${lesson.primary_source.src}`;
    html += `
      <div class="source-container" style="page-break-inside: avoid; margin-bottom: 30px;">
        ${lesson.primary_source.question ? `<h3 style="margin-top: 0;">Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}</h3>` : ''}
        ${lesson.primary_source.title ? `<strong>${lesson.primary_source.title}</strong><br>` : ''}
        <img src="${src}" alt="Primary Source" style="max-width: 100%; max-height: 250px; object-fit: contain; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
        ${lesson.primary_source.caption ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ''}
        ${lesson.primary_source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>` : ''}
      </div>
    `;
  }

  // Render Do Now
  if (lesson.do_now) {
        if (lesson.do_now.type === "timeline") {
      html += `<div class="do-now-box">
                 <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px;">
                   <h3 style="margin: 0;">Chronological Domino Flowchart</h3>
                   <div style="border: 2px solid #333; padding: 5px 15px; font-weight: bold; font-size: 11pt; border-radius: 4px; background: #fff;">Score: &nbsp;&nbsp;&nbsp;&nbsp; / 5</div>
                 </div>
                 <p style="font-style: italic; color: #555; margin-top: 0;"><strong>Task:</strong> The historical events below are out of order. Read them carefully, then use your pen to <strong>draw arrows connecting the boxes</strong> in the correct chronological and causal order (Event A ➔ Event B ➔ Event C...).</p>
                 <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 20px;">`;
                 
      // Shuffle the events
      let shuffledEvents = [...lesson.do_now.events];
      shuffledEvents.sort(() => Math.random() - 0.5);
      
      shuffledEvents.forEach((ev, idx) => {
        // Create scattered boxes by adding random margins and a solid border
        const margins = ["margin-top: 10px;", "margin-top: 30px;", "margin-bottom: 20px;", "margin-top: 0px;"];
        const m = margins[idx % margins.length];
        html += `<div style="width: 45%; border: 2px solid #333; padding: 10px; box-sizing: border-box; background: #fff; ${m} box-shadow: 2px 2px 0px #aaa;">
                    <strong>${ev.year}</strong><br>
                    <strong>${ev.title}</strong><br>
                    <span style="font-size: 10pt;">${ev.detail}</span>
                 </div>`;
      });
      html += `</div><div style="clear: both; margin-bottom: 20px;"></div>`;

      if (lesson.do_now.prediction_question) {
        html += `<div class="do-now-q" style="margin-top: 20px;"><strong>1. ${lesson.do_now.prediction_question}</strong></div>`;
        html += `<div class="task-lines"></div>`;
      }
      html += `</div>`;
    } else if (lesson.do_now.type === "questions" || lesson.do_now.type === "retrieval" || (!lesson.do_now.type && lesson.do_now.items)) {
      let maxScore = lesson.do_now.items ? lesson.do_now.items.length : 5;
      html += `<div class="do-now-box">
                 <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px;">
                   <h3 style="margin: 0;">Do Now Activity</h3>
                   <div style="border: 2px solid #333; padding: 5px 15px; font-weight: bold; font-size: 11pt; border-radius: 4px; background: #fff;">Score: &nbsp;&nbsp;&nbsp;&nbsp; / ${maxScore}</div>
                 </div>`;
      lesson.do_now.items.forEach((item, index) => {
        html += `<div class="do-now-q"><strong>${index + 1}.</strong> ${item.question}</div>`;
        html += `<div class="task-lines"></div>`;
      });
      html += `</div>`;
    }
  }

  // Render Vocabulary Task
  if (lesson.vocab && lesson.vocab.length > 0) {
    let vocabStyle = lessonIndex % 3;
    html += `<div class="task-box" style="margin-bottom: 20px;">`;
    html += `<h3 style="margin-top: 0;">Vocabulary Check</h3>`;
    
    if (vocabStyle === 0) {
      // Contextual Cloze
      html += `<p style="font-weight: bold;">Style: Contextual Cloze</p>`;
      html += `<p style="font-style: italic;">Fill in the blanks using the vocabulary words below.</p>`;
      let words = lesson.vocab.map(v => v.term).join(' &nbsp;|&nbsp; ');
      html += `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; text-align: center; font-weight: bold;">${words}</div>`;
      if (lesson.vocab_cloze_text) {
         let cloze = lesson.vocab_cloze_text.replace(/\[.*?\]/g, '__________________');
         html += `<p style="line-height: 2; font-size: 11pt;">${cloze}</p>`;
      } else {
         html += `<p>_________________________________________________________</p>`;
         html += `<p>_________________________________________________________</p>`;
      }
    } else if (vocabStyle === 1) {
      // Vocabulary Mapping
      html += `<p style="font-weight: bold;">Style: Vocabulary Mapping</p>`;
      html += `<p style="font-style: italic;">Write a historically accurate sentence connecting two terms from the glossary box below.</p>`;
      let words = lesson.vocab.map(v => v.term).join(' &nbsp;|&nbsp; ');
      html += `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; text-align: center; font-weight: bold;">${words}</div>`;
      html += `<strong>Your Sentence:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div>`;
    } else if (vocabStyle === 2) {
      // Mini-Frayer Model
      html += `<p style="font-weight: bold;">Style: Mini-Frayer Model</p>`;
      let focusWord = lesson.vocab[0].term;
      html += `<p style="font-style: italic;">Complete the Frayer Model for the term: <strong>${focusWord}</strong></p>`;
      html += `
        <table style="width: 100%; border-collapse: collapse; text-align: center;">
          <tr>
            <td style="border: 2px solid #333; width: 50%; height: 100px; vertical-align: top; padding: 5px;"><strong>Definition</strong></td>
            <td style="border: 2px solid #333; width: 50%; height: 100px; vertical-align: top; padding: 5px;"><strong>Historical Example</strong></td>
          </tr>
          <tr>
            <td style="border: 2px solid #333; width: 50%; height: 100px; vertical-align: top; padding: 5px;"><strong>Non-Example / Sketch</strong></td>
            <td style="border: 2px solid #333; width: 50%; height: 100px; vertical-align: top; padding: 5px;"><strong>Your own sentence</strong></td>
          </tr>
        </table>
      `;
    }
    if (extractedExamTasks.length > 0) {
      extractedExamTasks.forEach(task => {
         let text = task.text || task.question || '';
         html += `<div style="margin-top: 30px;"><strong>Q${task.qNum ? task.qNum + '.' : ''} ${text}</strong></div>`;
         let lines = 8;
         if (text.includes("16 marks")) lines = 42;
         else if (text.includes("12 marks") || text.includes("Explain why")) lines = 22;
         else if (text.includes("8 marks")) lines = 12;
         for(let i=0; i<lines; i++) {
             html += `<div class="task-lines-large"></div>`;
         }
      });
    }
    
    html += `</div>`;
  }


  // Inject Discreet Grading Footer for the Lesson
  html += `
    <div style="margin-top: 20px;"></div>
    <div class="grading-footer">
      <div class="grading-boxes">
        <label class="grade-box"><input type="checkbox"> Emerging (1-2)</label>
        <label class="grade-box"><input type="checkbox"> Emerging+ (3)</label>
        <label class="grade-box"><input type="checkbox"> Expected (4-5)</label>
        <label class="grade-box"><input type="checkbox"> Expected+ (6-7)</label>
        <label class="grade-box"><input type="checkbox"> Greater Depth (8-9)</label>
      </div>
      <div>
        Teacher Comment: <span class="teacher-comment"></span>
      </div>
    </div>
  `;

});

// Render Assessments
if (unitData.assessments && unitData.assessments.length > 0) {
  unitData.assessments.forEach((assessment, idx) => {
    html += `<h2 style="margin-bottom: 20px; page-break-before: always;">${assessment.title}</h2>`;
    html += `<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> ${assessment.description}</p>`;
    
    if (assessment.type === 'timeline') {
      html += `<div style="height: 600px; border: 2px dashed #999; border-radius: 8px; position: relative; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; background: #fafafa;">`;
      html += `<div style="width: 90%; border-top: 3px solid #333; position: absolute; top: 50%;"></div>`;
      html += `<span style="position: absolute; bottom: 10px; right: 10px; font-style: italic; color: #666;">Timeline Workspace</span>`;
      html += `</div>`;
    } else if (assessment.type === 'diamond9') {
      html += `<div style="display: flex; gap: 20px; margin-bottom: 20px;">`;
      html += `<div style="flex: 1; border: 2px dashed #999; border-radius: 8px; padding: 15px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px;">`;
      html += `<span style="font-style: italic; color: #666; margin-bottom: 10px;">Diamond 9 Workspace</span>`;
      
      // Draw a small diamond template
      html += `<div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">`;
      html += `<div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div>`;
      html += `<div style="display: flex; gap: 5px;"><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div></div>`;
      html += `<div style="display: flex; gap: 5px;"><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div></div>`;
      html += `<div style="display: flex; gap: 5px;"><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div><div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div></div>`;
      html += `<div style="width: 40px; height: 25px; border: 1px solid #ccc; background: white;"></div>`;
      html += `</div>`;
      html += `</div>`;
      
      html += `<div style="flex: 1;">`;
      html += `<strong>Factors to sort:</strong>`;
      html += `<ul style="font-size: 10pt; line-height: 1.4; padding-left: 20px; margin-top: 5px;">`;
      assessment.factors.forEach(f => {
        html += `<li>${f}</li>`;
      });
      html += `</ul>`;
      html += `</div>`;
      html += `</div>`;
      
      html += `<strong>Top Choice Justification:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>`;
      html += `<strong style="display: block; margin-top: 15px;">Bottom Choice Justification:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>`;
    } else if (assessment.type === 'essay') {
      html += `<h3 style="margin-top: 0; text-align: center;">Town Council Public Health Report</h3>`;
      for(let i=0; i<15; i++) {
        html += `<div class="task-lines-large"></div>`;
      }
    } else if (assessment.type === 'source_utility') {
      html += `<div style="display: flex; gap: 20px; margin-bottom: 20px;">`;
      assessment.sources.forEach(source => {
        html += `<div style="flex: 1; border: 1px solid #333; padding: 15px; background: #fafafa;">`;
        html += `<strong style="font-size: 13pt;">${source.id}</strong>`;
        html += `<p style="font-size: 11pt; font-style: italic; margin-top: 5px; margin-bottom: 15px;">${source.provenance}</p>`;
        html += `<p style="font-size: 11pt; line-height: 1.5;">${source.text}</p>`;
        html += `</div>`;
      });
      html += `</div>`;
      let isSingle = assessment.sources && assessment.sources.length === 1;
      let numMarks = isSingle ? "4" : "8";
      let numLines = isSingle ? 8 : 16;
      html += `<p style="font-style: italic; color: #555;">Use the writing lines below to answer the ${numMarks}-mark question. Remember to analyze the content, provenance, and apply your contextual knowledge.</p>`;
      for(let i=0; i<numLines; i++) {
        html += `<div class="task-lines-large"></div>`;
      }
    }

    