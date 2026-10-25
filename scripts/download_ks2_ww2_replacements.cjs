/**
 * scripts/download_ks2_ww2_replacements.cjs
 *
 * Downloads replacement authentic visual support plates for KS2 WW2 to ensure
 * ZERO duplicates with primary sources and 100% visual truthfulness.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const replacements = [
  // 1. Blackout Kerb Precautions (IWM D 2734) - Replaces duplicate gas mask in L1
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Blackout_Precautions_For_Drivers%2C_London%2C_England%2C_1941_D2734.jpg',
    file: 'public/units/ks2_ww2/assets/blackout_kerb_precautions_london_1941.jpg'
  },
  // 2. Devon Farm Evacuee Feeding Pigs (IWM D 2472) - Replaces duplicate station photo in L2
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Evacuee_Tony_Ponsford_feeds_the_pigs_at_Dartington_School_Farm%2C_Totnes%2C_Devon_during_1941._D2472.jpg',
    file: 'public/units/ks2_ww2/assets/evacuee_feeding_farm_pigs_devon_1941.jpg'
  },
  // 3. Women Munitions Workers Inspecting Shells (TWAM DX1529/1) - Replaces duplicate ATA pilot in L6
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Inspecting_gun_shells_%2829340541775%29.jpg',
    file: 'public/units/ks2_ww2/assets/women_munitions_workers_inspecting_shells_1942.jpg'
  },
  // 4. Nazi Anti-Jewish Boycott Berlin 1933 (Bundesarchiv Bild 102-14468) - Replaces duplicate school ban card in L7
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bundesarchiv_Bild_102-14468%2C_Berlin%2C_NS-Boykott_gegen_j%C3%BCdische_Gesch%C3%A4fte.jpg',
    file: 'public/units/ks2_ww2/assets/nazi_boycott_jewish_shops_berlin_1933.jpg'
  },
  // 5. Alan Turing 1936 Princeton Portrait - Adult mathematician photo for L8
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Alan_Turing_%281912-1954%29_in_1936_at_Princeton_University.jpg',
    file: 'public/units/ks2_ww2/assets/alan_turing_portrait.jpg'
  },
  // 6. Nicholas Winton Memorial Statue at Prague Main Railway Station - Replaces duplicate scrapbook card in L9
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Nicholas_Winton_Memorial_on_main_railway_station_in_Prague.jpg',
    file: 'public/units/ks2_ww2/assets/nicholas_winton_memorial_prague_station.jpg'
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
  for (const r of replacements) {
    const fullPath = path.resolve(__dirname, '..', r.file);
    process.stdout.write(`Downloading ${r.file}... `);
    try {
      const size = await download(r.url, fullPath);
      console.log(`Saved ${(size / 1024).toFixed(1)} KB`);
      // Also copy to units/ks2_ww2/assets
      const localCopy = fullPath.replace('public\\units\\ks2_ww2\\assets', 'units\\ks2_ww2\\assets')
                                .replace('public/units/ks2_ww2/assets', 'units/ks2_ww2/assets');
      fs.copyFileSync(fullPath, localCopy);
    } catch (err) {
      console.error(`Failed: ${err.message}`);
    }
  }
  console.log('🎉 Finished downloading replacement visual assets!');
})();
