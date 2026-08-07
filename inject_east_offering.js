const fs = require('fs');

let c = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');

// Find where JSON data starts
let jsonStr = c.substring(c.indexOf('{'));
jsonStr = jsonStr.replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Add to lesson 3
if (!data.lessons[3].sources) {
    data.lessons[3].sources = [];
}
data.lessons[3].sources.push({
    title: "The East Offering its Riches to Britannia (1778)",
    src: "east_offering_riches.jpg",
    caption: "A ceiling painting by Spiridione Roma (1778), originally commissioned for the Revenue Committee Room at East India House. It is an allegorical painting showing Britannia's wealth, receiving jewels, spices, and silk from Asia, Africa, and India. It highlights the ideology and wealth of Britain's empire.",
    content: "Notice how Britannia sits elevated, while figures representing Asia, Africa, and India offer her their goods. This painting was placed on the ceiling of the East India Company's headquarters, literally looking down on the directors as they made decisions about global trade.",
    question: "How useful is this painting as evidence of Britain's global power and ideology in 1778?"
});

// Write back
const finalContent = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync('public/units/early_modern_world/data.js', finalContent);

// also write to early_modern_world/data.js to keep in sync
fs.writeFileSync('early_modern_world/data.js', finalContent);
console.log('Injected The East Offering its Riches to Britannia');
