import fs from 'fs';
import https from 'https';
import path from 'path';

const DB_PATH = './weimar_nazi_germany/data.js';

const individuals = [
    {
        name: "Roland Freisler",
        role: "Judge of the People's Court",
        bio: "A fanatical Nazi and the most notorious judge of the Volksgerichtshof (People's Court). He was known for screaming at defendants, humiliating them, and handing out a staggering number of death sentences for alleged treason without fair trials.",
        search: "Roland Freisler"
    },
    {
        name: "Pope Pius XI",
        role: "Head of the Catholic Church",
        bio: "The Pope who signed the 1933 Concordat with Hitler. After Hitler repeatedly broke the treaty by harassing priests and closing Catholic schools, Pius XI issued the scorching 1937 encyclical 'Mit brennender Sorge' condemning the Nazi regime.",
        search: "Pope Pius XI"
    },
    {
        name: "Ludwig Müller",
        role: "Reich Bishop",
        bio: "A pro-Nazi Protestant pastor who was appointed as the 'Reich Bishop' to lead the Nazified Reich Church. He attempted to merge traditional Christianity with Nazi racial ideology, demanding the removal of the Jewish Old Testament.",
        search: "Ludwig_Müller"
    },
    {
        name: "Martin Niemöller",
        role: "Founder of the Confessional Church",
        bio: "A former WWI U-boat commander turned Protestant pastor. Disgusted by the Nazification of the Protestant Church, he founded the Pastors' Emergency League and the illegal Confessional Church. He preached against Nazi interference and was eventually sent to a concentration camp.",
        search: "Martin Niemöller"
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
