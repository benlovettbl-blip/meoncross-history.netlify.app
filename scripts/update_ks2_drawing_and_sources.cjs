const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets'),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));

  files.forEach((f) => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');

    // 1. Strip bracketed source tags in captions and alts
    // e.g., Source A (Archival Photograph): -> Source A:
    content = content.replace(
      /<strong>Source\s+([A-Z])\s*\([^)]+\):<\/strong>/g,
      '<strong>Source $1:</strong>',
    );
    content = content.replace(/alt="Source\s+([A-Z])\s*\([^)]+\)"/g, 'alt="Source $1"');

    // Lesson specific updates
    if (f.includes('lesson_04')) {
      content = content.replace(
        /Task 3: Visual Investigation • Anderson Shelter Architecture & Survival Kit/g,
        'Task 3: Visual Investigation • Draw an Anderson Shelter & Survival Kit',
      );
      content = content.replace(
        /<div class="drawing-outer-shell">[\s\S]*?<\/div>\s*<p class="canvas-subcaption">[\s\S]*?<\/p>/,
        '<div class="drawing-outer-shell">\n              <!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->\n            </div>\n            <p class="canvas-subcaption">Draw your Anderson shelter showing the curved corrugated steel roof, soil mound, and entrance.</p>',
      );
    }

    if (f.includes('lesson_05')) {
      content = content.replace(
        /Task 3: Visual Investigation • Wartime Ration Book Allowance & Allotment Menu/g,
        'Task 3: Visual Investigation • Design a Wartime Ration Dinner Plate & Recipe Ledger',
      );
      content = content.replace(
        /<div class="drawing-outer-shell">[\s\S]*?<\/div>\s*<p class="canvas-subcaption">[\s\S]*?<\/p>/,
        '<div class="drawing-outer-shell">\n              <!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->\n            </div>\n            <p class="canvas-subcaption">Draw a wartime dinner plate using rationed ingredients and homegrown allotment vegetables (e.g. Woolton Pie, carrots, and potatoes).</p>',
      );
    }

    if (f.includes('lesson_06')) {
      content = content.replace(
        /Task 3: Visual Investigation • Women's Land Army Service Armlet & Farm Duties/g,
        "Task 3: Visual Investigation • Design a Women's Land Army Armlet & Farm Duties",
      );
      content = content.replace(
        /<div class="drawing-outer-shell">[\s\S]*?<\/div>\s*<p class="canvas-subcaption">[\s\S]*?<\/p>/,
        '<div class="drawing-outer-shell">\n              <!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->\n            </div>\n            <p class="canvas-subcaption">Draw and design an official Women\'s Land Army green service armlet featuring the official WLA crown emblem.</p>',
      );
    }

    if (f.includes('lesson_07')) {
      // Empty out compare lines in task 3
      content = content.replace(
        /<div class="compare-line">[\s\S]*?<\/div>/g,
        '<div class="compare-line"></div>',
      );
    }

    if (f.includes('lesson_08')) {
      content = content.replace(
        /Task 3: Visual Investigation • The Enigma Rotor Mechanism & Cipher Wheel/g,
        'Task 3: Visual Investigation • Draw an Enigma Cipher Wheel & Decoding Mechanisms',
      );
      content = content.replace(
        /<div class="drawing-outer-shell">[\s\S]*?<\/div>\s*<p class="canvas-subcaption">[\s\S]*?<\/p>/,
        '<div class="drawing-outer-shell">\n              <!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->\n            </div>\n            <p class="canvas-subcaption">Draw your cipher wheel showing scrambled alphabet letters, rotor contacts, and electrical connections.</p>',
      );
    }

    if (f.includes('lesson_10')) {
      content = content.replace(
        /Task 3: Visual Investigation • VE Day Street Party Planner & Community Table Canvas/g,
        'Task 3: Visual Investigation • Design a VE Day Street Party Table & Community Feast',
      );
      content = content.replace(
        /<div class="drawing-outer-shell">[\s\S]*?<\/div>\s*<p class="canvas-subcaption">[\s\S]*?<\/p>/,
        '<div class="drawing-outer-shell">\n              <!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->\n            </div>\n            <p class="canvas-subcaption">Draw your community street party layout with Union Jack bunting, celebration tables, sandwiches, and treats.</p>',
      );
    }

    fs.writeFileSync(path.join(dir, f), content, 'utf8');
    console.log('Updated ' + dir + '/' + f);
  });
});

console.log('All worksheets updated successfully!');
