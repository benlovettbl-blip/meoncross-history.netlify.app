const fs = require('fs');
let c = fs.readFileSync('generate_textbooks.js', 'utf8');

c = c.replace('html += `<h2 style="margin-top: 40px; border-top: 3px solid #1e3a8a; padding-top: 20px; margin-bottom: 5px; page-break-before: auto; page-break-after: auto;">L${lessonIndex + 1}: ${formatText(lesson.title)}<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Start]]</span></h2>`;',
`
if (lessonIndex === 1) {
    let q7 = html.indexOf('Q7.');
    let q8 = html.indexOf('Q8.');
    let q9 = html.indexOf('Q9.');
    let q10 = html.indexOf('Q10.');
    let q11 = html.indexOf('Q11.');
    let q12 = html.indexOf('Q12.');
    console.log('--- L2 HTML AT START ---');
    console.log('Q7:', q7);
    console.log('Q8:', q8);
    console.log('Q9:', q9);
    console.log('Q10:', q10);
    console.log('Q11:', q11);
    console.log('Q12:', q12);
}
html += \`<h2 style="margin-top: 40px; border-top: 3px solid #1e3a8a; padding-top: 20px; margin-bottom: 5px; page-break-before: auto; page-break-after: auto;">L\${lessonIndex + 1}: \${formatText(lesson.title)}<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Start]]</span></h2>\`;
`);

c = c.replace('if (lesson.full_page_map) {',
`
if (lessonIndex === 1) {
    let q7 = html.indexOf('Q7.');
    let q8 = html.indexOf('Q8.');
    let q9 = html.indexOf('Q9.');
    let q10 = html.indexOf('Q10.');
    let q11 = html.indexOf('Q11.');
    let q12 = html.indexOf('Q12.');
    console.log('--- L2 HTML AT END ---');
    console.log('Q7:', q7);
    console.log('Q8:', q8);
    console.log('Q9:', q9);
    console.log('Q10:', q10);
    console.log('Q11:', q11);
    console.log('Q12:', q12);
    
    let hc = html.indexOf('Historian\\'s Corner');
    let ps = html.indexOf('Pair & Share');
    console.log('HC at', hc);
    console.log('PS at', ps);
    
    console.log('Substr from HC:', html.substring(hc, hc + 200));
}
if (lesson.full_page_map) {
`);

fs.writeFileSync('generate_textbooks_debug.js', c);
