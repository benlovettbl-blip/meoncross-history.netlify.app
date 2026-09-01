const fs = require('fs');

const biographies = JSON.parse(fs.readFileSync('./edexcel_medicine/biographies.json', 'utf-8'));

const periodMapping = {
  "Medieval Medicine (c1250–c1500)": ["Hippocrates", "Claudius Galen", "Roger Bacon"],
  "Renaissance Medicine (c1500–c1700)": ["Andreas Vesalius", "William Harvey", "Thomas Sydenham"],
  "18th & 19th Century (c1700–c1900)": ["Edward Jenner", "Edwin Chadwick", "John Snow", "Florence Nightingale", "James Simpson", "Louis Pasteur", "Joseph Lister", "Robert Koch", "Wilhelm Roentgen"],
  "Modern Medicine (c1900–present)": ["Paul Ehrlich", "Sahachiro Hata", "Gerhard Domagk", "Alexander Fleming", "Howard Florey", "Ernst Chain", "James Watson", "Francis Crick", "Rosalind Franklin", "Karl Landsteiner", "Marie Curie"]
};

const keywordsMapping = {
  "Medieval Medicine (c1250–c1500)": ["The Four Humours", "Miasma", "The Black Death (1348)", "Astrology", "Bloodletting", "The Church", "Apothecary", "Physician"],
  "Renaissance Medicine (c1500–c1700)": ["The Royal Society", "Printing Press", "Anatomy", "The Great Plague (1665)", "Dissection", "Theory of Opposites"],
  "18th & 19th Century (c1700–c1900)": ["Spontaneous Generation", "Germ Theory (1861)", "Carbolic Acid", "Cholera (1854)", "Chloroform", "Public Health Act (1875)", "Vaccination (1796)", "Broad Street Pump"],
  "Modern Medicine (c1900–present)": ["Magic Bullets", "Penicillin", "DNA Structure (1953)", "The NHS (1948)", "Electron Microscope", "Salvarsan 606", "Mass Production", "Clean Air Acts"]
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let pageCount = 1;
const checklistItems = [];
let htmlBody = '';

for (const [period, names] of Object.entries(periodMapping)) {
  const individuals = names.map(n => biographies.find(b => b.name === n)).filter(Boolean);
  const keywords = keywordsMapping[period] || [];
  
  // Combine individuals and keywords for the Word Bank
  const wordBank = shuffle([...individuals.map(i => i.name), ...keywords]);

  // Page: Timeline Knowledge Dump
  pageCount++;
  checklistItems.push({ task: `${period}: Timeline Knowledge Dump`, page: pageCount });
  
  htmlBody += `
    <div style="page-break-before: always; position: relative; height: 100%;">
      <h2 style="font-family: 'Playfair Display', serif; font-size: 16pt; text-align: center; margin-top: 10px; margin-bottom: 10px;">${period}: Timeline Knowledge Dump</h2>
      <p style="text-align: center; margin-bottom: 15px; font-size: 10pt; line-height: 1.3;"><strong>Task:</strong> Place the historical events, keywords, and individuals from the Word Bank onto the blank timeline below in the correct chronological order. Write a brief sentence explaining the significance of each.</p>
      
      <div style="border: 2px dashed #1a237e; border-radius: 6px; padding: 10px; text-align: center; margin-bottom: 150px; background-color: #f8f9fa;">
        <h3 style="margin: 0 0 5px 0; font-size: 11pt; color: #1a237e;">Word Bank</h3>
        <p style="font-size: 10pt; line-height: 1.6; margin: 0;">
          ${wordBank.map(w => `<span style="display: inline-block; padding: 2px 8px; margin: 3px; background: white; border: 1px solid #ccc; border-radius: 4px;">${w}</span>`).join(' ')}
        </p>
      </div>

      <div style="position: relative; width: 100%; height: 350px; border-top: 4px solid #000;">
        <!-- Timeline ticks -->
        <div style="position: absolute; top: -12px; left: 10%; width: 4px; height: 20px; background: #000;"></div>
        <div style="position: absolute; top: -12px; left: 30%; width: 4px; height: 20px; background: #000;"></div>
        <div style="position: absolute; top: -12px; left: 50%; width: 4px; height: 20px; background: #000;"></div>
        <div style="position: absolute; top: -12px; left: 70%; width: 4px; height: 20px; background: #000;"></div>
        <div style="position: absolute; top: -12px; left: 90%; width: 4px; height: 20px; background: #000;"></div>
      </div>
      <div class="page-number">Page ${pageCount}</div>
    </div>
  `;

  // Page: Who Am I? & Odd One Out
  pageCount++;
  checklistItems.push({ task: `${period}: "Who Am I?" & Categorization`, page: pageCount });
  
  let whoAmIHtml = `<h2 style="font-family: 'Playfair Display', serif; font-size: 20pt; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">Part 1: Who Am I?</h2>
  <p style="font-size: 11pt; margin-bottom: 15px;">Read the significance below and retrieve the correct historical individual from memory.</p>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">`;
  
  individuals.forEach((ind, index) => {
    if (index < 4) { // keep it relatively short per page
      whoAmIHtml += `
      <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; gap: 15px; align-items: flex-start;">
          ${ind.image_url ? `<img src="${ind.image_url}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #1a237e; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" alt="Mystery Individual">` : ''}
          <p style="font-style: italic; font-size: 11pt; margin-top: 0; line-height: 1.4;">"${ind.bio}"</p>
        </div>
        <div style="border-bottom: 1px solid #000; width: 100%; margin-top: 20px;">
          <span style="font-weight: bold; font-size: 11pt; color: #555;">Name:</span>
        </div>
      </div>`;
    }
  });
  whoAmIHtml += `</div>`;

  const shuffledForConnection = shuffle([...individuals]);
  const person1 = shuffledForConnection[0]?.name || "Individual A";
  const person2 = shuffledForConnection[1]?.name || "Individual B";

  htmlBody += `
    <div style="page-break-before: always; position: relative; height: 100%;">
      ${whoAmIHtml}
      
      <h2 style="font-family: 'Playfair Display', serif; font-size: 20pt; border-bottom: 2px solid #1a237e; padding-bottom: 10px; margin-top: 25px;">Part 2: Connecting the Dots</h2>
      <p style="font-size: 11pt; margin-bottom: 15px;">Explain the relationship or connection between the two historical individuals below. Did they influence each other? Prove each other wrong?</p>
      <div style="border: 1px solid #ccc; padding: 15px; border-radius: 6px; height: 150px;">
        <p style="font-weight: bold; font-size: 12pt; margin-top: 0;">Connection: ${person1} & ${person2}</p>
        <p style="margin-top: 20px; color: #888;">(Explain their relationship here...)</p>
      </div>
      <div class="page-number">Page ${pageCount}</div>
    </div>
  `;

  // Page: Significance Ranking
  pageCount++;
  checklistItems.push({ task: `${period}: Significance Ranking`, page: pageCount });
  
  htmlBody += `
    <div style="page-break-before: always; position: relative; height: 100%;">
      <h2 style="font-family: 'Playfair Display', serif; font-size: 20pt; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">Part 3: Significance Ranking</h2>
      <p style="font-size: 11pt; margin-bottom: 15px;">Rank the following individuals from 1 (Most Significant) to ${individuals.length} (Least Significant) regarding their impact on medicine. Then, write a paragraph justifying your #1 choice.</p>
      
      <div style="display: flex; gap: 20px;">
        <div style="flex: 1;">
          <h3 style="font-size: 14pt;">Individuals to Rank:</h3>
          <ul style="font-size: 11pt; line-height: 1.8;">
            ${individuals.map(ind => `<li>${ind.name}</li>`).join('')}
          </ul>
        </div>
        <div style="flex: 1; border-left: 2px solid #eee; padding-left: 20px;">
          <h3 style="font-size: 14pt;">Your Rankings:</h3>
          ${individuals.map((_, i) => `<div style="border-bottom: 1px solid #000; margin-bottom: ${individuals.length > 7 ? '12px' : '20px'}; font-size: 11pt;">${i + 1}.</div>`).join('')}
        </div>
      </div>
      
      <div style="margin-top: 30px; border: 1px solid #ccc; padding: 15px; border-radius: 6px; height: ${individuals.length > 7 ? '200px' : '350px'};">
        <h3 style="font-size: 14pt; margin-top: 0;">Justification for #1:</h3>
      </div>
      <div class="page-number">Page ${pageCount}</div>
    </div>
  `;
}

// Generate the Cover Page (Page 1)
const coverPageHtml = `
  <div style="position: relative; height: 100%;">
    <h3 style="text-align: center; color: #555; margin-top: 0; margin-bottom: 10px; font-size: 13pt; text-transform: uppercase; letter-spacing: 0.5px;">Edexcel GCSE History Paper 1</h3>
    <div style="width: 100%; height: 180px; margin-top: 0px; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #1a237e;">
      <img src="../../assets/banners/key_individuals_banner.png" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
        <h1 style="margin: 0 !important; font-size: 36pt; color: white; padding: 0;">Key Individuals in Medicine</h1>
        <p style="font-size:16pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif;">Revision Workbook</p>
      </div>
    </div>
    
    <div style="display: flex; flex-direction: column; align-items: center; margin: 20px auto 0 auto; width: 60%; gap: 15px;">
      <div style="width: 100%; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Name: </div>
      <div style="width: 100%; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Class: </div>
    </div>

    <h2 style="margin-top: 25px; margin-bottom: 15px; font-size: 18pt; text-align: center; color: #1a237e; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">Revision Checklist</h2>
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 11pt;">
      <thead>
        <tr style="background: #1a237e; color: white;">
          <th style="padding: 8px; border: 1px solid #ddd;">Task Description</th>
          <th style="padding: 8px; border: 1px solid #ddd; width: 80px; text-align: center;">Page</th>
          <th style="padding: 8px; border: 1px solid #ddd; width: 100px; text-align: center;">Completed</th>
        </tr>
      </thead>
      <tbody>
        ${checklistItems.map(item => `
          <tr>
            <td style="padding: 5px 10px; border: 1px solid #ddd;">${item.task}</td>
            <td style="padding: 5px 10px; border: 1px solid #ddd; text-align: center; font-weight: bold;">${item.page}</td>
            <td style="padding: 5px 10px; border: 1px solid #ddd; text-align: center;">
              <div style="width: 20px; height: 20px; border: 2px solid #999; border-radius: 3px; margin: 0 auto;"></div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="page-number">Page 1</div>
  </div>
`;

const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Individuals Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 10.5pt; line-height: 1.35; color: #000; position: relative; }
    h1 { font-family: 'Playfair Display', serif; }
    .page-number { position: absolute; bottom: 0; right: 0; font-weight: bold; color: #555; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page-number { position: fixed; bottom: 12mm; right: 12mm; }
    }
  </style>
</head>
<body>
  ${coverPageHtml}
  ${htmlBody}
</body>
</html>`;

fs.writeFileSync('./edexcel_medicine/workbook_key_individuals.html', finalHtml);
console.log('Key Individuals workbook generated!');
