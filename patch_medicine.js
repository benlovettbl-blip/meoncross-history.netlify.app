const fs = require('fs');
let c = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');

c = c.replace(/\s*"exam_practice": \[\s*\{\s*"question": "'The main reason why medical care and treatment was ineffective during the medieval period was because medical knowledge was based on Galen's ideas.' How far do you agree\? Explain your answer\. \(16 marks\)[^\]]+\]\s*\},/g, '');

fs.writeFileSync('public/units/edexcel_medicine/data.js', c);
