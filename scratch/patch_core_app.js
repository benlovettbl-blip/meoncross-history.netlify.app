const fs = require('fs');
const file = 'src/core_app.js';
let content = fs.readFileSync(file, 'utf8');

const t1 = `    const isCmeNew = window.currentUnitId === 'cme_new';`;
const r1 = `    const isCmeNew = window.currentUnitId === 'cme_new';
    const isMedicine = window.currentUnitId === 'edexcel_medicine';
    
    const cheatSheetLink = document.createElement('a');
    cheatSheetLink.className = 'lesson-link';
    cheatSheetLink.innerHTML = '<i class="fa-solid fa-file-invoice"></i> Revision Cheat Sheet';
    cheatSheetLink.href = window.currentUnitId ? \`/\${window.currentUnitId}/cheat_sheet.html\` : 'cheat_sheet.html';
    cheatSheetLink.target = '_blank';
    cheatSheetLink.style.marginTop = '15px';
    cheatSheetLink.style.border = '2px dashed #cbd5e1';
    cheatSheetLink.style.background = '#eff6ff';
    cheatSheetLink.style.color = '#1e3a8a';
    navContainer.appendChild(cheatSheetLink);`;

const t2 = `    } else {
      const workbookLink = document.createElement('a');
      workbookLink.className = 'lesson-link';
      workbookLink.textContent = 'Pupil Workbook';`;

const r2 = `    } else if (isMedicine) {
      const wbHeader = document.createElement('div');
      wbHeader.innerHTML = '<i class="fa-solid fa-book" style="margin-right: 5px;"></i> <strong>Printable Workbooks</strong>';
      wbHeader.style.marginTop = '20px';
      wbHeader.style.color = '#334155';
      wbHeader.style.fontSize = '0.9rem';
      wbHeader.style.paddingLeft = '5px';
      wbHeader.style.textTransform = 'uppercase';
      wbHeader.style.letterSpacing = '0.5px';
      navContainer.appendChild(wbHeader);

      const periods = [
        { id: 'medieval', title: 'Medieval (c1250-c1500)' },
        { id: 'renaissance', title: 'Renaissance (c1500-c1700)' },
        { id: '18th_19th', title: '18th & 19th C (c1700-c1900)' },
        { id: 'modern', title: 'Modern (c1900-present)' },
        { id: 'western_front', title: 'Western Front' }
      ];

      periods.forEach(p => {
        const pLink = document.createElement('a');
        pLink.className = 'lesson-link';
        pLink.innerHTML = \`<i class="fa-solid fa-book-open"></i> \${p.title}\`;
        pLink.href = \`/\${window.currentUnitId}/workbook_\${p.id}.html\`;
        pLink.target = '_blank';
        pLink.style.marginTop = '8px';
        pLink.style.border = '2px dashed #cbd5e1';
        pLink.style.fontSize = '0.85rem';
        navContainer.appendChild(pLink);
      });
    } else {
      const workbookLink = document.createElement('a');
      workbookLink.className = 'lesson-link';
      workbookLink.textContent = 'Pupil Workbook';`;

const t3 = `      extHtml += \`</div>\`;
      html += extHtml;
    }`;

const r3 = `      extHtml += \`</div>\`;
      html += extHtml;
    }

    // PHASE: GCSE Exam Practice
    if (lesson.gcse_task) {
      let gcseHtml = \`
        <div class="phase-card" id="phase-\${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;"><i class="fa-solid fa-graduation-cap"></i> Phase \${phaseNum++}: GCSE Exam Practice</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
          </div>
      \`;

      if (lesson.gcse_task.tasks) {
        lesson.gcse_task.tasks.forEach((task, tIdx) => {
          gcseHtml += \`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                \${formatQuestion(task.text)}
                <span style="display: inline-flex; vertical-align: middle;">
                  \${task.model ? \`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('gcse-model-\${tIdx}')"><i class="fa-solid fa-check-double"></i></button>\` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" style="min-height: \${task.text.includes("12 marks") || task.text.includes("16 marks") ? "200px" : "100px"};" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
              \${task.model ? \`<div id="gcse-model-\${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${task.model}</div>\` : ''}
            </div>
          \`;
        });
      } else if (lesson.gcse_task.sources) {
         gcseHtml += \`<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>\`;
         gcseHtml += \`<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">\`;
         lesson.gcse_task.sources.forEach(srcObj => {
           gcseHtml += \`<div style="flex: 1; min-width: 300px; background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">\`;
           if (srcObj.type === 'visual') {
             gcseHtml += \`<img src="\${getAssetUrl(srcObj.src)}" style="max-width: 100%; max-height: 250px; border-radius: 4px; margin-bottom: 10px;">\`;
           } else {
             gcseHtml += \`<blockquote style="font-size: 1.05rem; font-style: italic; color: #475569; margin: 0 0 15px 0; border-left: 4px solid #94a3b8; padding-left: 10px;">\${srcObj.text}</blockquote>\`;
           }
           gcseHtml += \`<p style="font-size: 0.95rem; font-weight: bold; color: #334155; margin: 0;">\${srcObj.title}</p>\`;
           gcseHtml += \`</div>\`;
         });
         gcseHtml += \`</div>\`;
         gcseHtml += \`<textarea class="student-answer-input" style="min-height: 200px;" placeholder="Type your 8-mark utility evaluation here..." oninput="window.updateProgress()"></textarea>\`;
         if (lesson.gcse_task.model) {
            gcseHtml += \`<div style="margin-top: 15px;"><button class="btn btn-secondary" onclick="toggleElement('gcse-model-src')"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>\`;
            gcseHtml += \`<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">\${lesson.gcse_task.model}</div>\`;
         }
      }
      gcseHtml += \`</div>\`;
      html += gcseHtml;
    }`;

let replaced = 0;
if (content.includes(t1)) { content = content.replace(t1, r1); replaced++; }
if (content.includes(t2)) { content = content.replace(t2, r2); replaced++; }
if (content.includes(t3)) { content = content.replace(t3, r3); replaced++; }

if (replaced === 3) {
  fs.writeFileSync(file, content);
  console.log('Successfully patched core_app.js! ' + replaced);
} else {
  console.log('Failed to match targets. Replaced: ' + replaced);
}
