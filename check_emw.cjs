const fs = require('fs');
const file = 'public/units/early_modern_world/data.js';
async function run() {
  const module = await import('file://' + require('path').resolve(file));
  const data = module.default || module.unitData;
  const lastLesson = data.lessons[data.lessons.length - 1];
  console.log(JSON.stringify(lastLesson, null, 2));
}
run();
