const fs = require('fs');
const path = require('path');

const unitsToCreate = [
    { id: 'australia', title: 'KS3: History of Australia' },
    { id: 'inter_war_holocaust', title: 'KS3: The Inter-War Years & The Holocaust' },
    { id: 'cold_war', title: 'KS3: The Cold War' }
];

const sourceUnit = 'great_war';
const sourceDataPath = path.join(__dirname, '..', sourceUnit, 'data.js');

if (!fs.existsSync(sourceDataPath)) {
    console.error(`Source unit ${sourceUnit} not found at ${sourceDataPath}`);
    process.exit(1);
}

const sourceCode = fs.readFileSync(sourceDataPath, 'utf8');

// We need to parse the object, but since it's a JS module, we'll just require it.
// Actually, it's easier to use import, but this is a commonjs script. We'll use a dynamic import.
async function scaffoldUnits() {
    for (const newUnit of unitsToCreate) {
        const destDir = path.join(__dirname, '..', newUnit.id);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }
        
        // Let's load the source data
        const module = await import(`file:///${sourceDataPath.replace(/\\/g, '/')}`);
        const data = JSON.parse(JSON.stringify(module.unitData)); // Deep copy
        
        // Clear it out
        data.title = newUnit.title;
        data.lessons = []; // Placeholder has no lessons yet
        if (data.assessments) data.assessments = [];
        data.cover_image = ''; // Clear image
        data.enquiry = '';
        
        const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
        fs.writeFileSync(path.join(destDir, 'data.js'), newDataStr);
        console.log(`✅ Scaffolded placeholder unit: ${newUnit.id}`);
    }
}

scaffoldUnits();
