const fs = require('fs');

let wbCode = fs.readFileSync('generate_workbooks.js', 'utf8');

// Strip narrative and images properly for Workbook
wbCode = wbCode.replace(/let finalRenderedText = formatText\(textToRender\);/g, 'let finalRenderedText = ""; // Stripped narrative for Workbook');
wbCode = wbCode.replace(/let imgTags = '';\s*if\s*\(renderImages\)\s*\{[\s\S]*?\}/g, 'let imgTags = ""; // Stripped images');
wbCode = wbCode.replace(/let imageHtml = '';\s*if\s*\(block\.image\)\s*\{[\s\S]*?\}/g, 'let imageHtml = ""; // Stripped images');

// Ensure image is stripped from narrative blocks too
wbCode = wbCode.replace(/let imageHtml = '';\s*if\s*\(block\.image\)\s*\{[\s\S]*?\}\s*const\s+bg\s*=\s*/g, 'let imageHtml = ""; const bg = ');


fs.writeFileSync('generate_workbooks.js', wbCode);
console.log('Workbook patched successfully');
