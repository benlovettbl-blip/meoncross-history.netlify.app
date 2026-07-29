import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\2d5f43d2-d4cd-4242-9cb7-3f062ffb8878';
const destDir = 'c:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\public\\assets';

const files = fs.readdirSync(brainDir);

const prefixes = [
  'card_bengurion', 'card_hussein', 'card_dayan',
  'card_eshkol', 'card_golda', 'card_arafat', 'card_sharon', 'card_rabin'
];

prefixes.forEach(prefix => {
  // Sort files to get the newest one if multiple attempts were made
  const matchingFiles = files.filter(f => f.startsWith(prefix + '_')).sort().reverse();
  if (matchingFiles.length > 0) {
    fs.copyFileSync(path.join(brainDir, matchingFiles[0]), path.join(destDir, prefix + '.png'));
    console.log("Copied: " + prefix + '.png');
  }
});

console.log("Copied all new card images to public/assets");
