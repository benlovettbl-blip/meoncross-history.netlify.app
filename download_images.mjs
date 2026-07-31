import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
    { name: 'hyperinflation_1923.jpg', title: 'File:Bundesarchiv_Bild_102-00104,_Berlin,_Geldtransport_der_Reichsbank.jpg' },
    { name: 't4_poster.jpg', title: 'File:Neues Volk eugenics poster, c. 1937.jpeg' },
    { name: 'bdm_girls.jpg', title: 'File:Bundesarchiv_Bild_146-1973-010-31,_BDM-Mädels_beim_Singen.jpg' }
];

async function download() {
    for (const img of images) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(img.title)}&prop=imageinfo&iiprop=url&format=json`;
        console.log(`Fetching info for ${img.title}`);
        try {
            const res = await fetch(url);
            const json = await res.json();
            const pages = json.query.pages;
            const page = Object.values(pages)[0];
            if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
                const imgUrl = page.imageinfo[0].url;
                console.log(`Downloading ${imgUrl} to ${img.name}`);
                
                await new Promise((resolve, reject) => {
                    https.get(imgUrl, (res) => {
                        const file = fs.createWriteStream(path.join('public', 'images', img.name));
                        res.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            resolve();
                        });
                    }).on('error', reject);
                });
            } else {
                console.error(`Could not find URL for ${img.title}`);
            }
        } catch(e) {
            console.error(e);
        }
    }
}

download().then(() => console.log('Done'));
