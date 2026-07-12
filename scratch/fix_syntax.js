const fs = require('fs');
const path = require('path');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// I will just use a regex to fix the messy cover block
const messyCoverRegex = /<h1 style="margin-top: 50px; margin-bottom: 10px;">\$\{unitData\.title\}<\/h1>[\s\S]*?<div style="margin: 40px 10%; border: 2px solid #1a237e/;

const cleanCoverCode = `<h1 style="margin-top: 50px; margin-bottom: 10px;">\${unitData.title}</h1>
  <p style="text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;">\${isCore ? 'Core Workbook' : 'Teacher Answer Key'}</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <img src="../cme_new/assets/kt\${ktNum}_cover.png" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    <div style="font-size: 10pt; font-style: italic; margin-top: 8px;">\${ktNum === 1 ? '1945–1956: The End of the Mandate' : ktNum === 2 ? '1956–1979: Superpower Proxies' : '1979–1995: The Peace Process'}</div>
  </div>

  <div style="margin: 40px 10%; border: 2px solid #1a237e`;

if (content.match(messyCoverRegex)) {
    content = content.replace(messyCoverRegex, cleanCoverCode);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully cleaned up the cover rendering logic.");
} else {
    console.log("Failed to match messy cover regex.");
}
