import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\2d5f43d2-d4cd-4242-9cb7-3f062ffb8878';
const destDir = 'c:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\public\\assets';

const files = fs.readdirSync(brainDir);

const nasserFile = files.find(f => f.startsWith('nasser_pail_kid_'));
const balfourFile = files.find(f => f.startsWith('balfour_pail_kid_'));
const carterFile = files.find(f => f.startsWith('carter_pail_kid_'));

if (nasserFile) fs.copyFileSync(path.join(brainDir, nasserFile), path.join(destDir, 'card_nasser.png'));
if (balfourFile) fs.copyFileSync(path.join(brainDir, balfourFile), path.join(destDir, 'card_balfour.png'));
if (carterFile) fs.copyFileSync(path.join(brainDir, carterFile), path.join(destDir, 'card_carter.png'));

console.log("Copied card images to public/assets");
