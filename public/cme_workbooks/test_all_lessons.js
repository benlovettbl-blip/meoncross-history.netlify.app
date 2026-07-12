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
  marker: () => ({ addTo: function() { return this; }, bindPopup: function() { return this; }, openPopup: function() { return this; }, bindTooltip: function() { return this; }, on: function() { return this; } })
};

// Load scripts
const questionsCode = fs.readFileSync('questions.js', 'utf8');
window.eval(questionsCode);
const appCode = fs.readFileSync(fs.existsSync('app_test.js') ? 'app_test.js' : 'app.js', 'utf8');
window.eval(appCode);

// Dispatch DOMContentLoaded
window.dispatchEvent(new window.Event('DOMContentLoaded'));

const subtopics = ['subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3', 'subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3', 'subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'];

subtopics.forEach(subId => {
  // Navigate to subtopic
  const subtopicNavBtn = document.getElementById(`nav-subtopic-${subId}`);
  if (subtopicNavBtn) {
    subtopicNavBtn.click();
  } else {
    console.error(`Could not find nav button for ${subId}`);
    return;
  }

  // Toggle Core
  const levelSelector = document.querySelector('.study-level-selector');
  if (levelSelector) {
    const coreBtn = levelSelector.querySelector('.level-toggle-btn[data-level="core"]');
    if (coreBtn) {
      coreBtn.click();
    }
  }

  // Check containers
  const container = document.getElementById('mastery-content-container');
  const practiceCard = container.querySelector('.scaffold-practice-card');
  const vocabCard = container.querySelector('.core-vocab-card');
  const timelineCard = container.querySelector('.core-timeline-card');
  
  console.log(`Subtopic: ${subId}`);
  console.log(`  Level buttons: ${[...document.querySelectorAll('.level-toggle-btn')].map(b => b.textContent.trim()).join(' | ')}`);
  console.log(`  Practice card found: ${!!practiceCard}`);
  if (practiceCard) {
    const questionText = practiceCard.querySelector('span').textContent.trim();
    console.log(`    Question: ${questionText}`);
  }
  console.log(`  Vocab card found: ${!!vocabCard}`);
  console.log(`  Timeline card found: ${!!timelineCard}`);
});
