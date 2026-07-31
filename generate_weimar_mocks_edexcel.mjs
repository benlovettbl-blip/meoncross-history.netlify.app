import fs from 'fs';
import { unitData } from './weimar_nazi_germany/data.js';

// Read the questions
const mocksFile = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/extracted_mocks.json', 'utf8');
const { extractedMocks, adapted2026 } = JSON.parse(mocksFile);

const mockGroups = {
    mock_notebook_1: extractedMocks.filter(m => m.id.startsWith('mock1')),
    mock_notebook_2: extractedMocks.filter(m => m.id.startsWith('mock2')),
    mock_notebook_3: extractedMocks.filter(m => m.id.startsWith('mock3')),
    mock_adapted_2026: adapted2026
};

const htmlTemplate = (mockId, mockTitle, questions, isMarkScheme = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mockTitle}${isMarkScheme ? ' - Mark Scheme' : ''}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      font-family: 'Open Sans', Arial, sans-serif;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: #e0e0e0;
      color: #000;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      background: white;
      margin: 20mm auto;
      padding: 15mm;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
    }

    @media print {
      body { background: white; }
      .no-print { display: none !important; }
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
    .top-warning {
      text-align: center;
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 5px;
    }
    
    .cover-box {
      border: 3px solid #666;
      border-radius: 15px;
      padding: 15px 20px;
      margin-bottom: 20px;
    }
    .candidate-info {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }
    .candidate-info:last-child {
      margin-bottom: 0;
    }
    .input-label {
      font-size: 13px;
      margin-bottom: 4px;
    }
    .input-box {
      border: 2px solid #666;
      border-radius: 5px;
      height: 35px;
      background: white;
    }
    .char-box {
      border: 2px solid #666;
      border-radius: 5px;
      height: 35px;
      width: 25px;
      display: inline-block;
      background: white;
      margin-right: 2px;
    }
    
    .edexcel-title {
      font-size: 26px;
      font-weight: 700;
      margin: 15px 0 5px 0;
      letter-spacing: -0.5px;
    }

    .exam-header {
      border: 3px solid #666;
      border-radius: 15px;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    
    .exam-header-left {
      flex: 3;
    }
    .exam-header-right {
      flex: 1;
      background: #555;
      color: white;
      border-radius: 10px;
      padding: 10px;
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .date-text {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .time-text {
      font-size: 14px;
      margin-bottom: 20px;
    }
    
    .subject-title {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
    }
    
    .booklet-title {
      font-size: 18px;
      font-weight: 700;
      margin-top: 5px;
    }

    .paper-ref-label {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .paper-ref-val {
      font-size: 28px;
      font-weight: 700;
    }

    .must-have-box {
      border: 3px solid #666;
      border-radius: 15px;
      padding: 15px 20px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
    }
    .total-marks-box {
      border: 3px solid #666;
      border-radius: 10px;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }

    .instructions-section {
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 15px;
    }
    .instructions-section h3 {
      font-size: 18px;
      margin: 0 0 10px 0;
    }
    .instructions-section ul {
      margin: 0;
      padding-left: 20px;
    }
    .instructions-section li {
      margin-bottom: 4px;
    }

    .footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
    }
    .barcode {
      font-family: 'Libre Barcode 39 Text', monospace;
      font-size: 30px;
      letter-spacing: 2px;
    }
    .turn-over {
      font-weight: 700;
      font-size: 14px;
      font-style: italic;
    }
    .pearson-logo {
      font-size: 24px;
      font-weight: 700;
      font-family: serif;
    }

    /* Inner Page Styles */
    .page-inner {
      flex: 1;
      position: relative;
    }
    
    .margin-watermark {
      position: absolute;
      top: 0;
      right: -15mm;
      bottom: 0;
      width: 40mm;
      background: repeating-linear-gradient(
        -45deg,
        #f0f0f0,
        #f0f0f0 2px,
        #ffffff 2px,
        #ffffff 4px
      );
      border-left: 2px solid #ddd;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      overflow: hidden;
    }
    
    .watermark-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      color: #666;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 1px;
      white-space: nowrap;
      text-transform: uppercase;
    }

    .inner-header {
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .question-block {
      margin-bottom: 20px;
    }
    .question-text {
      font-weight: 600;
      font-size: 14px;
      display: flex;
    }
    .question-num {
      width: 35px;
      flex-shrink: 0;
      font-weight: 700;
    }
    .marks {
      text-align: right;
      font-weight: 400;
      font-size: 14px;
      color: #444;
      margin-top: 5px;
    }

    /* Dotted Lines for Handwriting */
    .dotted-line {
      border-bottom: 1.5px dotted #999;
      height: 28px;
      width: 100%;
    }

    .choice-box {
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 15px;
      margin: 20px 0;
    }
    
    .checkbox-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    .checkbox-item:last-child {
      margin-bottom: 0;
    }
    .checkbox-square {
      width: 16px;
      height: 16px;
      border: 1px solid #000;
      margin-right: 15px;
      margin-top: 2px;
      flex-shrink: 0;
    }
    
    .bullet-point-box {
      border: 1px solid #999;
      border-radius: 10px;
      padding: 15px 20px;
      margin: 15px 0 15px 35px;
      width: 80%;
      background: #fff;
    }
    .bullet-point-box ul {
      margin: 5px 0 0 0;
      padding-left: 20px;
    }
    
    .indicate-choice {
      font-weight: 600;
      font-size: 14px;
      margin: 10px 0 20px 35px;
    }

    .source-box {
      border: 2px solid #000;
      padding: 15px;
      margin-bottom: 20px;
      font-size: 14px;
      background: #fdfdfd;
      border-radius: 8px;
    }
    .model-answer {
      font-size: 14px;
      color: #b91c1c;
      font-weight: 600;
      padding: 15px;
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      margin-bottom: 20px;
    }
  
    .print-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 30px;
      background-color: #2563eb;
      color: white;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: background-color 0.2s;
    }
    .print-button:hover {
      background-color: #1d4ed8;
    }
  </style>
</head>
<body>
  <button class="print-button no-print" onclick="window.print()">🖨️ Print to PDF</button>

  ${!isMarkScheme ? `
  <!-- Cover Page -->
  <div class="page">
    <div class="top-warning">
      Please check the examination details below before entering your candidate information
    </div>
    
    <div class="cover-box">
      <div class="candidate-info">
        <div style="flex: 2;">
          <div class="input-label">Candidate surname</div>
          <div class="input-box"></div>
        </div>
        <div style="flex: 1.5;">
          <div class="input-label">Other names</div>
          <div class="input-box"></div>
        </div>
      </div>
      <div class="candidate-info">
        <div style="flex: 1;">
          <div class="input-label">Centre Number</div>
          <div>
            <div class="char-box"></div><div class="char-box"></div><div class="char-box"></div><div class="char-box"></div><div class="char-box"></div>
          </div>
        </div>
        <div style="flex: 1;">
          <div class="input-label">Candidate Number</div>
          <div>
            <div class="char-box"></div><div class="char-box"></div><div class="char-box"></div><div class="char-box"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="edexcel-title">Pearson Edexcel GCSE (9-1)</div>

    <div class="exam-header">
      <div class="exam-header-left">
        <div class="date-text">Tuesday 9 June 2026</div>
        <div class="time-text">Afternoon (Time: 1 hour 20 minutes)</div>
        <div class="subject-title">History</div>
        <div class="booklet-title">Paper 3: Modern depth study</div>
        <div class="booklet-title" style="font-size: 16px; margin-top: 10px;">Option 31: Weimar and Nazi Germany, 1918-39</div>
      </div>
      <div class="exam-header-right">
        <div class="paper-ref-label">Paper<br>reference</div>
        <div class="paper-ref-val">1HI0/31</div>
      </div>
    </div>

    <div style="display: flex; gap: 10px;">
      <div class="must-have-box" style="flex: 1;">
        <div>
          <strong>You must have:</strong><br>
          Sources/Interpretations Booklet (enclosed)
        </div>
      </div>
      <div class="total-marks-box">
        Total Marks
      </div>
    </div>

    <div class="instructions-section">
      <h3>Instructions</h3>
      <ul>
        <li>Use <strong>black</strong> ink or ball-point pen.</li>
        <li><strong>Fill in the boxes</strong> at the top of this page with your name,<br>centre number and candidate number.</li>
        <li>Answer <strong>all</strong> questions in Section A and Section B.</li>
        <li>Answer the questions in the spaces provided<br><em>- there may be more space than you need.</em></li>
      </ul>
    </div>

    <div class="instructions-section">
      <h3>Information</h3>
      <ul>
        <li>The total mark for this paper is 52.</li>
        <li>The marks for <strong>each</strong> question are shown in brackets<br><em>- use this as a guide as to how much time to spend on each question.</em></li>
        <li>The marks available for spelling, punctuation, grammar and use of specialist terminology are clearly indicated.</li>
      </ul>
    </div>

    <div class="instructions-section">
      <h3>Advice</h3>
      <ul>
        <li>Read each question carefully before you start to answer it.</li>
        <li>Try to divide your time equally between Section A and Section B.</li>
        <li>Check your answers if you have time at the end.</li>
      </ul>
    </div>

    <div class="footer">
      <div>P79031A<br>&copy;2026 Pearson Education Ltd.</div>
      
      <div style="display:flex; align-items:center; gap:20px;">
        <span class="turn-over">Turn over &#9654;</span>
        <span class="pearson-logo">Pearson</span>
      </div>
    </div>
  </div>
  ` : `
  <div class="page">
    <div class="edexcel-title">Mark Scheme (Results)</div>
    <div class="subject-title">History</div>
    <div class="booklet-title">Paper 3: Modern depth study</div>
    <div class="booklet-title" style="font-size: 16px; margin-top: 10px;">Option 31: Weimar and Nazi Germany, 1918-39</div>
    <h2 style="color: #b91c1c; text-align: center; margin-top: 40px;">${mockTitle} - Teacher Copy</h2>
  </div>
  `}

  ${generateQuestions(questions, isMarkScheme)}

</body>
</html>
`;

function generateQuestions(questions, isMarkScheme) {
  let html = '';
  
  const pageFooter = `
    <div class="footer">
      <div></div>
      <div class="turn-over">Turn over &#9654;</div>
    </div>
  `;
  
  questions.forEach((q, idx) => {
    html += '<div class="page"><div class="page-inner">';
    
    if (idx === 0) {
      html += '<div class="inner-header">SECTION A<br><br>Answer ALL questions in this section.</div>';
    }

    if (q.type === 'q3_enquiry') {
      html += '<div class="inner-header">SECTION B<br><br>For use with Section B, Answer ALL questions.</div>';
      
      if (q.source_context) {
        html += `<div class="source-box">${q.source_context.replace(/\n/g, '<br>')}</div>`;
      }
      if (isMarkScheme && q.model_answer) {
        html += `<div class="model-answer">${q.model_answer.replace(/\n/g, '<br>')}</div>`;
      }
      
      if (!isMarkScheme) {
        let parts = (q.question || '').split(/\n\n|\n/).filter(p => p.trim() !== '');
        
        // Start a new page for the questions
        html += `${pageFooter}</div></div><div class="page"><div class="page-inner">`;
        
        // 3(a)
        html += `<div style="font-weight: bold; margin-bottom: 20px;">${parts[0]}<br><br>${parts[1]}</div>`;
        for(let i=0; i<15; i++) html += '<div class="dotted-line"></div>';
        html += `${pageFooter}</div></div><div class="page"><div class="page-inner">`;
        for(let i=0; i<28; i++) html += '<div class="dotted-line"></div>';
        
        // 3(b) & 3(c) on the same page
        html += `${pageFooter}</div></div><div class="page"><div class="page-inner">`;
        html += `<div style="font-weight: bold; margin-bottom: 20px;">${parts[2]}</div>`;
        for(let i=0; i<10; i++) html += '<div class="dotted-line"></div>';
        html += `<div style="font-weight: bold; margin-bottom: 20px; margin-top: 30px;">${parts[3]}</div>`;
        for(let i=0; i<10; i++) html += '<div class="dotted-line"></div>';
        
        // 3(d)
        html += `${pageFooter}</div></div><div class="page"><div class="page-inner">`;
        html += `<div style="font-weight: bold; margin-bottom: 20px;">${parts[4]}</div>`;
        for(let i=0; i<20; i++) html += '<div class="dotted-line"></div>';
        for (let p=1; p<=3; p++) {
          html += `${pageFooter}</div></div><div class="page"><div class="page-inner">`;
          for(let i=0; i<28; i++) html += '<div class="dotted-line"></div>';
        }
      } else {
        // Just print the whole question block for mark scheme
        html += `<div style="font-weight: bold; margin-bottom: 20px; margin-top: 20px;">${q.question ? q.question.replace(/\n/g, '<br>') : ''}</div>`;
      }
      
      html += `${pageFooter}</div></div>`;
      return;
    }
    
    let qNum = '';
    if (q.type === 'q1') qNum = '1';
    if (q.type === 'q2a') qNum = '2';
    if (q.type === 'q2b') qNum = '3';
    if (q.type === 'q2c') qNum = '4';
    
    let numPages = 1;
    if (q.marks >= 12) numPages = 3;
    else if (q.marks >= 8) numPages = 2;
    
    html += `
      <div class="question-block" style="margin-top: 30px;">
        <div class="question-text">
          <div class="question-num">${qNum}</div>
          <div style="width: 100%;">
            ${q.question ? q.question.replace(/\n/g, '<br>') : ''}
            <span style="float: right; font-weight: 400; color: #444;">(${q.marks})</span>
          </div>
        </div>
    `;

    if (q.source_context && !isMarkScheme) {
      html += `<div class="source-box" style="margin-top: 15px;">${q.source_context.replace(/\n/g, '<br>')}</div>`;
    }

    if (q.stimulus) {
      html += `
        <div class="bullet-point-box">
          <em>You <strong>may</strong> use the following in your answer:</em>
          <ul>
            ${q.stimulus.map(bp => `<li>${bp}</li>`).join('')}
          </ul>
          <em style="display:block; margin-top:10px;">You <strong>must</strong> also use information of your own.</em>
        </div>
      `;
    }
    
    if (isMarkScheme && q.model_answer) {
      html += `<div class="model-answer">${q.model_answer.replace(/\n/g, '<br>')}</div>`;
    }
    
    html += '</div>';

    if (!isMarkScheme) {
      if (q.type === 'q1') {
        html += '<div style="margin-top: 20px; font-weight: bold; margin-bottom: 20px;">Complete the table below to explain your answer.</div>';
        
        html += '<div style="margin-top: 15px;">(i) What I can infer:</div>';
        for(let i=0; i<3; i++) html += '<div class="dotted-line"></div>';
        
        html += '<div style="margin-top: 15px;">Details in the source that tell me this:</div>';
        for(let i=0; i<3; i++) html += '<div class="dotted-line"></div>';
        
        html += '<div style="margin-top: 25px;">(ii) What I can infer:</div>';
        for(let i=0; i<3; i++) html += '<div class="dotted-line"></div>';
        
        html += '<div style="margin-top: 15px;">Details in the source that tell me this:</div>';
        for(let i=0; i<3; i++) html += '<div class="dotted-line"></div>';
      } else {
        for (let p=1; p<=numPages; p++) {
          if (p > 1) {
            html += `${pageFooter}</div></div><div class="page"><div class="page-inner">`;
          }
          
          let linesOnThisPage = (p === 1) ? 15 : 28;
          
          for(let i=0; i<linesOnThisPage; i++) {
            html += '<div class="dotted-line"></div>';
          }
        }
      }
    }

    html += `${pageFooter}</div></div>`;
  });
  
  return html;
}

for (const [mockId, questions] of Object.entries(mockGroups)) {
    const title = unitData.mock_exams.find(m => m.id === mockId).title;
    
    // Generate student paper
    fs.writeFileSync(`./weimar_nazi_germany/${mockId}.html`, htmlTemplate(mockId, title, questions, false));
    
    // Generate mark scheme
    fs.writeFileSync(`./weimar_nazi_germany/${mockId}_mark_scheme.html`, htmlTemplate(mockId, title, questions, true));
}

console.log("Successfully generated all mock exam HTML files with Edexcel styling.");
