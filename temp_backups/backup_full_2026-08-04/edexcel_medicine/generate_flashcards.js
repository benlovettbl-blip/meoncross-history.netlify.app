const fs = require('fs');
const path = require('path');

// 1. Read data
const dataPath = path.join(__dirname, 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Parse data using regex to handle module export
const match = dataContent.match(/const unitData = (\{[\s\S]+\});\s*export default unitData;/);
if (!match) {
  console.error("Could not parse data.js");
  process.exit(1);
}
const unitData = eval('(' + match[1] + ')');

// 2. Gather Glossary Terms
let terms = [];
if (unitData.glossary) {
  terms.push(...unitData.glossary);
}
// Also grab any lesson-specific vocab just in case
unitData.lessons.forEach(lesson => {
  if (lesson.vocab) {
    lesson.vocab.forEach(v => {
      if (!terms.some(t => t.term.toLowerCase() === v.term.toLowerCase())) {
        terms.push(v);
      }
    });
  }
});

// 3. Build Pages (8 cards per page: 2 columns x 4 rows)
const CARDS_PER_PAGE = 8;
const COLS = 2;

let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Printable Flashcards</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background: #f1f5f9;
    }
    
    .page {
      width: 210mm;
      height: 297mm; /* A4 */
      background: white;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 10mm;
      page-break-after: always;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 1fr);
      gap: 0;
    }
    
    .card {
      border: 1px dashed #cbd5e1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
    }
    
    .card-term {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
    }
    
    .card-def {
      font-size: 1.2rem;
      color: #334155;
      line-height: 1.5;
    }
    
    @media print {
      body { background: white; }
      .page { margin: 0; padding: 10mm; box-shadow: none; }
      @page { margin: 0; size: A4; }
    }
  </style>
</head>
<body>
`;

// Calculate total pages needed for fronts
const numPages = Math.ceil(terms.length / CARDS_PER_PAGE);

for (let p = 0; p < numPages; p++) {
  const pageTerms = terms.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
  
  // --- FRONT PAGE (Terms) ---
  htmlContent += `\n<div class="page">\n`;
  for (let i = 0; i < CARDS_PER_PAGE; i++) {
    if (i < pageTerms.length) {
      htmlContent += `<div class="card"><div class="card-term">${pageTerms[i].term}</div></div>\n`;
    } else {
      htmlContent += `<div class="card"></div>\n`; // Empty card to maintain grid
    }
  }
  htmlContent += `</div>\n`;
  
  // --- BACK PAGE (Definitions - Mirrored!) ---
  // To mirror a 2x4 grid, we swap column 0 and column 1 for each row.
  // Indices mapping for front -> back:
  // Row 1: 0, 1 -> 1, 0
  // Row 2: 2, 3 -> 3, 2
  // Row 3: 4, 5 -> 5, 4
  // Row 4: 6, 7 -> 7, 6
  htmlContent += `\n<div class="page">\n`;
  for (let i = 0; i < CARDS_PER_PAGE; i++) {
    // Find the mirrored index
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const mirroredCol = COLS - 1 - col;
    const mirroredIndex = row * COLS + mirroredCol;
    
    if (mirroredIndex < pageTerms.length) {
      htmlContent += `<div class="card"><div class="card-def">${pageTerms[mirroredIndex].definition}</div></div>\n`;
    } else {
      htmlContent += `<div class="card"></div>\n`;
    }
  }
  htmlContent += `</div>\n`;
}

htmlContent += `\n</body>\n</html>`;

fs.writeFileSync(path.join(__dirname, 'www/flashcards.html'), htmlContent);
console.log("Successfully generated www/flashcards.html");
