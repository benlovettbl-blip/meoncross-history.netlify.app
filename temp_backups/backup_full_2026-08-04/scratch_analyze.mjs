import fs from 'fs';
import path from 'path';

const dataFile = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';

async function run() {
    const { unitData } = await import('file://' + dataFile + '?t=' + Date.now());
    const lesson1 = unitData.lessons.find(l => l.id === 'lesson_1');
    if (lesson1 && lesson1.extra_videos) {
        lesson1.extra_videos.forEach((video, index) => {
            console.log(`[${index}] ${video.title}`);
            console.log(`    Duration: ${video.duration}`);
            console.log(`    URL: ${video.url}`);
        });
    }
}
run();
