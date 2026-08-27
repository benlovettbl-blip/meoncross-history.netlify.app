const fs = require('fs');
const path = require('path');

async function buildDatabase() {
  const db = {};
  
  const unitsDir = path.join('public', 'units');
  const getDirs = src => fs.readdirSync(src, {withFileTypes: true}).filter(d => d.isDirectory() && !d.name.startsWith('.')).map(d => path.join(src, d.name));
  let units = getDirs(unitsDir).filter(d => fs.existsSync(path.join(d, 'data.js')));
  
  // Ignore change_1450_1750 for now as requested
  units = units.filter(d => !d.includes('change_1450_1750'));

  for (const unit of units) {
    const unitKey = path.basename(unit);
    db[unitKey] = {};
    
    // 1. Data.js
    try {
      // Use absolute path for import to avoid resolution issues
      const fileUrl = 'file:///' + path.join(process.cwd(), unit, 'data.js').replace(/\\/g, '/') + '?t=' + Date.now();
      const mod = await import(fileUrl);
      db[unitKey].data = mod.unitData || mod.gwData || mod.default;
      
      // Orphaned Questions Guard
      if (db[unitKey].data && db[unitKey].data.lessons) {
        db[unitKey].data.lessons.forEach((lesson, lIdx) => {
          if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach((block, bIdx) => {
              if (block.tasks) {
                block.tasks.forEach((task) => {
                  if (task.type === 'source_analysis') {
                    console.warn(`\x1b[33m[WARNING] Orphaned source_analysis task found in narrative_blocks for ${unitKey} Lesson ${lIdx + 1}. Please move it to the sources array.\x1b[0m`);
                  }
                });
              }
            });
          }
        });
      }
    } catch (err) {
      console.error(`Error loading data.js for ${unit}:`, err.message);
    }
    
    // 2. Biographies
    const bioPath = path.join(unit, 'biographies.json');
    if (fs.existsSync(bioPath)) {
      try {
        db[unitKey].biographies = JSON.parse(fs.readFileSync(bioPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing biographies for ${unit}:`, err.message);
      }
    }
    
    // 3. Quiz JSON
    const quizPath = path.join(unit, 'quiz.json');
    if (fs.existsSync(quizPath)) {
      try {
        db[unitKey].quiz = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing quiz for ${unit}:`, err.message);
      }
    }
    
    // 4. Terminology
    const termPath = path.join(unit, 'terminology.json');
    if (fs.existsSync(termPath)) {
      try {
        db[unitKey].terminology = JSON.parse(fs.readFileSync(termPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing terminology for ${unit}:`, err.message);
      }
    }
  }
  
  // Create public dir if not exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  if (!fs.existsSync('public/data')) {
    fs.mkdirSync('public/data');
  }
  
  for (const unit of units) {
      const unitKey = path.basename(unit);
      if (db[unitKey]) {
          if (!db[unitKey].data) db[unitKey].data = {};
          if (unitKey === 'eee' && !db[unitKey].data.title) {
              db[unitKey].data.title = "Early Elizabethan England, 1558-88";
              db[unitKey].data.desc = "Explore the challenges of Elizabeth's reign, the religious settlement, Mary Queen of Scots, and the Spanish Armada.";
              db[unitKey].data.yearGroup = "Year 10";
              db[unitKey].data.icon = "fa-crown";
          }
          if (unitKey === 'great_war_part2' && !db[unitKey].data.title) {
              db[unitKey].data.title = "KS3: The Great War (1914-1919)";
              db[unitKey].data.desc = "A comprehensive journey from the spark at Sarajevo, through the mud of the trenches and the global empires, to the fragile peace of Versailles.";
              db[unitKey].data.yearGroup = "Year 9";
              db[unitKey].data.icon = "fa-dove";
          }
          if (db[unitKey].data.title) {
              fs.writeFileSync(path.join('public', 'data', `${unitKey}.json`), JSON.stringify(db[unitKey], null, 2), 'utf8');
          } else {
              delete db[unitKey];
          }
      }
  }

  fs.writeFileSync(path.join('public', 'database.json'), JSON.stringify(db, null, 2), 'utf8');
  console.log('Successfully built master database.json and individual unit files with ' + Object.keys(db).length + ' units.');
}

buildDatabase();
