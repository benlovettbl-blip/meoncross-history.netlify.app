const https = require('https');
const fs = require('fs');

async function fetchImage(title, filepath) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const json = JSON.parse(data);
            const pages = json.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
                const file = fs.createWriteStream(filepath);
                https.get(pages[pageId].thumbnail.source, (imgRes) => {
                    imgRes.pipe(file);
                    file.on('finish', () => console.log('Downloaded ' + title));
                });
            } else console.log('Still no thumbnail for ' + title);
        });
    });
}
fetchImage('Jamestown_settlement', 'public/images/locations/jamestown.jpg');
