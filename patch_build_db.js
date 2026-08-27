const fs = require('fs');
let c = fs.readFileSync('build_database.cjs', 'utf8');

let findStr = `      db[unitKey].data = mod.unitData || mod.gwData || mod.default;`;
let replaceStr = `      db[unitKey].data = mod.unitData || mod.gwData || mod.default;
      
      // Orphaned Questions Guard
      if (db[unitKey].data && db[unitKey].data.lessons) {
        db[unitKey].data.lessons.forEach((lesson, lIdx) => {
          if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach((block, bIdx) => {
              if (block.tasks) {
                block.tasks.forEach((task) => {
                  if (task.type === 'source_analysis') {
                    console.warn(\`\\x1b[33m[WARNING] Orphaned source_analysis task found in narrative_blocks for \${unitKey} Lesson \${lIdx + 1}. Please move it to the sources array.\\x1b[0m\`);
                  }
                });
              }
            });
          }
        });
      }`;

if (c.includes(findStr)) {
    c = c.replace(findStr, replaceStr);
    fs.writeFileSync('build_database.cjs', c);
    console.log('Patched build_database.cjs with Orphaned Questions Guard');
} else {
    console.log('Could not find match in build_database.cjs');
}
