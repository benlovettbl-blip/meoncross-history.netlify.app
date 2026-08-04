const fs = require('fs');

let genMocks = fs.readFileSync('generate_cme_mocks.js', 'utf8');

// Replace the explain_two choice pages logic
const explainTwoLogic = `
      // First Choice Page 1
      html += '<div class="page"><div class="page-inner">';
      html += \`
        <div style="text-align: center; font-weight: bold; margin: 10px 0 20px 0;">Indicate your FIRST choice on this page.</div>
        <div style="font-weight: bold; margin-bottom: 20px; font-size: 14px;">Indicate which question you are answering by marking a cross in the box [X]. If you change your mind, put a line through the box [X] and then indicate your new question with a cross [X].</div>
      \`;
      q.options.forEach(opt => {
        html += \`
          <div class="checkbox-item" style="margin-left: 20px;">
            <div class="checkbox-square"></div>
            <div style="font-size: 14px;">\${opt.split(' (')[0]}</div>
          </div>
        \`;
      });
      html += '<br>';
      for(let i=0; i<12; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // First Choice Page 2
      html += '<div class="page"><div class="page-inner">';
      for(let i=0; i<25; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // Second Choice Page 1
      html += '<div class="page"><div class="page-inner">';
      html += \`
        <div style="text-align: center; font-weight: bold; margin: 10px 0 20px 0;">Indicate your SECOND choice on this page.</div>
        <div style="font-weight: bold; margin-bottom: 20px; font-size: 14px;">Indicate which question you are answering by marking a cross in the box [X]. If you change your mind, put a line through the box [X] and then indicate your new question with a cross [X].</div>
      \`;
      q.options.forEach(opt => {
        html += \`
          <div class="checkbox-item" style="margin-left: 20px;">
            <div class="checkbox-square"></div>
            <div style="font-size: 14px;">\${opt.split(' (')[0]}</div>
          </div>
        \`;
      });
      html += '<br>';
      for(let i=0; i<12; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div class="turn-over">Turn over &#9654;</div></div></div>';

      // Second Choice Page 2
      html += '<div class="page"><div class="page-inner">';
      for(let i=0; i<25; i++) {
        html += '<div class="dotted-line"></div>';
      }
      html += '</div><div class="footer"><div></div><div></div></div></div>';
`;

// Replace from "// First Choice Page" up to the end of the if block
genMocks = genMocks.replace(/\/\/ First Choice Page[\s\S]*?\/\/ Normal Question/, explainTwoLogic.trim() + '\n      \n    } else {\n      // Normal Question');

// Fix linesOnThisPage logic
genMocks = genMocks.replace(
  /let linesOnThisPage = \(p === 1 && q\.bullet_points\) \? 10 : \(p === 1 && !q\.bullet_points\) \? 18 : 25;/g,
  'let linesOnThisPage = (p === 1 && q.bullet_points) ? 8 : (p === 1 && !q.bullet_points) ? 18 : 25;'
);

fs.writeFileSync('generate_cme_mocks.js', genMocks);
console.log('Fixed pagination logic in generate_cme_mocks.js');
