import fs from 'fs';

let content = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js', 'utf8');

content = content.replace(
  '<title>${unitData.title} - Printable Workbook</title>',
  '<title>${unitData.title} - Teacher Answer Key</title>'
);

content = content.replace(
  '<p style="text-align:center; font-size:16pt; margin-top: 0;">Student Workbook</p>',
  '<p style="text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;">Teacher Answer Key</p>'
);

content = content.replace(
  '${unitData.cover_image ? `\n  <div style="text-align: center; margin: 30px 0;">\n    <img src="${unitData.cover_image}" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">\n    ${unitData.cover_caption ? `<div style="font-size: 10pt; font-style: italic; margin-top: 8px;">${unitData.cover_caption}</div>` : \'\'}\n  </div>` : \'\'}',
  `<div style="text-align: center; margin: 30px 0;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Anton_von_Werner_-_Er%C3%B6ffnung_des_Reichstags_1888_%281893%29.jpg" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="The Opening of the Reichstag">
    <div style="font-size: 10pt; font-style: italic; margin-top: 8px;">Anton von Werner, 'The Opening of the Reichstag' (1893)</div>
  </div>`
);

content = content.replace(
  'html += `<div class="task-lines-large"></div>`;',
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 5px;">${item.answer}</div>`;'
);

content = content.replace(
  'html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;',
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red;">${task.model}</div>`;'
);

content = content.replace(
  'html += `<div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>`;',
  'html += `<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 10px;">${lesson.extended.model}</div>`;'
);

content = content.replace(
  'for (let i = 0; i < 15; i++) { html += `<div class="task-lines-large"></div>`; }',
  'html += `<div style="color:red; font-weight:bold; padding: 15px; background: #fff0f0; border: 2px dashed red; min-height: 200px; margin-top: 15px;">${lesson.gcse_task.model}</div>`;'
);

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_answer_key.js', content, 'utf8');
console.log("Successfully created generate_answer_key.js");
