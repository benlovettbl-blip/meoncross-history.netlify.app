import fs from 'fs';

let content = fs.readFileSync('src/lessons.js', 'utf8');

// Fix timeline min-height
const timelineTarget = '<div style="position: relative; display: flex; align-items: stretch; flex: 1; margin-bottom: 10px;">';
const timelineReplacement = '<div style="position: relative; display: flex; align-items: stretch; flex: 1; min-height: 120px; margin-bottom: 10px;">';

if (content.includes(timelineTarget)) {
  content = content.replace(timelineTarget, timelineReplacement);
  console.log("Timeline CSS fixed!");
} else {
  console.log("Timeline target not found.");
}

fs.writeFileSync('src/lessons.js', content);
