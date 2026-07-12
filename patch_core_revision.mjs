import fs from 'fs';

const corePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let coreContent = fs.readFileSync(corePath, 'utf8');

// 1. Add the import
if (!coreContent.includes('import { renderRevisionZone }')) {
  coreContent = "import { renderRevisionZone } from './revision_zone.js';\n" + coreContent;
}

// 2. Add the sidebar link
const targetStr = `    const workbookLink = document.createElement('a');
    workbookLink.className = 'lesson-link';
    workbookLink.textContent = 'Pupil Workbook';`;

const replacementStr = `    const revisionLink = document.createElement('a');
    revisionLink.className = 'lesson-link';
    revisionLink.innerHTML = '🎮 Revision Zone';
    revisionLink.style.marginTop = '15px';
    revisionLink.style.borderTop = '2px solid rgba(255,255,255,0.1)';
    revisionLink.style.color = '#fde047';
    revisionLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      revisionLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = ''; // clear
      renderRevisionZone(contentArea, unitData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(revisionLink);

    const workbookLink = document.createElement('a');
    workbookLink.className = 'lesson-link';
    workbookLink.textContent = 'Pupil Workbook';`;

if (coreContent.includes(targetStr) && !coreContent.includes('Revision Zone')) {
  coreContent = coreContent.replace(targetStr, replacementStr);
  fs.writeFileSync(corePath, coreContent, 'utf8');
  console.log("Injected Revision Zone into core_app.js");
} else {
  console.log("Could not inject Revision Zone or already injected.");
}
