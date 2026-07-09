const fs = require('fs');
const path = require('path');

// 1. Fix data.js
const dataPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
dataContent = dataContent.replace(
  "what does the bag represent?",
  "why is this event significant?"
);
fs.writeFileSync(dataPath, dataContent);
console.log("data.js updated.");

// 2. Fix app.js
const appJsPath = path.join(__dirname, 'great_war_v2', 'app.js');
let appContent = fs.readFileSync(appJsPath, 'utf8');

// Remove the old `let qNum = 1;` from renderLesson
appContent = appContent.replace(/let qNum = 1;\n\s*/, "");

// Add assignQuestionNumbers function
const assignFunc = `
  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }

  function renderLesson`;

appContent = appContent.replace(/function renderLesson/, assignFunc);
appContent = appContent.replace(/let html = `<div class="lesson-content">/, "assignQuestionNumbers(lesson);\n    let html = `<div class=\"lesson-content\">");

// Replace Question ${qNum++} with Question ${...qNum}
appContent = appContent.replace(/Question \$\{qNum\+\+\}/g, "Question ${%%QNUM%%}");
appContent = appContent.replace(/\$\{%%QNUM%%}: \$\{lesson\.primary_source/g, "${lesson.primary_source.qNum}: ${lesson.primary_source");
appContent = appContent.replace(/\$\{%%QNUM%%}: \$\{lesson\.do_now/g, "${lesson.do_now.qNum}: ${lesson.do_now");
appContent = appContent.replace(/\$\{%%QNUM%%}:<\/strong> \$\{item/g, "${item.qNum}:</strong> ${item");
appContent = appContent.replace(/\$\{%%QNUM%%}: \$\{task/g, "${task.qNum}: ${task");
appContent = appContent.replace(/\$\{%%QNUM%%}: \(Extended Scholarship/g, "${lesson.extended.qNum}: (Extended Scholarship");

fs.writeFileSync(appJsPath, appContent);
console.log("app.js updated.");

// 3. Fix generate_worksheets.js
const genJsPath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let genContent = fs.readFileSync(genJsPath, 'utf8');

// Remove `let qNum = 1;`
genContent = genContent.replace(/let qNum = 1;\n\s*/, "");

const assignFuncGen = `
  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }

unitData.lessons.forEach(lesson => {
  assignQuestionNumbers(lesson);`;

genContent = genContent.replace(/unitData\.lessons\.forEach\(lesson => \{/, assignFuncGen);

// Fix timeline rendering to include events AND question
const oldTimelineStr = `      if (lesson.do_now.prediction_question) {
        html += \`<div class="do-now-q"><strong>Question \${qNum++}: \${lesson.do_now.prediction_question.replace('Predict: ', '')}</strong></div>\`;
        html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
      } else {
        lesson.do_now.events.forEach(ev => {
          html += \`<p><strong>\${ev.year}:</strong> \${ev.title} - <em>\${ev.detail}</em></p>\`;
        });
      }`;

const newTimelineStr = `      lesson.do_now.events.forEach(ev => {
        html += \`<p><strong>\${ev.year}:</strong> \${ev.title} - <em>\${ev.detail}</em></p>\`;
      });
      if (lesson.do_now.prediction_question) {
        html += \`<div class="do-now-q"><strong>Question \${lesson.do_now.qNum}: \${lesson.do_now.prediction_question.replace('Predict: ', '')}</strong></div>\`;
        html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
      }`;

genContent = genContent.replace(oldTimelineStr, newTimelineStr);

// Replace Question ${qNum++} with Question ${...qNum}
genContent = genContent.replace(/Question \$\{qNum\+\+\}/g, "Question ${%%QNUM%%}");
genContent = genContent.replace(/\$\{%%QNUM%%}: \$\{lesson\.primary_source/g, "${lesson.primary_source.qNum}: ${lesson.primary_source");
genContent = genContent.replace(/\$\{%%QNUM%%}:<\/strong> \$\{item/g, "${item.qNum}:</strong> ${item");
genContent = genContent.replace(/\$\{%%QNUM%%}: \$\{task/g, "${task.qNum}: ${task");
genContent = genContent.replace(/\$\{%%QNUM%%}: \(Extended Scholarship/g, "${lesson.extended.qNum}: (Extended Scholarship");

fs.writeFileSync(genJsPath, genContent);
console.log("generate_worksheets.js updated.");
