const fs = require('fs');

// Read the Jaffa game code
let code = fs.readFileSync('scratch/jaffa_game_clean.js', 'utf8');

// Strip ES6 exports
code = code.replace(/export\s+/g, '');

// Append test hook to access the interpreter function
code += '\nwindow.processJaffaCommandInterpreter = processJaffaCommandInterpreter;\n';

// Mock external variables referenced in the file
const window = {};
const AudioEngine = {
  play: () => {}
};
const L = {
  map: () => ({ setView: function() { return this; }, invalidateSize: function() { return this; }, addTo: function() { return this; } }),
  tileLayer: () => ({ addTo: function() { return this; } }),
  layerGroup: () => ({ addTo: function() { return this; }, clearLayers: function() { return this; } }),
  divIcon: (opts) => opts,
  marker: () => ({ addTo: function() { return this; }, bindPopup: function() { return this; } }),
  polyline: () => ({ addTo: function() { return this; }, setStyle: function() { return this; } })
};

// Evaluate the file content in this context
eval(code);

// Set the initial room and chapter
window.jaffaEpicEngine.state.room = 'HOUSE';
window.jaffaEpicEngine.state.chapter = 1;

// Process the command
const output = window.processJaffaCommandInterpreter('examine desk');
console.log('PARSER RESULT FOR EXAMINE DESK:', output);
