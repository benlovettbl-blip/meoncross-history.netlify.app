const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'public', 'units', 'cme_new', 'assets');

const sources = [
    {
        lessonIdx: 6,
        wikiTitle: "File:Camp_David_Accords.jpg",
        filename: "camp_david_1978.jpg",
    },
    {
        lessonIdx: 7,
        wikiTitle: "File:Yasser_Arafat.jpg",
        filename: "arafat_1999.jpg",
    },
    {
        lessonIdx: 8,
        wikiTitle: "File:Yitzhak_Rabin_and_Yasser_Arafat.jpg",
        filename: "oslo_accords_1993.jpg",
    }
];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
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
                        await downloadImage(url, dest);
                        resolve(`/units/cme_new/assets/${filename}`);
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

async function run() {
    for (let i = 0; i < sources.length; i++) {
        const s = sources[i];
        console.log(`Fetching thumbnail for ${s.wikiTitle}...`);
        const localSrc = await fetchWikiThumbnail(s.wikiTitle, s.filename);
        if (localSrc) {
            console.log(`Downloaded ${localSrc}`);
        } else {
            console.log(`Failed to fetch thumbnail for ${s.wikiTitle}`);
        }
    }
}

run();
