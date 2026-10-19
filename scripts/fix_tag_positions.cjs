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
    html = html.replace(
      /style="position:\s*absolute;\s*top:\s*-5mm;\s*left:\s*52mm;[\s\S]*?<\/div>/,
      `style="position: absolute; top: -9.5mm; left: 50%; transform: translateX(-50%); width: 38mm; height: 13mm; background: #fef3c7; border: 1.2px solid #b45309; border-radius: 3px; padding: 0.8mm 2mm; font-size: 5.2pt; color: #78350f; box-shadow: 0 2px 4px rgba(0,0,0,0.12); z-index: 10; text-align: center;">
            <div style="font-weight: 800; border-bottom: 1px solid #d97706; padding-bottom: 0.3mm; margin-bottom: 0.3mm; letter-spacing: 0.04em;">🏷️ L.C.C. EVACUEE TAG</div>
            <div>NAME: _________________ • DEVON</div>
          </div>`,
    );
    fs.writeFileSync(l2Path, html, 'utf8');
    console.log('✅ Centered tag on handle in L2:', l2Path);
  }

  // Lesson 3
  const l3Path = path.join(dir, 'lesson_03_kindertransport_worksheet.html');
  if (fs.existsSync(l3Path)) {
    let html = fs.readFileSync(l3Path, 'utf8');
    html = html.replace(
      /style="position:\s*absolute;\s*top:\s*-5mm;\s*left:\s*52mm;[\s\S]*?<\/div>/,
      `style="position: absolute; top: -9.5mm; left: 50%; transform: translateX(-50%); width: 44mm; height: 13mm; background: #fee2e2; border: 1.2px solid #b91c1c; border-radius: 3px; padding: 0.8mm 2mm; font-size: 5.2pt; color: #991b1b; box-shadow: 0 2px 4px rgba(0,0,0,0.12); z-index: 10; text-align: center;">
            <div style="font-weight: 800; border-bottom: 1px solid #f87171; padding-bottom: 0.3mm; margin-bottom: 0.3mm; letter-spacing: 0.04em;">🏷️ REFUGEE NO. 8434 (VERA)</div>
            <div>PRAG-HBF • GESTAPO ZUGELASSEN</div>
          </div>`,
    );
    fs.writeFileSync(l3Path, html, 'utf8');
    console.log('✅ Centered tag on handle in L3:', l3Path);
  }
});
