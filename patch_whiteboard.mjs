import fs from 'fs';

// 1. Update index.html
const indexPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Remove board mode CSS
indexContent = indexContent.replace(/<style class="board-mode-css">[\s\S]*?<\/style>\s*<\/head>/, '</head>');

// Add Whiteboard Modal HTML & CSS
const modalHTML = `
  <style>
    #task-whiteboard-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 10000;
      display: none;
      overflow-y: auto;
      padding: 40px;
    }
    #task-whiteboard-modal.visible {
      display: block;
    }
    .whiteboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e2e8f0;
    }
    .whiteboard-content {
      max-width: 1000px;
      margin: 0 auto;
    }
    .wb-question-card {
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
    }
    .wb-answer.revealed {
      display: block;
    }
  </style>
  <div id="task-whiteboard-modal">
    <div class="whiteboard-content">
      <div class="whiteboard-header">
        <h2 style="margin:0; font-size: 2rem; color: #1e293b;"><i class="fa-solid fa-person-chalkboard"></i> Task Whiteboard</h2>
        <div>
          <button class="btn btn-secondary" onclick="document.querySelectorAll('.wb-answer').forEach(a => a.classList.toggle('revealed'))" style="font-size: 1.2rem; padding: 10px 20px; margin-right: 15px;">
            <i class="fa-solid fa-eye"></i> Toggle All Answers
          </button>
          <button class="btn btn-primary" onclick="document.getElementById('task-whiteboard-modal').classList.remove('visible')" style="font-size: 1.2rem; padding: 10px 20px;">
            <i class="fa-solid fa-xmark"></i> Close Whiteboard
          </button>
        </div>
      </div>
      <div id="whiteboard-questions-container"></div>
    </div>
  </div>
</body>`;

if (!indexContent.includes('id="task-whiteboard-modal"')) {
  indexContent = indexContent.replace('</body>', '\n' + modalHTML);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log("Injected Whiteboard Modal into index.html");
}

// 2. Update core_app.js
const appPath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

const oldBoardModeBtn = `const btnBoardMode = document.createElement('button');
    btnBoardMode.className = 'btn btn-secondary';
    btnBoardMode.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Board Mode';
    btnBoardMode.addEventListener('click', () => {
      document.body.classList.toggle('board-mode-active');
      const isActive = document.body.classList.contains('board-mode-active');
      btnBoardMode.innerHTML = isActive ? '<i class="fa-solid fa-person-chalkboard"></i> Board Mode: ON' : '<i class="fa-solid fa-person-chalkboard"></i> Board Mode';
      if (isActive) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    headerActions.appendChild(btnBoardMode);`;

const newWhiteboardBtn = `const btnWhiteboard = document.createElement('button');
    btnWhiteboard.className = 'btn btn-secondary';
    btnWhiteboard.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Task Whiteboard';
    btnWhiteboard.addEventListener('click', () => {
      openTaskWhiteboard();
    });
    headerActions.appendChild(btnWhiteboard);`;

if (appContent.includes(oldBoardModeBtn)) {
  appContent = appContent.replace(oldBoardModeBtn, newWhiteboardBtn);
}

const whiteboardFunc = `
  function openTaskWhiteboard() {
    const modal = document.getElementById('task-whiteboard-modal');
    if (!modal) return;
    
    const container = document.getElementById('whiteboard-questions-container');
    container.innerHTML = '';
    
    const urlParams = new URLSearchParams(window.location.search);
    let index = parseInt(urlParams.get('lesson'));
    if (isNaN(index)) index = 0;
    const activeLesson = unitData.lessons[index];
    
    assignQuestionNumbers(activeLesson);
    
    let html = '';
    
    const addQuestionCard = (qNum, questionText, answerText) => {
      html += \`
        <div class="wb-question-card">
          <div style="font-weight: bold; margin-bottom: 15px;">Q\${qNum}. \${questionText}</div>
          \${answerText ? \`<button class="btn btn-secondary" onclick="this.nextElementSibling.classList.toggle('revealed')" style="font-size: 1rem;"><i class="fa-solid fa-eye"></i> Show Answer</button>
          <div class="wb-answer">\${answerText}</div>\` : ''}
        </div>
      \`;
    };

    if (activeLesson.primary_source && activeLesson.primary_source.question) {
      addQuestionCard(activeLesson.primary_source.qNum, activeLesson.primary_source.question.replace(/^Enquiry:\\s*/, ""), activeLesson.primary_source.model_answer || '');
    }
    
    if (activeLesson.do_now) {
      if (activeLesson.do_now.type === "timeline" && activeLesson.do_now.prediction_question) {
        addQuestionCard(activeLesson.do_now.qNum, activeLesson.do_now.prediction_question.replace(/^Predict:\\s*/, ""), '');
      } else if (activeLesson.do_now.type === "questions") {
        activeLesson.do_now.items.forEach(item => {
           addQuestionCard(item.qNum, item.question.replace(/^\\d+\\.\\s*/, ""), item.answer || '');
        });
      }
    }
    
    if (activeLesson.narrative_blocks) {
      activeLesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          block.tasks.forEach(task => {
            let cleanTask = task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, "").replace(/\\s*\\(P\\d+\\)/gi, "");
            addQuestionCard(task.qNum, cleanTask, task.model || '');
          });
        }
      });
    }
    
    if (activeLesson.extended && activeLesson.extended.question) {
       addQuestionCard(activeLesson.extended.qNum, activeLesson.extended.question.replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, ""), '');
    }
    
    container.innerHTML = html;
    modal.classList.add('visible');
  }
`;

if (!appContent.includes('function openTaskWhiteboard')) {
  appContent = appContent + '\n' + whiteboardFunc;
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log("Injected Whiteboard logic into core_app.js");
}
