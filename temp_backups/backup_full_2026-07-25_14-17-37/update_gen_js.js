const fs = require('fs');
const path = require('path');

const genJsPath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let content = fs.readFileSync(genJsPath, 'utf8');

// We need to inject `let qNum = 1;` at the start of loop
content = content.replace(/unitData\.lessons\.forEach\(\(lesson, index\) => \{\n\s*html \+= `/g, "unitData.lessons.forEach((lesson, index) => {\n    let qNum = 1;\n    html += `");

// Primary source question
content = content.replace(/\$\{lesson\.primary_source\.question\}/g, "Question ${qNum++}: ${lesson.primary_source.question.replace('Enquiry: ', '')}");

// Timeline prediction
content = content.replace(/\$\{lesson\.do_now\.prediction_question\}/g, "Question ${qNum++}: ${lesson.do_now.prediction_question.replace('Predict: ', '')}");

// Do Now items
content = content.replace(/<div class="do-now-q">\$\{item\.question\}<\/div>/g, "<div class=\"do-now-q\"><strong>Question ${qNum++}:</strong> ${item.question.replace(/^\\d+\\.\\s*/, '')}</div>");

// Tasks
content = content.replace(/<p><strong>\$\{task\.text\}<\/strong><\/p>/g, "<p><strong>Question ${qNum++}: ${task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, '')}</strong></p>");

// Extended scholarship
// We need to add the extended question at the end of the extended reading section
const extendedBlockRegex = /lesson\.extended\.paragraphs\.forEach\(para => \{\s*html \+= `<p>\$\{para\}<\/p>`;\s*\}\);\s*html \+= `<\/div>`;/g;
const newExtendedBlock = `lesson.extended.paragraphs.forEach(para => {
        html += \`<p>\${para}</p>\`;
      });
      if (lesson.extended.question) {
        html += \`<div style="margin-top: 20px;"><strong>Question \${qNum++}: (Extended Scholarship) \${lesson.extended.question}</strong></div>\`;
        html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
      }
      html += \`</div>\`;`;

content = content.replace(extendedBlockRegex, newExtendedBlock);

fs.writeFileSync(genJsPath, content);
console.log("generate_worksheets.js updated successfully.");
