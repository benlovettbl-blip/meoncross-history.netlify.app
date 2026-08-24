import fs from 'fs';
import path from 'path';

const queries = [
  { era: '18th_19th', title: 'File:The_Silent_Highwayman_-_Punch_cartoon.jpg' },
  { era: 'modern', title: 'File:Penicillin_pastille_production_by_the_photographic_agency_of_the_Ministry_of_Information.jpg' }
];

const destDir = 'C:/Projects/meoncross-history.netlify.app/public/images';

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.edu)' } });
  return await res.json();
}

async function run() {
  for (const q of queries) {
    console.log(`Fetching: ${q.title}`);
    const imageQueryUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(q.title)}&prop=pageimages&format=json&pithumbsize=1000`;
    try {
      const imgData = await fetchJson(imageQueryUrl);
      const pages = imgData.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const sourceUrl = pages[pageId].thumbnail.source;
        console.log(`Downloading: ${sourceUrl}`);
        
        const res = await fetch(sourceUrl, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.edu)' } });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const buffer = await res.arrayBuffer();
        
        const destPath = path.join(destDir, `banner_medicine_${q.era}.jpg`);
        fs.writeFileSync(destPath, Buffer.from(buffer));
        console.log(`Saved ${q.era}`);
      } else {
        console.log(`Not found in API: ${q.title}`);
      }
    } catch(e) {
      console.error(e.message);
    }
  }
}
run();
