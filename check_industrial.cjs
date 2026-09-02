const fs = require('fs');
const file = 'public/units/industrialisation_and_empire/data.js';
async function run() {
  const module = await import('file://' + require('path').resolve(file));
  const data = module.default || module.unitData;
  const lastLesson = data.lessons[data.lessons.length - 1];
  console.log(JSON.stringify(lastLesson, null, 2));
}
run();
