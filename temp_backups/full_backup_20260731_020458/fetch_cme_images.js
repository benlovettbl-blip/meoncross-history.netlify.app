const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'public', 'units', 'cme_new', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const sources = [
    {
        lessonIdx: 0, 
        query: "David Ben-Gurion declaration of independence 1948",
        filename: "israel_independence.jpg",
        title: "Declaration of Independence",
        caption: "David Ben-Gurion declaring the independence of the State of Israel, May 14, 1948.",
        question: "Enquiry: How useful is this photograph for an inquiry into the creation of the State of Israel in 1948?",
        teacher_notes: "A pivotal photograph showing Ben-Gurion reading the declaration under the portrait of Theodor Herzl. Hinge Question: Why might the presence of Theodor Herzl's portrait in the background be significant to the audience of this declaration?"
    },
    {
        lessonIdx: 1,
        query: "Palestinian refugees 1948",
        filename: "palestinian_refugees_1948.jpg",
        title: "Palestinian Refugees (1948)",
        caption: "Palestinian refugees fleeing their homes during the 1948 Arab-Israeli War (the Nakba).",
        question: "Enquiry: How useful is this photograph for an inquiry into the human cost of the 1948-49 war?",
        teacher_notes: "This image highlights the mass displacement of Palestinians, which became the central issue of the Nakba. Hinge Question: How does this photograph challenge or support the Israeli narrative of the 1948 war?"
    },
    {
        lessonIdx: 2,
        query: "Gamal Abdel Nasser 1956",
        filename: "nasser_1958.jpg",
        title: "President Gamal Abdel Nasser",
        caption: "Gamal Abdel Nasser, President of Egypt, who nationalised the Suez Canal and led the Arab nationalist movement.",
        question: "Enquiry: How useful is this photograph for an inquiry into Arab leadership in the 1950s?",
        teacher_notes: "Nasser's charismatic leadership united the Arab world but deeply alarmed Britain, France, and Israel. Hinge Question: How does Nasser's confident posture reflect his political ambitions in the Middle East during this period?"
    },
    {
        lessonIdx: 3,
        query: "Israeli soldiers Western Wall 1967",
        filename: "western_wall_1967.jpg",
        title: "Israeli Soldiers at the Western Wall",
        caption: "Israeli paratroopers standing at the Western Wall in Jerusalem shortly after capturing the Old City in June 1967.",
        question: "Enquiry: How useful is this photograph for an inquiry into the impact of the Six Day War on Israel?",
        teacher_notes: "A deeply iconic image in Israeli history, symbolizing the reunification of Jerusalem and Jewish access to their holiest site. Hinge Question: What emotions are conveyed by the soldiers, and why was this specific location so strategically and culturally vital?"
    },
    {
        lessonIdx: 4,
        query: "Six Day War map territories",
        filename: "conquered_territories_1967.png",
        title: "Map of Territories Captured in 1967",
        caption: "Map showing the territories captured by Israel during the Six Day War: the Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights.",
        question: "Enquiry: How useful is this map for an inquiry into the territorial changes resulting from the 1967 war?",
        teacher_notes: "This map visually demonstrates the massive expansion of Israeli-controlled territory, which created the geopolitical reality still contested today. Hinge Question: Based on the map, which Arab nation suffered the greatest territorial loss, and how might that affect future relations?"
    },
    {
        lessonIdx: 5,
        query: "Yom Kippur War tanks",
        filename: "idf_fighter_planes.jpg",
        title: "The Yom Kippur War",
        caption: "Israeli tanks operating during the 1973 Yom Kippur War.",
        question: "Enquiry: How useful is this photograph for an inquiry into the military dynamics of the 1973 Yom Kippur War?",
        teacher_notes: "The image shows the heavy mechanized warfare that characterized the 1973 conflict. Hinge Question: How does this photograph reflect the wider Cold War context of the Arab-Israeli conflict?"
    },
    {
        lessonIdx: 6,
        query: "Camp David Accords Begin Sadat Carter",
        filename: "camp_david_1978.jpg",
        title: "Signing of the Camp David Accords",
        caption: "Menachem Begin, Jimmy Carter, and Anwar Sadat at the Camp David Accords signing ceremony in 1978.",
        question: "Enquiry: How useful is this photograph for an inquiry into diplomatic breakthroughs in the Middle East?",
        teacher_notes: "This historic handshake ended decades of war between Egypt and Israel but alienated Egypt from the rest of the Arab world. Hinge Question: Why was the role of the US President (Jimmy Carter) so critical in achieving this handshake?"
    },
    {
        lessonIdx: 7,
        query: "Yasser Arafat PLO 1974",
        filename: "arafat_1999.jpg",
        title: "Yasser Arafat",
        caption: "Yasser Arafat, Chairman of the Palestine Liberation Organization (PLO), who brought global attention to the Palestinian cause.",
        question: "Enquiry: How useful is this photograph for an inquiry into Palestinian leadership?",
        teacher_notes: "Arafat became the face of the Palestinian struggle, utilizing both diplomacy and armed resistance. Hinge Question: How did Arafat's leadership style shift between the 1970s and the 1990s?"
    },
    {
        lessonIdx: 8,
        query: "Oslo Accords handshake 1993 Clinton",
        filename: "oslo_accords_1993.jpg",
        title: "The Oslo Accords Handshake",
        caption: "Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shaking hands, overseen by US President Bill Clinton, September 1993.",
        question: "Enquiry: How useful is this photograph for an inquiry into the peace process of the 1990s?",
        teacher_notes: "The handshake symbolized a monumental shift toward a two-state solution, though the peace process ultimately stalled. Hinge Question: Does this photograph suggest that peace was inevitable, or does the body language hint at underlying hesitations?"
    }
];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function searchCommons(query) {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
    return new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'AntigravityAgent/1.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.search && json.query.search.length > 0) {
                        resolve(json.query.search[0].title);
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

async function fetchWikiThumbnail(title, filename) {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    return new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'AntigravityAgent/1.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', async () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const page = Object.values(pages)[0];
                    if (page && page.thumbnail && page.thumbnail.source) {
                        const url = page.thumbnail.source;
                        const dest = path.join(assetsDir, filename);
                        await downloadImage(url, dest);
                        resolve(`/units/cme_new/assets/${filename}`);
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
    let dataFile = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
    let code = fs.readFileSync(dataFile, 'utf8');
    
    // We will build a replacement structure. Since data.js contains `export const unitData = {`
    // We can evaluate it, mutate it, and rewrite it but ES modules can't easily be overwritten
    // this way without generating huge stringified JSON that loses functions.
    // Wait, data.js has no functions in cme_new! It's pure JSON!
    
    for (let i = 0; i < sources.length; i++) {
        const s = sources[i];
        if (i === 0) continue; // skip first, already downloaded
        console.log(`Searching for "${s.query}"...`);
        const title = await searchCommons(s.query);
        if (title) {
            console.log(`Found: ${title}. Fetching thumbnail...`);
            const localSrc = await fetchWikiThumbnail(title, s.filename);
            if (localSrc) {
                console.log(`Downloaded ${localSrc}`);
            } else {
                console.log(`Failed to fetch thumbnail for ${title}`);
            }
        } else {
            console.log(`No results for ${s.query}`);
        }
    }
}

run();
