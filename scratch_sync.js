const { execSync } = require('child_process');
const activeUnits = ['cme_new', 'edexcel_medicine', 'great_war', 'great_war_part2', 'industrialisation_and_empire', 'water_and_sanitation', 'early_modern_world', 'weimar_nazi_germany', 'eee'];
activeUnits.forEach(u => {
    console.log(`Extracting ${u}...`);
    try {
        execSync(`node extract_units.js ${u}`, {stdio: 'inherit'});
    } catch(e) { console.error(`Error extracting ${u}`); }
});
execSync('node build_database.cjs', {stdio: 'inherit'});
execSync('node generate_tracker_v2.mjs', {stdio: 'inherit'});
