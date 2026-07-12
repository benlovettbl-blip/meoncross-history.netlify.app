import fs from 'fs';

const worksheetsPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let wsContent = fs.readFileSync(worksheetsPath, 'utf8');

if (!wsContent.includes('.ascii-diagram { page-break-inside: avoid; }')) {
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
