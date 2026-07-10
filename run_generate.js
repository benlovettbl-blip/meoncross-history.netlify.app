const cp=require('child_process'); 
const units=['great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'change_1450_1750']; 

units.forEach(u => { 
  try { 
    cp.execSync('node generate_answer_key.js', {cwd: u}); 
    cp.execSync('node generate_worksheets.js', {cwd: u}); 
    console.log('Generated for ' + u); 
  } catch(e) { 
    console.error('Failed ' + u, e.message); 
  } 
});
