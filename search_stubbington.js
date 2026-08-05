const https = require('https');

const USER_AGENT = 'MeoncrossHistoryApp/1.0 (https://meoncross-history.netlify.app; contact@meoncross.school)';
const searchTerm = 'Wooden war memorial in the centre of Stubbington';

const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;

https.get(searchUrl, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        if (json.query && json.query.pages) {
            Object.values(json.query.pages).forEach(page => {
                if (page.imageinfo && page.imageinfo[0]) {
                    console.log(`Title: ${page.title}`);
                    console.log(`URL: ${page.imageinfo[0].thumburl || page.imageinfo[0].url}`);
                    console.log('---');
                }
            });
        } else {
            console.log('No results found on Wikimedia Commons.');
        }
    });
});
