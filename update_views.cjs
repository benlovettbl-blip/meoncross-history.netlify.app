const fs = require('fs');
let code = fs.readFileSync('src/views.js', 'utf8');

const targetRegex = /window\.launchSubApp = function\(unitId\) \{[\s\S]*?\};\n/m;
const replacement = `window.launchSubApp = function(subAppName) {
  let mappedName = subAppName;
  if (subAppName === 'gcse_middle_east_1945_1995_new') mappedName = 'cme_new';
  if (subAppName === 'gcse_elizabethan_england') mappedName = 'eee';
  if (subAppName === 'gcse_middle_east_1945_1995') mappedName = 'cme';
  if (subAppName === 'gcse_usa_1954_1975') mappedName = 'usa';
  if (subAppName === 'great_war_v2') mappedName = 'great_war';
  
  window.location.href = '/unit.html?id=' + mappedName;
};
`;

code = code.replace(targetRegex, replacement);
fs.writeFileSync('src/views.js', code, 'utf8');
console.log('Updated views.js');
