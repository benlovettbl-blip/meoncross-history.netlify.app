const fs = require('fs');
let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Replace _nbHtml outside the narrative_blocks loop with html
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

fs.writeFileSync('generate_pupil_workbooks.js', code);
console.log('Fixed _nbHtml references outside the loop');
