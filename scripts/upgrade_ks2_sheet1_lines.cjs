const fs = require('fs');
const path = require('path');

const targetFiles = [
  'lesson_02_evacuation_worksheet.html',
  'lesson_03_kindertransport_worksheet.html',
  'lesson_07_prewar_life_worksheet.html',
  'lesson_09_rescuers_winton_worksheet.html',
];

const dirs = [
  path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets'),
];

const twoLinesRegex =
  /<div class="ruled-handwriting-lines">\s*<div class="ruled-line"><\/div>\s*<div class="ruled-line"><\/div>\s*<\/div>/g;

const threeLinesReplacement = `<div class="ruled-handwriting-lines">
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
              </div>`;

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) return;
  targetFiles.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    // Split at Page 2 so we only upgrade Sheet 1
    const splitToken = content.includes('id="sheet-page-2"')
      ? 'id="sheet-page-2"'
      : content.includes('<!-- PAGE 2')
        ? '<!-- PAGE 2'
        : '<div class="worksheet-page"';

    const parts = content.split(splitToken);
    if (parts.length >= 2) {
      const matchCount = (parts[0].match(twoLinesRegex) || []).length;
      parts[0] = parts[0].replace(twoLinesRegex, threeLinesReplacement);
      content = parts.join(splitToken);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Upgraded ${matchCount} blocks to 3 lines in: ${path.basename(dir)}/${file}`);
    }
  });
});

console.log('🎉 Sheet 1 line upgrades complete!');
