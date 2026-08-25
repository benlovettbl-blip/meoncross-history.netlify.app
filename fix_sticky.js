const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const regex = /<div class="sticky-lesson-header" style="[^"]+">[\s\S]*?<h4 style="[^"]+">\s*(\$\{stickyHeaderText\})\s*<\/h4>[\s\S]*?<div style="[^"]+">/;

if (regex.test(code)) {
  code = code.replace(regex, '<div class="sticky-lesson-header">\n          <h4 class="sticky-lesson-title">\n            $1\n          </h4>\n          <div class="sticky-lesson-actions">');
  fs.writeFileSync('src/core_app.js', code);
  console.log('Replaced successfully');
} else {
  console.log('Regex did not match anything in core_app.js');
}
