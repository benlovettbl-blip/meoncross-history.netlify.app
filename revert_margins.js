const fs = require('fs');

let exportContent = fs.readFileSync('export_pdfs.js', 'utf8');
exportContent = exportContent.replace(/margin: \{[^}]+\}/, `margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }`);
exportContent = exportContent.replace(/displayHeaderFooter: true,/g, '');
fs.writeFileSync('export_pdfs.js', exportContent, 'utf8');

let genContent = fs.readFileSync('generate_workbooks.js', 'utf8');
genContent = genContent.replace(/@page \{ size: A4 portrait; margin: 0; \}/g, '@page { size: A4 portrait; margin: 10mm; }');
genContent = genContent.replace(/\.task-box \{ page-break-inside: auto; \}/g, '.task-box { page-break-inside: avoid; }');
fs.writeFileSync('generate_workbooks.js', genContent, 'utf8');
