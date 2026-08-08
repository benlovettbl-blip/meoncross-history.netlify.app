const fs = require('fs');

let f = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
let dataStr = f.substring(f.indexOf('export const unitData = ') + 24);
dataStr = dataStr.substring(0, dataStr.lastIndexOf(';') > -1 ? dataStr.lastIndexOf(';') : dataStr.length);
let unit = eval('(' + dataStr + ')');

let lesson = unit.lessons[0];
let allImages = [];

lesson.narrative_blocks.forEach(b => {
    if (b.images) {
        allImages.push(...b.images);
    }
    if (b.image) {
        allImages.push(b.image);
    }
    delete b.images;
    delete b.image;
});

// Keywords function
function getKeywords(img) {
    let str = "";
    if (typeof img === 'string') {
        str = img.split('/').pop().split('.')[0].replace(/_/g, ' ');
    } else {
        str = (img.image_alt || '') + " " + (img.image_caption || '') + " " + (img.image_context || '') + " " + (img.image || '').split('/').pop().split('.')[0].replace(/_/g, ' ');
    }
    // basic stop words
    let stops = ['the', 'and', 'a', 'to', 'of', 'in', 'is', 'that', 'it', 'for', 'on', 'with', 'as', 'by', 'this', 'from', 'an', 'are'];
    let words = str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stops.includes(w));
    return [...new Set(words)];
}

allImages.forEach(img => {
    let imgWords = getKeywords(img);
    let bestBlock = -1;
    let bestScore = -1;
    
    lesson.narrative_blocks.forEach((b, idx) => {
        let blockText = (b.title + " " + (b.text || '')).toLowerCase();
        let score = 0;
        imgWords.forEach(w => {
            if (blockText.includes(w)) {
                score++;
            }
        });
        if (score > bestScore) {
            bestScore = score;
            bestBlock = idx;
        }
    });
    
    console.log(`Image: ${typeof img === 'string' ? img : img.image}`);
    console.log(`  Keywords: ${imgWords.join(', ')}`);
    console.log(`  Best Block: ${bestBlock > -1 ? lesson.narrative_blocks[bestBlock].title : 'None'} (Score: ${bestScore})`);
});
