const https = require('https');

const people = [
  "Yasser Arafat",
  "Arthur Balfour",
  "David Ben-Gurion",
  "Gamal Abdel Nasser",
  "Golda Meir",
  "Jimmy Carter",
  "Yitzhak Rabin",
  "Ariel Sharon"
];

async function fetchWikiImageInfo(name) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=400`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          const thumb = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;
          const pageImage = pages[pageId].pageimage;
          resolve({ name, thumb, pageImage });
        } catch (e) {
          resolve({ name, error: e.message });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const person of people) {
    const info = await fetchWikiImageInfo(person);
    if (info.pageImage) {
        // Now fetch imageinfo for license
        const url2 = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(info.pageImage)}&prop=imageinfo&iiprop=extmetadata&format=json`;
        await new Promise(resolve => {
            https.get(url2, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const parsed = JSON.parse(data);
                    const pages = parsed.query.pages;
                    const pageId = Object.keys(pages)[0];
                    const metadata = pages[pageId].imageinfo?.[0]?.extmetadata;
                    const license = metadata?.LicenseShortName?.value || 'Unknown';
                    const usageTerms = metadata?.UsageTerms?.value || 'Unknown';
                    console.log(`- **${person}**: [Image URL](${info.thumb}) - License: ${license} (${usageTerms})`);
                    resolve();
                });
            });
        });
    } else {
        console.log(`- **${person}**: No image found`);
    }
  }
}

run();
