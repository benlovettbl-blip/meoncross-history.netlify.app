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

// 1. Add Geographical Locations
const newLocations = [
  {
    name: "West Africa (Barracoons)",
    type: "Origin & Exploitation Point",
    description: "The primary origin point for enslaved people during the Transatlantic Slave Trade. Enslaved Africans were often held in brutal coastal prisons known as 'barracoons' before being forced onto slave ships.",
    significance: "Highlights the horrific starting point of the Middle Passage and the infrastructure of the slave trade on the African coast.",
    coordinates: { lat: 5.556, lng: -0.1969 } // Rough coordinates for Gulf of Guinea
  },
  {
    name: "St Helena",
    type: "Strategic Stopping Point",
    description: "A small, remote island in the South Atlantic Ocean controlled by the British East India Company.",
    significance: "Served as a vital provisioning and stopping-off point for ships making the grueling transatlantic and East Indian voyages.",
    coordinates: { lat: -15.965, lng: -5.7089 }
  },
  {
    name: "Barbados",
    type: "Colony & Slave Society",
    description: "A small Caribbean island that became England's first highly profitable sugar colony, heavily reliant on brutal enslaved labor.",
    significance: "Considered the first true 'slave society', where the economy and laws were entirely structured around the exploitation of enslaved Africans.",
    coordinates: { lat: 13.1939, lng: -59.5432 }
  },
  {
    name: "Jamaica",
    type: "Colony & Sugar Hub",
    description: "Captured by the English from the Spanish in 1655, it grew to become the crown jewel of the British Caribbean sugar empire.",
    significance: "Generated immense wealth for absentee landlords in Britain, but was also a site of fierce resistance, such as the Maroon Wars.",
    coordinates: { lat: 18.1096, lng: -77.2975 }
  },
  {
    name: "West India Docks",
    type: "Trade Infrastructure",
    description: "Massive docks built in London to handle the staggering volume of sugar, rum, and mahogany arriving from the Caribbean.",
    significance: "A physical symbol of how the wealth extracted from the Triangular Trade flowed directly into the British economy, fueling its development.",
    coordinates: { lat: 51.5049, lng: -0.0215 }
  }
];

if (!data.geographical_locations) data.geographical_locations = [];

newLocations.forEach(loc => {
    if (!data.geographical_locations.find(g => g.name === loc.name)) {
        data.geographical_locations.push(loc);
    }
});

// 2. Add Key Individuals (Equiano and Tubman)
const newIndividuals = [
  {
    name: "Olaudah Equiano",
    role: "Author & Abolitionist",
    actions: "<ul><li>An enslaved man who purchased his freedom and wrote a bestselling autobiography detailing the horrors of the Middle Passage.</li></ul>",
    group: "Historical Figures",
    image: "/images/olaudah_equiano.jpg" // I'll need to fetch this
  },
  {
    name: "Harriet Tubman",
    role: "Abolitionist & Activist",
    actions: "<ul><li>An enslaved woman who escaped and became a legendary 'Conductor' on the Underground Railroad, risking her life to lead others to freedom.</li></ul>",
    group: "Historical Figures",
    image: "/images/harriet_tubman.jpg"
  }
];

if (!data.key_individuals) data.key_individuals = [];

newIndividuals.forEach(ind => {
    if (!data.key_individuals.find(i => i.name === ind.name)) {
        data.key_individuals.push(ind);
    }
});

const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('public/units/early_modern_world/data.js', newDataStr, 'utf8');
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Injected extra locations and individuals!");
