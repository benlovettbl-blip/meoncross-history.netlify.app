const fs = require('fs');

['generate_textbooks.js', 'generate_pupil_workbooks.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove the current block of qNum logic that is at the start of periodLessons loop
    // generate_textbooks.js
    const oldTextbookLogic = `    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) lesson.do_now.qNum = globalQNum++;
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
        if (block.source && block.source.question) block.source.qNum = globalQNum++;
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
    }`;

    // generate_pupil_workbooks.js
    const oldPupilLogic = `    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) lesson.do_now.qNum = globalQNum++;
    
    if (lesson.sources) {
      lesson.sources.forEach(source => { 
        if (source.question) source.qNum = globalQNum++; 
      });
    }

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
        if (block.source && block.source.question) block.source.qNum = globalQNum++;
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++;
});
    }

    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach(t => t.qNum = globalQNum++);
      } else {
          lesson.gcse_task.qNum = globalQNum++;
      }
    }`;

    // Replace with correct chronological order
    const correctLogic = `    // Textbook/Workbook Chronological Order
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
        if (block.source && block.source.question) block.source.qNum = globalQNum++;
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++;
      });
    }

    if (lesson.sources) {
      lesson.sources.forEach(source => {
        if (source.question) source.qNum = globalQNum++;
      });
    }

    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    
    if (lesson.tasks) {
      lesson.tasks.forEach(task => task.qNum = globalQNum++);
    }
    
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    
    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
        lesson.gcse_task.tasks.forEach(t => t.qNum = globalQNum++);
      } else {
        lesson.gcse_task.qNum = globalQNum++;
      }
    }`;

    if (file === 'generate_textbooks.js') {
        content = content.replace(oldTextbookLogic, correctLogic);
    } else {
        content = content.replace(oldPupilLogic, correctLogic);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('Reordered qNum logic in ' + file);
});
