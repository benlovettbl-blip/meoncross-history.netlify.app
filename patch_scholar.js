const fs = require('fs');

let file = 'generate_pupil_workbooks.js';
let c = fs.readFileSync(file, 'utf8');

let findStr = `<h1 class="unit-title" style="font-family: 'Playfair Display', 'Garamond', serif; font-size: 38pt; margin: 10px 0; color: #0f172a; font-weight: 800; line-height: 1.1;">\${periodTitle}</h1>`;
let replaceStr = findStr + `
        <div style="margin-top: 40px; text-align: center; font-family: 'Inter', sans-serif; font-size: 14pt; color: #334155;">
          <strong>Scholar:</strong> <span style="display: inline-block; width: 200px; border-bottom: 1px solid #94a3b8; margin-right: 20px;"></span>
          <strong>Class:</strong> <span style="display: inline-block; width: 80px; border-bottom: 1px solid #94a3b8;"></span>
        </div>`;

if (c.includes(findStr)) {
    c = c.replace(findStr, replaceStr);
    fs.writeFileSync(file, c);
    console.log('Added Scholar inputs to generate_pupil_workbooks.js');
} else {
    console.log('Could not find h1 in generate_pupil_workbooks.js');
}
