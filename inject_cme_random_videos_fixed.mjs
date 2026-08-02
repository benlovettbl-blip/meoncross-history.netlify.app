import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read metadata
const metadataStr = fs.readFileSync('random_videos_metadata.json', 'utf8');
const metadata = JSON.parse(metadataStr);

// 2. Define categories based on keywords for CME lessons
function categorizeVideo(title) {
    const t = title.toLowerCase();
    if (t.includes('1948') || t.includes('nakba') || t.includes('mandate') || t.includes('partition') || t.includes('resolution 181') || t.includes('exodus') || t.includes('haganah') || t.includes('king david hotel') || t.includes('balfour') || t.includes('ben-gurion')) {
        return "lesson_1"; // KT1.1
    }
    if (t.includes('suez') || t.includes('nasser')) {
        return "lesson_3"; // KT1.3
    }
    if (t.includes('six-day') || t.includes('six day') || t.includes('1967')) {
        return "lesson_4"; // KT2.1
    }
    if (t.includes('yom kippur') || t.includes('1973') || t.includes('valley of tears') || t.includes('golda')) {
        return "lesson_6"; // KT2.3
    }
    if (t.includes('resolution 242')) {
        return "lesson_5"; // KT2.2
    }
    if (t.includes('munich') || t.includes('black september') || t.includes('september 5')) {
        return "lesson_8"; // KT3.2
    }
    // Fallback to KT1.1 if we can't figure it out, just to get them out of random
    return "lesson_1"; 
}

const categorized = {};
metadata.forEach(video => {
    const lessonId = categorizeVideo(video.title);
    if (!categorized[lessonId]) categorized[lessonId] = [];
    categorized[lessonId].push(video);
});

// 3. Inject into cme_new/data.js
const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, videos] of Object.entries(categorized)) {
    // Find the lesson block. We match from "id": "lesson_X" up to "sources": [
    const regex = new RegExp(`"id":\\s*"${lessonId}"[\\s\\S]*?(?="sources":)`);
    const match = dataContent.match(regex);
    
    if (match) {
        let videoTasks = [];
        videos.forEach(v => {
            let task = {
                type: "youtube",
                url: v.url.replace('\\_', '_'), // Fix backslashes in URL
                title: v.title || "Historical Video",
                duration: v.duration,
                viewing_task: "Watch the video and note down 3 key points.",
                model_answer: "Answers will vary."
            };
            if (v.url.includes('era.org.uk')) {
                task.type = 'era';
            }
            videoTasks.push(task);
        });
        
        let videoObjStr = `\n            "extra_videos": [\n${videoTasks.map(t => `                ${JSON.stringify(t, null, 2).replace(/\n/g, '\n                ')}`).join(',\n')}\n            ],\n            `;
        
        dataContent = dataContent.replace(match[0], match[0] + videoObjStr);
    } else {
        console.log(`Could not match lesson ${lessonId}`);
    }
}

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Injected extra_videos into cme_new data.js');

// 4. Update the tracker to remove the URLs from "Random Videos"
// Since the URLs have backslashes in metadata but not in the real file (or vice versa), let's just clear the section
const trackerPath = "G:\\My Drive\\Antigravity Projects\\lesson_tracker.md";
let trackerContent = fs.readFileSync(trackerPath, 'utf8');

trackerContent = trackerContent.replace(/## Random Videos[\s\S]*?(?=## Unit:)/, '## Random Videos\n\nDrop links here if you don\'t have time to categorize them!\n\n');

fs.writeFileSync(trackerPath, trackerContent, 'utf8');
console.log('Cleared Random Videos in tracker.');

