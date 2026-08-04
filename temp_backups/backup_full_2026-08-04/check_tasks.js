const fs = require('fs');
const data = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');
const jsonStr = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
const db = eval('(' + jsonStr + ')');
db.lessons.forEach((l, i) => {
    let taskCount = 0;
    if (l.tasks && l.tasks.length > 0) taskCount += l.tasks.length;
    if (l.extended && l.extended.question) taskCount++;
    if (l.gcse_task && l.gcse_task.question) taskCount++;
    if (l.sources) {
        l.sources.forEach(s => {
            if (s.tasks && s.tasks.length > 0) taskCount += s.tasks.length;
        });
    }
    console.log(`Lesson ${i+1}: ${taskCount} tasks. ${l.title}`);
});
