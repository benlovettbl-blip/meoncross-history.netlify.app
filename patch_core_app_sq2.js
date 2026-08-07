const fs = require('fs');
let content = fs.readFileSync('src/core_app.js', 'utf8');

const targetStr = `          html += \`
            <div class="standard-narrative-container">
              \${imageHtml}
              <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${themeHeadingHtml}\${styledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          \`;

        if (block.level_4) {
          html += \`
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">\${l4StyledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          \`;
        }
        
        if (block.hinge_question) {
          const hingeId = \`hinge-\${index}\`;
          const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
          const correctIndex = block.hinge_question.correct_index !== undefined ? block.hinge_question.correct_index : block.hinge_question.answer;
          html += \`
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-\${hingeId}" onclick="document.getElementById('\${hingeId}').style.display = 'block'; this.style.display = 'none';" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
              <div id="\${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"\${hingeQuestionText}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  \${block.hinge_question.options.map((opt, i) => \`
                    <button onclick="
                      const parent = this.parentElement;
                      const explanation = parent.nextElementSibling;
                      for (let child of parent.children) {
                        child.style.pointerEvents = 'none';
                        if (child.dataset.index == \${correctIndex}) {
                          child.style.backgroundColor = '#dcfce7';
                          child.style.borderColor = '#22c55e';
                          child.style.color = '#166534';
                        }
                      }
                      if (\${i} !== \${correctIndex}) {
                        this.style.backgroundColor = '#fee2e2';
                        this.style.borderColor = '#ef4444';
                        this.style.color = '#991b1b';
                      }
                      explanation.style.display = 'block';
                    " data-index="\${i}" style="text-align: left; background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem;">
                      <span style="font-weight: bold; margin-right: 8px;">\${String.fromCharCode(65+i)}.</span> \${opt}
                    </button>
                  \`).join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> \${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          \`;
        }
        
        if (block.tasks && block.tasks.length > 0) {
          html += \`<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">\`;
          block.tasks.forEach((task, tIdx) => {
             if (task.type === 'drag_drop_timeline') {
               const timelineId = \`dd-timeline-emb-\${index}-\${tIdx}\`;
               html += \`<div id="\${timelineId}" style="margin-bottom: 20px;"></div>\`;
               window.postRenderHooks.push(() => {
                 import('./drag_drop_timeline.js').then(mod => {
                    mod.initDragDropTimeline(document.getElementById(timelineId), task);
                 });
               });
               return;
             }
             if (task.type === 'spectrum_mapper') {
               const spectrumId = \`spectrum-emb-\${index}-\${tIdx}\`;
               html += \`<div id="\${spectrumId}" style="margin-bottom: 20px;"></div>\`;
               window.postRenderHooks.push(() => {
                 import('./spectrum_mapper.js').then(mod => {
                    mod.initSpectrumMapper(document.getElementById(spectrumId), task);
                 });
               });
               return;
             }
             const qPrefix = task.qNum ? \`Q\${task.qNum}. \` : "";
             const ansId = \`ans-emb-\${index}-\${tIdx}\`;
             const starterBtn = task.starter ? \`<button class="btn" onclick="window.toggleStarterById('starter-\${ansId}')" style="margin-left: 5px; padding: 4px 8px; font-size: 0.8rem; background: #e0f2fe; color: #0284c7; border: 1px solid #7dd3fc;"><i class="fa-solid fa-pen"></i> Starter</button>\` : "";
             const starterDiv = task.starter ? \`<div class="starter-box" id="starter-\${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">\${task.starter}</div>\` : "";
             html += \`
               <div style="margin-bottom: 10px;">
                 <div style="font-size: 1.05rem; line-height: 1.6; color: #1e293b; margin-bottom: 8px;">\${window.formatBold(qPrefix + (task.text || task.question || ''))}</div>
                 <button class="btn btn-secondary" onclick="window.toggleAnswerById('\${ansId}')" style="padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show</button>
                 \${starterBtn}
                 \${starterDiv}
                 <div class="answer" id="\${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03; line-height: 1.6;">\${window.formatBold(task.model || task.model_answer || '')}</div>
               </div>
             \`;
          });
          html += \`</div>\`;
        }`;

