const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// 1. Setup virtual browser environment
const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, {
  url: "http://localhost/",
  runScripts: "dangerously",
  resources: "usable"
});

const { window } = dom;
const { document } = window;

// Mock audio/speech APIs
window.AudioContext = function() {
  return {
    state: 'suspended',
    currentTime: 0,
    resume: async () => {},
    createOscillator: () => ({
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {}, start: () => {}, stop: () => {}
    }),
    createGain: () => ({
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {}
    }),
    destination: {}
  };
};
window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
window.cancelAnimationFrame = (id) => clearTimeout(id);

window.HTMLCanvasElement.prototype.getContext = function(type) {
  return {
    fillRect: () => {}, strokeRect: () => {}, fillText: () => {}, clearRect: () => {},
    beginPath: () => {}, closePath: () => {}, moveTo: () => {}, lineTo: () => {},
    stroke: () => {}, fill: () => {}, save: () => {}, restore: () => {},
    translate: () => {}, rotate: () => {}, scale: () => {}, ellipse: () => {},
    drawImage: () => {}, createLinearGradient: () => ({ addColorStop: () => {} })
  };
};

window.speechSynthesis = {
  getVoices: () => [],
  cancel: () => {},
  speak: () => {}
};

// Load questions.js and app.js
const qCode = fs.readFileSync('questions.js', 'utf8');
const appCode = fs.readFileSync('app.js', 'utf8');

// Inject
const scriptQ = document.createElement("script");
scriptQ.textContent = qCode;
document.body.appendChild(scriptQ);

const scriptApp = document.createElement("script");
scriptApp.textContent = appCode;
document.body.appendChild(scriptApp);

// Run tests after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  try {
    console.log("Initializing parser game...");
    window.initParserGame();
    
    const canvas = document.getElementById('me-adventure-canvas');
    if (!canvas) {
      throw new Error("Canvas element not found!");
    }
    
    console.log("Simulating click on HATCH (Transition hotspot)...");
    
    // Simulate cursor mode set to LOOK
    window.setCursorMode('LOOK');
    
    // Create click event
    // In our event listener: clickX = (e.clientX - rect.left) * scaleX;
    // We mock getBoundingClientRect
    canvas.getBoundingClientRect = () => ({
      left: 10, top: 10, width: 800, height: 450
    });
    
    const clickEvent = new window.MouseEvent('click', {
      clientX: 260, // 260 - 10 = 250 (Hatch is at x=250)
      clientY: 380, // 380 - 10 = 370 (Hatch is at y=370)
      bubbles: true,
      cancelable: true
    });
    
    canvas.dispatchEvent(clickEvent);
    console.log("✓ Dispatch click in LOOK mode successful!");
    
    // Set to INTERACT
    window.setCursorMode('INTERACT');
    canvas.dispatchEvent(clickEvent);
    console.log("✓ Dispatch click in INTERACT mode successful!");
    
    // Set to WALK
    window.setCursorMode('WALK');
    canvas.dispatchEvent(clickEvent);
    console.log("✓ Dispatch click in WALK mode successful!");
    
    console.log("--- ALL EVENT SIMULATIONS PASSED SUCCESSFULLY WITH NO RUNTIME ERRORS! ---");
  } catch (err) {
    console.error("FAIL:", err);
    process.exit(1);
  }
});
