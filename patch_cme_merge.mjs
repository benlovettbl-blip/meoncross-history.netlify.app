import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

function simplifyText(text) {
  // Strip HTML
  let clean = text.replace(/<[^>]*>/g, '');
  let sentences = clean.split(/(?<=[.!?])\s+/);
  if (sentences.length <= 2) return text;
  // Just a naive summarization: keep the first sentence and the last sentence, prepend [Level 4]: so it's obvious it worked
  return sentences[0] + ' ' + sentences[sentences.length - 1];
}

data.lessons.forEach(lesson => {
  if (!lesson.narrative) return;
  
  let newNarrative = [];
  let newLevel4 = [];
  
  let currentBlock = [];
  
  for (let i = 0; i < lesson.narrative.length; i++) {
    let p = lesson.narrative[i];
    
    if (p.includes('<pre') || p.includes('<table') || p.startsWith('"')) {
      // If we have an accumulated block, push it first
      if (currentBlock.length > 0) {
        let merged = currentBlock.join(' ');
        newNarrative.push(merged);
        newLevel4.push(simplifyText(merged));
        currentBlock = [];
      }
      // Push the special block as is
      newNarrative.push(p);
      newLevel4.push(p);
    } else {
      currentBlock.push(p);
      // Group by 2
      if (currentBlock.length >= 2) {
        let merged = currentBlock.join(' ');
        newNarrative.push(merged);
        newLevel4.push(simplifyText(merged));
        currentBlock = [];
      }
    }
  }
  
  // push any remaining
  if (currentBlock.length > 0) {
    let merged = currentBlock.join(' ');
    newNarrative.push(merged);
    newLevel4.push(simplifyText(merged));
  }
  
  lesson.narrative = newNarrative;
  lesson.level_4_narrative = newLevel4;
});

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully merged paragraphs and added level_4_narrative to data.js");
