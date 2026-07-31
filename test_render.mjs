import fs from 'fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><div id="container"></div>`);
global.document = dom.window.document;
global.window = dom.window;

// We need to import the function, but since it's an ES module that might depend on browser globals, 
// let's just copy the function logic from src/exam_practice_zone.js
const code = fs.readFileSync('src/exam_practice_zone.js', 'utf8');

// Strip export so we can eval it
const scriptCode = code.replace('export function renderExamPracticeZone', 'function renderExamPracticeZone');

const unitData = JSON.parse(fs.readFileSync('public/data/eee.json', 'utf8')).data;

try {
  eval(scriptCode + `
    const container = document.getElementById('container');
    renderExamPracticeZone(container, unitData);
    console.log("HTML length generated:", container.innerHTML.length);
  `);
} catch(err) {
  console.error("ERROR CAUGHT:", err);
}
