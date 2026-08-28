const fs = require('fs');
let pup = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

pup = pup.replace(
    /Scholar: \[__________\] and Class: \[____\]/,
    'Scholar: [____________________] Class: [________]'
);

fs.writeFileSync('generate_pupil_workbooks.js', pup, 'utf8');
console.log('Fixed cover brackets.');
