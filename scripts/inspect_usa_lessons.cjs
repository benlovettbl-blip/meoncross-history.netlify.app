const fs = require('fs');
const path = require('path');
const vm = require('vm');

const content = fs.readFileSync(path.join(__dirname, '../units/usa/data.js'), 'utf8');
const sandbox = {};
const code = content
  .replace(/export\s+default\s+/, 'sandbox.data = ')
  .replace(/export\s+.*?;/g, '');
vm.runInNewContext(code, sandbox);
const d = sandbox.data;

console.log('Total lessons:', d.lessons.length);
d.lessons.forEach((l, i) => {
  console.log(`L${i + 1} [${l.id}]: ${l.title}`);
  if (l.video) {
    console.log(`   Has ${l.video.length} videos`);
  } else {
    console.log(`   No videos`);
  }
});
