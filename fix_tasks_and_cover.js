const fs = require('fs');
const path = require('path');

// 1. Sanitize Part [A-Z] from all data.js files
const unitsDir = path.join(__dirname, 'public', 'units');
const dirs = fs.readdirSync(unitsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

dirs.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    if (fs.existsSync(dataPath)) {
        let content = fs.readFileSync(dataPath, 'utf8');
        // Match <strong>Part X: .*?</strong><br>
        content = content.replace(/<strong>Part\s+[A-Z0-9]*:\s*(.*?)<\/strong><br>\s*/g, '');
        // Match **Part X: .*?**
        content = content.replace(/\*\*Part\s+[A-Z0-9]*:\s*(.*?)\*\*\s*/g, '');
        fs.writeFileSync(dataPath, content);
    }
});
console.log("Sanitized Part prefixes from data.js files.");

// 2. Update generate_pupil_workbooks.js
let generatorCode = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Fix task-box page break so it flows properly and doesn't leave huge white spaces
generatorCode = generatorCode.replace(/page-break-inside:\s*avoid\s*!important;/g, 'page-break-inside: auto !important;');

// Fix generic heading
generatorCode = generatorCode.replace(
    /<h2 style="margin-top: 0; color: #1e3a8a;">Assessment Practice & Knowledge Retrieval<\/h2>/g,
    '<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>'
);
generatorCode = generatorCode.replace(
    /Use the space below to summarize the most important knowledge from this lesson, or answer your teacher's assessment question\./g,
    "Reflect on today's learning and answer your teacher's final challenge."
);

// Fix cover page height and fonts to fit tracker
generatorCode = generatorCode.replace(/height: 160px; margin-top: 0px;/g, 'height: 90px; margin-top: 0px;');
generatorCode = generatorCode.replace(/padding: 20px 40px;/g, 'padding: 10px 20px;');
generatorCode = generatorCode.replace(/font-size: 24pt;/g, 'font-size: 18pt;');
generatorCode = generatorCode.replace(/font-size:14pt;/g, 'font-size:11pt;');

// Fix cover sources padding
generatorCode = generatorCode.replace(/margin: 25px auto 15px auto;/g, 'margin: 15px auto 10px auto;');
generatorCode = generatorCode.replace(/padding-top: 10px; padding-bottom: 10px;/g, 'padding-top: 5px; padding-bottom: 5px;');

// Fix name/class margins
generatorCode = generatorCode.replace(/margin: 25px auto 0 auto;/g, 'margin: 15px auto 0 auto;');

// Fix tracker margins
generatorCode = generatorCode.replace(/margin: 30px 5% 0 5%;/g, 'margin: 15px 5% 0 5%;');

fs.writeFileSync('generate_pupil_workbooks.js', generatorCode);
console.log("Updated generate_pupil_workbooks.js layout and text.");
