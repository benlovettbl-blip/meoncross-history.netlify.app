import fs from 'fs';
import { mock_exams } from './mock_exams.js';

const htmlTemplate = (mock, isMarkScheme = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mock.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap');
    
    * {
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: #f0f0f0;
      color: #000;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      background: white;
      margin: 20mm auto;
      padding: 20mm;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
      page-break-after: always;
    }

    @media print {
      body { background: white; }
      .page {
        margin: 0;
        padding: 15mm;
        box-shadow: none;
        width: 100%;
        min-height: 100%;
        page-break-after: always;
      }
    }

    /* Cover Page Styles */
    .cover-box {
      border: 3px solid #000;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .candidate-info {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }
    .input-box {
      border: 1px solid #000;
      height: 40px;
      margin-top: 5px;
    }
    .exam-header {
      border: 2px solid #000;
      border-radius: 10px;
      padding: 15px;
    }
    h1 { font-size: 24px; margin: 0 0 10px 0; }
    h2 { font-size: 20px; margin: 0 0 10px 0; }
    h3 { font-size: 16px; margin: 0 0 10px 0; }
    
    .instructions { margin-top: 30px; font-size: 14px; line-height: 1.5; }
    .instructions ul { padding-left: 20px; }
    .instructions li { margin-bottom: 5px; }

    /* Question Styles */
    .section-header {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      margin: 30px 0;
      text-transform: uppercase;
    }
    .question-block {
      margin-bottom: 30px;
    }
    .question-text {
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 10px;
      display: flex;
    }
    .question-num {
      width: 40px;
      flex-shrink: 0;
    }
    .marks {
      text-align: right;
      font-weight: normal;
      font-size: 14px;
      color: #333;
      margin-top: 5px;
    }

    /* Dotted Lines */
    .dotted-line {
      border-bottom: 1px dotted #999;
      height: 32px;
      width: 100%;
    }
    
    /* Follow up table */
    .follow-up-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .follow-up-table td {
      border: 1px solid #000;
      padding: 10px;
      height: 120px;
      vertical-align: top;
      font-size: 14px;
    }

    /* Sources Booklet */
    .sources-booklet {
      border: 2px solid #000;
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
    }
    .source-block {
      margin-bottom: 25px;
    }
    .source-title {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .source-content {
      font-family: 'Times New Roman', serif;
      font-size: 15px;
      line-height: 1.5;
      padding-left: 10px;
      border-left: 3px solid #ccc;
    }
    
    /* Model Answer Box */
    .model-answer {
      background: #f8fafc;
      border-left: 4px solid #10b981;
      padding: 20px;
      margin-top: 15px;
      font-family: 'Georgia', serif;
      font-size: 15px;
      line-height: 1.6;
      color: #0f172a;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border-radius: 4px;
    }
    .model-answer-title {
      font-family: 'Arial', sans-serif;
      font-weight: bold;
      color: #059669;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-size: 13px;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="page">
    <div style="text-align: center; margin-bottom: 10px; font-weight: bold;">
      Please check the examination details below before entering your candidate information
    </div>
    
    <div class="cover-box">
      <div class="candidate-info">
        <div style="flex: 2;">
          <div>Candidate surname</div>
          <div class="input-box" style="border-radius: 5px;"></div>
        </div>
        <div style="flex: 1;">
          <div>Other names</div>
          <div class="input-box" style="border-radius: 5px;"></div>
        </div>
      </div>
      <div class="candidate-info">
        <div style="flex: 1;">
          <div>Centre Number</div>
          <div style="display:flex; gap: 5px; margin-top:5px;">
            <div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div>
          </div>
        </div>
        <div style="flex: 1;">
          <div>Candidate Number</div>
          <div style="display:flex; gap: 5px; margin-top:5px;">
            <div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div><div class="input-box" style="flex:1;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="exam-header">
      <h1>Pearson Edexcel GCSE (9–1)</h1>
      <div style="border: 1px solid #000; padding: 10px; margin-bottom: 15px; font-size: 20px; font-weight: bold;">
        Mock Examination ${isMarkScheme ? '<span style="color:#059669;">(TEACHER MARK SCHEME & EXEMPLARS)</span>' : ''}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px;">
        <div>Morning (Time: 1 hour 20 minutes)</div>
        <div style="background: #333; color: white; padding: 5px 15px; font-weight: bold; border-radius: 5px;">Paper reference: ${mock.paper_reference}</div>
      </div>
      <h2>History</h2>
      <h3>PAPER 1: Thematic study and historic environment</h3>
      <h3>Option 11: Medicine in Britain, c1250–present and The British sector of the Western Front, 1914–18: injuries, treatment and the trenches</h3>
    </div>

    <div style="border: 2px solid #000; border-radius: 10px; padding: 15px; margin-top: 15px; display: flex; justify-content: space-between;">
      <div>
        <strong>You must have:</strong><br>
        Sources Booklet (enclosed)
      </div>
      <div style="border: 1px solid #000; padding: 10px; text-align: center; width: 80px; height: 60px;">
        Total<br>Marks
      </div>
    </div>

    <div class="instructions">
      <h3>Instructions</h3>
      <ul>
        <li>Use <strong>black</strong> ink or ball-point pen.</li>
        <li><strong>Fill in the boxes</strong> at the top of this page with your name, centre number and candidate number.</li>
        <li>There are two sections in this question paper. Answer all parts of Questions 1 and 2 from Section A. From Section B, answer Questions 3 and 4 and then <strong>EITHER</strong> Question 5 <strong>OR</strong> Question 6.</li>
        <li>Answer the questions in the spaces provided – <em>there may be more space than you need.</em></li>
      </ul>

      <h3>Information</h3>
      <ul>
        <li>The total mark for this paper is ${mock.total_marks}.</li>
        <li>The marks for <strong>each</strong> question are shown in brackets – <em>use this as a guide as to how much time to spend on each question.</em></li>
        <li>The marks available for spelling, punctuation, grammar and use of specialist terminology are clearly indicated.</li>
      </ul>

      <h3>Advice</h3>
      <ul>
        <li>Read each question carefully before you start to answer it.</li>
        <li>Check your answers if you have time at the end.</li>
      </ul>
    </div>
  </div>

  ${generateSection(mock.section_a, false, isMarkScheme)}
  ${generateSection(mock.section_b, true, isMarkScheme)}
  ${generateSourcesBooklet(mock)}

</body>
</html>
`;

function generateSection(section, forceNewPage, isMarkScheme) {
  if (!section) return '';
  let html = `<div class="page" ${forceNewPage ? 'style="page-break-before: always;"' : ''}>`;
  html += `<div class="section-header">${section.title}</div>`;

  section.questions.forEach(q => {
    if (q.type === 'either_or') {
      html += `<div class="question-block" style="page-break-before: always;">
        <div style="font-weight: bold; margin-bottom: 20px;">${q.instruction.replace(/\\n/g, '<br>')}</div>
        <div style="font-weight: bold; margin-bottom: 20px;">EITHER</div>
        ${generateQuestionText(q.q5, false)}
        <div style="font-weight: bold; margin: 20px 0;">OR</div>
        ${generateQuestionText(q.q6, false)}
        <div class="marks">(Total for spelling, punctuation, grammar and use of specialist terminology = ${q.spag_marks} marks)</div>
        <div class="marks" style="font-weight:bold;">(Total for Question = ${q.q5.marks + q.spag_marks} marks)</div>
        
        <div style="margin-top: 30px; border: 1px solid #000; padding: 15px;">
           <strong>Indicate which question you are answering by marking a cross in the box [X].</strong><br><br>
           Chosen question number: &nbsp;&nbsp;&nbsp; Question 5 [ ] &nbsp;&nbsp;&nbsp; Question 6 [ ]
        </div>
        ${isMarkScheme && (q.q5.model_answer || q.q6.model_answer) ? `
          ${q.q5.model_answer ? `<div class="model-answer"><div class="model-answer-title"><i class="fa-solid fa-star"></i> Question 5 Model Answer (Grade 9)</div>${q.q5.model_answer.replace(/\\n/g, '<br>')}</div>` : ''}
          ${q.q6.model_answer ? `<div class="model-answer" style="margin-top: 30px;"><div class="model-answer-title"><i class="fa-solid fa-star"></i> Question 6 Model Answer (Grade 9)</div>${q.q6.model_answer.replace(/\\n/g, '<br>')}</div>` : ''}
        ` : generateLines(q.lines || 40)}
      </div>`;
    } else if (q.type === 'follow_up') {
      html += `<div class="question-block" style="page-break-inside: avoid;">
        <div class="question-text">
          <div class="question-num">${q.num}</div>
          <div>${q.text.replace(/\\n/g, '<br>')}</div>
        </div>
        <div class="marks">(${q.marks})</div>
        <table class="follow-up-table">
          <tr><td>Detail in Source B that I would follow up:</td></tr>
          <tr><td>Question I would ask:</td></tr>
          <tr><td>What type of source I could use:</td></tr>
          <tr><td>How this might help answer my question:</td></tr>
        </table>
        <div class="marks" style="font-weight:bold; margin-top:10px;">(Total for Question 2 = 12 marks)</div>
      </div>`;
    } else {
      html += `<div class="question-block" style="page-break-inside: avoid;">
        ${generateQuestionText(q, true)}
        ${isMarkScheme && q.model_answer ? `
          <div class="model-answer">
            <div class="model-answer-title"><i class="fa-solid fa-star"></i> Model Answer (Grade 9)</div>
            ${q.model_answer.replace(/\\n/g, '<br>')}
          </div>
        ` : generateLines(q.lines || 5)}
      </div>`;
    }
  });

  html += `</div>`;
  return html;
}

function generateQuestionText(q, includeMarksLabel) {
  let h = `<div class="question-text">
    <div class="question-num">${q.num}</div>
    <div>${q.text.replace(/\\n/g, '<br>')}</div>
  </div>`;
  
  if (q.bullet_points) {
    h += `<div style="margin-left: 40px; margin-bottom: 10px; border: 1px solid #ccc; padding: 15px; border-radius: 8px;">
      You <strong>may</strong> use the following in your answer:
      <ul style="margin-top: 10px; margin-bottom: 10px; padding-left: 20px;">
        ${q.bullet_points.map(bp => `<li>${bp}</li>`).join('')}
      </ul>
      You <strong>must</strong> also use information of your own.
    </div>`;
  }
  
  h += `<div class="marks">(${q.marks})</div>`;
  return h;
}

function generateLines(count) {
  let html = '<div style="margin-top: 10px;">';
  for (let i = 0; i < count; i++) {
    html += '<div class="dotted-line"></div>';
  }
  html += '</div>';
  return html;
}

function generateSourcesBooklet(mock) {
  let hasSources = false;
  let sourcesHtml = '';
  
  mock.section_a.questions.forEach(q => {
    if (q.sources) {
      hasSources = true;
      q.sources.forEach(s => {
        sourcesHtml += `<div class="source-block">
          <div class="source-title">${s.id}: ${s.provenance}</div>
          <div class="source-content">
            ${s.image ? `<img src="${s.image}" style="max-width: 100%; max-height: 350px; display: block; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px;" alt="Visual Source" />` : ''}
            ${s.content ? s.content.replace(/\\n/g, '<br><br>') : ''}
          </div>
        </div>`;
      });
    }
  });

  if (!hasSources) return '';

  return `
  <div class="page" style="page-break-before: always;">
    <div class="exam-header" style="text-align: center; margin-bottom: 30px;">
      <h1>Sources Booklet</h1>
      <div style="font-size: 16px;">Do not return this Booklet with the question paper.</div>
    </div>
    <div class="sources-booklet">
      <h3>Sources for use with Section A.</h3>
      ${sourcesHtml}
    </div>
  </div>
  `;
}

// Generate the files
mock_exams.forEach(mock => {
  // 1. Student Paper
  const studentOutput = htmlTemplate(mock, false);
  fs.writeFileSync(`edexcel_medicine/${mock.id}.html`, studentOutput);
  console.log(`Generated ${mock.id}.html`);
  
  // 2. Teacher Mark Scheme (only if there are model answers)
  let hasModelAnswers = false;
  if (mock.section_b && mock.section_b.questions) {
    mock.section_b.questions.forEach(q => {
      if (q.model_answer || (q.type === 'either_or' && (q.q5?.model_answer || q.q6?.model_answer))) {
        hasModelAnswers = true;
      }
    });
  }
  
  if (hasModelAnswers) {
    const msOutput = htmlTemplate(mock, true);
    fs.writeFileSync(`edexcel_medicine/${mock.id}_mark_scheme.html`, msOutput);
    console.log(`Generated ${mock.id}_mark_scheme.html`);
  }
});
