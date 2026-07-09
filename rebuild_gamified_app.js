const fs = require('fs');

let appContent = fs.readFileSync('app_js_v0.js', 'utf8');

// 1. Sticky Header
appContent = appContent.replace(
  '<h2>${lesson.title}</h2>',
  `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position: sticky; top: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 10px 15px; z-index: 1000; border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <h4 style="margin: 0; font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; color: var(--primary);">\${lesson.title}</h4>
    <div style="display: flex; gap: 8px;">
      <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.9rem; background: var(--accent-red); border-color: var(--accent-red);" onclick="openDebateModal()"><i class="fa-solid fa-comments"></i> Class Debate</button>
      <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
      <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.location.href='../index.html'"><i class="fa-solid fa-house"></i> Main Dashboard</button>
    </div>
  </div>
  <div id="progress-container" style="position: sticky; top: 62px; background: #e2e8f0; height: 6px; width: 100%; z-index: 1001;">
    <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
  </div>`
);

// 2. Glossary
const glossaryInjection = `
      let flashcardDict = {};
      if (lesson.flashcards) {
        lesson.flashcards.forEach(fc => {
          flashcardDict[fc.term.toLowerCase()] = fc.definition;
        });
      }
      const highlightGlossary = (text) => {
        if (Object.keys(flashcardDict).length === 0) return text;
        let processedText = text;
        for (const [term, def] of Object.entries(flashcardDict)) {
          const regex = new RegExp(\`\\\\b(\${term})\\\\b\`, 'gi');
          processedText = processedText.replace(regex, \`<span style="border-bottom: 1px dotted #1a237e; cursor: help; color: #1a237e; font-weight: 600;" title="\${def.replace(/"/g, '&quot;')}">$1</span>\`);
        }
        return processedText;
      };
`;

appContent = appContent.replace(
  'if (lesson.narrative && lesson.narrative.length > 0) {',
  glossaryInjection + '\n    if (lesson.narrative && lesson.narrative.length > 0) {'
);

appContent = appContent.replace(
  'html += `<p class="narrative-block">${para}</p>`;',
  'html += `<p class="narrative-block">${highlightGlossary(para)}</p>`;'
);

// 3. Tasks with Scaffolding, TPS, Teacher Notes
appContent = appContent.replace(
  /lesson\.tasks\.forEach\(task => {[\s\S]*?}\);/,
  `lesson.tasks.forEach((task, tIdx) => {
        html += \`<div class="task-item" style="position:relative;">\`;
        if (task.type === 'tps') {
          html += \`<div style="display:inline-block; background:#f59e0b; color:white; padding:2px 6px; border-radius:4px; font-size:0.8rem; margin-bottom:8px; font-weight:bold;"><i class="fa-solid fa-users"></i> Think, Pair, Share</div> \`;
        }
        html += \`\${task.text}\`;

        if (task.scaffold) {
          html += \`<div style="margin-top: 10px; display:flex; gap: 8px;">\`;
          if (task.starter) html += \`<button class="btn btn-secondary" style="font-size: 0.8rem; padding: 4px 8px;" onclick="document.getElementById('scaffold-starter-\${tIdx}').style.display='block'">Sentence Starter</button>\`;
          if (task.clue) html += \`<button class="btn btn-secondary" style="font-size: 0.8rem; padding: 4px 8px;" onclick="document.getElementById('scaffold-clue-\${tIdx}').style.display='block'">Clue</button>\`;
          if (task.model) html += \`<button class="btn btn-secondary" style="font-size: 0.8rem; padding: 4px 8px;" onclick="document.getElementById('scaffold-model-\${tIdx}').style.display='block'">WAGOLL (Model)</button>\`;
          html += \`</div>\`;
          
          if (task.starter) html += \`<div id="scaffold-starter-\${tIdx}" class="scaffold-box starter" style="display:none;"><i class="fa-solid fa-play"></i> <strong>Start your sentence with:</strong> \${task.starter}</div>\`;
          if (task.clue) html += \`<div id="scaffold-clue-\${tIdx}" class="scaffold-box clue" style="display:none;"><i class="fa-solid fa-lightbulb"></i> <strong>Hint:</strong> \${task.clue}</div>\`;
          if (task.model) html += \`<div id="scaffold-model-\${tIdx}" class="scaffold-box model" style="display:none;"><i class="fa-solid fa-star"></i> <strong>WAGOLL:</strong> \${task.model}</div>\`;
        }
        
        if (task.teacher_note) {
          html += \`<div class="teacher-note"><i class="fa-solid fa-chalkboard-user"></i> <strong>Teacher Note:</strong> \${task.teacher_note}</div>\`;
        }
        html += \`</div>\`;
      });`
);

