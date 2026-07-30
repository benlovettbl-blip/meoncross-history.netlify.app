const fs = require('fs');

const dataPath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

let dataObj;
try {
  dataObj = eval('(function(){ ' + content.replace(/export const (unitData) =/, 'return') + '; })()');
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

// Ensure lesson_4_1 is in the KT4 workbooks
const kt4Wb = dataObj.workbooks.find(w => w.id === 'KT4');
if (kt4Wb && !kt4Wb.lessons.includes('lesson_4_1')) {
    kt4Wb.lessons.push('lesson_4_1');
}

const kt4PWb = dataObj.printable_workbooks.find(w => w.id === 'KT4');
if (kt4PWb && !kt4PWb.lessons.includes('lesson_4_1')) {
    kt4PWb.lessons.push('lesson_4_1');
}

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully linked lesson_4_1 to KT4 workbooks!");
