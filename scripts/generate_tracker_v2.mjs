import fs from 'fs';
import path from 'path';

const dbPath = path.join('public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const TRACKER_PATH = 'G:\\\\My Drive\\\\Antigravity Projects\\\\lesson_tracker.md';

// 1. Read existing tracker to preserve user links
let existingLinks = {};
let randomVideosContent = '';
if (fs.existsSync(TRACKER_PATH)) {
    const oldTracker = fs.readFileSync(TRACKER_PATH, 'utf8');
    
    // Extract random videos section
    const randomMatch = oldTracker.match(/## Random Videos([\s\S]*?)(?=## Unit:|$)/);
    if (randomMatch) {
        randomVideosContent = randomMatch[1].trim();
    }

    // Match lesson title and the video link line
    const regex = /### (.+)\n- \[(x| |)\] Video Link:([^\n]*)/g;
    let match;
    while ((match = regex.exec(oldTracker)) !== null) {
        const title = match[1].trim();
        const checkbox = match[2].trim() || ' ';
        const link = match[3].trim();
        existingLinks[title] = { checkbox, link };
    }
}

let md = `# History Hub Video Tracker\n\n`;
md += `Paste the YouTube or ERA links below the corresponding lesson. When you're ready, pass this list back to me!\n\n`;
md += `## Random Videos\n\n${randomVideosContent || "Drop links here if you don't have time to categorize them!"}\n\n`;

async function generate() {
    for (const unitId of Object.keys(db)) {
        const dataJsPath = path.join(process.cwd(), 'units', unitId, 'data.js');
        if (fs.existsSync(dataJsPath)) {
            try {
                // Dynamically import the ES module
                const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
                const module = await import(fileUrl);
                const unitData = module.unitData || module.default;
                
                if (unitData) {
                    md += `## Unit: ${unitData.title || unitId} (${unitId})\n\n`;
                    if (unitData.lessons && Array.isArray(unitData.lessons)) {
                        unitData.lessons.forEach(lesson => {
                            md += `### ${lesson.title}\n`;
                            
                            // Check if we have saved links for this lesson
                            const saved = existingLinks[lesson.title];
                            
                            let currentDbLink = '';
                            if (lesson.video) {
                                if (Array.isArray(lesson.video) && lesson.video.length > 0) {
                                    currentDbLink = lesson.video.map(v => v.url).join(', ');
                                } else if (lesson.video.url) {
                                    currentDbLink = lesson.video.url;
                                }
                            }
                            if (lesson.extra_videos && Array.isArray(lesson.extra_videos)) {
                                let evLinks = lesson.extra_videos.map(v => v.url).join(', ');
                                if (currentDbLink) currentDbLink += ', ' + evLinks;
                                else currentDbLink = evLinks;
                            }

                            let finalLink = (saved && saved.link) ? saved.link : currentDbLink;
                            let checkbox = (finalLink === currentDbLink && currentDbLink !== '') ? 'x' : (saved ? saved.checkbox : ' ');
                            
                            md += `- [${checkbox}] Video Link: ${finalLink}\n\n`;
                        });
                    } else {
                        md += `*(No lessons found in unitData)*\n\n`;
                    }
                }
            } catch (e) {
                console.error(`Error loading ${unitId}:`, e.message);
                md += `## Unit: ${unitId}\n\n*(Error parsing data.js)*\n\n`;
            }
        }
    }
    
    fs.writeFileSync(TRACKER_PATH, md, 'utf8');
    console.log('Generated lesson_tracker.md in Google Drive, preserved any existing links.');
}

generate();
