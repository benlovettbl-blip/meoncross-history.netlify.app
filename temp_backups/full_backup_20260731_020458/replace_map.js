const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const url = "https://en.wikipedia.org/w/api.php?action=query&titles=File:UN_Partition_Plan_For_Palestine_1947.svg&prop=imageinfo&iiprop=url&format=json";

const options = {
  headers: {
    'User-Agent': 'AntigravityIDEBot/1.0 (contact: agent@example.com)'
  }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        const pages = json.query.pages;
        const page = Object.values(pages)[0];
        const imageUrl = page.imageinfo[0].url;
        
        console.log("Downloading from: " + imageUrl);
        
        const dest = path.join(__dirname, 'public/units/cme_new/assets/UN_Partition_Plan_For_Palestine_1947.svg');
        const file = fs.createWriteStream(dest);
        
        https.get(imageUrl, options, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log("Downloaded map to " + dest);
                
                // Update data.js
                const dataPath = path.join(__dirname, 'public/units/cme_new/data.js');
                let content = fs.readFileSync(dataPath, 'utf8');
                
                // Replace references to the old map
                content = content.replace(/\/assets\/cme_new_palestine_1947_map\.png/g, '/units/cme_new/assets/UN_Partition_Plan_For_Palestine_1947.svg');
                
                fs.writeFileSync(dataPath, content);
                console.log("Updated data.js");
                
                // Sync
                execSync('npm run sync', { stdio: 'inherit' });
            });
        });
    });
}).on('error', (e) => {
    console.error(e);
});
