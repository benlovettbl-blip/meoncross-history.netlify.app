const fs = require('fs');

const data = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

// We want to replace *text* with 'text'
// We ensure it is not **text** by using (?<!\*) and (?!\*)
// We ensure it is not a bullet point by requiring the first char inside to not be a space
// So: (?<!\*)\*([^\s*][^*]*?)\*(?!\*)
const regex = /(?<!\*)\*([^\s*][^*]*?)\*(?!\*)/g;

let matchCount = 0;
const replaced = data.replace(regex, (match, p1) => {
    matchCount++;
    if (matchCount <= 20) {
        console.log(`Replacing: ${match} -> '${p1}'`);
    }
    return `'${p1}'`;
});

console.log(`Total replacements: ${matchCount}`);
