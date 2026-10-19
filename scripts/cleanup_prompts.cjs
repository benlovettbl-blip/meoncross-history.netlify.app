const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets'),
];

dirs.forEach((dir) => {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  files.forEach((f) => {
    const fullPath = path.join(dir, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    // Check Lesson 1 sketching area
    if (f.includes('lesson_01')) {
      // Find the inner div of drawing-outer-shell
      const oldInnerRegex =
        /<div class="drawing-outer-shell">[\s\S]*?<!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->[\s\S]*?<div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.35;">[\s\S]*?<\/div>\s*<\/div>/;

      const newInner = `<div class="drawing-outer-shell">
              <!-- 100% BLANK SKETCHING CANVAS FOR PUPIL DRAWING -->
            </div>`;

      if (oldInnerRegex.test(content)) {
        content = content.replace(oldInnerRegex, newInner);
        changed = true;
        console.log(`[✓] Blanked out sketch area in ${f}`);
      }

      // Update subcaption
      const oldCap = `<p class="canvas-subcaption">🎨 Draw your cardboard respirator box, shoulder carrying strap &amp; wartime label above</p>`;
      const newCap = `<p class="canvas-subcaption">🎨 <strong>Pupil Sketching Canvas:</strong> Draw your cardboard respirator box, shoulder carrying strap and official label above</p>`;
      if (content.includes(oldCap)) {
        content = content.replace(oldCap, newCap);
        changed = true;
        console.log(`[✓] Updated subcaption in ${f}`);
      }
    }

    // Remove Prompt: or <strong>Prompt:</strong> from Task 4 across all worksheets
    const promptRegex = /<p class="thought-prompt">(?:<strong>)?Prompt:(?:<\/strong>)?\s*/g;
    const matches = content.match(promptRegex);
    if (matches && matches.length > 0) {
      content = content.replace(promptRegex, '<p class="thought-prompt">');
      changed = true;
      console.log(`[✓] Removed ${matches.length} "Prompt:" labels from ${f}`);
    }

    if (changed) {
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
});
