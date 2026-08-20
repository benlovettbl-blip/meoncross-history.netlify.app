const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadImage(fileName, destName) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${fileName}&prop=imageinfo&iiprop=url&format=json`;
    const options = { headers: { 'User-Agent': 'meoncross-history/1.0' } };

    https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            const json = JSON.parse(data);
            const pages = json.query.pages;
            const pageId = Object.keys(pages)[0];
            
            if (pages[pageId].imageinfo && pages[pageId].imageinfo[0].url) {
                const imageUrl = pages[pageId].imageinfo[0].url;
                const dest = path.join('c:/Projects/meoncross-history.netlify.app/public/images/', destName);
                
                https.get(imageUrl, options, (imgRes) => {
                    const file = fs.createWriteStream(dest);
                    imgRes.pipe(file);
                    file.on('finish', () => { file.close(); console.log('Downloaded: ' + dest); });
                }).on('error', (err) => { console.error('Error: ', err.message); });
            } else {
                console.log('No image found for: ' + fileName);
            }
        });
    });
}

downloadImage("File:Domesday_Book_-_Little_Domesday_(Essex_Text).jpg", "domesday_book.jpg");
downloadImage("File:Red_Rose_Badge_of_Lancaster.svg", "lancaster_rose.svg");
downloadImage("File:White_Rose_Badge_of_York.svg", "york_rose.svg");
