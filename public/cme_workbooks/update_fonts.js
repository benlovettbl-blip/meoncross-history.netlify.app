const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lessons.js');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('async function generateWorkbookHtml');
const endIndex = content.length; // Apply to the rest of the file since generateBulkWorkbookHtml and generateWarWorkbookHtml are also there and need similar print updates

if (startIndex === -1) {
    console.log('Function not found!');
    process.exit(1);
}

let targetBlock = content.substring(startIndex, endIndex);

// Replace colors
targetBlock = targetBlock.replace(/#1f2937/g, '#000000');
targetBlock = targetBlock.replace(/#111827/g, '#000000');
targetBlock = targetBlock.replace(/#374151/g, '#000000');
targetBlock = targetBlock.replace(/#4b5563/g, '#000000');

// Bump font sizes (e.g., 7pt -> 8.5pt, 8pt -> 9.5pt, 9.5pt -> 11pt)
// We'll use a replacer function to add 1.5 to any pt value
targetBlock = targetBlock.replace(/(\d+(\.\d+)?)pt/g, (match, p1) => {
    const val = parseFloat(p1);
    const newVal = val + 1.5;
    return newVal + 'pt';
});

content = content.substring(0, startIndex) + targetBlock;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated fonts and colors in lessons.js!');
