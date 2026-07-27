const fs = require('fs');
const https = require('https');
const path = require('path');

const biosFile = './public/units/cme_new/biographies.json';
const bios = JSON.parse(fs.readFileSync(biosFile, 'utf8'));
const existingNames = bios.map(b => b.name);

async function downloadImage(title, filename) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
  const options = {
    headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (contact@example.com)' }
  };
  
  return new Promise((resolve, reject) => {
    https.get(apiUrl, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1' || !pages[pageId].thumbnail) {
            console.error('No thumbnail found for', title);
            resolve(null);
            return;
          }
          
          const imageUrl = pages[pageId].thumbnail.source;
          const dest = path.join('./public/units/cme_new/assets/', filename);
          const file = fs.createWriteStream(dest);
          
          https.get(imageUrl, options, (imgRes) => {
            imgRes.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve(`/units/cme_new/assets/${filename}`);
            });
          }).on('error', reject);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const herzlImg = await downloadImage('Theodor Herzl', 'theodor_herzl.jpg') || '';
  const netanyahuImg = await downloadImage('Benjamin Netanyahu', 'benjamin_netanyahu.jpg') || '';
  
  const newBios = [
    {
      name: "Arthur Balfour",
      role: "British Foreign Secretary",
      lifespan: "1848 – 1930",
      achievements: [
        "Authored the 1917 Balfour Declaration.",
        "Served as Prime Minister of the United Kingdom.",
        "Played a key role in shaping British imperial policy in the Middle East."
      ],
      significance: "His declaration expressed official British support for a 'national home for the Jewish people' in Palestine, laying the diplomatic foundation for the creation of Israel.",
      image: "/units/cme_new/assets/card_balfour.png"
    },
    {
      name: "Anthony Eden",
      role: "British Prime Minister",
      lifespan: "1897 – 1977",
      achievements: [
        "Served as Foreign Secretary during World War II.",
        "Authorized the ill-fated Suez intervention in 1956.",
        "Was a central figure in British foreign policy for decades."
      ],
      significance: "His decision to conspire with France and Israel to attack Egypt during the Suez Crisis ended in political disaster, marking the definitive end of Britain's imperial dominance in the Middle East.",
      image: "/units/cme_new/assets/eden_cover.png"
    },
    {
      name: "Harry Truman",
      role: "33rd US President",
      lifespan: "1884 – 1972",
      achievements: [
        "Made the US the first nation to officially recognize the State of Israel in 1948.",
        "Supported the admission of Jewish refugees into Palestine after WWII.",
        "Initiated early US diplomatic involvement in the Middle East conflict."
      ],
      significance: "His swift de facto recognition of Israel just 11 minutes after its founding established a lasting, albeit complicated, alliance between the United States and the Jewish state.",
      image: "/units/cme_new/assets/card_truman.png"
    },
    {
      name: "Theodor Herzl",
      role: "Founder of Modern Political Zionism",
      lifespan: "1860 – 1904",
      achievements: [
        "Authored 'Der Judenstaat' (The Jewish State) in 1896.",
        "Convened the First Zionist Congress in Basel in 1897.",
        "Established the World Zionist Organization."
      ],
      significance: "Often referred to as the 'Spiritual Father of the Jewish State', he transformed Zionism from a cultural movement into an organized international political force aiming to establish a Jewish homeland.",
      image: herzlImg
    },
    {
      name: "Benjamin Netanyahu",
      role: "Prime Minister of Israel",
      lifespan: "1949 – Present",
      achievements: [
        "Longest-serving Prime Minister in Israel's history.",
        "Signed the Wye River Memorandum in 1998.",
        "Oversaw massive economic liberalization and normalization agreements with Arab states."
      ],
      significance: "A dominant figure in modern Israeli politics, he frequently opposed the Oslo Accords framework and fundamentally shifted Israeli policy away from the 'land for peace' paradigm.",
      image: netanyahuImg
    }
  ];

  let added = 0;
  newBios.forEach(bio => {
    if (!existingNames.includes(bio.name)) {
      bios.push(bio);
      added++;
    }
  });

  fs.writeFileSync(biosFile, JSON.stringify(bios, null, 2), 'utf8');
  console.log(`Added ${added} biographies.`);
}

run();
