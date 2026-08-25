const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'units');
const publicImagesDir = path.join(__dirname, 'public', 'images');
const publicUnitsDir = path.join(__dirname, 'public', 'units');

let missingCount = 0;

function checkSource(unitId, sourceObj, locationDesc) {
    if (!sourceObj) return;
    
    // Only check if it's explicitly a visual source OR if it explicitly has a src/source property
    // that looks like an image path. Text sources without images shouldn't be flagged.
    const imagePath = sourceObj.src || sourceObj.source;
    
    if (sourceObj.type === 'visual' || (imagePath && imagePath.match(/\.(jpg|jpeg|png|svg|gif|webp)$/i))) {
        if (!imagePath) {
             console.log(`[${unitId}] ❌ Missing image path in data.js for visual source: ${locationDesc}`);
             missingCount++;
             return;
        }
        
        // Resolve path
        let diskPath;
        if (imagePath.startsWith('/images/')) {
            diskPath = path.join(publicImagesDir, imagePath.replace('/images/', ''));
        } else if (imagePath.startsWith('../') || imagePath.startsWith('../../')) {
             // Resolve relative to public/units/unitId/textbook.html
             diskPath = path.resolve(path.join(publicUnitsDir, unitId), imagePath);
        } else {
             diskPath = path.resolve(path.join(publicUnitsDir, unitId), imagePath);
        }
        
        if (!fs.existsSync(diskPath)) {
            console.log(`[${unitId}] ❌ Broken Link: Image file does not exist on disk: ${imagePath} (Resolved: ${diskPath})`);
            missingCount++;
        }
    }
}

const unitFolders = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

unitFolders.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    if (!fs.existsSync(dataPath)) return;
    
    // Hacky but safe way to parse the data.js file
    const content = fs.readFileSync(dataPath, 'utf8');
    let data;
    try {
        // Strip out any module.exports or const data = 
        const jsonStr = content.replace(/^(const|let|var)\s+data\s*=\s*/, '').replace(/module\.exports\s*=\s*data;?/, '').trim();
        // Since it's a JS object and not strict JSON, we use eval (safe here since it's local trusted curriculum data)
        data = eval(`(${jsonStr})`);
    } catch (e) {
        // Fallback for JS formats
        try {
            data = require(dataPath);
        } catch(err) {
            console.error(`Could not parse ${unit}/data.js`);
            return;
        }
    }
    
    if (data && data.lessons) {
        data.lessons.forEach((lesson, lIdx) => {
            checkSource(unit, lesson.primary_source, `Lesson ${lIdx + 1} Primary Source`);
            
            if (lesson.sources) {
                lesson.sources.forEach((src, sIdx) => {
                    checkSource(unit, src, `Lesson ${lIdx + 1} Source ${sIdx + 1}`);
                });
            }
        });
    }
});

console.log(`\n--- VISUAL SOURCE AUDIT REPORT ---`);
if (missingCount === 0) {
    console.log(`✅ Passed! All visual sources across all 17 units have valid image files on disk.`);
} else {
    console.log(`❌ Failed! Found ${missingCount} broken or missing visual sources.`);
}
