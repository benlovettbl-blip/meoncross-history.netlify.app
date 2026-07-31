import fs from 'fs';
import path from 'path';

async function fetchWikimediaImage(name) {
  try {
    let queryName = name;
    if (name.includes('&')) {
      queryName = name.split('&')[0].trim();
    }
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(queryName)}&prop=pageimages&format=json&pithumbsize=500`;
    const res = await fetch(url, { headers: { 'User-Agent': 'MeoncrossHistoryBot/1.0 (info@meoncross.example)' } });
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (e) {
    console.error(`Failed to fetch for ${name}`, e);
  }
  return null;
}

async function downloadImage(url, filename) {
  const filepath = path.join('public/images/weimar_individuals', filename);
  if (fs.existsSync(filepath)) {
    return `/images/weimar_individuals/${filename}`;
  }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'MeoncrossHistoryBot/1.0 (info@meoncross.example)' } });
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`Downloaded ${filename}`);
    return `/images/weimar_individuals/${filename}`;
  } catch (e) {
    console.error(`Failed to download ${url}`, e);
  }
  return null;
}

async function run() {
  const dataPath = 'weimar_nazi_germany/data.js';
  let content = fs.readFileSync(dataPath, 'utf8');
  let dataObj;
  try {
    dataObj = eval('(function(){ ' + content.replace(/export\s+const\s+unitData\s*=\s*/, 'return ') + '})()');
  } catch (e) {
    console.error("Failed to parse data.js", e);
    process.exit(1);
  }

  let modified = false;
  for (let i = 0; i < dataObj.key_individuals.length; i++) {
    const person = dataObj.key_individuals[i];
    if (!person.image) {
      console.log(`Fetching image for ${person.name}...`);
      const imgUrl = await fetchWikimediaImage(person.name);
      if (imgUrl) {
        const safeName = person.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const filename = `${safeName}.jpg`;
        const localPath = await downloadImage(imgUrl, filename);
        if (localPath) {
          person.image = localPath;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    const stringifiedKeyIndividuals = JSON.stringify(dataObj.key_individuals, null, 8);
    const regex = /"key_individuals":\s*\[[\s\S]*?\n    \]/m;
    const newContent = content.replace(regex, `"key_individuals": ${stringifiedKeyIndividuals.replace(/\n/g, '\n    ')}`);
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Fixed missing images.');
  } else {
    console.log('No missing images found or fetched.');
  }
}

run();
