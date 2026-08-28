const fs = require('fs');
let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Fix 1: Append _nbHtml to html
wb = wb.replace(
    /_nbHtml \+= `<\/div>`; \/\/ Close narrative-block div\s*\}\s*\}\);\s*\}/,
    '_nbHtml += `</div>`; // Close narrative-block div\n            html += _nbHtml;\n          }\n        });\n      }'
);

// Fix 2: Extended Scholarship
wb = wb.replace(
    /_nbHtml \+= `<h3 style="margin-top: 40px; page-break-before: auto;">\$\{lesson\.extended\.title\}<\/h3>`;/g,
    'html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;'
);
wb = wb.replace(
    /_nbHtml \+= `<p class="narrative-block" style="font-size: 12pt; color: #444;">\$\{formatText\(para\)\}<\/p>`;/g,
    'html += `<p class="narrative-block" style="font-size: 12pt; color: #444;">${formatText(para)}</p>`;'
);

// Fix 3: Narrative
wb = wb.replace(
    /_nbHtml \+= `<p class="narrative-block"><strong style="color:#000;">\$\{idx \+ 1\}\.<\/strong> \$\{formatText\(block\.text\)\}<\/p>`;/g,
    'html += `<p class="narrative-block"><strong style="color:#000;">${idx + 1}.</strong> ${formatText(block.text)}</p>`;'
);

fs.writeFileSync('generate_pupil_workbooks.js', wb, 'utf8');
console.log('patch_v17.js applied.');
