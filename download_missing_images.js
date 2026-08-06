const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesToFetch = [
    { title: 'Pocahontas', filename: 'public/images/individuals/pocahontas.jpg' },
    { title: 'Constantinople', filename: 'public/images/locations/constantinople.jpg' },
    { title: 'Guangzhou', filename: 'public/images/locations/canton.jpg' },
    { title: 'Jamestown,_Virginia', filename: 'public/images/locations/jamestown.jpg' },
    { title: 'Potosí', filename: 'public/images/locations/potosi.jpg' },
    { title: 'Timbuktu', filename: 'public/images/locations/timbuktu.jpg' }
];

async function fetchImage(title, filepath) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'MeoncrossHistory/1.0 (contact@example.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
                        const imgUrl = pages[pageId].thumbnail.source;
                        
                        const file = fs.createWriteStream(filepath);
                        https.get(imgUrl, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } }, (imgRes) => {
                            imgRes.pipe(file);
                            file.on('finish', () => {
                                file.close();
                                console.log(`Successfully downloaded ${title} to ${filepath}`);
                                resolve();
                            });
                        }).on('error', (err) => {
                            fs.unlink(filepath, () => {});
                            console.error(`Failed to download image for ${title}:`, err.message);
                            resolve();
                        });
                    } else {
                        console.error(`No thumbnail found for ${title}`);
                        resolve();
                    }
                } catch (e) {
                    console.error(`Error parsing JSON for ${title}:`, e);
                    resolve();
                }
            });
        }).on('error', (err) => {
            console.error(`Error fetching API for ${title}:`, err.message);
            resolve();
        });
    });
}

async function run() {
    for (const img of imagesToFetch) {
        await fetchImage(img.title, img.filename);
    }
}

run();
