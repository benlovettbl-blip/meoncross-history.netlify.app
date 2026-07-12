import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/index.html';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  '<button id="btn-text-size" class="btn btn-secondary" style="margin-right: 5px;" onclick="document.body.classList.toggle(\'large-text\')"><i class="fa-solid fa-text-height"></i> A+ / A-</button>',
  `<button id="btn-simplify" class="btn btn-secondary" style="margin-right: 5px;" onclick="document.body.classList.toggle('simplified-mode')"><i class="fa-solid fa-language"></i> Simplify Text (L4)</button>
          <button id="btn-text-size" class="btn btn-secondary" style="margin-right: 5px;" onclick="document.body.classList.toggle('large-text')"><i class="fa-solid fa-text-height"></i> A+ / A-</button>`
);

// We need to add the CSS logic for simplified-mode
if (!content.includes('.simplified-mode')) {
  content = content.replace(
    '</style>',
    `  body.simplified-mode .standard-narrative-container { display: none !important; }
    body.simplified-mode .level4-narrative-container { display: block !important; }
  </style>`
  );
  // Wait, index.html doesn't have a <style> block, it uses <link>. Let's just append to head or style.css.
  content = content.replace(
    '</head>',
    `  <style>
    body.simplified-mode .standard-narrative-container { display: none !important; }
    body.simplified-mode .level4-narrative-container { display: block !important; }
  </style>
</head>`
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("index.html patched successfully.");
