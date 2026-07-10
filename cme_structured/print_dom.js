const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const htmlContent = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000',
  runScripts: 'outside-only',
  resources: 'usable'
});

const { window } = dom;
const { document } = window;

// Mock Audio
window.AudioContext = function() {
  return {
    state: 'suspended',
    resume: async () => {},
    createOscillator: () => ({ frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }),
    createGain: () => ({ gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }),
    createBiquadFilter: () => ({ frequency: { setValueAtTime: () => {} }, connect: () => {} }),
    destination: {}
  };
};
window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
window.localStorage = {
  storage: {},
  getItem: function(k) { return this.storage[k] || null; },
  setItem: function(k, v) { this.storage[k] = String(v); }
};
window.L = {
  map: () => ({ setView: function() { return this; }, invalidateSize: function() { return this; }, addTo: function() { return this; } }),
  tileLayer: () => ({ addTo: function() { return this; } }),
  layerGroup: () => ({ addTo: function() { return this; }, clearLayers: function() { return this; } }),
  divIcon: (o) => o,
  marker: () => ({ addTo: function() { return this; }, bindPopup: function() { return this; }, openPopup: function() { return this; } })
};

// Load scripts
const questionsCode = fs.readFileSync('questions.js', 'utf8');
window.eval(questionsCode);
const appCode = fs.readFileSync('app.js', 'utf8');
window.eval(appCode);

// Dispatch DOMContentLoaded
window.dispatchEvent(new window.Event('DOMContentLoaded'));

// Switch to subtopic_1_1
const subtopicNavBtn = document.getElementById('nav-subtopic-subtopic_1_1');
subtopicNavBtn.click();

// Switch to Core level
const levelSelector = document.querySelector('.study-level-selector');
const coreBtn = levelSelector.querySelector('.level-toggle-btn[data-level="core"]');
coreBtn.click();

// Get container HTML
const container = document.getElementById('mastery-content-container');
fs.writeFileSync('scratch/compiled_core_dom.html', container.innerHTML, 'utf8');
console.log("✓ DOM HTML written to scratch/compiled_core_dom.html");
