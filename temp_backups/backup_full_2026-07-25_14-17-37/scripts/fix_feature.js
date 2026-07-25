const fs = require('fs');
let str = fs.readFileSync('edexcel_medicine/data.js', 'utf8');

// Replace "Describe one feature of... " with "Describe one feature of... (2 marks)"
// But only if it doesn't already have marks
let matchCount = 0;
str = str.replace(/"(Describe one feature[^"]*?)"/g, (match, p1) => {
    if (!p1.includes('marks)')) {
        matchCount++;
        return `"${p1} (2 marks)"`;
    }
    return match;
});

fs.writeFileSync('edexcel_medicine/data.js', str);
console.log(`Updated ${matchCount} feature questions.`);
