const fs = require('fs');

async function processUnit(unitId) {
    const dataPath = `c:/Projects/meoncross-history.netlify.app/${unitId === 'cme_new' ? 'public/units/cme_new' : unitId}/data.js`;
    if (!fs.existsSync(dataPath)) {
        console.log(`Path not found: ${dataPath}`);
        return;
    }

    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;
    let modified = false;

    // 1. Add dates to cme_new timeline if applicable
    if (unitId === 'cme_new' && data.timeline) {
        const datesMap = {
            'Herzl': '1897',
            'Balfour': '1917',
            'Mandate': '1920',
            'Revolt': '1936',
            'White Paper': '1939',
            'Holocaust': '1945',
            'independence': '1948',
            'Suez': '1956',
            'nationalises': '1956',
            'Six Day': '1967',
            'Focus': '1967',
            'Yom Kippur': '1973',
            'Bar Lev': '1973',
            'Camp David': '1978',
            'Lebanon': '1982',
            'PLO is recognized by the UN': '1974',
            'Intifada': '1987',
            'Oslo I': '1993',
            'Palestinian Authority': '1994',
            'Rabin is assassinated': '1995'
        };

        data.timeline.forEach(group => {
            if (group.events) {
                group.events.forEach(evt => {
                    if (!evt.date) {
                        for (const [keyword, dateStr] of Object.entries(datesMap)) {
                            if (evt.text.includes(keyword)) {
                                evt.date = dateStr;
                                modified = true;
                                break;
                            }
                        }
                    }
                });
            }
        });
    }

    // 2. Inject Key Individual Images
    const individuals = data.key_individuals || [];
    const usedIndividuals = new Set(); // ensure we only show their portrait once in the timeline

    function scanEvents(events) {
        events.forEach(evt => {
            const textToScan = (evt.text || '') + ' ' + (evt.title || '') + ' ' + (evt.description || '');
            for (const person of individuals) {
                const imgSource = person.image || person.image_url;
                if (imgSource && textToScan.includes(person.name) && !usedIndividuals.has(person.name)) {
                    evt.image = imgSource;
                    evt.image_caption = person.name;
                    usedIndividuals.add(person.name);
                    modified = true;
                    break; // Only attach one image per event
                }
            }
        });
    }

    if (data.timeline) {
        if (data.timeline.length > 0 && data.timeline[0].events) {
            data.timeline.forEach(group => scanEvents(group.events));
        } else {
            scanEvents(data.timeline);
        }
    }

    if (modified) {
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        const jsonStr = JSON.stringify(data, null, 2);
        
        let newContent = '';
        if (fileContent.includes('export const unitData =')) {
             newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
             // Handle mock exams if they get stringified incorrectly
             newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
        } else {
             newContent = `export const unitData = ${jsonStr};`;
        }

        fs.writeFileSync(dataPath, newContent, 'utf-8');
        console.log(`Updated ${unitId} with dates and images!`);
    } else {
        console.log(`No changes needed for ${unitId}`);
    }
}

async function main() {
    await processUnit('cme_new');
    await processUnit('edexcel_medicine');
}
main();
