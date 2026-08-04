const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const indexHtml = fs.readFileSync('unit.html', 'utf8');

const dom = new JSDOM(indexHtml, {
  url: "http://localhost:3000/unit.html?id=edexcel_medicine",
  runScripts: "dangerously",
  resources: "usable"
});

// Since jsdom doesn't easily load local external scripts by default with resources: usable 
// unless configured with file://, we can just manually load the scripts:

const coreCode = fs.readFileSync('src/core_app.js', 'utf8');
const dataCode = fs.readFileSync('edexcel_medicine/data.js', 'utf8');

const window = dom.window;

// Define a module mock so data.js export default works
window.eval(`
  var module = { exports: {} };
  var exports = module.exports;
  function require() { return {}; }
`);

// Transform export default to window.unitData
const transformedData = dataCode.replace(/export\s+default\s+/, 'window.unitData = ');

try {
  window.eval(transformedData);
  console.log("Loaded unitData.");
  
  // Set currentUnitId
  window.currentUnitId = 'edexcel_medicine';
  
  // Load core_app.js
  window.eval(coreCode);
  console.log("Loaded core_app.js.");

  // Dispatch DOMContentLoaded
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
  
  setTimeout(() => {
    try {
      const lesson1 = window.unitData.lessons[0];
      window.renderLesson(lesson1.id);
      console.log("Lesson rendered successfully without throwing errors!");
    } catch (e) {
      console.error("Error thrown during renderLesson:", e);
    }
  }, 100);

} catch (err) {
  console.error("Error during execution:", err);
}
