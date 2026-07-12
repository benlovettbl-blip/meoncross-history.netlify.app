const https = require('https');

async function testUrl(url) {
  const ua = 'EdexcelHistoryStudyApp/1.0 (studyapp@gmail.com)';
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': ua } }, (res) => {
      console.log(`URL: ${url} -> Status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`URL: ${url} -> Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  await testUrl('https://upload.wikimedia.org/wikipedia/commons/3/3c/Camp_David%2C_Menachem_Begin%2C_Anwar_Sadat%2C_1978.jpg');
  await testUrl('https://upload.wikimedia.org/wikipedia/commons/b/b0/Sadat_and_Begin_clean3.jpg');
  await testUrl('https://upload.wikimedia.org/wikipedia/commons/2/22/Anwar_Sadat_Jimmy_Carter_Menachem_Begin_sign_Camp_David_Accords-1978.jpg');
  await testUrl('https://upload.wikimedia.org/wikipedia/commons/e/e0/Sadat_Carter_Begin_Camp_David_1978.jpg');
}

run();
