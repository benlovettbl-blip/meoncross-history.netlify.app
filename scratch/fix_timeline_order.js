const fs = require('fs');

async function fixTimeline() {
    const dataPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    // 1. Fix the image SVGs
    data.timeline.forEach(group => {
        group.events.forEach(evt => {
            if (evt.image && evt.image.includes('sinai_returned.svg')) {
                evt.image = '/units/cme_new/assets/camp_david_accords.png';
                evt.image_caption = 'Camp David Accords';
            }
            if (evt.image && evt.image.includes('oslo2.svg')) {
                evt.image = '/units/cme_new/assets/oslo_cover.png';
                evt.image_caption = 'The Oslo Accords';
            }
        });
    });

    // 2. Sort the timeline groups in pedagogical / chronological order
    const explicitOrder = [
        'lesson1',
        'lesson2',
        'lesson3',
        'war1948',
        'lesson4',
        'war1956',
        'lesson5',
        'war1967',
        'lesson6',
        'war1973',
        'lesson7',
        'lesson8',
        'war1982',
        'lesson9'
    ];

    data.timeline.sort((a, b) => {
        const indexA = explicitOrder.indexOf(a.id);
        const indexB = explicitOrder.indexOf(b.id);
        return indexA - indexB;
    });

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const jsonStr = JSON.stringify(data, null, 2);
    
    let newContent = '';
    if (fileContent.includes('export const unitData =')) {
         newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
         newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    }
    
    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log('Fixed timeline order and images!');
}

fixTimeline();
