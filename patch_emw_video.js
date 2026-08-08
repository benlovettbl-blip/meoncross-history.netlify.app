const fs = require('fs');

let data;
try {
    const raw = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+);/);
    if (!match) {
        console.log("Could not match export in data.js");
        process.exit(1);
    }
    data = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Error reading early_modern_world/data.js:", e);
    process.exit(1);
}

// Lesson 5 is index 4 (0-indexed)
// Title should be "What were the mechanics of the Transatlantic Slave Trade?"
if (data.lessons[4].title !== "What were the mechanics of the Transatlantic Slave Trade?") {
    console.log("Warning: Lesson 5 title mismatch:", data.lessons[4].title);
}

if (!data.lessons[4].video) {
    data.lessons[4].video = [];
}

const newVideo = {
    url: "https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-profit-and-loss-west-india-docks-and-the-sugar-economy/",
    title: "BBC Two: Britain's Forgotten Slave Owners - Profit and Loss"
};

// Check if already exists
const exists = data.lessons[4].video.some(v => v.url === newVideo.url);
if (!exists) {
    data.lessons[4].video.push(newVideo);
    
    // Convert back to string and write
    const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync('public/units/early_modern_world/data.js', newDataStr, 'utf8');
    fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8'); // update source file too
    console.log("Successfully injected video into Lesson 5");
} else {
    console.log("Video already exists in Lesson 5");
}
