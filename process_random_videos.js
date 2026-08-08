const fs = require('fs');

const trackerPath = 'G:/My Drive/Antigravity Projects/lesson_tracker.md';
let tracker = fs.readFileSync(trackerPath, 'utf8');

const randomMatch = tracker.match(/## Random Videos([\s\S]*?)(?=## Unit:|$)/);
if (!randomMatch) {
    console.log("No Random Videos section found.");
    process.exit(0);
}

const rawLines = randomMatch[1].trim().split('\n');
const links = rawLines.map(l => l.trim()).filter(l => l.startsWith('http'));
const remainingLinks = [];

// Load data.js for early_modern_world
let emwDataStr = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
const emwMatch = emwDataStr.match(/export const unitData = ([\s\S]+);/);
const emwData = eval('(' + emwMatch[1] + ')');

// Load data.js for industrialisation_and_empire
let indDataStr = fs.readFileSync('public/units/industrialisation_and_empire/data.js', 'utf8');
const indMatch = indDataStr.match(/export const unitData = ([\s\S]+);/);
const indData = eval('(' + indMatch[1] + ')');

function addVideo(data, lessonIndex, url, title) {
    if (!data.lessons[lessonIndex].video) {
        data.lessons[lessonIndex].video = [];
    }
    if (!data.lessons[lessonIndex].video.find(v => v.url === url)) {
        data.lessons[lessonIndex].video.push({ url, title });
        return true;
    }
    return false;
}

let emwUpdated = false;
let indUpdated = false;

for (const link of links) {
    if (link.includes('resistance-enslaved-with-samuel-l-jackson')) {
        if (addVideo(emwData, 5, link, 'Resistance: Enslaved with Samuel L. Jackson')) emwUpdated = true;
    } else if (link.includes('a-precious-cargo-enslaved-with-samuel-l-jackson')) {
        if (addVideo(emwData, 4, link, 'A Precious Cargo: Enslaved with Samuel L. Jackson')) emwUpdated = true;
    } else if (link.includes('our-people-enslaved-with-samuel-l-jackson')) {
        if (addVideo(emwData, 4, link, 'Our People: Enslaved with Samuel L. Jackson')) emwUpdated = true;
    } else if (link.includes('profit-and-loss-west-india-docks-and-the-sugar-economy')) {
        if (addVideo(emwData, 4, link, 'Profit and Loss: West India Docks and the Sugar Economy')) emwUpdated = true;
    } else if (link.includes('roanoke-horrible-histories')) {
        if (addVideo(emwData, 2, link, 'Roanoke (Horrible Histories)')) emwUpdated = true;
    } else if (link.includes('joint-stock-companies-empire-with-david-olusoga')) {
        if (addVideo(emwData, 2, link, 'Joint-Stock Companies: Empire with David Olusoga')) emwUpdated = true;
    } else if (link.includes('moral-mission-mississippi-cotton')) {
        if (addVideo(indData, 0, link, 'Black and British: Moral Mission (Mississippi Cotton)')) indUpdated = true;
    } else {
        // Leave in random videos (e.g. Australia ones)
        remainingLinks.push(link);
    }
}

if (emwUpdated) {
    const newData = `export const unitData = ${JSON.stringify(emwData, null, 2)};\n`;
    fs.writeFileSync('public/units/early_modern_world/data.js', newData, 'utf8');
    fs.writeFileSync('early_modern_world/data.js', newData, 'utf8');
}

if (indUpdated) {
    const newData = `export const unitData = ${JSON.stringify(indData, null, 2)};\n`;
    fs.writeFileSync('public/units/industrialisation_and_empire/data.js', newData, 'utf8');
    fs.writeFileSync('industrialisation_and_empire/data.js', newData, 'utf8');
}

// Re-write Random Videos section
const newRandomSection = "## Random Videos\n\nDrop links here if you don't have time to categorize them!\n\n" + remainingLinks.map(l => l + "\n\n").join('');
const newTrackerText = tracker.replace(/## Random Videos[\s\S]*?(?=## Unit:|$)/, newRandomSection);
fs.writeFileSync(trackerPath, newTrackerText, 'utf8');

console.log("Processed remaining videos! Left " + remainingLinks.length + " links in Random Videos.");
