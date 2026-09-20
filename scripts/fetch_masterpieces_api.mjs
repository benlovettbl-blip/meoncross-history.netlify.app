import fs from 'fs';
import path from 'path';

const items = [
  {
    wikiTitle: 'An Experiment on a Bird in the Air Pump',
    filename: 'wright_air_pump.jpg',
    size: 1280,
  },
  {
    wikiTitle: 'Joseph Wright of Derby',
    filename: 'wright_portrait.jpg',
    size: 500,
  },
  {
    wikiTitle: 'The Third of May 1808',
    filename: 'goya_third_of_may.jpg',
    size: 1280,
  },
  {
    wikiTitle: 'Francisco Goya',
    filename: 'goya_portrait.jpg',
    size: 500,
  },
  {
    wikiTitle: 'Beer Street and Gin Lane',
    filename: 'hogarth_gin_lane.jpg',
    size: 1024,
    // Note: If Gin Lane is specific, we can also query the file page or extract
    fileTitle: 'File:William Hogarth - Gin Lane.jpg',
  },
  {
    wikiTitle: 'William Hogarth',
    filename: 'hogarth_portrait.jpg',
    size: 500,
  },
  {
    wikiTitle: 'Gassed (painting)',
    filename: 'sargent_gassed.jpg',
    size: 1280,
  },
  {
    wikiTitle: 'John Singer Sargent',
    filename: 'sargent_portrait.jpg',
    size: 500,
  },
  {
    wikiTitle: 'Las Meninas',
    filename: 'velazquez_meninas.jpg',
    size: 1280,
  },
  {
    wikiTitle: 'Diego Velázquez',
    filename: 'velazquez_portrait.jpg',
    size: 500,
  },
];

const destDir = path.resolve('public/images/masterpieces');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function getWikiThumbnail(title, size = 1280) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=${size}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TheHistoryPortalBot/1.0 (educational; info@thehistoryportal.org)' },
  });
  if (!res.ok) throw new Error(`Wiki API error: ${res.status}`);
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pageId === '-1' || !pages[pageId].thumbnail) {
    // Try commons file query
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=${size}&format=json`;
    const cRes = await fetch(commonsUrl, {
      headers: { 'User-Agent': 'TheHistoryPortalBot/1.0 (educational; info@thehistoryportal.org)' },
    });
    const cData = await cRes.json();
    const cPages = cData.query.pages;
    const cId = Object.keys(cPages)[0];
    if (cId !== '-1' && cPages[cId].imageinfo && cPages[cId].imageinfo[0]) {
      return cPages[cId].imageinfo[0].thumburl || cPages[cId].imageinfo[0].url;
    }
    throw new Error(`No thumbnail found for ${title}`);
  }
  return pages[pageId].thumbnail.source;
}

async function download(url, filepath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TheHistoryPortalBot/1.0 (educational; info@thehistoryportal.org)' },
  });
  if (!res.ok) throw new Error(`Download status ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buf));
}

async function run() {
  for (const item of items) {
    const targetPath = path.join(destDir, item.filename);
    try {
      console.log(`Querying ${item.wikiTitle}...`);
      const thumbUrl = await getWikiThumbnail(item.fileTitle || item.wikiTitle, item.size);
      console.log(`Downloading ${item.filename} from ${thumbUrl.slice(0, 80)}...`);
      await download(thumbUrl, targetPath);
      const stats = fs.statSync(targetPath);
      console.log(`✅ Saved ${item.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`❌ Failed ${item.filename}:`, e.message);
    }
    // Polite delay
    await new Promise((r) => setTimeout(r, 600));
  }
}

run();
