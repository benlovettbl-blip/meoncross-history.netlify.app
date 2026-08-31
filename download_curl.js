const { execSync } = require('child_process');

const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zhenghe-sailing-chart.gif/500px-Zhenghe-sailing-chart.gif', dest: 'public/images/zheng_he.gif' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Elizabeth_I_%28Armada_Portrait%29.jpg/500px-Elizabeth_I_%28Armada_Portrait%29.jpg', dest: 'public/images/armada_portrait.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/North_carolina_algonkin-dorf.jpg/500px-North_carolina_algonkin-dorf.jpg', dest: 'public/images/secoton.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Gunpowder_Plot_Conspirators%2C_1605_from_NPG.jpg/500px-The_Gunpowder_Plot_Conspirators%2C_1605_from_NPG.jpg', dest: 'public/images/gunpowder.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Paul_van_Somer_-_King_James_I_of_England_-_WGA21637.jpg/500px-Paul_van_Somer_-_King_James_I_of_England_-_WGA21637.jpg', dest: 'public/images/james_i.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Byrsa_Londinensis_vulgo_the_Royal_Exchange_%28Royal_Exchange%2C_London%29_MET_DP823174.jpg/500px-Byrsa_Londinensis_vulgo_the_Royal_Exchange_%28Royal_Exchange%2C_London%29_MET_DP823174.jpg', dest: 'public/images/royal_exchange.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Slaveshipposter.jpg/500px-Slaveshipposter.jpg', dest: 'public/images/brookes.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cape_coast_castle.jpg/500px-Cape_coast_castle.jpg', dest: 'public/images/cape_coast.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png/500px-William_Hogarth_-_Industry_and_Idleness%2C_Plate_1%3B_The_Fellow_%27Prentices_at_their_Looms.png', dest: 'public/images/industry_idleness.png' }
];

for (const item of urls) {
  console.log(`Downloading ${item.dest}...`);
  execSync(`curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" "${item.url}" -o ${item.dest}`);
}
console.log("All downloads complete!");
