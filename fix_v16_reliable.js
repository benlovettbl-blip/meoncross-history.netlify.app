const fs = require('fs');
let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 1. First, restore my fix for _nbHtml references outside the loop
code = code.replace(
  /_nbHtml \+\= \`\<h3 style="margin-top: 40px; page-break-before: auto;"\>\` \+ lesson\.extended\.title \+ \`\<\/h3\>\`;/g, 
  'html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;'
);
code = code.replace(
  /_nbHtml \+\= \`\<h3 style="margin-top: 40px; page-break-before: auto;"\>\$\{lesson\.extended\.title\}\<\/h3\>\`;/g, 
  'html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;'
);
code = code.replace(
  /_nbHtml \+\= \`\<p class="narrative-block" style="font-size: 12pt; color: #444;"\>\$\{formatText\(para\)\}\<\/p\>\`;/g, 
  'html += `<p class="narrative-block" style="font-size: 12pt; color: #444;">${formatText(para)}</p>`;'
);
code = code.replace(
  /_nbHtml \+\= \`\<p class="narrative-block"\>\<strong style="color:#000;"\>\$\{idx \+ 1\}\.\<\/strong\> \$\{formatText\(block\.text\)\}\<\/p\>\`;/g, 
  'html += `<p class="narrative-block"><strong style="color:#000;">${idx + 1}.</strong> ${formatText(block.text)}</p>`;'
);

// 2. Next, move `let globalQNum = 1;` OUTSIDE of `periodLessons.forEach`
const lines = code.split('\n');
let replaced = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('periodLessons.forEach((lesson, lessonIndex) => {') && !replaced) {
    // Insert `let globalQNum = 1;` just before this line
    lines.splice(i, 0, '    let globalQNum = 1;');
    replaced = true;
    i++; // skip the newly inserted line
  } else if (replaced && lines[i].includes('let globalQNum = 1;')) {
    // Remove the inner declaration
    lines.splice(i, 1);
    break; // only do this once
  }
}
code = lines.join('\n');

fs.writeFileSync('generate_pupil_workbooks.js', code);
console.log('Fixed generate_pupil_workbooks.js cumulative numbering and _nbHtml!');
