import fs from 'fs';
import https from 'https';

const trackerPath = "G:\\My Drive\\Antigravity Projects\\lesson_tracker.md";
let content = fs.readFileSync(trackerPath, 'utf8');

const randomVideosSectionMatch = content.match(/## Random Videos([\s\S]*?)(?=## Unit)/);
if (!randomVideosSectionMatch) {
    console.log("No random videos section found.");
    process.exit(0);
}

const randomVideosText = randomVideosSectionMatch[1];
const urlRegex = /(https?:\/\/[^\s]+)/g;
const urls = [];
let match;
while ((match = urlRegex.exec(randomVideosText)) !== null) {
    urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in Random Videos section.`);

function fetchMetadata(url) {
    return new Promise((resolve) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const req = https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    let title = "Unknown Title";
                    const titleMatch = data.match(/<title>(.*?)<\/title>/);
                    if (titleMatch) {
                        title = titleMatch[1].replace(' - YouTube', '').trim();
                    }
                    
                    let duration = "Duration not found";
                    const durationMatch = data.match(/"lengthSeconds":"(\d+)"/);
                    if (durationMatch) {
                        const totalSeconds = parseInt(durationMatch[1]);
                        const mins = Math.floor(totalSeconds / 60);
                        const secs = totalSeconds % 60;
                        duration = `${mins} mins ${secs} secs`;
                    }
                    resolve({ url, title, duration });
                });
            });
            req.on('error', () => resolve({ url, title: "Error fetching", duration: "Error" }));
        } else if (url.includes('era.org.uk')) {
            const parts = url.split('/');
            let slug = parts[parts.length - 1] || parts[parts.length - 2];
            let title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            resolve({ url, title, duration: "45 mins 0 secs" });
        } else if (url.includes('bbc.co.uk')) {
            const req = https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    let title = "BBC Programme";
                    const titleMatch = data.match(/<title>(.*?)<\/title>/);
                    if (titleMatch) {
                        title = titleMatch[1].replace(' - BBC', '').trim();
                    }
                    resolve({ url, title, duration: "BBC audio/video" });
                });
            });
            req.on('error', () => resolve({ url, title: "BBC Programme", duration: "Unknown" }));
        } else {
            resolve({ url, title: "Unknown Source", duration: "Unknown" });
        }
    });
}

async function main() {
    const results = [];
    // Only process a few at a time to avoid overwhelming the network
    for (let i = 0; i < urls.length; i += 5) {
        const batch = urls.slice(i, i + 5);
        const batchResults = await Promise.all(batch.map(url => fetchMetadata(url)));
        results.push(...batchResults);
        console.log(`Fetched ${i + batchResults.length} of ${urls.length}...`);
    }
    fs.writeFileSync('all_random_videos_metadata.json', JSON.stringify(results, null, 2));
    console.log("Saved metadata to all_random_videos_metadata.json");
}

main();
