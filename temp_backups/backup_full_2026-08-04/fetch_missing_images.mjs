import fs from 'fs';
import path from 'path';

const delay = ms => new Promise(res => setTimeout(res, ms));

const imagesToFetch = [
    { dest: "nazi_poster_our_last_hope.jpg", title: "Nazi_propaganda" },
    { dest: "nuremberg_rally.jpg", title: "Nuremberg_rally" },
    { dest: "edelweiss_pirates_graffiti.jpg", title: "Edelweiss_Pirates" },
    { dest: "mothers_cross_award.jpg", title: "Cross_of_Honour_of_the_German_Mother" },
    { dest: "bdm_gymnastics.jpg", title: "League_of_German_Girls" },
    { dest: "autobahn_construction.jpg", title: "Reichsautobahn" },
    { dest: "kristallnacht_shop.jpg", title: "Kristallnacht" }
];

async function fetchWikiImage(title, destPath) {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100) {
        console.log(`Already exists and valid: ${destPath}`);
        return;
    }
    
    const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`;
    try {
        const response = await fetch(wikiApiUrl, { headers: { 'User-Agent': 'Bot HistoryApp/1.0' }});
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
        } else {
            console.log(`No thumbnail found for ${title}, falling back to images list`);
            const fallbackUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=images&format=json`;
            const fallRes = await fetch(fallbackUrl, { headers: { 'User-Agent': 'Bot HistoryApp/1.0' }});
            const fallData = await fallRes.json();
            const fallPages = fallData.query.pages;
            const fPageId = Object.keys(fallPages)[0];
            if (fPageId !== "-1" && fallPages[fPageId].images && fallPages[fPageId].images.length > 0) {
                 // Try to find a JPG or PNG
                 const validImages = fallPages[fPageId].images.filter(img => img.title.toLowerCase().endsWith('.jpg') || img.title.toLowerCase().endsWith('.png') || img.title.toLowerCase().endsWith('.svg'));
                 if (validImages.length > 0) {
                     const filename = validImages[0].title;
                     const fileInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
                     const fiRes = await fetch(fileInfoUrl, { headers: { 'User-Agent': 'Bot HistoryApp/1.0' }});
                     const fiData = await fiRes.json();
                     const fiPages = fiData.query.pages;
                     const fiPageId = Object.keys(fiPages)[0];
                     if (fiPages[fiPageId].imageinfo && fiPages[fiPageId].imageinfo.length > 0) {
                         imageUrl = fiPages[fiPageId].imageinfo[0].url;
                     }
                 }
            }
        }

        if (imageUrl) {
            const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Bot HistoryApp/1.0' }});
            const arrayBuffer = await imgRes.arrayBuffer();
            fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
            console.log(`Downloaded image to ${destPath}`);
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
        await delay(2000); // 2 second delay to avoid rate limiting
    }
}

run();
