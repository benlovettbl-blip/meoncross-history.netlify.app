const fs = require('fs');
let content = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/make_worksheets.mjs', 'utf8');

// The replacement was failing because the image URL was hardcoded to the Great War one.
// Let's replace the whole replace block with a regex that matches ANY image.
content = content.replace(
  /content = content\.replace\([\s\S]*?Anton_von_Werner[\s\S]*?\);/,
  "content = content.replace(\n  /<p style=\\\"text-align:center; font-size:16pt; margin-top: 0; font-weight: bold; color: #d32f2f;\\\">Teacher Answer Key<\\/p>\\n\\s*<div style=\\\"text-align: center; margin: 30px 0;\\\">[\\\\s\\\\S]*?<\\/div>/,\n  `<p style=\"text-align:center; font-size:16pt; margin-top: 0;\">Student Workbook</p>\\n  \\n  \\${unitData.cover_image ? \\`\\n  <div style=\"text-align: center; margin: 30px 0;\">\\n    <img src=\"\\${unitData.cover_image}\" style=\"max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);\" alt=\"Cover Image\">\\n    \\${unitData.cover_caption ? \\`<div style=\"font-size: 10pt; font-style: italic; margin-top: 8px;\">\\${unitData.cover_caption}</div>\\` : ''}\\n  </div>\\` : ''}`\n);"
);

// We also need to add Quiz Pack generation to cme_new!
// cme_new/generate_answer_key.js doesn't have the Quiz Pack appended at the end.
// Let's modify cme_new/generate_answer_key.js to add it!

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/make_worksheets.mjs', content);
