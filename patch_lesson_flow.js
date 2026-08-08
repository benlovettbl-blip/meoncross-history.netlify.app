const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// Replace the forced page break on every single lesson title with a continuous flow
content = content.replace(
  'html += `<h2 style="margin-bottom: 10px; page-break-before: always;">L${lessonIndex + 1}: ${formatText(lesson.title)}</h2>`;',
  'html += `<h2 style="margin-top: 40px; border-top: 3px solid #1e3a8a; padding-top: 20px; margin-bottom: 10px; page-break-before: auto; page-break-after: avoid;">L${lessonIndex + 1}: ${formatText(lesson.title)}</h2>`;'
);

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Fixed lesson title page breaks to flow continuously!');
