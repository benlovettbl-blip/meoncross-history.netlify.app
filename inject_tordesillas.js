const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');
let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Find Lesson 2
const lesson = data.lessons.find(l => l.id === 'lesson_2');
if (lesson) {
    // Find the Macro-History block
    const macroIdx = lesson.narrative_blocks.findIndex(b => b.title === 'Macro-History: The Big Picture');
    if (macroIdx !== -1) {
        const oldBlock = lesson.narrative_blocks[macroIdx];
        
        // Split the text at "The New World Monopoly and the Papal Bull"
        const splitText = oldBlock.text.split('<br><br><strong>The New World Monopoly and the Papal Bull</strong><br>');
        
        const block1 = {
            title: "Macro-History: The Reformation (1517)",
            text: splitText[0],
            image: "/images/martin_luther_portrait.jpg",
            image_alt: "Martin Luther holding the Bible",
            image_caption: "Martin Luther, whose 1517 protests sparked the Protestant Reformation and divided Europe.",
            tasks: []
        };
        
        const block2 = {
            title: "Macro-History: The New World Monopoly & Privateers",
            text: "<strong>The New World Monopoly and the Papal Bull</strong><br>" + splitText[1],
            image: "/images/tordesillas_map.jpg",
            image_alt: "Map showing the Treaty of Tordesillas line",
            image_caption: "The 1494 Treaty of Tordesillas divided the newly discovered lands outside Europe between the Portuguese Empire and the Spanish Empire.",
            tasks: oldBlock.tasks // keep the existing task here
        };
        
        // Replace the single block with the two new blocks
        lesson.narrative_blocks.splice(macroIdx, 1, block1, block2);
        
        // Write back
        const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
        fs.writeFileSync(file, out);
        console.log("Successfully split Macro-History block and added Treaty of Tordesillas map.");
    } else {
        console.log("Could not find Macro-History block in Lesson 2.");
    }
} else {
    console.log("Could not find Lesson 2.");
}
