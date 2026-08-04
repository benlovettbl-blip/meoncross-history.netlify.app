const fs = require('fs');
const path = require('path');
const publicUnitsDir = path.join(__dirname, 'public', 'units');
const rootUnitsDir = __dirname;
const units = fs.readdirSync(publicUnitsDir).filter(d => fs.statSync(path.join(publicUnitsDir, d)).isDirectory());

units.forEach(u => {
    const dataPath = path.join(rootUnitsDir, u, 'data.js');
    if (fs.existsSync(dataPath)) {
        let c = fs.readFileSync(dataPath, 'utf8');
        if (!c.includes('"has_gcse_exams"')) {
            const isKS3 = u === 'water_and_sanitation' || c.toLowerCase().includes('ks3');
            const flag = !isKS3;
            c = c.replace(/(export\s+default\s+\{)/, `$1\n    "has_gcse_exams": ${flag},`);
            fs.writeFileSync(dataPath, c);
            console.log(`Added has_gcse_exams: ${flag} to ${u}`);
        }
    }
});
