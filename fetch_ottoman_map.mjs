import fs from 'fs';
import path from 'path';

async function fetchWikiImage(query, filename) {
    try {
        const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500`;
        const imgRes = await fetch(imgUrl);
        const imgData = await imgRes.json();
        
        const pages = imgData.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pages[pageId].thumbnail) {
            let source = pages[pageId].thumbnail.source;
            console.log(`Found image URL for ${query}: ${source}`);
            
            // Download the image
            const dlRes = await fetch(source, { headers: { 'User-Agent': 'Mozilla/5.0' }});
            const buffer = await dlRes.arrayBuffer();
            const destPath = path.join(process.cwd(), 'public', 'images', filename);
            fs.writeFileSync(destPath, Buffer.from(buffer));
            console.log(`Saved ${filename}`);
        } else {
            console.error(`No thumbnail found for ${query}`);
        }
    } catch (e) {
        console.error(`Error fetching ${query}:`, e);
    }
}

fetchWikiImage("Territorial evolution of the Ottoman Empire", "ottoman_1453.jpg");
