const fs = require('fs');
const path = require('path');

let data;
try {
    const raw = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+);/);
    data = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Error", e);
    process.exit(1);
}

const newLocation = {
    name: "Bristol Docks",
    type: "Trade Infrastructure",
    description: "A major port in England that grew incredibly wealthy from the Transatlantic Slave Trade. It was home to merchants like Edward Colston, whose controversial statue was toppled by protestors in 2020.",
    significance: "Highlights how British port cities profited directly from slavery, and how the legacy of those individuals (like Colston) remains a resonant and controversial part of modern history.",
    coordinates: { lat: 51.4485, lng: -2.5991 }
};

if (!data.geographical_locations) data.geographical_locations = [];

if (!data.geographical_locations.find(g => g.name === newLocation.name)) {
    data.geographical_locations.push(newLocation);
}

const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('public/units/early_modern_world/data.js', newDataStr, 'utf8');
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Injected Bristol Docks!");
