import fs from 'fs';

const data = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
const match = data.match(/const unitData = (\{[\s\S]+\});\s*export default unitData;/);
if (match) {
  const unitData = eval('(' + match[1] + ')');
  unitData.lessons.forEach(l => {
    l.narrative_blocks.forEach((b, i) => {
      if (!b.tasks || b.tasks.length === 0) {
        console.log(`Lesson: ${l.title}`);
        console.log(`Block ${i + 1} is empty. Text preview: ${b.text.substring(0, 100).replace(/\n/g, ' ')}`);
      }
    });
  });
} else {
  console.log('No match');
}
