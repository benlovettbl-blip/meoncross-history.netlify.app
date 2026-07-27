const fs = require('fs');

async function processUnit() {
    // 1. Edexcel Medicine
    let dataPath = 'c:/Projects/meoncross-history.netlify.app/edexcel_medicine/data.js';
    let mod = await import('file://' + dataPath + '?update=' + Date.now());
    let data = mod.unitData;

    data.timeline.forEach((evt, idx) => {
        if (idx <= 1) evt.key_topic = "KT1: Medieval (c1250–1500)";
        else if (idx <= 5) evt.key_topic = "KT2: Renaissance (c1500–1700)";
        else if (idx <= 13) evt.key_topic = "KT3: 18th & 19th Century (c1700–1900)";
        else if (idx <= 15) evt.key_topic = "KT4: Modern (c1900–present)";
        else if (idx <= 20) evt.key_topic = "KT5: Western Front (1914–1918)";
        else evt.key_topic = "KT4: Modern (c1900–present)";
    });

    let jsonStr = JSON.stringify(data, null, 2);
    let fileContent = fs.readFileSync(dataPath, 'utf-8');
    let newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
    newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log('Injected key topics for Medicine!');

    // 2. CME New
    dataPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    mod = await import('file://' + dataPath + '?update=' + Date.now());
    data = mod.unitData;

    const kt1 = new Set(['lesson1', 'lesson2', 'lesson3', 'war1948']);
    const kt2 = new Set(['lesson4', 'lesson5', 'lesson6', 'lesson7', 'war1956', 'war1967', 'war1973']);
    const kt3 = new Set(['lesson8', 'lesson9', 'war1982']);

    data.timeline.forEach(group => {
        let topic = "";
        if (kt1.has(group.id)) topic = "KT1: Conflict to 1949";
        else if (kt2.has(group.id)) topic = "KT2: The Arab-Israeli Wars (1956–1979)";
        else if (kt3.has(group.id)) topic = "KT3: The Palestinian Issue (1974–1995)";
        
        group.events.forEach(evt => {
            evt.key_topic = topic;
        });
    });

    jsonStr = JSON.stringify(data, null, 2);
    fileContent = fs.readFileSync(dataPath, 'utf-8');
    newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
    newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log('Injected key topics for Middle East!');
}

processUnit();
