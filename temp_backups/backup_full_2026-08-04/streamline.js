const fs = require('fs');
const path = require('path');

// 1. Update app.js
const appJsPath = path.join(__dirname, 'great_war_v2', 'app.js');
let appContent = fs.readFileSync(appJsPath, 'utf8');

appContent = appContent.replace(/Question \$\{/g, "Q${");
appContent = appContent.replace(/\.qNum\}:/g, ".qNum}.");
// For the primary source it might be `Q${lesson.primary_source.qNum}. `
appContent = appContent.replace(/\(Extended Scholarship\)\s*/g, "");

fs.writeFileSync(appJsPath, appContent);
console.log("app.js updated.");

// 2. Update generate_worksheets.js
const genJsPath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let genContent = fs.readFileSync(genJsPath, 'utf8');

genContent = genContent.replace(/Question \$\{/g, "Q${");
genContent = genContent.replace(/\.qNum\}:/g, ".qNum}.");
genContent = genContent.replace(/\(Extended Scholarship\)\s*/g, "");

fs.writeFileSync(genJsPath, genContent);
console.log("generate_worksheets.js updated.");

// 3. Update data.js title
const dataJsPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataJsPath, 'utf8');

dataContent = dataContent.replace(/"title":\s*"Extended Scholarship"/g, '"title": "The Historian\'s Challenge"');

fs.writeFileSync(dataJsPath, dataContent);
console.log("data.js updated.");

