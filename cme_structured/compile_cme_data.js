const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== Starting CME Data Compilation ===");

const cmeDir = __dirname;
const srcDir = path.join(cmeDir, 'src');
const lessonsDataPath = path.join(srcDir, 'lessons_data.js');

// 1. Find all patch files
const files = fs.readdirSync(cmeDir);
const patchFiles = files.filter(f => f.startsWith('patch_') && f.endsWith('_data.js')).sort();

if (patchFiles.length === 0) {
    console.log("No patch files found.");
} else {
    // 2. Execute each patch file
    patchFiles.forEach(patch => {
        console.log(`Running ${patch}...`);
        try {
            const output = execSync(`node ${path.join(cmeDir, patch)}`, { encoding: 'utf8' });
            console.log(output.trim());
        } catch (err) {
            console.error(`Error running ${patch}:`, err.message);
        }
    });
}

// 3. Validate the final lessons_data.js
console.log("Validating lessons_data.js...");
try {
    const dataContent = fs.readFileSync(lessonsDataPath, 'utf8');
    execSync(`node --check "${lessonsDataPath}"`);
    console.log("Validation passed: lessons_data.js is structurally valid.");
} catch (err) {
    console.error("Validation failed! lessons_data.js has syntax errors.");
    console.error(err.message);
}

console.log("=== CME Data Compilation Complete ===");
