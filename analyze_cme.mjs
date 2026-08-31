import fs from 'fs';
import { unitData } from './public/units/cme_new/data.js';

let sourceCount = 0;
let visualCount = 0;
let glitches = [];
unitData.lessons.forEach((l, idx) => {
    if(l.sources) {
        l.sources.forEach((s, sidx) => {
            sourceCount++;
            if(s.type === 'visual' || (s.src && !s.text)) {
                visualCount++;
            }
            if(!s.text && !s.src) {
                glitches.push(`Lesson ${idx+1} (${l.title}) source ${sidx+1} missing both text and src`);
            }
            if(s.src && s.src.includes('undefined')) {
                glitches.push(`Lesson ${idx+1} (${l.title}) source ${sidx+1} has undefined in src`);
            }
        });
    }
    if (l.narrative_blocks) {
         l.narrative_blocks.forEach((b, bidx) => {
              if (b.source) {
                   sourceCount++;
                   if (b.source.type === 'visual' || (b.source.src && !b.source.text)) visualCount++;
                   if (!b.source.text && !b.source.src) {
                       glitches.push(`Lesson ${idx+1} (${l.title}) block ${bidx+1} source missing text/src`);
                   }
              }
         });
    }
});
console.log('Total sources:', sourceCount);
console.log('Visual sources:', visualCount);
if(glitches.length > 0) {
    console.log('Glitches found:');
    glitches.forEach(g => console.log(' - ' + g));
} else {
    console.log('No obvious data glitches found in sources.');
}
