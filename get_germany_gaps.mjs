import { unitData } from './weimar_nazi_germany/data.js';
import fs from 'fs';

let output = `# Weimar & Nazi Germany Video Coverage & Gaps\n\n`;
output += `Here is a full breakdown of every lesson in the Germany unit, showing how many videos are currently attached and exactly where the gaps are.\n\n`;
output += `| Lesson ID | Title | Videos | Status |\n`;
output += `| :--- | :--- | :---: | :--- |\n`;

unitData.lessons.forEach(l => {
    const vids = l.video ? (Array.isArray(l.video) ? l.video : [l.video]) : [];
    const count = vids.length;
    const status = count > 0 ? `✅ Covered` : `❌ **GAP**`;
    const countStr = count > 0 ? count.toString() : `**0**`;
    output += `| **${l.id}** | ${l.title} | ${countStr} | ${status} |\n`;
});

const artifactPath = "C:\\\\Users\\\\fives\\\\.gemini\\\\antigravity-ide\\\\brain\\\\e9cd051d-fec1-4d1c-a620-280dc27bce7d\\\\germany_video_gaps.md";
fs.writeFileSync(artifactPath, output, 'utf8');
console.log("Artifact generated at " + artifactPath);
