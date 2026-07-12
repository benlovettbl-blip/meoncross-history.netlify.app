import fs from 'fs';

// --- 1. Patch generate_worksheets.js ---
const wsPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let wsContent = fs.readFileSync(wsPath, 'utf8');

const oldAssignFunc = `  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

const newAssignFunc = `  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => task.qNum = q++);
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

if (wsContent.includes(oldAssignFunc)) {
  wsContent = wsContent.replace(oldAssignFunc, newAssignFunc);
}

// Ensure the HTML in generate_worksheets.js prints Q{num}. for narrative blocks
const oldBlockTaskHTML = 'html += `<p style="margin-top:10px; font-weight: bold;">${cleanTask}</p>`;';
const newBlockTaskHTML = 'html += `<p style="margin-top:10px; font-weight: bold;">Q${task.qNum}. ${cleanTask}</p>`;';
if (wsContent.includes(oldBlockTaskHTML)) {
  wsContent = wsContent.replace(oldBlockTaskHTML, newBlockTaskHTML);
}

fs.writeFileSync(wsPath, wsContent, 'utf8');
console.log("Patched generate_worksheets.js numbering.");


// --- 2. Patch core_app.js numbering ---
const appPath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

// Inject the global assignQuestionNumbers at the top of renderLesson
const assignFuncStr = `
  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => task.qNum = q++);
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }
`;

if (!appContent.includes('function assignQuestionNumbers')) {
  // Find where renderLesson is defined
  const renderMatch = "function renderLesson(index) {";
  if (appContent.includes(renderMatch)) {
    appContent = appContent.replace(renderMatch, assignFuncStr + '\n' + renderMatch);
  }
}

// Call assignQuestionNumbers at start of renderLesson
const callMatch = "const lesson = unitData.lessons[index];";
const callReplacement = "const lesson = unitData.lessons[index];\n    assignQuestionNumbers(lesson);";
if (appContent.includes(callMatch) && !appContent.includes("assignQuestionNumbers(lesson);")) {
  appContent = appContent.replace(callMatch, callReplacement);
}

// Now replace rendering of questions in core_app.js

// Primary Source
// <div class="teacher-note"><strong>${lesson.primary_source.question}</strong></div>
// Let's replace:
appContent = appContent.replace(
  /\<div class="teacher-note"\>\<strong\>\$\{lesson\.primary_source\.question\}\<\/strong\>\<\/div\>/g,
  '<div class="teacher-note"><strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace(/^Enquiry:\\s*/, "")}</strong></div>'
);

// Do Now (Questions)
// <strong>${item.question}</strong>
appContent = appContent.replace(
  /\<strong\>\$\{item\.question\}\<\/strong\>/g,
  '<strong>Q${item.qNum}. ${item.question.replace(/^\\d+\\.\\s*/, "")}</strong>'
);

// Do Now (Timeline Prediction)
// <strong>${lesson.do_now.prediction_question}</strong>
appContent = appContent.replace(
  /\<strong\>\$\{lesson\.do_now\.prediction_question\}\<\/strong\>/g,
  '<strong>Q${lesson.do_now.qNum}. ${lesson.do_now.prediction_question.replace(/^Predict:\\s*/, "")}</strong>'
);

// Knowledge Checks
// <strong>${task.text.replace(/\s*\(P\d+\)/gi, '')}</strong>
appContent = appContent.replace(
  /\<strong\>\$\{task\.text\.replace\(\/\\\\s\*\\\(P\\\\d\+\\\)\/gi, \'\'\)\}\<\/strong\>/g,
  '<strong>Q${task.qNum}. ${task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, "").replace(/\\s*\\(P\\d+\\)/gi, "")}</strong>'
);

// Extended Writing
// <strong>${lesson.extended.question}</strong>
appContent = appContent.replace(
  /\<strong\>\$\{lesson\.extended\.question\}\<\/strong\>/g,
  '<strong>Q${lesson.extended.qNum}. ${lesson.extended.question.replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, "")}</strong>'
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log("Patched core_app.js numbering.");
