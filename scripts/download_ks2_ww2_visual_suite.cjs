/**
 * scripts/download_ks2_ww2_visual_suite.cjs
 *
 * Downloads high-res authentic archival visual support plates for KS2 WW2.
 * Adheres strictly to Wikimedia Commons API and User-Agent policies.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
  // Lesson 1 Block 1: Neville Chamberlain
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Neville-Chamberlain.jpg',
    file: 'public/units/ks2_ww2/assets/neville_chamberlain_1939.jpg'
  },
  // Lesson 4 Block 1: St Paul's Survives Blitz
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/St_Paul%27s_Survives.jpg',
    file: 'public/units/ks2_ww2/assets/st_pauls_survives_blitz_1940.jpg'
  },
  // Lesson 4 Block 2: Morrison Shelter Indoor
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Morrison_Shelter_on_Trial-_Testing_the_New_Indoor_Shelter%2C_1941_D2293.jpg',
    file: 'public/units/ks2_ww2/assets/morrison_shelter_indoor_1941.jpg'
  },
  // Lesson 5 Block 2: Housewife Ration Book at Grocer
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Customer_making_a_purchase_in_a_grocery_shop_during_the_Second_World_War._D2374.jpg',
    file: 'public/units/ks2_ww2/assets/housewife_ration_book_grocer_1941.jpg'
  },
  // Lesson 5 Block 3: Dig for Victory Kensington Gardens
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Dig_For_Victory-_Working_on_An_Allotment_in_Kensington_Gardens%2C_London%2C_1942_D8334.jpg',
    file: 'public/units/ks2_ww2/assets/dig_for_victory_allotment_london_1942.jpg'
  },
  // Lesson 6 Block 1: Women Aircraft Workers
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Aircraft_Production_During_the_Second_World_War_%28IWM_COL_46%29.jpg',
    file: 'public/units/ks2_ww2/assets/women_aircraft_workers_ww2.jpg'
  },
  // Lesson 8 Block 2: Alan Turing Portrait
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    file: 'public/units/ks2_ww2/assets/alan_turing_portrait.jpg'
  },
  // Lesson 8 Block 3: Bletchley Park Hut 8 Office
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Alan_Turing%27s_Office_in_Hut_8_at_Bletchley_Park_-_geograph.org.uk_-_5111900.jpg',
    file: 'public/units/ks2_ww2/assets/bletchley_park_hut_8_office.jpg'
  },
  // Lesson 9 Block 1: Nicholas Winton in 1938
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Nicholas_Winton_%281909-2015%29_in_1938_by_the_Associated_Press.jpg',
    file: 'public/units/ks2_ww2/assets/nicholas_winton_1938_portrait.jpg'
  },
  // Lesson 10 Block 1: Churchill VE Day Whitehall
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Winston_Churchill_waves_to_crowds_in_Whitehall_in_London_as_they_celebrate_VE_Day%2C_8_May_1945._H41849.jpg',
    file: 'public/units/ks2_ww2/assets/churchill_ve_day_whitehall_1945.jpg'
  },
  // Lesson 10 Block 2: VE Day Celebrations in London
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Ve_Day_Celebrations_in_London%2C_England%2C_UK%2C_8_May_1945_D24584.jpg',
    file: 'public/units/ks2_ww2/assets/ve_day_celebrations_london_1945.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TheHistoryRevisionHub/1.0 (https://the-history-revision-hub.netlify.app; contact@thehistoryrevisionhub.org)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => {
          resolve(fs.statSync(dest).size);
        });
      });
    }).on('error', reject);
  });
}

(async () => {
  const assetsDir = path.resolve(__dirname, '..', 'public/units/ks2_ww2/assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  for (const d of downloads) {
    const fullPath = path.resolve(__dirname, '..', d.file);
    process.stdout.write(`Downloading ${d.file}... `);
    try {
      const size = await download(d.url, fullPath);
      console.log(`Saved ${(size / 1024).toFixed(1)} KB`);
      // Also copy to units/ks2_ww2/assets for local build parity
      const localCopy = fullPath.replace('public\\units\\ks2_ww2\\assets', 'units\\ks2_ww2\\assets')
                                .replace('public/units/ks2_ww2/assets', 'units/ks2_ww2/assets');
      fs.copyFileSync(fullPath, localCopy);
    } catch (err) {
      console.error(`Failed: ${err.message}`);
    }
  }
  console.log('🎉 Finished downloading KS2 WW2 visual suite!');
})();
