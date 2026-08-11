const fs = require('fs');
const filepath = 'water_and_sanitation/data.js'; // Targeting the SOURCE directory now
const code = fs.readFileSync(filepath, 'utf8');
const json = eval('(function(){ const mock_exams=[]; return ' + code.replace(/export const unitData = /,'') + '})()');

function embedSource(block, sourceObj, letter) {
  if (!sourceObj) return;
  // If it has an image (src)
  if (sourceObj.src) {
    block.image = sourceObj.src;
    block.image_alt = sourceObj.title;
    block.caption = sourceObj.caption;
    block.source_letter = letter;
  }
  // if it's text only (no src or empty src)
  else {
    block.text += '\n<br><br><div style="background: #fefce8; border: 1px solid #fde047; padding: 20px; border-radius: 8px; margin: 15px 0;"><strong>' + sourceObj.title + '</strong><br><em>' + sourceObj.caption + '</em></div>';
  }
  
  // Embed question into tasks
  if (sourceObj.question) {
    if (!block.tasks) block.tasks = [];
    block.tasks.push({
      type: 'think_pair_share',
      question: sourceObj.question,
      text: sourceObj.question
    });
  }
  if (sourceObj.tasks && sourceObj.tasks.length > 0) {
    if (!block.tasks) block.tasks = [];
    sourceObj.tasks.forEach(t => {
      block.tasks.push({
        type: 'think_pair_share', // Changing 'text' to 'think_pair_share' so it renders nicely
        text: t.text
      });
    });
  }
}

// Lesson 1
embedSource(json.lessons[0].narrative_blocks[1], json.lessons[0].primary_source, 'A');
embedSource(json.lessons[0].narrative_blocks[3], json.lessons[0].sources[0], 'B');
embedSource(json.lessons[0].narrative_blocks[3], json.lessons[0].sources[1], 'C');
// Also Fishbourne Source D (Use the local asset!)
embedSource(json.lessons[0].narrative_blocks[2], {
  src: '/assets/water_local_fishbourne.jpg', // Fixed the path!
  title: 'Source D: Fishbourne Roman Palace',
  caption: '<strong>What is this source showing?</strong> This is a modern photograph of the excavated remains of Fishbourne Roman Palace, the largest residential Roman building discovered in Britain. It features incredibly well-preserved mosaics and the remains of a sophisticated hypocaust underfloor heating system, demonstrating the extreme luxury and sanitation enjoyed by elite Romans.',
  question: 'How does the archaeological evidence at Fishbourne support the idea that elite Romans valued hygiene and comfort?'
}, 'D');
delete json.lessons[0].primary_source;
delete json.lessons[0].sources;

// Lesson 2
embedSource(json.lessons[1].narrative_blocks[1], json.lessons[1].primary_source, 'A');
delete json.lessons[1].primary_source;
delete json.lessons[1].sources;

// Lesson 3
embedSource(json.lessons[2].narrative_blocks[0], json.lessons[2].primary_source, 'A');
delete json.lessons[2].primary_source;
delete json.lessons[2].sources;

// Lesson 4
embedSource(json.lessons[3].narrative_blocks[3], json.lessons[3].primary_source, 'A');
delete json.lessons[3].primary_source;
delete json.lessons[3].sources;

// Lesson 5
embedSource(json.lessons[4].narrative_blocks[3], json.lessons[4].primary_source, 'A');
delete json.lessons[4].primary_source;
delete json.lessons[4].sources;

fs.writeFileSync(filepath, 'export const unitData = ' + JSON.stringify(json, null, 2) + ';\n');
console.log('Successfully reordered sources in water_and_sanitation/data.js!');
