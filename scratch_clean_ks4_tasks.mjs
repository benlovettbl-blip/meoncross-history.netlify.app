import fs from 'fs';

async function clean(unitId) {
    let mod = await import(`file:///${process.cwd().replace(/\\/g, '/')}/${unitId}/data.js`);
    let data = mod.unitData || (mod.default && mod.default.unitData) || mod.default || mod[unitId];
    
    let modified = false;
    data.lessons.forEach(lesson => {
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.tasks && Array.isArray(block.tasks) && block.tasks.length === 0) {
                    delete block.tasks;
                    modified = true;
                }
            });
        }
    });

    if (modified) {
        let out = `const ${unitId} = ${JSON.stringify(data, null, 2)};\n\nexport default ${unitId};`;
        fs.writeFileSync(`${unitId}/data.js`, out);
        console.log(`Cleaned empty tasks in ${unitId}`);
    } else {
        console.log(`No empty tasks found in ${unitId}`);
    }
}

await clean('eee');
await clean('weimar_nazi_germany');
