const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'great_war_v2', 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// We need to inject `let qNum = 1;` at the start of renderLesson
content = content.replace(/function renderLesson\(lesson\) \{\n\s*let html = /g, "function renderLesson(lesson) {\n    let qNum = 1;\n    let html = ");

// Primary source question
content = content.replace(/\$\{lesson\.primary_source\.question\}/g, "Question ${qNum++}: ${lesson.primary_source.question.replace('Enquiry: ', '')}");

// Timeline prediction
content = content.replace(/\$\{lesson\.do_now\.prediction_question\}/g, "Question ${qNum++}: ${lesson.do_now.prediction_question.replace('Predict: ', '')}");

// Do Now items
content = content.replace(/<div class="do-now-q">\$\{item\.question\}<\/div>/g, "<div class=\"do-now-q\"><strong>Question ${qNum++}:</strong> ${item.question.replace(/^\\d+\\.\\s*/, '')}</div>");

// Tasks
content = content.replace(/<div class="task-text">\$\{task\.text\}<\/div>/g, "<div class=\"task-text\"><strong>Question ${qNum++}:</strong> ${task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, '')}</div>");

// Extended scholarship
// We need to add the extended question at the end of the extended reading section
const extendedBlockRegex = /lesson\.extended\.paragraphs\.forEach\(para => \{\s*html \+= `<p class="narrative-block">\$\{para\}<\/p>`;\s*\}\);\s*html \+= `<\/div>`;/g;
const newExtendedBlock = `lesson.extended.paragraphs.forEach(para => {
          html += \`<p class="narrative-block">\${para}</p>\`;
        });
        if (lesson.extended.question) {
          html += \`<div class="task-item" style="margin-top: 20px; border-top: 2px dashed #e8eaf6; padding-top: 20px;">
            <div class="task-text"><strong>Question \${qNum++}: (Extended Scholarship)</strong> \${lesson.extended.question}</div>
            <div id="scaffold-model-ext" class="scaffold-box model" style="display:none; margin-top:10px;">
              <i class="fa-solid fa-star"></i> <strong>Model Answer:</strong> \${lesson.extended.model}
            </div>
          </div>\`;
        }
        html += \`</div>\`;`;

content = content.replace(extendedBlockRegex, newExtendedBlock);

fs.writeFileSync(appJsPath, content);
console.log("app.js updated successfully.");
