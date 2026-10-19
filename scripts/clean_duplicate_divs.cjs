const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets'),
];

dirs.forEach((dir) => {
  // Lesson 2
  const l2Path = path.join(dir, 'lesson_02_evacuation_worksheet.html');
  if (fs.existsSync(l2Path)) {
    let html = fs.readFileSync(l2Path, 'utf8');
    const target = `            <div>DESTINATION: DEVON</div>
          </div>
            <div>NAME: _________________</div>
            <div>DESTINATION: DEVON</div>
          </div>`;
    const replacement = `            <div>DESTINATION: DEVON</div>
          </div>`;
    if (html.includes(target)) {
      html = html.replace(target, replacement);
      fs.writeFileSync(l2Path, html, 'utf8');
      console.log('✅ Fixed duplicate div in L2:', l2Path);
    }
  }

  // Lesson 3
  const l3Path = path.join(dir, 'lesson_03_kindertransport_worksheet.html');
  if (fs.existsSync(l3Path)) {
    let html = fs.readFileSync(l3Path, 'utf8');
    const target = `            <div>DESTINATION: LIVERPOOL ST</div>
          </div>
            <div>REFUGEE NO.: 8434 (VERA)</div>
            <div>DESTINATION: LIVERPOOL ST</div>
          </div>`;
    const replacement = `            <div>DESTINATION: LIVERPOOL ST</div>
          </div>`;
    if (html.includes(target)) {
      html = html.replace(target, replacement);
      fs.writeFileSync(l3Path, html, 'utf8');
      console.log('✅ Fixed duplicate div in L3:', l3Path);
    }
  }
});
