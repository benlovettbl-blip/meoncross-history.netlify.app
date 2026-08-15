const fs = require('fs');
const code = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');
const m = [...code.matchAll(/\"id\":\s*\"(lesson_[^\"]+)\"/g)];
m.forEach(x => console.log(x[1]));
