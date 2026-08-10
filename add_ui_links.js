const fs = require('fs');

let code = fs.readFileSync('src/core_app.js', 'utf8');

// 1. Add to Sidebar
const sidebarInjection = `
    // Textbook PDF
    const tbLink = document.createElement('a');
    tbLink.className = 'lesson-link';
    tbLink.innerHTML = '<i class="fa-solid fa-book-open" style="margin-right: 8px;"></i> Textbook PDF';
    tbLink.href = '/pdfs/' + window.currentUnitId + '_textbook.pdf';
    tbLink.target = '_blank';
    navContainer.appendChild(tbLink);

    // Workbook PDF
    const wbLink = document.createElement('a');
    wbLink.className = 'lesson-link';
    wbLink.innerHTML = '<i class="fa-solid fa-pencil" style="margin-right: 8px;"></i> Workbook PDF';
    wbLink.href = '/pdfs/' + window.currentUnitId + '_workbook.pdf';
    wbLink.target = '_blank';
    navContainer.appendChild(wbLink);

    // Exam Masterclass Guide Tab - ONLY for KS4 units`;

code = code.replace(/\/\/ Exam Masterclass Guide Tab - ONLY for KS4 units/g, sidebarInjection);

// 2. Add to Homepage
const homepageInjection = `
        \${unitData.cover_caption ? \`<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">\${unitData.cover_caption}</p>\` : ''}
        
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
          <a href="/pdfs/\${window.currentUnitId}_textbook.pdf" target="_blank" style="display: inline-flex; align-items: center; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><i class="fa-solid fa-book-open" style="margin-right: 8px;"></i> Download Textbook PDF</a>
          <a href="/pdfs/\${window.currentUnitId}_workbook.pdf" target="_blank" style="display: inline-flex; align-items: center; background: #10b981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><i class="fa-solid fa-pencil" style="margin-right: 8px;"></i> Download Answer Booklet PDF</a>
        </div>
`;

code = code.replace(/\$\{unitData\.cover_caption \? `.*?` : ''\}/, homepageInjection);

fs.writeFileSync('src/core_app.js', code);
console.log('UI links added to core_app.js');
