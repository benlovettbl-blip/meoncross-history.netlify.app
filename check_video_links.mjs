import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'public', 'database.json');

async function checkVideoLinks() {
    if (!fs.existsSync(dbPath)) {
        console.error('Database not found. Please run build_database.cjs first.');
        return;
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const database = JSON.parse(rawData);

    let linksToCheck = [];

    // Extract all video links from the database
    for (const [unitId, unitData] of Object.entries(database)) {
        if (!unitData.lessons) continue;

        for (const lesson of unitData.lessons) {
            if (lesson.video) {
                if (Array.isArray(lesson.video)) {
                    for (const v of lesson.video) {
                        if (v.url) {
                            linksToCheck.push({ unitId, lessonId: lesson.id, lessonTitle: lesson.title, url: v.url, videoTitle: v.title });
                        }
                    }
                } else if (lesson.video.url) {
                    linksToCheck.push({ unitId, lessonId: lesson.id, lessonTitle: lesson.title, url: lesson.video.url, videoTitle: lesson.video.title });
                }
            }
        }
    }

    console.log(`Found ${linksToCheck.length} video links to check...`);
    let brokenLinks = [];

    // Check each link
    for (let i = 0; i < linksToCheck.length; i++) {
        const item = linksToCheck[i];
        console.log(`[${i + 1}/${linksToCheck.length}] Checking: ${item.url}`);
        
        try {
            // Using a simple GET request with a user-agent to avoid basic blocks
            const response = await fetch(item.url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!response.ok) {
                console.warn(`⚠️ Broken Link Detected (${response.status}): ${item.url}`);
                brokenLinks.push({ ...item, status: response.status });
            }
        } catch (error) {
            console.error(`❌ Error fetching link: ${item.url}`, error.message);
            brokenLinks.push({ ...item, status: 'Error', error: error.message });
        }
        
        // Small delay to avoid rate-limiting
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n=======================================');
    console.log('LINK ROT CHECK COMPLETE');
    console.log('=======================================');
    if (brokenLinks.length === 0) {
        console.log('✅ All video links are working perfectly!');
    } else {
        console.log(`⚠️ Found ${brokenLinks.length} broken links:`);
        brokenLinks.forEach(b => {
            console.log(`\n- Unit: ${b.unitId}`);
            console.log(`- Lesson: ${b.lessonTitle}`);
            console.log(`- Video: ${b.videoTitle}`);
            console.log(`- URL: ${b.url}`);
            console.log(`- Status: ${b.status} ${b.error ? `(${b.error})` : ''}`);
        });
    }
}

checkVideoLinks();
