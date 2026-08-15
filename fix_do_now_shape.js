const fs = require('fs');
const path = require('path');

const unitsToFix = [
    {
        path: path.join(__dirname, 'weimar_nazi_germany', 'data.js'),
        isESModule: false
    },
    {
        path: path.join(__dirname, 'public', 'units', 'cme_new', 'data.js'),
        isESModule: true
    },
    {
        path: path.join(__dirname, 'eee', 'data.js'),
        isESModule: false
    }
];

for (const unit of unitsToFix) {
    console.log(`Fixing ${unit.path}...`);
    let code = fs.readFileSync(unit.path, 'utf8');
    
    let data;
    let match;
    
    if (unit.isESModule) {
        match = code.match(/export const unitData = (\{[\s\S]+\});/);
        if (match) {
            data = new Function(`return ${match[1]}`)();
        }
    } else {
        // Try simple require first for weimar and eee
        try {
            data = require(unit.path).unitData;
        } catch (e) {
            console.error(`Error requiring ${unit.path}`);
            continue;
        }
    }

    if (!data) {
        console.error(`Could not load data for ${unit.path}`);
        continue;
    }

    let modified = false;
    data.lessons.forEach(lesson => {
        if (lesson.do_now && lesson.do_now.type === 'retrieval' && lesson.do_now.questions) {
            lesson.do_now.type = 'questions';
            lesson.do_now.title = 'Recall & Retrieval';
            lesson.do_now.instructions = 'Answer these questions in full sentences.';
            lesson.do_now.items = lesson.do_now.questions;
            delete lesson.do_now.questions;
            modified = true;
        }
    });

    if (modified) {
        let updatedCode;
        if (unit.isESModule) {
            updatedCode = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
            // Write it out directly 
            fs.writeFileSync(unit.path, updatedCode, 'utf8');
        } else {
            updatedCode = `const unitData = ${JSON.stringify(data, null, 2)};\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
            fs.writeFileSync(unit.path, updatedCode, 'utf8');
        }
        console.log(`Successfully fixed ${unit.path}`);
    } else {
        console.log(`No fixes needed for ${unit.path}`);
    }
}
