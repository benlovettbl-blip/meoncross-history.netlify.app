const fs = require('fs');
const path = require('path');
const dirs = ['weimar_nazi_germany', 'eee', 'edexcel_medicine', 'cme_new', 'water_and_sanitation', 'early_modern_world', 'great_war', 'great_war_part2', 'industrialisation_and_empire'];

dirs.forEach(d => {
    try {
        const dataPath = path.join(__dirname, d, 'data.js');
        if (fs.existsSync(dataPath)) {
            const raw = fs.readFileSync(dataPath, 'utf8');
            let jsonStr = raw.replace(/import .*?;\n/g, '').replace(/if\s*\(\s*typeof\s*module\s*!==\s*['"]undefined['"]\s*\)\s*\{[\s\S]*?;\s*\n?\}/g, '').replace(/export const unitData = |export default |export const gwData = |const unitData = |module\.exports = /g, '').trim();
            if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
            const unit = eval('(' + jsonStr + ')');
            if (unit.lessons && unit.lessons.length > 0) {
                const dn = unit.lessons[0].do_now;
                if (dn) {
                    if (dn.questions) {
                        console.log(`${d} lesson 1 has ${dn.questions.length} questions`);
                    } else if (dn.items) {
                        console.log(`${d} lesson 1 has ${dn.items.length} items`);
                    } else if (Array.isArray(dn)) {
                         console.log(`${d} lesson 1 has ${dn.length} items`);
                    } else {
                        console.log(`${d} lesson 1 has unknown do_now structure`);
                    }
                } else {
                    console.log(`${d} lesson 1 has no do_now`);
                }
            } else {
                console.log(`${d} has no lessons array`);
            }
        }
    } catch (e) {
        console.log(`Failed to parse ${d}: ${e.message}`);
    }
});
