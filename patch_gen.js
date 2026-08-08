const fs = require('fs');

let code = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Update the Print CSS
const oldCss = `@media print { * { box-shadow: none !important; border-radius: 0 !important; }
        img { max-width: 100% !important; object-fit: contain !important;  }
        .source-container {  }
      }`;
      
const newCss = `@media print { 
        * { box-shadow: none !important; border-radius: 0 !important; }
        img { max-width: 100% !important; object-fit: contain !important;  }
        .source-container {  }
        .tab-buttons, button { display: none !important; }
        .tab-pane { display: block !important; opacity: 1 !important; visibility: visible !important; position: static !important; }
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
        .side-quest-box summary::before { content: ""; display: none !important; }
        .lesson-reflection { page-break-inside: auto; } 
      }`;

if (code.includes(oldCss)) {
    code = code.replace(oldCss, newCss);
}

// 2. Strip `display: none` from inline styles during HTML generation
// Find `html += \`<div>\${block.text}</div>\`;` and replace it
const oldRender = `html += \`<div>\${block.text}</div>\`;`;
const newRender = `let printableText = block.text.replace(/display:\\s*none;?/gi, 'display: block;');\n        html += \`<div>\${printableText}</div>\`;`;

if (code.includes(oldRender)) {
    code = code.replace(oldRender, newRender);
} else {
    // If not found, let's search with regex
    code = code.replace(/html \+= `<div>\$\{block\.text\}<\/div>`;/g, newRender);
}

fs.writeFileSync('generate_workbooks.js', code, 'utf8');
console.log('generate_workbooks.js updated');
