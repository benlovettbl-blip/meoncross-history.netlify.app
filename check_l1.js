const fs = require('fs');

function check() {
    let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');
    c = c.replace('export default great_war;', '');
    let great_war;
    eval(c + '\ngreat_war = great_war;');
    
    let lesson = great_war.periodLessons[0];
    let unitId = 'great_war';
    let globalQNum = 1;
    
    let log = [];
    if (lesson.primary_source && lesson.primary_source.question) {
        lesson.primary_source.qNum = globalQNum++;
        log.push('Q' + lesson.primary_source.qNum + ' (primary_source): ' + lesson.primary_source.question);
    }
    if (lesson.sources) lesson.sources.forEach(source => { 
        if (source.question) {
            source.qNum = globalQNum++; 
            log.push('Q' + source.qNum + ' (source): ' + source.question);
        }
    });
    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { 
        if (block.tasks) block.tasks.forEach(task => { 
            if (typeof unitId !== 'undefined' && (unitId === 'great_war' || unitId === 'great_war_part2')) { 
                if (typeof task.text === 'string') task.text = task.text.replace(/^Task\s*\d*:\s*/i, ''); 
                if (typeof task.question === 'string') task.question = task.question.replace(/^Task\s*\d*:\s*/i, ''); 
            } 
            if (task.type !== 'vocab_match') {
                task.qNum = globalQNum++; 
                log.push('Q' + task.qNum + ' (' + task.type + '): ' + (task.text || task.question));
            }
        }); 
        if (block.hinge_question) {
            block.hinge_question.qNum = globalQNum++; 
            log.push('Q' + block.hinge_question.qNum + ' (hinge_question): ' + block.hinge_question);
        }
    });
    if (lesson.pair_share) {
        lesson.pair_share.qNum = globalQNum++;
        log.push('Q' + lesson.pair_share.qNum + ' (pair_share): ' + lesson.pair_share.prompt);
    }
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) {
        lesson.historians_corner.qNum = globalQNum++;
        log.push('Q' + lesson.historians_corner.qNum + ' (historians_corner): ' + lesson.historians_corner.stretch_question);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => {
        task.qNum = globalQNum++;
        log.push('Q' + task.qNum + ' (tasks): ' + (task.text || task.question));
    });
    if (lesson.extended && lesson.extended.question) {
        lesson.extended.qNum = globalQNum++;
        log.push('Q' + lesson.extended.qNum + ' (extended): ' + lesson.extended.question);
    }
    if (lesson.gcse_task) {
        lesson.gcse_task.qNum = globalQNum++;
        log.push('Q' + lesson.gcse_task.qNum + ' (gcse_task): ' + (lesson.gcse_task.question || lesson.gcse_task.topic));
    }
    
    console.log(log.join('\n'));
}

check();
