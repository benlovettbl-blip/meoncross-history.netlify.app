const fs = require('fs');
let rawData = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');
let jsonStr = rawData.replace(/import .*?;\n/g, '');
jsonStr = jsonStr.replace(/if\s*\(\s*typeof\s*module\s*!==\s*['"]undefined['"]\s*\)\s*\{[\s\S]*?;\s*\n?\}/g, '');
jsonStr = jsonStr.replace(/export const unitData = |export default |export const gwData = |const unitData = |module\.exports = /g, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
try {
  eval('(' + jsonStr + ')');
  console.log('Success');
} catch (e) {
  console.log(e.message);
  console.log("LAST 50:", JSON.stringify(jsonStr.slice(-50)));
}
