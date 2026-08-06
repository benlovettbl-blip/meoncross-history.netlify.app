const fs = require('fs');
const https = require('https');

async function downloadWikiImage(title, dest) {
    console.log("Fetching: " + title);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const key = Object.keys(pages)[0];
        if (pages[key] && pages[key].thumbnail) {
            const thumbUrl = pages[key].thumbnail.source;
            console.log("Downloading " + thumbUrl + " to " + dest);
            return new Promise((resolve, reject) => {
                https.get(thumbUrl, { headers: { 'User-Agent': 'MeoncrossHistoryBot/1.0 (https://meoncross-history.netlify.app)' } }, (response) => {
                    if(response.statusCode !== 200) {
                        console.log("Failed " + title + ": " + response.statusCode);
                        return resolve(false);
                    }
                    const file = fs.createWriteStream(dest);
                    response.pipe(file);
                    file.on('finish', () => { file.close(); console.log("Saved " + dest); resolve(true); });
                }).on('error', reject);
            });
        } else {
            console.log("No thumbnail found for " + title);
        }
    } catch(e) {
        console.error(e);
    }
    return false;
}

(async () => {
    await downloadWikiImage('Luttrell Psalter', 'public/images/sidequest_peasant.jpg');
    await downloadWikiImage('Scurvy', 'public/images/sidequest_scurvy.jpg');
    await downloadWikiImage('Secotan', 'public/images/sidequest_secotan.jpg');
    await downloadWikiImage('Diggers', 'public/images/sidequest_diggers.jpg');
    await downloadWikiImage('Cassava', 'public/images/sidequest_cassava.jpg');
    await downloadWikiImage('Mudlark', 'public/images/sidequest_mudlark.jpg');
})();
