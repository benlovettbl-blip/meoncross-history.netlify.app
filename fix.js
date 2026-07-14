const fs = require('fs');
let html = fs.readFileSync('cme/index.html', 'utf8');
html = html.replace('<script src="questions.js?v=18">', '<script type="module" src="questions.js?v=18">');
fs.writeFileSync('cme/index.html', html, 'utf8');

let qjs = fs.readFileSync('cme/questions.js', 'utf8');
if (!qjs.includes('window.QUIZ_DATA')) fs.appendFileSync('cme/questions.js', '\nwindow.QUIZ_DATA = QUIZ_DATA;\n');

html = fs.readFileSync('cme_structured/index.html', 'utf8');
html = html.replace('<script src="questions.js?v=18">', '<script type="module" src="questions.js?v=18">');
fs.writeFileSync('cme_structured/index.html', html, 'utf8');

qjs = fs.readFileSync('cme_structured/questions.js', 'utf8');
if (!qjs.includes('window.QUIZ_DATA')) fs.appendFileSync('cme_structured/questions.js', '\nwindow.QUIZ_DATA = QUIZ_DATA;\n');

html = fs.readFileSync('eee/index.html', 'utf8');
html = html.replace('<script src="data.js">', '<script type="module" src="data.js">');
html = html.replace('<script src="app.js">', '<script type="module" src="app.js">');
fs.writeFileSync('eee/index.html', html, 'utf8');

qjs = fs.readFileSync('eee/data.js', 'utf8');
if (!qjs.includes('window.timelineData')) fs.appendFileSync('eee/data.js', '\nwindow.timelineData = timelineData;\n');
