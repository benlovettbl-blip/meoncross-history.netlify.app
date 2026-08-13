const fs = require('fs');

let path = 'src/core_app.js';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `
          htmlNarrative += \`
              <div class="standard-narrative-container">
                \${imageHtml}
                <div id="para-\${index + 1}" class="narrative-chunk"`;

const newStr = `
        let blockSourceHtml = '';
        if (block.source) {
             let sourceContentHtml = '';
             if (block.source.type === 'written') {
                 sourceContentHtml = \`
                   <div style="width: 100%; max-height: 350px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 15px; font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.6; color: #422006; box-shadow: inset 0 0 10px rgba(0,0,0,0.02);">
                     <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                     \${block.source.content}
                   </div>
                 \`;
             } else {
                 sourceContentHtml = \`
                    <div style="width: 100%; max-height: 400px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                      <img src="\${getAssetUrl(block.source.source || block.source.src)}" alt="Source" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" onclick="window.openModal(this.src)">
                    </div>
                 \`;
             }

             blockSourceHtml = \`
              <div class="gcse-source-container" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: left;">
                \${block.source.title ? \`<h4 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center;">
                  <i class="fa-solid fa-file-lines" style="color: #3b82f6; margin-right: 10px;"></i>
                  \${block.source.title}
                </h4>\` : ''}
                \${sourceContentHtml}
                \${block.source.provenance_clue ? \`
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px; margin-top: 15px;">
                    <strong style="color: #166534; display: block; margin-bottom: 5px;"><i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Provenance Clue:</strong>
                    <span style="color: #15803d; font-size: 0.95rem;">\${block.source.provenance_clue}</span>
                  </div>
                \` : ''}
                \${block.source.question ? \`<div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>\${block.source.qNum ? \`Q\${block.source.qNum}. \` : ''}\${formatQuestion(block.source.question, !block.source.qNum)}</strong></p>
                </div>\` : ''}
              </div>
             \`;
        }

          htmlNarrative += \`
              <div class="standard-narrative-container">
                \${imageHtml}
                \${blockSourceHtml}
                <div id="para-\${index + 1}" class="narrative-chunk"`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    
    // Now add question number assignment logic for block.source
    const qNumTarget = `if (block.tasks) block.tasks.forEach(task => { if (task.type !== 'vocab_match') task.qNum = globalQNum++; });`;
    const qNumNew = `if (block.source && block.source.question) block.source.qNum = globalQNum++;\n          if (block.tasks) block.tasks.forEach(task => { if (task.type !== 'vocab_match') task.qNum = globalQNum++; });`;
    if (content.includes(qNumTarget)) {
       content = content.replace(qNumTarget, qNumNew);
    }
    
    // Now add whiteboard logic
    const wbTarget = `if (block.tasks) {
            block.tasks.forEach(task => {
              if (task.type !== 'vocab_match') {
                addQuestionCard(task.qNum, task.text || task.question || '', task.model || task.model_answer || '');
              }
            });
          }`;
    const wbNew = `if (block.source && block.source.question) {
            addQuestionCard(block.source.qNum, block.source.question, block.source.model_answer || '');
          }
          if (block.tasks) {
            block.tasks.forEach(task => {
              if (task.type !== 'vocab_match') {
                addQuestionCard(task.qNum, task.text || task.question || '', task.model || task.model_answer || '');
              }
            });
          }`;
    if (content.includes(wbTarget)) {
       content = content.replace(wbTarget, wbNew);
    }
    
    fs.writeFileSync(path, content);
    console.log('Successfully updated core_app.js!');
} else {
    console.log('Target string not found in core_app.js');
}
