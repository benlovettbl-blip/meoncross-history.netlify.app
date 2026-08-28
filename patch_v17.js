const fs = require('fs');
let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Fix 1: Append _nbHtml to html
wb = wb.replace(
    '            _nbHtml += `</div>`; // Close narrative-block div\n          }\n        });\n      }',
    '            _nbHtml += `</div>`; // Close narrative-block div\n            html += _nbHtml;\n          }\n        });\n      }'
);

// Fix 2: Replace _nbHtml with html in Extended Scholarship and Narrative blocks
// because they are outside of the hasContent block.
// I will just use simple string replace for these.

wb = wb.replace(
    `      // Extended Scholarship
      if (lesson.extended && lesson.extended.paragraphs) {
        _nbHtml += \`<h3 style="margin-top: 40px; page-break-before: auto;">\${lesson.extended.title}</h3>\`;
        lesson.extended.paragraphs.forEach((para) => {
          _nbHtml += \`<p class="narrative-block" style="font-size: 12pt; color: #444;">\${formatText(para)}</p>\`;
        });
      }`,
    `      // Extended Scholarship
      if (lesson.extended && lesson.extended.paragraphs) {
        html += \`<h3 style="margin-top: 40px; page-break-before: auto;">\${lesson.extended.title}</h3>\`;
        lesson.extended.paragraphs.forEach((para) => {
          html += \`<p class="narrative-block" style="font-size: 12pt; color: #444;">\${formatText(para)}</p>\`;
        });
      }`
);

wb = wb.replace(
    `      // Narrative
      if (lesson.narrative) {
        lesson.narrative.forEach((block, idx) => {
          _nbHtml += \`<p class="narrative-block"><strong style="color:#000;">\${idx + 1}.</strong> \${formatText(block.text)}</p>\`;
        });
      }`,
    `      // Narrative
      if (lesson.narrative) {
        lesson.narrative.forEach((block, idx) => {
          html += \`<p class="narrative-block"><strong style="color:#000;">\${idx + 1}.</strong> \${formatText(block.text)}</p>\`;
        });
      }`
);

fs.writeFileSync('generate_pupil_workbooks.js', wb, 'utf8');
console.log('patch_v17.js applied.');
