const fs = require('fs');
let data = fs.readFileSync('great_war/data.js', 'utf8');

// Replace "Q1: ", "Question 3a: " etc.
data = data.replace(/"text":\s*"(?:Q\d+|Question \d+[a-z]?):\s*(.*?)"/g, '"text": "$1"');

// And remove any trailing spaces or something? The regex captures the rest of the string into $1.
// Let's test the regex manually first.
fs.writeFileSync('great_war/data.js', data, 'utf8');
console.log('Fixed question numbering.');
