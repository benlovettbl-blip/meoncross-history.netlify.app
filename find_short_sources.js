const fs = require('fs');
let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');
c = c.replace('export default great_war;', '');
c = c.replace('const great_war', 'var great_war');
eval(c);

great_war.periodLessons.forEach((l, idx) => {
    if (l.gcse_task && l.gcse_task.sources) {
        l.gcse_task.sources.forEach(s => {
            if (s.type === 'written') {
                console.log('L' + idx + ' text length:', s.text.split(' ').length);
                if (s.text.split(' ').length < 30) {
                    console.log('SHORT SOURCE TEXT:', s.text);
                }
            }
        });
    }
});
