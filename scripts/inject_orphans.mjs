import fs from 'fs';

['great_war_part2', 'early_modern_world'].forEach(unitId => {
    const dataPath = `../${unitId}/data.js`;
    const orphansPath = `../orphans_${unitId}.json`;
    
    if (!fs.existsSync(orphansPath)) return;
    
    let orphans = JSON.parse(fs.readFileSync(orphansPath, 'utf8'));
    if (orphans.length === 0) return;

    let content = fs.readFileSync(dataPath, 'utf8');
    let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
    let data = JSON.parse(jsonStr);

    orphans.forEach(o => {
        let block = data.lessons[o.lessonIndex].narrative_blocks[o.blockIndex];
        if (!block.tasks) block.tasks = [];
        
        let cleanAlt = o.alt.replace(/^Source\s+[A-Z]:\s*/i, '');
        // lowercase first letter if it's a normal word, but it might be a name. Let's just keep it as is.
        
        block.tasks.push({
            question: `Study ${o.sourceLabel}. Based on the visual evidence, why is this source significant for a historian studying this topic?`,
            model_answer: `This source provides crucial historical evidence. Specifically, it shows ${cleanAlt} For a historian studying ${data.lessons[o.lessonIndex].title.replace(/\?$/, '').toLowerCase()}, this visual evidence is highly significant because it grounds the overarching narrative in tangible, real-world proof from the period.`
        });
    });

    fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
    console.log(`Successfully injected tasks for ${orphans.length} orphaned sources in ${unitId}.`);
});
