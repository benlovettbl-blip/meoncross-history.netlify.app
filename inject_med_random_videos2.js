const fs = require('fs');
const path = require('path');

const mappings = [
    { url: 'https://www.youtube.com/watch?v=w6q50_qNMoA', title: "Ceaseless motion: William Harvey's experiments in circulation", lesson: 'lesson_2_3' },
    { url: 'https://www.youtube.com/watch?v=4xKWnE63E8U', title: 'How the RAMC Worked in WW1 | Field Ambulance Organisation Explained', lesson: 'lesson_5_4' },
    { url: 'https://www.youtube.com/watch?v=TTaoz0YVO2Y', title: 'Casualty Clearing Station, with Andy Robertshaw', lesson: 'lesson_5_4' },
    { url: 'https://www.youtube.com/watch?v=LoeAVaM48Y0', title: 'WILLIAM HARVEY - The Theory of Blood Circulation', lesson: 'lesson_2_3' },
    { url: 'https://www.youtube.com/watch?v=-jTZ7AwCyug', title: 'Women Medics WW1 Uncut BBC', lesson: 'lesson_5_4' },
    { url: 'https://www.youtube.com/watch?v=walfj2dpU-E', title: 'Vesalius, Paré and Harvey | Secondary History - Medicine Through Time', lesson: 'lesson_2_2' },
    { url: 'https://www.youtube.com/watch?v=7pjAH84f-c0', title: '18th Century Medicine | Secondary History - Medicine Through Time', lesson: 'lesson_3_2' },
    { url: 'https://www.youtube.com/watch?v=xsz0-8-qAi8', title: 'The Battle of the Somme: Dressing station', lesson: 'lesson_5_4' },
    { url: 'https://www.youtube.com/watch?v=my14ZuzjH5I', title: 'Modern Medicine | Secondary History - Medicine Through Time', lesson: 'lesson_4_1' },
    { url: 'https://www.youtube.com/watch?v=nVJV8iEAm88', title: 'Medieval Medicine | Secondary History - Medicine Through Time', lesson: 'lesson_1_1' },
    { url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w', title: 'Chadwick and Snow | Secondary History - Medicine Through Time', lesson: 'lesson_3_3' },
    { url: 'https://www.youtube.com/watch?v=x8OazQml0gw', title: 'Infections - WW1 Uncut - BBC', lesson: 'lesson_5_3' }
];

const unitPath = 'edexcel_medicine/data.js';
const dataStr = fs.readFileSync(unitPath, 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);

let jsonStr = dataStr.substring(jsonStartIndex);
let suffix = '';
if (jsonStr.endsWith(';\n')) {
    jsonStr = jsonStr.slice(0, -2);
    suffix = ';\n';
} else if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
    suffix = ';';
}

const data = JSON.parse(jsonStr);
let injectedCount = 0;

if (data.lessons) {
    data.lessons.forEach(l => {
        const toInject = mappings.filter(m => m.lesson === l.id);
        if (toInject.length > 0) {
            if (!l.video) l.video = [];
            else if (!Array.isArray(l.video)) l.video = [l.video];
            
            const existingUrls = new Set(l.video.map(vid => vid.url));
            toInject.forEach(newVid => {
                if (!existingUrls.has(newVid.url)) {
                    l.video.push({ url: newVid.url, title: newVid.title });
                    injectedCount++;
                }
            });
        }
    });
}

fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2) + suffix, 'utf8');
console.log(`Successfully injected ${injectedCount} videos into edexcel_medicine.`);

// Remove Random Videos from tracker
const trackerPath = 'G:\\\\My Drive\\\\Antigravity Projects\\\\lesson_tracker.md';
let trackerContent = fs.readFileSync(trackerPath, 'utf8');
trackerContent = trackerContent.replace(/## Random Videos[\s\S]*?(?=## Unit:)/, "## Random Videos\n\nDrop links here if you don't have time to categorize them!\n\n");
fs.writeFileSync(trackerPath, trackerContent, 'utf8');
console.log("Cleared Random Videos from the tracker.");
