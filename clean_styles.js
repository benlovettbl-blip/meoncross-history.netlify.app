const fs = require('fs');

const filesToPatch = [
    'generate_pupil_workbooks.js',
    'generate_textbooks.js',
    'generate_workbooks.js',
    'update_worksheets.js',
    'water_and_sanitation/generate_worksheets.js',
    'weimar_nazi_germany/generate_worksheets.js',
    'industrialisation_and_empire/generate_worksheets.js',
    'great_war/generate_worksheets.js',
    'edexcel_medicine/generate_worksheets.js',
    'edexcel_medicine/draft_generate_worksheets.js',
    'early_modern_world/generate_worksheets.js',
    'eee/generate_worksheets.js',
    'change_1450_1750/generate_worksheets.js'
];

filesToPatch.forEach(file => {
    if (!fs.existsSync(file)) return;
    let code = fs.readFileSync(file, 'utf8');
    
    // Remove "Style: " lines completely
    code = code.replace(/.*>Style: .*<\/p>.*/g, '');

    // Replace Frayer Model instructions
    code = code.replace(/Complete the Frayer Model for the term/g, "Write a clear definition and a historically accurate sentence for the term");
    code = code.replace(/Complete the Frayer model grid for the word/g, "Write a clear definition and a historically accurate sentence for the term");
    
    // Replace the Frayer table with empty task lines
    let parts = code.split(/vocabStyle === 2/);
    if (parts.length > 1) {
        for (let i = 1; i < parts.length; i++) {
            parts[i] = parts[i].replace(/<table[^>]*>[\s\S]*?<\/table>/, '`<div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div>`');
        }
        code = parts.join('vocabStyle === 2');
    }
    
    fs.writeFileSync(file, code);
    console.log(`Patched ${file}`);
});
