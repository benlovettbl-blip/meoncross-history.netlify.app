import { unitData } from './public/units/early_modern_world/data.js';
console.log(unitData.lessons.map((l, i) => `${i}: ${l.title}`).join('\n'));
