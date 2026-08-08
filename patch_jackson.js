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

// Lesson 5 (index 4)
if (!data.lessons[4].video) data.lessons[4].video = [];
const jacksonUrl = "https://era.org.uk/streaming-service-resource/a-people-stolen-enslaved-with-samuel-l-jackson/";
if (!data.lessons[4].video.find(v => v.url === jacksonUrl)) {
    data.lessons[4].video.push({
        url: jacksonUrl,
        title: "A People Stolen: Enslaved with Samuel L. Jackson"
    });
}

const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('public/units/early_modern_world/data.js', newDataStr, 'utf8');
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Injected Samuel L Jackson video!");
