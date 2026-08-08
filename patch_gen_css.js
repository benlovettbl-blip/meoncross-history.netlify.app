const fs = require('fs');
let code = fs.readFileSync('generate_workbooks.js', 'utf8');

const printFix = `
      @media print { * { box-shadow: none !important; border-radius: 0 !important; }
        img { max-width: 100% !important; object-fit: contain !important;  }
        .source-container { page-break-inside: avoid; }
        .narrative-block { page-break-inside: avoid; }
        .task-box { page-break-inside: avoid; }
        h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
        div[style*="display: none"] { display: block !important; }
        button[onclick*="display='none'"] { display: none !important; }
      }
`;

code = code.replace(/@media print \{[\s\S]*?\}/, printFix.trim());
fs.writeFileSync('generate_workbooks.js', code, 'utf8');
console.log('Patched generate_workbooks.js with print CSS fixes');
