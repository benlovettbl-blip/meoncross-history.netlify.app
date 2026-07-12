import fs from 'fs';

const corePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let content = fs.readFileSync(corePath, 'utf8');

// 1. Add assignQuestionNumbers and fix openTaskWhiteboard
const oldWhiteboard = `  function openTaskWhiteboard() {
    const modal = document.getElementById('task-whiteboard-modal');
    if (!modal) return;
    
    const container = document.getElementById('whiteboard-questions-container');
    container.innerHTML = '';
    
    const urlParams = new URLSearchParams(window.location.search);
    let index = parseInt(urlParams.get('lesson'));
    if (isNaN(index)) index = 0;
    const activeLesson = unitData.lessons[index];
    
    assignQuestionNumbers(activeLesson);`;

const newWhiteboard = `  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }

  function openTaskWhiteboard() {
    const modal = document.getElementById('task-whiteboard-modal');
    if (!modal) return;
    
    const container = document.getElementById('whiteboard-questions-container');
    container.innerHTML = '';
    
    const activeLesson = window.currentActiveLesson || unitData.lessons[0];
    
    assignQuestionNumbers(activeLesson);`;

content = content.replace(oldWhiteboard, newWhiteboard);

// 2. Set currentActiveLesson in renderLesson
const oldRender = `  function renderLesson(lesson) {
    let html = \`<div class="lesson-content" style="max-width: 900px; margin: 0 auto;">\`;`;

const newRender = `  function renderLesson(lesson) {
    window.currentActiveLesson = lesson;
    let html = \`<div class="lesson-content" style="max-width: 900px; margin: 0 auto;">\`;`;

if (!content.includes('window.currentActiveLesson = lesson;')) {
  content = content.replace(oldRender, newRender);
}

// 3. Add Quiz Pack to sidebar
const oldSidebarLink = `    const workbookLink = document.createElement('a');
    workbookLink.className = 'lesson-link';
    workbookLink.textContent = 'Pupil Workbook';`;

const newSidebarLink = `    const quizPackLink = document.createElement('a');
    quizPackLink.className = 'lesson-link';
    quizPackLink.innerHTML = '📝 Printable Quiz Pack';
    quizPackLink.href = 'quiz_pack.html';
    quizPackLink.target = '_blank';
    quizPackLink.style.marginTop = '15px';
    quizPackLink.style.border = '2px dashed #059669';
    quizPackLink.style.color = '#10b981';
    navContainer.appendChild(quizPackLink);

    const workbookLink = document.createElement('a');
    workbookLink.className = 'lesson-link';
    workbookLink.textContent = 'Pupil Workbook';`;

if (content.includes(oldSidebarLink) && !content.includes('Printable Quiz Pack')) {
  content = content.replace(oldSidebarLink, newSidebarLink);
}

fs.writeFileSync(corePath, content, 'utf8');
console.log("Patched core_app.js for whiteboard, assignQuestionNumbers, and Quiz Pack");
