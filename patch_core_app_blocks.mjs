import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldNarrativeLogic = `    if (lesson.narrative && lesson.narrative.length > 0) {
      let enquiryTitle = lesson.title.replace(/^Lesson\\s*\\d+:\\s*/i, '');
      html += \`
        <div class="phase-card" id="phase-\${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">Phase \${phaseNum++}: \${enquiryTitle}</div>
          </div>
      \`;
      html += \`<div class="standard-narrative-container">\`;
      lesson.narrative.forEach((para, index) => {
        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';
        const isQuote = typeof para === 'string' && para.startsWith('"');
        let contentStr = isQuote ? \`<em style="font-size:1.1rem; color:#475569;">\${para}</em>\` : highlightGlossary(para);
        let styledContent = contentStr;
        if (!isQuote && !contentStr.includes('<pre') && contentStr.length > 20) {
           const firstLetter = contentStr.charAt(0);
           const rest = contentStr.slice(1);
           styledContent = \`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">\${firstLetter}</span>\` + rest;
        }

        html += \`
          <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div class="para-number">\${index + 1}</div>
            <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${styledContent}</div>
            <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        \`;
      });
      html += \`</div>\`;

      if (lesson.level_4_narrative) {
         html += \`<div class="level4-narrative-container" style="display: none;">\`;
         lesson.level_4_narrative.forEach((para, index) => {
            const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';
            const isQuote = typeof para === 'string' && para.startsWith('"');
            let contentStr = isQuote ? \`<em style="font-size:1.1rem; color:#475569;">\${para}</em>\` : highlightGlossary(para);
            let styledContent = contentStr;
            if (!isQuote && !contentStr.includes('<pre') && contentStr.length > 20) {
               const firstLetter = contentStr.charAt(0);
               const rest = contentStr.slice(1);
               styledContent = \`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">\${firstLetter}</span>\` + rest;
            }
            html += \`
              <div id="para-l4-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;"><strong>[Level 4 Standard]</strong> <br> \${styledContent}</div>
                <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            \`;
         });
         html += \`</div>\`;
      }`;

const newNarrativeLogic = `    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
      let enquiryTitle = lesson.title.replace(/^Lesson\\s*\\d+:\\s*/i, '');
      html += \`
        <div class="phase-card" id="phase-\${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">Phase \${phaseNum++}: \${enquiryTitle}</div>
          </div>
      \`;
      
      lesson.narrative_blocks.forEach((block, index) => {
        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';
        const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
        let contentStr = isQuote ? \`<em style="font-size:1.1rem; color:#475569;">\${block.text}</em>\` : highlightGlossary(block.text);
        let styledContent = contentStr;
        if (!isQuote && !contentStr.includes('<pre') && contentStr.length > 20) {
           const firstLetter = contentStr.charAt(0);
           const rest = contentStr.slice(1);
           styledContent = \`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">\${firstLetter}</span>\` + rest;
        }
        
        let l4ContentStr = isQuote ? \`<em style="font-size:1.1rem; color:#475569;">\${block.level_4}</em>\` : highlightGlossary(block.level_4);
        let l4StyledContent = l4ContentStr;
        if (!isQuote && !l4ContentStr.includes('<pre') && l4ContentStr.length > 20) {
           const firstLetter = l4ContentStr.charAt(0);
           const rest = l4ContentStr.slice(1);
           l4StyledContent = \`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">\${firstLetter}</span>\` + rest;
        }

        // Render Standard Narrative Chunk
        html += \`
          <div class="standard-narrative-container">
            <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <div class="para-number">\${index + 1}</div>
              <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${styledContent}</div>
              <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        \`;

        // Render Level 4 Narrative Chunk
        if (block.level_4) {
          html += \`
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: \${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">\${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;"><strong>[Level 4 Standard]</strong> <br> \${l4StyledContent}</div>
                <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
          \`;
        }
        
        // Render Embedded Tasks for this chunk!
        if (block.tasks && block.tasks.length > 0) {
          html += \`<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">\`;
          html += \`<h4 style="margin-top: 0; color: #b45309; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-pen-to-square"></i> Knowledge Check</h4>\`;
          block.tasks.forEach(task => {
             html += \`
               <div style="margin-bottom: 10px;">
                 <strong>\${task.text.replace(/\\s*\\(P\\d+\\)/gi, '')}</strong>
                 <button class="btn btn-secondary" onclick="this.nextElementSibling.classList.toggle('revealed')" style="margin-left: 10px; padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show Model</button>
                 <div class="answer" style="margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03;">\${task.model}</div>
               </div>
             \`;
          });
          html += \`</div>\`;
        }
      });`;

content = content.replace(oldNarrativeLogic, newNarrativeLogic);

// We must also remove the old Knowledge Check rendering loop from core_app.js
const oldTasksLogicRegex = /\/\/ PHASE: Application Tasks[\s\S]*?(?=\/\/ PHASE: Historian's Corner|\/\/ PHASE: Plenary)/;
content = content.replace(oldTasksLogicRegex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log("core_app.js block rendering patched successfully.");
