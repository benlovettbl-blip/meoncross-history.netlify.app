const fs = require('fs');
const path = require('path');

const files = [
  'generate_great_war_quiz_booklet.cjs',
  'generate_great_war_part2_quiz_booklet.cjs',
  'generate_medieval_england_quiz_booklet.cjs',
  'generate_monarchy_religion_power_quiz_booklet.cjs',
  'generate_industrialisation_quiz_booklet.cjs',
  'generate_first_british_empire_quiz_booklet.cjs',
  'generate_second_british_empire_quiz_booklet.cjs',
  'generate_ks2_quiz_booklet.cjs'
];

files.forEach(f => {
  const filePath = path.join(__dirname, '..', f);
  if (!fs.existsSync(filePath)) {
    console.log(f + ' NOT FOUND');
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const imgCalls = lines.filter(l => l.includes('getBase64Image(') && !l.includes('function getBase64Image'));
  const titleLine = lines.find(l => l.includes('<h1 class="cover-title">') || l.includes('title:') || l.includes('cover-title'));
  console.log('=== ' + f + ' ===');
  console.log('Title line:', titleLine ? titleLine.trim() : 'NONE');
  console.log('Images:', imgCalls.map(l => l.trim()).slice(0, 4));
});
