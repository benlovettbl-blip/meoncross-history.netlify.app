import fs from 'fs';
import https from 'https';

const DUMMY_DB = "./weimar_nazi_germany/data.js";

async function fetchWikiImage(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500`;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const pages = parsed.query.pages;
                    const firstPageId = Object.keys(pages)[0];
                    if (firstPageId !== "-1" && pages[firstPageId].thumbnail) {
                        resolve(pages[firstPageId].thumbnail.source);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    let raw = fs.readFileSync(DUMMY_DB, 'utf-8');
    raw = raw.replace("export const unitData =", "global.unitData =");
    eval(raw);
    const db = global.unitData;

    const bios = [
        { name: "Joseph Goebbels", role: "Minister of Propaganda", desc: "A master of persuasion and mass media who directed the Nazi propaganda machine.", search: "Joseph_Goebbels" },
        { name: "Paul von Hindenburg", role: "President of the Weimar Republic", desc: "A former WWI general and aging President who heavily used Article 48 and eventually appointed Hitler as Chancellor.", search: "Paul_von_Hindenburg" }
    ];

    if (!db.key_individuals) db.key_individuals = [];
    
    for (let bio of bios) {
        if (!db.key_individuals.find(k => k.name === bio.name)) {
            const url = await fetchWikiImage(bio.search);
            const safeName = bio.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const destPath = `/images/${safeName}.jpg`;
            if (url) {
                await downloadImage(url, `./public/images/${safeName}.jpg`);
            }
            db.key_individuals.push({
                name: bio.name,
                role: bio.role,
                description: bio.desc,
                image: destPath
            });
            console.log("Added key individual:", bio.name);
        }
    }

    const outStr = "export const unitData = " + JSON.stringify(db, null, 4) + ";\n";
    fs.writeFileSync(DUMMY_DB, outStr);
    console.log("Updated data.js");
}

run();
