const fs = require('fs');
const path = require('path');

const dataContent = fs.readFileSync(path.join(__dirname, '../edexcel_medicine/data.js'), 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const jsonStr = dataContent.substring(startIndex, endIndex + 1);
const unitData = eval('(' + jsonStr + ')');

const dataParserSrc = fs.readFileSync(path.join(__dirname, '../src/data_parser.js'), 'utf8');
const dataParserCode = dataParserSrc.replace(/export /g, '');
eval(dataParserCode);

const examGuideSrc = fs.readFileSync(path.join(__dirname, '../src/exam_guide_content.js'), 'utf8');
const examGuideCode = examGuideSrc.replace(/export const /g, 'global.');
eval(examGuideCode);

unitData.lessons.forEach(lesson => {
  sanitizeLessonData(lesson);
});


const periods = [
  { name: 'medieval', title: 'Medieval (c1250-c1500)', filter: l => l.id.startsWith('lesson_1_'), image: 'medieval_pano_1784551792993.png', cover_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Illuminated_manuscript_showing_a_medical_consultation.jpg/500px-Illuminated_manuscript_showing_a_medical_consultation.jpg', cover_caption: 'A Medieval physician consulting a text while inspecting a patient.' },
  { name: 'renaissance', title: 'Renaissance (c1500-c1700)', filter: l => l.id.startsWith('lesson_2_'), image: 'renaissance_pano_1784551804068.png', cover_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Andreas_Vesalius_De_Humani_Corporis_Fabrica.jpg/500px-Andreas_Vesalius_De_Humani_Corporis_Fabrica.jpg', cover_caption: 'Andreas Vesalius, from his groundbreaking anatomical work, De Humani Corporis Fabrica (1543).' },
  { name: '18th_19th', title: '18th & 19th Century Medicine', filter: l => l.id.startsWith('lesson_3_'), image: 'industrial_pano_1784551813599.png', cover_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/John_Snow.jpg/500px-John_Snow.jpg', cover_caption: 'John Snow (1813–1858), the English physician who discovered the waterborne nature of cholera.' },
  { name: 'modern', title: 'Modern (c1900-present)', filter: l => l.id.startsWith('lesson_4_'), image: 'modern_pano_1784551822373.png', cover_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Alexander_Fleming.jpg/500px-Alexander_Fleming.jpg', cover_caption: 'Alexander Fleming (1881–1955), who discovered penicillin in 1928.' },
  { name: 'western_front', title: 'Western Front', filter: l => l.id.startsWith('lesson_5_'), image: 'western_front_pano_1784551831887.png', cover_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stretcher_bearers_at_Passchendaele_August_1917.jpg/500px-Stretcher_bearers_at_Passchendaele_August_1917.jpg', cover_caption: 'Stretcher bearers struggling through mud on the Western Front, 1917.' }
];


const htmlHead = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Printable Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 20mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 12pt; line-height: 1.6; color: #000; }
    h1 { font-family: 'Playfair Display', serif; font-size: 32pt; text-align: center; margin-top: 100px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 20pt; color: #1a237e; border-bottom: 2px solid #ccc; padding-bottom: 5px; page-break-before: always; page-break-after: avoid; }
    h3 { font-size: 14pt; color: #333; margin-top: 20px; page-break-after: avoid; }
    .narrative-block { margin-bottom: 15pt; text-align: justify; orphans: 3; widows: 3; }
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

periods.forEach(period => {
  let html = htmlHead;
  const periodLessons = unitData.lessons.filter(period.filter);
  if (periodLessons.length === 0) return;
  const periodTitle = period.title;
  const periodName = period.name;

  let trackerRows = '';
  periodLessons.forEach(l => {
    let maxScore = 5;
    if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
    trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;">Do Now: / ${maxScore}</td><td style="border:1px solid #333; padding:6px; width:60px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
    
    // Add Exam Questions to Tracker
    const addExamRow = (qText) => {
      let marksMatch = qText.match(/(\d+)\s*marks?/i);
      let marks = marksMatch ? marksMatch[1] : '?';
      let shortText = qText.split(' ').slice(0, 10).join(' ') + '...';
      shortText = shortText.replace(/<[^>]*>?/gm, ''); // remove html
      trackerRows += `<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Exam: ${shortText}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / ${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
    };

    if (l.extended && l.extended.question) addExamRow(l.extended.question);
    if (l.gcse_task && l.gcse_task.tasks) {
        l.gcse_task.tasks.forEach(t => addExamRow(t.text));
    }
  });

  if (unitData.assessments) {
    unitData.assessments.forEach(a => {
      trackerRows += `<tr><td style="border:1px solid #333; padding:4px;">${a.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; background:#eee;">N/A</td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>`;
    });
  }

  html += `
  <h3 style="text-align: center; color: #555; margin-top: 0; margin-bottom: 10px; font-size: 13pt; text-transform: uppercase; letter-spacing: 0.5px;">Edexcel GCSE History Paper 1: Medicine Through Time with the Western Front</h3>
  <div style="width: 100%; height: 220px; margin-top: 0px; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #1a237e;">
    <img src="../public/assets/banners/${period.image}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
      <h1 style="margin: 0 !important; font-size: 36pt; color: white; padding: 0;">${periodTitle}</h1>
      <p style="font-size:16pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif;">Student Workbook</p>
    </div>
  </div>
  
  <div style="display: flex; gap: 30px; margin: 25px 5% 0 5%; width: 90%; align-items: center;">
    
    <div style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; gap: 10px;">
      <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 3px; font-weight: 500; font-size: 11pt;">Name: </div>
        <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 3px; font-weight: 500; font-size: 11pt;">Class: </div>
      </div>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      ${Array.isArray(period.cover_image || unitData.cover_image) ? 
        `<div style="display: flex; gap: 10px; justify-content: center; align-items: center; height: 230px;">
          ${(period.cover_image || unitData.cover_image).map(img => `<img src="${img}" style="max-height: 100%; max-width: 32%; object-fit: contain; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="${periodTitle}">`).join('')}
        </div>`
        : 
        `<img src="${period.cover_image || unitData.cover_image || ''}" style="max-width: 100%; max-height: 230px; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="${periodTitle}">`
      }
      ${(period.cover_caption || unitData.cover_caption) ? `<p style="margin-top: 10px; font-style: italic; font-size: 10pt; color: #555; text-align: center;">${period.cover_caption || unitData.cover_caption}</p>` : ''}
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

  <div style="page-break-before: always; page-break-after: always; padding: 20px;">
    ${periodName === 'western_front' ? global.sectionAGuide : global.sectionBGuide}
  </div>
  `;

periodLessons.forEach((lesson, lessonIndex) => {
  let globalQNum = 1;
  if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
  if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
  if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
  if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
  if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); if (block.hinge_question) block.hinge_question.qNum = globalQNum++; });
  if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
  if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
  if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
  
  html += `<h2 style="margin-bottom: 20px;">${lesson.title.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</h2>`;

  if (lesson.hook_text) {
    html += `<p style="font-size: 11pt; font-style: italic; background: #eef2ff; padding: 15px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">${lesson.hook_text}</p>`;
  }

  if (lesson.fun_facts && lesson.fun_facts.length > 0) {
    html += `<div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 15px; margin-bottom: 20px; border-radius: 4px;">`;
    html += `<h4 style="margin: 0 0 5px 0; color: #b45309; font-size: 12pt;">Did you know?</h4>`;
    html += `<ul style="margin: 0; padding-left: 20px; font-size: 10.5pt; color: #92400e;">`;
    lesson.fun_facts.forEach(fact => {
      html += `<li style="margin-bottom: 5px;">${fact}</li>`;
    });
    html += `</ul></div>`;
  }

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

  // Render Sources
  if (lesson.sources && lesson.sources.length > 0) {
    lesson.sources.forEach(source => {
      if(source.src) {
        let src = source.src.startsWith('../') || source.src.startsWith('http') ? source.src : `..${source.src}`;
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
    html += `</div>`;
  }

  // Render Narrative Blocks & Tasks
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block, bIdx) => {
      html += `${block.image ? `<img src="..${block.image.startsWith('/assets') ? block.image : '/assets/' + block.image}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto; border-radius: 6px; border: 1px solid #ccc;">` : ''}`;
      
      let textToRender = block.text;
      const kiRegex = /\[Key Individual:\s*(.+)\]/ig;
      textToRender = textToRender.replace(kiRegex, (match, p1) => {
         const name = p1.trim();
         let person = null;
         if (unitData.biographies) {
             person = unitData.biographies.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
         }
         if (!person && unitData.key_individuals) {
             person = unitData.key_individuals.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
         }
         if (person) {
            return `</p><div style="border: 2px solid #3b82f6; padding: 15px; margin: 15px 0; background: #eff6ff; border-radius: 6px; page-break-inside: avoid;">
                      <h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 12pt;">Key Individual: ${person.name}</h4>
                      <p style="margin: 0; font-size: 11pt;">${person.bio || person.significance || ''}</p>
                    </div><p class="narrative-block">`;
         }
         return `<strong>Key Individual: ${name}</strong>`;
      });
      
      html += `<p class="narrative-block" id="para-${bIdx+1}">${textToRender}</p>`;
      
      if (block.hinge_question) {
        html += `<div class="task-box" style="background: #f8fafc; border: 2px dashed #94a3b8;">`;
        html += `<p style="margin-top:0px; margin-bottom: 10px; color: #475569; font-size: 0.9em; text-transform: uppercase;"><strong><i class="fa-solid fa-circle-check"></i> Knowledge Check (Q${block.hinge_question.qNum})</strong></p>`;
        html += `<p style="margin-bottom: 15px;"><strong>${block.hinge_question.text}</strong></p>`;
        html += `<ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">`;
        block.hinge_question.options.forEach((opt, idx) => {
          html += `<li style="margin-bottom: 8px;"><div style="display: inline-block; width: 16px; height: 16px; border: 1px solid #333; margin-right: 10px; border-radius: 3px; position: relative; top: 3px;"></div>${String.fromCharCode(65+idx)}. ${opt}</li>`;
        });
        html += `</ul></div>`;
      }
      
      if (block.tasks && block.tasks.length > 0) {
        html += `<div class="task-box">`;
        block.tasks.forEach(task => {
          if (task.type === 'draw') {
             html += `<div class="draw-task"><i class="fa-solid fa-pencil"></i> Q${task.qNum}: ${task.text || task.question}</div>`;
          } else {
             html += `<p style="margin-top:10px;"><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>`;
             html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
          }
        });
        html += `</div>`;
      }
    });
  }

  const formatBold = (text) => text ? text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : '';

  // Extended Scholarship
  if (lesson.extended && lesson.extended.paragraphs) {
    html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;
    lesson.extended.paragraphs.forEach(para => {
      html += `<p class="narrative-block" style="font-size: 11pt; color: #444;">${formatBold(para)}</p>`;
    });
  }

  // Narrative
  if (lesson.narrative) {
    lesson.narrative.forEach((block, idx) => {
      html += `<p class="narrative-block"><strong style="color:#000;">${idx + 1}.</strong> ${formatBold(block.text)}</p>`;
    });
  }

  // Pair Share
  if (lesson.pair_share) {
    html += `<div class="task-box" style="background: #f0fdfa; border: 2px solid #0d9488; page-break-inside: avoid;">`;
    html += `<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>`;
    html += `<p style="font-weight: bold; font-size: 11pt; margin-bottom: 5px;">Prompt: ${lesson.pair_share.prompt}</p>`;
    if (lesson.pair_share.think) html += `<p style="font-size: 10.5pt; font-style: italic; margin-top: 0;">Think: ${lesson.pair_share.think}</p>`;
    html += `<div style="margin-top: 15px;"><strong>Your Notes:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div></div>`;
    html += `</div>`;
  }

  // Historians Corner
  if (lesson.historians_corner) {
    html += `<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">`;
    html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
    html += `<p style="font-size: 11pt; font-style: italic;">${lesson.historians_corner.text}</p>`;
    html += `</div>`;
  }

  let hasExamTask = lesson.gcse_task || (lesson.extended && lesson.extended.question);
  if (hasExamTask) {
    html += `<div style="page-break-before: always;">`;
    html += `<h2 style="margin-top: 0;">GCSE Exam Practice</h2>`;

    const renderLines = (text) => {
        if (text.includes("16 marks")) {
            for(let i=0; i<42; i++) { // ~2 pages
                html += `<div class="task-lines-large"></div>`;
            }
        } else if (text.includes("12 marks") || text.includes("Explain why")) {
            for(let i=0; i<22; i++) { // ~1 page
                html += `<div class="task-lines-large"></div>`;
            }
        } else if (text.includes("8 marks")) {
            for(let i=0; i<14; i++) { // ~half page
                html += `<div class="task-lines-large"></div>`;
            }
        } else if (text.includes("4 marks") || text.includes("Explain one way")) {
            for(let i=0; i<8; i++) {
                html += `<div class="task-lines-large"></div>`;
            }
        } else {
            for(let i=0; i<8; i++) {
                html += `<div class="task-lines-large"></div>`;
            }
        }
    };

    if (lesson.extended && lesson.extended.question) {
        if (lesson.extended.source_a || lesson.extended.source_b) {
            html += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 20px; page-break-inside: avoid;">`;
            if (lesson.extended.source_a) {
              const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
              const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
              html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                  ${content.replace(/\n/g, '<br>')}
                </div>
              </div>`;
            }
            if (lesson.extended.source_b) {
              const prov = typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
              const content = typeof lesson.extended.source_b === 'string' ? lesson.extended.source_b : lesson.extended.source_b.content;
              html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                  ${content.replace(/\n/g, '<br>')}
                </div>
              </div>`;
            }
            html += `</div>`;
        }

        if (lesson.extended.provenance_clue) {
             html += `<div style="margin-top: 15px; margin-bottom: 15px; padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; page-break-inside: avoid;"><strong style="color: #1e3a8a;">Provenance Scaffolding:</strong><p style="margin: 5px 0 0 0; color: #1e40af; font-style: italic;">${formatBold(lesson.extended.provenance_clue)}</p></div>`;
        }

        html += `<div style="margin-top: 15px;"><strong>Q${lesson.extended.qNum}. ${formatBold(lesson.extended.question)}</strong></div>`;
        renderLines(lesson.extended.question);
        html += `<br>`;
    }

    if (lesson.gcse_task && lesson.gcse_task.tasks) {
      // It's the Section B style (Q3 and Q4)
      lesson.gcse_task.tasks.forEach(task => {
         html += `<div style="margin-top: 15px;"><strong>Q${task.qNum ? task.qNum + '.' : ''} ${task.text}</strong></div>`;
         renderLines(task.text);
         html += `<br>`;
      });
    } else if (lesson.gcse_task && lesson.gcse_task.sources) {
      // It's the Section A Cross-Source Analysis style
      html += `<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}?</p>`;
      
      let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 20px;">';
      
      lesson.gcse_task.sources.forEach(srcObj => {
        sourceHTML += '<div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">';
        if (srcObj.type === 'visual') {
          let imgSrc = srcObj.src.startsWith('../') ? srcObj.src : `..${srcObj.src}`;
          sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
        } else {
          sourceHTML += `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0; text-align: left;">${srcObj.text}</blockquote>`;
        }
        sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${srcObj.title}</p>`;
        sourceHTML += '</div>';
      });
      
      sourceHTML += '</div>';
      html += sourceHTML;

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

html += `</body></html>`;
fs.writeFileSync(path.join(__dirname, `workbook_${periodName}.html`), html);
console.log(`Workbook generated at edexcel_medicine/workbook_${periodName}.html`);

});

