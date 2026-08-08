const fs = require('fs');
const path = require('path');

const trackerPath = 'G:\\My Drive\\Antigravity Projects\\lesson_tracker.md';
const trackerContent = fs.readFileSync(trackerPath, 'utf8');

const units = {};

let currentUnitId = null;
let currentLessonTitle = null;

const lines = trackerContent.split('\n');
for (const line of lines) {
    // Check for Unit
    const unitMatch = line.match(/^## Unit: .* \(([^)]+)\)$/);
    if (unitMatch) {
        currentUnitId = unitMatch[1].trim();
        units[currentUnitId] = {};
        continue;
    }
    
    // Check for Lesson
    const lessonMatch = line.match(/^### (.+)$/);
    if (lessonMatch && currentUnitId) {
        currentLessonTitle = lessonMatch[1].trim();
        continue;
    }
    
    // Check for Video Links
    const videoMatch = line.match(/^\* \[[ x]\] Video Link:\s*(.*)$/);
    if (videoMatch && currentUnitId && currentLessonTitle) {
        const linksStr = videoMatch[1].trim();
        if (linksStr) {
            const links = linksStr.split(',').map(l => l.trim()).filter(l => l !== '');
            if (links.length > 0) {
                units[currentUnitId][currentLessonTitle] = links;
            }
        }
    }
}

// Now update the data.js files
for (const unitId of Object.keys(units)) {
    const dataJsPath = path.join(process.cwd(), 'public', 'units', unitId, 'data.js');
    if (fs.existsSync(dataJsPath)) {
        let raw = fs.readFileSync(dataJsPath, 'utf8');
        const match = raw.match(/export const unitData = ([\s\S]+);/);
        if (match) {
            let data = eval('(' + match[1] + ')');
            let updated = false;
            
            data.lessons.forEach(lesson => {
                const links = units[unitId][lesson.title];
                if (links && links.length > 0) {
                    // Convert links to video objects
                    const newVideos = links.map(url => {
                        return { url: url, title: 'Video' };
                    });
                    
                    // Only update if different
                    const currentVideos = lesson.video ? lesson.video.map(v => v.url).join(',') : '';
                    const newVideosStr = newVideos.map(v => v.url).join(',');
                    if (currentVideos !== newVideosStr) {
                        // Preserve titles if URLs match
                        newVideos.forEach(nv => {
                            if (lesson.video) {
                                const existing = lesson.video.find(v => v.url === nv.url);
                                if (existing && existing.title) {
                                    nv.title = existing.title;
                                }
                            }
                        });
                        lesson.video = newVideos;
                        updated = true;
                    }
                }
            });
            
            if (updated) {
                const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
                fs.writeFileSync(dataJsPath, newDataStr, 'utf8');
                fs.writeFileSync(path.join(process.cwd(), unitId, 'data.js'), newDataStr, 'utf8'); // update source
                console.log(`Updated videos for unit: ${unitId}`);
            }
        }
    }
}
console.log('Done syncing videos from tracker to data.js');