// 4. GCSE Task & Flashcards
const flashcardAndGcse = `
      // Historians Corner
      if (lesson.historians_corner) {
        html += \`<div class="tasks-section" style="margin-top: 40px; background: #f3e5f5; border: 2px solid #ce93d8; border-radius: 8px; padding: 20px;">
          <h3 style="color: #6a1b9a; margin-top: 0; border-bottom: 2px solid #e1bee7; padding-bottom: 10px;"><i class="fa-solid fa-book-journal-whills"></i> Historian's Corner: \${lesson.historians_corner.title}</h3>
          <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #4a148c;">\${lesson.historians_corner.text}</p>
        </div>\`;
      }

      // GCSE Cross-Source Analysis Task
      if (lesson.gcse_task) {
        html += \`<div class="tasks-section" style="margin-top: 40px; background: #e3f2fd; border: 2px solid #90caf9; border-radius: 8px; padding: 20px;">
          <h3 style="color: #1565c0; margin-top: 0; border-bottom: 2px solid #bbdefb; padding-bottom: 10px;"><i class="fa-solid fa-scale-balanced"></i> GCSE Cross-Source Analysis</h3>
          <p style="font-weight: bold; font-size: 1.1rem; color: #0d47a1;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>
          
          <div style="display: flex; gap: 20px; margin-top: 20px;">
            <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border: 1px solid #90caf9;">
              <img src="../great_war/\${lesson.gcse_task.sources[0].src}" style="width: 100%; max-height: 250px; object-fit: contain; margin-bottom: 10px; border-radius: 4px;">
              <p style="margin:0; font-size: 0.9rem; font-weight: 600; color: #1565c0;">\${lesson.gcse_task.sources[0].title}</p>
            </div>
            <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border: 1px solid #90caf9; display: flex; flex-direction: column; justify-content: center;">
              <blockquote style="font-size: 1.1rem; font-style: italic; color: #475569; border-left: 4px solid #1565c0; padding-left: 15px; margin: 0 0 15px 0;">\${lesson.gcse_task.sources[1].text}</blockquote>
              <p style="margin:0; font-size: 0.9rem; font-weight: 600; color: #1565c0;">\${lesson.gcse_task.sources[1].title}</p>
            </div>
          </div>

          <h4 style="margin-top: 25px; color: #1565c0;">Source Evaluation Scaffolding</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <thead>
              <tr style="background: #bbdefb; color: #0d47a1;">
                <th style="padding: 10px; border: 1px solid #90caf9; width: 10%;">Source</th>
                <th style="padding: 10px; border: 1px solid #90caf9; width: 30%;">N.O.P. (Nature, Origin, Purpose)</th>
                <th style="padding: 10px; border: 1px solid #90caf9; width: 30%;">Content (What it shows/says)</th>
                <th style="padding: 10px; border: 1px solid #90caf9; width: 30%;">Contextual Knowledge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #90caf9; font-weight: bold; text-align: center;">A</td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #90caf9; font-weight: bold; text-align: center;">B</td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin-top: 15px; color: #1565c0;">Final Written Evaluation</h4>
          <textarea class="student-answer-input" placeholder="Write your full evaluation here using the notes from your table above..." style="width: 100%; height: 150px; margin-top: 10px; padding: 10px; border: 1px solid #90caf9; border-radius: 6px; font-family: inherit; resize: vertical;" oninput="window.updateProgress()"></textarea>
          
          <div id="scaffold-model-gcse" class="scaffold-box model" style="display:none; margin-top:15px;">
            <i class="fa-solid fa-star"></i> <strong>Model Answer:</strong> \${lesson.gcse_task.model}
          </div>
        </div>\`;
      }

      // Flashcards
      if (lesson.flashcards && lesson.flashcards.length > 0) {
        html += \`
          <div class="flashcard-section">
            <h3><i class="fa-solid fa-layer-group"></i> Key Terms & Concepts</h3>
            <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
            <div class="flashcard-deck">
        \`;
        lesson.flashcards.forEach(fc => {
          html += \`
            <div class="flashcard-wrapper" onclick="this.classList.toggle('flipped')">
              <div class="flashcard-inner">
                <div class="flashcard-face flashcard-front">
                  <h4>\${fc.term}</h4>
                  <p>Tap to reveal</p>
                </div>
                <div class="flashcard-face flashcard-back">
                  \${fc.definition}
                </div>
              </div>
            </div>
          \`;
        });
        html += \`</div></div>\`;
      }

    html += \`</div>\`;
    contentArea.innerHTML = html;
`;

appContent = appContent.replace(
  '    html += `</div>`;\n    contentArea.innerHTML = html;',
  flashcardAndGcse
);

appContent += `
window.updateProgress = () => {
  const inputs = document.querySelectorAll('.student-answer-input');
  let filled = 0;
  inputs.forEach(input => {
    if (input.value.trim().length > 0) filled++;
  });
  const bar = document.getElementById('progress-bar');
  if (bar) {
    if (inputs.length === 0) bar.style.width = '100%';
    else bar.style.width = \\\`\\\${(filled / inputs.length) * 100}%\\\`;
  }
};
`;

fs.writeFileSync('great_war/app.js', appContent);
console.log('Successfully rebuilt gamified app.js');
