const fs = require('fs');
let fileContent = fs.readFileSync('generate_textbooks.js', 'utf8');

// 1. Remove the grading footer completely
fileContent = fileContent.replace(/\/\/ Inject Discreet Grading Footer for the Lesson[\s\S]*?<\/div>\s*<\/div>\s*`;/g, '');

// 2. Remove the Factors Overview block completely
fileContent = fileContent.replace(/if \(unitId === 'edexcel_medicine' \|\| unitId === 'western_front'\) \{\s*html \+= `\s*<div style="page-break-before: always; padding: 20px;">[\s\S]*?<\/table>\s*<\/div>\s*`;\s*\}/g, '');

// 3. What about the Documentary / General Notes? It might be at the end of the lesson loop.
// In textbook_renaissance.html: "Documentary / General Notes" "Title / Topic:"
// Let's remove the "Documentary / General Notes" block
fileContent = fileContent.replace(/<div class="task-box" style="margin-bottom: 15px;   ">\s*<h3 style="margin-top: 0; color: #334155;">Documentary \/ General Notes<\/h3>[\s\S]*?<\/div>/g, '');

// Save back
fs.writeFileSync('generate_textbooks.js', fileContent);
console.log("Stripped grading footer, factors overview, and documentary notes.");
