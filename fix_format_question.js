const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const firstChunk = `      const formatBold = window.formatBold;
      let globalQuestionNum = 1;
      const formatQuestion = (qText, prependNumber = true) => {
        if (!qText) return '';
        let cleaned = cleanQuestionText(qText);
        if (prependNumber) return \\\`Question \${globalQuestionNum++}: \${formatBold(cleaned)}\\\`;
        return formatBold(cleaned);
      };`;
code = code.replace('      const formatBold = window.formatBold;', firstChunk);

const secondChunkOld = `    let globalQuestionNum = 1;
    const formatQuestion = (qText, prependNumber = true) => {
      if (!qText) return '';
      let cleaned = qText.replace(/^(Enquiry:|Q\\d+:|Task \\d+:|Question \\d+[a-z]?:)\\s*/i, '');
      if (prependNumber) return \\\`Question \${globalQuestionNum++}: \${formatBold(cleaned)}\\\`;
      return formatBold(cleaned);
    };`;

code = code.replace(secondChunkOld, '');
fs.writeFileSync('src/core_app.js', code);
console.log('done');
