const fs = require('fs');
const path = require('path');

const units = [
  'change_1450_1750',
  'cme_new',
  'great_war',
  'great_war_part2',
  'water_and_sanitation'
];

units.forEach(unit => {
  const filePath = path.join(__dirname, unit, 'generate_worksheets.js');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add lines to primary_source
  content = content.replace(
    /\$\{lesson\.primary_source\.caption \? \`<div class="source-caption">\$\{lesson\.primary_source\.caption\}<\/div>\` : ''\}/g,
    `\$\{lesson.primary_source.caption ? \`<div class="source-caption">\$\{lesson.primary_source.caption\}</div>\` : ''\}
        \$\{lesson.primary_source.question ? \`<div style="margin-top: 15px; text-align: left;"><strong>Q\$\{lesson.primary_source.qNum\}. \$\{lesson.primary_source.question.replace('Enquiry: ', '')\}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\` : ''\}`
  );

  // 2. Add lines to sources
  const oldSources = `          <div class="source-container" style="page-break-inside: avoid;">
            \$\{source.title ? \`<strong>\$\{source.title\}</strong><br>\` : ''\}
            <img src="\$\{src\}" alt="Source">
            \$\{source.caption ? \`<div class="source-caption">\$\{source.caption\}</div>\` : ''\}
          </div>`;
  const newSources = `          <div class="source-container" style="page-break-inside: avoid;">
            \$\{source.title ? \`<strong>\$\{source.title\}</strong><br>\` : ''\}
            <img src="\$\{src\}" alt="Source">
            \$\{source.caption ? \`<div class="source-caption">\$\{source.caption\}</div>\` : ''\}
            \$\{source.question ? \`<div style="margin-top: 15px; text-align: left;"><strong>Q\$\{source.qNum\}. \$\{source.question\}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\` : ''\}
          </div>`;
  content = content.replace(oldSources, newSources);

  // 3. Add lines to historians_corner
  const oldHc = `  // Historians Corner
  if (lesson.historians_corner) {
    html += \`<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">\`;
    html += \`<h3 style="margin-top: 0;">Historian's Corner: \$\{lesson.historians_corner.title\}</h3>\`;
    html += \`<p style="font-size: 11pt; font-style: italic;">\$\{lesson.historians_corner.text\}\</p>\`;
    html += \`</div>\`;
  }`;
  const newHc = `  // Historians Corner
  if (lesson.historians_corner) {
    html += \`<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">\`;
    html += \`<h3 style="margin-top: 0;">Historian's Corner: \$\{lesson.historians_corner.title\}</h3>\`;
    html += \`<p style="font-size: 11pt; font-style: italic;">\$\{lesson.historians_corner.text\}\</p>\`;
    if (lesson.historians_corner.stretch_question) {
      html += \`<div style="margin-top: 15px;"><strong>Q\$\{lesson.historians_corner.qNum\}. \$\{lesson.historians_corner.stretch_question\}</strong></div>\`;
      html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
    }
    html += \`</div>\`;
  }`;
  content = content.replace(oldHc, newHc);

  // 4. Also make sure qNum assignment includes sources and historians corner
  content = content.replace(
    /if \(lesson\.tasks\) lesson\.tasks\.forEach\(task => task\.qNum = globalQNum\+\+\);/,
    `if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
  if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
  if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;`
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${unit}`);
});

console.log('Done padding worksheets.');
