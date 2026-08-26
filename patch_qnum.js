const fs = require('fs');

const files = ['generate_textbooks.js', 'generate_workbooks.js', 'generate_pupil_workbooks.js'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Find the marker
    let startMarker = 'let globalQNum = 1;';
    let idx = content.indexOf(startMarker);
    if (idx === -1) {
        console.log("Could not find start marker in", file);
        return;
    }
    
    let afterStart = idx + startMarker.length;
    let endMarker = 'html += `<h2 style="margin-top: 40px;';
    
    let endIdx = content.indexOf(endMarker, afterStart);
    if (endIdx === -1) {
        console.log("Could not find end marker in", file);
        return;
    }
    
    let newLogic = `
    let currentUnitId = typeof unitId !== 'undefined' ? unitId : 'great_war';
    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) lesson.do_now.qNum = globalQNum++;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => { 
        if (block.tasks) {
          block.tasks.forEach(task => { 
            if (currentUnitId === 'great_war' || currentUnitId === 'great_war_part2') { 
              if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, ''); 
              if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, ''); 
            } 
            if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') task.qNum = globalQNum++; 
          }); 
        }
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++; 
      });
    }

    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.sources) {
      lesson.sources.forEach(source => { 
        if (source.question) source.qNum = globalQNum++; 
      });
    }
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach(t => t.qNum = globalQNum++);
      } else {
          lesson.gcse_task.qNum = globalQNum++;
      }
    }
    
    `;
    
    let newContent = content.substring(0, afterStart) + newLogic + content.substring(endIdx);
    fs.writeFileSync(file, newContent);
    console.log("Patched QNum in", file);
});
