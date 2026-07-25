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
const { document } = window;

// Load questions and bundled app
const questionsCode = fs.readFileSync('questions.js', 'utf8');
window.eval(questionsCode);
const appCode = fs.readFileSync('app.js', 'utf8');
window.eval(appCode);

// Dispatch DOMContentLoaded
const domEvent = new window.Event('DOMContentLoaded');
window.dispatchEvent(domEvent);

console.log("Initial state of consequence elements:");
console.log("- question card display:", document.getElementById('consequence-question-card').style.display);
console.log("- input area display:", document.getElementById('consequence-input-area').style.display);

// Change selection
const select = document.getElementById('consequence-topic-select');
select.value = '1.1a';
const changeEvent = new window.Event('change');
select.dispatchEvent(changeEvent);

console.log("\nAfter selecting topic 1.1a:");
console.log("- question card display:", document.getElementById('consequence-question-card').style.display);
console.log("- question text:", document.getElementById('consequence-question-text').textContent);
console.log("- input area display:", document.getElementById('consequence-input-area').style.display);
console.log("- clue box display:", document.getElementById('consequence-clue-box').style.display);
console.log("- answer box display:", document.getElementById('consequence-answer-box').style.display);
