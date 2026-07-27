const fs = require('fs');

async function fixDates() {
    const dataPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;

    const preciseDates = {
        'lesson1': ['1897', '1914–1918', '1917', '1920', '1936–1939', '1939', '1939–1945'],
        'lesson2': ['1947', 'Nov 1947', '1947–1948', 'May 1948', '1948', '1948', '1949'],
        'lesson3': ['1948', '1948–1949', '1948', '1949', '1954', '1955', '1956'],
        'lesson4': ['July 1956', 'Oct 1956', 'Oct 1956', 'Oct 1956', 'Oct 1956', 'Nov 1956', 'Nov 1956'],
        'lesson5': ['1964', '1965', '1966', 'May 1967', 'May 1967', 'May 1967', 'May 1967'],
        'lesson6': ['June 1967', 'Nov 1967', '1969–1970', '1970', '1972', 'Oct 1973', 'Oct 1973'],
        'lesson7': ['Oct 1973', '1973–1974', '1974', '1977', '1978', '1978', '1979'],
        'lesson8': ['1974', '1982', '1982', '1982', '1987', '1987', '1988'],
        'lesson9': ['1991', '1991', '1992', '1993', '1994', '1994', '1995'],
        'war1948': ['May 1948', 'May 1948', 'June 1948', 'July 1948', 'July 1948', '1949', '1948'],
        'war1956': ['July 1956', 'Oct 1956', 'Oct 1956', 'Oct 1956', 'Oct 1956', 'Nov 1956', 'Nov 1956'],
        'war1967': ['May 1967', 'May 1967', 'June 1967', 'June 1967', 'June 1967', 'June 1967', 'June 1967'],
        'war1973': ['Oct 1973', 'Oct 1973', 'Oct 1973', 'Oct 1973', 'Oct 1973', 'Oct 1973', 'Oct 1973'],
        'war1982': ['1982', '1982', '1982', '1982', '1982', '1982', '1982']
    };

    data.timeline.forEach(group => {
        if (preciseDates[group.id]) {
            group.events.forEach((evt, idx) => {
                evt.date = preciseDates[group.id][idx];
            });
        }
    });

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const jsonStr = JSON.stringify(data, null, 2);
    
    let newContent = '';
    if (fileContent.includes('export const unitData =')) {
         newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
         // Handle mock exams if they get stringified incorrectly
         newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
    } else {
         newContent = `export const unitData = ${jsonStr};`;
    }

    fs.writeFileSync(dataPath, newContent, 'utf-8');
    console.log('Fixed dates for cme_new timeline!');
}

fixDates();
