import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'weimar_nazi_germany', 'data.js');
let raw = fs.readFileSync(dataPath, 'utf-8');

const prefix = 'export const unitData = ';
let jsonString = raw.substring(prefix.length).trim();
if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);

const data = JSON.parse(jsonString);

const lesson_2_2 = data.lessons.find(l => l.id === 'lesson_2_2');
if (lesson_2_2) {
    const visual = lesson_2_2.utility_starters.sources.find(s => s.type === 'visual');
    if (visual) {
        visual.title = "Source B: A photograph showing crowds and paramilitaries on the streets of Munich during the Beer Hall Putsch, 9 November 1923.";
        visual.caption = "Armed supporters of the Nazis and nationalist groups gathered at Marienplatz during the Munich Putsch.";
        visual.provenance_clue = "This photograph captures the public dimension of the Putsch. Consider who is in the crowd—does the presence of armed paramilitaries on the streets suggest a highly organized rebellion or chaotic opportunism?";
    }
}

const outString = prefix + JSON.stringify(data, null, 4) + ';\n';
fs.writeFileSync(dataPath, outString, 'utf-8');
console.log('Fixed KT 2.2 to match the Marienplatz image.');
