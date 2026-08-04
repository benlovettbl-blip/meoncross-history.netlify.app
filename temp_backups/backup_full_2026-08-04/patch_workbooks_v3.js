const fs = require('fs');
let code = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. CSS adjustments
code = code.replace(/@page \{ size: A4 portrait; margin: 15mm; \}/, '@page { size: A4 portrait; margin: 10mm; }');
code = code.replace(/body \{ font-family: 'Inter', sans-serif; font-size: 11pt; line-height: 1.5;/, "body { font-family: 'Inter', sans-serif; font-size: 10pt; line-height: 1.3;");
code = code.replace(/\.task-box \{ border: 2px solid #cbd5e1; padding: 18px; margin-top: 20px; margin-bottom: 20px;/, ".task-box { border: 2px solid #cbd5e1; padding: 10px; margin-top: 15px; margin-bottom: 15px;");
code = code.replace(/\.task-lines \{ border-bottom: 1px solid #94a3b8; height: 35px; margin-top: 15px; \}/, ".task-lines { border-bottom: 1px solid #94a3b8; height: 30px; margin-top: 15px; }");
code = code.replace(/\.task-lines-large \{ border-bottom: 1px solid #94a3b8; height: 45px; margin-top: 20px; \}/, ".task-lines-large { border-bottom: 1px solid #94a3b8; height: 30px; margin-top: 15px; }");
code = code.replace(/\.do-now-box \{ border: 2px solid #94a3b8; padding: 15px; margin-bottom: 25px;/, ".do-now-box { border: 2px solid #94a3b8; padding: 10px; margin-bottom: 15px;");

// 2. Do Now & Vocab flex layout
const blockRegex = /\/\/\s*Do Now\s*([\s\S]*?)\/\/\s*Sources\s*([\s\S]*?)\/\/\s*Vocabulary Task\s*([\s\S]*?)\/\/\s*Narrative Blocks/m;
const match = code.match(blockRegex);

if (match) {
  let doNowCode = match[1];
  let sourcesCode = match[2];
  let vocabCode = match[3];

  let newBlock = `
    // Starter Activities (Do Now & Vocab side-by-side)
    html += \`<div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px; page-break-inside: avoid;">\`;
    
    // Do Now Column
    html += \`<div style="flex: 1; display: flex; flex-direction: column;">\`;
    ${doNowCode.replace(/margin-bottom: 25px;/g, 'margin-bottom: 0px;').replace(/margin-bottom: 15px;/g, 'margin-bottom: 0px;')}
    html += \`</div>\`;

    // Vocab Column
    html += \`<div style="flex: 1; display: flex; flex-direction: column;">\`;
    ${vocabCode.replace(/margin-bottom: 20px;/g, 'margin-bottom: 0px;').replace(/margin-bottom: 15px;/g, 'margin-bottom: 0px;')}
    html += \`</div>\`;
    
    html += \`</div>\`;

    // Sources
    ${sourcesCode}
    
    // Narrative Blocks`;
    
  code = code.replace(blockRegex, newBlock);
} else {
  console.log("Could not find the Do Now / Sources / Vocab blocks regex.");
}

// 3. Exam Practice Object Fix
const epRegex = /if \(lesson\.exam_practice && lesson\.exam_practice\.length > 0\) \{([\s\S]*?)lesson\.exam_practice\.forEach\(\(ep, index\) => \{/m;
const epMatch = code.match(epRegex);

if (epMatch) {
  let epNew = `
      let epArray = lesson.exam_practice;
      let epStimulus = [];
      if (lesson.exam_practice && !Array.isArray(lesson.exam_practice) && lesson.exam_practice.questions) {
          epArray = lesson.exam_practice.questions;
          epStimulus = lesson.exam_practice.stimulus || [];
      }

      if (epArray && epArray.length > 0) {
        html += \`<div class="task-box" style="margin-bottom: 20px; border: 2px solid #1a237e; background: #eef2ff; page-break-inside: avoid;">\`;
        html += \`<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;"><img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Exam_icon.png" style="width:20px; vertical-align: middle; margin-right: 5px;"> Question Bank Menu</h2>\`;
        html += \`<p style="font-weight: bold; font-size: 10pt; color: #374151;">Choose a question from the menu below and write your answer on your A4 lined paper.</p>\`;
        
        if (epStimulus && epStimulus.length > 0) {
           html += \`<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px; page-break-inside: avoid;">\`;
           epStimulus.forEach((stim, i) => {
               let sTitle = stim.title || \`Source \${String.fromCharCode(65+i)}\`;
               let content = formatText(stim.content || stim).replace(/\\n/g, '<br>');
               html += \`<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                  <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">\${sTitle}</strong>
                  <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                    \${content}
                  </div>
                </div>\`;
           });
           html += \`</div>\`;
        }

        epArray.forEach((ep, index) => {`;
  code = code.replace(epRegex, epNew);
} else {
  console.log("Could not find the Exam Practice regex.");
}

fs.writeFileSync('generate_workbooks.js', code);
console.log('Done patching layout.');
