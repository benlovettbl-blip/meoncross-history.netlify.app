const { execSync } = require('child_process');

const folders = [
    'change_1450_1750',
    'edexcel_medicine',
    'great_war',
    'water_and_sanitation'
];

folders.forEach(folder => {
    try {
        console.log(`Compiling ${folder}...`);
        execSync(`cd ${folder} && node generate_worksheets.js`, { stdio: 'inherit' });
    } catch (e) {
        console.log(`Failed to compile ${folder}`);
    }
});
