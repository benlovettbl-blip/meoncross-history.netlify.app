const fs = require('fs');
const path = require('path');

const historiansMap = {
  "Kritovoulos of Imbros": "Kritoboulos",
  "Dr. Geoffrey Parker": "Geoffrey Parker historian",
  "Prof. Christopher Hill": "Christopher Hill historian",
  "Reginald Coupland": "Reginald Coupland",
  "Prof. Roy Porter": "Roy Porter historian",
  "Prof. J.C.D. Clark": "J.C.D. Clark"
};

async function fetchMissing() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  for (const [name, query] of Object.entries(historiansMap)) {
    console.log(`Searching Commons for ${name}...`);
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
    
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      const res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/1.2' } });
      const data = await res.json();
      
      if (data.query.search && data.query.search.length > 0) {
        // Take the first result
        const fileTitle = data.query.search[0].title;
        console.log(`Found file on Commons: ${fileTitle}`);
        
        // Now get the image url
        const imgApiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;
        const imgRes = await fetch(imgApiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/1.2' } });
        const imgData = await imgRes.json();
        
        const pages = imgData.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
           const imageUrl = pages[pageId].imageinfo[0].thumburl;
           console.log(`Downloading: ${imageUrl}`);
           
           const dlRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
           const buffer = await dlRes.arrayBuffer();
           
           const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
           const filename = `${safeName}.jpg`;
           const dest = path.join(imagesDir, filename);
           
           fs.writeFileSync(dest, Buffer.from(buffer));
           console.log(`Saved as ${filename}`);
        }
      } else {
        console.log(`No image found on Commons for ${query}`);
      }
    } catch (err) {
      console.error(`Error for ${name}:`, err.message);
    }
  }
}
fetchMissing().catch(console.error);
