import { unitData } from './weimar_nazi_germany/data.js';
import fs from 'fs';

const coreAppStr = fs.readFileSync('src/core_app.js', 'utf8');
global.window = {};

const initAppFuncStr = coreAppStr.replace(/export function/g, 'function') + '\n\n' + `
const l1 = unitData.lessons.find(l => l.id === 'lesson_1_1');
console.log(generateLessonHTML(l1, 0, unitData));
`;

try {
  eval(initAppFuncStr);
} catch (e) {
  console.log("Error evaluating:", e);
}
