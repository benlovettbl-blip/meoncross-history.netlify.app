const fs = require('fs');
const path = require('path');

function patchPupilWorkbooks() {
  const filePath = path.join(__dirname, 'generate_pupil_workbooks.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the 5-column vs 4-column mismatch in generate_pupil_workbooks.js
  content = content.replace(
    /trackerRows \+= `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">L\$\{i\+1\}: \$\{l\.title\}<\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><\/tr>`;/g,
    'trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">L${i+1}: ${l.title}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;'
  );

  content = content.replace(
    /trackerRows \+= `<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0\.95em;"><em>Exam Q: \$\{block\.extended\.question\.replace\(\/\\\\\\(.*?\\\\\\)\/i, ''\)\.trim\(\)\.substring\(0, 75\)\}\.\.\.<\/em><\/td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">\/ \$\{marks\}<\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><\/tr>`;/g,
    'trackerRows += `<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0.95em;"><em>Exam Q: ${block.extended.question.replace(/\\(\\d+\\s*marks?\\)/i, \'\').trim().substring(0, 75)}...</em></td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">/ ${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;'
  );
  
  content = content.replace(
    /trackerRows \+= `<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0\.95em;"><em>Exam Q: \$\{block\.extended\.question\.replace\(\/\\\\(\\d\+\\s\*marks\?\\\\\\)\/i, ''\)\.trim\(\)\.substring\(0, 75\)\}\.\.\.<\/em><\/td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">\/ \$\{marks\}<\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><\/tr>`;/g,
    'trackerRows += `<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0.95em;"><em>Exam Q: ${block.extended.question.replace(/\\(\\d+\\s*marks?\\)/i, \'\').trim().substring(0, 75)}...</em></td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">/ ${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;'
  );

  // Add exam_practice to trackerRows
  const addExamPracticeSearch = `          if (block.extended && block.extended.question) {
            const marksMatch = block.extended.question.match(/\\((\\d+)\\s*marks?\\)/i);
            const marks = marksMatch ? marksMatch[1] : '?';
            trackerRows += \`<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0.95em;"><em>Exam Q: \${block.extended.question.replace(/\\(\\d+\\s*marks?\\)/i, '').trim().substring(0, 75)}...</em></td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">/ \${marks}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
          }
        });
      }`;
      
  const addExamPracticeReplace = addExamPracticeSearch + `
      
      if (l.exam_practice && l.exam_practice.questions) {
        l.exam_practice.questions.forEach(ep => {
            let marksStr = ep.marks ? ep.marks : (ep.question.match(/\\((\\d+)\\s*marks?\\)/i) ? ep.question.match(/\\((\\d+)\\s*marks?\\)/i)[1] : '-');
            let shortQ = ep.question.replace(/\\(\\d+\\s*marks?\\)/i, '').trim();
            if (shortQ.length > 75) shortQ = shortQ.substring(0, 75) + '...';
            trackerRows += \`<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0.95em;"><em>Exam Q: \${shortQ}</em></td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">/ \${marksStr}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
        });
      }`;

  if (!content.includes('l.exam_practice && l.exam_practice.questions')) {
    content = content.replace(addExamPracticeSearch, addExamPracticeReplace);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched pupil workbooks tracker rows');
}

function patchWorkbooks() {
  const filePath = path.join(__dirname, 'generate_workbooks.js');
  let content = fs.readFileSync(filePath, 'utf8');

  const searchBlock = `          if (block.extended && block.extended.question) {
            const marksMatch = block.extended.question.match(/\\((\\d+)\\s*marks?\\)/i);
            const marks = marksMatch ? marksMatch[1] : '?';
            trackerRows += \`<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0.9em;"><em>Exam Q: \${block.extended.question.replace(/\\(\\d+\\s*marks?\\)/i, '').trim().substring(0, 75)}...</em></td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em; font-weight:bold;">/ \${marks}</td><td style="border:1px solid #333; padding:6px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
          }
        });
      }`;

  const replaceBlock = searchBlock + `
      
      if (l.exam_practice && l.exam_practice.questions) {
        l.exam_practice.questions.forEach(ep => {
            let marksStr = ep.marks ? ep.marks : (ep.question.match(/\\((\\d+)\\s*marks?\\)/i) ? ep.question.match(/\\((\\d+)\\s*marks?\\)/i)[1] : '-');
            let shortQ = ep.question.replace(/\\(\\d+\\s*marks?\\)/i, '').trim();
            if (shortQ.length > 75) shortQ = shortQ.substring(0, 75) + '...';
            trackerRows += \`<tr style="background-color: #fff;"><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-size: 0.9em;"><em>Exam Q: \${shortQ}</em></td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em; font-weight:bold;">/ \${marksStr}</td><td style="border:1px solid #333; padding:6px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;
        });
      }`;

  if (!content.includes('l.exam_practice && l.exam_practice.questions')) {
    content = content.replace(searchBlock, replaceBlock);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched workbooks tracker rows');
}

patchPupilWorkbooks();
patchWorkbooks();
