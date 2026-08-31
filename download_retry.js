const { execSync } = require('child_process');

const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Byrsa_Londinensis_vulgo_the_Royal_Exchange_%28Royal_Exchange%2C_London%29_MET_DP823174.jpg/500px-Byrsa_Londinensis_vulgo_the_Royal_Exchange_%28Royal_Exchange%2C_London%29_MET_DP823174.jpg', dest: 'public/images/royal_exchange.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cape_coast_castle.jpg/500px-Cape_coast_castle.jpg', dest: 'public/images/cape_coast.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png/500px-William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png', dest: 'public/images/industry_idleness.png' }
];

async function run() {
  for (const item of urls) {
    console.log(`Downloading ${item.dest}...`);
    try {
      execSync(`curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${item.url}" -o ${item.dest}`);
      console.log(`Success for ${item.dest}`);
    } catch (e) {
      console.error(`Failed to download ${item.dest}:`, e.message);
    }
    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

run();
