const fs = require('fs');
const path = require('path');

const metadataStr = fs.readFileSync('all_random_videos_metadata.json', 'utf8');
const metadata = JSON.parse(metadataStr);

function categorizeMedVideo(title) {
    const t = title.toLowerCase();
    
    // Specifically mapped ones
    if (t.includes('black death')) return 'lesson_1_3';
    if (t.includes('jenner')) return 'lesson_3_3';
    if (t.includes('nightingale')) return 'lesson_3_2';
    if (t.includes('penicillin')) return 'lesson_4_3';
    if (t.includes('koch')) return 'lesson_3_1';
    if (t.includes('snow') || (t.includes('cholera') && t.includes('witness history'))) return 'lesson_3_3';
    if (t.includes('cholera')) return 'lesson_3_3'; // all cholera to 3.3 for Snow/Public Health
    if (t.includes('viruses and vaccines')) return 'lesson_4_2';
    if (t.includes('galen and leonardo') || t.includes('vesalius') || t.includes('muscle men')) return 'lesson_2_1';
    if (t.includes('nhs') || t.includes('national health service')) return 'lesson_4_2';
    if (t.includes('carrel dakin') || t.includes('blood and guts a history of surgery fixing faces') || t.includes('fixing faces')) return 'lesson_5_5'; // WW1 plastic surgery/methods
    
    // History File General Overviews
    if (t.includes('medicine and long term change')) return null; // already did this one manually
    if (t.includes('medicine and war')) return 'lesson_5_1';
    if (t.includes('medicine and surgery')) return 'lesson_4_2';
    if (t.includes('medicine technology')) return 'lesson_4_1';
    if (t.includes('medicine and government')) return 'lesson_4_2';
    if (t.includes('medicine religion') || t.includes('medicine and religion')) return 'lesson_1_1';
    if (t.includes('medicine women')) return 'lesson_1_2';
    if (t.includes('medicine and science')) return 'lesson_3_1';
    if (t.includes('medicine public health')) return 'lesson_3_2';

    // Others
    if (t.includes('grays anatomy') || t.includes('into the brain blood and guts a history of surgery')) return 'lesson_4_2';
    if (t.includes('operation ouch')) return 'lesson_4_1';
    if (t.includes('health before the nhs')) return 'lesson_4_2';
    
    return 'lesson_1_1'; // fallback
}

// Map the videos
const injections = {};
metadata.forEach(v => {
    const lessonId = categorizeMedVideo(v.title);
    if (lessonId) {
        if (!injections[lessonId]) injections[lessonId] = [];
        // format title nicely
        let niceTitle = v.title;
        // remove weird trailing things
        niceTitle = niceTitle.replace(/ \(.*?\)$/, ''); // remove duration if it's there
        injections[lessonId].push({ url: v.url, title: niceTitle });
    }
});

// Now inject into edexcel_medicine/data.js
const unitPath = 'edexcel_medicine/data.js';
const dataStr = fs.readFileSync(unitPath, 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);

let jsonStr = dataStr.substring(jsonStartIndex);
let suffix = '';
if (jsonStr.endsWith(';\n')) {
    jsonStr = jsonStr.slice(0, -2);
    suffix = ';\n';
} else if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
    suffix = ';';
}

const data = JSON.parse(jsonStr);
let injectedCount = 0;

if (data.lessons) {
    data.lessons.forEach(l => {
        if (injections[l.id]) {
            if (!l.video) l.video = [];
            else if (!Array.isArray(l.video)) l.video = [l.video];
            
            // avoid duplicates
            const existingUrls = new Set(l.video.map(vid => vid.url));
            injections[l.id].forEach(newVid => {
                if (!existingUrls.has(newVid.url)) {
                    l.video.push(newVid);
                    injectedCount++;
                }
            });
        }
    });
}

fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2) + suffix, 'utf8');
console.log(`Successfully injected ${injectedCount} videos into edexcel_medicine.`);

// Now remove Random Videos from the tracker file so it's clean for the user
const trackerPath = 'G:\\\\My Drive\\\\Antigravity Projects\\\\lesson_tracker.md';
let trackerContent = fs.readFileSync(trackerPath, 'utf8');

// The random videos section is from "## Random Videos" up to "## Unit:"
trackerContent = trackerContent.replace(/## Random Videos[\s\S]*?(?=## Unit:)/, "## Random Videos\n\nDrop links here if you don't have time to categorize them!\n\n");
fs.writeFileSync(trackerPath, trackerContent, 'utf8');
console.log("Cleared Random Videos from the tracker.");
