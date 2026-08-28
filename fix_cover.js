const fs = require('fs');

let pup = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 1. Remove from heroHtml
pup = pup.replace(
    /heroHtml \+= `<div style="text-align: center; font-size: 14pt; margin-top: 15px; color: #1e293b; font-weight: bold;">Scholar: \[__________\] &nbsp;&nbsp;&nbsp;&nbsp; Class: \[____\]<\/div>`;\r?\n/,
    ''
);

// 2. Put it in the correct div below the title
pup = pup.replace(
    /<div style="margin-top: 40px; text-align: center; font-family: 'Inter', sans-serif; font-size: 14pt; color: #334155;">\r?\n\s*<\/div>/,
    `<div style="margin-top: 40px; text-align: center; font-family: 'Inter', sans-serif; font-size: 14pt; color: #334155; font-weight: bold;">
          Scholar: [__________] and Class: [____]
        </div>`
);

fs.writeFileSync('generate_pupil_workbooks.js', pup, 'utf8');
console.log('Fixed cover brackets.');
