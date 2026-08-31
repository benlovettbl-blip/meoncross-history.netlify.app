const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// Parse the data
let startIndex = txt.indexOf('{');
let jsonStr = txt.substring(startIndex, txt.lastIndexOf('}') + 1);
let unitData = eval('(function(){ return ' + jsonStr + ';})()');

// 1. Update workbook titles
if (unitData.workbooks) {
  unitData.workbooks.forEach(wb => {
    if (wb.id === 'KT1') wb.title = 'Key Topic 1: The birth of the state of Israel, 1945–63';
    if (wb.id === 'KT2') wb.title = 'Key Topic 2: The escalating conflict, 1964–73';
    if (wb.id === 'KT3') wb.title = 'Key Topic 3: Attempts at a solution, 1974–95';
  });
}

// 2. Remove redundant map in Lesson 1
let l1 = unitData.lessons[0];
if (l1 && l1.title.includes('Geography')) {
  if (l1.full_page_map) delete l1.full_page_map;
  if (l1.sources) {
    l1.sources = l1.sources.filter(s => !s.title.includes('Map A:'));
  }
}

// 3. Migrate sources into narrative blocks for ALL lessons
unitData.lessons.forEach(lesson => {
  if (lesson.sources && lesson.sources.length > 0 && lesson.narrative_blocks) {
    
    // Find available blocks
    let availableIndices = [];
    lesson.narrative_blocks.forEach((block, idx) => {
      if (block && block.text && !block.source) {
        availableIndices.push(idx);
      }
    });

    if (availableIndices.length > 0) {
      // Distribute evenly
      let step = Math.max(1, Math.floor(availableIndices.length / lesson.sources.length));
      
      let sourceIdx = 0;
      for (let i = 0; i < lesson.sources.length; i++) {
        let targetIndex = availableIndices[Math.min(i * step, availableIndices.length - 1)];
        // Special keyword matching for Lesson 2 (as requested by user)
        if (lesson.title.includes('1945–1948')) {
            let srcTitle = lesson.sources[i].title.toLowerCase();
            if (srcTitle.includes('partition')) {
                let match = availableIndices.find(idx => lesson.narrative_blocks[idx].text.toLowerCase().includes('partition'));
                if (match !== undefined) targetIndex = match;
            } else if (srcTitle.includes('exodus')) {
                let match = availableIndices.find(idx => lesson.narrative_blocks[idx].text.toLowerCase().includes('exodus') || lesson.narrative_blocks[idx].text.toLowerCase().includes('refugee'));
                if (match !== undefined) targetIndex = match;
            } else if (srcTitle.includes('ben-gurion')) {
                let match = availableIndices.find(idx => lesson.narrative_blocks[idx].text.toLowerCase().includes('independence') || lesson.narrative_blocks[idx].text.toLowerCase().includes('ben-gurion'));
                if (match !== undefined) targetIndex = match;
            }
        }
        
        lesson.narrative_blocks[targetIndex].source = lesson.sources[i];
        
        // Remove from available so we don't overwrite
        availableIndices = availableIndices.filter(val => val !== targetIndex);
      }
      
      // Empty the generic sources array
      lesson.sources = [];
    }
  }
});

let outStr = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n// DONOWS_SHIFTED\n';
fs.writeFileSync(dataFile, outStr);

console.log("Patched cme_new/data.js");
