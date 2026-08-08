const fs = require('fs');

let f = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');

// We need to parse and write data.js back cleanly.
// Since it's a JS file, we'll extract the JSON, modify it, and put it back.
let prefix = f.substring(0, f.indexOf('export const unitData = ') + 24);
let jsonStr = f.substring(f.indexOf('export const unitData = ') + 24);
let suffix = '';
if (jsonStr.lastIndexOf(';') > -1) {
    suffix = jsonStr.substring(jsonStr.lastIndexOf(';'));
    jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(';'));
}

let unit = eval('(' + jsonStr + ')');

unit.lessons.forEach(lesson => {
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(block => {
            if (block.images && block.image) {
                // It has both! We need to merge them.
                let newImgObj = {
                    image: block.image,
                };
                if (block.image_alt) newImgObj.image_alt = block.image_alt;
                if (block.image_context) newImgObj.image_context = block.image_context;
                if (block.image_caption) newImgObj.image_caption = block.image_caption;
                if (block.source_letter) newImgObj.source_letter = block.source_letter;
                
                // Add to the front of images array
                block.images.unshift(newImgObj);
                
                // Delete the loose properties
                delete block.image;
                delete block.image_alt;
                delete block.image_context;
                delete block.image_caption;
                delete block.source_letter;
            }
        });
    }
});

let newJsonStr = JSON.stringify(unit, null, 2);
fs.writeFileSync('public/units/early_modern_world/data.js', prefix + newJsonStr + suffix, 'utf8');
console.log('Fixed conflicting image properties in early_modern_world data.js!');
