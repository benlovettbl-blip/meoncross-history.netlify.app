import fs from 'fs';
import https from 'https';
import path from 'path';

const dataPath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

let dataObj;
try {
  dataObj = eval('(function(){ ' + content.replace(/export const (unitData) =/, 'return') + '; })()');
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

const imagesDir = 'public/images';
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

async function fetchImageFor(name) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=500`;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId !== '-1' && pages[pageId].thumbnail) {
                        resolve(pages[pageId].thumbnail.source);
                    } else {
                        resolve(null);
                    }
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function downloadImage(url, destPath) {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        }).on('error', () => {
            fs.unlink(destPath, () => {});
            resolve(false);
        });
    });
}

async function main() {
    let updated = false;
    for (let ki of dataObj.key_individuals) {
        if (!ki.image || ki.image === "") {
            console.log(`Fetching image for ${ki.name}...`);
            const imageUrl = await fetchImageFor(ki.name);
            if (imageUrl) {
                const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
                const filename = ki.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ext;
                const destPath = path.join(imagesDir, filename);
                const success = await downloadImage(imageUrl, destPath);
                if (success) {
                    ki.image = `/images/${filename}`;
                    updated = true;
                    console.log(`Success: Downloaded to ${ki.image}`);
                } else {
                    console.log(`Failed to download image for ${ki.name}`);
                }
            } else {
                console.log(`No Wikipedia image found for ${ki.name}`);
            }
        }
    }

    if (updated) {
        const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
        fs.writeFileSync(dataPath, newContent, 'utf8');
        console.log("Updated data.js with new images!");
    }
}

main();
