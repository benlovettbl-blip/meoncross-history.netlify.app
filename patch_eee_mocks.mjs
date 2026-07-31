import fs from 'fs';

let content = fs.readFileSync('generate_eee_mocks.js', 'utf8');

// 1. htmlTemplate signature
content = content.replace('const htmlTemplate = (mock) => {', 'const htmlTemplate = (mock, isMarkScheme = false) => {');

// 2. generateQuestions call
content = content.replace('` + generateQuestions(mock) + `', '` + generateQuestions(mock, isMarkScheme) + `');

// 3. generateQuestions signature
content = content.replace('function generateQuestions(mock) {', 'function generateQuestions(mock, isMarkScheme = false) {');

// 4. Q1a dotted lines
content = content.replace(
`  for(let i=0; i<q1a.lines; i++) {
    html += '<div class="dotted-line"></div>';
  }`,
`  if (isMarkScheme && q1a.model_answer) {
    html += \`<div style="color: #0369a1; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin-top: 15px; margin-bottom: 30px; padding: 10px; background-color: #f0f9ff; border-radius: 8px;"><strong>Teacher Mark Scheme Model Answer:</strong><br>\${q1a.model_answer}</div>\`;
  } else {
    for(let i=0; i<q1a.lines; i++) {
      html += '<div class="dotted-line"></div>';
    }
  }`
);

// 5. Q1b dotted lines
content = content.replace(
`  for(let i=0; i<q1b.lines; i++) {
    html += '<div class="dotted-line"></div>';
  }`,
`  if (isMarkScheme && q1b.model_answer) {
    html += \`<div style="color: #0369a1; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin-top: 15px; margin-bottom: 30px; padding: 10px; background-color: #f0f9ff; border-radius: 8px;"><strong>Teacher Mark Scheme Model Answer:</strong><br>\${q1b.model_answer}</div>\`;
  } else {
    for(let i=0; i<q1b.lines; i++) {
      html += '<div class="dotted-line"></div>';
    }
  }`
);

// 6. Q2 dotted lines (complex multi-page)
const q2Old = `  for(let i=0; i<15; i++) {
    html += '<div class="dotted-line"></div>';
  }
  html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

  html += '<div class="page"><div class="page-inner">';
  for(let i=0; i<28; i++) {
    html += '<div class="dotted-line"></div>';
  }
  html += '</div><div class="footer"><div></div><div></div></div></div>';

  html += '<div class="page"><div class="page-inner">';
  for(let i=0; i<25; i++) {
    html += '<div class="dotted-line"></div>';
  }
  html += '<div style="border-top: 1px solid #ccc; margin-top: 20px; padding-top: 10px; text-align: right; font-weight: bold;">(Total for Question 2 = 12 marks)</div>';
  html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';`;

const q2New = `  if (isMarkScheme && q2.model_answer) {
    html += \`<div style="color: #0369a1; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin-top: 15px; margin-bottom: 30px; padding: 10px; background-color: #f0f9ff; border-radius: 8px;"><strong>Teacher Mark Scheme Model Answer:</strong><br>\${q2.model_answer}</div>\`;
    html += '<div style="border-top: 1px solid #ccc; margin-top: 20px; padding-top: 10px; text-align: right; font-weight: bold;">(Total for Question 2 = 12 marks)</div>';
    html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';
  } else {
    for(let i=0; i<15; i++) {
      html += '<div class="dotted-line"></div>';
    }
    html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

    html += '<div class="page"><div class="page-inner">';
    for(let i=0; i<28; i++) {
      html += '<div class="dotted-line"></div>';
    }
    html += '</div><div class="footer"><div></div><div></div></div></div>';

    html += '<div class="page"><div class="page-inner">';
    for(let i=0; i<25; i++) {
      html += '<div class="dotted-line"></div>';
    }
    html += '<div style="border-top: 1px solid #ccc; margin-top: 20px; padding-top: 10px; text-align: right; font-weight: bold;">(Total for Question 2 = 12 marks)</div>';
    html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';
  }`;
content = content.replace(q2Old, q2New);

// 7. Page 8, 9, 10 loop
const q34Old = `  // Page 8, 9, 10
  for (let p=1; p<=3; p++) {
    html += '<div class="page"><div class="page-inner">';
    let linesToDraw = (p === 3) ? 25 : 28;
    for(let i=0; i<linesToDraw; i++) {
      html += '<div class="dotted-line"></div>';
    }
    if (p === 3) {
      html += '<div style="border-top: 2px solid #ccc; margin-top: 20px; padding-top: 10px; text-align: right; font-weight: bold;">TOTAL FOR BOOKLET B = 32 MARKS</div>';
    }
    let showTurnOver = (p < 3);
    html += '</div><div class="footer"><div></div>';
    if (showTurnOver) {
      html += '<div class="turn-over">Turn over &#9654;</div>';
    } else {
      html += '<div></div>';
    }
    html += '</div></div>';
  }`;

const q34New = `  if (isMarkScheme) {
    if (q3.model_answer) {
        html += \`<div class="page"><div class="page-inner"><div style="color: #0369a1; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin-top: 15px; margin-bottom: 30px; padding: 10px; background-color: #f0f9ff; border-radius: 8px;"><strong>Teacher Mark Scheme (Question 3):</strong><br>\${q3.model_answer}</div></div></div>\`;
    }
    if (q4.model_answer) {
        html += \`<div class="page"><div class="page-inner"><div style="color: #0369a1; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin-top: 15px; margin-bottom: 30px; padding: 10px; background-color: #f0f9ff; border-radius: 8px;"><strong>Teacher Mark Scheme (Question 4):</strong><br>\${q4.model_answer}</div></div></div>\`;
    }
    html += \`<div class="page"><div class="page-inner"><div style="border-top: 2px solid #ccc; margin-top: 20px; padding-top: 10px; text-align: right; font-weight: bold;">TOTAL FOR BOOKLET B = 32 MARKS</div></div></div>\`;
  } else {
    // Page 8, 9, 10
    for (let p=1; p<=3; p++) {
      html += '<div class="page"><div class="page-inner">';
      let linesToDraw = (p === 3) ? 25 : 28;
      for(let i=0; i<linesToDraw; i++) {
        html += '<div class="dotted-line"></div>';
      }
      if (p === 3) {
        html += '<div style="border-top: 2px solid #ccc; margin-top: 20px; padding-top: 10px; text-align: right; font-weight: bold;">TOTAL FOR BOOKLET B = 32 MARKS</div>';
      }
      let showTurnOver = (p < 3);
      html += '</div><div class="footer"><div></div>';
      if (showTurnOver) {
        html += '<div class="turn-over">Turn over &#9654;</div>';
      } else {
        html += '<div></div>';
      }
      html += '</div></div>';
    }
  }`;
content = content.replace(q34Old, q34New);

// 8. Main generation loop
const loopOld = `mock_exams.forEach(mock => {
  const output = htmlTemplate(mock);
  fs.writeFileSync('./public/units/eee/' + mock.id + '.html', output);
  console.log('Generated ' + mock.id + '.html');
});`;

const loopNew = `mock_exams.forEach(mock => {
  const output = htmlTemplate(mock, false);
  fs.writeFileSync('./public/units/eee/' + mock.id + '.html', output);
  
  const msOutput = htmlTemplate(mock, true);
  fs.writeFileSync('./public/units/eee/' + mock.id + '_mark_scheme.html', msOutput);
  console.log('Generated ' + mock.id + '.html and _mark_scheme.html');
});`;
content = content.replace(loopOld, loopNew);

fs.writeFileSync('generate_eee_mocks.js', content);
console.log("Patched successfully!");
