import fs from 'fs';
import path from 'path';

const dbPath = 'database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let brokenCount = 0;
let checkedCount = 0;

function checkImage(imgPath, context) {
    if (!imgPath) return;
    
    // Resolve absolute paths (starting with /) against the public folder
    let localPath;
    if (imgPath.startsWith('/')) {
        // e.g. /images/something.jpg -> public/images/something.jpg
        localPath = path.join('public', imgPath.substring(1));
    } else if (imgPath.startsWith('assets/')) {
        // e.g. assets/something.jpg -> public/assets/something.jpg
        localPath = path.join('public', imgPath);
    } else if (imgPath.startsWith('images/')) {
        // e.g. images/something.jpg -> public/images/something.jpg
        localPath = path.join('public', imgPath);
    } else {
        // Just try public/ as a fallback
        localPath = path.join('public', imgPath);
    }
    
    checkedCount++;
    if (!fs.existsSync(localPath)) {
        // Try fallback check in the actual unit's assets folder just in case
        let fallbackPath = path.join('public', 'units', context.unitId, imgPath);
        if (imgPath.startsWith('/units/')) {
            fallbackPath = path.join('public', imgPath.replace('/units/', 'units/'));
        }
        
        if (!fs.existsSync(fallbackPath)) {
            console.error(`[BROKEN] ${context.unitId} (${context.location}): ${imgPath}`);
            brokenCount++;
        }
    }
}

for (const unitId of Object.keys(db)) {
    const unit = db[unitId];
    if (!unit.data) continue;
    
    // Check cover images
    checkImage(unit.data.cover_image, { unitId, location: 'cover_image' });
    checkImage(unit.data.homepage_background, { unitId, location: 'homepage_background' });
    
    // Check lessons
    if (unit.data.lessons) {
        for (let i=0; i<unit.data.lessons.length; i++) {
            const lesson = unit.data.lessons[i];
            if (lesson.narrative_blocks) {
                for (let j=0; j<lesson.narrative_blocks.length; j++) {
                    const block = lesson.narrative_blocks[j];
                    if (block.image) {
                        checkImage(block.image, { unitId, location: `Lesson ${i+1} Block ${j+1}` });
                    }
                }
            }
        }
    }
    
    // Check biographies
    if (unit.biographies) {
        for (let i=0; i<unit.biographies.length; i++) {
            const bio = unit.biographies[i];
            if (bio.image && !bio.image.startsWith('http')) {
                checkImage(bio.image, { unitId, location: `Bio: ${bio.name}` });
            }
        }
    }
}

console.log(`\nChecked ${checkedCount} local images.`);
if (brokenCount === 0) {
    console.log('✅ ALL IMAGES OK!');
} else {
    console.log(`❌ Found ${brokenCount} broken images.`);
}
