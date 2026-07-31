const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let content = fs.readFileSync(dataFile, 'utf8');

function simplify(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    if (sentences.length <= 2) {
        return text;
    }
    return sentences[0].trim() + ' ' + sentences[sentences.length - 1].trim();
}

// We can find all `text: "...",` inside narrative_blocks and append simplified_text.
// This is a bit tricky with regex if there are commas and things, but let's try.
// Since data.js has block format:
// {
//   title: "...",
//   text: "...",
//   ...

content = content.replace(/text:\s*"([^"\\]*(?:\\.[^"\\]*)*)"(,?)/g, (match, p1, p2) => {
    // Only add simplified_text if it's long enough and it's a narrative block.
    // Actually it's safe to add it anywhere there is a `text: ` field.
    if (p1.length > 50 && !match.includes('simplified_text')) {
        const sim = simplify(p1);
        return match + `\n      simplified_text: "${sim}",`;
    }
    return match;
});

// Remove trailing commas before closing braces if they were accidentally created, though the regex leaves them alone.
fs.writeFileSync(dataFile, content);
console.log("Mock simplified text injected.");
