const fs = require('fs');
let content = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

const oldBlock = `        <div style="margin-top: 40px; text-align: center; font-family: 'Inter', sans-serif; font-size: 14pt; color: #334155;">
          <strong>Scholar:</strong> <span style="display: inline-block; width: 200px; border-bottom: 1px solid #94a3b8; margin-right: 20px;"></span>
          <strong>Class:</strong> <span style="display: inline-block; width: 80px; border-bottom: 1px solid #94a3b8;"></span>
        </div>`;

content = content.replace(oldBlock, '');

fs.writeFileSync('generate_pupil_workbooks.js', content, 'utf8');
console.log('Removed old cover fields');
