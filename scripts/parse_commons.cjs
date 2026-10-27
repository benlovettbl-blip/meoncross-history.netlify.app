const fs = require('fs');
const html = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/fa7d1e37-963f-4640-b0d4-a72fa6c412fe/.system_generated/steps/1363/content.md', 'utf8');
const matches = html.match(/title="File:[^"]+"/g) || [];
console.log('Found', matches.length, 'file titles:');
matches.slice(30).forEach(m => console.log(' ', m));
