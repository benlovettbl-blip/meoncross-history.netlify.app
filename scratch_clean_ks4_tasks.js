const fs = require('fs');

function cleanEmptyTasks(unitId) {
    const path = `${unitId}/data.js`;
    if (!fs.existsSync(path)) return;
    
    let content = fs.readFileSync(path, 'utf8');
    let jsonStr = content.replace(`export default unitData;`, '').replace(`const unitData =`, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    // Some KS4 files might use `const [unitId] = ` instead of `unitData`. Let's handle both.
    jsonStr = content.replace(`export default ${unitId};`, '').replace(`const ${unitId} =`, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    let data;
    try {
        data = eval('(' + jsonStr + ')');
    } catch(e) {
        // Fallback if the export default name is different
        let altJsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
        data = eval('(' + altJsonStr + ')');
    }

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
        // preserve the exact export default name from the original file
        const exportMatch = content.match(/export default (.*?);/);
        const exportName = exportMatch ? exportMatch[1] : 'unitData';
        
        const newContent = `const ${exportName} = ${JSON.stringify(data, null, 2)};\n\nexport default ${exportName};`;
        fs.writeFileSync(path, newContent);
        console.log(`Cleaned empty tasks in ${unitId}`);
    } else {
        console.log(`No empty tasks found to clean in ${unitId}`);
    }
}

cleanEmptyTasks('eee');
cleanEmptyTasks('weimar_nazi_germany');
