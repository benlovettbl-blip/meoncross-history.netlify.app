const fs = require('fs');

async function fixDates2() {
    const dataPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    const preciseDates = {
        'lesson3': ['1948', '1948–1949', '1948', '1949', '1949', '1948', '1949'],
        'lesson4': ['1954', '1955', 'July 1956', 'July 1956', 'Oct 1956', 'Oct 1956', 'Nov 1956']
    };

    data.timeline.forEach(group => {
        if (preciseDates[group.id]) {
            group.events.forEach((evt, idx) => {
                evt.date = preciseDates[group.id][idx];
            });
        }
    });

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const jsonStr = JSON.stringify(data, null, 2);
    
    let newContent = '';
    if (fileContent.includes('export const unitData =')) {
         newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
         newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    }
    
    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log('Fixed dates for lesson 3 and 4!');
}

fixDates2();
