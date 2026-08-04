import fs from 'fs';

const dataFile = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';

async function run() {
    const { unitData } = await import('file://' + dataFile + '?t=' + Date.now());
    
    const lesson1 = unitData.lessons.find(l => l.id === 'lesson_1');
    const extraVideos = lesson1.extra_videos;
    
    // Create new arrays for each lesson
    const lessonMapping = {
        'lesson_1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 23, 31],
        'lesson_2': [11, 12, 13, 14],
        'lesson_3': [16, 17],
        'lesson_4': [18, 19, 21],
        'lesson_5': [20],
        'lesson_6': [],
        'lesson_7': [24],
        'lesson_8': [25, 26, 27, 28, 29],
        'lesson_9': [30, 32]
    };
    
    // Assign videos to the appropriate lesson based on the mapping
    // Note: If a lesson already has extra_videos, we'll append to them.
    // Wait, the extraVideos are currently all in lesson_1! 
    // We should first clear lesson_1's extra videos and then populate.
    
    lesson1.extra_videos = [];
    
    for (const [lessonId, indices] of Object.entries(lessonMapping)) {
        const lesson = unitData.lessons.find(l => l.id === lessonId);
        if (!lesson) continue;
        
        if (!lesson.extra_videos) {
            lesson.extra_videos = [];
        }
        
        indices.forEach(idx => {
            if (extraVideos[idx]) {
                lesson.extra_videos.push(extraVideos[idx]);
            }
        });
    }
    
    // Write back to file
    const newContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
    fs.writeFileSync(dataFile, newContent, 'utf8');
    console.log("Successfully redistributed extra_videos across lessons and saved data.js.");
}
run();