const replacementStr = `        let extrasHtml = '';
        if (block.level_4) {
          extrasHtml += \`
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">\${l4StyledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          \`;
        }
        
        if (block.hinge_question) {
          const hingeId = \`hinge-\${index}\`;
          const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
          const correctIndex = block.hinge_question.correct_index !== undefined ? block.hinge_question.correct_index : block.hinge_question.answer;
          extrasHtml += \`
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-\${hingeId}" onclick="document.getElementById('\${hingeId}').style.display = 'block'; this.style.display = 'none';" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
              <div id="\${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"\${hingeQuestionText}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  \${block.hinge_question.options.map((opt, i) => \`
                    <button onclick="
                      const parent = this.parentElement;
                      const explanation = parent.nextElementSibling;
                      for (let child of parent.children) {
                        child.style.pointerEvents = 'none';
                        if (child.dataset.index == \${correctIndex}) {
                          child.style.backgroundColor = '#dcfce7';
                          child.style.borderColor = '#22c55e';
                          child.style.color = '#166534';
                        }
                      }
                      if (\${i} !== \${correctIndex}) {
                        this.style.backgroundColor = '#fee2e2';
                        this.style.borderColor = '#ef4444';
                        this.style.color = '#991b1b';
                      }
                      explanation.style.display = 'block';
                    " data-index="\${i}" style="text-align: left; background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem;">
                      <span style="font-weight: bold; margin-right: 8px;">\${String.fromCharCode(65+i)}.</span> \${opt}
                    </button>
                  \`).join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> \${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          \`;
        }
        
        if (block.tasks && block.tasks.length > 0) {
          extrasHtml += \`<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">\`;
          block.tasks.forEach((task, tIdx) => {
             if (task.type === 'drag_drop_timeline') {
               const timelineId = \`dd-timeline-emb-\${index}-\${tIdx}\`;
               extrasHtml += \`<div id="\${timelineId}" style="margin-bottom: 20px;"></div>\`;
               window.postRenderHooks.push(() => {
                 import('./drag_drop_timeline.js').then(mod => {
                    mod.initDragDropTimeline(document.getElementById(timelineId), task);
                 });
               });
               return;
             }
             if (task.type === 'spectrum_mapper') {
               const spectrumId = \`spectrum-emb-\${index}-\${tIdx}\`;
               extrasHtml += \`<div id="\${spectrumId}" style="margin-bottom: 20px;"></div>\`;
               window.postRenderHooks.push(() => {
                 import('./spectrum_mapper.js').then(mod => {
                    mod.initSpectrumMapper(document.getElementById(spectrumId), task);
                 });
               });
               return;
             }
             const qPrefix = task.qNum ? \`Q\${task.qNum}. \` : "";
             const ansId = \`ans-emb-\${index}-\${tIdx}\`;
             const starterBtn = task.starter ? \`<button class="btn" onclick="window.toggleStarterById('starter-\${ansId}')" style="margin-left: 5px; padding: 4px 8px; font-size: 0.8rem; background: #e0f2fe; color: #0284c7; border: 1px solid #7dd3fc;"><i class="fa-solid fa-pen"></i> Starter</button>\` : "";
             const starterDiv = task.starter ? \`<div class="starter-box" id="starter-\${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">\${task.starter}</div>\` : "";
             extrasHtml += \`
               <div style="margin-bottom: 10px;">
                 <div style="font-size: 1.05rem; line-height: 1.6; color: #1e293b; margin-bottom: 8px;">\${window.formatBold(qPrefix + (task.text || task.question || ''))}</div>
                 <button class="btn btn-secondary" onclick="window.toggleAnswerById('\${ansId}')" style="padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show</button>
                 \${starterBtn}
                 \${starterDiv}
                 <div class="answer" id="\${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03; line-height: 1.6;">\${window.formatBold(task.model || task.model_answer || '')}</div>
               </div>
             \`;
          });
          extrasHtml += \`</div>\`;
        }

        let isSideQuest = styledContent.includes('</details>') && (block.title && block.title.includes('Side Quest'));
        if (isSideQuest) {
           styledContent = styledContent.replace('</details>', extrasHtml + '</details>');
           extrasHtml = '';
        }

        html += \`
            <div class="standard-narrative-container">
              \${imageHtml}
              <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${themeHeadingHtml}\${styledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          \`;

        html += extrasHtml;`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync('src/core_app.js', content);
    console.log("Successfully patched core_app.js!");
} else {
    console.log("Failed to find target string in core_app.js");
}
