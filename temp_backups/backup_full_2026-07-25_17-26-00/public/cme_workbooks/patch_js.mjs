import fs from 'fs';

// Fix past_papers.js
let pp = fs.readFileSync('src/past_papers.js', 'utf8');
pp = pp.replace(/const density = document\.getElementById\('bulk-workbook-density'\)\.value;/g, "const density = 'comfortable';");
fs.writeFileSync('src/past_papers.js', pp);
console.log("Fixed past_papers.js");

// Fix lessons.js
let lessons = fs.readFileSync('src/lessons.js', 'utf8');
lessons = lessons.replace(/const density = document\.getElementById\('workbook-creator-density'\)\.value;/g, "const density = 'comfortable';");
fs.writeFileSync('src/lessons.js', lessons);
console.log("Fixed lessons.js");
