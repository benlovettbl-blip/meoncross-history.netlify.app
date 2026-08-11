const fs = require('fs');
const path = require('path');

const generatePupilWorkbooksPath = path.join(__dirname, 'generate_pupil_workbooks.js');
let pwContent = fs.readFileSync(generatePupilWorkbooksPath, 'utf8');

// Replace Q${...} with Exam Q logic if examQNum exists
pwContent = pwContent.replace(/Q\$\{([a-zA-Z_.]+)\.qNum\}/g, "$${$1.examQNum ? 'Exam Q'+$1.examQNum : 'Q'+$1.qNum}");
pwContent = pwContent.replace(/Q\$\{([a-zA-Z_.]+)\.qNum\s*\|\|\s*([a-zA-Z_.]+)\}/g, "$${$1.examQNum ? 'Exam Q'+$1.examQNum : ($1.qNum ? 'Q'+$1.qNum : 'Q'+($2))}");
pwContent = pwContent.replace(/Q\$\{([a-zA-Z_.]+)\.qNum\s*\?\s*([a-zA-Z_.]+)\.qNum\s*\+\s*'\.'\s*:\s*''\}/g, "$${$1.examQNum ? 'Exam Q'+$1.examQNum+'.' : ($1.qNum ? 'Q'+$1.qNum+'.' : '')}");

// Fix the "log your marks" white font color
pwContent = pwContent.replace(
    /<p style="font-size: 9\.5pt; font-style: italic; margin-top: 0; margin-bottom: 8px;">Log your marks below after your teacher has marked your work\.<\/p>/g,
    '<p style="font-size: 9.5pt; font-style: italic; margin-top: 0; margin-bottom: 8px; color: #000;">Log your marks below after your teacher has marked your work.</p>'
);

fs.writeFileSync(generatePupilWorkbooksPath, pwContent, 'utf8');
console.log('Applied regex replaces for Q{qNum} and font color on pupil workbooks');

// Do the same for teacher workbooks
const generateWorkbooksPath = path.join(__dirname, 'generate_workbooks.js');
let wbContent = fs.readFileSync(generateWorkbooksPath, 'utf8');

wbContent = wbContent.replace(/Q\$\{([a-zA-Z_.]+)\.qNum\}/g, "$${$1.examQNum ? 'Exam Q'+$1.examQNum : 'Q'+$1.qNum}");
wbContent = wbContent.replace(/Q\$\{([a-zA-Z_.]+)\.qNum\s*\|\|\s*([a-zA-Z_.]+)\}/g, "$${$1.examQNum ? 'Exam Q'+$1.examQNum : ($1.qNum ? 'Q'+$1.qNum : 'Q'+($2))}");
wbContent = wbContent.replace(/Q\$\{([a-zA-Z_.]+)\.qNum\s*\?\s*([a-zA-Z_.]+)\.qNum\s*\+\s*'\.'\s*:\s*''\}/g, "$${$1.examQNum ? 'Exam Q'+$1.examQNum+'.' : ($1.qNum ? 'Q'+$1.qNum+'.' : '')}");

fs.writeFileSync(generateWorkbooksPath, wbContent, 'utf8');
console.log('Applied regex replaces for Q{qNum} on teacher workbooks');
