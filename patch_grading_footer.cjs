const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'scripts', 'generate_pupil_workbooks.cjs');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Identify the block to move
const blockStart = "      // Inject General Notes Box";
const blockEnd = "      // GCSE Task";

const startIndex = code.indexOf(blockStart);
const endIndex = code.indexOf(blockEnd);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find the block to move.");
    process.exit(1);
}

// 2. Extract the block
// We capture everything from blockStart up to (but not including) blockEnd.
const extractedBlock = code.substring(startIndex, endIndex);

// 3. Remove the block from its original location
code = code.substring(0, startIndex) + code.substring(endIndex);

// 4. Inject the block after the Pupil Voice section
const injectionPointMarker = "      // --- END PUPIL VOICE ---";
const injectionPointIndex = code.indexOf(injectionPointMarker);

if (injectionPointIndex === -1) {
    console.error("Could not find the injection point for the block.");
    process.exit(1);
}

// We inject it right after the injectionPointMarker line
const injectionPointEnd = code.indexOf('\n', injectionPointIndex) + 1;

code = code.substring(0, injectionPointEnd) + "\n" + extractedBlock + code.substring(injectionPointEnd);

fs.writeFileSync(filePath, code);
console.log('Workbooks script patched successfully. General Notes moved to absolute bottom of lesson.');
