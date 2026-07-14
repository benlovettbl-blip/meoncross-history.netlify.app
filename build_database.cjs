const fs = require('fs');
const path = require('path');

async function buildDatabase() {
  const db = {};
  
  // Get all unit directories
  const getDirs = src => fs.readdirSync(src, {withFileTypes: true}).filter(d => d.isDirectory() && !d.name.startsWith('.')).map(d => d.name);
  const units = getDirs('./').filter(d => fs.existsSync(path.join(d, 'data.js')));
  
  for (const unit of units) {
    db[unit] = {};
    
    // 1. Data.js
    try {
      // Use absolute path for import to avoid resolution issues
      const modPath = 'file://' + path.resolve(unit, 'data.js').replace(/\\/g, '/');
      const mod = await import(modPath);
      db[unit].data = mod.unitData || mod.gwData || mod.default;
    } catch (err) {
      console.error(`Error loading data.js for ${unit}:`, err.message);
    }
    
    // 2. Biographies
    const bioPath = path.join(unit, 'biographies.json');
    if (fs.existsSync(bioPath)) {
      try {
        db[unit].biographies = JSON.parse(fs.readFileSync(bioPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing biographies for ${unit}:`, err.message);
      }
    }
    
    // 3. Quiz JSON
    const quizPath = path.join(unit, 'quiz.json');
    if (fs.existsSync(quizPath)) {
      try {
        db[unit].quiz = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing quiz for ${unit}:`, err.message);
      }
    }
    
    // 4. Terminology
    const termPath = path.join(unit, 'terminology.json');
    if (fs.existsSync(termPath)) {
      try {
        db[unit].terminology = JSON.parse(fs.readFileSync(termPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing terminology for ${unit}:`, err.message);
      }
    }
  }
  
  // Create public dir if not exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  fs.writeFileSync(path.join('public', 'database.json'), JSON.stringify(db, null, 2), 'utf8');
  console.log('Successfully built master database.json with ' + Object.keys(db).length + ' units.');
}

buildDatabase();
