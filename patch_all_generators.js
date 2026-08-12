const fs = require('fs');

function patchFile(filename, isTextbook) {
  if (!fs.existsSync(filename)) return;
  let code = fs.readFileSync(filename, 'utf8');

  // Fix title
  if (isTextbook) {
    code = code.replace(/<title>.*?<\/title>/, '<title>${unitData.title} - Textbook</title>');
  }

  // Cover page replacement (remove Stubbington logic, add Tracker logic)
  const coverRegex = /<div class="cover-page".*?<h1.*?<\/h1>.*?<\/div>/s;
  if (code.match(coverRegex)) {
    const newCover = `
    <div class="cover-page" style="page-break-after: always; text-align: center;">
      <h1 style="font-size: 32pt; margin-bottom: 20px; color: #1e3a8a;">\${periodTitle}</h1>
      <h2 style="font-size: 16pt; margin-bottom: 20px; color: #64748b; border: none;">\${unitData.title}</h2>
      
      <div style="margin-top: 30px; text-align: left; padding: 20px; border: 2px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h3 style="margin-top: 0; color: #1e3a8a; text-align: center; margin-bottom: 15px;"><i class="fa-solid fa-list-check"></i> Unit Checklist Tracker</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 11pt;">
          <thead>
            <tr style="background-color: #1e3a8a; color: white;">
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 60%; text-align: left;">Lesson Title</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Do Now</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Tasks</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Review</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Score</th>
            </tr>
          </thead>
          <tbody>
            \${trackerRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
    code = code.replace(coverRegex, newCover);
  }

  // Replace Lesson Consolidation text
  code = code.replace(/<h2[^>]*>Assessment Practice & Knowledge Retrieval<\/h2>/g, 
    '<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>');
  
  code = code.replace(/<p[^>]*>Use the space below to summarize the most important knowledge from this lesson, or answer your teacher's assessment question\.<\/p>/g,
    '<p style="font-weight: bold; margin-bottom: 15px;">Reflect on today\'s learning and answer your teacher\'s final challenge.</p>');

  fs.writeFileSync(filename, code);
  console.log(`Patched ${filename}`);
}

patchFile('generate_textbooks.js', true);
patchFile('generate_workbooks.js', false);
patchFile('generate_guided_reading.js', false);
