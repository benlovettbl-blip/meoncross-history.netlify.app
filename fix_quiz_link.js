const fs = require('fs');
let code = fs.readFileSync('src/quiz_zone.js', 'utf8');
code = code.replace(
    /href="\$\{window\.currentUnitId \? `\/units\/\$\{window\.currentUnitId\}\/quiz_pack\.html` : 'quiz_pack\.html'\}"/,
    'href="${window.currentUnitId ? `/units/${window.currentUnitId}/${window.currentUnitId === \'cme_new\' ? \'workbook.pdf\' : \'quiz_pack.html\'}` : \'quiz_pack.html\'}"'
);
fs.writeFileSync('src/quiz_zone.js', code);
console.log('Fixed link in quiz_zone.js');
