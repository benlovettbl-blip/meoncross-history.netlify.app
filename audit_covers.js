const fs = require('fs');
const path = require('path');
const unitsDir = 'c:/Projects/meoncross-history.netlify.app/public/units';
const dirs = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory() && f !== 'dist2' && f !== 'v2-app');

const results = [];
dirs.forEach(d => {
    const dataPath = path.join(unitsDir, d, 'data.js');
    if (fs.existsSync(dataPath)) {
        let content = fs.readFileSync(dataPath, 'utf8');
        // Extract the root-level cover_image
        // In data.js, it usually starts with const unitData = { ... cover_image: '...', ... }
        let coverMatch = content.match(/^[ \t]*['"]?cover_image['"]?\s*:\s*['"]([^'"]+)['"]/m);
        results.push({
            unit: d,
            has_cover: !!coverMatch,
            cover_image: coverMatch ? coverMatch[1] : null
        });
    }
});
console.table(results);
