const fs = require('fs');
const file = 'C:/Projects/meoncross-history.netlify.app/generate_weimar_mocks_edexcel.mjs';
let content = fs.readFileSync(file, 'utf8');

// 1. Add .no-print to @media print
if (!content.includes('.no-print { display: none !important; }')) {
    content = content.replace(
        '@media print {\n      body { background: white; }', 
        '@media print {\n      body { background: white; }\n      .no-print { display: none !important; }'
    );
}

// 2. Add .print-button style before </style>
if (!content.includes('.print-button')) {
    content = content.replace(
        '</style>',
        `
    .print-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 30px;
      background-color: #2563eb;
      color: white;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: background-color 0.2s;
    }
    .print-button:hover {
      background-color: #1d4ed8;
    }
  </style>`
    );
}

// 3. Add button after <body>
if (!content.includes('class="print-button no-print"')) {
    content = content.replace(
        '</head>\n<body>',
        `</head>\n<body>\n  <button class="print-button no-print" onclick="window.print()">🖨️ Print to PDF</button>`
    );
}

fs.writeFileSync(file, content);
console.log('Injected Print to PDF button logic.');
