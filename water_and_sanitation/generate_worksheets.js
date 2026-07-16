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
  unitData.lessons.forEach(l => {
    let maxScore = 5;
    if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
    trackerRows += `<tr><td style="border:1px solid #333; padding:4px;">${l.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / ${maxScore}</td><td style="border:1px solid #333; padding:4px; width:60px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>`;
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
      <img src="assets/roman_latrine.jpg" style="max-width: 100%; max-height: 230px; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Roman Communal Latrine">
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
  if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
  if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); });
  if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
  if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
  if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
  
  html += `<h2 style="margin-bottom: 20px;">${lesson.title}</h2>`;

  // Primary Source at the top
  if (lesson.primary_source) {
    let src = lesson.primary_source.src.startsWith('../') || lesson.primary_source.src.startsWith('http') ? lesson.primary_source.src : `../water_and_sanitation/${lesson.primary_source.src}`;
    html += `
      <div class="source-container" style="page-break-inside: avoid; margin-bottom: 30px;">
        ${lesson.primary_source.question ? `<h3 style="margin-top: 0;">Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}</h3>` : ''}
        ${lesson.primary_source.title ? `<strong>${lesson.primary_source.title}</strong><br>` : ''}
        <img src="${src}" alt="Primary Source" style="max-width: 100%; max-height: 250px; object-fit: contain; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
        ${lesson.primary_source.caption ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ''}
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

  // Render Narrative Blocks & Tasks
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block, bIdx) => {
      html += `<p class="narrative-block" id="para-${bIdx+1}">${block.text}</p>`;
      if (block.tasks && block.tasks.length > 0) {
        html += `<div class="task-box">`;
        block.tasks.forEach(task => {
          if (task.type === 'draw') {
             html += `<div class="draw-task"><i class="fa-solid fa-pencil"></i> Q${task.qNum}: ${task.text}</div>`;
          } else {
             html += `<p style="margin-top:10px;"><strong>Q${task.qNum}. ${task.text}</strong></p>`;
             html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
          }
        });
        html += `</div>`;
      }
    });
  }

  // Render Sources
  if (lesson.sources && lesson.sources.length > 0) {
    lesson.sources.forEach(source => {
      if(source.src) {
        let src = source.src.startsWith('../') || source.src.startsWith('http') ? source.src : `../water_and_sanitation/${source.src}`;
        html += `
          <div class="source-container" style="page-break-inside: avoid;">
            ${source.title ? `<strong>${source.title}</strong><br>` : ''}
            <img src="${src}" alt="Source">
            ${source.caption ? `<div class="source-caption">${source.caption}</div>` : ''}
          </div>
        `;
      }
    });
  }

  // Extended Scholarship
  if (lesson.extended && lesson.extended.paragraphs) {
    html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;
    lesson.extended.paragraphs.forEach(para => {
      html += `<p class="narrative-block" style="font-size: 11pt; color: #444;">${para}</p>`;
    });
    if (lesson.extended.question) {
      html += `<div style="margin-top: 20px;"><strong>Q${lesson.extended.qNum}. ${lesson.extended.question}</strong></div>`;
      html += `<div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>`;
    }

  // Historians Corner
  if (lesson.historians_corner) {
    html += `<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">`;
    html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
    html += `<p style="font-size: 11pt; font-style: italic;">${lesson.historians_corner.text}</p>`;
    html += `</div>`;
  }

  // GCSE Cross-Source Analysis
  if (lesson.gcse_task) {
    html += `<div style="page-break-before: always;">`;
    html += `<h2>GCSE Cross-Source Analysis</h2>`;
    html += `<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}?</p>`;
    
    let srcA = lesson.gcse_task.sources[0].src.startsWith('../') ? lesson.gcse_task.sources[0].src : `../water_and_sanitation/${lesson.gcse_task.sources[0].src}`;
    html += `
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          <img src="${srcA}" style="max-width: 100%; max-height: 250px;">
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${lesson.gcse_task.sources[0].title}</p>
        </div>
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
          <blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${lesson.gcse_task.sources[1].text}</blockquote>
          <p style="font-size: 10pt; font-weight: bold; margin: 0;">${lesson.gcse_task.sources[1].title}</p>
        </div>
      </div>
    `;

    html += `<h3 style="margin-top: 0;">Source Evaluation Notes</h3>`;
    html += `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: avoid;">
        <tr>
          <th style="border: 2px solid #000; padding: 8px; width: 10%;">Source</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">N.O.P. (Nature, Origin, Purpose)</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">Content (What it shows/says)</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">Contextual Knowledge</th>
        </tr>
        <tr>
          <td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">A</td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">B</td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
        </tr>
      </table>
    `;

    html += `<h3 style="margin-top: 0;">Final Written Evaluation</h3>`;
    for(let i=0; i<10; i++) {
      html += `<div class="task-lines-large"></div>`;
    }
    
    html += `</div>`;
  }

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
    }

    // Inject Discreet Grading Footer for the Assessment
    html += `
      <div style="margin-top: 30px;"></div>
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
}



// Append Quiz Pack
if (unitData.quizPack && unitData.quizPack.length > 0) {
  html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 24pt;">End of Unit Quiz Pack</h2>`;
  html += `<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> Answer the 50 quick-fire recall questions below. If you get stuck, the scrambled answers are provided in the Answer Bank on the final page.</p>`;
  
  html += `<div style="display: flex; flex-wrap: wrap; gap: 20px;">`;
  
  // Format into two columns roughly
  html += `<div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">`;
  unitData.quizPack.forEach((item, idx) => {
    html += `<div style="margin-bottom: 12px; break-inside: avoid;">`;
    html += `<div style="font-weight: 500; font-size: 10.5pt;">${idx + 1}. ${item.q}</div>`;
    html += `<div class="task-lines"></div>`;
    html += `</div>`;
  });
  html += `</div>`;
  html += `</div>`;

  // Answer Bank
  html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 20pt; text-align: center;">Quiz Pack Answer Bank</h2>`;
  html += `<div style="border: 2px solid #1a237e; padding: 20px; background: #f8f9fa; border-radius: 8px;">`;
  
  // Extract and scramble answers alphabetically
  let answers = unitData.quizPack.map(item => item.a).sort((a, b) => a.localeCompare(b));
  
  html += `<p style="text-align: center; font-size: 11pt; line-height: 1.8;">`;
  answers.forEach((ans, idx) => {
    html += `<strong>${ans}</strong>`;
    if (idx < answers.length - 1) html += ` &nbsp;&bull;&nbsp; `;
  });
  html += `</p>`;
  html += `</div>`;
}

html += `

<script src="/knowledge_bank.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    try {
      const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
      if (taught.length > 0 && window.KNOWLEDGE_BANK) {
        const doNows = document.querySelectorAll('.do-now-q');
        doNows.forEach(q => {
          if (q.textContent.includes('PAST TOPIC:')) {
            const unit = taught[Math.floor(Math.random() * taught.length)];
            const bank = window.KNOWLEDGE_BANK[unit];
            if (bank && bank.length > 0) {
              const randQ = bank[Math.floor(Math.random() * bank.length)];
              const strong = q.querySelector('strong');
              const prefix = strong ? strong.outerHTML + ' ' : '';
              q.innerHTML = prefix + 'PAST TOPIC: ' + randQ.question;
              
              // If answer key, update the next sibling
              const nextEl = q.nextElementSibling;
              if (nextEl && nextEl.style && nextEl.style.color === 'red') {
                nextEl.innerHTML = randQ.answer;
              }
            }
          }
        });
      }
    } catch (e) { console.error('Dynamic Do Now error:', e); }
  });
</script>
</body>

</html>`;

fs.writeFileSync(path.join(__dirname, 'workbook.html'), html);
console.log('Successfully generated workbook.html!');
