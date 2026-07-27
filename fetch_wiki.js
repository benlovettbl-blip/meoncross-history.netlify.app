const https = require('https');
const fs = require('fs');

const titles = [
  "United_Nations_Partition_Plan_for_Palestine", "SS_Exodus", "David_Ben-Gurion",
  "1948_Arab–Israeli_War", "1948_Palestinian_expulsion_and_flight", "UNRWA",
  "Suez_Crisis", "Gamal_Abdel_Nasser", "Anthony_Eden",
  "Six-Day_War", "Straits_of_Tiran", "Levi_Eshkol",
  "United_Nations_Security_Council_Resolution_242", "Yasser_Arafat", "Khartoum_Resolution",
  "War_of_Attrition", "Yom_Kippur_War", "Golda_Meir",
  "Camp_David_Accords", "Anwar_Sadat", "Menachem_Begin",
  "First_Intifada", "Palestine_Liberation_Organization", "Yitzhak_Rabin",
  "Oslo_I_Accord", "Israel–Jordan_peace_treaty", "Bill_Clinton"
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchImage(title) {
  await delay(200);
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    https.get(url, { headers: { 'User-Agent': 'meoncross-history-bot/1.0 (test)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve('No image');
          }
        } catch (e) {
          resolve('Error');
        }
      });
    }).on('error', () => resolve('Error'));
  });
}

async function run() {
  const links = [];
  for (const title of titles) {
    const img = await fetchImage(title);
    links.push(`${title}: ${img}`);
  }
  fs.writeFileSync('wiki_links.txt', links.join('\n'));
}

run();
