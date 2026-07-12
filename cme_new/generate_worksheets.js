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
  
    .task-box, .narrative-chunk, table, .ascii-diagram {
      page-break-inside: avoid;
    }
  
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


  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }

unitData.lessons.forEach((lesson, lessonIndex) => {
  assignQuestionNumbers(lesson);
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

  // Render Interleaved Narrative Blocks & Tasks
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block, index) => {
      // Print the paragraph text
      if (block.text) {
        if (typeof block.text === 'string' && block.text.startsWith('"')) {
          html += `<div style="font-weight: bold; margin: 15px 0; font-size: 13pt;">${block.text.replace(/"/g, '')}</div>`;
        } else {
          html += `<p class="narrative-block">${block.text}</p>`;
        }
      }

      // If this block has tasks, print them immediately underneath
      if (block.tasks && block.tasks.length > 0) {
        html += `<div class="task-box" style="margin-top: 15px;">`;
        html += `<h3 style="margin-top: 0; font-size: 14pt;">Knowledge Check</h3>`;
        block.tasks.forEach(task => {
          let cleanTask = task.text.replace(/^(Q\d+: |Task \d+: |Question \d+[a-z]?: |Enquiry Task: )/, '').replace(/\s*\((P|Para\s*)\d+\)/gi, '').replace(/\s*\(Ext P\d+(-\d+)?\)/gi, '');
          html += `<p style="margin-top:10px; font-weight: bold;">Q${task.qNum}. ${cleanTask}</p>`;
          // Add 3 blank lines for writing
          html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
        });
        html += `</div>`;
      }
    });
  }

  // Identify Draw Tasks (if any remain)
  const drawTasks = lesson.draw_tasks || [];
  
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
        html += `<div class="draw-task"><i class="fa-solid fa-pencil"></i> Source Task: ${task.text}</div>`;
      });
    }
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

  // Historians Corner
  if (lesson.historians_corner) {
    html += `<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">`;
    html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
    html += `<p style="font-size: 11pt; font-style: italic;">${lesson.historians_corner.text}</p>`;
    html += `</div>`;
  }
