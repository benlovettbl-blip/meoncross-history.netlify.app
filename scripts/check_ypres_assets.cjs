const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('units/trip_ypres/data.js', 'utf8');
const regex = /['"]([^'"]+\.(?:jpg|jpeg|png|svg|webp|gif))['"]/gi;
const matches = [];
let m;
while ((m = regex.exec(content)) !== null) {
  matches.push(m[1]);
}

const unique = Array.from(new Set(matches));
console.log(`Found ${unique.length} unique image paths in units/trip_ypres/data.js`);

let missing = 0;
unique.forEach((img) => {
  const cleanPath = img.startsWith('/') ? img.slice(1) : img;
  const p1 = path.join('public', cleanPath);
  const p2 = cleanPath;
  if (!fs.existsSync(p1) && !fs.existsSync(p2)) {
    console.error(`❌ MISSING: ${img}`);
    missing++;
  } else {
    console.log(`✅ OK: ${img}`);
  }
});

console.log(`\nAudit complete: ${missing} missing images.`);
