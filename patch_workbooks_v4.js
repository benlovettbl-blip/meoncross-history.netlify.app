const fs = require('fs');

let wb = fs.readFileSync('generate_pupil_workbooks_reverted.js', 'utf8').replace(/\r\n/g, '\n');

let startMarker = '      let isGCSE = unitId === "weimar_nazi_germany" || unitId === "cme_new";\n      if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {';
let endMarkerMatch = wb.match(/\n\s*\/\/\s*Pair Share/);
let endMarker = endMarkerMatch[0].substring(1);

let parts = wb.split(startMarker);
let subparts = parts[1].split(endMarker);

let originalLogic = startMarker + subparts[0];

const newLogic = `
      let isGCSE = unitId === "weimar_nazi_germany" || unitId === "cme_new";
      if (currentUnitId === 'great_war') {
      let mergedItems = [];
      
      // 1. Merge all items in document order
      if (lesson.do_now) {
          if (lesson.do_now.type === 'mixed' && lesson.do_now.items) {
              lesson.do_now.items.forEach((item, idx) => mergedItems.push({ type: 'do_now_item', data: item, parent: lesson.do_now }));
          } else {
              mergedItems.push({ type: 'do_now', data: lesson.do_now });
          }
      }
      if (lesson.sources) lesson.sources.forEach((s) => mergedItems.push({ type: 'source', data: s }));
      if (lesson.tasks) lesson.tasks.forEach((t) => mergedItems.push({ type: 'task', data: t }));
      if (lesson.historians_corner) mergedItems.push({ type: 'historians_corner', data: lesson.historians_corner });
      if (lesson.narrative_blocks) lesson.narrative_blocks.forEach((b) => {
          if (b.tasks) b.tasks.forEach(t => mergedItems.push({ type: 'task', data: t }));
          if (b.source) mergedItems.push({ type: 'source', data: b.source });
      });
      if (lesson.extended) mergedItems.push({ type: 'extended', data: lesson.extended });
      if (lesson.gcse_task) mergedItems.push({ type: 'gcse_task', data: lesson.gcse_task });
      if (lesson.pair_share) mergedItems.push({ type: 'pair_share', data: lesson.pair_share });
      if (lesson.enquiry) mergedItems.push({ type: 'enquiry', data: {question: lesson.enquiry} });

      function extractQ(item) {
          let text = "";
          if (item.type === 'source') text = item.data.question || item.data.title;
          if (item.type === 'task') text = item.data.question || item.data.text || item.data.instruction || item.data.title;
          if (item.type === 'historians_corner') text = item.data.stretch_question || item.data.title;
          if (item.type === 'extended') text = item.data.question || item.data.prompt;
          if (item.type === 'gcse_task') text = item.data.question || item.data.title;
          if (item.type === 'pair_share') text = item.data.question || item.data.text;
          if (item.type === 'enquiry') text = item.data.question;
          if (item.type === 'do_now' || item.type === 'do_now_item') text = item.data.question || item.data.text || item.data.prediction_question;
          
          if (!text || typeof text !== 'string') return 999;
          const match = text.match(/Q(\\d+)/i);
          return match ? parseInt(match[1]) : 999;
      }
      
      mergedItems.forEach(item => { item.qSort = extractQ(item); });
      mergedItems.sort((a, b) => a.qSort - b.qSort);

      // 3. Sequential Q Assignment (Fixes missing numbers)
      let currentQ = 1;
      mergedItems.forEach(item => {
          let isQuestion = false;
          if (item.type === 'do_now_item' || item.type === 'task' || item.type === 'extended' || item.type === 'gcse_task' || item.type === 'pair_share') {
              isQuestion = true;
          } else if (item.type === 'source' && item.data.question) {
              isQuestion = true;
          }
          
          if (isQuestion) {
              item.qNum = currentQ++;
          }
          
          // Strip hardcoded "Qx. " or "Task x: " from the raw text
          if (item.data) {
              if (typeof item.data.text === 'string') item.data.text = item.data.text.replace(/^(Q\\d+\\.|Task\\s*\\d*:)\\s*/i, '');
              if (typeof item.data.question === 'string') item.data.question = item.data.question.replace(/^(Q\\d+\\.|Task\\s*\\d*:|Enquiry:)\\s*/i, '');
              if (typeof item.data.instruction === 'string') item.data.instruction = item.data.instruction.replace(/^(Q\\d+\\.|Task\\s*\\d*:)\\s*/i, '');
              if (typeof item.data.title === 'string' && item.type === 'task') item.data.title = item.data.title.replace(/^(Q\\d+\\.|Task\\s*\\d*:)\\s*/i, '');
          }
      });

      // 4. Render HTML Loop for Workbook
      mergedItems.forEach((item, idx) => {
          if (item.type === 'do_now_item') {
              html += \`
                <div style="margin-bottom: 10px;">
                    <div style="font-size: 9.5pt; font-weight: bold; margin-bottom: 5px;">Q\${item.qNum}. \${item.data.question}</div>
                    \${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(3)}
                </div>
              \`;
          }
          else if (item.type === 'do_now') {
              if (item.data.type === 'timeline') {
                  html += \`
                    <div class="do-now-box" style="padding: 5px; margin-bottom: 15px;">
                       <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                         <h3 style="margin: 0; font-size: 11pt;">Chronological Domino Flowchart</h3>
                       </div>
                       <p style="font-style: italic; color: #555; margin-top: 0; font-size: 9.5pt; margin-bottom: 5px;"><strong>Task:</strong> Draw arrows connecting the boxes in the correct chronological order.</p>
                       <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 10px; margin-bottom: 20px;">
                  \`;
                  let evs = item.data.events || [];
                  evs.forEach(ev => {
                      html += \`<div style="border: 2px dashed #94a3b8; padding: 8px; border-radius: 4px; text-align: center; min-width: 120px;">
                                 <strong>\${ev.text}</strong>
                               </div>\`;
                  });
                  html += \`</div><div style="clear: both;"></div>\`;
                  if (item.data.prediction_question) {
                     html += \`
                        <div style="font-size: 9.5pt; font-weight: bold; margin-bottom: 5px;">Q\${item.qNum || ''}. \${item.data.prediction_question}</div>
                        \${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(3)}
                     \`;
                  }
                  html += \`</div>\`;
              }
          }
          else if (item.type === 'source') {
             let source = item.data;
             let sourceContent = source.content || source.text;
             if((source.src || source.source) || source.caption || sourceContent) {
                html += \`
                  <div class="source-container" style="page-break-inside: avoid; border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
                    \${source.title ? \`<strong>\${badgeSource(source.title, 'S' + (idx + 1))}</strong><br>\` : ''}
                    \${(source.src || source.source) ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath((source.src || source.source), 2) : (source.src || source.source)}" style="max-height: 200px; display: block; margin: 5px auto;" alt="Source">\` : ''}
                    \${sourceContent ? \`<blockquote style="text-align: left; font-size: 10pt; margin-top: 5px;">\${formatText(sourceContent)}</blockquote>\` : ''}
                    \${source.question ? \`<div style="margin-top: 10px; text-align: left;"><strong>Q\${item.qNum}. \${source.question}</strong></div>\${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(3)}\` : ''}
                  </div>
                \`;
             }
          }
          else if (item.type === 'task') {
              let task = item.data;
              let isInteractive = task.title && task.title.toLowerCase().includes('interactive');
              html += \`<div class="task-box" style="margin-bottom: 15px;">\`;
              if (task.title) {
                 if (isInteractive) {
                     html += \`<strong style="font-size: 11pt;">Q\${item.qNum}. \${task.title}</strong><br>\`;
                 } else {
                     html += \`<strong style="font-size: 11pt;">\${task.title}</strong><br>\`;
                 }
              }
              if (task.instruction) html += \`<em style="font-size: 10pt;">\${task.instruction}</em><br>\`;
              if (task.text && !isInteractive) html += \`<div style="font-weight: bold; margin-top: 5px; margin-bottom: 5px;">Q\${item.qNum}. \${task.text}</div>\`;
              if (task.question && !task.text && !isInteractive) html += \`<div style="font-weight: bold; margin-top: 5px; margin-bottom: 5px;">Q\${item.qNum}. \${task.question}</div>\`;
              
              if (isInteractive) {
                  html += \`<div style="height: 150px; border: 2px dashed #cbd5e1; margin-top: 10px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">Interactive Task Area</div>\`;
              } else {
                  html += '<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(task.lines || 4);
              }
              html += \`</div>\`;
          }
          else if (item.type === 'historians_corner') {
             let h = item.data;
             html += \`
              <div class="historians-corner" style="border-left: 4px solid #8b5cf6; padding: 10px; margin-bottom: 15px; background: #f5f3ff;">
                  <h3 style="margin-top: 0; color: #6d28d9;">Historian's Corner</h3>
                  \${h.core_idea ? \`<p style="font-size: 10pt;"><strong>Core Idea:</strong> \${h.core_idea}</p>\` : ''}
                  \${h.stretch_question ? \`<div style="margin-top: 10px;"><strong>Stretch Question:</strong> \${h.stretch_question}</div>\${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(3)}\` : ''}
              </div>
             \`;
          }
          else if (item.type === 'extended') {
             let ext = item.data;
             html += \`
              <div class="extended-writing" style="margin-bottom: 15px;">
                  <h3 style="margin-top: 0;">Extended Writing</h3>
                  \${ext.prompt ? \`<div style="font-weight: bold; margin-bottom: 5px;">Q\${item.qNum}. \${ext.prompt}</div>\` : ''}
                  \${ext.question && !ext.prompt ? \`<div style="font-weight: bold; margin-bottom: 5px;">Q\${item.qNum}. \${ext.question}</div>\` : ''}
                  \${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(12)}
              </div>
             \`;
          }
          else if (item.type === 'gcse_task') {
             let g = item.data;
             html += \`
              <div class="gcse-task" style="border: 2px solid #b91c1c; padding: 10px; margin-bottom: 15px; border-radius: 5px;">
                  <h3 style="color: #b91c1c; margin-top: 0; margin-bottom: 5px;">GCSE Practice</h3>
                  \${g.title ? \`<div style="font-weight: bold; margin-bottom: 5px;">Q\${item.qNum}. \${g.title}</div>\` : ''}
                  \${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(8)}
              </div>
             \`;
          }
          else if (item.type === 'pair_share') {
             let ps = item.data;
             html += \`
              <div class="pair-share" style="margin-bottom: 15px;">
                  <h3 style="margin-top: 0;">Think-Pair-Share</h3>
                  \${ps.prompt ? \`<div style="font-weight: bold; margin-bottom: 5px;">Q\${item.qNum}. \${ps.prompt}</div>\` : ''}
                  \${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(3)}
              </div>
             \`;
          }
          else if (item.type === 'enquiry') {
             let enq = item.data;
             html += \`<div style="margin-bottom: 15px; padding: 10px; background-color: #f8fafc; border-left: 4px solid #3b82f6;">
                         <h3 style="margin-top: 0; color: #1e40af;">Lesson Enquiry</h3>
                         <div style="font-size: 1.1em; font-weight: bold; margin-bottom: 5px;">Q\${item.qNum}. \${enq.question}</div>
                         \${'<div class="task-lines" style="height: 12px; margin-top: 3px; border-bottom: 1px dotted #ccc;"></div>'.repeat(5)}
                      </div>\`;
          }
      });
    } else {
`;

let reconstructed = parts[0] + newLogic + "\n" + originalLogic + "\n    }\n" + endMarker + subparts[1];

// Fix teacher cutoff css
reconstructed = reconstructed.replace(/top: 80px;/g, "top: 60px;");
reconstructed = reconstructed.replace(/font-size: 48px; color: white;/g, "font-size: 40px; color: white;");

// Hide original do_now render for great war
reconstructed = reconstructed.replace("if (lesson.do_now) {", "if (lesson.do_now && currentUnitId !== 'great_war') {");

fs.writeFileSync('generate_pupil_workbooks.js', reconstructed);
console.log("Successfully rebuilt generate_pupil_workbooks.js");
