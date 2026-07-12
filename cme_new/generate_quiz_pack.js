const fs = require('fs');
const path = require('path');

// 1. Read QUIZ_DATA from questions.js
const questionsPath = path.join(__dirname, '../cme_structured/questions.js');
let questionsContent = fs.readFileSync(questionsPath, 'utf8');
const QUIZ_DATA = [];
// It has `const QUIZ_DATA = [...]` and `if (typeof exports !== 'undefined')`
// We can just require it!
const questionsModule = require(questionsPath);
const quizData = questionsModule.QUIZ_DATA || questionsModule.window?.QUIZ_DATA || eval(questionsContent + '; QUIZ_DATA');

// 2. Read SPEC_CHECKLIST_DATA
const specPath = path.join(__dirname, '../cme_structured/src/spec_checklist_data.js');
let specContent = fs.readFileSync(specPath, 'utf8');
let specStr = specContent.replace('export const SPEC_CHECKLIST_DATA = ', '').replace(/;\s*$/, '');
const SPEC_CHECKLIST_DATA = eval('(' + specStr + ')');

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Conflict in the Middle East - Printable Quiz Pack</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body { font-family: 'Outfit', sans-serif; margin: 0; padding: 0; }
    .print-page { position: relative; min-height: 27.2cm; box-sizing: border-box; page-break-after: always; }
    .print-page-last { position: relative; min-height: 27.2cm; box-sizing: border-box; page-break-after: always; margin-top: 20px; page-break-before: always; }
    .main-title { font-size: 16pt; font-weight: 800; border-bottom: 2px solid #000; padding-bottom: 5px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; color: #000; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  </style>
</head>
<body>
`;

quizData.forEach((topic) => {
  topic.subtopics.forEach((subtopic) => {
    const subtopicId = subtopic.id;
    // e.g. "Topic 1.1: The British withdrawal..." -> "1.1"
    const topicNameMatch = subtopic.title.match(/Topic (\d+\.\d+)/);
    const topicName = topicNameMatch ? topicNameMatch[1] : subtopicId;

    // Spec Box
    const specItems = SPEC_CHECKLIST_DATA[subtopicId] || [];
    const specBoxHtml = specItems.length > 0 ? `
      <div style="border: 2px solid #000; padding: 12px; margin-bottom: 15px; background: #fff; box-shadow: 4px 4px 0px #000;">
        <div style="font-weight: 800; text-transform: uppercase; margin-bottom: 8px; font-size: 11pt; color: #000;">📝 Curriculum Specification Checklist (Pearson Edexcel)</div>
        ${specItems.map(item => `
          <div style="display: flex; margin-bottom: 5px; align-items: flex-start;">
            <div style="margin-right: 8px; font-size: 12pt;">☐</div>
            <div style="font-size: 10.5pt; line-height: 1.3; color: #000;">${item.point}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    // Get 15 questions
    const easyQs = subtopic.easy || [];
    const mediumQs = subtopic.medium || [];
    const difficultQs = subtopic.difficult || [];

    const selectedQuestions = [];
    selectedQuestions.push(...easyQs.slice(0, Math.min(5, easyQs.length)));
    selectedQuestions.push(...mediumQs.slice(0, Math.min(5, mediumQs.length)));
    selectedQuestions.push(...difficultQs.slice(0, Math.min(5, difficultQs.length)));

    if (selectedQuestions.length < 15) {
      const allQs = [...easyQs, ...mediumQs, ...difficultQs];
      for (const q of allQs) {
        if (!selectedQuestions.some(sq => sq.id === q.id)) {
          selectedQuestions.push(q);
          if (selectedQuestions.length === 15) break;
        }
      }
    }

    const col1Questions = selectedQuestions.slice(0, 8);
    const col2Questions = selectedQuestions.slice(8, 15);

    // STUDENT QUIZ RENDER
    const renderQuizQuestion = (q, qIdx) => {
      return `
        <div style="margin-bottom: 18px; min-height: 55px; box-sizing: border-box; padding-right: 15px;">
          <div style="font-size: 14pt; line-height: 1.3; color: #000000; font-weight: 600;">
            Q${qIdx + 1}: <span style="font-weight: 600; color: #000000;">${q.question}</span>
          </div>
          <div style="border-bottom: 1.5px dashed #9ca3af; height: 25px; margin-top: 5px; width: 95%;"></div>
        </div>
      `;
    };

    // EXPLANATION RENDER
    const renderExplanationRow = (q, qIdx) => {
      return `
        <div style="margin-bottom: 16px; min-height: 65px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; padding-right: 15px; box-sizing: border-box;">
          <div style="font-size: 12.5pt; line-height: 1.3; color: #000000; font-weight: 700;">
            Q${qIdx + 1}: <span style="font-weight: 700; color: #000000;">${q.question}</span>
          </div>
          <div style="font-size: 12.5pt; font-weight: 800; color: #000000; margin-top: 4px;">
            Correct Answer: <span style="font-weight: 800; color: #000000;">${q.answer}</span>
          </div>
          <div style="font-size: 11.5pt; color: #374151; line-height: 1.3; margin-top: 4px; font-style: italic;">
            ${q.explanation}
          </div>
        </div>
      `;
    };

    const col1Html = col1Questions.map((q, idx) => renderQuizQuestion(q, idx)).join('');
    const col2Html = col2Questions.map((q, idx) => renderQuizQuestion(q, idx + 8)).join('');

    const col1ExpHtml = col1Questions.map((q, idx) => renderExplanationRow(q, idx)).join('');
    const col2ExpHtml = col2Questions.map((q, idx) => renderExplanationRow(q, idx + 8)).join('');

    // PAGE 1
    html += `
      <div class="print-page">
        <h2 class="main-title">Topic ${topicName}: Quick-Fire Quiz</h2>
        ${specBoxHtml}
        
        <div style="border: 2px solid #000000; padding: 12px; background: #f9fafb; border-radius: 4px; margin-bottom: 20px; box-sizing: border-box; text-align: left;">
          <strong style="text-transform: uppercase; font-size: 11pt; color: #000000; display: block; margin-bottom: 4px;">✏️ Instructions</strong>
          <span style="font-size: 10.5pt; line-height: 1.4; color: #000000; display: block;">
            Answer all 15 questions from memory. Write your answers clearly on the dotted lines. Keep your answers brief.
          </span>
        </div>

        <table>
          <colgroup><col width="50%"><col width="50%"></colgroup>
          <tbody>
            <tr>
              <td style="vertical-align: top; border-right: 1.5px solid #d1d5db; padding-right: 15px;">${col1Html}</td>
              <td style="vertical-align: top; padding-left: 20px;">${col2Html}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // PAGE 2 (ANSWER KEY)
    html += `
      <div class="print-page-last">
        <h3 style="font-size: 14pt; font-weight: 800; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; color: #000000; letter-spacing: 0.5px;">
          Topic ${topicName}: Quiz Answer Key & Explanations
        </h3>

        <table>
          <colgroup><col width="50%"><col width="50%"></colgroup>
          <tbody>
            <tr>
              <td style="vertical-align: top; border-right: 1.5px solid #d1d5db; padding-right: 15px;">${col1ExpHtml}</td>
              <td style="vertical-align: top; padding-left: 20px;">${col2ExpHtml}</td>
            </tr>
          </tbody>
        </table>

        <!-- Scoreboard & Diagnostic Feedback -->
        <table style="border-collapse: collapse; margin-top: 20px; border: 2px solid #000000; background: #f9fafb; table-layout: fixed; box-sizing: border-box; width: 100%;">
          <colgroup><col width="30%"><col width="40%"><col width="30%"></colgroup>
          <tbody>
            <tr>
              <td style="padding: 15px; border-right: 2px solid #000000; text-align: center; vertical-align: middle;">
                <div style="font-size: 12pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 8px;">Score Tracker</div>
                <div style="font-size: 20pt; font-weight: 800; color: #000000; border: 2px dashed #9ca3af; padding: 6px 15px; display: inline-block; background: #ffffff;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 15
                </div>
              </td>
              <td style="padding: 15px; border-right: 2px solid #000000; font-size: 10.5pt; line-height: 1.4; color: #000000;">
                <strong style="font-size: 11pt; color: #000000; text-transform: uppercase; display: block; margin-bottom: 5px;">📊 Performance Boundaries</strong>
                <div style="margin-bottom: 4px;"><strong>13–15 Marks:</strong> Mastery (Level 9 Focus) - Excellent recall.</div>
                <div style="margin-bottom: 4px;"><strong>10–12 Marks:</strong> Strong (Level 7 Focus) - Solid foundation.</div>
                <div><strong>Under 10 Marks:</strong> Focus Needed - Re-read narrative & vocabulary.</div>
              </td>
              <td style="padding: 15px; font-size: 10.5pt; line-height: 1.4; color: #000000;">
                <strong style="font-size: 11pt; color: #000000; text-transform: uppercase; display: block; margin-bottom: 5px;">🔍 Diagnostic study guide</strong>
                <div>If you struggled with any question:</div>
                <div style="margin-top: 4px;">1. Re-read the Lesson Study Narrative.</div>
                <div>2. Review the Vocab Spotlight terms.</div>
                <div>3. Re-test using active recall.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  });
});

html += `
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'quiz_pack.html'), html);
console.log('Successfully generated quiz_pack.html based on legacy questions.js');
