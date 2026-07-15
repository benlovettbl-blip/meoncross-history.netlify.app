const fs = require('fs');

function patchFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Patch assignQuestionNumbers
  const oldAssign = `function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;

    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => { task.qNum = q++; console.log("Numbered task:", task.text.substring(0, 30)); });
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

  const newAssign = `function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source) {
      if (lesson.primary_source.question) lesson.primary_source.qNum = q++;
      if (lesson.primary_source.tasks) lesson.primary_source.tasks.forEach(task => task.qNum = q++);
    }

    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => { task.qNum = q++; });
      });
    }
    if (lesson.historians_corner) {
      if (lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = q++;
      if (lesson.historians_corner.hinge_question) lesson.historians_corner.qNum = q++;
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
    if (lesson.gcse_task) lesson.gcse_task.qNum = q++;
  }`;

  if (code.includes(oldAssign)) {
    code = code.replace(oldAssign, newAssign);
  }

  // 2. Patch primary_source rendering
  const oldPrimary = `// Primary Source at the top
  if (lesson.primary_source) {
    let src = lesson.primary_source.src.startsWith('../') || lesson.primary_source.src.startsWith('http') ? lesson.primary_source.src : \`../cme_new/\${lesson.primary_source.src}\`;
    html += \`
        \${lesson.primary_source.question ? \`<h3 style="margin-top: 0;">Q\${lesson.primary_source.qNum}. \${lesson.primary_source.question.replace('Enquiry: ', '')}</h3>\` : ''}
        \${lesson.primary_source.title ? \`<strong>\${lesson.primary_source.title}</strong><br>\` : ''}
        <div class="source-container">
          <img src="\${src}" alt="Primary Source" style="max-width: 100%; max-height: 250px; object-fit: contain; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
        \${lesson.primary_source.caption ? \`<div class="source-caption">\${lesson.primary_source.caption}</div>\` : ''}
      </div>
    \`;
  }`;
  
  const newPrimary = `// Primary Source at the top
  if (lesson.primary_source) {
    let src = lesson.primary_source.src.startsWith('../') || lesson.primary_source.src.startsWith('http') ? lesson.primary_source.src : \`../cme_new/\${lesson.primary_source.src}\`;
    html += \`
        \${lesson.primary_source.question ? \`<h3 style="margin-top: 0;">Q\${lesson.primary_source.qNum}. \${lesson.primary_source.question.replace('Enquiry: ', '')}</h3>\` : ''}
        \${lesson.primary_source.title ? \`<strong>\${lesson.primary_source.title}</strong><br>\` : ''}
        <div class="source-container">
          <img src="\${src}" alt="Primary Source" style="max-width: 100%; max-height: 250px; object-fit: contain; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
        \${lesson.primary_source.caption ? \`<div class="source-caption">\${lesson.primary_source.caption}</div>\` : ''}
      </div>
    \`;
    if (lesson.primary_source.tasks && lesson.primary_source.tasks.length > 0) {
      html += \`<div class="task-box" style="margin-top: 15px;">\`;
      lesson.primary_source.tasks.forEach(task => {
        let cleanTask = task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, '');
        html += \`<p style="margin-top:10px; font-weight: bold;">Q\${task.qNum}. \${cleanTask}</p>\`;
        html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
      });
      html += \`</div>\`;
    }
  }`;

  if (code.includes(oldPrimary)) {
    code = code.replace(oldPrimary, newPrimary);
  }

  // 3. Patch historians_corner
  const oldHC = `// Historians Corner
  if (lesson.historians_corner) {
    html += \`<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">\`;
    html += \`<h3 style="margin-top: 0;">Historian's Corner: \${lesson.historians_corner.title}</h3>\`;
    html += \`<p style="font-size: 11pt; font-style: italic;">\${lesson.historians_corner.text}</p>\`;
    html += \`</div>\`;
  }`;

  const newHC = `// Historians Corner
  if (lesson.historians_corner) {
    html += \`<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #1a237e; border-radius: 4px; padding: 15px;">\`;
    html += \`<h3 style="margin-top: 0; color: #1a237e;">Historian's Corner: \${lesson.historians_corner.title || ''}</h3>\`;
    if (lesson.historians_corner.author_context) {
      html += \`<p style="font-size: 10pt; color: #555; margin-bottom: 10px;">\${lesson.historians_corner.author_context}</p>\`;
    }
    if (lesson.historians_corner.extract) {
      html += \`<blockquote style="font-size: 11pt; font-style: italic; border-left: 4px solid #1a237e; margin: 10px 0; padding-left: 10px; background: #f8f9fa; padding: 10px;">"\${lesson.historians_corner.extract}"</blockquote>\`;
    } else if (lesson.historians_corner.text) {
      html += \`<p style="font-size: 11pt; font-style: italic;">\${lesson.historians_corner.text}</p>\`;
    }
    let hcQuestion = lesson.historians_corner.stretch_question || lesson.historians_corner.hinge_question;
    if (hcQuestion) {
      html += \`<p style="margin-top:15px; font-weight: bold;">Q\${lesson.historians_corner.qNum}. \${hcQuestion}</p>\`;
      html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
    }
    html += \`</div>\`;
  }`;

  if (code.includes(oldHC)) {
    code = code.replace(oldHC, newHC);
  }

  // 4. Patch GCSE Task at the end of the lesson loop
  const gcsePatchTarget = `    // If this block has tasks, print them immediately underneath`;
  const gcsePatch = `// Render GCSE Task
  if (lesson.gcse_task) {
    html += \`<div class="task-box" style="margin-top: 20px; border: 2px solid #b71c1c; background: #ffebee;">\`;
    html += \`<h3 style="margin-top: 0; color: #b71c1c;">\${lesson.gcse_task.title || 'GCSE Challenge Task'}</h3>\`;
    let cleanTask = (lesson.gcse_task.text || lesson.gcse_task.question || '').replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, '');
    html += \`<p style="font-weight: bold;">Q\${lesson.gcse_task.qNum}. \${cleanTask}</p>\`;
    for(let i=0; i<6; i++) {
        html += \`<div class="task-lines"></div>\`;
    }
    html += \`</div>\`;
  }

  ` + gcsePatchTarget;

  if (!code.includes('// Render GCSE Task')) {
     code = code.replace(gcsePatchTarget, gcsePatch);
  }
  
  // Also add pair_share rendering if present (water_and_sanitation has it? wait, no it doesn't, but let's be thorough)
  const pairShareTarget = `// Render GCSE Task`;
  const pairSharePatch = `// Render Pair & Share
  if (lesson.pair_share) {
    html += \`<div class="task-box" style="margin-top: 20px; border: 2px solid #004d40; background: #e0f2f1;">\`;
    html += \`<h3 style="margin-top: 0; color: #004d40;">Pair & Share</h3>\`;
    html += \`<p style="font-weight: bold;">\${lesson.pair_share.question || lesson.pair_share.text}</p>\`;
    html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
    html += \`</div>\`;
  }

  ` + pairShareTarget;
  
  if (!code.includes('// Render Pair & Share') && code.includes(pairShareTarget)) {
      code = code.replace(pairShareTarget, pairSharePatch);
  }

  fs.writeFileSync(filePath, code);
  console.log('Patched', filePath);
}

patchFile('./cme_new/generate_worksheets.js');
patchFile('./water_and_sanitation/generate_worksheets.js');
