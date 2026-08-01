import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'weimar_nazi_germany', 'data.js');
let raw = fs.readFileSync(dataPath, 'utf-8');

const prefix = 'export const unitData = ';
let jsonString = raw.substring(prefix.length).trim();
if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);

const data = JSON.parse(jsonString);

function updateVisualSource(lessonId, title, caption, clue) {
    const lesson = data.lessons.find(l => l.id === lessonId);
    if (lesson && lesson.utility_starters && lesson.utility_starters.sources) {
        const visual = lesson.utility_starters.sources.find(s => s.type === 'visual');
        if (visual) {
            if (title) visual.title = title;
            if (caption) visual.caption = caption;
            if (clue) visual.provenance_clue = clue;
            // Append or update cache-buster to ALL visual sources
            visual.source = visual.source.split('?')[0] + '?v=4';
            console.log(`Updated ${lessonId}`);
        }
    }
}

// Update ALL visual sources with cache buster ?v=4
data.lessons.forEach(l => {
    if (l.utility_starters && l.utility_starters.sources) {
        const visual = l.utility_starters.sources.find(s => s.type === 'visual');
        if (visual) {
            visual.source = visual.source.split('?')[0] + '?v=4';
        }
    }
});

// Revert KT 2.2 back to Defendants (because the file on disk IS defendants, we just need to bust the cache!)
updateVisualSource(
    "lesson_2_2",
    "Source B: A photograph of the defendants of the Munich Putsch trial, including Hitler and Ludendorff, 1924.",
    "Hitler, Ludendorff, and other leaders posing during the Munich Putsch trial.",
    "This photograph shows the accused posing confidently. Does it suggest they were treated harshly by the sympathetic right-wing judges in Bavaria?"
);

// Fix KT 3.1: Reichstag Fire exterior (not interior)
updateVisualSource(
    "lesson_3_1",
    "Source B: A photograph showing the exterior of the Reichstag building on fire, February 1933.",
    "The Reichstag building engulfed in flames.",
    "While the photograph shows the physical destruction, does it tell you anything about who actually started the fire or how the Nazis used it to their advantage?"
);

// Fix KT 4.3: Autobahn (not manual laborers)
updateVisualSource(
    "lesson_4_3",
    "Source B: A photograph of a section of the new Reichsautobahn.",
    "A completed section of the new German motorway network.",
    "Photographs of the Autobahn were used heavily in propaganda to prove Hitler was fulfilling his promise of 'work and bread'. Does this image tell us about the wages or working conditions of the men who built it?"
);

// Fix KT 4.4: Kristallnacht (Synagogue interior, not a shop)
updateVisualSource(
    "lesson_4_4",
    "Source B: A photograph showing the destroyed interior of the Fasanenstrasse Synagogue in Berlin after Kristallnacht, November 1938.",
    "The interior of a major Berlin synagogue destroyed during the November Pogrom.",
    "This photograph captures the physical aftermath of state-sponsored violence against a sacred religious space. Consider what it tells us about the escalation of persecution by 1938 compared to earlier economic boycotts."
);


const outString = prefix + JSON.stringify(data, null, 4) + ';\n';
fs.writeFileSync(dataPath, outString, 'utf-8');
console.log('Fixed mismatches and applied cache-busters in data.js');
