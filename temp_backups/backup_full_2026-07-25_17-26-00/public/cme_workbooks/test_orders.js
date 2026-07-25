const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><html><body>
  <div id="me-scroll-screen"></div>
  <form id="me-parser-form"><input id="me-user-input" /></form>
  <button id="me-btn-look"></button>
  <button id="me-btn-interact"></button>
  <button id="me-btn-walk"></button>
  <div id="me-exam-insight"></div>
</body></html>`, { runScripts: "dangerously" });

const window = dom.window;
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

// Mock audio / speechSynthesis
window.speechSynthesis = {
  speak: () => {},
  getVoices: () => []
};

// HTMLCanvasElement mock
window.HTMLCanvasElement.prototype.getContext = function(type) {
  return {
    fillRect: () => {},
    strokeRect: () => {},
    fillText: () => {},
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fill: () => {},
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    drawImage: () => {},
    getContextAttributes: () => ({}),
    isPointInPath: () => false,
    measureText: () => ({ width: 10 })
  };
};

const code = fs.readFileSync('app.js', 'utf8');
window.eval(code);

// Now trigger DOMContentLoaded
const callback = window.initParserGame; // or wait, let's trigger DOMContentLoaded
// Let's print out what window has
console.log("window.initParserGame:", typeof window.initParserGame);
console.log("window.processCommandInterpreter:", typeof window.processCommandInterpreter);
console.log("window.meEpicEngine:", typeof window.meEpicEngine);

// Let's call initParserGame
window.initParserGame();

const state = window.meEpicEngine.state;
state.chapter = 3;
state.room = "DUNES";
state.inventory = ["orders"];

console.log("State before:", JSON.stringify(state));

// Let's get the form and input field from document
const form = window.document.getElementById('me-parser-form');
const input = window.document.getElementById('me-user-input');

console.log("form exists:", !!form);
console.log("input exists:", !!input);

input.value = 'use orders';
const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });

try {
  form.dispatchEvent(submitEvent);
} catch (e) {
  console.error("Error during dispatchEvent:", e);
}

console.log("State after:", JSON.stringify(state));

