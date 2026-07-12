import fs from 'fs';

const indexHtmlPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

if (!indexHtmlContent.includes('pre.ascii-diagram {')) {
  const cssInjection = `
  <style>
    /* Ensure ascii diagrams fit well and scroll if needed */
    pre.ascii-diagram {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
      font-size: 0.8rem !important; /* Smaller font to prevent overflow */
      line-height: 1.3 !important;
      overflow-x: auto !important; /* Enable horizontal scrolling */
      max-width: 100% !important;
      padding: 15px !important;
      background: #f1f5f9 !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 8px !important;
      color: #334155 !important;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.02) !important;
      white-space: pre !important;
    }
    
    /* Make the diagrams scale down further on very small screens */
    @media (max-width: 768px) {
      pre.ascii-diagram {
        font-size: 0.6rem !important;
        padding: 10px !important;
      }
    }
  </style>
</head>`;

  indexHtmlContent = indexHtmlContent.replace('</head>', cssInjection);
  fs.writeFileSync(indexHtmlPath, indexHtmlContent, 'utf8');
  console.log("Injected CSS for ascii diagrams in index.html");
} else {
  console.log("ASCII Diagram CSS already injected.");
}
