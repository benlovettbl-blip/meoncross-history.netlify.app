const fs = require('fs');
const path = require('path');

const filesToPatch = [
    'generate_textbooks.js',
    'generate_pupil_workbooks.js',
    'generate_workbooks.js'
];

filesToPatch.forEach(file => {
    const filePath = path.join('C:/Projects/meoncross-history.netlify.app', file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Update badgeSource to support overrideLetter
    content = content.replace(
        /const\s+badgeSource\s*=\s*\(\s*title\s*\)\s*=>\s*\{/,
        'const badgeSource = (title, overrideLetter = null) => {\n  if (overrideLetter) title = title.replace(/(Source )\\s*[A-Z]/i, `$1${overrideLetter}`);'
    );

    // 2. Add explicit state resets at the top of the lesson loop to satisfy user requirements
    // Match the start of the lesson loop:
    const loopRegex = /(unitData\.lessons|periodLessons)\.forEach\(\(lesson,\s*(lIdx|lessonIndex)\)\s*=>\s*\{/;
    content = content.replace(loopRegex, (match) => {
        return `${match}\n      let allVideos = [];\n      let imgTags = "";\n      let sources = [];\n      let interpretations = [];\n      let sourceCharCode = 65;`;
    });

    // 3. Fix badgeSource calls to inject sourceCharCode++
    // We only want to inject it when iterating over sources, or rendering a primary source.
    // Let's just do a simpler approach: change sourceCharCode++ logic everywhere.
    content = content.replace(/badgeSource\(lesson\.primary_source\.title\)/g, 'badgeSource(lesson.primary_source.title, String.fromCharCode(sourceCharCode++))');
    content = content.replace(/badgeSource\(source\.title\)/g, 'badgeSource(source.title, String.fromCharCode(sourceCharCode++))');
    content = content.replace(/badgeSource\(block\.source\.title\)/g, 'badgeSource(block.source.title, String.fromCharCode(sourceCharCode++))');
    
    // In generate_workbooks, there are manual source letter injections:
    content = content.replace(/\$\{imgObj\.source_letter \? `<strong>Source \$\{imgObj\.source_letter\}:<\/strong> ` : ''\}/g, '${imgObj.source_letter ? `<strong>Source ${String.fromCharCode(sourceCharCode++)}:</strong> ` : \'\'}');
    content = content.replace(/\$\{block\.source_letter \? `<strong>Source \$\{block\.source_letter\}:<\/strong> ` : ''\}/g, '${block.source_letter ? `<strong>Source ${String.fromCharCode(sourceCharCode++)}:</strong> ` : \'\'}');

    // 4. Pagination fixes for tables
    content = content.replace(/<table/g, '<table style="page-break-inside: avoid;"');
    // Ensure we don't accidentally double-inject if it already has style.
    // A safer way:
    content = content.replace(/<table(?![^>]*page-break-inside:\s*avoid)/gi, '<table style="page-break-inside: avoid;"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched ${file} successfully.`);
    }
});
