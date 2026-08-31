import { unitData } from './public/units/cme_new/data.js';

unitData.lessons.forEach((l, lIndex) => {
    if(l.historians_corner && l.historians_corner.title.includes('Plan Dalet')) {
        console.log(`Found Historian's Corner in Lesson ${lIndex + 1}`);
        let taskCount = 0;
        l.narrative_blocks.forEach((nb, nbIndex) => {
            if(nb.tasks) {
                nb.tasks.forEach((t, tIndex) => {
                    taskCount++;
                    console.log(`Task ${taskCount}: "${t.text}" (Type: ${t.type})`);
                });
            }
        });
        console.log(`Total tasks: ${taskCount}`);
    }
});
