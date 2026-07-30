import fs from 'fs';
import path from 'path';

async function fetchWikimediaImageBySearch(name) {
  try {
    // Search for the page first
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&utf8=&format=json`;
    const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'MeoncrossHistoryBot/1.0 (info@meoncross.example)' } });
    const searchData = await searchRes.json();
    
    if (searchData.query && searchData.query.search.length > 0) {
      const bestMatchTitle = searchData.query.search[0].title;
      console.log(`Found page "${bestMatchTitle}" for search "${name}"`);
      
      const thumbUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(bestMatchTitle)}&prop=pageimages&format=json&pithumbsize=500`;
      const thumbRes = await fetch(thumbUrl, { headers: { 'User-Agent': 'MeoncrossHistoryBot/1.0 (info@meoncross.example)' } });
      const thumbData = await thumbRes.json();
      
      const pages = thumbData.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId !== "-1" && pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
      } else {
        console.log(`No thumbnail found for page "${bestMatchTitle}"`);
      }
    } else {
      console.log(`No search results for "${name}"`);
    }
  } catch (e) {
    console.error(`Failed to fetch for ${name}`, e);
  }
  return null;
}

async function downloadImage(url, filename) {
  const filepath = path.join('public/images/weimar_individuals', filename);
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

  let keyIndividuals = dataObj.key_individuals;
  
  // Step 1: Split Rosa Luxemburg and Karl Liebknecht
  const splitIndex = keyIndividuals.findIndex(p => p.name === 'Rosa Luxemburg & Karl Liebknecht');
  if (splitIndex !== -1) {
    const original = keyIndividuals[splitIndex];
    keyIndividuals.splice(splitIndex, 1, 
      {
        group: original.group,
        name: "Rosa Luxemburg",
        bio: original.bio,
        image: "" // will fetch
      },
      {
        group: original.group,
        name: "Karl Liebknecht",
        bio: original.bio,
        image: "" // will fetch
      }
    );
  }

  let modified = true; // Since we might have split Rosa/Karl, just assume modified

  // Step 2: Fetch missing images
  for (let i = 0; i < keyIndividuals.length; i++) {
    const person = keyIndividuals[i];
    if (!person.image) {
      console.log(`Fetching image for ${person.name}...`);
      const imgUrl = await fetchWikimediaImageBySearch(person.name);
      if (imgUrl) {
        const safeName = person.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const filename = `${safeName}.jpg`;
        const localPath = await downloadImage(imgUrl, filename);
        if (localPath) {
          person.image = localPath;
        }
      }
    }
  }

  const stringifiedKeyIndividuals = JSON.stringify(keyIndividuals, null, 8);
  const regex = /"key_individuals":\s*\[[\s\S]*?\n    \]/m;
  const newContent = content.replace(regex, `"key_individuals": ${stringifiedKeyIndividuals.replace(/\n/g, '\n    ')}`);
  fs.writeFileSync(dataPath, newContent, 'utf8');
  console.log('Fixed missing images and separated Rosa and Karl.');
}

run();
