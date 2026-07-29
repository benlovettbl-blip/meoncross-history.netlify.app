const fs = require('fs');

const path = 'edexcel_medicine/data.js';
let content = fs.readFileSync(path, 'utf8');
let jsonStr = content.replace(/^export default /, '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

const imgStyle = `style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"`;

const updates = {
  'lesson_5_2': `https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_Battle_of_the_Somme%2C_July-november_1916_Q4420.jpg/500px-The_Battle_of_the_Somme%2C_July-november_1916_Q4420.jpg`,
  'lesson_5_3': `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/British_55th_Division_gas_casualties_10_April_1918.jpg/500px-British_55th_Division_gas_casualties_10_April_1918.jpg`,
  'lesson_5_4': `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Taking_away_the_wounded_in_motor_ambulance_%28Somme%29.jpg/500px-Taking_away_the_wounded_in_motor_ambulance_%28Somme%29.jpg`
};

data.lessons.forEach(l => {
  if (updates[l.id] && l.extended && l.extended.source_b) {
    const url = updates[l.id];
    let html = l.extended.source_b.content;
    // Replace the `<p ` with `<img src="url" style="..."><p `
    if (!html.includes('<img')) {
      html = html.replace('<p ', `<img src="${url}" ${imgStyle}><p `);
      l.extended.source_b.content = html;
    }
  }
});

let newContent = `export default ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully injected images into Western Front models');
