const https = require('https');
const fs = require('fs');

const downloads = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/An_Air_Raid_Precautions_Warden_reports_for_duty_to_the_Chief_Warden_at_his_local_ARP_post_in_Springfield%2C_Essex%2C_aUGUST_1941._D4263.jpg',
    dest: 'public/units/ks2_ww2/assets/arp_warden_duty_1941.jpg',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/MaureenPopp.jpg',
    dest: 'public/units/ks2_ww2/assets/ata_pilot_maureen_dunlop.jpg',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Women_in_Bletchley_Park.jpg',
    dest: 'public/units/ks2_ww2/assets/bletchley_park_wrens.jpg',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/The_Cenotaph_at_Whitehall%2C_1920_Q31488.jpg',
    dest: 'public/units/ks2_ww2/assets/cenotaph_whitehall_remembrance.jpg',
  },
];

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(item.dest);
    https
      .get(
        item.url,
        {
          headers: {
            'User-Agent':
              'TheHistoryRevisionHubBot/2.0 (https://the-history-revision-hub.netlify.app; contact@historyhub.org) Node/20',
          },
        },
        (response) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            https
              .get(
                response.headers.location,
                {
                  headers: {
                    'User-Agent':
                      'TheHistoryRevisionHubBot/2.0 (https://the-history-revision-hub.netlify.app; contact@historyhub.org) Node/20',
                  },
                },
                (redirectResponse) => {
                  redirectResponse.pipe(file);
                  file.on('finish', () => {
                    file.close();
                    resolve();
                  });
                },
              )
              .on('error', reject);
          } else {
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          }
        },
      )
      .on('error', reject);
  });
}

async function run() {
  for (const item of downloads) {
    console.log('Downloading: ' + item.dest);
    await downloadFile(item);
    console.log('Done: ' + item.dest + ' (size: ' + fs.statSync(item.dest).size + ' bytes)');
  }
}

run();
