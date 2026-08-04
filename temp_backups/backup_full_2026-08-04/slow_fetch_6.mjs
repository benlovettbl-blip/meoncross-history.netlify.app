import fs from 'fs';
import path from 'path';

const delay = ms => new Promise(res => setTimeout(res, ms));

const imagesToFetch = [
    { dest: "dachau_roll_call.jpg", title: "Dachau_concentration_camp" },
    { dest: "hitler_hindenburg_1933.jpg", title: "Adolf_Hitler's_rise_to_power" },
    { dest: "munich_putsch_defendants.jpg", title: "Beer_Hall_Putsch" },
    { dest: "nazi_poster_our_last_hope.jpg", title: "Adolf_Hitler" },
    { dest: "nuremberg_rally.jpg", title: "Nuremberg_rally" },
    { dest: "reichstag_fire_ruins.jpg", title: "Reichstag_fire" }
];

async function fetchWikiImage(title, destPath) {
    const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`;
    try {
        const response = await fetch(wikiApiUrl, { headers: { 'User-Agent': 'Bot HistoryApp/3.0' }});
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status}`);
            return;
        }
        
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        let imageUrl = null;
        if (pageId !== "-1" && pages[pageId].thumbnail) {
            imageUrl = pages[pageId].thumbnail.source;
        }

        if (imageUrl) {
            const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Bot HistoryApp/3.0' }});
            if (imgRes.ok) {
                const arrayBuffer = await imgRes.arrayBuffer();
                fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
                console.log(`Downloaded image to ${destPath}`);
            } else {
                 console.log(`Image fetch failed with ${imgRes.status}`);
            }
        } else {
            console.error(`Could not resolve image for ${title}`);
        }
    } catch (e) {
        console.error(`Error fetching image for ${title}: ${e.message}`);
    }
}

async function run() {
    for (const item of imagesToFetch) {
        const destPath = path.join(process.cwd(), 'public', 'images', item.dest);
        await fetchWikiImage(item.title, destPath);
        await delay(10000); // 10 seconds delay
    }
}

run();
