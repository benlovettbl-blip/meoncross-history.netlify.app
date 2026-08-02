import fs from 'fs';

const dataPath = 'weimar_nazi_germany/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');

const videos = {
    'lesson_1_1': `"video": {
                "type": "youtube",
                "url": "https://www.youtube.com/embed/MQWdq-Q9Q24",
                "title": "Ten Minute History - The Weimar Republic and Nazi Germany",
                "duration": "10 mins",
                "viewing_task": "Identify the main problems faced by the Weimar Republic when it was created.",
                "model_answer": "The new Republic faced the humiliation of the Armistice, starvation due to the British naval blockade, the 'stab-in-the-back' myth blaming politicians for the defeat, and violent uprisings from extremists like the Spartacists."
            }`,
    'lesson_2_1': `"video": {
                "type": "youtube",
                "url": "https://www.youtube.com/embed/CrzGlkI-W90",
                "title": "How Hitler Built The Nazi Party",
                "duration": "50 mins",
                "viewing_task": "Note down three ways Hitler increased his control over the early Nazi Party.",
                "model_answer": "1. He designed the swastika flag to make the party instantly recognisable.<br>2. He set up the SA (Brownshirts) to protect meetings and intimidate rivals.<br>3. He established the 25-Point Programme and took over leadership from Anton Drexler in 1921."
            }`,
    'lesson_3_1': `"video": {
                "type": "youtube",
                "url": "https://www.youtube.com/embed/zr9KGQyhbD0",
                "title": "The Nazi Police State",
                "duration": "5 mins",
                "viewing_task": "List the key organisations the Nazis used to enforce control.",
                "model_answer": "The Nazis established absolute control through the SS (who ran the terror state and concentration camps), the Gestapo (secret state police who spied on citizens), and the SD (the intelligence gathering service)."
            }`,
    'lesson_4_1': `"video": {
                "type": "youtube",
                "url": "https://www.youtube.com/embed/vO-_HXO7HwY",
                "title": "Life in Hitler's Germany",
                "duration": "20 mins",
                "viewing_task": "Identify the main Nazi policies towards women.",
                "model_answer": "The Nazis believed women should focus on 'Kinder, Küche, Kirche' (Children, Kitchen, Church). They offered marriage loans to encourage women to leave work, gave medals (Honour Cross) for having large families, and banned women from professional jobs like medicine and law."
            }`
};

for (const [id, videoStr] of Object.entries(videos)) {
    const lessonStartIdx = dataContent.indexOf(`"id": "${id}"`);
    if (lessonStartIdx === -1) {
        console.log(`Could not find ${id}`);
        continue;
    }
    const doNowIdx = dataContent.indexOf(`"do_now": {`, lessonStartIdx);
    if (doNowIdx !== -1) {
        dataContent = dataContent.slice(0, doNowIdx) + videoStr + ',\n            ' + dataContent.slice(doNowIdx);
        console.log(`Successfully injected into ${id}`);
    }
}

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log("Done.");
