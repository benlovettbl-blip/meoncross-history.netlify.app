import fs from 'fs';

let content = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_answer_key.js', 'utf8');

// Title and Headings
content = content.replace(
  '<title>${unitData.title} - Teacher Answer Key</title>',
  '<title>${unitData.title} - Printable Workbook</title>'
);

content = content.replace(
  '<p style="text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;">Teacher Answer Key</p>\n  \n  <div style="text-align: center; margin: 30px 0;">\n    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Anton_von_Werner_-_Er%C3%B6ffnung_des_Reichstags_1888_%281893%29.jpg" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="The Opening of the Reichstag">\n    <div style="font-size: 10pt; font-style: italic; margin-top: 8px;">Anton von Werner, \'The Opening of the Reichstag\' (1893)</div>\n  </div>',
  `<p style="text-align:center; font-size:16pt; margin-top: 0;">Student Workbook</p>
  
  \${unitData.cover_image ? \`
  <div style="text-align: center; margin: 30px 0;">
    <img src="\${unitData.cover_image}" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    \${unitData.cover_caption ? \`<div style="font-size: 10pt; font-style: italic; margin-top: 8px;">\${unitData.cover_caption}</div>\` : ''}
  </div>\` : ''}`
);

// Prediction Question model
content = content.replace(
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 5px;">${item.answer}</div>`;',
  'html += `<div class="task-lines-large"></div>`;'
);

// Do Now model
content = content.replace(
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 5px;">${item.answer}</div>`;',
  'html += `<div class="task-lines"></div><div class="task-lines"></div>`;'
);

// Tasks model
content = content.replace(
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red;">${task.model}</div>`;',
  'html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;'
);

// Extended model
content = content.replace(
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 10px;">${lesson.extended.model}</div>`;',
  'html += `<div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>`;'
);

// Replace GCSE Task entirely (User requested to remove it completely from workbook)
const gcseRegex = /\/\/ GCSE Cross-Source Analysis[\s\S]*?\/\/ Append Quiz Pack/;
content = content.replace(gcseRegex, '// Append Quiz Pack');

// Output file
content = content.replace(
  "fs.writeFileSync(path.join(__dirname, 'answer_key.html'), html, 'utf8');\nconsole.log(\"Successfully generated answer_key.html!\");",
  "fs.writeFileSync(path.join(__dirname, 'workbook.html'), html, 'utf8');\nconsole.log(\"Successfully generated workbook.html!\");"
);

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js', content, 'utf8');
console.log("Restored generate_worksheets.js successfully without GCSE section");
