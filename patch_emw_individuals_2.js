const fs = require('fs');

let data;
try {
    const raw = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+);/);
    data = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Error", e);
    process.exit(1);
}

const newIndividuals = [
  {
    name: "Toussaint Louverture",
    role: "Haitian Revolutionary Leader",
    actions: "<ul><li>A formerly enslaved man who led the only successful large-scale slave revolt in history, securing Haitian independence from France.</li></ul>",
    group: "Historical Figures",
    image: "/images/toussaint_louverture.jpg"
  },
  {
    name: "Thomas Thistlewood",
    role: "Jamaican Overseer",
    actions: "<ul><li>An English overseer whose diary provides brutal, first-hand evidence of the daily torture of enslaved people and their relentless covert resistance.</li></ul>",
    group: "Historical Figures"
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

console.log("Injected extra individuals!");
