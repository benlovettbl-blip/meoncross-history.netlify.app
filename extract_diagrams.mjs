import fs from 'fs';

const data = fs.readFileSync('cme_new/data.js', 'utf8');
const regex = /<pre class=\\"ascii-diagram\\">([\s\S]*?)<\/pre>/g;
let m;
let i = 1;
const results = [];
while ((m = regex.exec(data)) !== null) {
  let content = m[1].replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"');
  results.push(`--- Diagram ${i} ---\n${content}\n`);
  i++;
}

fs.mkdirSync('../.gemini/antigravity-ide/brain/1129f0ad-a9d6-4e9f-970a-cc063faf1f26/scratch', { recursive: true });
fs.writeFileSync('../.gemini/antigravity-ide/brain/1129f0ad-a9d6-4e9f-970a-cc063faf1f26/scratch/diagrams.txt', results.join('\n'));
console.log(`Extracted ${i-1} diagrams.`);
