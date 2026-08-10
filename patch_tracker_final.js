const fs = require('fs');

const files = [
  'generate_pupil_workbooks.js',
  'generate_textbooks.js',
  'generate_worksheets.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');

  // We find the header and replace everything until </thead>
  let headerStart = -1;
  let headerEnd = -1;
  for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('Progress & Assessment Tracker') && lines[i].includes('<th')) {
      headerStart = i;
    }
    if (headerStart !== -1 && lines[i].includes('</tr>')) {
      headerEnd = i;
      break;
    }
  }

  if (headerStart !== -1) {
    const newHeaders = `            <th style="border: 1px solid #333; padding: 12px 6px; width: 35%;">Progress & Assessment Tracker</th>
            <th style="border: 1px solid #333; padding: 12px 6px; width: 10%; text-align: center;">Effort</th>
            <th style="border: 1px solid #333; padding: 12px 6px; width: 10%; text-align: center;">Level</th>
            <th style="border: 1px solid #333; padding: 12px 6px; width: 45%;">Teacher Comments</th>`;
    lines.splice(headerStart, headerEnd - headerStart, newHeaders);
  }

  // Find the row generations
  for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('trackerRows += `<tr style="background-color: #f1f5f9;">') && lines[i].includes('isGeography')) {
       // This is the if(isGeography) block, the next line is the geo row, then else, then norm row
       if (lines[i+1] && lines[i+1].includes('trackerRows += ')) {
           lines[i+1] = `        trackerRows += \`<tr style="background-color: #f1f5f9; height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold;">L\${i+1}: \${l.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>\`;`;
       }
       if (lines[i+3] && lines[i+3].includes('trackerRows += ')) {
           lines[i+3] = `        trackerRows += \`<tr style="background-color: #f1f5f9; height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold;">L\${i+1}: \${l.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>\`;`;
       }
    }
    if (lines[i].includes('unitData.assessments.forEach(')) {
       if (lines[i+1] && lines[i+1].includes('trackerRows += ')) {
           lines[i+1] = `        trackerRows += \`<tr style="height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold; background:#e2e8f0;">Assessment: \${a.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>\`;`;
       }
    }
  }

  // Find Final Unit Grade block
  let finalStart = -1;
  let finalEnd = -1;
  for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('<tr style=" font-weight: bold;">')) {
      if (lines[i+1] && lines[i+1].includes('Final Unit Grade:')) {
         finalStart = i;
      }
    }
    if (finalStart !== -1 && lines[i].includes('</tr>')) {
      finalEnd = i;
      break;
    }
  }

  if (finalStart !== -1) {
     const newFinal = `          <tr style=" font-weight: bold; height: 50px;">
            <td style="border: 1px solid #333; padding: 12px 6px; text-align: right;">Final Unit Grade:</td>
            <td style="border: 1px solid #333; padding: 12px 6px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding: 12px 6px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding: 12px 6px;"></td>`;
     lines.splice(finalStart, finalEnd - finalStart, newFinal);
  }

  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log(`Updated ${file}`);
});
