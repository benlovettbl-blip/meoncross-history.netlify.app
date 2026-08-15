import fs from 'fs';
import path from 'path';

// Fix 1: Textbook contents page '---' -> ''
const textbookFile = 'generate_textbooks.js';
if (fs.existsSync(textbookFile)) {
    let content = fs.readFileSync(textbookFile, 'utf8');
    content = content.replace(/\$\{l\.startPage \? `Page \$\{l\.startPage\}` : '---'\}/g, "${l.startPage ? `Page ${l.startPage}` : ''}");
    fs.writeFileSync(textbookFile, content);
    console.log('✅ Patched generate_textbooks.js (Contents page dashed lines removed)');
}

// Fix 2: Workbook Tracker lesson titles
const dirs = fs.readdirSync('.', {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name);
let patchedWorkbooks = 0;

dirs.forEach(d => {
    const p = path.join(d, 'generate_worksheets.js');
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        // Change loop variable to include index
        content = content.replace(/periodLessons\.forEach\(l => \{/g, "periodLessons.forEach((l, i) => {");
        
        // Change the title rendering in trackerRows to include the lesson number
        content = content.replace(
            /<td style="border:1px solid #333; padding:6px; font-weight:bold;">\$\{l\.title\}<\/td>/g,
            '<td style="border:1px solid #333; padding:6px; font-weight:bold;">L${i + 1}: ${l.title}</td>'
        );
        
        fs.writeFileSync(p, content);
        patchedWorkbooks++;
        console.log(`✅ Patched ${p} (Tracker lesson numbers added)`);
    }
});

console.log(`Done! Patched ${patchedWorkbooks} workbook generators.`);
