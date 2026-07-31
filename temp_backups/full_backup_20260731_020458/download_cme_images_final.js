const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let dataCode = fs.readFileSync(dataPath, 'utf8');

let unitData;
try {
    const jsonStr = dataCode.replace('export const unitData = ', '').replace(/;\s*$/, '');
    unitData = JSON.parse(jsonStr);
} catch (e) {
    console.error("Failed to parse data.js", e);
    process.exit(1);
}

const assetsDir = path.join(__dirname, 'public', 'units', 'cme_new', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'AntigravityAgent/1.0' } }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                console.error("Failed to download", url, "Status:", response.statusCode);
                resolve(false);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(true));
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            resolve(false);
        });
    });
}

async function fetchWikiThumbnail(title, filename) {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    return new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'AntigravityAgent/1.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', async () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const page = Object.values(pages)[0];
                    if (page && page.thumbnail && page.thumbnail.source) {
                        const url = page.thumbnail.source;
                        const dest = path.join(assetsDir, filename);
                        const success = await downloadImage(url, dest);
                        resolve(success ? `/units/cme_new/assets/${filename}` : null);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    let modifications = 0;
    for (let l of unitData.lessons) {
        if (l.sources) {
            for (let s of l.sources) {
                if (s.src && s.src.startsWith('http')) {
                    const parts = s.src.split('/');
                    // Extract original Wikipedia filename (e.g. "Egyptian_forces_crossing_the_Suez_Canal.jpg")
                    const wikiFilename = decodeURIComponent(parts[parts.length - 2]);
                    const title = `File:${wikiFilename}`;
                    // The filename we want to save it as locally
                    const localFilename = `cme_${wikiFilename.toLowerCase().replace(/[^a-z0-9_.]/g, '_')}`;
                    
                    console.log(`Resolving ${title}...`);
                    await delay(1000); // 1 second delay to avoid rate limiting on API
                    
                    const localSrc = await fetchWikiThumbnail(title, localFilename);
                    if (localSrc) {
                        console.log(`Success -> ${localSrc}`);
                        s.src = localSrc;
                        modifications++;
                    } else {
                        console.log(`Failed to resolve/download ${title}`);
                    }
                }
            }
        }
    }
    
    if (modifications > 0) {
        const newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
        fs.writeFileSync(dataPath, newCode);
        console.log(`Successfully updated ${modifications} sources in data.js!`);
    } else {
        console.log("No sources needed updating or all failed.");
    }
}

run();
