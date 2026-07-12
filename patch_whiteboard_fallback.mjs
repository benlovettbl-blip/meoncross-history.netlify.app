import fs from 'fs';

const corePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let coreContent = fs.readFileSync(corePath, 'utf8');

// 1. Fix the extended and prediction question calls to pass the model if it exists
coreContent = coreContent.replace(
  `addQuestionCard(activeLesson.do_now.qNum, activeLesson.do_now.prediction_question.replace(/^Predict:\\s*/, ""), '');`,
  `addQuestionCard(activeLesson.do_now.qNum, activeLesson.do_now.prediction_question.replace(/^Predict:\\s*/, ""), activeLesson.do_now.model || activeLesson.do_now.answer || '');`
);

coreContent = coreContent.replace(
  `addQuestionCard(activeLesson.extended.qNum, activeLesson.extended.question.replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, ""), '');`,
  `addQuestionCard(activeLesson.extended.qNum, activeLesson.extended.question.replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, ""), activeLesson.extended.model || activeLesson.extended.answer || '');`
);

// 2. Fix the addQuestionCard function to ALWAYS provide a fallback answer and make it clickable
const oldAddQuestionRegex = /const addQuestionCard = \(qNum, questionText, answerText\) => \{[\s\S]*?\};/;
const newAddQuestion = `const addQuestionCard = (qNum, questionText, answerText) => {
      const finalAnswer = answerText || "Model answer to be discussed in class.";
      html += \`
        <div class="wb-question-card" style="cursor:pointer;" onclick="this.querySelector('.wb-answer').classList.toggle('revealed')" title="Click to reveal answer">
          <div style="font-weight: bold;">Q\${qNum}. \${questionText}</div>
          <div class="wb-answer">\${finalAnswer}</div>
        </div>
      \`;
    };`;

coreContent = coreContent.replace(oldAddQuestionRegex, newAddQuestion);

fs.writeFileSync(corePath, coreContent, 'utf8');
console.log("Patched core_app.js to always provide a clickable fallback answer.");
