const fs = require('fs');
const path = require('path');

const EXCLUDED_UNITS = ['edexcel_medicine', 'cme_new', 'eee', 'weimar_nazi_germany'];
const UNITS_DIR = path.join(__dirname, '../public/units');

const units = fs.readdirSync(UNITS_DIR).filter(u => {
    return fs.statSync(path.join(UNITS_DIR, u)).isDirectory() && !EXCLUDED_UNITS.includes(u);
});

let patchCount = 0;

units.forEach(unit => {
    const dataFile = path.join(UNITS_DIR, unit, 'data.js');
    if (fs.existsSync(dataFile)) {
        let content = fs.readFileSync(dataFile, 'utf8');
        let initialContent = content;

        // Clean up empty tasks arrays (multiline)
        content = content.replace(/"tasks":\s*\[[\s\n\r]*\]/g, '"tasks": null');

        if (content !== initialContent) {
            fs.writeFileSync(dataFile, content);
            console.log(`✅ Patched ${unit}`);
            patchCount++;
        }
    }
});
console.log(`\nPatch complete. Modified ${patchCount} unit(s).`);
