const fs = require('fs');

// We will read scratch/me_sim_db_restored.js, which is of format: export const meSimulationDatabase = { ... };
// We want to extract the object literal part, evaluate it, and pretty print it.
const raw = fs.readFileSync('scratch/me_sim_db_restored.js', 'utf8');
const objStart = raw.indexOf('{');
const objEnd = raw.lastIndexOf('}');
const objStr = raw.substring(objStart, objEnd + 1);

// Use Function to safely evaluate the object literal in Node
const obj = new Function('return ' + objStr)();

// Format it using JSON stringify with 2 spaces
const formatted = "export const meSimulationDatabase = " + JSON.stringify(obj, null, 2) + ";";
fs.writeFileSync('scratch/me_sim_db_formatted.js', formatted);
console.log("Successfully formatted and saved to scratch/me_sim_db_formatted.js");
