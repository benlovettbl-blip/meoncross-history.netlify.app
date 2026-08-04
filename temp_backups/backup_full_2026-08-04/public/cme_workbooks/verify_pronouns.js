const fs = require('fs');

// Mock browser globals
const window = {};
global.window = window;
global.document = {
  getElementById: (id) => ({
    classList: { add: () => {}, remove: () => {} },
    appendChild: () => {},
    addEventListener: () => {},
    scrollTop: 0,
    scrollHeight: 0,
    innerText: "",
    innerHTML: "",
    style: {}
  }),
  createElement: (tag) => ({
    className: "",
    innerText: "",
    style: {}
  })
};

const AudioEngine = { play: () => {}, speak: () => {} };
global.AudioEngine = AudioEngine;

const L = {
  map: () => ({ setView: function() { return this; }, invalidateSize: function() { return this; }, addTo: function() { return this; } }),
  tileLayer: () => ({ addTo: function() { return this; } }),
  layerGroup: () => ({ addTo: function() { return this; }, clearLayers: function() { return this; } }),
  divIcon: (opts) => opts,
  marker: () => ({ addTo: function() { return this; }, bindPopup: function() { return this; }, openPopup: function() { return this; } }),
  polyline: () => ({ addTo: function() { return this; }, setStyle: function() { return this; } })
};
global.L = L;

// Load Haifa Game
let haifaCode = fs.readFileSync('scratch/haifa_game_clean.js', 'utf8').replace(/export\s+/g, '');
haifaCode += '\nwindow.processCommandInterpreter = processCommandInterpreter;\n';
eval(haifaCode);

// Load Jaffa Game
let jaffaCode = fs.readFileSync('scratch/jaffa_game_clean.js', 'utf8').replace(/export\s+/g, '');
jaffaCode += '\nwindow.processJaffaCommandInterpreter = processJaffaCommandInterpreter;\n';
eval(jaffaCode);

console.log("=== RUNNING PRONOUN INTERCEPTOR & HUD SYNC VERIFICATION ===");

// 1. Test Haifa Game Pronouns
console.log("\nTesting Haifa Game Pronouns...");
window.initParserGame();
window.meEpicEngine.state.room = "HOLD";
let haifaOut1 = window.processCommandInterpreter("take them");
console.log("Input: 'take them' -> Output:", haifaOut1);
if (!haifaOut1.includes("Did you mean TAKE CERTIFICATE?")) {
  console.error("FAIL: Haifa 'take them' did not match expected prompt.");
  process.exit(1);
}

// 2. Test Jaffa Game Pronouns
console.log("\nTesting Jaffa Game Pronouns...");
window.initJaffaParserGame();
let jaffaOut1 = window.processJaffaCommandInterpreter("take it");
console.log("Input: 'take it' -> Output:", jaffaOut1);
if (!jaffaOut1.includes("Did you mean TAKE LAND DEEDS?")) {
  console.error("FAIL: Jaffa 'take it' did not match expected prompt.");
  process.exit(1);
}

let jaffaOut2 = window.processJaffaCommandInterpreter("examine them");
console.log("Input: 'examine them' -> Output:", jaffaOut2);
if (!jaffaOut2.includes("Did you mean EXAMINE DESK?")) {
  console.error("FAIL: Jaffa 'examine them' did not match expected prompt.");
  process.exit(1);
}

// 3. Test Jaffa Inventory HUD format
console.log("\nTesting Jaffa Inventory HUD name mapping...");
window.jaffaEpicEngine.state.inventory.push("deeds");
// We mock getElementById to capture innerText changes
let hudVal = "";
global.document.getElementById = (id) => {
  return {
    style: {},
    classList: { add: () => {}, remove: () => {} },
    set innerText(val) {
      if (id === 'jaffa-inv-hud') {
        hudVal = val;
      }
    },
    get innerText() {
      return hudVal;
    }
  };
};

// Trigger display sync
syncJaffaEngineHudDisplay();
console.log("Deeds in inventory -> HUD value:", hudVal);
if (hudVal !== "JAFFA LAND DEEDS") {
  console.error(`FAIL: Jaffa HUD inventory mapped incorrectly. Expected 'JAFFA LAND DEEDS', got '${hudVal}'`);
  process.exit(1);
}

console.log("\n🎉 ALL PRONOUN INTERCEPTOR AND HUD SYNC CHECKS PASSED SUCCESSFULLY! 🎉");
process.exit(0);
