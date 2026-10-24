const fs = require('fs');
const list = JSON.parse(fs.readFileSync('usa_sources_checklist.json', 'utf8'));

let currentLesson = 0;
let out = '';

const ktNames = {
  1: 'Key Topic 1: The Development of the Civil Rights Movement, 1954–60',
  5: 'Key Topic 2: Intensification of the Civil Rights Movement, 1960–68',
  9: 'Key Topic 3: US Involvement in the Vietnam War, 1954–75',
  13: 'Key Topic 4: Reactions to, and the End of, US Involvement in Vietnam',
};

list.forEach((s) => {
  if (ktNames[s.lessonNum] && s.lessonNum !== currentLesson) {
    out += `\n---\n## 🏛️ ${ktNames[s.lessonNum]}\n\n`;
  }
  if (s.lessonNum !== currentLesson) {
    currentLesson = s.lessonNum;
    out += `### Lesson ${s.lessonNum}: ${s.lessonTitle.replace(/^KT\s*\d+\.\d+:\s*/, '')}\n\n`;
  }
  const fileLink =
    'file:///' +
    path.resolve(__dirname, '..', 'public', s.webPath.replace(/^\//, '')).replace(/\\/g, '/');
  const webLink = `http://localhost:3003${s.webPath}`;
  out += `* **Source ${s.letter}:** [${s.fileName}](${fileLink}) &nbsp;|&nbsp; [Open in Browser](${webLink})\n`;
  out += `  * **Title:** ${s.title}\n`;
  out += `  * **Archival Provenance:** ${s.provenance}\n`;
  out += `  * **Historical Visual Content:** *${s.caption}*\n\n`;
});

fs.writeFileSync('formatted_usa_links.md', out, 'utf8');
console.log('Successfully wrote formatted_usa_links.md, length:', out.length);
