const fs = require('fs');

let content = fs.readFileSync('src/core_app.js', 'utf8');

// Update assignQuestionNumbers to include lesson.sources
content = content.replace(
  /if \(lesson\.tasks\) lesson\.tasks\.forEach\(task => task\.qNum = q\+\+\);/,
  `if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = q++; });
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);`
);

fs.writeFileSync('src/core_app.js', content);
console.log('Fixed assignQuestionNumbers for sources.');
