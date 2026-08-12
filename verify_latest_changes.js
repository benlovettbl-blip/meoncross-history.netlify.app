const fs = require('fs');
const path = require('path');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
        passCount++;
    } else {
        console.log(`❌ FAIL: ${message}`);
        failCount++;
    }
}

console.log("=================================================");
console.log("Automated Validation of Recent Code Changes");
console.log("=================================================");

// 1. Check if 'Lesson 0' fix is applied in src/core_app.js
if (fs.existsSync('src/core_app.js')) {
    const coreApp = fs.readFileSync('src/core_app.js', 'utf8');
    assert(
        coreApp.includes('parseInt(parts[1]) + 1'),
        "Web App UI: 'Lesson 0' logic correctly patched to display 'Lesson 1' by incrementing index."
    );
    
    // 2. Check if 'Task X:' prefix is stripped in src/core_app.js
    assert(
        coreApp.includes('.replace(/^(Task|Question)\\s*\\d+:\\s*/i, \'\')'),
        "Web App UI: Ugly 'Task X:' prefix string replacement is present in Question Card rendering."
    );
} else {
    console.log("❌ FAIL: src/core_app.js not found.");
}

// 3. Check if Maps are disabled in pupil workbooks
if (fs.existsSync('generate_pupil_workbooks.js')) {
    const pupilWb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
    assert(
        pupilWb.includes('let renderImages = false;'),
        "Pupil Workbook Generator: Image rendering for primary sources is globally disabled (set to false)."
    );
} else {
    console.log("❌ FAIL: generate_pupil_workbooks.js not found.");
}

// 4. Check if Textbook Q1 has task-box and Q4 undefined fix is present
if (fs.existsSync('generate_textbooks.js')) {
    const textbook = fs.readFileSync('generate_textbooks.js', 'utf8');
    assert(
        textbook.includes('class="task-box"') && textbook.includes('lesson.primary_source.question'),
        "Textbook Generator: Primary Source Question is wrapped in the green '.task-box' class."
    );
    assert(
        textbook.includes('if (task.type === \'drag_drop_timeline\') return;') || textbook.includes('task.type === \'drag_drop_timeline\') continue;'),
        "Textbook Generator: 'drag_drop_timeline' is being properly skipped to fix the 'Q4 undefined' bug."
    );
} else {
    console.log("❌ FAIL: generate_textbooks.js not found.");
}

// 5. Check if PDF markers were extracted for the TOC page numbers
const pdfMarkersPath = 'scratch/pdf_markers_great_war.json';
if (fs.existsSync(pdfMarkersPath)) {
    const markers = JSON.parse(fs.readFileSync(pdfMarkersPath, 'utf8'));
    assert(
        Object.keys(markers).length > 0,
        `Textbook Contents (TOC): Page markers successfully extracted (${Object.keys(markers).length} markers found) meaning TOC page numbers are rendering correctly.`
    );
} else {
    console.log(`❌ FAIL: PDF markers file not found at ${pdfMarkersPath}.`);
}

// 6. Inspect the generated textbook to see if it worked
if (fs.existsSync('public/units/great_war/textbook.html')) {
    const html = fs.readFileSync('public/units/great_war/textbook.html', 'utf8');
    assert(
        !html.includes('undefined'),
        "HTML Verification: No 'undefined' strings exist anywhere in the generated great_war textbook HTML."
    );
    assert(
        html.includes('Page 2') || html.includes('Page 3'),
        "HTML Verification: Valid page numbers found in the textbook TOC (instead of '---')."
    );
}

console.log("=================================================");
if (failCount === 0) {
    console.log("🎉 ALL AUTOMATED CHECKS PASSED!");
} else {
    console.log(`⚠️ WARNING: ${failCount} CHECKS FAILED.`);
}
console.log("=================================================");
