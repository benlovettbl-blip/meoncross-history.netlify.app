const fs = require('fs');
const path = require('path');

['public/units/the_shoah/textbook.html', 'public/units/the_shoah/pupil_workbook.html', 'public/units/the_shoah/workbook.html', 'public/units/the_shoah/content.html'].forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const regex = /<img[^>]+src=["']([^"']+)["']/g;
    let m;
    const list = [];
    while ((m = regex.exec(content)) !== null) {
      list.push(m[1]);
    }
    console.log(f + ' has ' + list.length + ' image references:');
    list.slice(0, 30).forEach(src => console.log('  ' + src));
  }
});
