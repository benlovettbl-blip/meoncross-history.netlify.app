const fs = require('fs');
const path = require('path');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add isCore
if (!content.includes('const isCore =')) {
    content = content.replace("const path = require('path');", "const path = require('path');\nconst isCore = process.argv.includes('--core');");
}

// 2. Add dynamic cover
const oldCoverLogic = `\${unitData.cover_image ? \`
  <div style="text-align: center; margin: 30px 0;">
    <img src="\${unitData.cover_image}" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    \${unitData.cover_caption ? \`<div style="font-size: 10pt; font-style: italic; margin-top: 8px;">\${unitData.cover_caption}</div>\` : ''}
  </div>\` : ''}`;

const newCoverLogic = `  <div style="text-align: center; margin: 30px 0;">
    <img src="../cme_new/assets/kt\${ktNum}_cover.png" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    <div style="font-size: 10pt; font-style: italic; margin-top: 8px;">\${ktNum === 1 ? '1945–1956: The End of the Mandate' : ktNum === 2 ? '1956–1979: Superpower Proxies' : '1979–1995: The Peace Process'}</div>
  </div>`;

if (content.includes(oldCoverLogic)) {
    content = content.replace(oldCoverLogic, newCoverLogic);
    console.log("Patched cover logic!");
} else {
    console.log("Failed to find cover logic to patch.");
}

// 3. Fix the hardcoded "Teacher Answer Key" to use isCore logic
content = content.replace('<p style="text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;">Teacher Answer Key</p>', '<p style="text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;">${isCore ? \'Core Workbook\' : \'Printable Workbook\'}</p>');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully prepared generate_worksheets.js");
