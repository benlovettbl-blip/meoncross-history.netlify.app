const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');
let jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
const unitData = eval('(' + jsonStr + ')');

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Printable Quiz Pack</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 14pt; line-height: 1.6; color: #000; background: #fff; margin: 0; padding: 0; }
    .main-title { font-family: 'Playfair Display', serif; font-size: 24pt; font-weight: 700; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px; text-transform: uppercase; }
    .print-page { position: relative; min-height: 27.2cm; box-sizing: border-box; page-break-after: always; }
    .print-page-last { position: relative; min-height: 27.2cm; box-sizing: border-box; page-break-after: always; }
    .question-col { width: 50%; vertical-align: top; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  </style>
</head>
<body>
`;

unitData.lessons.forEach((lesson, index) => {
  if (!lesson.do_now || !lesson.do_now.items || lesson.do_now.items.length === 0) return;

  const questions = lesson.do_now.items;
  const numQuestions = questions.length;
  const midPoint = Math.ceil(numQuestions / 2);
  const col1Questions = questions.slice(0, midPoint);
  const col2Questions = questions.slice(midPoint);

  const renderQuizQuestion = (q, qIdx) => {
    return `
      <div style="margin-bottom: 28px; min-height: 65px; box-sizing: border-box; padding-right: 15px;">
        <div style="font-size: 13.5pt; line-height: 1.4; color: #000000; font-weight: 500;">
          <strong>Q${qIdx + 1}:</strong> ${q.question}
        </div>
        <div style="border-bottom: 1.5px dashed #9ca3af; height: 25px; margin-top: 5px; width: 95%;"></div>
      </div>
    `;
  };

  const renderExplanationRow = (q, qIdx) => {
    return `
      <div style="margin-bottom: 28px; min-height: 65px; border-bottom: 1.5px solid #f3f4f6; padding-bottom: 10px; padding-right: 15px; box-sizing: border-box;">
        <div style="font-size: 13.5pt; line-height: 1.4; color: #000000; font-weight: 500;">
          <strong>Q${qIdx + 1}:</strong> ${q.question}
        </div>
        <div style="font-size: 13.5pt; font-weight: bold; color: #16a34a; margin-top: 5px;">
          Correct Answer: <span style="font-weight: 500; color: #000;">${q.answer}</span>
        </div>
      </div>
    `;
  };

  const col1Html = col1Questions.map((q, idx) => renderQuizQuestion(q, idx)).join('');
  const col2Html = col2Questions.map((q, idx) => renderQuizQuestion(q, idx + midPoint)).join('');

  const col1ExpHtml = col1Questions.map((q, idx) => renderExplanationRow(q, idx)).join('');
  const col2ExpHtml = col2Questions.map((q, idx) => renderExplanationRow(q, idx + midPoint)).join('');

  // SIDE 1: STUDENT QUIZ
  html += `
    <div class="print-page">
      <h2 class="main-title">Topic ${index + 1}: Quick-Fire Quiz</h2>
      
      <div style="border: 1.5px solid #000000; padding: 12px; background: #f9fafb; border-radius: 4px; margin-bottom: 20px; box-sizing: border-box; text-align: left;">
        <strong style="text-transform: uppercase; font-size: 12pt; color: #000000; display: block; margin-bottom: 4px;">✏️ Instructions</strong>
        <span style="font-size: 11.5pt; line-height: 1.4; color: #000000; display: block;">
          Answer all ${numQuestions} questions from memory. Write your answers clearly on the dotted lines. Keep your answers brief.
        </span>
      </div>

      <table>
        <colgroup><col width="50%"><col width="50%"></colgroup>
        <tbody>
          <tr>
            <td class="question-col" style="border-right: 1.5px solid #d1d5db; padding-right: 15px;">${col1Html}</td>
            <td class="question-col" style="padding-left: 20px;">${col2Html}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // SIDE 2: ANSWER KEY
  html += `
    <div class="print-page-last">
      <h3 style="font-size: 18pt; font-weight: bold; border-bottom: 1.5px solid #000000; padding-bottom: 5px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; color: #000000;">
        Topic ${index + 1}: Quiz Answer Key
      </h3>

      <table>
        <colgroup><col width="50%"><col width="50%"></colgroup>
        <tbody>
          <tr>
            <td class="question-col" style="border-right: 1.5px solid #d1d5db; padding-right: 15px;">${col1ExpHtml}</td>
            <td class="question-col" style="padding-left: 20px;">${col2ExpHtml}</td>
          </tr>
        </tbody>
      </table>

      <!-- Scoreboard & Diagnostic Feedback -->
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1.5px solid #000000; background: #f9fafb; table-layout: fixed; box-sizing: border-box;">
        <colgroup>
          <col width="30%">
          <col width="40%">
          <col width="30%">
        </colgroup>
        <tbody>
          <tr>
            <td style="padding: 15px; border-right: 1.5px solid #000000; text-align: center; vertical-align: middle;">
              <div style="font-size: 12.5pt; font-weight: bold; color: #000000; text-transform: uppercase; margin-bottom: 6px;">Score Tracker</div>
              <div style="font-size: 22pt; font-weight: 800; color: #000000; border: 1.5px dashed #9ca3af; padding: 6px 15px; display: inline-block; background: #ffffff;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${numQuestions}
              </div>
            </td>
            <td style="padding: 15px; border-right: 1.5px solid #000000; font-size: 11pt; line-height: 1.4; color: #000000;">
              <strong style="font-size: 12.5pt; color: #000000; text-transform: uppercase; display: block; margin-bottom: 5px;">📊 Performance Boundaries</strong>
              <div style="margin-bottom: 4px;"><strong>${Math.floor(numQuestions * 0.85)}–${numQuestions} Marks:</strong> Mastery - Excellent recall.</div>
              <div style="margin-bottom: 4px;"><strong>${Math.floor(numQuestions * 0.6)}–${Math.floor(numQuestions * 0.85) - 1} Marks:</strong> Strong - Solid foundation.</div>
              <div><strong>Under ${Math.floor(numQuestions * 0.6)} Marks:</strong> Focus Needed - Re-read narrative.</div>
            </td>
            <td style="padding: 15px; font-size: 11pt; line-height: 1.4; color: #000000;">
              <strong style="font-size: 12.5pt; color: #000000; text-transform: uppercase; display: block; margin-bottom: 5px;">🔍 Diagnostic study guide</strong>
              <div>If you struggled with any question:</div>
              <div style="margin-top: 4px;">1. Re-read the Lesson Narrative.</div>
              <div style="margin-top: 2px;">2. Review the Vocab Spotlight terms.</div>
              <div style="margin-top: 2px;">3. Re-test using active recall.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
});

html += `
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'quiz_pack.html'), html);
console.log('Quiz Pack generated successfully at cme_new/quiz_pack.html');
