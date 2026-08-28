const fs = require('fs');

function patchTextbooks() {
    let tb = fs.readFileSync('generate_textbooks.js', 'utf8').replace(/\r\n/g, '\n');

    const startMarker = "    let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');\n    if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {";
    const endMarker = "    // Pair Share";

    let parts = tb.split(startMarker);
    if (parts.length < 2) { console.log("Failed to split textbooks startMarker"); return; }
    let subparts = parts[1].split(endMarker);
    if (subparts.length < 2) { console.log("Failed to split textbooks endMarker"); return; }
    let oldLogic = startMarker + subparts[0];

    const newLogic = `
    let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');
    if (currentUnitId === 'great_war') {
      function extractQ(text) {
          if (!text) return 999;
          const match = text.match(/Q(\\d+)/i);
          return match ? parseInt(match[1]) : 999;
      }
      
      let mergedItems = [];
      if (lesson.sources) lesson.sources.forEach((s, sIdx) => mergedItems.push({ type: 'source', data: s, origIdx: sIdx, q: extractQ(s.question || s.title) }));
      if (lesson.tasks) lesson.tasks.forEach((t, tIdx) => mergedItems.push({ type: 'task', data: t, origIdx: tIdx, q: extractQ(t.question || t.text || t.instruction || t.title) }));
      if (lesson.historians_corner) mergedItems.push({ type: 'historians_corner', data: lesson.historians_corner, q: extractQ(lesson.historians_corner.stretch_question || lesson.historians_corner.title) });
      if (lesson.narrative_blocks) lesson.narrative_blocks.forEach((b, bIdx) => mergedItems.push({ type: 'narrative_block', data: b, origIdx: bIdx, q: b.tasks && b.tasks.length > 0 ? extractQ(b.tasks[0].question) : (b.source ? extractQ(b.source.question) : 999) }));
      if (lesson.extended) mergedItems.push({ type: 'extended', data: lesson.extended, q: extractQ(lesson.extended.question || lesson.extended.prompt) });
      if (lesson.gcse_task) mergedItems.push({ type: 'gcse_task', data: lesson.gcse_task, q: extractQ(lesson.gcse_task.question || lesson.gcse_task.title) });
      if (lesson.pair_share) mergedItems.push({ type: 'pair_share', data: lesson.pair_share, q: extractQ(lesson.pair_share.question || lesson.pair_share.text) });
      if (lesson.enquiry) mergedItems.push({ type: 'enquiry', data: {question: lesson.enquiry}, q: extractQ(lesson.enquiry) });

      // Stable sort: keep original order if q is the same (e.g. 999)
      mergedItems.sort((a, b) => a.q - b.q);

      mergedItems.forEach(item => {
          if (item.type === 'source') {
             let source = item.data;
             let sIdx = item.origIdx;
             let sourceContent = source.content || source.text;
             if((source.src || source.source) || source.caption || sourceContent) {
                if (source.question) source.qNum = syncQNum++;
                html += \`
                  <div class="source-container" style="">
                    <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Source_\${sIdx}]]</span>
                    \${source.title ? \`<strong>\${currentUnitId === 'great_war' ? badgeSource(source.title, 'S' + (sIdx + 1)) : badgeSource(source.title)}</strong><br>\` : ''}
                    \${(source.src || source.source) ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath((source.src || source.source), 2) : (source.src || source.source)}" alt="Source">\` : ''}
                    \${sourceContent ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">\${formatText(sourceContent)}</blockquote>\` : ''}
                    \${source.caption ? \`<div class="source-caption">\${source.caption}</div>\` : ''}
                    \${source.question ? \`<div style="margin-top: 15px; text-align: left;"><strong>Q\${source.qNum ? source.qNum + '.' : ''} \${source.question}\${source.page ? \` (See Textbook Page \${source.page})\` : ''}</strong></div>\` : ''}
                  </div>
                \`;
             }
          }
          else if (item.type === 'narrative_block') {
             let block = item.data;
             let bIdx = item.origIdx;
             if (block.images && Array.isArray(block.images)) {
                var blockSourceLetter = '';
                if ((block.images && block.images.some(i => i.source_letter)) || block.source) {
                   blockSourceLetter = String.fromCharCode(sourceCharCode++);
                }
                block.images.forEach(imgObj => {
                  let rawSrc = imgObj.src || imgObj.image;
                  if (rawSrc) {
                    let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(rawSrc, 2) : rawSrc;
                    if (src.toLowerCase().endsWith('.svg')) {
                        html += \`<img src="\${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto 5px auto; border-radius: 8px; border: 1.5px solid #475569; padding-top: 10px; padding-bottom: 10px; ">\`;
                    } else {
                        html += \`<img src="\${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto 5px auto; border-radius: 6px; border: 1px solid #ccc;">\`;
                    }
                    if (imgObj.image_caption || imgObj.image_alt) {
                        let caption = imgObj.image_caption || imgObj.image_alt;
                        html += \`<div style="text-align: center; font-size: 10pt; font-style: italic; color: #555; margin-bottom: 15px;">\${imgObj.source_letter ? \`<strong>Source \${imgObj.source_letter}:</strong> \` : ''}\${caption}</div>\`;
                    }
                  }
                });
              }
              
              if (block.source) {
                let sIdx = lesson.sources ? lesson.sources.length + bIdx : bIdx;
                if (block.source.question) block.source.qNum = syncQNum++;
                html += \`
                  <div class="source-container" style="page-break-inside: avoid; margin-bottom: 15px; margin-top: 15px; border-left: 3px solid #ccc; padding-left: 15px;">
                    <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Source_\${sIdx}]]</span>
                    \${block.source.title ? \`<strong>\${badgeSource ? badgeSource(block.source.title) : block.source.title}</strong><br>\` : ''}
                    \${(block.source.src || block.source.source) ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath((block.source.src || block.source.source), 2) : (block.source.src || block.source.source)}" alt="Source" style="max-width: 100%; max-height: 250px;">\` : ''}
                    \${block.source.content ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px; font-style: italic;">\${typeof formatText === 'function' ? formatText(block.source.content) : block.source.content}</blockquote>\` : ''}
                    \${block.source.caption ? \`<div class="source-caption">\${block.source.caption}</div>\` : ''}
                    \${block.source.question ? \`<div style="margin-top: 15px; text-align: left;"><strong>Q\${block.source.qNum ? block.source.qNum + '.' : ''} \${block.source.question}\${block.source.page ? \` (See Textbook Page \${block.source.page})\` : ''}</strong></div>\` : ''}
                  </div>
                \`;
              }
      
              if (block.image && (!block.images || block.images.length === 0)) {
                let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(block.image, 2) : block.image;
                if (src.toLowerCase().endsWith('.svg')) {
                    html += \`<img src="\${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto 5px auto; border-radius: 8px; border: 1.5px solid #475569; padding-top: 10px; padding-bottom: 10px; ">\`;
                } else {
                    html += \`<img src="\${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto 5px auto; border-radius: 6px; border: 1px solid #ccc;">\`;
                }
                if (block.image_alt) {
                    html += \`<div style="text-align: center; font-size: 10pt; font-style: italic; color: #555; margin-bottom: 15px;">\${block.source_letter ? \`<strong>Source \${block.source_letter}:</strong> \` : ''}\${block.image_alt}</div>\`;
                }
              }
              
              let textToRender = block.text || '';
              const kiRegex = /\\[Key Individual:\\s*([^\\]]+)\\]/ig;
              textToRender = textToRender.replace(kiRegex, (match, p1) => {
                  return \`<span style="color: #d97706; font-weight: bold; border: 1px solid #d97706; padding: 2px 4px; border-radius: 4px; font-size: 0.9em; margin-right: 4px;"><i class="fa-solid fa-user-tie"></i> \${p1.trim()}</span>\`;
              });
      
              if (textToRender) {
                html += \`<div class="narrative-block" style="text-align: left; font-size: 12pt; line-height: 1.6; margin-bottom: 15px;">\`;
                if (block.title) {
                  html += \`<h3 style="margin-top: 0; color: #334155;">\${formatText(block.title)}</h3>\`;
                }
                html += \`<p>\${formatText(textToRender)}</p>\`;
                html += \`</div>\`;
              }
      
              if (block.tasks && block.tasks.length > 0) {
                html += \`<div class="task-box">\`;
                html += \`<h4 style="margin-top: 0; margin-bottom: 10px; color: #1e3a8a;">Review Questions</h4>\`;
                block.tasks.forEach(task => {
                  if (task.question) task.qNum = syncQNum++;
                  let qText = task.question || task.text;
                  html += \`<p style="margin: 5px 0;"><strong>\${task.qNum ? 'Q' + task.qNum + '.' : ''}</strong> \${qText}\${task.marks ? \` [\${task.marks} marks]\` : ''}</p>\`;
                });
                html += \`</div>\`;
              }
      
              if (block.hinge_question) {
                if (block.hinge_question.question) block.hinge_question.qNum = syncQNum++;
                html += \`<div class="task-box" style="background-color: #fef08a; border-color: #eab308;">\`;
                html += \`<h4 style="margin-top: 0; margin-bottom: 10px; color: #a16207;">Class Discussion</h4>\`;
                let qText = block.hinge_question.question || block.hinge_question.text;
                html += \`<p style="margin: 5px 0;"><strong>\${block.hinge_question.qNum ? 'Q' + block.hinge_question.qNum + '.' : ''}</strong> \${qText}</p>\`;
                html += \`</div>\`;
              }
          }
          else if (item.type === 'pair_share') {
              if (item.data.question || item.data.text || item.data.prompt) item.data.qNum = syncQNum++;
              html += \`<div class="task-box" style="page-break-inside: avoid; margin-bottom: 15px; background-color: #e0f2fe; border-color: #38bdf8;">\`;
              html += \`<h3 style="margin-top: 0; color: #0369a1;"><i class="fa-solid fa-users"></i> Pair & Share Activity</h3>\`;
              let qText = item.data.prompt || item.data.question || item.data.text;
              html += \`<p style="font-weight: bold; margin-bottom: 10px;">\${item.data.qNum ? 'Q' + item.data.qNum + '.' : ''} \${qText}</p>\`;
              html += \`</div>\`;
          }
          else if (item.type === 'task') {
              let task = item.data;
              let tIdx = item.origIdx;
              if (task.question || task.text || task.instruction) task.qNum = syncQNum++;
              
              if (task.type === 'spectrum_mapper') {
                 html += \`<h2 style="text-align: center; margin-bottom: 30px;">\${task.text || 'Spectrum Planner'}</h2>\`;
                 html += \`<div style="margin-top: 50px; margin-bottom: 50px; position: relative;">\`;
                 html += \`<div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14pt; margin-bottom: 10px;">\`;
                 html += \`<div>\${task.labels[0]}</div><div>\${task.labels[1]}</div>\`;
                 html += \`</div>\`;
                 html += \`<div style="height: 4px;  width: 100%; position: relative;">\`;
                 html += \`<div style="position: absolute; left: 0%; top: -10px; width: 2px; height: 24px; "></div>\`;
                 html += \`<div style="position: absolute; left: 25%; top: -10px; width: 2px; height: 24px; "></div>\`;
                 html += \`<div style="position: absolute; left: 50%; top: -10px; width: 2px; height: 24px; "></div>\`;
                 html += \`<div style="position: absolute; left: 75%; top: -10px; width: 2px; height: 24px; "></div>\`;
                 html += \`<div style="position: absolute; left: 100%; top: -10px; width: 2px; height: 24px; "></div>\`;
                 html += \`</div></div>\`;
                 html += \`<h3 style="margin-top: 40px;">Factors to map:</h3>\`;
                 html += \`<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px;">\`;
                 task.items.forEach(item => {
                    html += \`<div style=" padding: 15px; width: 45%; border-radius: 8px;">\`;
                    html += \`<strong>\${item.title}</strong><br>\`;
                    if (item.desc) html += \`<span style="font-size: 0.9em; color: #555;">\${item.desc}</span>\`;
                    html += \`</div>\`;
                 });
                 html += \`</div>\`;
                 html += \`<h3>Notes & Paragraph Plan</h3>\`;
                 for(let i=0; i<15; i++) { html += \`<div style="border-bottom: 1px dotted #ccc; margin-top: 25px; width: 100%;"></div>\`; }
              }
              else if (task.type === "clinical_case_study") {
                  html += \`<div class="task-box">\`;
                  html += \`<h4 style="margin-top: 0;">\${task.qNum ? 'Q' + task.qNum + '.' : ''} Clinical Case Studies</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">
                   <thead><tr>
                     <th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">Patient</th>
                     <th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">Symptoms</th>
                     <th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">Diagnosis & Treatment</th>
                   </tr></thead>
                   <tbody>\`;
                  const patients = [
                    { name: "William", symptoms: "High fever, shivering, and large, painful black swellings (buboes) in his armpits." },
                    { name: "Agnes", symptoms: "Coughing up blood, severe chest pain, and struggling to breathe." },
                    { name: "John", symptoms: "Fingers and toes have turned completely black. High fever and vomiting." },
                    { name: "Thomas", symptoms: "A runny nose, a mild cough, and feeling a bit tired." },
                  ];
                  patients.forEach((p) => {
                    html += \`<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">\${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">\${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>\`;
                  });
                  html += \`</tbody></table></div>\`;
              }
              else if (task.type === "matching") {
                  html += \`<div class="task-box">\`;
                  html += \`<h4 style="margin-top: 0;">\${task.qNum ? 'Q' + task.qNum + '.' : ''} \${typeof processTaskTextWithTariff === 'function' ? processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '', typeof unitData !== 'undefined' ? unitData.is_ks3 : false) : (task.text || task.question || task.instruction || task.title || '')}</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>\`;
                  const rightMixed = [...task.pairs];
                  task.pairs.forEach((p, i) => {
                    html += \`<tr>
                     <td style="border:1px solid #333; padding:10px; width:40%;">\${(p.left || '').replace(/\\n/g, '<br>')}</td>
                     <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                     <td style="border:1px solid #333; padding:10px; width:40%;">\${(rightMixed[i].right || '').replace(/\\n/g, '<br>')}</td>
                   </tr>\`;
                  });
                  html += \`</tbody></table></div>\`;
              }
              else if (task.type === "table_planner") {
                  html += \`<div class="task-box">\`;
                  html += \`<h4 style="margin-top: 0;">\${task.qNum ? 'Q' + task.qNum + '.' : ''} \${typeof processTaskTextWithTariff === 'function' ? processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '', typeof unitData !== 'undefined' ? unitData.is_ks3 : false) : (task.text || task.question || task.instruction || task.title || '')}</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>\`;
                  task.columns.forEach((c) => {
                    html += \`<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">\${c}</th>\`;
                  });
                  html += \`</tr></thead><tbody>\`;
                  for (let i = 0; i < task.rows; i++) {
                    html += \`<tr>\`;
                    task.columns.forEach(() => {
                      html += \`<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>\`;
                    });
                    html += \`</tr>\`;
                  }
                  html += \`</tbody></table></div>\`;
              }
              else if (task.type === "think_pair_share") {
                  html += \`<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">\`;
                  html += \`<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: \${task.qNum ? 'Q' + task.qNum + '.' : ''} \${typeof processTaskTextWithTariff === 'function' ? processTaskTextWithTariff(task.text || task.question, typeof unitData !== 'undefined' ? unitData.is_ks3 : false) : (task.text || task.question)}</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
                   <thead><tr>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
                   </tr></thead>
                   <tbody><tr>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                   </tr></tbody>
                 </table></div>\`;
              }
              else if (task.type === 'vocab_match' || ((unitId === 'great_war' || unitId === 'great_war_part2') && task.type === 'drag_drop_timeline')) {
                  // Do nothing
              }
              else {
                  html += \`<div class="task-box" style="page-break-inside: auto;">\`;
                  let qText = task.question || task.text || task.instruction || task.instructions || task.title || '';
                  let match = qText.match(/^([A-Za-z0-9'\\-\\/ ]+):\\s*(.*)/);
                  if (match) {
                      let subhead = match[1];
                      let rest = match[2];
                      html += \`<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">\${subhead}</h4>\`;
                      html += \`<p style="font-weight: bold; margin-top: 0;">\${task.qNum ? 'Q' + task.qNum + '.' : ''} \${rest}</p>\`;
                  } else {
                      html += \`<p style="font-weight: bold; margin-top: 0;">\${task.qNum ? 'Q' + task.qNum + '.' : ''} \${qText}</p>\`;
                  }
                  
                  if (task.type === 'extended_writing' && task.instructions) {
                      html += \`<p style="font-style: italic; color: #334155; margin-bottom: 5px; margin-top: 5px; font-size: 10pt;">\${task.instructions}</p>\`;
                  }
                  let linesToDraw = 3;
                  let tText = (task.text || task.question || task.instruction || task.instructions || '').toLowerCase();
                  if (task.type === 'extended_writing') {
                     linesToDraw = 18;
                  } else if (task.type === 'analysis' || task.type === 'debate' || tText.includes('explain') || tText.includes('describe') || tText.includes('two ') || tText.length > 60) {
                     linesToDraw = 6;
                  }
                  html += \`</div>\`;
              }
          }
          else if (item.type === 'extended') {
              let ext = item.data;
              html += \`<h3 style="margin-top: 40px; page-break-before: auto;">\${ext.title || 'Extended Scholarship'}</h3>\`;
              if (ext.paragraphs) {
                  ext.paragraphs.forEach(para => {
                    html += \`<p class="narrative-block" style="font-size: 12pt; color: #444;">\${formatText(para)}</p>\`;
                  });
              }
          }
          else if (item.type === 'historians_corner') {
              let hc = item.data;
              if (hc.stretch_question) hc.qNum = syncQNum++;
              html += \`<div class="task-box" style=" ">\`;
              html += \`<h3 style="margin-top: 0;">Historian's Corner: \${hc.title}</h3>\`;
              html += \`<p style="font-size: 12pt; font-style: italic;">\${formatText(hc.text)}</p>\`;
              if (hc.stretch_question) {
                  html += \`<div style="margin-top: 15px; font-weight: bold;">\${hc.qNum ? 'Q' + hc.qNum + '.' : ''} \${hc.stretch_question}</div>\`;
              }
              html += \`</div>\`;
          }
          else if (item.type === 'enquiry') {
              let enq = item.data;
              enq.qNum = syncQNum++;
              html += \`<div class="task-box" style="background-color: #ffedd5; border-color: #fdba74;">\`;
              html += \`<h4 style="margin-top: 0; margin-bottom: 10px; color: #c2410c;">Enquiry Focus</h4>\`;
              html += \`<p style="margin: 5px 0;"><strong>\${enq.qNum ? 'Q' + enq.qNum + '.' : ''}</strong> \${enq.question}</p>\`;
              html += \`</div>\`;
          }
      });
    } else {
`;
    
    let finalCode = parts[0] + newLogic + oldLogic + "\n    }\n" + endMarker + subparts[1];
    
    // Patch assignChronologicalNumbers call for textbooks
    finalCode = finalCode.replace(
      `syncQNum = assignChronologicalNumbers(lesson, syncQNum, currentUnitId);`,
      `if (currentUnitId !== 'great_war') {\n      syncQNum = assignChronologicalNumbers(lesson, syncQNum, currentUnitId);\n    }`
    );
    
    fs.writeFileSync('generate_textbooks.js', finalCode);
    console.log('generate_textbooks.js patched successfully!');
}

