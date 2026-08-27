const fs = require('fs');
let c = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
c = c.replace(/if \(lesson\.primary_source\.question\)/g, 'if (lesson.primary_source && typeof lesson.primary_source === "object" && lesson.primary_source.question)');
fs.writeFileSync('generate_pupil_workbooks.js', c);
console.log('Fixed primary source question check');
