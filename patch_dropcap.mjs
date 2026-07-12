import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let content = fs.readFileSync(filePath, 'utf8');

// We have two places in core_app.js to fix (one for standard narrative, one for L4 narrative)
const oldCondition1 = "if (!isQuote && !contentStr.includes('<pre') && contentStr.length > 20) {";
const newCondition1 = "if (!isQuote && !contentStr.trim().startsWith('<') && contentStr.length > 20) {";

const oldCondition2 = "if (!isQuote && !l4ContentStr.includes('<pre') && l4ContentStr.length > 20) {";
const newCondition2 = "if (!isQuote && !l4ContentStr.trim().startsWith('<') && l4ContentStr.length > 20) {";

let changed = false;

if (content.includes(oldCondition1)) {
  content = content.replace(oldCondition1, newCondition1);
  changed = true;
}

if (content.includes(oldCondition2)) {
  content = content.replace(oldCondition2, newCondition2);
  changed = true;
}

if (changed) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Fixed drop-cap logic breaking HTML tables!");
} else {
  console.log("Could not find the conditions to replace in core_app.js");
}
