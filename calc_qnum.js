const fs = require('fs');
const dataContent = fs.readFileSync('public/units/edexcel_medicine/data.js', 'utf8');

// Strip out the variable assignment to just get the JSON object
const jsonString = dataContent.replace(/^const unitData = /, '').replace(/;$/, '');
const unitData = eval('(' + jsonString + ')'); // Need to eval since it has trailing commas and JS objects

let qNum = 1;
const l2 = unitData.lessons.find(l => l.title.includes('L2'));

// Duplicate the logic of generate_pupil_workbooks.js to find what number this extended task gets if no examQNum is provided
if (l2.tasks) {
    l2.tasks.forEach(t => {
        if (t.instruction || t.question || t.title) {
            qNum++;
        }
    });
}
console.log('qNum before extended task:', qNum);

