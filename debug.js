const fs = require('fs');
let c = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');
let match = c.match(/"exam_practice": \[\s*\{\s*"question": "'The main reason why medical care[\s\S]*?\n\s*\],\n\s*"extended"/);
if (match) {
    console.log(match[0]);
} else {
    console.log("No match found");
}
