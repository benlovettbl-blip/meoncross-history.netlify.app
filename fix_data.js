const fs = require('fs');

// 1. Fix Historian's Corner name bolding
let dataFile = 'water_and_sanitation/data.js';
let content = fs.readFileSync(dataFile, 'utf8');
content = content.replace(/\*\*Simon Schama\*\*/g, '<strong>Simon Schama</strong>');
fs.writeFileSync(dataFile, content);

// 2. Add Simon Schama to biographies.json
let biosFile = 'water_and_sanitation/biographies.json';
let bios = JSON.parse(fs.readFileSync(biosFile, 'utf8'));
bios.push({
  name: "Simon Schama",
  role: "Modern Historian",
  bio: "Sir Simon Schama is a leading contemporary British historian and author. He argues that Roman public health was driven as much by their desire to project 'Roman identity' and civilization as it was by a genuine desire to stop disease."
});
fs.writeFileSync(biosFile, JSON.stringify(bios, null, 2));

console.log('Fixed data.js and biographies.json');
