const fs = require('fs');
let fileContent = fs.readFileSync('generate_textbooks.js', 'utf8');

// 1. Remove the tracking grid logic
fileContent = fileContent.replace(/<!-- Tracker Table now on page 2 -->[\s\S]*?<\/table>\s*<\/div>/g, '');

// 2. Remove Exam technique section logic (Section A and Section B guides)
fileContent = fileContent.replace(/\$\{\(unitId === 'edexcel_medicine' \|\| unitId === 'western_front'\)[\s\S]*? : ''\}/g, '');

// 3. Remove Primary Source Question
fileContent = fileContent.replace(/\$\{lesson\.primary_source\.question \? \`\<div style="margin-top: 15px; text-align: left;"\>\s*\<strong\>Q\$\{lesson\.primary_source\.qNum\}\. \$\{lesson\.primary_source\.question\.replace\('Enquiry: ', ''\)\}.*?\<\/strong\>\<\/div\>\` : ''\}/g, '');

// 4. Remove ALL 'Do Now' rendering
fileContent = fileContent.replace(/\/\/ Starter Activities \(Do Now & Vocab stacked\)[\s\S]*?\/\/ Vocab/g, '// Vocab');

// 5. Remove Narrative Block Tasks and Hinge Questions
fileContent = fileContent.replace(/if \(block\.tasks && block\.tasks\.length > 0\) \{[\s\S]*?\}\s*if \(block\.hinge_question\)/g, 'if (block.hinge_question)');
fileContent = fileContent.replace(/if \(block\.hinge_question\) \{[\s\S]*?\}\s*html \+\= \`<\/div>\`;\s*\/\/\s*Vocab in narrative/g, 'html += `</div>`;\n            // Vocab in narrative');

// 6. Remove 'Active Tasks' and Exam Practice Tasks (Everything below Narrative Blocks)
// It starts right after narrative blocks ends: "}); // end narrative_blocks"
// It ends right before "if (lesson.plenary)" or "// Plenary"
fileContent = fileContent.replace(/\}\)\; \/\/ end narrative_blocks[\s\S]*?\/\/ Plenary/g, '}); // end narrative_blocks\n    // Plenary');

// 7. Remove any task-lines from Plenary or other places
fileContent = fileContent.replace(/<div class="task-lines"[\s\S]*?<\/div>/g, '');
fileContent = fileContent.replace(/<div class="task-lines-large"[\s\S]*?<\/div>/g, '');

fs.writeFileSync('generate_textbooks.js', fileContent);
console.log("Successfully stripped tasks and trackers from generate_textbooks.js!");
