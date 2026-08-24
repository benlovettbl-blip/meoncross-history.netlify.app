import fs from 'fs';
import path from 'path';

const UNITS = ['edexcel_medicine', 'eee', 'weimar_nazi_germany'];

async function fetchImageForPerson(name) {
    try {
        // Some names might need tweaking for Wiki, but let's try direct first
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=500`;
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
        if (fs.existsSync(filepath)) return `/images/${filename}`;
        
        const response = await fetch(url, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } });
        if (!response.ok) return null;
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
        return `/images/${filename}`;
    } catch(e) {
        return null;
    }
}

async function run() {
    for (const unit of UNITS) {
        console.log(`Processing unit: ${unit}`);
        let mod = await import(`file:///${process.cwd().replace(/\\/g, '/')}/${unit}/data.js`);
        let data = mod.unitData || (mod.default && mod.default.unitData) || mod.default || mod[unit];
        if (!data.key_individuals) {
            console.log(`No key_individuals in ${unit}`);
            continue;
        }
        
        let modified = false;
        for (const person of data.key_individuals) {
            const isMissing = !person.image || 
                              person.image === '/' || 
                              person.image === '/images/placeholder.jpg' || 
                              person.image === '/images/placeholder_portrait.jpg';
            if (isMissing && !person.image_url) {
                console.log(`Searching for ${person.name}...`);
                const thumbUrl = await fetchImageForPerson(person.name);
                if (thumbUrl) {
                    console.log(`Found image for ${person.name}, downloading...`);
                    const filename = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.jpg';
                    const localPath = await downloadImage(thumbUrl, filename);
                    if (localPath) {
                        person.image = localPath;
                        modified = true;
                        console.log(`Successfully mapped ${person.name} to ${localPath}`);
                    } else {
                         console.log(`Failed to download image for ${person.name}`);
                    }
                } else {
                    console.log(`No Wikipedia image found for ${person.name}`);
                }
            }
        }
        
        if (modified) {
            const out = `const ${unit} = ${JSON.stringify(data, null, 2)};\n\nexport default ${unit};`;
            fs.writeFileSync(`${unit}/data.js`, out);
            console.log(`Saved updated data for ${unit}`);
        }
    }
}

run();
