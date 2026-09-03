const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/units/eee/data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

fileContent = fileContent.replace(/const\s+\w+\s*=\s*/, '');
fileContent = fileContent.substring(0, fileContent.lastIndexOf('}') + 1);

const unitData = eval('(' + fileContent + ')');

const sources = [];

if (unitData.lessons) {
  unitData.lessons.forEach(lesson => {
    if (lesson.sources) {
      lesson.sources.forEach(source => {
        source.lesson_title = lesson.title;
        sources.push(source);
      });
    }
  });
}

console.log(JSON.stringify(sources, null, 2));
