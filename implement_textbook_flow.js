const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Update CSS Definitions
// .task-box
content = content.replace(
  /\.task-box \{[^}]+\}/,
  '.task-box { border-top: 2px solid #e2e8f0; padding-top: 15px; margin-top: 15px; margin-bottom: 15px; width: 100%; page-break-inside: auto; }'
);

// .do-now-box
content = content.replace(
  /\.do-now-box \{[^}]+\}/,
  '.do-now-box { border-top: 2px solid #e2e8f0; padding-top: 15px; margin-top: 15px; margin-bottom: 15px; width: 100%; page-break-inside: auto; }'
);

// .source-container
content = content.replace(
  /\.source-container \{[^}]+\}/,
  '.source-container { border-top: 2px solid #e2e8f0; padding-top: 15px; margin-top: 15px; margin-bottom: 15px; text-align: center; page-break-inside: auto; }'
);

// Ensure h4 has page-break-after: avoid
if (!content.includes('h4 {')) {
  content = content.replace('h3 {', 'h4 { font-size: 11pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: avoid; }\n    h3 {');
} else {
    content = content.replace(/h4 \{[^}]+\}/, 'h4 { font-size: 11pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: avoid; }');
}

// 2. Strip inline backgrounds and borders from task-box usages
content = content.replace(/style="background: #[0-9a-fA-F]+;/g, 'style="');
content = content.replace(/style=" background: #[0-9a-fA-F]+;/g, 'style="');
content = content.replace(/border: 2px [a-z]+ #[0-9a-fA-F]+;/g, '');
content = content.replace(/background: #[0-9a-fA-F]+;/g, '');

// The Side Quest boxes were changed previously to "border: 2px solid #64748b" and "background: #ffffff"
content = content.replace(/class="side-quest-box" style="[^"]*"/g, 'class="side-quest-box" style="border-top: 2px solid #e2e8f0; padding-top: 15px; margin: 15px 0; page-break-inside: auto;"');

// Ensure GCSE Exam Practice has page-break-inside: auto
content = content.replace(/page-break-inside: avoid;/g, 'page-break-inside: auto;');

// Let's also remove padding from things that used to have background colors so they align perfectly with text
content = content.replace(/padding: 10px;/g, 'padding-top: 10px; padding-bottom: 10px;');
content = content.replace(/padding: 8px;/g, 'padding-top: 8px; padding-bottom: 8px;');
content = content.replace(/padding: 12px;/g, 'padding-top: 12px; padding-bottom: 12px;');

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Successfully implemented Textbook Flow CSS!');
