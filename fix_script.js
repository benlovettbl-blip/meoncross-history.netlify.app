const fs = require('fs');
let content = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Fix 1: Remove the student-details block that is duplicating scholar/class
const startCover = content.indexOf('<div class="student-details"');
if (startCover !== -1) {
    let endCover = content.indexOf('</div>\n      </div>\n    </div>`;', startCover);
    if (endCover === -1) endCover = content.indexOf('</div>\r\n      </div>\r\n    </div>`;', startCover);
    if (endCover !== -1) {
        content = content.substring(0, startCover) + content.substring(endCover + 7);
    } else {
        console.log('endCover not found');
    }
} else {
    console.log('startCover not found');
}

// Fix 2: Append _nbHtml to html
content = content.replace(/_nbHtml \+= \`<\/div>\`; \/\/ Close narrative-block div\r?\n\s*\}\r?\n\s*\}\);\r?\n\s*\}/, '_nbHtml += `</div>`; // Close narrative-block div\n            html += _nbHtml;\n          }\n        });\n      }');

// Fix 3: Remove flatQuestions sort and render at the bottom
content = content.replace(/flatQuestions\.sort\(\(a,b\) => a\.qNum - b\.qNum\);\r?\n\s*flatQuestions\.forEach\(q => html \+= q\.html\);/, '');

fs.writeFileSync('generate_pupil_workbooks.js', content, 'utf8');
console.log('Fixed generate_pupil_workbooks.js');
