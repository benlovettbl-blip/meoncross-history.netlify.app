const fs = require('fs');

async function processUnit(unitId) {
    const dataPath = `c:/Projects/meoncross-history.netlify.app/${unitId === 'cme_new' ? 'public/units/cme_new' : unitId}/data.js`;
    if (!fs.existsSync(dataPath)) return;

    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    // 1. CLEAR ALL IMAGES FROM TIMELINE
    const clearImages = (events) => {
        events.forEach(evt => {
            delete evt.image;
            delete evt.image_caption;
        });
    };

    if (data.timeline) {
        if (data.timeline.length > 0 && data.timeline[0].events) {
            data.timeline.forEach(group => clearImages(group.events));
        } else {
            clearImages(data.timeline);
        }
    }

    // 2. REAPPLY KEY INDIVIDUALS (Strict Match)
    const individuals = data.key_individuals || [];
    const usedIndividuals = new Set();
    const injectKeyIndividuals = (events) => {
        events.forEach(evt => {
            const textToScan = (evt.text || '') + ' ' + (evt.title || '') + ' ' + (evt.description || '');
            for (const person of individuals) {
                const imgSource = person.image || person.image_url;
                if (imgSource && textToScan.includes(person.name) && !usedIndividuals.has(person.name)) {
                    evt.image = imgSource;
                    evt.image_caption = person.name;
                    usedIndividuals.add(person.name);
                    break;
                }
            }
        });
    };

    if (data.timeline) {
        if (data.timeline.length > 0 && data.timeline[0].events) {
            data.timeline.forEach(group => injectKeyIndividuals(group.events));
        } else {
            injectKeyIndividuals(data.timeline);
        }
    }

    // 3. HARDCODED VISUAL MAPPING FOR CME_NEW
    if (unitId === 'cme_new' && data.timeline) {
        const strictMappings = [
            { img: '/assets/cme_new_king_david_ruins.png', match: 'King David' },
            { img: '/units/cme_new/assets/cme_un_palestine_partition_versions_1947.jpg', match: 'Partition Plan' },
            { img: '/units/cme_new/assets/cme_exodus.jpeg', match: 'Exodus' },
            { img: '/units/cme_new/assets/cme_tel_aviv_yafo__997008136796005171_.jpg', match: 'Armies from Egypt, Syria, Jordan, and Iraq invade' },
            { img: '/units/cme_new/assets/cme_palestinian_refugees_leaving_gaza_gettyimages_1354487454.webp', match: 'Nakba' },
            { img: '/units/cme_new/assets/palestinian_refugees_1948.jpg', match: '700,000 Palestinian Arabs flee' },
            { img: '/units/cme_new/assets/cme_port_said_from_air.jpg', match: 'bomb Egyptian airfields' },
            { img: '/units/cme_new/assets/palestine_1967_map.png', match: 'quadruples its territory' },
            { img: '/units/cme_new/assets/western_wall_1967.jpg', match: 'East Jerusalem' },
            { img: '/units/cme_new/assets/idf_fighter_planes.jpg', match: 'Operation Focus' },
            { img: '/units/cme_new/assets/un242.svg', match: 'Resolution 242' },
            { img: '/units/cme_new/assets/yom_kippur_crossing.png', match: 'water cannons' },
            { img: '/units/cme_new/assets/camp_david_accords.png', match: 'Camp David Accords' },
            { img: '/units/cme_new/assets/first_intifada.png', match: 'First Intifada' },
            { img: '/units/cme_new/assets/rabinovich_cover.png', match: 'assassinated' }
        ];

        data.timeline.forEach(group => {
            group.events.forEach(evt => {
                const textToScan = evt.text || '';
                for (const map of strictMappings) {
                    if (textToScan.includes(map.match) && !evt.image) {
                        evt.image = map.img;
                        // Use a generic caption or omit
                        evt.image_caption = "Historical Source";
                        break;
                    }
                }
            });
        });
    }

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const jsonStr = JSON.stringify(data, null, 2);
    
    let newContent = '';
    if (fileContent.includes('export const unitData =')) {
         newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
         newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    } else {
         newContent = `export const unitData = ${jsonStr};`;
    }

    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log(`Fixed visuals for ${unitId}!`);
}

async function main() {
    await processUnit('cme_new');
    await processUnit('edexcel_medicine');
}
main();
