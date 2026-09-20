const fs = require('fs');
const lines = fs.readFileSync('units/edexcel_medicine/data.js', 'utf8').split('\n');

let kt4Start = -1,
  kt4End = -1,
  kt5Start = -1,
  kt5End = -1;

for (let i = 0; i < 13348; i++) {
  if (lines[i].includes("id: 'lesson_4_1'") && kt4Start === -1) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        kt4Start = j;
        break;
      }
    }
  }
  if (lines[i].includes("id: 'lesson_5_1'") && kt5Start === -1) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        kt5Start = j;
        kt4End = j - 1;
        break;
      }
    }
  }
  if (lines[i].includes('specification: [')) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '],') {
        kt5End = j - 1;
        break;
      }
    }
  }
}

console.log('kt4Start:', kt4Start, 'kt4End:', kt4End);
console.log('kt5Start:', kt5Start, 'kt5End:', kt5End);
console.log('Line at kt4Start:', lines[kt4Start]);
console.log('Line at kt5Start:', lines[kt5Start]);
console.log('Line at kt5End:', lines[kt5End]);
