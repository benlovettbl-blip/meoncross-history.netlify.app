const fs = require('fs');

// 1. Update export_pdfs.js for _FINAL suffix
let exportScript = fs.readFileSync('export_pdfs.js', 'utf8');
exportScript = exportScript.replace(
    "const pdfFileName = unit + '_' + file.replace('.html', '.pdf');",
    "const pdfFileName = unit + '_' + file.replace('.html', '_FINAL.pdf');"
);
fs.writeFileSync('export_pdfs.js', exportScript);
console.log('Patched export_pdfs.js');

// Helper to patch generator files
const patchGenerator = (file) => {
    if (!fs.existsSync(file)) return;
    let code = fs.readFileSync(file, 'utf8');

    // 2. Fix src/data_parser.js + local formatText for Markdown underscores
    // Since formatText is defined locally in the generators in V4, we patch it there.
    const oldFormatText = /const formatText = \(text\) => \{\n\s*if \(!text\) return "";\n\s*return text\n\s*\.replace\(\/\\\(Weighing the Evidence toggle tabs\\\)\/gi, ""\)\n\s*\.replace\(\/\\\*\\\*\(\.\*\?\)\\\*\\\*\/g, "<strong>\$1<\/strong>"\)\n\s*\.replace\(\/\\\*\(\.\*\?\)\\\*\/g, "<em>\$1<\/em>"\);\n\};/g;
    
    const newFormatText = `const formatText = (text) => {
  if (!text) return "";
  return text
    .replace(/\\(Weighing the Evidence toggle tabs\\)/gi, "")
    .replace(/_{3,}/g, '_________')
    .replace(/\\*\\*(.*?)\\*\\*/g, "<strong>$1</strong>")
    .replace(/\\*(.*?)\\*/g, "<em>$1</em>");
};`;
    code = code.replace(oldFormatText, newFormatText);

    // 3. DOM Injection for Exam Tariffs
    // First, fix the [\s\S]*? disaster in getTariffBadge (if it exists)
    code = code.replace(/match\(\/\\\(\\\d\+\\\)\[\\s\\S\]\*\?marks\\\)\/i\)/g, "match(/\\((\\d+)\\s*marks?\\)/i)");
    code = code.replace(/text = text\.replace\(match\[0\], ''\);/g, "text = text.replace(match[0], '');");
    
    // Patch processTaskTextWithTariff to return object
    let oldProcess = code.match(/const processTaskTextWithTariff = \(text\) => \{[\s\S]*?return text;\n\};/);
    if (oldProcess) {
        let newProcess = `const processTaskTextWithTariff = (text) => {
    if (!text) return { cleanText: "", badgeHtml: "" };
    if (text.toLowerCase().includes('assessment') || /\\(?\\b\\d+\\s*marks?\\b\\)?/is.test(text)) {
        let marks = 8;
        let match = text.match(/\\(?\\s*\\b(\\d+)\\s*marks?\\b]?\\)?/i);
        if (match) {
            marks = parseInt(match[1]);
            text = text.replace(match[0], '').trim();
        } else {
            if (text.toLowerCase().includes("narrative account")) marks = 8;
            else if (text.toLowerCase().includes("explain why")) marks = 12;
            else if (text.toLowerCase().includes("16 marks")) marks = 16;
        }
        let time = Math.round(marks * 1.25);
        if (marks === 4) time = 5;
        if (marks === 8) time = 10;
        if (marks === 12) time = 15;
        if (marks === 16) time = 20;
        
        return {
            cleanText: formatText(text),
            badgeHtml: \`<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${marks} marks &bull; \${time} mins]</span></div>\`
        };
    }
    return { cleanText: formatText(text), badgeHtml: "" };
};`;
        code = code.replace(oldProcess[0], newProcess);
    }
    
    // Inject the badge separately
    const regex1 = /(html\s*\+=\s*`.*?)\$\{processTaskTextWithTariff\((.*?)\)\}(.*?`\s*;)/g;
    code = code.replace(regex1, (match, before, args, after) => {
        return `let _tInfo = processTaskTextWithTariff(${args});\n            ${before}\${_tInfo.cleanText}${after}\n            html += _tInfo.badgeHtml;`;
    });

    const regex2 = /(allExamTasksHtml\s*\+=\s*`.*?)\$\{processTaskTextWithTariff\((.*?)\)\}(.*?`\s*;)/g;
    code = code.replace(regex2, (match, before, args, after) => {
        return `let _tInfo = processTaskTextWithTariff(${args});\n            ${before}\${_tInfo.cleanText}${after}\n            allExamTasksHtml += _tInfo.badgeHtml;`;
    });

    // Patch for the other rendering place (questionHtml)
    const oldQHtml = `let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${formatText(rawQText)}\${marksStr}</strong></div>\`;`;
    const newQHtml = `let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${formatText(rawQText)}</strong></div>\`;
            if (ep.marks) {
                let time = Math.round(ep.marks * 1.25);
                questionHtml += \`<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${ep.marks} marks &bull; \${time} mins]</span></div>\`;
            }`;
    code = code.replace(oldQHtml, newQHtml);

    // 4. Do Now Lines
    const oldDoNow = `              let linesToDraw = 2;
              for (let i = 0; i < linesToDraw; i++) {
                html += \`<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>\`;
              }`;
    const newDoNow = `              html += \`<hr style="margin: 20px 0; border: 0; border-bottom: 1px solid #ccc;">\`;`;
    code = code.replace(oldDoNow, newDoNow);
    
    // 5. Cover Image Fallback (Hardcoded plague doctor Wikimedia URL)
    const oldCover1 = "let coverImage = lesson.cover_image || unitConfig.cover_image || '';";
    const newCover1 = "let coverImage = lesson.cover_image || unitConfig.cover_image || '';\n      if (unit === 'edexcel_medicine') { coverImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28Holl%C3%A4nder_version%29.png/500px-Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28Holl%C3%A4nder_version%29.png'; }";
    code = code.replace(oldCover1, newCover1);

    const oldCover2 = "let coverUrl = lesson.cover_image || unitConfig.cover_image || '';";
    const newCover2 = "let coverUrl = lesson.cover_image || unitConfig.cover_image || '';\n        if (unit === 'edexcel_medicine') { coverUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28Holl%C3%A4nder_version%29.png/500px-Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28Holl%C3%A4nder_version%29.png'; }";
    code = code.replace(oldCover2, newCover2);

    fs.writeFileSync(file, code);
    console.log(`Patched ${file}`);
}

