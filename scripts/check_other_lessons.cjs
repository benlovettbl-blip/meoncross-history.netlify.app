const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
['lesson_02', 'lesson_03', 'lesson_07', 'lesson_09'].forEach((prefix) => {
  const f = fs.readdirSync(dir).find((x) => x.startsWith(prefix) && x.endsWith('.html'));
  if (f) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const imgs = content.match(/<img[^>]+>/g) || [];
    console.log(f + ' has ' + imgs.length + ' images:');
    imgs.forEach((img) => {
      const match = img.match(/src="([^"]+)"/);
      if (match) {
        if (match[1].startsWith('data:')) {
          console.log('   [base64 image, ' + match[1].length + ' chars]');
        } else {
          console.log('   ' + match[1]);
        }
      }
    });
  }
});
