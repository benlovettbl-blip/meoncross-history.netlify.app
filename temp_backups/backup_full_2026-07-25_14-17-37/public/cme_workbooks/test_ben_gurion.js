const https = require('https');

function test(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'EdexcelHistoryStudyApp/1.0 (studyapp@gmail.com)' } }, (res) => {
      console.log(`${url} -> ${res.statusCode}`);
      resolve();
    }).on('error', (err) => {
      console.log(`${url} -> Error: ${err.message}`);
      resolve();
    });
  });
}

test('https://upload.wikimedia.org/wikipedia/commons/a/a9/David_Ben-Gurion_in_1952.jpg');
test('https://upload.wikimedia.org/wikipedia/commons/b/b8/David_Ben_Gurion_head_cropped_1948.jpg');
test('https://upload.wikimedia.org/wikipedia/commons/e/ea/David_Ben_Gurion_head_cropped_1948.jpg');
