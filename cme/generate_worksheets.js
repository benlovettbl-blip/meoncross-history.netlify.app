const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const htmlContent = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000',
  runScripts: 'outside-only',
  resources: 'usable'
});

const { window } = dom;
window.AudioContext = function() { return {}; };
window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Load scripts
const questionsCode = fs.readFileSync('questions.js', 'utf8');
window.eval(questionsCode);
const appCode = fs.readFileSync('app.js', 'utf8');
window.eval(appCode);

// Create scratch directory if not exists
if (!fs.existsSync('scratch')) {
  fs.mkdirSync('scratch');
}

// Generate booklets
const subtopics = ['subtopic_1_1', 'subtopic_1_2', 'subtopic_2_1', 'subtopic_3_1'];
const styles = ['booklet', 'cloze', 'cornell', 'organizer', 'exam'];

subtopics.forEach(sub => {
  styles.forEach(style => {
    const html = window.generateWorkbookHtml(sub, style, 'standard', false, [0, 1]);
    const filename = `scratch/workbook_${sub}_${style}.html`;
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`Saved ${filename} (${html.length} bytes)`);
  });
});

console.log("All test workbooks generated successfully.");
process.exit(0);
