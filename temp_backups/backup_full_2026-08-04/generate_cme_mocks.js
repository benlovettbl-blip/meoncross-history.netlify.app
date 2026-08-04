import fs from 'fs';
import { mock_exams } from './public/units/cme_new/mock_exams.js';

const htmlTemplate = (mock, isMarkScheme = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mock.title}</title>
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
      padding-right: 35mm; /* Space for watermark */
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
  </style>
</head>
<body>

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
        <div class="date-text">Thursday 4 June 2026</div>
        <div class="time-text">Morning (Time: 1 hour 50 minutes -<br>total time for <strong>both</strong> booklets)</div>
        <div class="subject-title">History</div>
        <div class="booklet-title">BOOKLET P5: Conflict in the Middle East, 1945-95</div>
      </div>
      <div class="exam-header-right">
        <div class="paper-ref-label">Paper<br>reference</div>
        <div class="paper-ref-val">${mock.paper_reference.replace('22', 'P5')}</div>
      </div>
    </div>

    <div style="display: flex; gap: 10px;">
      <div class="must-have-box" style="flex: 1;">
        <div>
          <strong>You must have:</strong><br>
          The corresponding booklet B.
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
        <li>There are two booklets in this question paper. <strong>This is booklet P.</strong></li>
        <li>Answer <strong>all</strong> questions in this booklet.</li>
        <li>Check you have the corresponding booklet B.</li>
        <li>Answer the questions in the spaces provided<br><em>- there may be more space than you need.</em></li>
      </ul>
    </div>

    <div class="instructions-section">
      <h3>Information</h3>
      <ul>
        <li>The total mark for this booklet is ${mock.total_marks}.</li>
        <li>The total time for <strong>both</strong> booklets is 1 hour 50 minutes.</li>
        <li>The marks for <strong>each</strong> question are shown in brackets<br><em>- use this as a guide as to how much time to spend on each question.</em></li>
        <li><strong>Do not forget to complete booklet B.</strong></li>
      </ul>
    </div>

    <div class="instructions-section">
      <h3>Advice</h3>
      <ul>
        <li>Read each question carefully before you start to answer it.</li>
        <li>Try to divide your time equally between each booklet of the question paper.</li>
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

  ${generateQuestions(mock)}

