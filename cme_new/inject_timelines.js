const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'generate_worksheets.js');
let code = fs.readFileSync(targetPath, 'utf8');

const injectionCode = `
html += \`
  <div style="page-break-before: always;">
    <h2 style="font-size: 24pt; text-align: center; border: none; margin-top: 50px;">Appendix: Domino Flowcharts</h2>
    <p style="text-align: center; font-size: 14pt; margin-bottom: 40px;">Use these pages to practice chronological sequencing for each key topic and major war.</p>
  </div>
\`;

try {
  const tlContent = fs.readFileSync(path.join(__dirname, 'timeline_data.js'), 'utf8');
  const parsedTl = new Function(tlContent.replace('export const timelineData =', 'return').replace(/;$/, '') + ';')();
  
  parsedTl.forEach(tl => {
    html += \`<div style="page-break-before: always; position: relative;">\`;
    html += \`<h2>Timeline Task: \${tl.title}</h2>\`;
    html += \`<p style="font-weight: bold; font-size: 13pt; margin-bottom: 30px;">Instructions: Draw arrows connecting the scattered events below in the exact chronological and causal order. The first event is numbered '1', map the flow to the final event.</p>\`;
    
    let shuffled = [...tl.events];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    html += \`<div style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 40px; margin-top: 50px;">\`;
    
    shuffled.forEach((event, index) => {
      const rotations = [-4, -2, 0, 2, 4];
      const rot = rotations[Math.floor(Math.random() * rotations.length)];
      const aligns = ['flex-start', 'center', 'flex-end'];
      const al = aligns[Math.floor(Math.random() * aligns.length)];
      
      html += \`
        <div style="width: 40%; align-self: \${al}; background: #fff; border: 2px solid #333; border-radius: 8px; padding: 15px; box-shadow: 3px 3px 0 #ccc; transform: rotate(\${rot}deg);">
          <p style="margin: 0; font-size: 11.5pt;">\${event.text}</p>
        </div>
      \`;
    });
    
    html += \`</div></div>\`;
  });
} catch(e) {
  console.log("Timeline generation failed:", e);
}

`;

const searchString = "html += `\n\n<script src=\"/knowledge_bank.js\"></script>";
code = code.replace(searchString, injectionCode + searchString);

fs.writeFileSync(targetPath, code, 'utf8');
console.log("Safely injected Domino Flowcharts!");
