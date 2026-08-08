const fs = require('fs');
const https = require('https');

async function downloadWikiImage(query, filename) {
    console.log(`Searching for: ${query}`);
    
    let title = query;
    if (!query.startsWith('File:')) {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srnamespace=6`;
        const searchRes = await fetch(searchUrl, {
            headers: { 'User-Agent': 'MeoncrossHistory/1.0 (test@example.com)' }
        });
        const searchData = await searchRes.json();
        if (!searchData.query.search.length) {
            console.log(`No results for ${query}`);
            return false;
        }
        title = searchData.query.search[0].title;
    }
    
    console.log(`Found title: ${title}`);
    
    // Get the 500px thumbnail URL!
    const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json`;
    const imgRes = await fetch(imgUrl, {
        headers: { 'User-Agent': 'MeoncrossHistory/1.0 (test@example.com)' }
    });
    const imgData = await imgRes.json();
    
    const pages = imgData.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (!pages[pageId].thumbnail) {
        console.error("No thumbnail found for", title);
        return false;
    }
    
    const rawUrl = pages[pageId].thumbnail.source;
    console.log(`Downloading thumbnail from: ${rawUrl}`);
    
    const file = fs.createWriteStream(filename);
    
    return new Promise((resolve, reject) => {
        https.get(rawUrl, {
            headers: { 'User-Agent': 'MeoncrossHistory/1.0 (test@example.com)' }
        }, function(response) {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download, status: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', function() {
                file.close(() => resolve(true)); 
            });
        }).on('error', function(err) { 
            fs.unlink(filename, () => {}); 
            reject(err);
        });
    });
}

async function run() {
    await downloadWikiImage("Claude de Jongh London Bridge 1632", "public/images/early_mod_l6_banner.jpg");
    await downloadWikiImage("File:The Courtyard at The Royal Exchange London.jpg", "public/images/royal_exchange_courtyard.jpg");
}

run();
