import fs from 'fs';

// 1. Update core_app.js
const corePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let coreContent = fs.readFileSync(corePath, 'utf8');

const oldAddQuestion = `    const addQuestionCard = (qNum, questionText, answerText) => {
      html += \`
        <div class="wb-question-card">
          <div style="font-weight: bold; margin-bottom: 15px;">Q\${qNum}. \${questionText}</div>
          \${answerText ? \`<button class="btn btn-secondary" onclick="this.nextElementSibling.classList.toggle('revealed')" style="font-size: 1rem;"><i class="fa-solid fa-eye"></i> Show Answer</button>
          <div class="wb-answer">\${answerText}</div>\` : ''}
        </div>
      \`;
    };`;

const newAddQuestion = `    const addQuestionCard = (qNum, questionText, answerText) => {
      html += \`
        <div class="wb-question-card" \${answerText ? 'style="cursor:pointer;" onclick="this.querySelector(\\\'.wb-answer\\\').classList.toggle(\\\'revealed\\\')"' : ''} title="\${answerText ? 'Click to reveal answer' : ''}">
          <div style="font-weight: bold; \${answerText ? '' : 'margin-bottom: 0;'}">Q\${qNum}. \${questionText}</div>
          \${answerText ? \`<div class="wb-answer">\${answerText}</div>\` : ''}
        </div>
      \`;
    };`;

coreContent = coreContent.replace(oldAddQuestion, newAddQuestion);
fs.writeFileSync(corePath, coreContent, 'utf8');

// 2. Update index.html styles
const indexPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

const oldStyles = `    .wb-question-card {
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

const newStyles = `    .wb-question-card {
      font-size: 1rem;
      padding: 12px;
      background: #f8fafc;
      border: 2px solid #cbd5e1;
      border-radius: 6px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      transition: background 0.2s ease;
    }
    .wb-question-card:hover {
      background: #f1f5f9;
    }
    .wb-answer {
      display: none;
      margin-top: 8px;
      padding: 8px 12px;
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      font-size: 0.95rem;
      color: #166534;
      border-radius: 4px;
    }`;

indexContent = indexContent.replace(oldStyles, newStyles);
fs.writeFileSync(indexPath, indexContent, 'utf8');

console.log("Patched core_app.js and index.html for smaller, clickable whiteboard cards.");
