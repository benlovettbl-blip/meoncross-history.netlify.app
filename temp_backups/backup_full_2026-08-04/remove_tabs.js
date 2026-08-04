const fs = require('fs');

const path = 'src/core_app.js';
let code = fs.readFileSync(path, 'utf8');

// 1. Remove the Tabs navigation UI div
// It starts with <div class="lesson-tabs" and ends with </div> just before Question formatting
code = code.replace(/<div class="lesson-tabs"[\s\S]*?<\/div>/, '');

// 2. Remove the Tab content wrappers
code = code.replace(/<div id="tab-prep" class="tab-content" style="display: block;">/, '');
code = code.replace(/<div id="tab-history" class="tab-content" style="display: none;">/, '');
code = code.replace(/<div id="tab-app" class="tab-content" style="display: none;">/, '');

// 3. Remove the closing </div> for the tabs which look like this in the string:
// html += `</div>`; // End Tab 1
code = code.replace(/html \+= `<\/div>`; \/\/ End Tab 1/g, '');
code = code.replace(/html \+= `<\/div>`; \/\/ End Tab 2/g, '');
code = code.replace(/html \+= `<\/div>`; \/\/ End Tab 3/g, '');

fs.writeFileSync(path, code, 'utf8');
console.log('Tabs removed successfully!');
