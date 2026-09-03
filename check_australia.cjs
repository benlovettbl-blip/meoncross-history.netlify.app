const fs = require('fs');
const file = 'public/units/australia/data.js';
// We just need to load it dynamically. We can read it, extract the "export default" to a variable or use a dynamic import.
async function run() {
  const module = await import('file://' + require('path').resolve(file));
  const data = module.default || module.unitData;
  const lastLesson = data.lessons[data.lessons.length - 1];
  console.log(JSON.stringify(lastLesson, null, 2));
}
run();
