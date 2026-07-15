const fs = require('fs');

const dirs = ['water_and_sanitation', 'great_war', 'cme_new'];

dirs.forEach(dir => {
  ['generate_worksheets.js', 'generate_answer_key.js'].forEach(file => {
    const p = dir + '/' + file;
    if (!fs.existsSync(p)) return;
    let code = fs.readFileSync(p, 'utf8');

    // Remove old assignQuestionNumbers logic
    code = code.replace(/function assignQuestionNumbers\(lesson\) \{[\s\S]*?\n  \}/, '');
    code = code.replace(/assignQuestionNumbers\(lesson\);/g, '');

    // Replace the regex replacement for Q prefixes
    code = code.replace(/Q\\\\d\+/g, 'Q\\d+');
    code = code.replace(/Task \\\\d\+/g, 'Task \\d+');
    code = code.replace(/Question \\\\d\+/g, 'Question \\d+');

    // Fix Quiz Pack CSS Grid
    code = code.replace(/column-count: 2; column-gap: 40px;/g, 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;');

    // Insert global numbering logic before the lesson iteration
    if (code.includes('unitData.lessons.forEach(lesson => {')) {
        code = code.replace('unitData.lessons.forEach(lesson => {', 
            'let globalQNum = 1;\nunitData.lessons.forEach(lesson => {\n  if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;\n  if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);\n  if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); });\n  if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;\n  if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;\n  if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;');
    } else if (code.includes('unitData.lessons.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE).forEach((lesson, lessonIndex) => {')) {
        if (!code.includes('let globalQNum = 1;')) {
            code = code.replace('let html = `', 'let globalQNum = 1;\nlet html = `');
            code = code.replace('unitData.lessons.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE).forEach((lesson, lessonIndex) => {',
                'unitData.lessons.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE).forEach((lesson, lessonIndex) => {\n      if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;\n      if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);\n      if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); });\n      if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;\n      if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;\n      if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;');
        }
    }

    fs.writeFileSync(p, code);
    console.log('Fixed', p);
  });
});
