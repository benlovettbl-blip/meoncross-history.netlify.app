const fs = require('fs');
let code = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/medieval_england/data.js', 'utf8');
code = code.replace(/"doom_painting"/g, '"/images/doom_painting.jpg"');
code = code.replace(/"bosworth_field"/g, '"/images/bosworth_battle.jpg"');
code = code.replace(/\/images\/lancaster_rose\.png/g, '/images/lancaster_rose.svg');
code = code.replace(/\/images\/york_rose\.png/g, '/images/york_rose.svg');

// Let's also add tasks to Lesson 5 for the missing sources
const data = JSON.parse(code.replace('export const unitData = ', '').replace(/;\s*$/, ''));
const l5 = data.lessons[4];
const churchBlock = l5.narrative_blocks.find(b => b.title.includes('Parish Church'));
if (churchBlock && churchBlock.tasks) {
  if (!churchBlock.tasks.find(t => t.instruction && t.instruction.includes('Source A'))) {
    churchBlock.tasks.push({
      "type": "short_answer",
      "question": "Task: Look at Source A (The Medieval Church Interior). List three different activities taking place in the church other than praying.",
      "model_answer": "In Source A, you can see people trading goods, socialising/talking with their neighbours, and walking their dogs."
    });
  }
}
const doomBlock = l5.narrative_blocks.find(b => b.title.includes('Doom Paintings'));
if (doomBlock && doomBlock.tasks) {
  if (!doomBlock.tasks.find(t => t.instruction && t.instruction.includes('Source C'))) {
    doomBlock.tasks.push({
      "type": "short_answer",
      "question": "Task: Look at Source C (The Chaldon Doom Painting). Describe two terrifying things happening to the sinners in the bottom half of the painting.",
      "model_answer": "In the bottom half of Source C, sinners are being dragged into the jaws of a giant monster (Hellmouth) and demons are stabbing and torturing them with pitchforks."
    });
  }
}

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/medieval_england/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Fixed links and added missing tasks');
