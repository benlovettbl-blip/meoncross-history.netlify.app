const fs = require('fs');

async function injectMaps() {
    const dataPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    const mapMappings = [
        {
            text: "partitioning Palestine into separate Jewish and Arab states",
            image: "/units/cme_new/assets/palestine_1947_map.png",
            caption: "UN Partition Plan 1947"
        },
        {
            text: "Israel secures 78% of Mandatory Palestine",
            image: "/units/cme_new/assets/palestine_1949_map.png",
            caption: "Israel's Borders 1949-1967"
        },
        {
            text: "Israel gains 78% of Mandatory Palestine",
            image: "/units/cme_new/assets/palestine_1949_map.png",
            caption: "Israel's Borders 1949-1967"
        },
        {
            text: "Israel occupies the Sinai, Golan Heights",
            image: "/units/cme_new/assets/palestine_1967_map.png",
            caption: "Israeli Territory after the 1967 War"
        },
        {
            text: "Israel quadruples its territory in just six days",
            image: "/units/cme_new/assets/palestine_1967_map.png",
            caption: "Israeli Territory after the 1967 War"
        },
        {
            text: "The historic Egypt-Israel Peace Treaty is signed",
            image: "/units/cme_new/assets/sinai_returned.svg",
            caption: "Sinai Peninsula Returned to Egypt"
        },
        {
            text: "Palestinian Authority is created",
            image: "/units/cme_new/assets/oslo2.svg",
            caption: "Oslo Accords: Areas A, B, and C"
        }
    ];

    data.timeline.forEach(group => {
        group.events.forEach(evt => {
            for (const map of mapMappings) {
                if (evt.text.includes(map.text)) {
                    evt.image = map.image;
                    evt.image_caption = map.caption;
                }
            }
        });
    });

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const jsonStr = JSON.stringify(data, null, 2);
    
    let newContent = '';
    if (fileContent.includes('export const unitData =')) {
         newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
         newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    }
    
    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log('Injected maps into timeline!');
}

injectMaps();
