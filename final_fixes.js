const fs = require('fs');

// --- Fix Early Modern World Data (L1 & L6) ---
let dataFile = 'public/units/early_modern_world/data.js';
let dataCode = fs.readFileSync(dataFile, 'utf8');

dataCode = dataCode.replace(
  /"question": "Based on Source B, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s\?"/g,
  '"question": "Look at Source B in your Textbook. Based on Source B, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?"'
);

dataCode = dataCode.replace(
  /"question": "What impression do Sources D and E give about the balance of power between Europe and the rest of the world in the 15th century\?"/g,
  '"question": "Look at Sources D and E in your Textbook. What impression do they give about the balance of power between Europe and the rest of the world in the 15th century?"'
);

dataCode = dataCode.replace(
  /"question": "How does the evidence in Source F and the description of the peasant's 'pottage' contrast with the lives of the Oba of Benin or the Ming Emperor\?"/g,
  '"question": "Look at Source F in your Textbook. How does the evidence in Source F and the description of the peasant\'s \'pottage\' contrast with the lives of the Oba of Benin or the Ming Emperor?"'
);

dataCode = dataCode.replace(
  /"question": "UCL Research Task Worksheet: Write down your findings for Task A and B, and write your 150-word summary for Task C here:"/g,
  '"question": "UCL Research Task Worksheet: <br><div style=\\"border: 1px dashed #94a3b8; padding: 10px; margin-bottom: 10px; background: #f8fafc; color: #475569; font-style: italic; min-height: 80px;\\">Planning Box: Jot down your findings for Task A and B here...</div>Now, write your 150-word summary for Task C below:"'
);

fs.writeFileSync(dataFile, dataCode);
console.log('Fixed data.js questions!');


// --- Fix Textbook Blockquotes ---
let tbFile = 'generate_textbooks.js';
let tbCode = fs.readFileSync(tbFile, 'utf8');

tbCode = tbCode.replace(
  /sourceHTML \+= \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\$\{srcObj\.text\}<\/blockquote>\`;/g,
  'sourceHTML += `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0; background-color: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">${srcObj.text}</blockquote>`;'
);

tbCode = tbCode.replace(
  /sourceHTML \+= \`<blockquote style="font-size: 12pt; font-style: italic; margin: 0 0 10px 0; text-align: left;">\$\{srcObj\.text\}<\/blockquote>\`;/g,
  'sourceHTML += `<blockquote style="font-size: 12pt; font-style: italic; margin: 0 0 10px 0; text-align: left; background-color: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">${srcObj.text}</blockquote>`;'
);

fs.writeFileSync(tbFile, tbCode);
console.log('Fixed generate_textbooks.js blockquotes!');
