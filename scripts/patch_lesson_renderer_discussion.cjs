const fs = require('fs');
const path = require('path');

const lrPath = path.join(__dirname, '..', 'src', 'engine', 'lesson_renderer.js');
let code = fs.readFileSync(lrPath, 'utf8');

// Location 2 (around line 5568, inside img.source_context / gallery)
const loc2Regex =
  /\$\{\s*hingeText\s*\?\s*`\s*<div class="archival-source-discussion-box"[\s\S]*?<\/div>\s*`\s*:\s*''\s*\}/;
if (loc2Regex.test(code)) {
  code = code.replace(
    loc2Regex,
    '${renderArchivalSourceDiscussionBox(hingeText, img, isKs2, "14px")}',
  );
  console.log('Patched Location 2');
} else {
  console.warn('Could not match Location 2');
}

// Location 3 (around line 6066, details version of blockSourceHtml)
const loc3Regex =
  /\$\{\s*(?:rawSource\.hinge_question\s*\|\|\s*rawSource\.question\s*\|\|\s*rawSource\.source_question)\s*\?\s*`\s*<div class="archival-source-discussion-box"[\s\S]*?<\/div>\s*`\s*:\s*''\s*\}/;
if (loc3Regex.test(code)) {
  code = code.replace(
    loc3Regex,
    '${renderArchivalSourceDiscussionBox(rawSource.hinge_question || rawSource.question || rawSource.source_question, rawSource, isKs2, "14px")}',
  );
  console.log('Patched Location 3');
} else {
  console.warn('Could not match Location 3');
}

// Location 4 (around line 6086, non-details version of blockSourceHtml)
const loc4Regex =
  /\$\{\s*(?:rawSource\.question\s*\|\|\s*rawSource\.hinge_question\s*\|\|\s*rawSource\.source_question)\s*\?\s*`\s*<div class="archival-source-discussion-box"[\s\S]*?<\/div>\s*`\s*:\s*''\s*\}/;
if (loc4Regex.test(code)) {
  code = code.replace(
    loc4Regex,
    '${renderArchivalSourceDiscussionBox(rawSource.question || rawSource.hinge_question || rawSource.source_question, rawSource, isKs2, "12px")}',
  );
  console.log('Patched Location 4');
} else {
  console.warn('Could not match Location 4');
}

fs.writeFileSync(lrPath, code, 'utf8');
console.log('Done patching lesson_renderer.js!');
