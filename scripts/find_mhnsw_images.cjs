const fs = require('fs');
const content = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/efc3adb5-b930-4aa0-8eff-b383b1c606ab/.system_generated/steps/2202/content.md', 'utf8');
const regex = /https:\/\/images\.slm\.com\.au\/[^\s"']+/g;
const matches = content.match(regex) || [];
console.log('Unique SLM image matches:', [...new Set(matches)]);
