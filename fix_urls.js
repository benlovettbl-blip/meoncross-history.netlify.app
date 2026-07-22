const fs = require('fs');
let code = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
code = code.replace(/^export\s+default\s+/, '').replace(/;$/, '');
const lastBrace = code.lastIndexOf('}');
const dataObj = eval('(' + code.substring(0, lastBrace + 1) + ')');

for (let lesson of dataObj.lessons) {
  if (lesson.starters) {
    for (let s of lesson.starters) {
      if (!s.source.includes('/thumb/')) {
        const parts = s.source.split('/');
        const filename = parts.pop();
        const hash2 = parts.pop();
        const hash1 = parts.pop();
        const namespace = parts.pop();
        
        if (s.source.includes('upload.wikimedia.org')) {
           s.source = `https://upload.wikimedia.org/wikipedia/${namespace}/thumb/${hash1}/${hash2}/${filename}/500px-${filename}`;
           console.log('Fixed URL:', s.source);
        }
      } else {
        // Let's decode the filename part in the thumb URL just in case there are encoded characters
        // Wait, wikimedia thumb paths literally use the encoded characters if the original URL had them.
        // E.g. /thumb/.../Fasciculus_medicinae%3B_urine.jpg/500px-Fasciculus_medicinae%3B_urine.jpg
      }
    }
  }
}

const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
fs.writeFileSync('edexcel_medicine/data.js', newDataCode, 'utf8');
