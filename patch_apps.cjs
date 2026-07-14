const fs = require('fs');
const path = require('path');

const getDirs = src => fs.readdirSync(src, {withFileTypes: true}).filter(d => d.isDirectory() && !d.name.startsWith('.')).map(d => d.name);
const units = getDirs('./').filter(d => fs.existsSync(path.join(d, 'app.js')));

for (const unit of units) {
  let code = fs.readFileSync(path.join(unit, 'app.js'), 'utf8');
  
  if (code.includes('fetch(\'/database.json\')')) {
    continue; // Already patched
  }

  // Remove the static import
  code = code.replace(/import\s+\{\s*(unitData|gwData)\s*\}\s+from\s+['"].\/data\.js['"];/g, '');

  const fetchWrapper = `
fetch('/database.json').then(r => r.json()).then(db => {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  let unitId = pathParts[pathParts.length - 1] === 'index.html' ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];
  if (!unitId || !db[unitId]) unitId = '${unit}';
  
  const unitData = db[unitId].data;
`;

  // Inject the fetch wrapper right before initializeApp
  code = code.replace('initializeApp(', fetchWrapper + '\n  initializeApp(');

  // For key individuals, we need to pass biographies from DB
  if (code.includes('initKeyIndividualsTask(')) {
    // If it currently passes a hardcoded array or import, replace it
    code = code.replace(/initKeyIndividualsTask\(.*?\);/, 'if (db[unitId].biographies) initKeyIndividualsTask(db[unitId].biographies);\n});');
  } else {
    code = code + '\n});';
  }

  fs.writeFileSync(path.join(unit, 'app.js'), code, 'utf8');
  console.log(`Successfully patched ${unit}/app.js to fetch database.json`);
}
