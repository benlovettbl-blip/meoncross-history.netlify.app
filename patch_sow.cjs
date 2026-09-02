const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'scripts', 'generate_scheme_of_work.cjs');
let code = fs.readFileSync(scriptPath, 'utf8');

// 1. Branding Colors
// #0c2340 -> #1b365d (Navy)
code = code.replace(/#0c2340/g, '#1b365d');
// #d4af37 -> #facc15 (Yellow/Gold)
code = code.replace(/#d4af37/g, '#facc15');

// 2. Nomenclature
code = code.replace(/Meoncross History Hub/g, 'Meoncross School History Department');

// 3. Year
code = code.replace(/Points for Improvement for 2026\/2027/g, 'Points for Improvement for 2026/2027'); // unchanged, but let's update subtitle
code = code.replace(
  /<div class="cover-subtitle">5-Year Curriculum Overview<\/div>/,
  '<div class="cover-subtitle">5-Year Curriculum Overview (2026-2027)</div>'
);
code = code.replace(
  /<div class="cover-subtitle">\$\{yearGroup\} Scheme of Work<\/div>/,
  '<div class="cover-subtitle">${yearGroup} Scheme of Work (2026-2027)</div>'
);

// 4. Ypres Trip Integration
const tripText = `
                    <li style="margin-bottom: 8px;"><strong>Experiential Learning (Ypres Trip):</strong> The upcoming Year 9 Battlefields Trip to Ypres provides an invaluable opportunity for pupils to walk the ground of the Great War, cementing their classroom learning with powerful lived experience.</li>`;
code = code.replace(
  /(<li style="margin-bottom: 8px;"><strong>The Forgotten Armies:.*?<\/li>)/,
  `$1${tripText}`
);

// 5. Remove Disciplinary Focus Column
// A. Remove Table Headers (Overview table in dev)
code = code.replace(
  /<th style="width: 25%">Learning Objectives<\/th>\s*<th style="width: 15%">Disciplinary Focus<\/th>\s*<th style="width: 35%">Core Assessment & Tasks<\/th>/g,
  '<th style="width: 30%">Learning Objectives</th>\n                                <th style="width: 45%">Core Assessment & Tasks</th>'
);

// B. Remove Table Row Cells
// We have to remove the td that has <strong>${discFocus}</strong>
code = code.replace(
  /<td>\s*<strong>\$\{discFocus\}<\/strong>\s*<\/td>/,
  ''
);

// C. Ensure colspan is updated for the 'Unit in Development' row
code = code.replace(
  /<td colspan="4" style="text-align: center; font-style: italic; color: #64748b; font-size: 14pt; padding: 20px;">Unit in Development – Content TBC<\/td>/g,
  '<td colspan="3" style="text-align: center; font-style: italic; color: #64748b; font-size: 14pt; padding: 20px;">Unit in Development – Content TBC</td>'
);
// Also for the overview PDF mapped one
code = code.replace(
  /<td colspan="4" style="text-align: center; font-style: italic; color: #64748b; font-size: 14pt; padding: 20px;">Unit in Development - Content TBC<\/td>/g,
  '<td colspan="3" style="text-align: center; font-style: italic; color: #64748b; font-size: 14pt; padding: 20px;">Unit in Development - Content TBC</td>'
);

fs.writeFileSync(scriptPath, code);
console.log('generate_scheme_of_work.cjs patched successfully.');
