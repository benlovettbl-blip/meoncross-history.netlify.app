const fs = require('fs');
const path = require('path');

function addTrackingGrid(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We are looking for:
  // if (epArray && epArray.length > 0) {
  //   html += `<div class="task-box" style="margin-bottom: 10px; page-break-inside: auto; border-top: none; padding-top: 0; margin-top: 0;">`;

  const searchStr = 'html += `<div class="task-box" style="margin-bottom: 10px; page-break-inside: auto; border-top: none; padding-top: 0; margin-top: 0;">`;';
  const gridHtml = `
        html += \`<div style="margin-bottom: 25px;">
           <h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Exam Practice Tracking Grid</h3>
           <p style="font-size: 9.5pt; font-style: italic; margin-top: 0; margin-bottom: 8px;">Log your marks below after your teacher has marked your work.</p>
           <table style="width: 100%; border-collapse: collapse; font-size: 10pt; border: 1px solid #cbd5e1;">
             <thead>
               <tr style="background-color: #f1f5f9;">
                 <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; width: 10%;">Q</th>
                 <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: left; width: 60%;">Question Topic</th>
                 <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; width: 15%;">Available</th>
                 <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; width: 15%;">Achieved</th>
               </tr>
             </thead>
             <tbody>\`;
        epArray.forEach((ep, i) => {
             let qMarks = ep.marks ? ep.marks : (ep.question.match(/\\((\\d+)\\s*marks?\\)/i) ? ep.question.match(/\\((\\d+)\\s*marks?\\)/i)[1] : '-');
             // Get a short snippet of the question for the table
             let shortQ = ep.question.replace(/\\s*\\(\\d+\\s*marks?\\)\\s*/i, '').trim();
             if (shortQ.length > 65) shortQ = shortQ.substring(0, 65) + '...';
             html += \`<tr>
                 <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;"><strong>\${i+1}</strong></td>
                 <td style="border: 1px solid #cbd5e1; padding: 6px;">\${shortQ}</td>
                 <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">\${qMarks}</td>
                 <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;"></td>
               </tr>\`;
        });
        html += \`</tbody></table></div>\`;
  `;

  if (content.includes('Exam Practice Tracking Grid')) {
     console.log('Grid already exists in ' + filePath);
     return;
  }

  content = content.replace(searchStr, searchStr + '\n' + gridHtml);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully added tracking grid to ' + filePath);
}

addTrackingGrid(path.join(__dirname, 'generate_pupil_workbooks.js'));
addTrackingGrid(path.join(__dirname, 'generate_workbooks.js'));
