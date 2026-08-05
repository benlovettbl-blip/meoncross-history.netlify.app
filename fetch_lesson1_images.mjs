import fs from 'fs';
import path from 'path';

async function fetchWikiImage(query, filename) {
    try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        
        if (!searchData.query || searchData.query.search.length === 0) {
            console.error(`No results found for ${query}`);
            return;
        }

        const title = searchData.query.search[0].title;
        console.log(`Found article: ${title}`);

        const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
        const imgRes = await fetch(imgUrl);
        const imgData = await imgRes.json();
        
        const pages = imgData.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pages[pageId].thumbnail) {
            let source = pages[pageId].thumbnail.source;
            console.log(`Found image URL for ${query}: ${source}`);
            
            // Download the image
            const dlRes = await fetch(source);
            const buffer = await dlRes.arrayBuffer();
            const destPath = path.join(process.cwd(), 'public', 'images', filename);
            fs.writeFileSync(destPath, Buffer.from(buffer));
            console.log(`Saved ${filename}`);
        } else {
            console.error(`No thumbnail found for ${title}`);
        }
    } catch (e) {
        console.error(`Error fetching ${query}:`, e);
    }
}

async function run() {
    await fetchWikiImage("Ottoman Empire 1453", "ottoman_1453.jpg");
    await fetchWikiImage("Benin Bronzes", "benin_bronze.jpg");
    await fetchWikiImage("Silk Road", "silk_road.jpg");
}

run();
