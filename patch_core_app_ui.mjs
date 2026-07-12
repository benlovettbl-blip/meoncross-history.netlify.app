import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Touchable Do Nows
content = content.replace(
  '<div class="do-now-card" id="do-now-card-${index}">',
  '<div class="do-now-card" id="do-now-card-${index}" onclick="this.classList.toggle(\'revealed\')" style="cursor: pointer;">'
);

// 2. Narrative Update (Drop caps, alternating backgrounds, and Level 4 toggle)
const oldNarrativeLoop = `      lesson.narrative.forEach((para, index) => {
        html += \`
          <div id="para-\${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease;">
            <div class="para-number">\${index + 1}</div>
            <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">\${highlightGlossary(para)}</div>
            <button class="btn btn-secondary" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        \`;
      });`;

const newNarrativeLoop = `      html += \`<div class="standard-narrative-container">\`;
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

content = content.replace(oldNarrativeLoop, newNarrativeLoop);

fs.writeFileSync(filePath, content, 'utf8');
console.log("core_app.js patched successfully.");
