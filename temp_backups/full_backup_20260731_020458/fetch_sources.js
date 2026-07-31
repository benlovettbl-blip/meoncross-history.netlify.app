const https = require('https');
const fs = require('fs');

const kts = {
  "KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949": ["United_Nations_Partition_Plan_for_Palestine", "SS_Exodus", "David_Ben-Gurion"],
  "KT1.2: The Aftermath of the 1948–49 War": ["1948_Arab–Israeli_War", "1948_Palestinian_expulsion_and_flight", "UNRWA"],
  "KT1.3: Increased Tension, 1955–1963": ["Suez_Crisis", "Gamal_Abdel_Nasser", "Anthony_Eden"],
  "KT2.1: The Six Day War, 1967": ["Six-Day_War", "Straits_of_Tiran", "Levi_Eshkol"],
  "KT2.2: The Aftermath of the 1967 War": ["United_Nations_Security_Council_Resolution_242", "Yasser_Arafat", "Khartoum_Resolution"],
  "KT2.3: Israel and Egypt, 1967–1973": ["War_of_Attrition", "Yom_Kippur_War", "Golda_Meir"],
  "KT3.1: Diplomatic negotiations, 1974–1979": ["Camp_David_Accords", "Anwar_Sadat", "Menachem_Begin"],
  "KT3.2: The Palestinian Issue, 1974–1993": ["First_Intifada", "Palestine_Liberation_Organization", "Yitzhak_Rabin"],
  "KT3.3: Attempts at a solution, 1988–1995": ["Oslo_Accords", "Yitzhak_Rabin", "Bill_Clinton"]
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchImage(title) {
  await delay(100);
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`;
    https.get(url, { headers: { 'User-Agent': 'meoncross-history-bot/1.0' } }, (res) => {
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
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  let output = "# Middle East Unit: Visual Sources\n\n";
  for (const [kt, titles] of Object.entries(kts)) {
    output += `## ${kt}\n`;
    for (const title of titles) {
      const img = await fetchImage(title);
      if (img) {
        output += `- **${title.replace(/_/g, ' ')}**: [Thumbnail Link](${img})\n`;
        output += `  - \`${img}\`\n`;
      } else {
         output += `- **${title.replace(/_/g, ' ')}**: No image found.\n`;
      }
    }
    output += "\n";
  }
  fs.writeFileSync('middle_east_sources.md', output);
  console.log("Done");
}

run();
