const https = require('https');
const fs = require('fs');

const downloadImage = (url, path) => {
    https.get(url, (res) => {
        const file = fs.createWriteStream(path);
        res.pipe(file);
    });
};

const searchAndDownload = (query, path) => {
    const options = {
        hostname: 'en.wikipedia.org',
        path: '/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(query) + '&prop=pageimages&pithumbsize=500&format=json',
        headers: { 'User-Agent': 'HistoryApp/1.0' }
    };
    https.get(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const json = JSON.parse(data);
            if (json.query && json.query.pages) {
                const pages = Object.values(json.query.pages);
                const withImages = pages.filter(p => p.thumbnail);
                if (withImages.length > 0) {
                    console.log('Downloading ' + withImages[0].thumbnail.source + ' to ' + path);
                    downloadImage(withImages[0].thumbnail.source, path);
                } else {
                    console.log('No image found for ' + query);
                }
            } else {
                console.log('No results for ' + query);
            }
        });
    });
};

searchAndDownload('Chinese Labour Corps', 'public/images/gw_clc.jpg');
searchAndDownload('Shot at Dawn Memorial National Memorial Arboretum', 'public/images/gw_arboretum.jpg');
searchAndDownload('Wilfred Owen', 'public/images/gw_wilfred_owen.jpg');
searchAndDownload('Jessie Pope', 'public/images/gw_jessie_pope.jpg');
searchAndDownload('Lord Kitchener', 'public/images/gw_kitchener_portrait.jpg');
searchAndDownload('David Lloyd George', 'public/images/gw_lloyd_george.jpg');
searchAndDownload('Georges Clemenceau', 'public/images/gw_clemenceau.jpg');
searchAndDownload('Woodrow Wilson', 'public/images/gw_woodrow_wilson.jpg');
searchAndDownload('Douglas Haig', 'public/images/gw_douglas_haig.jpg');
searchAndDownload('Khudadad Khan', 'public/images/gw_khudadad_khan.jpg');
