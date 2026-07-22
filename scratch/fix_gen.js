const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('edexcel_medicine/generate_worksheets.js', 'utf8');

// Replace the loop start
const startSearch = `periods.forEach(period => {
  const periodLessons = unitData.lessons.filter(period.filter);
  if (periodLessons.length === 0) return;
  const periodTitle = period.title;
  const periodName = period.name;
let html = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>\${periodTitle} - Printable Workbook</title>`;

const startReplace = `
let html = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>\${unitData.title} - Printable Workbook</title>`;

content = content.replace(startSearch, startReplace);

// Move the CSS and <body> start to before the loop
const cssSearch = `    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
  </style>
</head>
<body>
\`;`;

const cssReplace = `    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
  </style>
</head>
<body>
\`;

periods.forEach(period => {
  const periodLessons = unitData.lessons.filter(period.filter);
  if (periodLessons.length === 0) return;
  const periodTitle = period.title;
  const periodName = period.name;`;

content = content.replace(cssSearch, cssReplace);

// Remove the html += `</body></html>` and fs.writeFileSync from inside the loop
const endSearch = `
html += \`</body></html>\`;

fs.writeFileSync(path.join(__dirname, \\\`workbook_\${period.name}.html\\\`), html);
console.log(\\\`Workbook generated at edexcel_medicine/workbook_\${period.name}.html\\\`);
});`;

const endReplace = `
});

html += \`</body></html>\`;

fs.writeFileSync(path.join(__dirname, 'workbook.html'), html);
console.log('Workbook generated at edexcel_medicine/workbook.html');
`;

content = content.replace(endSearch, endReplace);

fs.writeFileSync('edexcel_medicine/generate_worksheets.js', content);
console.log("Fixed generate_worksheets.js");
