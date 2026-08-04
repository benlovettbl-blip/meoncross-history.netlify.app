import fs from 'fs';

const dataPath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

let dataObj;
try {
  dataObj = eval('(function(){ ' + content.replace(/export const (unitData) =/, 'return') + '; })()');
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

// Add Key Individuals
const newIndividuals = [
    {
        name: "Kaiser Wilhelm II",
        role: "Emperor of Germany",
        bio: "The last German Emperor and King of Prussia. His erratic foreign policy and the catastrophic First World War led to his forced abdication in November 1918.",
        image: ""
    },
    {
        name: "Philipp Scheidemann",
        role: "SPD Politician",
        bio: "A leading member of the Social Democratic Party who famously rushed to the balcony of the Reichstag on 9 November 1918 to proclaim the new German Republic.",
        image: ""
    }
];

newIndividuals.forEach(ni => {
    if (!dataObj.key_individuals.some(ki => ki.name === ni.name)) {
        dataObj.key_individuals.unshift(ni);
    }
});

// Update narrative blocks
const lesson = dataObj.lessons.find(l => l.id === 'lesson_1_1' || l.title.includes('1.1'));
if (lesson) {
    lesson.narrative_blocks.forEach(block => {
        if (block.text) {
            // Only replace the FIRST instance in each string to avoid multiple links if mentioned twice
            block.text = block.text.replace("autocratic ruler, Kaiser Wilhelm II.", "autocratic ruler, [Key Individual: Kaiser Wilhelm II].");
            block.text = block.text.replace("Kaiser Wilhelm II bowed to the inevitable.", "[Key Individual: Kaiser Wilhelm II] bowed to the inevitable.");
            block.text = block.text.replace("Philipp Scheidemann, a leading member", "[Key Individual: Philipp Scheidemann], a leading member");
            block.text = block.text.replace("Friedrich Ebert (SPD) became Chancellor", "[Key Individual: Friedrich Ebert] (SPD) became Chancellor");
            block.text = block.text.replace("his representative, Matthias Erzberger, signed the Armistice.", "his representative, [Key Individual: Matthias Erzberger], signed the Armistice.");
        }
    });
}

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Updated data.js with new Key Individuals and narrative tags.");
