const fs = require('fs');
let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');

let idx = 0;
while (true) {
    idx = c.indexOf('"type": "written"', idx);
    if (idx === -1) break;
    
    let textStart = c.indexOf('"text": "', idx) + 9;
    let textEnd = c.indexOf('",', textStart);
    let text = c.substring(textStart, textEnd);
    
    if (text.split(' ').length < 30) {
        console.log('SHORT SOURCE TEXT:', text);
    }
    
    idx = textEnd;
}
