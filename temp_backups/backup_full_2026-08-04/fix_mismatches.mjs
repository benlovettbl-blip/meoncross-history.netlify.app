import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'weimar_nazi_germany', 'data.js');
let raw = fs.readFileSync(dataPath, 'utf-8');

const prefix = 'export const unitData = ';
let jsonString = raw.substring(prefix.length).trim();
if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);

const data = JSON.parse(jsonString);

// Helper to update a lesson's visual source
function updateVisualSource(lessonId, title, caption, clue) {
    const lesson = data.lessons.find(l => l.id === lessonId);
    if (lesson && lesson.utility_starters && lesson.utility_starters.sources) {
        const visual = lesson.utility_starters.sources.find(s => s.type === 'visual');
        if (visual) {
            visual.title = title;
            visual.caption = caption;
            visual.provenance_clue = clue;
            console.log(`Updated ${lessonId}`);
        }
    }
}

// KT 1.3: Hyperinflation (Image is people delivering baskets of money to the Reichsbank)
updateVisualSource(
    "lesson_1_3",
    "Source B: A photograph showing Berliners delivering stacks of hyperinflated currency to the Reichsbank in baskets, 1923.",
    "Berliners bringing baskets of nearly worthless paper money to the bank during the hyperinflation crisis.",
    "Think about the sheer volume of paper money shown in the photograph. What does this tell you about the value of the Mark and its impact on everyday transactions?"
);

// KT 2.1: Early Nazi Party (Image is a formal portrait of Adolf Hitler)
updateVisualSource(
    "lesson_2_1",
    "Source B: A formal portrait of Adolf Hitler.",
    "A formal photographic portrait of Adolf Hitler during his rise to prominence.",
    "Formal portraits are often carefully staged to project a specific image of a leader. How useful is a static portrait for understanding the energetic oratory style that built his early support?"
);

// KT 2.2: Munich Putsch (The user saw the original image which was a crowd on Marienplatz, let's update the text to match that, just in case they are looking at Marienplatz_Munich_during_the_Beer_Hall_Putsch.jpg, OR we can leave it as Trial Defendants since we fixed the image on disk. Actually, since the image on disk IS the trial defendants now, I will add a cache-busting query string to the image URL so the browser reloads it!).
const lesson_2_2 = data.lessons.find(l => l.id === 'lesson_2_2');
if (lesson_2_2) {
    const visual = lesson_2_2.utility_starters.sources.find(s => s.type === 'visual');
    if (visual) {
        // Append query string to bust cache so they see the CORRECT defendants image
        if (!visual.source.includes('?v=')) {
            visual.source = visual.source + '?v=2';
        }
        // Ensure text matches the defendants
        visual.title = "Source B: A photograph of the defendants of the Munich Putsch trial, including Hitler and Ludendorff, 1924.";
        visual.caption = "Hitler, Ludendorff, and other leaders posing during the Munich Putsch trial.";
    }
}

// KT 4.1: Women (Image is the Mother's Cross medal itself)
updateVisualSource(
    "lesson_4_1",
    "Source B: A photograph of the Honour Cross of the German Mother (Mother's Cross).",
    "The Honour Cross of the German Mother, a state decoration awarded to women who had large families.",
    "The Mother's Cross was awarded in bronze, silver, and gold depending on the number of children. Why would the Nazi regime create a military-style medal for childbirth?"
);

// KT 4.2: Young People (Image is the BDM pennant/flag)
updateVisualSource(
    "lesson_4_2",
    "Source B: An illustration of the official pennant (flag) used by the League of German Girls (BDM).",
    "The official pennant of the League of German Girls, featuring the Hitler Youth emblem.",
    "Youth groups were given flags and uniforms to create a sense of belonging and discipline. How useful is this official symbol for telling us about the actual experiences of the girls in the movement?"
);

const outString = prefix + JSON.stringify(data, null, 4) + ';\n';
fs.writeFileSync(dataPath, outString, 'utf-8');
console.log('Fixed mismatches in data.js');
