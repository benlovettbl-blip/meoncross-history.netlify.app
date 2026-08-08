const fs = require('fs');

const trackerPath = 'G:/My Drive/Antigravity Projects/lesson_tracker.md';
if (fs.existsSync(trackerPath)) {
    let text = fs.readFileSync(trackerPath, 'utf8');
    
    // Replace everything between "## Random Videos" and "## Unit:" with the default empty section
    const newText = text.replace(/## Random Videos[\s\S]*?(?=## Unit:)/, "## Random Videos\n\nDrop links here if you don't have time to categorize them!\n\n");
    
    fs.writeFileSync(trackerPath, newText, 'utf8');
    console.log('Successfully cleaned Random Videos section in lesson_tracker.md');
} else {
    console.error('File not found: ' + trackerPath);
}
