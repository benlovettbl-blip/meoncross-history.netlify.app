const fs = require('fs');

const filesToPatch = [
    'generate_pupil_workbooks.js',
    'generate_workbooks.js',
    'generate_textbooks.js'
];

filesToPatch.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // 1 & 2. Cover Image CSS Limit and Dynamic Covers
    const oldHeroHtml = 'let heroHtml = heroImgSrc ? `<img src="${heroImgSrc}" style="width: 100%; height: 60vh; object-fit: cover; border-bottom: 5px solid #1e3a8a; border-top-left-radius: 12px; border-top-right-radius: 12px;">` : \'\';';
    
    const newHeroHtml = `let heroHtml = heroImgSrc ? \`<img src="\${heroImgSrc}" style="max-height: 45vh; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">\` : '';
    
    if (unitId === 'edexcel_medicine') {
        heroHtml = \`<div style="border: 2px solid #1e3a8a; padding: 15px; margin-top: 20px; background-color: #f8fafc;">
<h3 style="color: #1e3a8a; margin-top: 0;">Edexcel Specification: c1250–c1500</h3>
<ul style="font-size: 11pt; line-height: 1.5;">
<li><strong>1. Causes of disease:</strong> Supernatural/religious explanations, Astrology, Four Humours, and Miasma.</li>
<li><strong>2. Prevention and treatment:</strong> Religious actions, bloodletting, purging, purifying air.</li>
<li><strong>3. Medical care:</strong> The role of physicians, apothecaries, barber surgeons, and hospitals.</li>
<li><strong>4. Case Study: The Black Death (1348):</strong> Beliefs about its causes, treatments, and prevention.</li>
</ul></div>\`;
    }`;
    
    if (content.includes(oldHeroHtml)) {
        content = content.replace(oldHeroHtml, newHeroHtml);
    }
    
    // 5. Cloze Blanks Brute-Force (10 underscores)
    const oldCloze1 = ".replace(/_{3,}/g, '??????')";
    const oldCloze2 = ".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')";
    const oldCloze3 = ".replace(/_{3,}/g, '—{6}')";
    const newCloze = ".replace(/_{3,}/g, '__________')";
    
    content = content.split(oldCloze1).join(newCloze);
    content = content.split(oldCloze2).join(newCloze);
    content = content.split(oldCloze3).join(newCloze);

    fs.writeFileSync(file, content, 'utf8');
    console.log("Patched layout & cloze in " + file);
});

// Now for generate_pupil_workbooks.js specific logic fixes
let gpw = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 3. Duplicate Q6 & Missed Badges (checkAndAdd regex)
const oldCheckAndAdd = `    function checkAndAdd(obj, force = false) {
      if (!obj) return;
      let qText = obj.question || obj.text || obj.topic || obj.stretch_question;
      if (force || obj.marks || (qText && /\\(\\d+\\s*marks/i.test(qText))) {
        obj.examQNum = globalExamQNum++;
      }
    }`;

const newCheckAndAdd = `    function checkAndAdd(obj, force = false) {
      if (!obj) return;
      let qText = obj.question || obj.text || obj.topic || obj.stretch_question;
      // Use boundary regex to catch all "16 marks" variants and prevent duplicate assignments
      if (force || obj.marks || (qText && /\\b\\d+\\s*marks/i.test(qText))) {
        if (!obj.examQNum) {
            obj.examQNum = globalExamQNum++;
        }
      }
    }`;

if (gpw.includes(oldCheckAndAdd)) {
    gpw = gpw.replace(oldCheckAndAdd, newCheckAndAdd);
    console.log("Patched checkAndAdd (Fix #3)");
}

// 4. SPaG Math Error
// Currently:
// let totalMarks = marks + spag;
// if (marks === 4) time = 5;
// We need to calculate time based on totalMarks!
const oldProcessTariff = `        if (marks === 4) time = 5;
        else if (marks === 8) time = 10;
        else if (marks === 12) time = 15;
        else if (marks === 16) time = 20;
        
        let totalMarks = marks + spag;`;

const newProcessTariff = `        let totalMarks = marks + spag;
        
        if (totalMarks === 4) time = 5;
        else if (totalMarks === 8) time = 10;
        else if (totalMarks === 12) time = 15;
        else if (totalMarks === 16) time = 20;
        else if (totalMarks === 20) time = 25;`;

if (gpw.includes(oldProcessTariff)) {
    gpw = gpw.replace(oldProcessTariff, newProcessTariff);
    console.log("Patched SPaG Math (Fix #4)");
}

fs.writeFileSync('generate_pupil_workbooks.js', gpw, 'utf8');

// Finally, update export_pdfs.js to use _FINAL_V4.pdf
let exportContent = fs.readFileSync('export_pdfs.js', 'utf8');
exportContent = exportContent.split('_FINAL_V3.pdf').join('_FINAL_V4.pdf');
exportContent = exportContent.split('_FINAL.pdf').join('_FINAL_V4.pdf');
fs.writeFileSync('export_pdfs.js', exportContent, 'utf8');
console.log("Patched export_pdfs.js to _FINAL_V4.pdf");
