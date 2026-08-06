const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Themes mapping
const themes = {
    "Fall of Constantinople": "Conflict & Power",
    "Columbus's First Voyage": "Exploration & Trade",
    "Treaty of Tordesillas": "Exploration & Trade",
    "The Protestant Reformation Begins": "Religion & Society",
    "Act of Supremacy": "Religion & Society",
    "Roanoke Colony Founded": "Exploration & Trade",
    "Defeat of the Spanish Armada": "Conflict & Power",
    "Jamestown Founded": "Exploration & Trade",
    "Roe's Embassy to India": "Exploration & Trade",
    "English Civil War Begins": "Conflict & Power",
    "Execution of Charles I": "Conflict & Power",
    "The Restoration": "Conflict & Power",
    "First Maroon War Begins": "Conflict & Power",
    "Britain on the Eve of Industrialization": "Exploration & Trade"
};

// We will parse the timeline array, add themes, and replace it.
const timelineMatch = dataContent.match(/"timeline"\s*:\s*(\[[\s\S]*?\]),\s*"lessons"/);
if (timelineMatch) {
    const timeline = JSON.parse(timelineMatch[1]);
    timeline.forEach(event => {
        if (themes[event.title]) {
            event.theme = themes[event.title];
        }
    });
    
    const newTimelineStr = JSON.stringify(timeline, null, 8).trim();
    dataContent = dataContent.replace(timelineMatch[1], newTimelineStr);
    fs.writeFileSync(dataPath, dataContent);
    console.log("Injected themes into timeline successfully.");
} else {
    console.log("Could not find timeline array.");
}
