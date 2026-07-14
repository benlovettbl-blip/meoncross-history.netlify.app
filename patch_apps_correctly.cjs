const fs = require('fs');
const path = require('path');

const getDirs = src => fs.readdirSync(src, {withFileTypes: true}).filter(d => d.isDirectory() && !d.name.startsWith('.')).map(d => d.name);
const units = getDirs('./').filter(d => fs.existsSync(path.join(d, 'app.js')));

for (const unit of units) {
  let code = fs.readFileSync(path.join(unit, 'app.js'), 'utf8');
  
  if (code.includes("fetch('/database.json')")) {
    continue; // Already patched
  }

  // 1. Remove the static import of data.js
  code = code.replace(/import\s+\{\s*(unitData|gwData)\s*\}\s+from\s+['"].\/data\.js['"];/g, '');

  // 2. Inject fetch wrapper right before initializeApp
  const fetchHeader = `fetch('/database.json').then(r => r.json()).then(db => {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  let unitId = pathParts[pathParts.length - 1] === 'index.html' ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];
  if (!unitId || !db[unitId]) unitId = '${unit}'; // default to folder name
  
  const unitData = db[unitId].data || {};
`;

  code = code.replace('initializeApp(', fetchHeader + '\n  initializeApp(');

  // 3. Fix the key individuals task to use db[unitId].biographies
  // The original line is usually: initKeyIndividualsTask(contentArea, unitData.key_individuals);
  // or initKeyIndividualsTask(contentArea, gwData.key_individuals);
  code = code.replace(/initKeyIndividualsTask\(contentArea,\s*(unitData|gwData)\.key_individuals\);/g, 'if (db[unitId].biographies) initKeyIndividualsTask(contentArea, db[unitId].biographies);');

  // 4. Close the fetch block at the end of the file
  code += '\n});\n';

  fs.writeFileSync(path.join(unit, 'app.js'), code, 'utf8');
  console.log(`Successfully patched ${unit}/app.js`);
}
