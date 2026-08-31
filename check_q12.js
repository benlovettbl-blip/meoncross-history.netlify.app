const fs = require('fs');
let data = fs.readFileSync('public/units/cme_new/data.js', 'utf8');
data = data.replace('export const unitData = ', '');
let unitData;
try {
    unitData = eval('(' + data + ')');
    unitData.lessons.forEach((l, lIndex) => {
        if(l.historians_corner && l.historians_corner.title.includes('Plan Dalet')) {
            console.log(`Found in Lesson ${lIndex + 1}`);
            let taskCount = 0;
            l.narrative_blocks.forEach((nb, nbIndex) => {
                if(nb.tasks) {
                    nb.tasks.forEach((t, tIndex) => {
                        taskCount++;
                        console.log(`Task ${taskCount}: ${t.text}`);
                    });
                }
            });
            console.log(`Total tasks: ${taskCount}`);
        }
    });
} catch(e) {
    console.error(e);
}
