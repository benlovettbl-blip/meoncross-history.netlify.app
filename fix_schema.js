const fs = require('fs');

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

data.lessons.forEach(lesson => {
  // Fix historian's corner
  if (lesson.historians_corner) {
    let hc = lesson.historians_corner;
    if (hc.quote && hc.historian) {
      hc.text = `**${hc.historian}** argues:\n\n"${hc.quote}"`;
      hc.stretch_question = hc.question || "What does this historian argue about the topic?";
      hc.stretch_model = "The historian argues that..."; // Generic model
      
      delete hc.quote;
      delete hc.historian;
      delete hc.question;
    }
  }

  // Fix pair_share
  if (lesson.pair_share) {
    let ps = lesson.pair_share;
    if (ps.topic && ps.instructions) {
      ps.prompt = ps.topic;
      ps.think = "Spend 1 minute quietly considering the question and forming your own opinion.";
      ps.pair = ps.instructions;
      ps.share = "Share your ideas with the class and prepare to defend your viewpoint.";

      delete ps.topic;
      delete ps.instructions;
    }
  }
});

fs.writeFileSync('water_and_sanitation/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';');
console.log('Fixed schema for historians_corner and pair_share in water_and_sanitation/data.js');
