const fs = require('fs');

// 1. Fix generate_workbooks.js
let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// Change @page { size: A4 portrait; margin: 10mm; } to margin: 0;
content = content.replace(/@page \{ size: A4 portrait; margin: 10mm; \}/g, '@page { size: A4 portrait; margin: 0; }');

// Change page-break-inside: auto back to avoid for small components
content = content.replace(/\.task-box \{[^}]*page-break-inside: auto;/g, match => match.replace('page-break-inside: auto;', 'page-break-inside: avoid;'));
content = content.replace(/\.do-now-box \{[^}]*page-break-inside: auto;/g, match => match.replace('page-break-inside: auto;', 'page-break-inside: avoid;'));
content = content.replace(/\.source-container \{[^}]*page-break-inside: auto;/g, match => match.replace('page-break-inside: auto;', 'page-break-inside: avoid;'));
content = content.replace(/\.narrative-block \{[^}]*page-break-inside: auto;/g, match => match.replace('page-break-inside: auto;', 'page-break-inside: avoid;'));

// Change global overrides back to avoid
content = content.replace('.source-container { page-break-inside: auto; }', '.source-container { page-break-inside: avoid; }');
content = content.replace('.narrative-block { page-break-inside: auto; }', '.narrative-block { page-break-inside: avoid; }');
content = content.replace('.task-box { page-break-inside: auto; }', '.task-box { page-break-inside: avoid; }');

// Fix Side Quest purple colors -> grayscale
content = content.replace(/border: 2px solid #8b5cf6/g, 'border: 2px solid #64748b'); // slate-500
content = content.replace(/background: #f5f3ff/g, 'background: #ffffff'); // white
content = content.replace(/color: #6d28d9/g, 'color: #334155'); // slate-700
content = content.replace(/border-bottom: 2px dashed #c4b5fd/g, 'border-bottom: 2px dashed #94a3b8'); // slate-400

// Add inline page-break-inside: auto for GCSE Exam Practice
content = content.replace(
  'html += `<div class="task-box" style="margin-bottom: 15px; page-break-inside: auto;">`;\n        html += `<h2 style="margin-top: 0; color: #b71c1c; font-size: 14pt; border-bottom: none;">GCSE Exam Practice</h2>`;',
  'html += `<div class="task-box" style="margin-bottom: 15px; page-break-inside: auto;">`;\n        html += `<h2 style="margin-top: 0; color: #b71c1c; font-size: 14pt; border-bottom: none;">GCSE Exam Practice</h2>`;'
); // Actually this one was already auto from a previous regex! Wait, I replaced `.task-box { page-break-inside: auto; }` but this one is inline `page-break-inside: auto;`, which is perfect!
// Let me double check line 783:
content = content.replace(
  'html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff;">`;\n            html += `<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Practice',
  'html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff; page-break-inside: auto;">`;\n            html += `<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Practice'
);

content = content.replace(
  'html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff;">`; // Re-open task-box for the remaining questions',
  'html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff; page-break-inside: auto;">`; // Re-open task-box for the remaining questions'
);

fs.writeFileSync('generate_workbooks.js', content, 'utf8');

// 2. Fix export_pdfs.js
let exportContent = fs.readFileSync('export_pdfs.js', 'utf8');

// Replace the page.pdf options
const oldPdfOptions = `      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      });`;

const newPdfOptions = `      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; color: #64748b; font-family: Arial, sans-serif; padding-bottom: 5px;"><span class="pageNumber"></span></div>',
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '15mm',
          left: '10mm'
        }
      });`;

exportContent = exportContent.replace(oldPdfOptions, newPdfOptions);
fs.writeFileSync('export_pdfs.js', exportContent, 'utf8');

console.log('Successfully applied all PDF fixes!');
