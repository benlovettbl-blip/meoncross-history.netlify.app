const fs = require('fs');

async function fixCmeTimeline() {
    const dataPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    // Fix the date for the Mandate termination
    data.timeline.forEach(group => {
        group.events.forEach(evt => {
            if (evt.text && evt.text.includes('terminates the Mandate')) {
                evt.date = 'May 1948';
            }
            if (evt.text && evt.text.includes('Ben-Gurion proclaims')) {
                evt.date = 'May 1948';
            }
        });
    });

    // Inject lesson_banner_id into groups
    const groupToBannerMap = {
        'lesson1': 'lesson_1', // Roots to 1945 -> KT1.1
        'lesson3': 'lesson_2', // 1948 War -> KT1.2 Aftermath (starts in 1948)
        'lesson4': 'lesson_3', // Suez Crisis 1956 -> KT1.3 Increased Tension
        'lesson5': 'lesson_4', // Build up to 1967 -> KT2.1 Six Day War
        'lesson6': 'lesson_5', // Israel and Egypt 1967-1973 -> KT2.2 Aftermath of 1967
        'war1973': 'lesson_6', // 1973 War -> KT2.3 Israel and Egypt (ends in 73)
        'lesson7': 'lesson_7', // Diplomatic -> KT3.1 Diplomatic
        'lesson8': 'lesson_8', // Palestinian Issue -> KT3.2
        'lesson9': 'lesson_9'  // Attempts at solution -> KT3.3
    };

    data.timeline.forEach(group => {
        if (groupToBannerMap[group.id]) {
            group.lesson_banner_id = groupToBannerMap[group.id];
        } else {
            delete group.lesson_banner_id;
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
    console.log('Fixed CME timeline dates and banners!');
}

fixCmeTimeline();