const timelinesMap = {
  1: [
    { title: "Jewish Insurgency", prompt: "Why did Jewish paramilitary groups target British forces?" },
    { title: "King David Hotel Bombing", prompt: "What was the impact of this attack on British morale?" },
    { title: "The Exodus Incident", prompt: "How did this event sway international opinion?" },
    { title: "UN Partition Plan (Res 181)", prompt: "What was the UN's proposed solution?" },
    { title: "Declaration of the State of Israel", prompt: "Who declared it and what was the immediate reaction?" }
  ],
  2: [
    { title: "The Arab Invasion", prompt: "Which nations attacked Israel immediately after its creation?" },
    { title: "First Truce", prompt: "How did Israel use the UN-brokered truce to its advantage?" },
    { title: "Deir Yassin Massacre", prompt: "What impact did this have on the Palestinian population?" },
    { title: "The Palestinian Exodus (Nakba)", prompt: "Why did 700,000 Palestinians become refugees?" },
    { title: "1949 Armistice Agreements", prompt: "What were the new borders established?" }
  ],
  3: [
    { title: "The Baghdad Pact", prompt: "Why did this Western alliance anger Nasser?" },
    { title: "Czech Arms Deal", prompt: "How did this shift the balance of power in the region?" },
    { title: "Nationalisation of the Suez Canal", prompt: "Why did Nasser take control of the canal?" },
    { title: "The Suez Crisis", prompt: "Who colluded to attack Egypt, and what was the outcome?" },
    { title: "Formation of the PLO", prompt: "What was the goal of the Palestine Liberation Organisation?" }
  ],
  4: [
    { title: "False Soviet Intelligence", prompt: "What incorrect information sparked the crisis?" },
    { title: "Closure of the Straits of Tiran", prompt: "Why was this considered an act of war by Israel?" },
    { title: "Operation Focus", prompt: "How did Israel achieve total air superiority?" },
    { title: "Capture of East Jerusalem", prompt: "What was the significance of taking the Old City?" },
    { title: "UN Resolution 242", prompt: "What 'land for peace' formula was proposed?" }
  ],
  5: [
    { title: "War of Attrition", prompt: "How did Egypt attempt to wear down Israeli forces?" },
    { title: "Rise of Yasser Arafat", prompt: "How did Arafat transform the PLO?" },
    { title: "Battle of Karameh", prompt: "Why was this a psychological victory for Fatah?" },
    { title: "Dawson's Field Hijackings", prompt: "How did the PFLP gain international attention?" },
    { title: "Black September", prompt: "Why did King Hussein expel the PLO from Jordan?" }
  ],
  6: [
    { title: "Sadat becomes President", prompt: "How did Anwar Sadat differ from Nasser?" },
    { title: "Expulsion of Soviet Advisors", prompt: "Why did Sadat distance Egypt from the USSR?" },
    { title: "The Yom Kippur Surprise Attack", prompt: "How did Egypt and Syria catch Israel off-guard?" },
    { title: "Crossing the Suez Canal", prompt: "How did Egypt breach the Bar Lev line?" },
    { title: "The Oil Weapon", prompt: "How did OPEC pressure Western nations?" }
  ],
  7: [
    { title: "Kissinger's Shuttle Diplomacy", prompt: "How did the US mediate post-war disengagement?" },
    { title: "Sadat's Visit to Jerusalem", prompt: "Why was this a historic breakthrough?" },
    { title: "The Camp David Accords", prompt: "What framework for peace was agreed upon?" },
    { title: "The Egypt-Israel Peace Treaty", prompt: "What did each side gain from the 1979 treaty?" },
    { title: "Assassination of Sadat", prompt: "Why was Sadat assassinated by Islamic extremists?" }
  ],
  8: [
    { title: "Arafat's UN Address", prompt: "What was the significance of the 'olive branch and freedom fighter's gun' speech?" },
    { title: "PLO Moves to Lebanon", prompt: "Why did southern Lebanon become known as 'Fatahland'?" },
    { title: "Israeli Invasion of Lebanon", prompt: "What were the objectives of Operation Peace for Galilee?" },
    { title: "Sabra and Shatila Massacre", prompt: "What happened, and what was the international reaction?" },
    { title: "Outbreak of the First Intifada", prompt: "What sparked the 1987 Palestinian uprising?" }
  ],
  9: [
    { title: "PLO Recognizes Israel", prompt: "What shift occurred in Arafat's policy in 1988?" },
    { title: "The Gulf War", prompt: "How did the PLO's support for Saddam Hussein affect its standing?" },
    { title: "The Madrid Conference", prompt: "Why was this conference a diplomatic milestone?" },
    { title: "The Oslo Accords", prompt: "What self-rule was granted to the Palestinians?" },
    { title: "Assassination of Yitzhak Rabin", prompt: "How did this tragic event impact the peace process?" }
  ]
};

  const events = timelinesMap[lessonIndex + 1];
  
  if (events && events.length > 0) {
    html += `<div style="page-break-before: always;">
      <h2 style="text-align: center; font-size: 24pt; margin-bottom: 5px; color: #1a237e;">Revision Timeline</h2>
      <h3 style="text-align: center; font-size: 16pt; margin-top: 0; margin-bottom: 25px; font-weight: normal;">${lesson.title}</h3>
      <p style="text-align: center; font-style: italic; margin-bottom: 40px; font-size: 12pt;">
        Map out the key events chronologically. Read the title and prompt to guide your summary.
      </p>
      
      <div style="margin: 0 auto; width: 85%; border-left: 4px solid #1a237e; padding-left: 40px; position: relative; padding-bottom: 20px;">`;
    
    events.forEach(ev => {
      html += `
        <div style="position: relative; margin-bottom: 40px; page-break-inside: avoid;">
          <!-- Node dot -->
          <div style="position: absolute; left: -50px; top: 0; width: 16px; height: 16px; background: #fff; border: 4px solid #1a237e; border-radius: 50%;"></div>
          
          <div style="background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px; padding: 15px;">
            <div style="font-weight: bold; font-size: 14pt; margin-bottom: 8px;">${ev.title}</div>
            <div style="font-style: italic; font-size: 11pt; color: #555; margin-bottom: 15px;">${ev.prompt}</div>
            <div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>
          </div>
        </div>`;
    });
    
    html += `
      </div>
    </div>`;
  }

  }
});

// Append Quiz Pack
if (unitData.quizPack && unitData.quizPack.length > 0) {
  html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 24pt;">End of Unit Quiz Pack</h2>`;
  html += `<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> Answer the 50 quick-fire recall questions below. If you get stuck, the scrambled answers are provided in the Answer Bank on the final page.</p>`;
  
  html += `<div style="display: flex; flex-wrap: wrap; gap: 20px;">`;
  
  // Format into two columns roughly
  html += `<div style="width: 100%; column-count: 2; column-gap: 40px;">`;
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

fs.writeFileSync(path.join(__dirname, 'workbook.html'), html, 'utf8');
console.log("Successfully generated workbook.html!");
