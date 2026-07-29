const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lessons.js');
let content = fs.readFileSync(filePath, 'utf8');

const searchStr = `          if (selectedQuestions.length === 15) break;

    const col1Html = col1Questions.map((q, idx) => renderQuizQuestion(q, idx)).join('');`;

const replaceStr = `          if (selectedQuestions.length === 15) break;
        }
      }
    }

    // Split selected questions into two columns for Page 1 (Q1-8, Q9-15)
    const col1Questions = selectedQuestions.slice(0, 8);
    const col2Questions = selectedQuestions.slice(8, 15);

    const renderQuizQuestion = (q, qIdx) => {
      const answerArea = includeAnswers 
        ? \`<div style="color: #16a34a; font-style: italic; font-weight: bold; margin-top: 2px; font-size: 10.5pt;">Ans: \${q.answer}</div>\`
        : \`<div class="dotted-writing-line" style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px; width: 95%;"></div>\`;
      return \`
        <div style="margin-bottom: 14px; min-height: 48px; box-sizing: border-box; padding-right: 10px;">
          <div style="font-size: 11pt; line-height: 1.3; color: #000000; font-weight: bold;">
            Q\${qIdx + 1}: <span style="font-weight: normal; color: #000000;">\${q.question}</span>
          </div>
          \${answerArea}
        </div>
      \`;
    };

    const renderExplanationRow = (q, qIdx) => {
      return \`
        <div style="margin-bottom: 14px; min-height: 55px; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px; padding-right: 10px; box-sizing: border-box;">
          <div style="font-size: 10.5pt; line-height: 1.25; color: #000000; font-weight: bold;">
            Q\${qIdx + 1}: <span style="font-weight: normal; color: #000000;">\${q.question}</span>
          </div>
          <div style="font-size: 10.5pt; font-weight: bold; color: #16a34a; margin-top: 2px;">
            Correct Answer: <span style="font-weight: normal; color: #000000;">\${q.answer}</span>
          </div>
          <div style="font-size: 10pt; color: #000000; line-height: 1.25; margin-top: 2px;">
            <em>\${q.explanation}</em>
          </div>
        </div>
      \`;
    };

    const col1Html = col1Questions.map((q, idx) => renderQuizQuestion(q, idx)).join('');`;

if (content.includes(searchStr)) {
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully fixed lessons.js!");
} else {
    console.log("Could not find the target string.");
}
