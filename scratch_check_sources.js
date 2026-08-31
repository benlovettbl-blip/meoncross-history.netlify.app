const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');
let startIndex = txt.indexOf('{');
let jsonStr = txt.substring(startIndex, txt.lastIndexOf('}') + 1);
let unit = eval('(' + jsonStr + ')');

let allSources = [];

unit.lessons.forEach((l, i) => {
  let sources = [];
  if (l.sources) {
    sources.push(...l.sources);
  }
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach(b => {
      if (b.source) {
        sources.push(b.source);
      }
    });
  }
  
  if (sources.length > 0) {
    console.log('\n--- Lesson ' + (i+1) + ': ' + l.title + ' ---');
    sources.forEach((s, j) => {
      console.log('Source S' + (j+1) + ': ' + s.title);
      console.log('  Image: ' + s.src);
      console.log('  Caption: ' + s.caption);
    });
  }
});
