const fs = require('fs');
const content = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/efc3adb5-b930-4aa0-8eff-b383b1c606ab/.system_generated/steps/2202/content.md', 'utf8');
const match = content.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
const json = JSON.parse(match[1]);

function printItem(item) {
  if (!item) return;
  if (typeof item === 'object') {
    if (item.url && item.url.includes('abf89e0645884c928ad3f23ea9f9b125')) {
      console.log('FOUND REPORT MEDIA:', item);
    }
    if (item.children && Array.isArray(item.children)) {
      const txt = item.children.map(c => c.text).filter(Boolean).join(' ');
      if (txt.includes('Myall') || txt.includes('Report') || txt.includes('deposition') || txt.includes('magistrate')) {
        console.log('RELEVANT TEXT BLOCK:', txt);
      }
    }
    for (const k of Object.keys(item)) {
      printItem(item[k]);
    }
  }
}
printItem(json);