patchGenerator('generate_pupil_workbooks.js');
patchGenerator('generate_workbooks.js');
patchGenerator('generate_textbooks.js');

// 2b. Fix src/data_parser.js for formatText
let parser = fs.readFileSync('src/data_parser.js', 'utf8');
const oldParserFormatText = /const formatText = \(text\) => \{\n\s*if \(!text\) return "";\n\s*return text\n\s*\.replace\(\/\\\(Weighing the Evidence toggle tabs\\\)\/gi, ""\)\n\s*\.replace\(\/\\\*\(\.\*\?\)\\\*\/g, "<em>\$1<\/em>"\)\n\s*\.replace\(\/\\\*\\\*\(\.\*\?\)\\\*\\\*\/g, "<strong>\$1<\/strong>"\);\n\};/g;
const newParserFormatText = `const formatText = (text) => {
  if (!text) return "";
  return text
    .replace(/\\(Weighing the Evidence toggle tabs\\)/gi, "")
    .replace(/_{3,}/g, '_________')
    .replace(/\\*(.*?)\\*/g, "<em>$1</em>")
    .replace(/\\*\\*(.*?)\\*\\*/g, "<strong>$1</strong>");
};`;
if (parser.match(oldParserFormatText)) {
    parser = parser.replace(oldParserFormatText, newParserFormatText);
    fs.writeFileSync('src/data_parser.js', parser);
    console.log('Patched src/data_parser.js');
}
