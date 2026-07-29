const fs = require('fs');

function fixFile(file, oldTitleStr) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(oldTitleStr, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
}

fixFile('public/units/cme_new/data.js', '"title": "Conflict in the Middle East, 1945–1995",');
fixFile('public/units/edexcel_medicine/data.js', '"title": "Edexcel Medicine Through Time with Western Front",');
fixFile('edexcel_medicine/data.js', '"title": "Edexcel Medicine Through Time with Western Front",');
