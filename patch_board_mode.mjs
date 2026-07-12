import fs from 'fs';

// 1. Inject CSS into index.html
const indexPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

if (!indexContent.includes('.board-mode-active')) {
  const css = `
  <style class="board-mode-css">
    /* Board Mode CSS */
    body.board-mode-active .standard-narrative-container,
    body.board-mode-active .level4-narrative-container,
    body.board-mode-active .phase-card > div:first-child,
    body.board-mode-active .sources-grid,
    body.board-mode-active .do-now-card,
    body.board-mode-active .task-box {
      display: none !important;
    }
    
    body.board-mode-active .phase-card {
      border: none !important;
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    body.board-mode-active .embedded-tasks-container {
      margin-left: 0 !important;
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      padding: 0 0 15px 0 !important;
    }
    
    body.board-mode-active .embedded-tasks-container > h4 {
      display: none !important;
    }
    
    body.board-mode-active .embedded-tasks-container > div {
      font-size: 1.35rem !important;
      padding: 20px !important;
      background: #f8fafc !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 8px !important;
      margin-bottom: 15px !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important;
    }

    body.board-mode-active .header-actions .btn:nth-child(6) {
      background: rgba(255, 255, 255, 0.25) !important;
      color: #fff !important;
      border-color: #fff !important;
    }
  </style>
</head>`;

  indexContent = indexContent.replace('</head>', css);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log("Injected Board Mode CSS into index.html");
} else {
  console.log("Board Mode CSS already exists.");
}

// 2. Inject JS into core_app.js
const appPath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

if (!appContent.includes('btnBoardMode')) {
  const jsToInject = `
    const btnBoardMode = document.createElement('button');
    btnBoardMode.className = 'btn btn-secondary';
    btnBoardMode.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Board Mode';
    btnBoardMode.addEventListener('click', () => {
      document.body.classList.toggle('board-mode-active');
      const isActive = document.body.classList.contains('board-mode-active');
      btnBoardMode.innerHTML = isActive ? '<i class="fa-solid fa-person-chalkboard"></i> Board Mode: ON' : '<i class="fa-solid fa-person-chalkboard"></i> Board Mode';
      if (isActive) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    headerActions.appendChild(btnBoardMode);
`;
  
  // Find where btnCurriculum is appended
  const target = "headerActions.appendChild(btnCurriculum);";
  if (appContent.includes(target)) {
    appContent = appContent.replace(target, target + '\n' + jsToInject);
    fs.writeFileSync(appPath, appContent, 'utf8');
    console.log("Injected btnBoardMode into core_app.js");
  } else {
    console.log("Could not find target to inject btnBoardMode");
  }
} else {
  console.log("btnBoardMode already exists.");
}
