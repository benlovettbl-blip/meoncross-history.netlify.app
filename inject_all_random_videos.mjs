import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read metadata
const metadataStr = fs.readFileSync('all_random_videos_metadata.json', 'utf8');
const metadata = JSON.parse(metadataStr);

// 2. Read cme_new data.js
const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// 3. Find existing URLs in dataContent to prevent duplicates
const existingUrls = new Set();
const urlMatches = dataContent.match(/"url":\s*"([^"]+)"/g);
if (urlMatches) {
    urlMatches.forEach(m => {
        const urlMatch = m.match(/"url":\s*"([^"]+)"/);
        if (urlMatch) {
            existingUrls.add(urlMatch[1]);
        }
    });
}

// 4. Categorize missing videos
function categorizeVideo(title) {
    const t = title.toLowerCase();
    if (t.includes('1948') || t.includes('nakba') || t.includes('mandate') || t.includes('partition') || t.includes('resolution 181') || t.includes('exodus') || t.includes('haganah') || t.includes('king david hotel') || t.includes('balfour') || t.includes('ben-gurion')) {
        return "lesson_1";
    }
    if (t.includes('suez') || t.includes('nasser')) {
        return "lesson_3";
    }
    if (t.includes('six-day') || t.includes('six day') || t.includes('1967')) {
        return "lesson_4";
    }
    if (t.includes('yom kippur') || t.includes('1973') || t.includes('valley of tears') || t.includes('golda')) {
        return "lesson_6";
    }
    if (t.includes('resolution 242')) {
        return "lesson_5";
    }
    if (t.includes('munich') || t.includes('black september') || t.includes('september 5') || t.includes('lebanon') || t.includes('intifada') || t.includes('gulf war') || t.includes('plo')) {
        return "lesson_8";
    }
    if (t.includes('camp david') || t.includes('sadat visited') || t.includes('egypt peace') || t.includes('egypt-israel')) {
        return "lesson_7";
    }
    if (t.includes('oslo') || t.includes('hebron')) {
        return "lesson_9";
    }
    
    return "lesson_1"; 
}

const categorized = {};
let newVideosCount = 0;
metadata.forEach(video => {
    // Also remove the backslash from json parsing if any
    let safeUrl = video.url.replace('\\_', '_');
    if (existingUrls.has(safeUrl) || existingUrls.has(video.url)) {
        return; // Skip existing
    }
    
    newVideosCount++;
    const lessonId = categorizeVideo(video.title);
    if (!categorized[lessonId]) categorized[lessonId] = [];
    categorized[lessonId].push({...video, url: safeUrl});
});

console.log(`Found ${newVideosCount} completely new videos to inject.`);

// 5. Inject them
for (const [lessonId, videos] of Object.entries(categorized)) {
    const lessonRegex = new RegExp(`"id":\\s*"${lessonId}"[\\s\\S]*?(?="sources":)`);
    const match = dataContent.match(lessonRegex);
    
    if (match) {
        let lessonContent = match[0];
        
        let videoTasks = [];
        videos.forEach(v => {
            let type = "youtube";
            if (v.url.includes('era.org.uk')) type = "era";
            if (v.url.includes('bbc.co.uk')) type = "audio";
            
            videoTasks.push({
                type: type,
                url: v.url,
                title: v.title || "Historical Video",
                duration: v.duration,
                viewing_task: "Watch the material and note down key points.",
                model_answer: "Answers will vary."
            });
        });

        // check if extra_videos exists
        if (lessonContent.includes('"extra_videos": [')) {
            // we have to inject into existing array
            const arrEnd = lessonContent.lastIndexOf('],');
            if (arrEnd !== -1) {
                // Find where the array closes
                let newStr = `,\n${videoTasks.map(t => `                ${JSON.stringify(t, null, 2).replace(/\n/g, '\n                ')}`).join(',\n')}`;
                
                // insert new elements before the closing bracket of extra_videos
                let extraVidsRegex = /("extra_videos":\s*\[)([\s\S]*?)(\],)/;
                let evMatch = lessonContent.match(extraVidsRegex);
                if (evMatch) {
                    let insideArray = evMatch[2].trimEnd();
                    let insertion = insideArray.length > 0 ? newStr : newStr.substring(1); // remove leading comma if empty
                    lessonContent = lessonContent.replace(extraVidsRegex, `$1${insideArray}${insertion}\n            $3`);
                }
            }
        } else {
            // create new extra_videos property
            let videoObjStr = `\n            "extra_videos": [\n${videoTasks.map(t => `                ${JSON.stringify(t, null, 2).replace(/\n/g, '\n                ')}`).join(',\n')}\n            ],\n            `;
            lessonContent = lessonContent + videoObjStr;
        }
        
        dataContent = dataContent.replace(match[0], lessonContent);
    }
}

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Successfully injected new videos into cme_new data.js');

// 6. Update the tracker to clear Random Videos completely
const trackerPath = "G:\\My Drive\\Antigravity Projects\\lesson_tracker.md";
let trackerContent = fs.readFileSync(trackerPath, 'utf8');

trackerContent = trackerContent.replace(/## Random Videos[\s\S]*?(?=## Unit:)/, '## Random Videos\n\nDrop links here if you don\'t have time to categorize them!\n\n');

fs.writeFileSync(trackerPath, trackerContent, 'utf8');
console.log('Cleared Random Videos in tracker.');

