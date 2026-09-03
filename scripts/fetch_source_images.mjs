import fs from 'fs';
import path from 'path';

const imagesToFetch = [
    { title: 'William_Shakespeare', filename: 'theatre.jpg' },
];

async function fetchImageForPage(title) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
        const res = await fetch(url);
        const json = await res.json();
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId === '-1') return null;
        if (pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
        }
        return null;
    } catch(e) {
        return null;
    }
}

async function downloadImage(url, filename) {
    try {
        const filepath = path.join(process.cwd(), 'public', 'images', filename);
        console.log(`Downloading ${url} to ${filepath}`);
        const response = await fetch(url, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } });
        if (!response.ok) return false;
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}

async function run() {
    for (const item of imagesToFetch) {
        console.log(`Fetching image for ${item.title}...`);
        const url = await fetchImageForPage(item.title);
        if (url) {
            await downloadImage(url, item.filename);
        } else {
            console.log(`No image found for ${item.title}`);
        }
    }
}

run();
