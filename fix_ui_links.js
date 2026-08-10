const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

// Reverse my previous hack
code = code.replace(/<div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">[\s\S]*?<\/div>/g, '');
code = code.replace(/\/\/ Textbook PDF[\s\S]*?\/\/ Exam Masterclass Guide Tab - ONLY for KS4 units/g, '// Exam Masterclass Guide Tab - ONLY for KS4 units');

fs.writeFileSync('src/core_app.js', code);
console.log('core_app.js reverted');

// Now update unit_router.js
let routerCode = fs.readFileSync('src/unit_router.js', 'utf8');
const oldPrintableWb = /\/\/ 5\. Printable Workbook Tab[\s\S]*?sidebarNav\.appendChild\(wbLink\);\n\s*\}/g;

const newLinks = `
      // 5. PDF Textbook and Workbook Tabs
      {
        const tbLink = document.createElement('a');
        tbLink.className = 'lesson-link';
        tbLink.innerHTML = '<i class="fa-solid fa-book-open" style="margin-right: 8px;"></i> Textbook PDF';
        tbLink.href = '/pdfs/' + unitId + '_textbook.pdf';
        tbLink.target = '_blank';
        sidebarNav.appendChild(tbLink);

        const wbLink = document.createElement('a');
        wbLink.className = 'lesson-link';
        wbLink.innerHTML = '<i class="fa-solid fa-pencil" style="margin-right: 8px;"></i> Workbook PDF';
        wbLink.href = '/pdfs/' + unitId + '_workbook.pdf';
        wbLink.target = '_blank';
        sidebarNav.appendChild(wbLink);
      }
`;

routerCode = routerCode.replace(oldPrintableWb, newLinks);
fs.writeFileSync('src/unit_router.js', routerCode);
console.log('unit_router.js updated');

// Now update lesson_cards.js
let cardsCode = fs.readFileSync('src/lesson_cards.js', 'utf8');
cardsCode = cardsCode.replace(/Printable Workbooks/g, 'PDF Materials');
fs.writeFileSync('src/lesson_cards.js', cardsCode);
console.log('lesson_cards.js updated');

// Now update data.js
let dataCode = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
const oldPrintableArray = /"printable_workbooks": \[\s*\{\s*"title": "Unit Workbook",\s*"url": "workbook.html",\s*"id": "full"\s*\}\s*\]/g;
const newPrintableArray = `"printable_workbooks": [
    {
      "title": "Textbook PDF",
      "url": "../../pdfs/early_modern_world_textbook.pdf",
      "icon": "fa-book-open"
    },
    {
      "title": "Workbook PDF",
      "url": "../../pdfs/early_modern_world_workbook.pdf",
      "icon": "fa-pencil"
    }
  ]`;
dataCode = dataCode.replace(oldPrintableArray, newPrintableArray);
fs.writeFileSync('public/units/early_modern_world/data.js', dataCode);
console.log('data.js updated');

