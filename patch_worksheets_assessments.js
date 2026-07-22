const fs = require('fs');
const path = require('path');

const units = ['great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'change_1450_1750', 'cme_new'];

units.forEach(unit => {
  const file = path.join(unit, 'generate_worksheets.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the hardcoded source_utility scaffolding with dynamic scaffolding
    const searchStr = 'html += `<p style="font-style: italic; color: #555;">Use the writing lines below to answer the 8-mark question. Remember to analyze the content, provenance, and apply your contextual knowledge.</p>`;\\n      for(let i=0; i<16; i++) {\\n        html += `<div class="task-lines-large"></div>`;\\n      }';
    
    const replaceStr = 'let isSingle = assessment.sources && assessment.sources.length === 1;\\n      let numMarks = isSingle ? "4" : "8";\\n      let numLines = isSingle ? 8 : 16;\\n      html += `<p style="font-style: italic; color: #555;">Use the writing lines below to answer the ${numMarks}-mark question. Remember to analyze the content, provenance, and apply your contextual knowledge.</p>`;\\n      for(let i=0; i<numLines; i++) {\\n        html += `<div class="task-lines-large"></div>`;\\n      }';

    // To handle varying whitespace, let's use a regex
    const regex = /html \+= `\<p style="font-style: italic; color: #555;"\>Use the writing lines below to answer the 8-mark question\. Remember to analyze the content, provenance, and apply your contextual knowledge\.\<\/p\>`;\s*for\(let i=0; i<16; i\+\+\) \{\s*html \+= `\<div class="task-lines-large"\>\<\/div\>`;\s*\}/g;

    if (regex.test(content)) {
      content = content.replace(regex, replaceStr.replace(/\\n/g, '\n'));
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${unit}`);
    } else {
      console.log(`Pattern not found in ${unit}`);
    }
  }
});
console.log('Done.');
