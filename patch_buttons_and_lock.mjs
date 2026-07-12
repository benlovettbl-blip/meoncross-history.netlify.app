import fs from 'fs';

// 1. Fix the "lesson is locked" text in core_app.js
const coreAppPath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let coreAppContent = fs.readFileSync(coreAppPath, 'utf8');

const oldLockText = '<i class="fa-solid fa-lock" style="color: #ef4444;"></i> <strong>The lesson is locked!</strong> Tap a term on the left, then tap its matching definition on the right to unlock the historical narrative.';
const newLockText = '<i class="fa-solid fa-spell-check" style="color: #3b82f6;"></i> <strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.';

if (coreAppContent.includes(oldLockText)) {
  coreAppContent = coreAppContent.replace(oldLockText, newLockText);
  fs.writeFileSync(coreAppPath, coreAppContent, 'utf8');
  console.log("Fixed vocabulary text in core_app.js");
} else {
  console.log("Could not find the old lock text in core_app.js. It might already be changed or differently formatted.");
}

// 2. Make the header buttons discreet in cme_new/index.html
const indexHtmlPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

if (!indexHtmlContent.includes('.header-actions .btn {')) {
  const cssInjection = `
  <style>
    /* Make header buttons much smaller and more discreet */
    .header-actions .btn {
      font-size: 0.75rem !important;
      padding: 4px 8px !important;
      background: transparent !important;
      color: rgba(255, 255, 255, 0.8) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      box-shadow: none !important;
      border-radius: 4px !important;
      transition: all 0.2s ease !important;
      margin-right: 5px !important;
    }
    .header-actions .btn:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: #fff !important;
      border-color: rgba(255, 255, 255, 0.6) !important;
    }
    .header-actions .btn i {
      margin-right: 4px;
    }
    /* Active states for laptop/teacher modes */
    body.laptop-mode-active .header-actions .btn:nth-child(4),
    body.teacher-mode-active .header-actions .btn:nth-child(5) {
      background: rgba(255, 255, 255, 0.25) !important;
      color: #fff !important;
      border-color: #fff !important;
    }
  </style>
</head>`;

  indexHtmlContent = indexHtmlContent.replace('</head>', cssInjection);
  fs.writeFileSync(indexHtmlPath, indexHtmlContent, 'utf8');
  console.log("Injected CSS for discreet header buttons in index.html");
} else {
  console.log("Header buttons CSS already injected.");
}
