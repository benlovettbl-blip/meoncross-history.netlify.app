const fs = require('fs');
const oldHtml = fs.readFileSync('great_war_old.html', 'utf8');
const lines = oldHtml.split('\n');
const startIndex = lines.findIndex(l => l.includes('Interactive Milestone Modal'));
const endIndex = lines.findIndex(l => l.includes('</body>'));
console.log('Start index:', startIndex, 'End index:', endIndex);
if (startIndex !== -1 && endIndex !== -1) {
  let toInject = lines.slice(startIndex, endIndex).join('\n');
  toInject = toInject.replace(/<script type="module" src="app\.js"><\/script>/g, '');
  let currentHtml = fs.readFileSync('great_war/index.html', 'utf8');
  currentHtml = currentHtml.replace('</body>', toInject + '\n</body>');
  fs.writeFileSync('great_war/index.html', currentHtml, 'utf8');
  console.log('Injected successfully');
}
