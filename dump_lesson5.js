const fs = require('fs');
const lines = fs.readFileSync('public/units/australia/data.js', 'utf8').split('\n');
let inLesson5 = false;
let endLesson5 = false;
for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('"id": "lesson_5"')) inLesson5 = true;
  if (inLesson5 && !endLesson5) {
    console.log(i + ': ' + lines[i]);
    if (lines[i].includes('</div></div></div>"')) {
      for(let j=1; j<=5; j++) {
        console.log((i+j) + ': ' + lines[i+j]);
      }
      endLesson5 = true;
    }
  }
}
