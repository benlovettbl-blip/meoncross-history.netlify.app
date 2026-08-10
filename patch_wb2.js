const fs = require('fs');

let wbCode = fs.readFileSync('generate_workbooks.js', 'utf8');
wbCode = wbCode.replace(/allDirs\.forEach\(unitId => \{/, "allDirs.filter(d => d === 'early_modern_world').forEach(unitId => {");

// To safely strip narrative, let's just nullify finalRenderedText right before it's checked:
wbCode = wbCode.replace(/let finalRenderedText = formatText\(textToRender\);/g, 'let finalRenderedText = ""; // STRIPPED NARRATIVE');

// To safely strip the primary source image, we can just replace its img tags:
wbCode = wbCode.replace(/return `<img src="\$\{resolved\}" alt="Primary Source" style="\$\{style\}">`;/g, "return ''; // STRIPPED IMAGE");

// To safely strip narrative images:
wbCode = wbCode.replace(/imageHtml = `<div style="text-align: center;.*?>.*?<\/img><\/div>`;/g, "imageHtml = ''; // STRIPPED IMAGE");

// To safely strip source-container in primary sources:
// Actually just preventing image renders above handles it mostly, but let's hide the container border:
wbCode = wbCode.replace(/<div class="source-container" style=" margin-bottom: 15px;">/g, '<div class="source-container" style=" margin-bottom: 0px; padding-top: 0px; border-top: none;">');


fs.writeFileSync('generate_workbooks.js', wbCode);
console.log('Workbook patched cleanly!');
