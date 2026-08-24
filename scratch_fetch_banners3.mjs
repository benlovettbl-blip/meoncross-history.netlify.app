import fs from 'fs';
import path from 'path';

const downloads = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/The_Silent_Highwayman_-_Punch_cartoon.jpg/1280px-The_Silent_Highwayman_-_Punch_cartoon.jpg', name: 'banner_medicine_18th_19th.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Penicillin_pastille_production_by_the_photographic_agency_of_the_Ministry_of_Information.jpg/1280px-Penicillin_pastille_production_by_the_photographic_agency_of_the_Ministry_of_Information.jpg', name: 'banner_medicine_modern.jpg' }
];

const destDir = 'C:/Projects/meoncross-history.netlify.app/public/images';

async function run() {
  for (const d of downloads) {
    console.log(`Fetching ${d.name}...`);
    const res = await fetch(d.url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.edu)' } });
    if (!res.ok) {
        console.error(`Failed ${d.name}: ${res.status}`);
        continue;
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(path.join(destDir, d.name), Buffer.from(buffer));
    console.log(`Saved ${d.name}`);
  }
}
run();