function patchWorkbooks() {
    let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8').replace(/\r\n/g, '\n');

    // 1. Remove checkAndAdd for great_war
    wb = wb.replace(
      `unitData.lessons.forEach((l) => {`,
      `unitData.lessons.forEach((l) => {\n    if (unitId === 'great_war') return;`
    );

    // 2. Find start and end markers for HTML rendering loop
    const startMarker = "      let isGCSE = unitId === \"weimar_nazi_germany\" || unitId === \"cme_new\";\n      if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {";
    const endMarker = "      // Extended Scholarship";

    let parts = wb.split(startMarker);
    if (parts.length < 2) { console.log("Failed to split workbooks startMarker"); return; }
    let subparts = parts[1].split(endMarker);
    if (subparts.length < 2) { console.log("Failed to split workbooks endMarker"); return; }
    let oldLogic = startMarker + subparts[0];

    const newLogic = `
    let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');
    if (currentUnitId === 'great_war') {
      function extractQ(text) {
          if (!text) return 999;
          const match = text.match(/Q(\\d+)/i);
          return match ? parseInt(match[1]) : 999;
      }
      
      let mergedItems = [];
        if (lesson.sources) lesson.sources.forEach((s, sIdx) => mergedItems.push({ type: 'source', data: s, origIdx: sIdx, q: extractQ(s.question || s.title) }));
      if (lesson.tasks) lesson.tasks.forEach((t, tIdx) => mergedItems.push({ type: 'task', data: t, origIdx: tIdx, q: extractQ(t.question || t.text || t.instruction || t.title) }));
      if (lesson.historians_corner) mergedItems.push({ type: 'historians_corner', data: lesson.historians_corner, q: extractQ(lesson.historians_corner.stretch_question || lesson.historians_corner.title) });
      if (lesson.narrative_blocks) lesson.narrative_blocks.forEach((b, bIdx) => mergedItems.push({ type: 'narrative_block', data: b, origIdx: bIdx, q: b.tasks && b.tasks.length > 0 ? extractQ(b.tasks[0].question) : (b.source ? extractQ(b.source.question) : 999) }));
      if (lesson.extended) mergedItems.push({ type: 'extended', data: lesson.extended, q: extractQ(lesson.extended.question || lesson.extended.prompt) });
      if (lesson.gcse_task) mergedItems.push({ type: 'gcse_task', data: lesson.gcse_task, q: extractQ(lesson.gcse_task.question || lesson.gcse_task.title) });
      if (lesson.pair_share) mergedItems.push({ type: 'pair_share', data: lesson.pair_share, q: extractQ(lesson.pair_share.question || lesson.pair_share.text) });
      if (lesson.enquiry) mergedItems.push({ type: 'enquiry', data: {question: lesson.enquiry}, q: extractQ(lesson.enquiry) });

      mergedItems.sort((a, b) => a.q - b.q);

      mergedItems.forEach(item => {
          if (item.type === 'narrative_block') {
             let block = item.data;
             let bIdx = item.origIdx;
             if (block.tasks) {
                 block.tasks.forEach((task, tIdx) => { 
                     if (currentUnitId === 'great_war' || currentUnitId === 'great_war_part2') { 
                         if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, ''); 
                         if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, ''); 
                     } 
                     if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') { task.qNum = globalQNum++; }
                     
                     html += \`<div class="task-box">\`;
                     html += \`<p style="margin-top:10px;"><span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Task_\${bIdx}_\${tIdx}]]</span><strong>Q\${task.qNum}. \${task.text || task.question || task.instruction || task.instructions || task.title || ''}</strong></p>\`;
                     if (task.type === 'extended_writing' && task.instructions) {
                         html += \`<p style="font-style: italic; color: #334155; margin-bottom: 5px; margin-top: 5px; font-size: 10pt;">\${task.instructions}</p>\`;
                     }
                     let linesToDraw = 3;
                     let tText = (task.text || task.question || task.instruction || task.instructions || '').toLowerCase();
                     if (task.type === 'extended_writing') {
                        linesToDraw = 18;
                     } else if (task.type === 'analysis' || task.type === 'debate' || tText.includes('explain') || tText.includes('describe') || tText.includes('two ') || tText.length > 60) {
                        linesToDraw = 6;
                     }
                     for(let i=0; i<linesToDraw; i++) { html += \`<div class="writing-line"></div>\`; }
                     html += \`</div>\`;
                 });
             }
             if (block.hinge_question) { 
                 block.hinge_question.qNum = globalQNum++; 
                 html += \`<div class="task-box" style="background-color: #fef08a; border-color: #eab308;">\`;
                 html += \`<h4 style="margin-top: 0; margin-bottom: 10px; color: #a16207;">Class Discussion</h4>\`;
                 let qText = block.hinge_question.question || block.hinge_question.text;
                 html += \`<p style="margin: 5px 0;"><strong>Q\${block.hinge_question.qNum}.</strong> \${qText}</p>\`;
                 for(let i=0; i<3; i++) { html += \`<div class="writing-line"></div>\`; }
                 html += \`</div>\`;
             }
             if (block.source && block.source.question) { 
                 block.source.qNum = globalQNum++; 
                 html += \`<div class="task-box">\`;
                 html += \`<p style="font-weight: bold; margin-bottom: 10px;">Q\${block.source.qNum}. \${block.source.question}</p>\`;
                 for(let i=0; i<4; i++) { html += \`<div class="writing-line"></div>\`; }
                 html += \`</div>\`;
             }
          }
          else if (item.type === 'pair_share') {
              item.data.qNum = globalQNum++;
              html += \`<div class="task-box" style="page-break-inside: avoid; margin-bottom: 15px; background-color: #e0f2fe; border-color: #38bdf8;">\`;
              html += \`<h3 style="margin-top: 0; color: #0369a1;"><i class="fa-solid fa-users"></i> Pair & Share Activity</h3>\`;
              html += \`<p style="font-weight: bold; margin-bottom: 10px;">Q\${item.data.qNum}. \${item.data.prompt || item.data.question || item.data.text}</p>\`;
              for(let i=0; i<4; i++) { html += \`<div class="writing-line"></div>\`; }
              html += \`</div>\`;
          }
          else if (item.type === 'task') {
              let task = item.data;
              let tIdx = item.origIdx;
              if (currentUnitId === 'great_war' || currentUnitId === 'great_war_part2') { 
                  if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, ''); 
                  if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, ''); 
              } 
              if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') { task.qNum = globalQNum++; }
              
              if (task.type === 'spectrum_mapper') {
                 html += \`<h2 style="text-align: center; margin-bottom: 30px;">\${task.text || 'Spectrum Planner'}</h2>\`;
                 html += \`<div style="margin-top: 50px; margin-bottom: 50px; position: relative;">\`;
                 html += \`<div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14pt; margin-bottom: 10px;">\`;
                 html += \`<div>\${task.labels[0]}</div><div>\${task.labels[1]}</div>\`;
                 html += \`</div>\`;
                 html += \`<div style="height: 4px; border-bottom: 4px solid #334155; width: 100%; position: relative;">\`;
                 html += \`<div style="position: absolute; left: 0%; top: -10px; width: 2px; height: 24px; background: #334155;"></div>\`;
                 html += \`<div style="position: absolute; left: 25%; top: -10px; width: 2px; height: 24px; background: #334155;"></div>\`;
                 html += \`<div style="position: absolute; left: 50%; top: -10px; width: 2px; height: 24px; background: #334155;"></div>\`;
                 html += \`<div style="position: absolute; left: 75%; top: -10px; width: 2px; height: 24px; background: #334155;"></div>\`;
                 html += \`<div style="position: absolute; left: 100%; top: -10px; width: 2px; height: 24px; background: #334155;"></div>\`;
                 html += \`</div></div>\`;
                 html += \`<h3 style="margin-top: 40px;">Factors to map:</h3>\`;
                 html += \`<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px;">\`;
                 task.items.forEach(item => {
                    html += \`<div style=" padding: 15px; width: 45%; border-radius: 8px;">\`;
                    html += \`<strong>\${item.title}</strong><br>\`;
                    if (item.desc) html += \`<span style="font-size: 0.9em; color: #555;">\${item.desc}</span>\`;
                    html += \`</div>\`;
                 });
                 html += \`</div>\`;
                 html += \`<h3>Notes & Paragraph Plan</h3>\`;
                 for(let i=0; i<15; i++) { html += \`<div class="writing-line"></div>\`; }
              }
              else if (task.type === "clinical_case_study") {
                  html += \`<div class="task-box">\`;
                  html += \`<h4 style="margin-top: 0;">Q\${task.qNum || ""} Clinical Case Studies</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">
                   <thead><tr>
                     <th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">Patient</th>
                     <th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">Symptoms</th>
                     <th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">Diagnosis & Treatment</th>
                   </tr></thead>
                   <tbody>\`;
                  const patients = [
                    { name: "William", symptoms: "High fever, shivering, and large, painful black swellings (buboes) in his armpits." },
                    { name: "Agnes", symptoms: "Coughing up blood, severe chest pain, and struggling to breathe." },
                    { name: "John", symptoms: "Fingers and toes have turned completely black. High fever and vomiting." },
                    { name: "Thomas", symptoms: "A runny nose, a mild cough, and feeling a bit tired." },
                  ];
                  patients.forEach((p) => {
                    html += \`<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">\${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">\${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>\`;
                  });
                  html += \`</tbody></table></div>\`;
              }
              else if (task.type === "matching") {
                  html += \`<div class="task-box">\`;
                  html += \`<h4 style="margin-top: 0;">Q\${task.qNum || ""} \${typeof processTaskTextWithTariff === 'function' ? processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '', typeof unitData !== 'undefined' ? unitData.is_ks3 : false) : (task.text || task.question || task.instruction || task.title || '')}</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>\`;
                  const rightMixed = [...task.pairs];
                  task.pairs.forEach((p, i) => {
                    html += \`<tr>
                     <td style="border:1px solid #333; padding:10px; width:40%;">\${(p.left || '').replace(/\\n/g, '<br>')}</td>
                     <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                     <td style="border:1px solid #333; padding:10px; width:40%;">\${(rightMixed[i].right || '').replace(/\\n/g, '<br>')}</td>
                   </tr>\`;
                  });
                  html += \`</tbody></table></div>\`;
              }
              else if (task.type === "table_planner") {
                  html += \`<div class="task-box">\`;
                  html += \`<h4 style="margin-top: 0;">Q\${task.qNum || ""} \${typeof processTaskTextWithTariff === 'function' ? processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '', typeof unitData !== 'undefined' ? unitData.is_ks3 : false) : (task.text || task.question || task.instruction || task.title || '')}</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>\`;
                  task.columns.forEach((c) => {
                    html += \`<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">\${c}</th>\`;
                  });
                  html += \`</tr></thead><tbody>\`;
                  for (let i = 0; i < task.rows; i++) {
                    html += \`<tr>\`;
                    task.columns.forEach(() => {
                      html += \`<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>\`;
                    });
                    html += \`</tr>\`;
                  }
                  html += \`</tbody></table></div>\`;
              }
              else if (task.type === "think_pair_share") {
                  html += \`<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">\`;
                  html += \`<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q\${task.qNum || ""} \${typeof processTaskTextWithTariff === 'function' ? processTaskTextWithTariff(task.text || task.question, typeof unitData !== 'undefined' ? unitData.is_ks3 : false) : (task.text || task.question)}</h4>\`;
                  html += \`<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
                   <thead><tr>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
                   </tr></thead>
                   <tbody><tr>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                   </tr></tbody>
                 </table></div>\`;
              }
              else if (task.type === 'vocab_match' || ((unitId === 'great_war' || unitId === 'great_war_part2') && task.type === 'drag_drop_timeline')) {
                  // Do nothing
              }
              else {
                  html += \`<div class="task-box" style="page-break-inside: auto;">\`;
                  let qText = task.question || task.text || task.instruction || task.instructions || task.title || '';
                  let match = qText.match(/^([A-Za-z0-9'\\-\\/ ]+):\\s*(.*)/);
                  if (match) {
                      let subhead = match[1];
                      let rest = match[2];
                      html += \`<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">\${subhead}</h4>\`;
                      html += \`<p style="font-weight: bold; margin-top: 0;">Q\${task.qNum || ""}. \${rest}</p>\`;
                  } else {
                      html += \`<p style="font-weight: bold; margin-top: 0;">Q\${task.qNum || ""}. \${qText}</p>\`;
                  }
                  
                  if (task.type === 'extended_writing' && task.instructions) {
                      html += \`<p style="font-style: italic; color: #334155; margin-bottom: 5px; margin-top: 5px; font-size: 10pt;">\${task.instructions}</p>\`;
                  }
                  let hasExamTaskLater = lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
                  let numLines = (!hasExamTaskLater && tIdx === (lesson.tasks ? lesson.tasks.length - 1 : 0)) ? 20 : 6;
                  for(let i=0; i<numLines; i++) {
                      html += \`<div class="writing-line"></div>\`;
                  }
                  html += \`</div>\`;
              }
          }
          else if (item.type === 'extended') {
              if (item.data.question) item.data.qNum = globalQNum++;
          }
          else if (item.type === 'historians_corner') {
              let hc = item.data;
              if (hc.stretch_question) hc.qNum = globalQNum++;
              html += \`<div class="task-box" style="background-color: #f3e8ff; border-color: #c084fc; page-break-inside: avoid; margin-top: 20px;">\`;
              html += \`<h3 style="margin-top: 0; color: #7e22ce;"><i class="fa-solid fa-book-journal-whills"></i> Historian's Corner: \${hc.title}</h3>\`;
              html += \`<p style="font-size: 11pt; font-style: italic; color: #581c87;">\${hc.text}</p>\`;
              if (hc.stretch_question) {
                  html += \`<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #c084fc;">\`;
                  html += \`<p style="margin: 0; font-weight: bold; color: #7e22ce;">Stretch: Q\${hc.qNum}. \${hc.stretch_question}</p>\`;
                  for(let i=0; i<6; i++) { html += \`<div class="writing-line"></div>\`; }
                  html += \`</div>\`;
              }
              html += \`</div>\`;
          }
          else if (item.type === 'enquiry') {
              let enq = item.data;
              enq.qNum = globalQNum++;
              html += \`<div class="task-box" style="background-color: #ffedd5; border-color: #fdba74;">\`;
              html += \`<h4 style="margin-top: 0; margin-bottom: 10px; color: #c2410c;">Enquiry Focus</h4>\`;
              html += \`<p style="margin: 5px 0;"><strong>Q\${enq.qNum}.</strong> \${enq.question}</p>\`;
              for(let i=0; i<4; i++) { html += \`<div class="writing-line"></div>\`; }
              html += \`</div>\`;
          }
          else if (item.type === 'source') {
              if (item.data.question) {
                  item.data.qNum = globalQNum++;
                  html += \`<div class="task-box">\`;
                  html += \`<p style="font-weight: bold; margin-bottom: 10px;">Q\${item.data.qNum}. \${item.data.question}</p>\`;
                  for(let i=0; i<4; i++) { html += \`<div class="writing-line"></div>\`; }
                  html += \`</div>\`;
              }
          }
      });
    } else {
`;

    let finalWbCode = parts[0] + newLogic + oldLogic + "\n    }\n" + endMarker + subparts[1];

    fs.writeFileSync('generate_pupil_workbooks.js', finalWbCode);
    console.log('generate_pupil_workbooks.js patched successfully!');
}

patchTextbooks();
patchWorkbooks();
