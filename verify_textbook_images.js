const fs = require('fs');
const path = require('path');

const publicUnitsDir = path.join(__dirname, 'public', 'units');
const publicDir = path.join(__dirname, 'public');

let totalTextbooks = 0;
let errors = [];

function checkTextbook(unitFolder) {
    const tbPath = path.join(publicUnitsDir, unitFolder, 'textbook.html');
    if (!fs.existsSync(tbPath)) return;
    
    totalTextbooks++;
    const content = fs.readFileSync(tbPath, 'utf8');
    
    // 1. Check for empty source containers
    // A source container without an img tag but WITH a caption or marker
    const sourceContainers = content.split('class="source-container"').slice(1);
    sourceContainers.forEach((container, i) => {
        // We only care about the content up to the closing div... roughly.
        // Actually it's easier to just use a simple regex on the whole document.
    });
    
    // Better regex for empty source containers:
    // Look for <div class="source-container"... and then no <img inside it before the next </div>
    const srcRegex = /<div class="source-container"[^>]*>([\s\S]*?)<\/div>/g;
    let match;
    while ((match = srcRegex.exec(content)) !== null) {
        const inner = match[1];
        if (inner.includes('source-caption') && !inner.includes('<img')) {
            // It has a caption but NO image!
            const captionMatch = inner.match(/<div class="source-caption">(.*?)<\/div>/);
            const caption = captionMatch ? captionMatch[1] : 'Unknown';
            errors.push(`[${unitFolder}] Empty Source Box (No image): ${caption}`);
        }
    }
    
    // 2. Check for broken image links
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(content)) !== null) {
        let src = imgMatch[1];
        let diskPath = '';
        
        if (src.startsWith('/')) {
            diskPath = path.join(publicDir, src);
        } else if (src.startsWith('../..')) {
            // e.g. ../../images/foo.jpg from public/units/unit_name/
            diskPath = path.resolve(path.join(publicUnitsDir, unitFolder), src);
        } else {
            // Just assume relative to textbook
            diskPath = path.resolve(path.join(publicUnitsDir, unitFolder), src);
        }
        
        if (!fs.existsSync(diskPath)) {
             errors.push(`[${unitFolder}] Broken Image Link: ${src}`);
        }
    }
}

const unitDirs = fs.readdirSync(publicUnitsDir).filter(f => fs.statSync(path.join(publicUnitsDir, f)).isDirectory());

unitDirs.forEach(folder => {
    checkTextbook(folder);
});

console.log(`\n--- TEXTBOOK QA AUDIT REPORT ---`);
console.log(`Checked ${totalTextbooks} textbooks.`);
if (errors.length === 0) {
    console.log(`✅ Passed! All source boxes have images and all image links are valid.`);
} else {
    console.log(`❌ Failed! Found ${errors.length} issues:`);
    errors.forEach(e => console.log(`  - ${e}`));
}
