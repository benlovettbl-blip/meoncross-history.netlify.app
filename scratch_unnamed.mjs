import fs from 'fs';

const dataFile = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';

async function run() {
    const { unitData } = await import('file://' + dataFile + '?t=' + Date.now());
    const lesson1 = unitData.lessons.find(l => l.id === 'lesson_1');
    if (lesson1 && lesson1.extra_videos) {
        lesson1.extra_videos.forEach((video, index) => {
            if (video.title === 'Historical Video' || index >= 18) {
                console.log(`[${index}] ${video.title}`);
                console.log(`    URL: ${video.url}`);
                if (video.viewing_task) {
                    console.log(`    Task snippet: ${video.viewing_task.substring(0, 250)}...`);
                }
            }
        });
    }
}
run();
