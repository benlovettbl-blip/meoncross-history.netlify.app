const fs = require('fs');
const oldHtml = fs.readFileSync('great_war_old.html', 'utf8');
let currentHtml = fs.readFileSync('great_war/index.html', 'utf8');

const startIndex = oldHtml.indexOf('<!-- Interactive Milestone Modal');
const endIndex = oldHtml.indexOf('</body>');

if (startIndex !== -1 && endIndex !== -1) {
  let toInject = oldHtml.substring(startIndex, endIndex);
  toInject = toInject.replace(/<script type="module" src="app\.js"><\/script>/g, '');
  
  currentHtml = currentHtml.replace('</body>', toInject + '\n</body>');
  fs.writeFileSync('great_war/index.html', currentHtml, 'utf8');
  console.log("Successfully migrated modals into great_war/index.html");
} else {
  console.log("Could not find modals in old html");
}
