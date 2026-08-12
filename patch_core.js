const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

// 1. Replace formatQuestion definition
code = code.replace(
  `    const formatQuestion = (qText) => {
      if (!qText) return '';
      let cleaned = qText.replace(/^(Enquiry:|Q\\d+:|Task \\d+:|Question \\d+[a-z]?:)\\s*/i, '');
      return \`Question \${globalQuestionNum++}: \${formatBold(cleaned)}\`;
    };`,
  `    const formatQuestion = (qText, prependNumber = true) => {
      if (!qText) return '';
      let cleaned = qText.replace(/^(Enquiry:|Q\\d+:|Task \\d+:|Question \\d+[a-z]?:)\\s*/i, '');
      if (prependNumber) return \`Question \${globalQuestionNum++}: \${formatBold(cleaned)}\`;
      return formatBold(cleaned);
    };`
);

// 2. Replace formatQuestion calls for source/primary_source/extended/gcse
code = code.replace(
  `\${formatQuestion(source.question)}</strong></p>`,
  `\${formatQuestion(source.question, !source.qNum)}</strong></p>`
);

code = code.replace(
  `\${formatQuestion(lesson.primary_source.question)}</strong></p>`,
  `\${formatQuestion(lesson.primary_source.question, !lesson.primary_source.qNum)}</strong></p>`
);

code = code.replace(
  `\${lesson.extended.qNum ? \`Q\${lesson.extended.qNum}. \` : ''}\${formatQuestion(lesson.extended.question)}`,
  `\${lesson.extended.qNum ? \`Q\${lesson.extended.qNum}. \` : ''}\${formatQuestion(lesson.extended.question, !lesson.extended.qNum)}`
);

code = code.replace(
  `\${lesson.gcse_task.qNum && tIdx === 0 ? \`Q\${lesson.gcse_task.qNum}. \` : ''}\${formatQuestion(task.text || task.question)}`,
  `\${lesson.gcse_task.qNum && tIdx === 0 ? \`Q\${lesson.gcse_task.qNum}. \` : ''}\${formatQuestion(task.text || task.question, !(lesson.gcse_task.qNum && tIdx === 0))}`
);

fs.writeFileSync('src/core_app.js', code);
console.log('Patched core_app.js successfully');
