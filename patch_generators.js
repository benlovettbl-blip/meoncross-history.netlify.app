const fs = require('fs');

// --- 1. Modify generate_textbooks.js ---
let tbCode = fs.readFileSync('generate_textbooks.js', 'utf8');

// Ensure we only run for early_modern_world
tbCode = tbCode.replace(/allDirs\.forEach\(unitId => \{/, "allDirs.filter(d => d === 'early_modern_world').forEach(unitId => {");

// Remove writing lines from Textbook
tbCode = tbCode.replace(/<div class="task-lines"[^>]*><\/div>/g, '');
tbCode = tbCode.replace(/<div class="task-lines-large"[^>]*><\/div>/g, '');

// Remove empty task-boxes
tbCode = tbCode.replace(/<div class="task-box"[^>]*>\s*<\/div>/g, '');

// Inject Subheadings into Textbook
const injectSubheading = `          if (hasContent) {
            html += \`<div class="narrative-block" id="para-\${bIdx+1}">\`;
            if (block.title) {
                html += \`<h4 style="margin: 0 0 10px 0; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">\${block.title}</h4>\`;
            }`;
tbCode = tbCode.replace(/if\s*\(hasContent\)\s*\{\s*html\s*\+=\s*`<div class="narrative-block" id="para-\$\{bIdx\+1\}">`;/g, injectSubheading);

// Change output filename to textbook.html
tbCode = tbCode.replace(/workbook\.html/g, 'textbook.html');

fs.writeFileSync('generate_textbooks.js', tbCode);

// --- 2. Modify generate_workbooks.js ---
let wbCode = fs.readFileSync('generate_workbooks.js', 'utf8');
wbCode = wbCode.replace(/allDirs\.forEach\(unitId => \{/, "allDirs.filter(d => d === 'early_modern_world').forEach(unitId => {");

// Strip Narrative logic from Workbook
const narrativeLoopRegex = /if\s*\(lesson\.narrative_blocks\)\s*\{[\s\S]*?\/\/ End of narrative blocks loop\s*\}/g;
// Wait, generate_workbooks.js doesn't have an "// End of narrative blocks loop" comment.
// Let's just manually replace the block loop with nothing.
const narrativeStart = 'if (lesson.narrative_blocks) {';
const blockLoop = 'lesson.narrative_blocks.forEach((block, bIdx) => {';
// Instead of risky regex, let's just make the finalRenderedText empty and skip image rendering.
// A simpler way: just empty out `finalRenderedText` and prevent `primarySourceHtml` and `imageHtml` from rendering.
wbCode = wbCode.replace(/let finalRenderedText = block\.text \|\| '';/g, 'let finalRenderedText = ""; // Stripped narrative for Workbook');
wbCode = wbCode.replace(/let imgTags = '';\s*if\s*\(renderImages\)\s*\{[\s\S]*?\}/g, 'let imgTags = ""; // Stripped images');
wbCode = wbCode.replace(/let imageHtml = '';\s*if\s*\(block\.image\)\s*\{[\s\S]*?\}/g, 'let imageHtml = ""; // Stripped images');

// Make sure Workbook still renders task boxes but not narrative.
fs.writeFileSync('generate_workbooks.js', wbCode);

// --- 3. Modify export_pdfs.js to export both ---
let pdfCode = fs.readFileSync('export_pdfs.js', 'utf8');

// Run both scripts before puppeteer
pdfCode = pdfCode.replace(
  /require\('\.\/generate_workbooks\.js'\);/,
  "require('./generate_workbooks.js');\nrequire('./generate_textbooks.js');"
);

// We need to loop and render both textbook.html and workbook.html for early_modern_world
const renderLogic = `
          const unitsToRender = ['early_modern_world'];
          for (const unit of unitsToRender) {
             const wbPath = path.join(publicDir, 'units', unit, 'workbook.html');
             const tbPath = path.join(publicDir, 'units', unit, 'textbook.html');
             
             if (fs.existsSync(wbPath)) {
                await page.goto('file://' + wbPath, { waitUntil: 'networkidle0' });
                await page.pdf({
                   path: path.join(pdfsDir, \`\${unit}_workbook.pdf\`),
                   format: 'A4',
                   printBackground: true,
                   displayHeaderFooter: true,
                   headerTemplate: '<div></div>',
                   footerTemplate: '<div style="font-size:10px; width:100%; text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
                   margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
                });
                console.log(\`Generated \${unit}_workbook.pdf\`);
             }

             if (fs.existsSync(tbPath)) {
                await page.goto('file://' + tbPath, { waitUntil: 'networkidle0' });
                await page.pdf({
                   path: path.join(pdfsDir, \`\${unit}_textbook.pdf\`),
                   format: 'A4',
                   printBackground: true,
                   displayHeaderFooter: true,
                   headerTemplate: '<div></div>',
                   footerTemplate: '<div style="font-size:10px; width:100%; text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
                   margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
                });
                console.log(\`Generated \${unit}_textbook.pdf\`);
             }
          }
`;

// Replace the existing loop that looks for workbook.html
pdfCode = pdfCode.replace(/const units = fs\.readdirSync[\s\S]*?console\.log\('All PDFs generated successfully!'\);/g, renderLogic + "\n          console.log('All PDFs generated successfully!');");

fs.writeFileSync('export_pdfs.js', pdfCode);
console.log('Scripts patched!');
