import fs from 'fs';
import path from 'path';

// 1. Read metadata
const metadataStr = fs.readFileSync('random_videos_metadata.json', 'utf8');
const metadata = JSON.parse(metadataStr);

// 2. Define categories based on keywords for CME lessons
// From tracker:
// KT1.1: British Mandate, Creation of Israel, 1945-1949
// KT1.2: Aftermath of 1948-49 War
// KT1.3: Increased Tension, 1955-1963
// KT2.1: Six Day War, 1967
// KT2.2: Aftermath of 1967 War
// KT2.3: Israel and Egypt 1967-1973 (Yom Kippur)
// KT3.1: Diplomatic negotiations 1974-1979
// KT3.2: Palestinian Issue 1974-1993 (PLO, Munich, Lebanon, Intifada)
// KT3.3: Attempts at a solution 1988-1995 (Oslo)

function categorizeVideo(title) {
    const t = title.toLowerCase();
    if (t.includes('1948') || t.includes('nakba') || t.includes('mandate') || t.includes('partition') || t.includes('resolution 181') || t.includes('exodus') || t.includes('haganah') || t.includes('king david hotel') || t.includes('balfour') || t.includes('ben-gurion')) {
        return "lesson_1_1";
    }
    if (t.includes('suez') || t.includes('nasser')) {
        return "lesson_1_3";
    }
    if (t.includes('six-day') || t.includes('six day') || t.includes('1967')) {
        return "lesson_2_1";
    }
    if (t.includes('yom kippur') || t.includes('1973') || t.includes('valley of tears') || t.includes('golda')) {
        return "lesson_2_3";
    }
    if (t.includes('resolution 242')) {
        return "lesson_2_2";
    }
    if (t.includes('munich') || t.includes('black september') || t.includes('september 5')) {
        return "lesson_3_2";
    }
    // Fallback to lesson_1_1 if we can't figure it out, just to get them out of random
    return "lesson_1_1"; 
}

const categorized = {};
metadata.forEach(video => {
    const lessonId = categorizeVideo(video.title);
    if (!categorized[lessonId]) categorized[lessonId] = [];
    categorized[lessonId].push(video);
});

// 3. Inject into cme_new/data.js (or public/units/cme_new/data.js)
const dataPath = path.join('public', 'units', 'cme_new', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, videos] of Object.entries(categorized)) {
    const regex = new RegExp(`"id":\\s*"${lessonId}"[\\s\\S]*?(?="enquiry":|"do_now":|teacher_notes|fun_facts)`);
    const match = dataContent.match(regex);
    
    if (match) {
        let videoTasks = [];
        videos.forEach(v => {
            let task = {
                question: `Watch the video: ${v.title || "Historical Video"}`,
                url: v.url,
                duration: v.duration
            };
            videoTasks.push(task);
        });
        
        let videoObjStr = `\n            "video": [\n${videoTasks.map(t => `                ${JSON.stringify(t)}`).join(',\n')}\n            ],`;
        dataContent = dataContent.replace(match[0], match[0] + videoObjStr);
    }
}

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Injected videos into cme_new data.js');

// 4. Update the tracker to remove the URLs from "Random Videos"
const trackerPath = "G:\\My Drive\\Antigravity Projects\\lesson_tracker.md";
let trackerContent = fs.readFileSync(trackerPath, 'utf8');

metadata.forEach(v => {
    // Escape regex characters from the URL
    const safeUrl = v.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const urlRegex = new RegExp(`^${safeUrl}\\s*\\n*`, 'gm');
    trackerContent = trackerContent.replace(urlRegex, '');
});

fs.writeFileSync(trackerPath, trackerContent, 'utf8');
console.log('Removed injected URLs from Random Videos in tracker.');

