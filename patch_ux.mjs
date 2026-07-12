import fs from 'fs';

const indexPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

if (!indexContent.includes('.ux-tweaks')) {
  const uxCss = `
  <style class="ux-tweaks">
    /* 1. Dyslexia Mode Font Override */
    body.sen-mode .standard-narrative-container span[style*="font-family: 'Playfair Display'"] {
      font-family: 'Comic Sans MS', 'OpenDyslexic', sans-serif !important;
    }
    
    /* 2. Model Answer Polish & Animations */
    .embedded-tasks-container .answer {
      display: none !important;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      background: #f0fdf4 !important;
      border-left: 4px solid #16a34a !important;
    }
    .embedded-tasks-container .answer.revealed {
      display: block !important;
      opacity: 1;
      transform: translateY(0);
      animation: slideDownFade 0.3s ease forwards;
    }
    
    @keyframes slideDownFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* 3. Back to Top Button */
    #back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #1e3a8a;
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      border: none;
    }
    #back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    #back-to-top:hover {
      background: #1e40af;
      transform: scale(1.1);
    }
  </style>
  
  <script class="ux-tweaks-script">
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('back-to-top');
      if (btn) {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }
    });
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  </script>
</head>`;

  indexContent = indexContent.replace('</head>', uxCss);
  
  // Add the button to body
  const bttButton = `<button id="back-to-top" onclick="scrollToTop()" title="Back to Top"><i class="fa-solid fa-arrow-up"></i></button>\n</body>`;
  indexContent = indexContent.replace('</body>', bttButton);
  
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log("Injected index.html UX tweaks!");
} else {
  console.log("index.html already patched.");
}


const worksheetsPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let wsContent = fs.readFileSync(worksheetsPath, 'utf8');

if (!wsContent.includes('page-break-inside: avoid;')) {
  const cssInjection = `
    .task-box, .narrative-chunk, table, .ascii-diagram {
      page-break-inside: avoid;
    }
  `;
  wsContent = wsContent.replace('</style>', cssInjection + '\n  </style>');
  fs.writeFileSync(worksheetsPath, wsContent, 'utf8');
  console.log("Injected generate_worksheets.js print tweaks!");
} else {
  console.log("generate_worksheets.js already patched.");
}
