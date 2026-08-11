const fs = require('fs'); 
const files = ['generate_pupil_workbooks.js','generate_textbooks.js','generate_workbooks.js','update_worksheets.js','water_and_sanitation/generate_worksheets.js','weimar_nazi_germany/generate_worksheets.js','industrialisation_and_empire/generate_worksheets.js','great_war/generate_worksheets.js','edexcel_medicine/generate_worksheets.js','edexcel_medicine/draft_generate_worksheets.js','early_modern_world/generate_worksheets.js','eee/generate_worksheets.js','change_1450_1750/generate_worksheets.js']; 
files.forEach(f => { 
  if(fs.existsSync(f)){ 
    let c = fs.readFileSync(f, 'utf8'); 
    c = c.replace(/`\s*`(<div class="task-lines".*?<\/div>)`\s*`/g, '`\n          $1\n        `'); 
    fs.writeFileSync(f, c); 
    console.log('Fixed', f); 
  } 
});
