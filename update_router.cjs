const fs = require('fs');
let code = fs.readFileSync('src/unit_router.js', 'utf8');
code = code.replace(/let unitId = urlParams\.get\('id'\);/, "let unitId = urlParams.get('id');\n  window.currentUnitId = unitId;");
fs.writeFileSync('src/unit_router.js', code, 'utf8');
console.log('Updated unit_router.js');
