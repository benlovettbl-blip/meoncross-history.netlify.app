const fs = require('fs');
let code = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
code = code.replace(/^export\s+default\s+/, '').replace(/;$/, '');
const lastBrace = code.lastIndexOf('}');
const dataObj = eval('(' + code.substring(0, lastBrace + 1) + ')');

dataObj.lessons.forEach(l => {
  if (l.starters) {
    l.starters.forEach((s, i) => {
      console.log(`\n--- ${l.id} Source ${i} ---`);
      console.log(`Title: ${s.title}`);
      console.log(`Caption: ${s.caption}`);
      console.log(`URL: ${s.source}`);
    });
  }
});
