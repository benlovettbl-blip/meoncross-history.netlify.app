const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexFile = path.join(rootDir, 'index.html');
const cssFile = path.join(rootDir, 'style.css');
const questionsFile = path.join(rootDir, 'questions.js');
const appFile = path.join(rootDir, 'app.js');
const embedFile = path.join(rootDir, 'firefly_embed.html');

console.log('Loading source files...');
let indexContent = fs.readFileSync(indexFile, 'utf8');
const cssContent = fs.readFileSync(cssFile, 'utf8');
const questionsContent = fs.readFileSync(questionsFile, 'utf8');
const appContent = fs.readFileSync(appFile, 'utf8');

// Replace style.css link with inline style block
const stylePattern = /<link\s+[^>]*href=["']style\.css["'][^>]*>/i;
indexContent = indexContent.replace(stylePattern, `<style>\r\n${cssContent}\r\n</style>`);

// Replace questions.js script tag with inline script block
const questionsPattern = /<script\s+[^>]*src=["']questions\.js["'][^>]*>\s*<\/script>/i;
indexContent = indexContent.replace(questionsPattern, `<script>\r\n${questionsContent}\r\n</script>`);

// Replace app.js script tag with inline script block
const appPattern = /<script\s+[^>]*src=["']app\.js["'][^>]*>\s*<\/script>/i;
indexContent = indexContent.replace(appPattern, `<script>\r\n${appContent}\r\n</script>`);

// Write the compiled file
fs.writeFileSync(embedFile, indexContent, 'utf8');
console.log('Successfully generated firefly_embed.html');
