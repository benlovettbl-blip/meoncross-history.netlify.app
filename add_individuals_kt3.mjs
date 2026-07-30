import fs from 'fs';
import https from 'https';
import path from 'path';

const DB_PATH = './weimar_nazi_germany/data.js';

const individuals = [
    {
        name: "Gregor Strasser",
        role: "Left-wing Nazi Leader",
        bio: "A prominent and early leader of the Nazi Party who led the party's left-wing, anti-capitalist faction. He was highly popular with the working class but became a major rival to Hitler. He was assassinated during the Night of the Long Knives in 1934 to eliminate any internal challenges to Hitler's absolute authority.",
        search: "Gregor Strasser"
    },
    {
        name: "Heinrich Himmler",
        role: "Head of the SS",
        bio: "One of the most powerful men in Nazi Germany, Himmler was the Reichsführer of the Schutzstaffel (SS). He was responsible for the orchestration of the Night of the Long Knives alongside Heydrich, and later became the chief architect of the Holocaust.",
        search: "Heinrich Himmler"
    },
    {
        name: "Reinhard Heydrich",
        role: "Head of the SD",
        bio: "A high-ranking Nazi official and one of the main architects of the Holocaust. He founded the Sicherheitsdienst (SD), an intelligence organisation charged with seeking out and neutralising resistance to the Nazi Party. He played a key role in fabricating evidence against Ernst Röhm to justify the Night of the Long Knives.",
        search: "Reinhard Heydrich"
    }
];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error("Failed to download image: " + res.statusCode));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function fetchWikipediaImage(query) {
    return new Promise((resolve, reject) => {
        const url = "https://en.wikipedia.org/w/api.php?action=query&titles=" + encodeURIComponent(query) + "&prop=pageimages&format=json&pithumbsize=500";
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const pages = parsed.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
                        resolve(pages[pageId].thumbnail.source);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    let content = fs.readFileSync(DB_PATH, 'utf8');

    for (const ind of individuals) {
        // Extract biographies array to check if they exist as a bio object
        const bioSectionMatch = content.match(/biographies:\s*\[([\s\S]*?)\]\s*(?:,|\})/);
        const bioText = bioSectionMatch ? bioSectionMatch[1] : '';

        if (!bioText.includes("name: '" + ind.name + "'") && !bioText.includes('name: "' + ind.name + '"')) {
            let imagePath = null;
            const imageUrl = await fetchWikipediaImage(ind.search);
            if (imageUrl) {
                const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
                const filename = ind.name.replace(/\s+/g, '_').toLowerCase() + ext;
                const destPath = path.join('./public/images', filename);
                try {
                    await downloadImage(imageUrl, destPath);
                    imagePath = "/images/" + filename;
                    console.log("Downloaded image for " + ind.name + " to " + imagePath);
                } catch (e) {
                    console.error("Failed to download image for " + ind.name + ":", e.message);
                }
            } else {
                console.log("No Wikipedia image found for " + ind.name);
            }

            const bioObj = "\n        {\n            name: '" + ind.name + "',\n            role: '" + ind.role + "',\n            bio: \"" + ind.bio.replace(/"/g, '\\"') + "\",\n            image: '" + (imagePath || '') + "'\n        },";
            
            content = content.replace(/biographies:\s*\[/, "biographies: [" + bioObj);
            console.log("Added " + ind.name);
        } else {
            console.log(ind.name + " already exists.");
        }
    }

    fs.writeFileSync(DB_PATH, content, 'utf8');
    console.log("Updated data.js with individuals.");
}

run();
