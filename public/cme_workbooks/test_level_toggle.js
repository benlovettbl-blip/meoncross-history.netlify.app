const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const appJsPath = fs.existsSync(path.join(__dirname, '../app_test.js')) ? path.join(__dirname, '../app_test.js') : path.join(__dirname, '../app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');
const questionsJs = fs.readFileSync(path.join(__dirname, '../questions.js'), 'utf8');

const dom = new JSDOM(html, { 
  url: 'http://localhost:3000',
  runScripts: "dangerously", 
  resources: "usable" 
});
const { window } = dom;

// Expose questions data
window.eval(questionsJs);

// Mock SpeechSynthesis
window.speechSynthesis = {
  speak: () => {},
  cancel: () => {},
  getVoices: () => []
};

// Mock AudioContext
window.AudioContext = function() {
  return {
    state: 'suspended',
    currentTime: 0,
    resume: async () => {},
    createOscillator: () => ({
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    }),
    createGain: () => ({
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {}
    }),
    createBiquadFilter: () => ({
      frequency: { setValueAtTime: () => {} },
      connect: () => {}
    }),
    destination: {}
  };
};
window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (callback) => setTimeout(callback, 0);

// Capture logs
const logs = [];
window.console.log = (...args) => {
  logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
};

// Load app.js
window.eval(appJs);

// Dispatch standard DOMContentLoaded event on window
const domEvent = new window.Event('DOMContentLoaded');
window.dispatchEvent(domEvent);

// Navigate to subtopic_1_1
window.switchView('subtopic', 'subtopic_1_1');

console.log("=== Initial load logs ===");
console.log(logs.join('\n'));

// Now find the level selector buttons
const container = window.document.getElementById('mastery-content-container');
const buttons = container.querySelectorAll('.level-toggle-btn');
console.log(`Found ${buttons.length} level buttons.`);

buttons.forEach(btn => {
  console.log(`Button level: ${btn.getAttribute('data-level')}, classes: ${btn.className}`);
});

// Click the core button
const coreBtn = Array.from(buttons).find(btn => btn.getAttribute('data-level') === 'core');
if (coreBtn) {
  console.log("Clicking Core Pass (Grade 4) button...");
  coreBtn.click();
} else {
  console.log("Core button NOT found!");
}

console.log("=== Logs after click ===");
console.log(logs.slice(logs.indexOf("=== Initial load logs ===") + 1).join('\n'));

// Check if coreSupportHtml is present in container
const coreSupport = container.querySelector('.core-support-container');
console.log(`Is coreSupportHtml present? ${!!coreSupport}`);

// Check if formulaHtml is present
const formula = container.querySelector('.exam-question-vault');
const hasFormulaText = formula && (formula.innerHTML.includes('Core Formula') || formula.innerHTML.includes('Grade 4 Formula'));
console.log(`Is formula text present in vault? ${!!hasFormulaText}`);
