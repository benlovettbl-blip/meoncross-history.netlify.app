const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let coreCode = fs.readFileSync('src/core_app.js', 'utf8');

// Strip out ES module imports/exports
coreCode = coreCode.replace(/import\s+.*?;\n/g, '');
coreCode = coreCode.replace(/export\s+function/g, 'window.getAssetUrl = function');

let dataCode = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
dataCode = dataCode.replace(/export\s+default\s+/, 'window.unitData = ');

// Strip trailing semicolon from unitData if present or just ensure valid syntax
const lastBrace = dataCode.lastIndexOf('}');
dataCode = dataCode.substring(0, lastBrace + 1) + ';';

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="content-area"></div></body></html>`, { url: 'http://localhost' });
const window = dom.window;

// Setup global mock
global.window = window;
global.document = window.document;

try {
  window.eval(dataCode);
  window.currentUnitId = 'edexcel_medicine';
  window.eval(coreCode);
  
  // Trigger init
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
  
  setTimeout(() => {
    try {
      const lesson1 = window.unitData.lessons[0];
      // renderLesson is inside initializeApp, but maybe not accessible directly on window.
      // Wait, is renderLesson accessible? No, but initializeApp sets up sidebar buttons.
      // We can just simulate a click on the sidebar link for KT1.1!
      const link = window.document.querySelector('.lesson-link');
      if (link) {
        link.click();
        console.log("Clicked lesson 1 successfully. Content inside content-area length:", window.document.getElementById('content-area').innerHTML.length);
      } else {
        console.error("Lesson link not found");
      }
    } catch (e) {
      console.error("Error during rendering lesson:", e);
    }
  }, 500);

} catch (err) {
  console.error("Eval error:", err);
}
