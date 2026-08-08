const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'public/units/early_modern_world/data.js');
let raw = fs.readFileSync(dataPath, 'utf8');

// Update the caption date
raw = raw.replace('Coat of Arms of Great Britain (1714)', 'Coat of Arms of Great Britain (1707–1714)');

// Update the historical context
const oldContext = "Look at the blending of the English lion and the Scottish unicorn. This heraldic symbol represents the 1707 Act of Union, which formally joined England and Scotland into a single political entity: Great Britain. **Hinge Question:** Why was it so important for the monarch to create a single, unified visual identity for the newly formed nation?";
const newContext = "Look closely at the shield (escutcheon) in the centre. In the first and fourth quarters, the English lions and the Scottish lion rampant are impaled (joined) together. This heraldic blending on the shield represents the 1707 Act of Union, which formally joined England and Scotland into a single political entity: Great Britain. The supporters holding the shield—the English lion and the Scottish unicorn—had actually been paired together much earlier, since the 1603 Union of the Crowns under King James I. **Hinge Question:** Why was it so important for the monarch to create a single, unified visual identity for the newly formed nation?";

raw = raw.replace(oldContext, newContext);

fs.writeFileSync(dataPath, raw, 'utf8');
const rootPath = path.join(__dirname, 'early_modern_world/data.js');
if (fs.existsSync(rootPath)) {
    fs.writeFileSync(rootPath, raw, 'utf8');
}

console.log("Updated Coat of Arms text for historical accuracy.");
