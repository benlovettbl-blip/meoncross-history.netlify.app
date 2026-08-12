const fs = require('fs');

let code = fs.readFileSync('src/core_app.js', 'utf8');

const startStr = "if (window.currentUnitId === 'water_and_sanitation') {";
const found = code.indexOf(startStr);
if (found !== -1) {
    // Find the end of the if block. It contains 2 a tags, so we can just look for the first closing brace after finding navContainer.appendChild
    const endStr = "navContainer.appendChild(pupilWorkbookLink);";
    const endOfCode = code.indexOf(endStr, found) + endStr.length;
    const end = code.indexOf('}', endOfCode);
    
    const newSidebar = `// Always show PDF Textbook and Workbook links
    const pdfTextbookLink = document.createElement('a');
    pdfTextbookLink.className = 'lesson-link';
    pdfTextbookLink.innerHTML = '<i class="fa-solid fa-book-open"></i> PDF Textbook';
    pdfTextbookLink.href = \`/pdfs/\${window.currentUnitId}_textbook.pdf\`;
    pdfTextbookLink.target = '_blank';
    pdfTextbookLink.style.marginTop = '15px';
    pdfTextbookLink.style.color = '#3b82f6';
    navContainer.appendChild(pdfTextbookLink);

    const pupilWorkbookLink = document.createElement('a');
    pupilWorkbookLink.className = 'lesson-link';
    pupilWorkbookLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Printable Workbook';
    pupilWorkbookLink.href = \`/pdfs/\${window.currentUnitId}_pupil_workbook.pdf\`;
    pupilWorkbookLink.target = '_blank';
    pupilWorkbookLink.style.marginTop = '15px';
    pupilWorkbookLink.style.color = '#8b5cf6';
    navContainer.appendChild(pupilWorkbookLink);`;

    code = code.substring(0, found) + newSidebar + code.substring(end + 1);
    fs.writeFileSync('src/core_app.js', code);
    console.log("SUCCESS!");
} else {
    console.log("FAILED to find startStr");
}
