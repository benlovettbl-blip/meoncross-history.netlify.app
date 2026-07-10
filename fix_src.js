const fs=require('fs'); 
const path=require('path'); 
const units=['great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'change_1450_1750']; 

units.forEach(u => { 
  ['generate_answer_key.js', 'generate_worksheets.js'].forEach(file => { 
    let p = path.join(u, file); 
    if(fs.existsSync(p)) { 
      let code = fs.readFileSync(p, 'utf8'); 
      
      code = code.replace(
        "lesson.primary_source.src.startsWith('../') ?", 
        "lesson.primary_source.src.startsWith('../') || lesson.primary_source.src.startsWith('http') ?"
      );
      
      code = code.replace(
        "source.src.startsWith('../') ?", 
        "source.src.startsWith('../') || source.src.startsWith('http') ?"
      );
      
      fs.writeFileSync(p, code); 
      console.log('Fixed', p); 
    } 
  }); 
});
