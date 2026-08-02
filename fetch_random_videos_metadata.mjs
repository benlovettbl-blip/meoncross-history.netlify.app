import fs from 'fs';
import https from 'https';

const trackerPath = "G:\\My Drive\\Antigravity Projects\\lesson_tracker.md";
let content = fs.readFileSync(trackerPath, 'utf8');

const randomVideosSectionMatch = content.match(/## Random Videos\s+([\s\S]*?)(?=## Unit)/);
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
        if (url.includes('youtube.com')) {
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
            // Extract title from URL slug
            const parts = url.split('/');
            let slug = parts[parts.length - 1] || parts[parts.length - 2];
            let title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            resolve({ url, title, duration: "45 mins 0 secs" });
        } else {
            resolve({ url, title: "Unknown Source", duration: "Unknown" });
        }
    });
}

async function main() {
    const results = [];
    for (let url of urls) {
        const metadata = await fetchMetadata(url);
        results.push(metadata);
        console.log(`Fetched metadata for: ${url}`);
    }
    fs.writeFileSync('random_videos_metadata.json', JSON.stringify(results, null, 2));
    console.log("Saved metadata to random_videos_metadata.json");
}

main();
