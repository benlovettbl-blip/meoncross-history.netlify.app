const fs = require('fs');

console.log("=================================================");
console.log("RUNNING COMPLETE STEP-BY-STEP PLAYTHROUGH TESTS");
console.log("=================================================");

// Read and prepare Haifa Game code
let haifaCode = fs.readFileSync('scratch/haifa_game_clean.js', 'utf8').replace(/export\s+/g, '');
haifaCode += '\nwindow.processCommandInterpreter = processCommandInterpreter;\n';

// Read and prepare Jaffa Game code
let jaffaCode = fs.readFileSync('scratch/jaffa_game_clean.js', 'utf8').replace(/export\s+/g, '');
jaffaCode += '\nwindow.processJaffaCommandInterpreter = processJaffaCommandInterpreter;\n';

// Global mock context
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

// Evaluate both modules
eval(haifaCode);
eval(jaffaCode);

// Helper function to assert output contains substring
function assertOutput(gameName, cmd, actual, expectedSubstrings) {
  for (const exp of expectedSubstrings) {
    if (!actual.toLowerCase().includes(exp.toLowerCase())) {
      console.error(`❌ [${gameName}] Command '${cmd}' failed!`);
      console.error(`Expected response to include: "${exp}"`);
      console.error(`Actual response: "${actual}"`);
      process.exit(1);
    }
  }
  console.log(`  ✓ [${gameName}] '${cmd}' -> PASS`);
}

// -----------------------------------------------------------------
// HAIFA TO SINAI: TEXT ADVENTURE PLAYTHROUGH
// -----------------------------------------------------------------
console.log("\n--- Haifa to Sinai Playthrough ---");
window.initParserGame();
let state = window.meEpicEngine.state;

let out = window.processCommandInterpreter('look');
assertOutput("Haifa", "look", out, ["Exodus 1947", "immigrant vessel", "Haifa Port"]);

out = window.processCommandInterpreter('go down');
assertOutput("Haifa", "go down", out, ["cargo hold", "crates"]);

out = window.processCommandInterpreter('examine crate');
assertOutput("Haifa", "examine crate", out, ["shipping crate", "certificates"]);
if (!state.ch1_crateChecked) throw new Error("ch1_crateChecked should be true");

out = window.processCommandInterpreter('TAKE ILLEGAL CERTIFICATE');
assertOutput("Haifa", "TAKE ILLEGAL CERTIFICATE", out, ["entry CERTIFICATE", "crate", "pocket"]);
if (!state.inventory.includes("certificate")) throw new Error("Inventory should contain certificate");

out = window.processCommandInterpreter('go up');
assertOutput("Haifa", "go up", out, ["Exodus 1947", "immigrant vessel", "Haifa Port"]);

out = window.processCommandInterpreter('go east');
assertOutput("Haifa", "go east", out, ["Haifa Port", "British soldiers"]);

out = window.processCommandInterpreter('BYPASS WHITE PAPER QUOTA');
assertOutput("Haifa", "BYPASS WHITE PAPER QUOTA", out, ["officer examines", "Haifa", "Chapter 2 Unlocked"]);
if (state.chapter !== 2) throw new Error("Should transition to chapter 2");
if (state.room !== "OUTPOST") throw new Error("Should transition to room OUTPOST");

// Chapter 2 Outpost
out = window.processCommandInterpreter('go south');
assertOutput("Haifa", "go south", out, ["communications bunker", "shortwave radio"]);

out = window.processCommandInterpreter('examine crate');
assertOutput("Haifa", "examine crate", out, ["manufactured in Prague", "spool of electrical wire"]);

out = window.processCommandInterpreter('SECURE CZECH ARMS SHIPMENT');
assertOutput("Haifa", "SECURE CZECH ARMS SHIPMENT", out, ["electrical WIRE spool", "Czech armament supply"]);
if (!state.inventory.includes("wire")) throw new Error("Inventory should contain wire");

out = window.processCommandInterpreter('use wire');
assertOutput("Haifa", "use wire", out, ["splice it onto the broken terminal", "functional"]);
if (!state.ch2_radioRepaired) throw new Error("ch2_radioRepaired should be true");

out = window.processCommandInterpreter('go up');
assertOutput("Haifa", "go up", out, ["outpost in the Negev", "Arab-Israeli War"]);

out = window.processCommandInterpreter('go north');
assertOutput("Haifa", "go north", out, ["sandbagged", "anxious"]);

out = window.processCommandInterpreter('go south'); // check coordinates block
assertOutput("Haifa", "go south", out, ["Before leaving the observation post", "coordinates"]);

out = window.processCommandInterpreter('use radio');
assertOutput("Haifa", "use radio", out, ["dials", "reinforcements", "defend"]);
if (!state.ch2_reinforcementsCalled) throw new Error("ch2_reinforcementsCalled should be true");

