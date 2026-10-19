const fs = require('fs');
const path = require('path');
const https = require('https');

const downloads = [
  {
    name: 've_day_children_table_1945.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Ve_Day_in_London%2C_8_May_1945_HU49414.jpg',
    source: 'Imperial War Museum HU 49414 (Battersea, London, 8 May 1945)',
  },
  {
    name: 'tube_station_shelter_1940.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Shelterers_in_Swiss_Cottage_tube_station%2C_c._1940s.jpg',
    source: 'London Transport / Imperial War Museum (Swiss Cottage Tube Station, 1940)',
  },
  {
    name: 'ration_book_coupons_1940.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Child%27s_ration_book_%28A%29%2C_Ministry_of_Food_Wellcome_L0072436.jpg',
    source: "Ministry of Food / Wellcome Collection L0072436 (Child's Ration Book with Coupons)",
  },
  {
    name: 'land_army_poster_1941.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Come_and_help_with_the_VICTORY_HARVEST.jpg',
    source: "Ministry of Agriculture / HMSO (Women's Land Army Victory Harvest Recruitment Poster)",
  },
  {
    name: 'gas_mask_box_1939.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Respirator_%28AM_1995.59.20-1%29.jpg',
    source:
      'Ministry of Home Security / Auckland War Memorial Museum AM 1995.59.20 (British Civilian Respirator & Cardboard Box)',
  },
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, '..', 'scratch', item.name);
    const file = fs.createWriteStream(dest);
    console.log(`Downloading ${item.name} from ${item.url}...`);
    https
      .get(
        item.url,
        { headers: { 'User-Agent': 'HistoryEducationalApp/1.0 (education@historyhub.org)' } },
        (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            https
              .get(
                res.headers.location,
                { headers: { 'User-Agent': 'HistoryEducationalApp/1.0' } },
                (res2) => {
                  res2.pipe(file);
                  file.on('finish', () => {
                    file.close();
                    resolve(dest);
                  });
                },
              )
              .on('error', reject);
          } else if (res.statusCode === 200) {
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve(dest);
            });
          } else {
            reject(new Error(`Failed with status ${res.statusCode}`));
          }
        },
      )
      .on('error', reject);
  });
}

async function run() {
  if (!fs.existsSync(path.join(__dirname, '..', 'scratch'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'scratch'));
  }
  for (const item of downloads) {
    try {
      const p = await download(item);
      const stat = fs.statSync(p);
      console.log(`✅ Saved ${item.name} (${stat.size} bytes)`);
    } catch (e) {
      console.error(`❌ Error downloading ${item.name}:`, e.message);
    }
  }
}

run();
