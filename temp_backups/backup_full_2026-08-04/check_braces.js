const fs = require('fs');
const code = fs.readFileSync('water_and_sanitation/app.js', 'utf8');

let count = 0;
let inString = false;
let strChar = '';

for (let i = 0; i < code.length; i++) {
  let c = code[i];
  
  if (!inString && (c === '`' || c === '\'' || c === '"')) {
    inString = true;
    strChar = c;
  } else if (inString && c === strChar && code[i-1] !== '\\') {
    inString = false;
  }
  
  if (!inString) {
    if (c === '{') count++;
    if (c === '}') {
      count--;
      if (count < 0) {
        const lines = code.substring(0, i).split('\n');
        console.log('Negative count at line', lines.length);
        console.log('Line content:', lines[lines.length - 1]);
        break;
      }
    }
  }
}
console.log('Final brace count:', count);
