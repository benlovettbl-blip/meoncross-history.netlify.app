const { execSync } = require('child_process');
const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Facsimile_of_Tuesday%2C_23rd_October%2C_1770_%28Cook%27s_journal%29.jpg', dest: 'public/images/aus_cook_journal.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/First_Fleet_entering_Sydney_1788_Bradley.jpg', dest: 'public/images/aus_first_fleet.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Sydney_Cove_Port_Jackson.jpg', dest: 'public/images/aus_sydney_cove.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/The_Gold_Diggings_of_Victoria_%281852%29.jpg', dest: 'public/images/aus_gold_rush.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Aborigines_Claim_Citizen_Rights_-_Day_of_Mourning_broadsheet%2C_1938.jpg', dest: 'public/images/aus_day_of_mourning.jpg' }
];

for (const item of urls) {
  console.log('Downloading ' + item.dest + '...');
  execSync('curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)" "' + item.url + '" -o ' + item.dest);
  execSync('node -e "setTimeout(()=>{}, 4000)"');
}
console.log('All downloads complete!');