out = window.processCommandInterpreter('CONSOLIDATE ISRAEL DEFENSE FORCES');
assertOutput("Haifa", "CONSOLIDATE ISRAEL DEFENSE FORCES", out, ["coordination", "Chapter 3 Unlocked"]);
if (state.chapter !== 3) throw new Error("Should transition to chapter 3");
if (state.room !== "COMMAND") throw new Error("Should transition to room COMMAND");

// Chapter 3 Command
out = window.processCommandInterpreter('EXAMINE SEVRES PROTOCOL');
assertOutput("Haifa", "EXAMINE SEVRES PROTOCOL", out, ["drawer", "Sèvres Protocol", "orders"]);
if (!state.ch3_cabinetChecked) throw new Error("ch3_cabinetChecked should be true");
if (!state.inventory.includes("orders")) throw new Error("Inventory should contain orders");

out = window.processCommandInterpreter('go south');
assertOutput("Haifa", "go south", out, ["desert ridge", "armored patrol", "IDF half-tracks"]);

out = window.processCommandInterpreter('use orders');
assertOutput("Haifa", "use orders", out, ["blockaded our shipping lanes", "Eilat"]);
if (!state.ch3_awaitingChokepoint) throw new Error("ch3_awaitingChokepoint should be true");

// Puzzle answer check
out = window.processCommandInterpreter('REOPEN STRAITS OF TIRAN');
assertOutput("Haifa", "REOPEN STRAITS OF TIRAN", out, ["Accreditation Sequence Passed", "Sinai wastes", "completed"]);
if (!state.ch3_victory) throw new Error("ch3_victory should be true");


// -----------------------------------------------------------------
// CHRONOLOGY COMMAND: JAFFA TO GAZA PLAYTHROUGH
// -----------------------------------------------------------------
console.log("\n--- Jaffa to Gaza Playthrough ---");
window.initJaffaParserGame();
let jaffaState = window.jaffaEpicEngine.state;

let jOut = window.processJaffaCommandInterpreter('look');
assertOutput("Jaffa", "look", jOut, ["family home in Jaffa", "Deir Yassin", "desk", "Jaffa Harbor"]);

jOut = window.processJaffaCommandInterpreter('examine desk');
assertOutput("Jaffa", "examine desk", jOut, ["search the wooden desk", "Jaffa land deeds"]);
if (!jaffaState.ch1_deedsSecured) throw new Error("ch1_deedsSecured should be true");

jOut = window.processJaffaCommandInterpreter('take deeds');
assertOutput("Jaffa", "take deeds", jOut, ["pocket", "ownership of your family lands"]);
if (!jaffaState.inventory.includes("deeds")) throw new Error("Inventory should contain deeds");

jOut = window.processJaffaCommandInterpreter('go west');
assertOutput("Jaffa", "go west", jOut, ["water's edge", "collapsing", "coastal highway"]);

jOut = window.processJaffaCommandInterpreter('go south');
assertOutput("Jaffa", "go south", jOut, ["escape", "Nakba", "exodus road", "Chapter 2 Unlocked"]);
if (jaffaState.chapter !== 2) throw new Error("Should transition to chapter 2");
if (jaffaState.room !== "ROAD") throw new Error("Should transition to room ROAD");

// Chapter 2 Road
jOut = window.processJaffaCommandInterpreter('go south'); // checks rations card block
assertOutput("Jaffa", "go south", jOut, ["rations card", "relief station"]);

jOut = window.processJaffaCommandInterpreter('examine station');
assertOutput("Jaffa", "examine station", jOut, ["relief station", "rations", "verify"]);

jOut = window.processJaffaCommandInterpreter('use deeds');
assertOutput("Jaffa", "use deeds", jOut, ["present your Jaffa land deeds", "rations card"]);
if (!jaffaState.ch2_rationsSecured) throw new Error("ch2_rationsSecured should be true");
if (!jaffaState.inventory.includes("rations")) throw new Error("Inventory should contain rations");

jOut = window.processJaffaCommandInterpreter('go south');
assertOutput("Jaffa", "go south", jOut, ["rations card", "refugee camp", "Chapter 3 Unlocked"]);
if (jaffaState.chapter !== 3) throw new Error("Should transition to chapter 3");
if (jaffaState.room !== "CAMPS") throw new Error("Should transition to room CAMPS");

// Chapter 3 Camps
jOut = window.processJaffaCommandInterpreter('examine fedayeen');
assertOutput("Jaffa", "examine fedayeen", jOut, ["recruiter", "Fedayeen group", "camp name"]);
if (!jaffaState.ch3_awaitingChokepoint) throw new Error("ch3_awaitingChokepoint should be true");

jOut = window.processJaffaCommandInterpreter('Shati');
assertOutput("Jaffa", "Shati", jOut, ["ACCREDITATION", "Shati", "COMPLETED"]);
if (!jaffaState.ch3_victory) throw new Error("ch3_victory should be true");

console.log("\n=================================================");
console.log("🎉 ALL PLAYTHROUGH TESTS PASSED SUCCESSFULLY! 🎉");
console.log("=================================================");
