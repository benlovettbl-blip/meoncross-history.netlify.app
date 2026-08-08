const fs = require('fs');

let f = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');

// The Mansa Musa image is currently inside narrative_blocks[0] (Micro-History: A Venetian Merchant’s Shock)
// We need to move it to narrative_blocks[3] (West Africa: Kingdoms of Gold and Brass)

// Find the Mansa Musa image block
const mansaRegex = /,\s*"images":\s*\[\s*\{\s*"image":\s*"\/images\/mansa_musa_catalan\.jpg"[\s\S]*?"source_letter":\s*"A"\s*\}\s*\]/g;

let extractedImagesBlock = '';
f = f.replace(mansaRegex, (match) => {
    extractedImagesBlock = match;
    return ''; // Remove it from block 0
});

// Now insert it into Block 3 (West Africa: Kingdoms of Gold and Brass)
// Let's find the text for block 3
const westAfricaRegex = /"title":\s*"West Africa: Kingdoms of Gold and Brass",\s*"text":\s*"Far to the south, sub-Saharan Africa boasted civilizations whose wealth rivaled anything in Europe\.<br><ul><li><strong>The Kingdom of Benin \(Edo Empire\):<\/strong> In modern-day Nigeria, the Oba \(King\) of Benin ruled a sprawling, highly organized state protected by thousands of miles of earthwork walls—structures larger than the Great Wall of China\. Benin’s craftsmen produced world-famous bronze relief sculptures using the complex lost-wax casting technique, depicting a sophisticated courtly culture\.<\/li><li><strong>The Empire of Mali:<\/strong> Built on vast trans-Saharan trade routes, Mali was world-renowned for its gold reserves\. Just a century earlier, Mali’s emperor, Mansa Musa, made a pilgrimage to Mecca carrying so much gold that he gave it away in Cairo, causing hyperinflation and knocking down the value of gold across the Middle East for a decade\.<\/li><\/ul>",\s*"image":\s*"\/images\/benin_bronze\.jpg"/;

f = f.replace(westAfricaRegex, (match) => {
    return match + extractedImagesBlock;
});

fs.writeFileSync('public/units/early_modern_world/data.js', f, 'utf8');
console.log('Fixed Mansa Musa image location in data.js!');
