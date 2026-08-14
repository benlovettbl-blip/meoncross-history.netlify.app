const fs = require('fs');
const path = require('path');

const EXCLUDED_DIRS = ['public', 'scripts', 'node_modules', '.git', 'temp_backups', 'edexcel_medicine', 'cme_new', 'eee', 'weimar_nazi_germany'];
const ROOT_DIR = path.join(__dirname, '../');

const dirs = fs.readdirSync(ROOT_DIR).filter(d => {
    const fullPath = path.join(ROOT_DIR, d);
    return fs.statSync(fullPath).isDirectory() && !EXCLUDED_DIRS.includes(d) && !d.startsWith('.');
});

let patchCount = 0;

dirs.forEach(unit => {
    const dataFile = path.join(ROOT_DIR, unit, 'data.js');
    if (fs.existsSync(dataFile)) {
        let content = fs.readFileSync(dataFile, 'utf8');
        let initialContent = content;

        // 1. Convert 'type: "text"' to 'type: "short_answer"'
        content = content.replace(/"type":\s*"text"/g, '"type": "short_answer"');
        content = content.replace(/'type':\s*'text'/g, "'type': 'short_answer'");

        // 2. Convert 'model' property to 'model_answer'
        content = content.replace(/"model":/g, '"model_answer":');
        
        // 3. Clean up empty tasks arrays (multiline)
        content = content.replace(/"tasks":\s*\[[\s\n\r]*\]/g, '"tasks": null');

        if (content !== initialContent) {
            fs.writeFileSync(dataFile, content);
            console.log(`✅ Patched ROOT source for ${unit}`);
            patchCount++;
        }
    }
});
console.log(`\nPatch complete. Modified ${patchCount} root unit(s).`);
