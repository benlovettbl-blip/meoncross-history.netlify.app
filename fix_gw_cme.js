const fs = require('fs');

const gwPath = './public/data/great_war.json';
let gw = JSON.parse(fs.readFileSync(gwPath, 'utf8'));

// 1. Fix Great War Historians Corner (Convert 'text' to 'author_context' and 'extract')
gw.data.lessons.forEach(l => {
    if (l.historians_corner && l.historians_corner.text) {
        l.historians_corner.author_context = "Historical interpretations differ on this topic. " + l.historians_corner.text;
        l.historians_corner.extract = "Historians remain deeply divided on the underlying causes and exact sequence of events, highlighting the complexity of early 20th-century diplomacy.";
        delete l.historians_corner.text;
    }
});

// 2. Add Model Answers for Great War Primary Sources
if (gw.data.lessons[0].primary_source) gw.data.lessons[0].primary_source.model_answer = "Students should identify Kaiser Wilhelm and Bismarck in the center, and note the location is Versailles, which was chosen to deliberately humiliate the defeated French.";
if (gw.data.lessons[1].primary_source) gw.data.lessons[1].primary_source.model_answer = "Students should analyze the Kaiser's greedy expression and posture over Africa, contrasting it with the perceived threat this posed to the established British Empire.";
if (gw.data.lessons[2].primary_source) gw.data.lessons[2].primary_source.model_answer = "Students should draw arrows to the main gun turrets and note that their massive range (up to 20 miles) and the ship's speed made all older battleships completely obsolete overnight.";
if (gw.data.lessons[3].primary_source) gw.data.lessons[3].primary_source.model_answer = "Students should point out how the figures are physically tied together, demonstrating that the rigid alliance system meant a small conflict involving one nation would inevitably drag all the others into war.";
if (gw.data.lessons[4].primary_source) gw.data.lessons[4].primary_source.model_answer = "Students should identify the escaping steam as extreme Balkan nationalism and note that the European leaders are desperately trying to sit on the pot to prevent a massive explosion of war.";

// 3. Add GCSE Tasks to Great War
gw.data.lessons.forEach((l, idx) => {
    l.gcse_task = {
        question: `GCSE Practice: Write a narrative account analysing the key events of Lesson ${idx + 1}.`,
        structure: [
            "Write two chronological paragraphs.",
            "Use connective phrases like 'This led to...' or 'Consequently...'",
            "Include specific historical details (dates, names, places)."
        ]
    };
});

fs.writeFileSync(gwPath, JSON.stringify(gw, null, 2));

const cmePath = './public/data/cme_new.json';
let cme = JSON.parse(fs.readFileSync(cmePath, 'utf8'));

// Fix CME New Primary Sources
if (cme.data.lessons[0].primary_source) cme.data.lessons[0].primary_source.model_answer = "Students should circle the destroyed southern wing, connecting the massive structural damage to the Irgun's strategy of targeting the British administrative and military headquarters to force a British withdrawal.";
if (cme.data.lessons[1] && cme.data.lessons[1].primary_source) cme.data.lessons[1].primary_source.model_answer = "Students should analyze the map to show the territorial fragmentation of the 1947 UN Partition Plan.";
// Fix CME New Historians Corner Schema
cme.data.lessons.forEach(l => {
    if (l.historians_corner && l.historians_corner.text && !l.historians_corner.extract) {
        l.historians_corner.author_context = l.historians_corner.text;
        l.historians_corner.extract = "The debate centers on whether the actions taken were premeditated strategy or desperate reactions to wartime chaos.";
        delete l.historians_corner.text;
    }
});

fs.writeFileSync(cmePath, JSON.stringify(cme, null, 2));
console.log('Great War and CME New fixes applied successfully.');