</body>
</html>
`;

function generateQuestions(mock) {
  let html = '';
  
  mock.questions.forEach((q, idx) => {
    let numPages = Math.ceil(q.lines / 22) || 1; // Approx 22 dotted lines per page
    if (q.type === 'explain_two') numPages = 4; // Special handling for choices
    
    if (q.type === 'explain_two') {
      // Explain Two has a choice page, then answer pages
      html += '<div class="page"><div class="page-inner">';
      html += '';
      
      html += `
        <div class="inner-header">Conflict in the Middle East, 1945-95<br><br>Answer ALL questions in this booklet.</div>
        <div class="question-block">
          <div class="question-text">
            <div class="question-num">${q.num}</div>
            <div style="width: 100%;">
              ${q.text.replace(/\n/g, '<br>')}
              <div class="choice-box">
                ${q.options.map(opt => `
                  <div class="checkbox-item">
                    <div class="checkbox-square"></div>
                    <div>${opt} <span style="float:right; margin-left:10px;">(${q.marks})</span></div>
                  </div>
                `).join('')}
              </div>
              <div style="text-align: right; font-weight: bold; margin-bottom: 20px;">(Total for Question ${q.num} = 16 marks)</div>
            </div>
          </div>
        </div>
      `;
      
      html += '</div>';
      html += '<div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // First Choice Page 1
      html += '<div class="page"><div class="page-inner">';
      html += `
        <div style="text-align: center; font-weight: bold; margin: 10px 0 20px 0;">Indicate your FIRST choice on this page.</div>
        <div style="font-weight: bold; margin-bottom: 20px; font-size: 14px;">Indicate which question you are answering by marking a cross in the box [X]. If you change your mind, put a line through the box [X] and then indicate your new question with a cross [X].</div>
      `;
      q.options.forEach(opt => {
        html += `
          <div class="checkbox-item" style="margin-left: 20px;">
            <div class="checkbox-square"></div>
            <div style="font-size: 14px;">${opt.split(' (')[0]}</div>
          </div>
        `;
      });
      html += '<br>';
      for(let i=0; i<18; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // First Choice Page 2
      html += '<div class="page"><div class="page-inner">';
      for(let i=0; i<28; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // Second Choice Page 1
      html += '<div class="page"><div class="page-inner">';
      html += `
        <div style="text-align: center; font-weight: bold; margin: 10px 0 20px 0;">Indicate your SECOND choice on this page.</div>
        <div style="font-weight: bold; margin-bottom: 20px; font-size: 14px;">Indicate which question you are answering by marking a cross in the box [X]. If you change your mind, put a line through the box [X] and then indicate your new question with a cross [X].</div>
      `;
      q.options.forEach(opt => {
        html += `
          <div class="checkbox-item" style="margin-left: 20px;">
            <div class="checkbox-square"></div>
            <div style="font-size: 14px;">${opt.split(' (')[0]}</div>
          </div>
        `;
      });
      html += '<br>';
      for(let i=0; i<18; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // Second Choice Page 2
      html += '<div class="page"><div class="page-inner">';
      for(let i=0; i<28; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div></div></div></div>';
      
    } else {
      // Normal Question
      let isFirstPartOfPaired = idx < mock.questions.length - 1 && q.num === '1 (a)' && mock.questions[idx+1].num === '1 (b)';
      let isSecondPartOfPaired = idx > 0 && q.num === '1 (b)' && mock.questions[idx-1].num === '1 (a)';
      
      let numPages = q.marks >= 8 ? 2 : 1;
      
      for (let p=1; p<=numPages; p++) {
        if (!isSecondPartOfPaired || p > 1) {
          html += '<div class="page"><div class="page-inner">';
          html += '';
        }
        
        if (p === 1 && idx === 0) {
          html += '<div class="inner-header">Conflict in the Middle East, 1945-95<br><br>Answer ALL questions in this booklet.</div>';
        }

        if (p === 1) {
          html += `
            <div class="question-block" style="${isSecondPartOfPaired ? 'margin-top: 30px;' : ''}">
              <div class="question-text">
                <div class="question-num">${q.num}</div>
                <div style="width: 100%;">
                  ${q.text.replace(/\n/g, '<br>')}
                  <span style="float: right; font-weight: 400; color: #444;">(${q.marks})</span>
                </div>
              </div>
          `;

          if (q.bullet_points) {
            html += `
              <div class="bullet-point-box">
                <em>You <strong>may</strong> use the following in your answer:</em>
                <ul>
                  ${q.bullet_points.map(bp => `<li>${bp}</li>`).join('')}
                </ul>
                <em style="display:block; margin-top:10px;">You <strong>must</strong> also use information of your own.</em>
              </div>
            `;
          }
          
          html += '</div>';
        }

        let linesOnThisPage = (p === 1 && q.bullet_points) ? 15 : (p === 1 && !q.bullet_points) ? 22 : 28;
        if (isFirstPartOfPaired && p === 1) linesOnThisPage = 12;
        if (isSecondPartOfPaired && p === 1) linesOnThisPage = 12;
        
        for(let i=0; i<linesOnThisPage; i++) {
          html += '<div class="dotted-line"></div>';
        }
        
        if (!isFirstPartOfPaired || p > 1) {
          html += '</div>';
          let isLastPage = p === numPages && idx === mock.questions.length - 1;
          html += `<div class="footer"><div></div><div class="${isLastPage ? '' : 'turn-over'}">${isLastPage ? '' : 'Turn over &#9654;'}</div></div></div>`;
        }
      }
    }
  });
  
  return html;
}

if (!fs.existsSync('public/units/cme_new')) {
  fs.mkdirSync('public/units/cme_new', { recursive: true });
}

mock_exams.forEach(mock => {
  const output = htmlTemplate(mock);
  fs.writeFileSync(`public/units/cme_new/${mock.id}.html`, output);
  console.log(`Generated ${mock.id}.html`);
});
