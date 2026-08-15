const https = require('https');
const fs = require('fs');
const execSync = require('child_process').execSync;

const files = [
  { file: 'gw_big_three_versailles.jpg', title: 'File:The_Big_Four_at_Versailles.jpg' },
  { file: 'gw_versailles_cartoon.jpg', title: 'File:Kladderadatsch_1919_Clemenceau_the_Vampire.jpg' },
  { file: 'gw_douglas_haig.jpg', title: 'File:Sir_Douglas_Haig.jpg' },
  { file: 'gw_clemenceau.jpg', title: 'File:Georges_Clemenceau_par_Nadar.jpg' },
  { file: 'gw_woodrow_wilson.jpg', title: 'File:President_Woodrow_Wilson_Harris_&_Ewing_(3x4_cropped_b).jpg' },
  { file: 'gw_khudadad_khan.jpg', title: 'File:Khudadad_Khan_VC.jpg' },
  { file: 'gw_arboretum.jpg', title: 'File:Armed_Forces_Memorial,_NMA.jpg' }
];

async function run() {
  for (const f of files) {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(f.title) + '&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json';
    const res = await new Promise(resolve => {
        https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryBot/1.0 (benlovett.bl@gmail.com)' } }, r => {
            let data = '';
            r.on('data', chunk => data += chunk);
            r.on('end', () => resolve(JSON.parse(data)));
        });
    });
    const pages = res.query.pages;
    const page = Object.values(pages)[0];
    if (page && page.imageinfo && page.imageinfo[0] && page.imageinfo[0].thumburl) {
        const thumburl = page.imageinfo[0].thumburl;
        console.log('Downloading', f.file, 'from', thumburl);
        try {
            execSync(`curl.exe -L -A "Mozilla/5.0" -o public/images/${f.file} "${thumburl}"`);
            console.log('Success:', f.file, 'Size:', fs.statSync('public/images/' + f.file).size);
            if (fs.statSync('public/images/' + f.file).size < 3000) {
                 // Try PowerShell
                 console.log('Curl got 403, trying PowerShell...');
                 execSync(`powershell -Command "Invoke-WebRequest -Uri '${thumburl}' -OutFile 'public/images/${f.file}' -UserAgent 'Mozilla/5.0'"`);
                 console.log('PS Success:', f.file, 'Size:', fs.statSync('public/images/' + f.file).size);
            }
        } catch(e) { console.log('Failed:', f.file, e.message); }
    } else {
        console.log('Could not resolve', f.title);
    }
  }
}
run();
