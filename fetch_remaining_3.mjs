import fs from 'fs';
import path from 'path';

const searchTerms = [
    { query: "Unsere letzte Hoffnung: Hitler", dest: "nazi_poster_our_last_hope.jpg" },
    { query: "Nuremberg Rally 1934 Luitpold Arena", dest: "nuremberg_rally.jpg" },
    { query: "Hitler Ludendorff Prozess", dest: "munich_putsch_defendants.jpg" }
];

async function run() {
    for (const item of searchTerms) {
        console.log("Searching for:", item.query);
        try {
            // Search for pages in file namespace
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(item.query)}&format=json`);
            const searchData = await searchRes.json();
            if (searchData.query.search.length === 0) {
                console.log("No results for", item.query);
                continue;
            }
            
            const title = searchData.query.search[0].title;
            console.log("Found title:", title);
            
            // Get image info
            const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`);
            const imgData = await imgRes.json();
            const pages = imgData.query.pages;
            const page = Object.values(pages)[0];
            
            if (page.imageinfo && page.imageinfo[0].url) {
                const url = page.imageinfo[0].url;
                console.log("Downloading URL:", url);
                
                const dlRes = await fetch(url);
                const buffer = await dlRes.arrayBuffer();
                fs.writeFileSync(path.resolve('public/images', item.dest), Buffer.from(buffer));
                console.log("Saved", item.dest);
            }
        } catch (e) {
            console.error("Error on", item.query, e.message);
        }
    }
}

run();
