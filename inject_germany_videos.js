const fs = require('fs');
const path = require('path');

const metadataStr = fs.readFileSync('all_random_videos_metadata.json', 'utf8');
const metadata = JSON.parse(metadataStr);

function categorizeGermanyVideo(title) {
    const t = title.toLowerCase();
    
    // KT4.4: Minorities
    if (t.includes('master race') || t.includes('jewish') || t.includes('kristallnacht') || t.includes('broken glass') || t.includes('treblinka')) return 'lesson_4_4';
    
    // KT4.2: Youth
    if (t.includes('youth')) return 'lesson_4_2';
    
    // KT4.3: Living standards / workers / women (4.1)
    if (t.includes('life in hitlers germany')) return 'lesson_4_3';

    // KT3.4: Opposition
    if (t.includes('opposition to hitler') || t.includes('internal criticism')) return 'lesson_3_4';

    // KT1.1: Origins / Versailles
    if (t.includes('pay') || t.includes('versailles') || t.includes('end of ww1')) return 'lesson_1_1';

    // KT3.2: Police State
    if (t.includes('concentration camps') || t.includes('gestapo') || t.includes('himmler') || t.includes('ss')) return 'lesson_3_2';

    // KT3.3: Propaganda
    if (t.includes('olympic') || t.includes('chaos and consent')) return 'lesson_3_3';

    // KT3.1: Dictatorship (Reichstag Fire, Enabling Act)
    if (t.includes('reichstag') || t.includes('enabling act') || t.includes('dictatorship') || t.includes('1933 36') || t.includes('hitlers leadership') || t.includes('unifying germany')) return 'lesson_3_1';

    // KT2.4: Becoming Chancellor
    if (t.includes('chancellor') || t.includes('papen') || t.includes('schleicher') || t.includes('rise of hitler') || t.includes('rise to power') || t.includes('hitlers rise')) return 'lesson_2_4';

    // KT2.3: Growth of support
    if (t.includes('appeal of the nazis')) return 'lesson_2_3';

    // KT2.2: Munich Putsch / Mein Kampf
    if (t.includes('putsch') || t.includes('mein kampf')) return 'lesson_2_2';

    // KT1.2: Early Challenges (Freikorps)
    if (t.includes('freikorps') || t.includes('opposition to the weimar republic')) return 'lesson_1_2';

    // KT2.1: Early Nazi Party / SA
    if (t.includes('stormtroopers')) return 'lesson_2_1';

    return 'lesson_2_4'; // Fallback
}

// Map the videos
const injections = {};
metadata.forEach(v => {
    const lessonId = categorizeGermanyVideo(v.title);
    if (lessonId) {
        if (!injections[lessonId]) injections[lessonId] = [];
        let niceTitle = v.title;
        niceTitle = niceTitle.replace(/ \(.*?\)$/, ''); 
        injections[lessonId].push({ url: v.url, title: niceTitle });
    }
});

// Now inject into weimar_nazi_germany/data.js
const unitPath = 'weimar_nazi_germany/data.js';
const dataStr = fs.readFileSync(unitPath, 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);

let jsonStr = dataStr.substring(jsonStartIndex);
jsonStr = jsonStr.replace(/;\s*if\s*\(\s*typeof\s+module\s*!==\s*'undefined'\s*\)\s*\{\s*module\.exports\s*=\s*\{\s*unitData\s*\}\s*;\s*\}/g, '');
jsonStr = jsonStr.replace(/;\s*$/, '');
jsonStr = jsonStr.trim();

const data = JSON.parse(jsonStr);
let injectedCount = 0;
const lessonsModified = {};

if (data.lessons) {
    data.lessons.forEach(l => {
        if (injections[l.id]) {
            if (!l.video) l.video = [];
            else if (!Array.isArray(l.video)) l.video = [l.video];
            
            const existingUrls = new Set(l.video.map(vid => vid.url));
            let addedForThisLesson = 0;
            injections[l.id].forEach(newVid => {
                if (!existingUrls.has(newVid.url)) {
                    l.video.push(newVid);
                    injectedCount++;
                    addedForThisLesson++;
                }
            });
            if (addedForThisLesson > 0) {
                lessonsModified[l.id] = addedForThisLesson;
            }
        }
    });
}

const fallbackStr = `\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2) + ';\n' + fallbackStr, 'utf8');
console.log(`Successfully injected ${injectedCount} videos into weimar_nazi_germany.`);
console.log("Lessons modified:", JSON.stringify(lessonsModified));

// Remove Random Videos from the tracker file so it's clean for the user
const trackerPath = 'G:\\\\My Drive\\\\Antigravity Projects\\\\lesson_tracker.md';
let trackerContent = fs.readFileSync(trackerPath, 'utf8');
trackerContent = trackerContent.replace(/## Random Videos[\s\S]*?(?=## Unit:)/, "## Random Videos\n\nDrop links here if you don't have time to categorize them!\n\n");
fs.writeFileSync(trackerPath, trackerContent, 'utf8');
console.log("Cleared Random Videos from the tracker.");
