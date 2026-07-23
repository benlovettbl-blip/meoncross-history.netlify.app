const https = require('https');
const fs = require('fs');

const options = {
  headers: {
    'User-Agent': 'MeoncrossHistoryApp/1.0 (contact@meoncross.edu)'
  }
};

function download(url, dest) {
  https.get(url, options, (response) => {
    if (response.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded to ${dest}`);
      });
    } else {
      console.error(`Failed to download ${url}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${url}: ${err.message}`);
  });
}

download('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Belgian_Troops_with_Early_Gas_Masks.jpg/500px-Belgian_Troops_with_Early_Gas_Masks.jpg', 'public/images/mock_exams/gas_masks.jpg');
download('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Stretcher_bearers_Passchendaele_August_1917.jpg/500px-Stretcher_bearers_Passchendaele_August_1917.jpg', 'public/images/mock_exams/stretcher_bearers.jpg');
