const fs = require('fs');
let content = fs.readFileSync('cme_new/data.js', 'utf8');

const target = '"draw_tasks": [],\n      "enquiry": "Why did the Six Day War break out';
const replacement = `"draw_tasks": [
        {
          "type": "drawing",
          "text": "Draw a map of the Middle East in 1967. Shade and label the new territories captured by Israel during the Six-Day War (Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights). Add annotations explaining the strategic military value of each newly acquired territory."
        }
      ],\n      "enquiry": "Why did the Six Day War break out`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('cme_new/data.js', content);
    console.log("Successfully added draw_task to lesson 5.");
} else {
    console.log("Target string not found.");
}
