const fs = require('fs');
const path = require('path');

const dataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unitData = JSON.parse(jsonContent);

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
    .task-box { border: 2px solid #333; padding: 15px; margin-top: 20px; background: #fafafa; }
    .task-lines { border-bottom: 1px solid #ccc; height: 30px; margin-top: 10px; }
    .task-lines-large { border-bottom: 1px solid #ccc; height: 45px; margin-top: 10px; }
    .source-container { text-align: center; margin: 20px 0; }
    .source-container img { max-width: 100%; max-height: 350px; border: 1px solid #000; }
    .source-caption { font-size: 10pt; font-style: italic; margin-top: 5px; }
    .do-now-box { border: 2px solid #1a237e; padding: 15px; margin-bottom: 30px; background: #f8f9fa; }
    .do-now-q { margin-top: 15px; font-weight: 500; }
    .draw-task { background: #e8eaf6; padding: 10px; margin-top: 10px; font-weight: bold; text-align: center; border-radius: 5px; border: 1px solid #1a237e; }
  </style>
</head>
<body>
`;

  let coverList = unitData.lessons.map((l, i) => `<li style="margin-bottom: 10px;">${l.title}</li>`).join('');

  html += `
  <h1 style="margin-top: 50px; margin-bottom: 10px;">${unitData.title}</h1>
  <p style="text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;">Teacher Answer Key</p>
  
  ${unitData.cover_image ? `
  <div style="text-align: center; margin: 30px 0;">
    <img src="${unitData.cover_image}" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    ${unitData.cover_caption ? `<div style="font-size: 10pt; font-style: italic; margin-top: 8px;">${unitData.cover_caption}</div>` : ''}
  </div>` : ''}

  <div style="margin: 40px 10%; border: 2px solid #1a237e; background: #f8f9fa; padding: 20px; border-radius: 8px; box-shadow: 2px 2px 5px rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; margin-bottom: 15px; color: #1a237e; text-align: center; font-family: 'Playfair Display', serif; font-size: 16pt;">Key Enquiry Questions</h3>
    <ul style="font-size: 12.5pt; font-weight: 500; color: #333; margin-bottom: 0;">
      ${coverList}
    </ul>
  </div>

  <div style="margin-top: 50px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt;">Name: </div>
  <div style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt;">Class: </div>
  <div style="page-break-after: always;"></div>
  `;


  

unitData.lessons.forEach((lesson, lessonIndex) => {
  
  html += `<h2 style="margin-bottom: 20px;">${lesson.title}</h2>`;

  // Primary Source at the top
  if (lesson.primary_source) {
    let src = lesson.primary_source.src.startsWith('../') || lesson.primary_source.src.startsWith('http') ? lesson.primary_source.src : `../cme_new/${lesson.primary_source.src}`;
    html += `
      <div class="source-container" style="page-break-inside: avoid; margin-bottom: 30px;">
        ${lesson.primary_source.question ? `<h3 style="margin-top: 0;">Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}</h3>` : ''}
        ${lesson.primary_source.title ? `<strong>${lesson.primary_source.title}</strong><br>` : ''}
        <img src="${src}" alt="Primary Source">
        ${lesson.primary_source.caption ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ''}
      </div>
    `;
  }

  // Render Do Now
  if (lesson.do_now) {
    if (lesson.do_now.type === "timeline") {
      // Don't render interactive timeline on PDF, or maybe just list the events?
      html += `<div class="do-now-box"><h3>Chronological Big Picture</h3>`;
      lesson.do_now.events.forEach(ev => {
        html += `<p><strong>${ev.year}:</strong> ${ev.title} - <em>${ev.detail}</em></p>`;
      });
      if (lesson.do_now.prediction_question) {
        html += `<div class="do-now-q"><strong>Q${lesson.do_now.qNum}. ${lesson.do_now.prediction_question.replace('Predict: ', '').replace(/\s*\((P|Para\s*)\d+\)/gi, '')}</strong></div>`;
        html += `<div class="task-lines-large"></div><div class="task-lines-large"></div>`;
      }
      html += `</div>`;
    } else if (lesson.do_now.type === "questions") {
      html += `<div class="do-now-box"><h3>Do Now Activity</h3>`;
      lesson.do_now.items.forEach((item, index) => {
        html += `<div class="do-now-q"><strong>Q${item.qNum}.</strong> ${item.question.replace(/^\d+\.\s*/, '')}</div>`;
        html += `<div class="task-lines-large"></div>`;
      });
      html += `</div>`;
    }
  }


  // Render Vocab Pre-Teach Task (Rotated)
  if (lesson.vocab && lesson.vocab.length > 0) {
    const vocabStyle = lessonIndex % 3; 
    
    html += `<div class="task-box"><h3>Vocabulary Focus</h3>`;
    
    if (vocabStyle === 0) {
      // Contextual Cloze
      html += `<p><strong>Task:</strong> Fill in the blanks in the summary below using the correct words from the word bank.</p>`;
      const words = lesson.vocab.map(v => v.term).join(' &nbsp; | &nbsp; ');
      html += `<div style="border: 1px dashed #666; padding: 10px; text-align: center; font-weight: bold; margin-bottom: 15px; background: #fff;">Word Bank: ${words}</div>`;
      let clozeHtml = lesson.vocab_cloze_text || "";
      clozeHtml = clozeHtml.replace(/\[.*?\]/g, '______________________');
      html += `<p style="line-height: 2.5; font-size: 13pt;">${clozeHtml}</p>`;
    } else if (vocabStyle === 1) {
      // Vocabulary Mapping
      html += `<p><strong>Task:</strong> Read the key terms and their definitions. Choose <strong>two</strong> terms and write a single, historically accurate sentence that connects them.</p>`;
      html += `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; background: #fff;">`;
      lesson.vocab.forEach(v => {
        html += `<div style="margin-bottom: 5px;"><strong>${v.term}:</strong> ${v.definition}</div>`;
      });
      html += `</div>`;
      html += `<div class="task-lines"></div><div class="task-lines"></div>`;
    } else if (vocabStyle === 2) {
      // Mini-Frayer Model
      html += `<p><strong>Task:</strong> Complete the Frayer Models for the key concepts below. Write the definition, one historical example, and one non-example (or a sketch).</p>`;
      const wordsToFrayer = lesson.vocab.slice(0, 2);
      wordsToFrayer.forEach(v => {
        html += `<div style="margin-top: 15px;"><strong>Concept: ${v.term}</strong></div>`;
        html += `
          <table style="width: 100%; border-collapse: collapse; margin-top: 5px; background: #fff;">
            <tr>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Definition:</strong><br><span style="color:#666; font-size:10pt;">${v.definition}</span></td>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Historical Example:</strong></td>
            </tr>
            <tr>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Characteristics:</strong></td>
              <td style="border: 2px solid #000; width: 50%; height: 80px; padding: 8px; vertical-align: top;"><strong>Non-example / Sketch:</strong></td>
            </tr>
          </table>
        `;
      });
    }
    html += `</div>`;
  }

  // Render Narrative
  if (lesson.narrative) {
    let pCounter = 1;
      lesson.narrative.forEach(para => {
      if (para.startsWith('"')) {
        html += `<div style="font-weight: bold; margin: 15px 0; font-size: 13pt;">${para.replace(/"/g, '')}</div>`;
      } else {
        html += `<p class="narrative-block" id="para-${pCounter}">${para}</p>`; pCounter++;
      }
    });
  }

  // Identify Draw Tasks
  const drawTasks = lesson.tasks ? lesson.tasks.filter(t => t.type === 'draw') : [];
  const writtenTasks = lesson.tasks ? lesson.tasks.filter(t => t.type !== 'draw') : [];

  // Render Sources and append Draw Tasks immediately beneath them
  if (lesson.sources && lesson.sources.length > 0) {
    lesson.sources.forEach(source => {
      if(source.src) {
        let src = source.src.startsWith('../') || source.src.startsWith('http') ? source.src : `../cme_new/${source.src}`;
        html += `
          <div class="source-container" style="page-break-inside: avoid;">
            ${source.title ? `<strong>${source.title}</strong><br>` : ''}
            <img src="${src}" alt="Source">
            ${source.caption ? `<div class="source-caption">${source.caption}</div>` : ''}
          </div>
        `;
      }
    });
    
    // Append draw tasks right after the sources block
    if (drawTasks.length > 0) {
      drawTasks.forEach(task => {
        html += `<div class="draw-task"><i class="fa-solid fa-pencil"></i> Source Task: ${task.text.replace(/^(Q\d+: |Task \d+: |Question \d+[a-z]?: |Enquiry Task: |Q\d+\.\s*)/i, '').replace(/\s*\((P|Para\s*)\d+\)/gi, '').replace(/\s*\(Ext P\d+(-\d+)?\)/gi, '')}</div>`;
      });
    }
  }

  // Render Written Tasks
  if (writtenTasks.length > 0) {
    html += `<div class="task-box">`;
    writtenTasks.forEach(task => {
      html += `<p style="margin-top:20px;"><strong>Q${task.qNum}. ${task.text.replace(/^(Q\d+: |Task \d+: |Question \d+[a-z]?: |Enquiry Task: )/, '').replace(/\s*\((P|Para\s*)\d+\)/gi, '').replace(/\s*\(Ext P\d+(-\d+)?\)/gi, '')}</strong></p>`;
      // Add 3 blank lines for writing
      html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
    });
    html += `</div>`;
  }

  // Extended Scholarship
  if (lesson.extended && lesson.extended.paragraphs) {
    html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;
    lesson.extended.paragraphs.forEach(para => {
      html += `<p class="narrative-block" style="font-size: 11pt; color: #444;">${para}</p>`;
    });
    if (lesson.extended.question) {
      html += `<div style="margin-top: 20px;"><strong>Q${lesson.extended.qNum}. ${lesson.extended.question.replace(/\s*\(Ext P\d+(-\d+)?\)/gi, '')}</strong></div>`;
      html += `<div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>`;
    }
  }

  // Historians Corner
  if (lesson.historians_corner) {
    html += `<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">`;
    html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
    html += `<p style="font-size: 11pt; font-style: italic;">${lesson.historians_corner.text}</p>`;
    html += `</div>`;
  }

  // GCSE Cross-Source Analysis
  if (lesson.gcse_task && lesson.gcse_task.sources && lesson.gcse_task.sources.length >= 2) {
    html += `<div style="page-break-before: always;">`;
    html += `<h2>GCSE Cross-Source Analysis</h2>`;
    html += `<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}?</p>`;

    let srcA_html = "";
    if (lesson.gcse_task.sources[0].src) {
        let srcA = lesson.gcse_task.sources[0].src.startsWith("../") ? lesson.gcse_task.sources[0].src : `../cme_new/${lesson.gcse_task.sources[0].src}`;
        srcA_html = `<img src="${srcA}" style="max-width: 100%; max-height: 250px;">`;
    } else if (lesson.gcse_task.sources[0].text) {
        srcA_html = `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${lesson.gcse_task.sources[0].text}</blockquote>`;
    }

    let srcB_html = "";
    if (lesson.gcse_task.sources[1].src) {
        let srcB = lesson.gcse_task.sources[1].src.startsWith("../") ? lesson.gcse_task.sources[1].src : `../cme_new/${lesson.gcse_task.sources[1].src}`;
        srcB_html = `<img src="${srcB}" style="max-width: 100%; max-height: 250px;">`;
    } else if (lesson.gcse_task.sources[1].text) {
        srcB_html = `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${lesson.gcse_task.sources[1].text}</blockquote>`;
    }

    html += `
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          ${srcA_html}
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${lesson.gcse_task.sources[0].title}</p>
        </div>
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          ${srcB_html}
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${lesson.gcse_task.sources[1].title}</p>
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

});




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


// Append Quiz Pack dynamically
let cmeQuizPack = [];
unitData.lessons.forEach(l => { if(l.quiz) cmeQuizPack.push(...l.quiz); });
if (cmeQuizPack.length > 0) {
  html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 24pt;">End of Unit Quiz Pack</h2>`;
  html += `<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> Answer the ${cmeQuizPack.length} quick-fire recall questions below. If you get stuck, the scrambled answers are provided in the Answer Bank on the final page.</p>`;
  html += `<div style="column-count: 2; column-gap: 40px;">`;
  cmeQuizPack.forEach((item, idx) => {
    html += `<div style="margin-bottom: 12px; break-inside: avoid;">`;
    html += `<div style="font-weight: 500; font-size: 10.5pt;">${idx + 1}. ${item.question || item.q}</div>`;
    html += `<div class="task-lines"></div>`;
    html += `</div>`;
  });
  html += `</div>`;
  
  // Answer Bank
  html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 20pt; text-align: center;">Quiz Pack Answer Bank</h2>`;
  html += `<p style="text-align: center; margin-bottom: 30px;">Use these answers to help you complete the Quiz Pack if you are stuck. They are in random order.</p>`;
  let scrambled = [...cmeQuizPack];
  scrambled.sort(() => Math.random() - 0.5);
  html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">`;
  scrambled.forEach(item => {
    html += `<div style="padding: 8px 12px; border: 1px solid #ccc; background: #f9f9f9; border-radius: 4px; font-size: 10pt;">${item.answer || item.a}</div>`;
  });
  html += `</div>`;
}
fs.writeFileSync(path.join(__dirname, 'workbook.html'), html, 'utf8');
console.log("Successfully generated workbook.html!");
