const fs = require('fs');
const https = require('https');
const path = require('path');

const searchTerm = encodeURIComponent("Royal Exchange London courtyard");
const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&srnamespace=6&format=json`;

https.get(searchUrl, { headers: { 'User-Agent': 'AntigravityHistoryBot/1.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        if (json.query && json.query.search && json.query.search.length > 0) {
            let title = json.query.search[0].title;
            // let's grab the second or third one if available just to see
            for(let item of json.query.search) {
                if(item.title.toLowerCase().includes('courtyard') || item.title.toLowerCase().includes('interior')) {
                    title = item.title;
                    break;
                }
            }
            console.log(`Found image: ${title}`);
            const encodedTitle = encodeURIComponent(title);
            const thumbUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodedTitle}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;
            
            https.get(thumbUrl, { headers: { 'User-Agent': 'AntigravityHistoryBot/1.0' } }, (res2) => {
                let data2 = '';
                res2.on('data', chunk => data2 += chunk);
                res2.on('end', () => {
                    const json2 = JSON.parse(data2);
                    const pages = json2.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
                        const url = pages[pageId].imageinfo[0].thumburl;
                        console.log(`Downloading: ${url}`);
                        
                        const file = fs.createWriteStream(path.join(__dirname, 'public/images/royal_exchange_courtyard.jpg'));
                        https.get(url, { headers: { 'User-Agent': 'AntigravityHistoryBot/1.0' } }, (res3) => {
                            res3.pipe(file);
                            file.on('finish', () => {
                                file.close();
                                console.log("Downloaded royal_exchange_courtyard.jpg");
                            });
                        });
                    }
                });
            });
        }
    });
}).on('error', err => console.error(err));
