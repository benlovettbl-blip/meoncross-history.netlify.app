const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesToFetch = [
    { name: 'locations/berlin_reichstag.jpg', query: 'Reichstag building' },
    { name: 'locations/munich_odeonsplatz.jpg', query: 'Feldherrnhalle' },
    { name: 'locations/nuremberg_rally.jpg', query: 'Nuremberg rallies' },
    { name: 'locations/weimar_city.jpg', query: 'Weimar' },
    { name: 'locations/ruhr_valley.jpg', query: 'Ruhr' }
];

async function fetchImage(img) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(img.query)}&prop=pageimages&format=json&pithumbsize=500`;
    
    return new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const pages = parsed.query.pages;
                    const pageId = Object.keys(pages)[0];
                    const page = pages[pageId];
                    if (page.thumbnail && page.thumbnail.source) {
                        downloadFile(page.thumbnail.source, img.name).then(resolve).catch(reject);
                    } else {
                        console.log(`No thumbnail found for ${img.query}`);
                        resolve();
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function downloadFile(url, filename) {
    const dest = path.join(__dirname, 'public', 'images', filename);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded ${filename}`);
                    resolve();
                });
            } else if (response.statusCode === 403) {
                 console.log(`Forbidden (403) for ${url}. Fetching via curl...`);
                 file.close();
                 const { exec } = require('child_process');
                 exec(`curl -H "User-Agent: Mozilla/5.0" -o "${dest}" "${url}"`, (error, stdout, stderr) => {
                     if (error) {
                         reject(error);
                     } else {
                         console.log(`Downloaded ${filename} via curl`);
                         resolve();
                     }
                 });
            } else {
                reject(new Error(`Failed to download, status: ${response.statusCode}`));
            }
        }).on('error', err => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    for (const img of imagesToFetch) {
        await fetchImage(img);
    }
}

run();
