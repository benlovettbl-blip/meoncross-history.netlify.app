const fs = require('fs');

let genMocks = fs.readFileSync('generate_cme_mocks.js', 'utf8');

// 1. Update explain_two hardcoded lines to fill the page
// First Choice Page 1: 18 lines
// First Choice Page 2: 28 lines
// Second Choice Page 1: 18 lines
// Second Choice Page 2: 28 lines

genMocks = genMocks.replace(/for\(let i=0; i<12; i\+\+\) \{/g, 'for(let i=0; i<18; i++) {');
genMocks = genMocks.replace(/for\(let i=0; i<25; i\+\+\) \{/g, 'for(let i=0; i<28; i++) {');

// 2. Update normal question pagination to fill the page
// Change numPages calculation:
// If it's a 8-mark narrative account, numPages = 2.
// If it's a 4-mark question, numPages = 1.
// We can base it on marks: if marks == 8, numPages = 2. else numPages = 1.
const newNormalQuestionLogic = `
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
          html += \`
            <div class="question-block" style="\${isSecondPartOfPaired ? 'margin-top: 30px;' : ''}">
              <div class="question-text">
                <div class="question-num">\${q.num}</div>
                <div style="width: 100%;">
                  \${q.text.replace(/\\n/g, '<br>')}
                  <span style="float: right; font-weight: 400; color: #444;">(\${q.marks})</span>
                </div>
              </div>
          \`;

          if (q.bullet_points) {
            html += \`
              <div class="bullet-point-box">
                <em>You <strong>may</strong> use the following in your answer:</em>
                <ul>
                  \${q.bullet_points.map(bp => \`<li>\${bp}</li>\`).join('')}
                </ul>
                <em style="display:block; margin-top:10px;">You <strong>must</strong> also use information of your own.</em>
              </div>
            \`;
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
          html += \`<div class="footer"><div></div><div class="\${isLastPage ? '' : 'turn-over'}">\${isLastPage ? '' : 'Turn over &#9654;'}</div></div></div>\`;
        }
      }
`;

genMocks = genMocks.replace(/\/\/ Normal Question[\s\S]*?}\n  }\);\n  \n  return html;/m, newNormalQuestionLogic.trim() + '\n    }\n  });\n  \n  return html;');

fs.writeFileSync('generate_cme_mocks.js', genMocks);
console.log('Fixed fill logic in generate_cme_mocks.js');
