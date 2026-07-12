const fs = require('fs');
const path = require('path');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\$\{unitData\.cover_image \? `[\s\S]*?<\/div>` : ''\}/;
const replacement = `  <div style="text-align: center; margin: 30px 0;">
    <img src="../cme_new/assets/kt\${ktNum}_cover.png" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    <div style="font-size: 10pt; font-style: italic; margin-top: 8px;">\${ktNum === 1 ? '1945–1956: The End of the Mandate' : ktNum === 2 ? '1956–1979: Superpower Proxies' : '1979–1995: The Peace Process'}</div>
  </div>`;

if(content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Patched correctly!");
}
