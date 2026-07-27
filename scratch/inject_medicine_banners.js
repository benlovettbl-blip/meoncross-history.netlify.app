const fs = require('fs');

async function injectMedicineBanners() {
    const dataPath = 'c:/Projects/meoncross-history.netlify.app/edexcel_medicine/data.js';
    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    const map = {
        0: 'lesson_1_1',
        2: 'lesson_2_1',
        6: 'lesson_3_1',
        14: 'lesson_4_1',
        16: 'lesson_5_1',
        21: 'lesson_4_3'
    };

    data.timeline.forEach((evt, i) => {
        if (map[i]) {
            evt.lesson_banner_id = map[i];
        } else {
            delete evt.lesson_banner_id;
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
    console.log('Injected lesson banners into medicine timeline!');
}

injectMedicineBanners();
