import { unitData } from './weimar_nazi_germany/data.js';
import fs from 'fs';

const newlyAdded = {"lesson_1_1":4,"lesson_1_2":2,"lesson_2_1":1,"lesson_2_2":2,"lesson_2_3":1,"lesson_2_4":8,"lesson_3_1":4,"lesson_3_2":4,"lesson_3_3":2,"lesson_3_4":2,"lesson_4_2":2,"lesson_4_3":1,"lesson_4_4":4};

let output = `# Weimar & Nazi Germany Video Coverage & Gaps\n\n`;
output += `Here is a full breakdown of every lesson in the Germany unit, showing how many videos are currently attached and exactly where the gaps are. I've also added a column to show the new videos you just dropped in!\n\n`;
output += `| Lesson ID | Title | Total Videos | Status | Newly Added |\n`;
output += `| :--- | :--- | :---: | :--- | :---: |\n`;

unitData.lessons.forEach(l => {
    const vids = l.video ? (Array.isArray(l.video) ? l.video : [l.video]) : [];
    const count = vids.length;
    const status = count > 0 ? `✅ Covered` : `❌ **GAP**`;
    const countStr = count > 0 ? count.toString() : `**0**`;
    const addedCount = newlyAdded[l.id] || 0;
    const addedStr = addedCount > 0 ? `+${addedCount} videos` : `-`;
    
    output += `| **${l.id}** | ${l.title} | ${countStr} | ${status} | ${addedStr} |\n`;
});

output += `\n### Summary of Missing Topics\n`;
output += `Wow! You've filled out almost the entire unit in one go. We only have 3 specific gaps left:\n`;
output += `1. **KT1.3: The Recovery of the Republic (1924-1929)** - Stresemann, Rentenmark, Locarno.\n`;
output += `2. **KT1.4: Changes in Society (1924-1929)** - Weimar Culture, Cinema, Women in the Golden Age.\n`;
output += `3. **KT4.1: Nazi Policies Towards Women** - Kinder, Küche, Kirche, Mother's Cross, Lebensborn.\n`;


const artifactPath = "C:\\\\Users\\\\fives\\\\.gemini\\\\antigravity-ide\\\\brain\\\\e9cd051d-fec1-4d1c-a620-280dc27bce7d\\\\germany_video_gaps.md";
fs.writeFileSync(artifactPath, output, 'utf8');
console.log("Artifact generated at " + artifactPath);
