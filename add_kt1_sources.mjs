import fs from 'fs';

const filePath = './weimar_nazi_germany/data.js';
let raw = fs.readFileSync(filePath, 'utf-8');

const prefix = 'export const unitData = ';
if (!raw.startsWith(prefix)) {
    console.error("Format mismatch");
    process.exit(1);
}

let jsonString = raw.substring(prefix.length).trim();
if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);

const data = JSON.parse(jsonString);

const lesson = data.lessons.find(l => l.id === 'lesson_1_1');
if (!lesson) {
    console.error("lesson_1_1 not found");
    process.exit(1);
}

// Add Source A
lesson.narrative_blocks.push({
    type: "narrative",
    theme_heading: "Source A: The Declaration of the Republic",
    text: "<p><em>An extract from a speech by Philipp Scheidemann, a leading politician of the Social Democratic Party (SPD). He shouted this from a balcony of the Reichstag building to a huge crowd of protesters on 9 November 1918, shortly after the Kaiser fled.</em></p><blockquote style='border-left: 4px solid var(--accent); padding-left: 15px; font-style: italic; background: var(--bg-card); padding: 10px;'>\"The old and rotten, the monarchy has collapsed. The new may live! Long live the German Republic!\"</blockquote>"
});

// Add Source B
lesson.narrative_blocks.push({
    type: "narrative",
    theme_heading: "Source B: The 'Stab-in-the-Back' Myth",
    text: "<p><em>An extract from the memoirs of General Erich Ludendorff, published in 1919. Ludendorff was the joint head of the German army during the First World War and was personally responsible for advising the Kaiser that the war was lost.</em></p><blockquote style='border-left: 4px solid var(--accent); padding-left: 15px; font-style: italic; background: var(--bg-card); padding: 10px;'>\"The German army was stabbed in the back. No blame is to be attached to the sound core of the army. Its performance is just as admirable as that of the officer corps. It is perfectly plain on whom the blame rests... the secret, deliberate, and cowardly political agitation in Berlin.\"</blockquote>"
});

// Add Active Writing Tasks
lesson.narrative_blocks.push({
    type: "narrative",
    theme_heading: "📝 Active Writing Tasks (A4 Paper)",
    text: "<div style='background: var(--bg-card); border: 2px solid var(--border-glass); border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);'><p><strong>Task 1: The Constrained Summary</strong></p><p>Read Source A carefully. On your lined paper, summarise exactly what Scheidemann is announcing to the crowd in <strong>no more than 10 words</strong>. However, you are <strong>not allowed</strong> to use the words 'Monarchy' or 'Republic'.</p><br><p><strong>Task 2: Historian's Judgement (Source Provenance)</strong></p><p>Read Source B. General Ludendorff was the commander who lost the war, yet here he blames the politicians. On your lined paper, write a short paragraph explaining the <em>motive</em> behind Source B. Why would Ludendorff desperately want the German public to believe this 'stab-in-the-back' myth?</p></div>"
});

const outString = prefix + JSON.stringify(data, null, 4) + ';\n';
fs.writeFileSync(filePath, outString, 'utf-8');
console.log("Successfully injected historical sources and pedagogical tasks into lesson_1_1.");
