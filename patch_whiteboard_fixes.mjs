import fs from 'fs';

const filesToUpdate = [
  'c:/Projects/meoncross-history.netlify.app/src/core_app.js',
  'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js',
  'c:/Projects/meoncross-history.netlify.app/cme_new/generate_answer_key.js'
];

const newAssignFunction = `  function assignQuestionNumbers(lesson) {
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
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the old assignQuestionNumbers regex
    const oldFuncRegex = /function assignQuestionNumbers\(lesson\) \{[\s\S]*?(?=\n  [a-zA-Z\}\/])/;
    const match = content.match(oldFuncRegex);
    if (match) {
      // make sure we don't accidentally replace too much, so we'll do a string replace instead
      // Wait, let's just do a manual string replace for what we know is there
      const oldFunc = `  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;
      content = content.replace(oldFunc, newAssignFunction);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Patched assignQuestionNumbers in ' + filePath);
    } else {
      console.log('Could not find assignQuestionNumbers in ' + filePath);
    }
  }
});

// Update index.html styles and toggle button
const indexPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Fix Styles
  const oldStyles = `    .wb-question-card {
      font-size: 1.5rem;
      padding: 25px;
      background: #f8fafc;
      border: 2px solid #cbd5e1;
      border-radius: 12px;
      margin-bottom: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .wb-answer {
      display: none;
      margin-top: 15px;
      padding: 15px;
      background: #f0fdf4;
      border-left: 5px solid #16a34a;
      font-size: 1.3rem;
      color: #166534;
      border-radius: 4px;
    }`;

  const newStyles = `    .wb-question-card {
      font-size: 1.15rem;
      padding: 15px;
      background: #f8fafc;
      border: 2px solid #cbd5e1;
      border-radius: 8px;
      margin-bottom: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .wb-answer {
      display: none;
      margin-top: 10px;
      padding: 10px;
      background: #f0fdf4;
      border-left: 5px solid #16a34a;
      font-size: 1.05rem;
      color: #166534;
      border-radius: 4px;
    }`;
  
  indexContent = indexContent.replace(oldStyles, newStyles);

  // Fix Toggle Button
  const oldBtn = `<button class="btn btn-secondary" onclick="document.querySelectorAll('.wb-answer').forEach(a => a.classList.toggle('revealed'))" style="font-size: 1.2rem; padding: 10px 20px; margin-right: 15px;">
            <i class="fa-solid fa-eye"></i> Toggle All Answers
          </button>`;
  
  const newBtn = `<button id="toggle-all-wb" class="btn btn-secondary" onclick="window.toggleAllWhiteboardAnswers()" style="font-size: 1rem; padding: 8px 16px; margin-right: 15px;">
            <i class="fa-solid fa-eye"></i> Reveal All Answers
          </button>`;
          
  indexContent = indexContent.replace(oldBtn, newBtn);

  // Add the script
  if (!indexContent.includes('toggleAllWhiteboardAnswers')) {
    const scriptInjection = `
  <script>
    window.toggleAllWhiteboardAnswers = function() {
      const answers = document.querySelectorAll('.wb-answer');
      const isAnyHidden = Array.from(answers).some(a => !a.classList.contains('revealed'));
      
      answers.forEach(a => {
        if (isAnyHidden) {
          a.classList.add('revealed');
        } else {
          a.classList.remove('revealed');
        }
      });
      
      const btn = document.getElementById('toggle-all-wb');
      if (isAnyHidden) {
        btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide All Answers';
      } else {
        btn.innerHTML = '<i class="fa-solid fa-eye"></i> Reveal All Answers';
      }
    };
  </script>
</body>`;
    indexContent = indexContent.replace('</body>', scriptInjection);
  }

  // Also fix close button size
  indexContent = indexContent.replace(`style="font-size: 1.2rem; padding: 10px 20px;"`, `style="font-size: 1rem; padding: 8px 16px;"`);

  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('Patched index.html for smaller whiteboard cards and fixed toggle behavior');
}
