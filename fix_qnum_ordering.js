const fs = require('fs');

const files = [
    'generate_textbooks.js',
    'generate_workbooks.js',
    'generate_pupil_workbooks.js'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    let startRegex = /let globalQNum = 1;/g;
    let match = startRegex.exec(content);
    if (!match) {
        console.log(`Could not find start marker in ${file}`);
        return;
    }
    
    let startIdx = match.index;
    let afterStartIdx = startIdx + match[0].length;
    
    // Find the end of the assignment block (where html += `<h2 style="margin-top: 40px;)
    let endIdx = content.indexOf('html += `<h2 style="margin-top: 40px', afterStartIdx);
    if (endIdx === -1) endIdx = content.indexOf('html += `\\n\\n<div class="worksheet-page"', afterStartIdx); // generate_workbooks.js
    if (endIdx === -1) endIdx = content.indexOf('html += `<h2 style="margin-top: 0px;', afterStartIdx); // generate_pupil_workbooks.js
    
    if (startIdx !== -1 && endIdx !== -1) {
        let newLogic = `
    let currentUnitId = typeof unitId !== 'undefined' ? unitId : 'great_war';
    if (lesson.do_now && lesson.do_now.prediction_question) lesson.do_now.qNum = globalQNum++;
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
        content = content.substring(0, afterStartIdx) + newLogic + content.substring(endIdx);
        fs.writeFileSync(file, content);
        console.log(`Fixed qNum ordering in ${file}`);
    } else {
        console.log(`Could not find markers in ${file}`);
    }
});
