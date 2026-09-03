const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const publicDbPath = path.join(__dirname, '..', 'public', 'database.json');

async function buildDatabase() {
    console.log('Building database.json from units directory...');
    const db = {};
    const dirs = fs.readdirSync(unitsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const unitId of dirs) {
        const dataPath = path.join(unitsDir, unitId, 'data.js');
        if (fs.existsSync(dataPath)) {
            try {
                const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
                const module = await import(fileUrl);
                const unitData = module.default || module.unitData || module[unitId];
                if (unitData) {
                    db[unitId] = { data: unitData };
                    console.log(`✅ Included unit: ${unitId}`);
                } else {
                    console.log(`⚠️  Could not extract data from ${unitId}/data.js`);
                }
            } catch (err) {
                console.error(`❌ Error importing ${unitId}/data.js:`, err.message);
            }
        } else {
            console.log(`⏭️  Skipped ${unitId} (no data.js found)`);
        }
    }

    fs.writeFileSync(publicDbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log(`🎉 Successfully built database.json with ${Object.keys(db).length} units.`);
}

buildDatabase();
