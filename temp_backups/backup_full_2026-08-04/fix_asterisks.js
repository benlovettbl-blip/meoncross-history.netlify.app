const fs = require('fs');

const filePath = 'weimar_nazi_germany/data.js';
let data = fs.readFileSync(filePath, 'utf8');

// Replace *text* with 'text'
const regex = /(?<!\*)\*([^\s*][^*]*?)\*(?!\*)/g;

let matchCount = 0;
data = data.replace(regex, (match, p1) => {
    matchCount++;
    return `'${p1}'`;
});

fs.writeFileSync(filePath, data, 'utf8');
console.log(`Successfully replaced ${matchCount} asterisks in ${filePath}`);
