const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Clement_Attlee%2C_Harry_S._Truman%2C_and_Joseph_Stalin_at_the_Potsdam_Conference%2C_July_1945%2C_USA_C-1860_%2826246410746%29.jpg',
    file: 'public/images/cold_war/potsdam_conference_1945.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Bundesarchiv_Bild_183-M1015-331%2C_Berlin%2C_zerst%C3%B6rtes_Brandenburger_Tor_und_Reichstagsgeb%C3%A4ude.jpg',
    file: 'public/images/cold_war/berlin_ruins_brandenburg_gate_1945.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Bundesarchiv_Bild_183-20671-0013%2C_Recklinghausen%2C_Marshallplan_im_Ruhrgebiet.jpg',
    file: 'public/images/cold_war/marshall_plan_aid_germany_1948.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Meeting_of_the_Executive_Committee_of_the_National_Security_Council-_Cuba_Crisis._President_Kennedy%2C_Secretary_of..._-_NARA_-_194246.jpg',
    file: 'public/images/cold_war/jfk_excomm_cabinet_room_1962.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/P-2H_Neptune_over_Soviet_ship_Oct_1962.jpg',
    file: 'public/images/cold_war/us_navy_p2_neptune_cuban_missile_1962.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Carrying_scaling_ladders%2C_U.S._Marines_in_landing_crafts_head_for_the_seawall_at_Inchon_HD-SN-99-03077.jpg',
    file: 'public/images/cold_war/korean_war_inchon_landing_1950.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/CIA%2C_Conrad_Schumanns_Sprung_in_die_Freiheit%2C_August_1961_%28cropped%29_1.jpg',
    file: 'public/images/cold_war/conrad_schumann_berlin_wall_leap_1961.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/President_Ronald_Reagan_and_Soviet_General_Secretary_Gorbachev_at_The_First_Summit_in_Geneva_Switzerland_-_DPLA_-_b534f3d00bb05c3cc293789b180d2116.jpg',
    file: 'public/images/cold_war/reagan_gorbachev_geneva_summit_1985.jpg'
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
  for (const d of downloads) {
    const fullPath = path.resolve(__dirname, '..', d.file);
    process.stdout.write(`Downloading ${d.file}... `);
    try {
      const size = await download(d.url, fullPath);
      console.log(`Saved ${(size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`Failed: ${err.message}`);
    }
  }
  console.log('🎉 Finished downloading Cold War visual suite!');
})();
