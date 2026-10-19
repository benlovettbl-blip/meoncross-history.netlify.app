const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
const files = [
  'lesson_01_outbreak_gasmasks_worksheet.html',
  'lesson_02_evacuation_worksheet.html',
  'lesson_03_kindertransport_worksheet.html',
  'lesson_04_the_blitz_shelters_worksheet.html',
  'lesson_05_dig_for_victory_rationing_worksheet.html',
  'lesson_06_women_at_war_land_army_worksheet.html',
  'lesson_07_prewar_life_worksheet.html',
  'lesson_08_bletchley_codebreakers_worksheet.html',
  'lesson_09_rescuers_winton_worksheet.html',
  'lesson_10_ve_day_remembrance_worksheet.html',
];

files.forEach((f, idx) => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  console.log(`\n======================================================`);
  console.log(`LESSON ${idx + 1}: ${f}`);

  // Find all task titles and sub-questions
  const taskRegex = /Task\s*([0-9]+):\s*([^<\n]+)/gi;
  let match;
  while ((match = taskRegex.exec(content)) !== null) {
    console.log(`  Task ${match[1]}: ${match[2].trim()}`);
  }
});
