import fs from 'fs';
import path from 'path';

async function update() {
    const dataPath = path.join('early_modern_world', 'data.js');
    let dataStr = fs.readFileSync(dataPath, 'utf8');

    // Extract the array of lessons from the JS module
    const match = dataStr.match(/export const unitData = ([\s\S]+);/);
    if (!match) throw new Error("Could not parse data.js");
    
    let unitData = JSON.parse(match[1]);
    
    // Update the image caption and alt for ottoman_1453.jpg
    unitData.lessons[0].narrative_blocks[1].image = {
        "url": "/images/ottoman_1453.jpg",
        "alt": "Fresco depicting the Siege of Constantinople in 1453",
        "caption": "A historical fresco depicting the Siege of Constantinople (1453), marking the dramatic expansion of the Ottoman Empire."
    };

    const newDataStr = "export const unitData = " + JSON.stringify(unitData, null, 4) + ";";
    fs.writeFileSync(dataPath, newDataStr);
    console.log("Successfully updated caption!");
}

update();
