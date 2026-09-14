const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'units', 'medieval_england', 'textbook.html'), 'utf8');

const chapters = html.match(/Chapter \d+:[^<]+/g) || [];
console.log('Chapters found in textbook.html:', chapters.length);
chapters.forEach((c) => console.log('  -', c.trim()));

const imgMatches = html.match(/src=["'][^"']+["']/g) || [];
const imgs = imgMatches.map((s) => s.replace(/^src=["']/, '').replace(/["']$/, ''));
console.log('\nImages referenced in textbook.html:', imgs.length);

let missingCount = 0;
imgs.forEach((src) => {
  let cleanSrc = src.replace(/^\.\.\/\.\.\//, '').replace(/^\//, '');
  const exists =
    fs.existsSync(path.join(ROOT, cleanSrc)) || fs.existsSync(path.join(ROOT, 'public', cleanSrc));
  if (!exists) {
    console.warn(`  ❌ Missing image: ${src} (checked ${cleanSrc} and public/${cleanSrc})`);
    missingCount++;
  } else {
    console.log(`  ✅ ${src}`);
  }
});

console.log(`\nImage check finished: ${missingCount} missing.`);
