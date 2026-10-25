const fs = require('fs');
const content = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/efc3adb5-b930-4aa0-8eff-b383b1c606ab/.system_generated/steps/2202/content.md', 'utf8');

const regex = /<img[^>]+src=["'](https:\/\/images\.slm\.com\.au\/[^"']+)["'][^>]*>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('--- Image tag: ---');
  console.log(match[0]);
}

// Also check figure / figcaption
const figRegex = /<figure[\s\S]*?<\/figure>/g;
while ((match = figRegex.exec(content)) !== null) {
  console.log('--- Figure: ---');
  console.log(match[0].slice(0, 300));
}
