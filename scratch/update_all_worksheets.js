const fs = require('fs');
const path = require('path');

const dirs = [
  'change_1450_1750',
  'change_1450_1750/great_war',
  'great_war',
  'great_war_part2',
  'edexcel_medicine',
  'water_and_sanitation'
];

const vocabBlock = `  // Render Vocabulary Task
  if (lesson.vocab && lesson.vocab.length > 0) {
    let vocabStyle = lessonIndex % 3;
    html += \`<div class="task-box" style="margin-bottom: 20px;">\`;
    html += \`<h3 style="margin-top: 0;">Vocabulary Check</h3>\`;
    
    if (vocabStyle === 0) {
      // Contextual Cloze
      html += \`<p style="font-weight: bold;">Style: Contextual Cloze</p>\`;
      html += \`<p style="font-style: italic;">Fill in the blanks using the vocabulary words below.</p>\`;
      let words = lesson.vocab.map(v => v.term).join(' &nbsp;|&nbsp; ');
      html += \`<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; text-align: center; font-weight: bold;">\${words}</div>\`;
      if (lesson.vocab_cloze_text) {
         let cloze = lesson.vocab_cloze_text.replace(/\\[.*?\\]/g, '__________________');
         html += \`<p style="line-height: 2; font-size: 11pt;">\${cloze}</p>\`;
      } else {
         html += \`<p>_________________________________________________________</p>\`;
         html += \`<p>_________________________________________________________</p>\`;
      }
    } else if (vocabStyle === 1) {
      // Vocabulary Mapping
      html += \`<p style="font-weight: bold;">Style: Vocabulary Mapping</p>\`;
      html += \`<p style="font-style: italic;">Write a historically accurate sentence connecting two terms from the glossary box below.</p>\`;
      let words = lesson.vocab.map(v => v.term).join(' &nbsp;|&nbsp; ');
      html += \`<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; text-align: center; font-weight: bold;">\${words}</div>\`;
      html += \`<strong>Your Sentence:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
    } else if (vocabStyle === 2) {
      // Mini-Frayer Model
      html += \`<p style="font-weight: bold;">Style: Mini-Frayer Model</p>\`;
      let focusWord = lesson.vocab[0].term;
      html += \`<p style="font-style: italic;">Complete the Frayer Model for the term: <strong>\${focusWord}</strong></p>\`;
      html += \`
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
      \`;
    }
    html += \`</div>\`;
  }

  // Render Narrative Blocks & Tasks`;

const gcseBlock = `  // GCSE Cross-Source Analysis & Exam Practice
  if (lesson.gcse_task) {
    html += \`<div>\`;
    html += \`<h2>GCSE Exam Practice</h2>\`;

    if (lesson.gcse_task.tasks) {
      // It's the Section B style (Q3 and Q4)
      lesson.gcse_task.tasks.forEach(task => {
         let is16Marks = task.text.includes("16 marks");
         let is12Marks = task.text.includes("12 marks") || task.text.includes("Explain why");
         let is4MarksFeatures = task.text.includes("4 marks") || task.text.includes("feature");

         // Smart Page Breaks
         let containerStyle = is16Marks ? 'margin-top: 15px; page-break-before: always;' : 'margin-top: 15px; page-break-inside: avoid;';
         
         html += \`<div style="\${containerStyle}"><strong>\${task.text}</strong></div>\`;
         
         // Planning Box for 12/16 Markers
         if (is12Marks || is16Marks) {
             html += \`
               <div style="border: 2px dashed #94a3b8; padding: 10px; margin-top: 10px; margin-bottom: 15px; border-radius: 6px; width: 60%;">
                 <strong style="color: #64748b; font-size: 0.9rem;">Exam Plan (3 mins):</strong>
                 <div style="margin-top: 5px; height: 50px;"></div>
               </div>
             \`;
         }

         if (is4MarksFeatures) {
             // Edexcel 4-mark features format
             html += \`<p style="margin-top: 15px; margin-bottom: 5px;"><strong>Feature 1:</strong></p>\`;
             for(let i=0; i<4; i++) { html += \`<div class="task-lines-large"></div>\`; }
             html += \`<p style="margin-top: 15px; margin-bottom: 5px;"><strong>Feature 2:</strong></p>\`;
             for(let i=0; i<4; i++) { html += \`<div class="task-lines-large"></div>\`; }
         } else if (is16Marks) {
             // 16 marks = 2 full pages (~56 lines)
             for(let i=0; i<56; i++) { html += \`<div class="task-lines-large"></div>\`; }
         } else if (is12Marks) {
             // 12 marks = 1 full page (~28 lines)
             for(let i=0; i<28; i++) { html += \`<div class="task-lines-large"></div>\`; }
         } else {
             // Default for 8 marks, etc. (~12 lines)
             for(let i=0; i<12; i++) { html += \`<div class="task-lines-large"></div>\`; }
         }
         html += \`<br>\`;
      });
    } else if (lesson.gcse_task.sources) {
      // It's the Section A Cross-Source Analysis style
      html += \`<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>\`;
      
      let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 20px;">';
      
      lesson.gcse_task.sources.forEach(srcObj => {
        sourceHTML += '<div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">';
        if (srcObj.type === 'visual') {
          let imgSrc = srcObj.src.startsWith('../') ? srcObj.src : \`..\${srcObj.src}\`;
          sourceHTML += \`<img src="\${imgSrc}" style="max-width: 100%; max-height: 250px;">\`;
        } else {
          sourceHTML += \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0; text-align: left;">\${srcObj.text}</blockquote>\`;
        }
        sourceHTML += \`<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${srcObj.title}</p>\`;
        sourceHTML += '</div>';
      });
      
      sourceHTML += '</div>';
      html += sourceHTML;

      html += \`<h3 style="margin-top: 0;">Source Evaluation Notes</h3>\`;
      html += \`
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
      \`;

      html += \`<h3 style="margin-top: 0;">Final Written Evaluation</h3>\`;
      for(let i=0; i<10; i++) {
        html += \`<div class="task-lines-large"></div>\`;
      }
    }
    
    html += \`</div>\`;
  }`;

dirs.forEach(d => {
  const file = path.join(__dirname, '../', d, 'generate_worksheets.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Handle Vocab Block replacement
    if (!content.includes('// Render Vocabulary Task')) {
      content = content.replace(/  \/\/ Render Narrative Blocks & Tasks/g, vocabBlock);
    }
    
    // Handle GCSE Task Block replacement
    if (!content.includes('// GCSE Cross-Source Analysis & Exam Practice')) {
      const gcseRegex = /  \/\/ GCSE Cross-Source Analysis[\s\S]*?(?=  \}\n\n  \/\/ Inject Discreet Grading Footer)/;
      content = content.replace(gcseRegex, gcseBlock + '\n');
    }
    
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
