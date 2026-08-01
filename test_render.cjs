const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const html = '<!DOCTYPE html><html><head><title>Test</title></head><body><div id="content-area"></div><div id="sidebar-nav-container"></div></body></html>';
const dom = new JSDOM(html, { url: "http://localhost/" });

global.window = dom.window;
global.document = dom.window.document;
global.history = dom.window.history;
global.URL = dom.window.URL;

const dataFile = fs.readFileSync('public/units/weimar_nazi_germany/data.js', 'utf8').replace('export const unitData = ', '').replace(/;\s*$/, '');
global.unitData = JSON.parse(dataFile);
global.window.currentUnitData = global.unitData;

let coreApp = fs.readFileSync('src/core_app.js', 'utf8').replace(/import.*?from.*?;/g, '').replace(/export\s+/g, '');
eval(coreApp);

try {
  window.renderLessonByIndex(5); // KT 2.2
  console.log("Successfully rendered KT2.2");
} catch (err) {
  console.error("Error rendering KT2.2:", err);
}
