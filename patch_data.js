const fs = require('fs');
const path = require('path');

const unitsToPatch = ['change_1450_1750', 'early_modern_world'];
const baseDir = 'C:/Projects/meoncross-history.netlify.app/public/units';

unitsToPatch.forEach(unit => {
  const dataPath = path.join(baseDir, unit, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.log(`Skipping ${unit}, data.js not found at ${dataPath}`);
    return;
  }
  
  let content = fs.readFileSync(dataPath, 'utf8');
  let originalContent = content;

  // 1. NER Stripping fixes
  content = content.replace(/named  stood/g, 'named Nicolò Barbaro stood');
  content = content.replace(/21-year-old  of the Ottoman/g, '21-year-old Sultan Mehmed II of the Ottoman');
  content = content.replace(/When Protestant  took/g, 'When Protestant Queen Elizabeth I took');
  content = content.replace(/In 1494,  issued/g, 'In 1494, Pope Alexander VI issued');

  if (content !== originalContent) {
    fs.writeFileSync(dataPath, content, 'utf8');
    console.log(`Patched ${unit} NER via regex.`);
  }
});

unitsToPatch.forEach(unit => {
    const dataPath = path.join(baseDir, unit, 'data.js');
    if (!fs.existsSync(dataPath)) return;
    let content = fs.readFileSync(dataPath, 'utf8');
    const varMatch = content.match(/const\s+(\w+)\s*=\s*(\{[\s\S]*\});\s*(?:window\.\w+\s*=\s*\w+;)?\s*$/);
    if (!varMatch) {
      console.log(`Could not match JSON in ${unit}`);
      return;
    }
    
    const varName = varMatch[1];
    let dataObj;
    try {
        dataObj = JSON.parse(varMatch[2]);
    } catch(e) {
        console.error("Failed to parse JSON for " + unit, e.message);
        return;
    }

    let modified = false;

    dataObj.lessons.forEach(lesson => {
        // Task 3: Remove UI text
        if (lesson.id === 'lesson_9' && lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.text && block.text.includes('(Weighing the Evidence toggle tabs)')) {
                    block.text = block.text.replace(/\(Weighing the Evidence toggle tabs\)/gi, '').trim();
                    modified = true;
                }
            });
        }

        // Remove Canton from L3
        if (lesson.id === 'lesson_3' && lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.image === '/images/global_canton.jpg') {
                    delete block.image;
                    modified = true;
                }
            });
        }

        // Remove Britannia from L6 and L9
        if ((lesson.id === 'lesson_6' || lesson.id === 'lesson_9') && lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.image === '/images/global_britannia.jpg') {
                    delete block.image;
                    modified = true;
                }
            });
        }
    });

    if (modified) {
        let newContent = `const ${varName} = ` + JSON.stringify(dataObj, null, 2) + `;\n\nif (typeof window !== 'undefined') {\n  window.${varName} = ${varName};\n}\n`;
        fs.writeFileSync(dataPath, newContent, 'utf8');
        console.log(`Patched ${unit} via JSON object manipulation.`);
    }
});
