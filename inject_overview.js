const fs = require('fs');
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

if (data.lessons) {
    const lesson = data.lessons.find(l => l.id === 'lesson_1_1');
    if (lesson) {
        if (!lesson.video) {
            lesson.video = [];
        } else if (!Array.isArray(lesson.video)) {
            lesson.video = [lesson.video];
        }
        
        lesson.video.push({
            url: "https://era.org.uk/streaming-service-resource/4-medicine-and-long-term-change-history-file/",
            title: "History File: Medicine and Long Term Change (Overview)"
        });
        
        console.log("Successfully injected into lesson_1_1");
    }
}

fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2) + suffix, 'utf8');
