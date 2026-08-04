const fs = require('fs');
let content = fs.readFileSync('src/lessons_data.js', 'utf8');

// We want to replace each of the unclosed examiner-tip-box divs in tipHtml
const targets = [
  {
    find: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Reflecting on both competing narratives of the 1948 war allows you to demonstrate high-level critical analysis on source and essay questions!\\r\\n        </div>"`,
    replace: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Reflecting on both competing narratives of the 1948 war allows you to demonstrate high-level critical analysis on source and essay questions!\\r\\n        </div>\\r\\n      </div>"`
  },
  {
    find: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Underline process words to trace cause and effect directly. Reflecting dual viewpoints yields top marks!\\r\\n        </div>"`,
    replace: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Underline process words to trace cause and effect directly. Reflecting dual viewpoints yields top marks!\\r\\n        </div>\\r\\n      </div>"`
  },
  {
    find: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Contrast the preemptive defense motive against the charges of imperial collusion to write a sophisticated, high-scoring essay on 1956.\\r\\n        </div>"`,
    replace: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Contrast the preemptive defense motive against the charges of imperial collusion to write a sophisticated, high-scoring essay on 1956.\\r\\n        </div>\\r\\n      </div>"`
  },
  {
    find: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> In 8-mark importance or narrative questions, show how differing military and political expectations created contrasting explanations for the war's outbreak.\\r\\n        </div>"`,
    replace: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> In 8-mark importance or narrative questions, show how differing military and political expectations created contrasting explanations for the war's outbreak.\\r\\n        </div>\\r\\n      </div>"`
  },
  {
    find: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Examiners award top marks when you can explain why different groups reacted completely differently to the exact same event!\\r\\n        </div>"`,
    replace: `      "tipHtml": "<div class=\\"examiner-tip-box\\" style=\\"margin-top: 18px; margin-bottom: 0;\\">\\r\\n        <span class=\\"tip-icon\\">💡</span>\\r\\n        <div>\\r\\n          <strong>AO2 Exam Skill:</strong> Examiners award top marks when you can explain why different groups reacted completely differently to the exact same event!\\r\\n        </div>\\r\\n      </div>"`
  }
];

targets.forEach((t, i) => {
  if (content.includes(t.find)) {
    content = content.replace(t.find, t.replace);
    console.log(`✓ Replaced tipHtml ${i+1}`);
  } else {
    // try with \n instead of \r\n
    const findLf = t.find.replace(/\\r\\n/g, '\\n');
    const replaceLf = t.replace.replace(/\\r\\n/g, '\\n');
    if (content.includes(findLf)) {
      content = content.replace(findLf, replaceLf);
      console.log(`✓ Replaced tipHtml ${i+1} (LF style)`);
    } else {
      console.error(`✗ Target ${i+1} not found in content!`);
    }
  }
});

fs.writeFileSync('src/lessons_data.js', content, 'utf8');
console.log('Done!');
