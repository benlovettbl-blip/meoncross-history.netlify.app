const fs = require('fs');
const dirs = ['water_and_sanitation', 'great_war', 'cme_new'];
dirs.forEach(dir => {
  ['generate_worksheets.js', 'generate_answer_key.js'].forEach(file => {
    const p = dir + '/' + file;
    if (!fs.existsSync(p)) return;
    let code = fs.readFileSync(p, 'utf8');

    // Move let globalQNum = 1; inside the lessons loop
    code = code.replace(/let globalQNum = 1;\nunitData\.lessons\.forEach\(lesson => \{/, 'unitData.lessons.forEach(lesson => {\n  let globalQNum = 1;');
    
    // For the chunked loops
    code = code.replace(/let globalQNum = 1;\nlet html = `/g, 'let html = `');
    code = code.replace(/\.forEach\(\(lesson, lessonIndex\) => \{\n      if \(lesson\.primary_source/, '.forEach((lesson, lessonIndex) => {\n      let globalQNum = 1;\n      if (lesson.primary_source');

    fs.writeFileSync(p, code);
  });
});
console.log('Fixed qNum scoping!');
