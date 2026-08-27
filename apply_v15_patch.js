const fs = require('fs');

function patchGenerators() {
    const files = [
        'generate_pupil_workbooks.js',
        'generate_workbooks.js',
        'generate_textbooks.js'
    ];

    files.forEach(file => {
        if (!fs.existsSync(file)) return;
        let content = fs.readFileSync(file, 'utf8');
        let patched = false;

        // 1. Cloze blanks em-dash
        const formatTextRegex = /\.replace\(\/_\s*\{\s*3,\s*}\/g,\s*'<span[^>]*>&nbsp;<\/span>'\)/g;
        if (formatTextRegex.test(content)) {
            content = content.replace(formatTextRegex, ".replace(/_{3,}/g, '――――――')");
            patched = true;
        }

        // 2. Profile Names Filter (Content Leak)
        if (content.includes('html = html.replace(\n      /\\[Key Individual:\\s*([^\\]]+)\\]/gi,\n      "<strong>$1</strong>",\n    );')) {
            content = content.replace(
                'html = html.replace(\n      /\\[Key Individual:\\s*([^\\]]+)\\]/gi,\n      "<strong>$1</strong>",\n    );',
                'html = html.replace(/\\[Key Individual:\\s*([^\\]]+)\\]/gi, "");'
            );
            patched = true;
        } else if (content.includes('html = html.replace(/\\[Key Individual:\\s*([^\\]]+)\\]/gi, "<strong>$1</strong>");')) {
            content = content.replace(
                'html = html.replace(/\\[Key Individual:\\s*([^\\]]+)\\]/gi, "<strong>$1</strong>");',
                'html = html.replace(/\\[Key Individual:\\s*([^\\]]+)\\]/gi, "");'
            );
            patched = true;
        }

        // 3. Process Task Tariff SPaG Marks
        const oldProcessTask = `const processTaskTextWithTariff = (text) => {
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

        const newProcessTask = `const processTaskTextWithTariff = (text) => {
    if (!text) return { cleanText: "", badgeHtml: "" };
    
    let isExam = text.toLowerCase().includes('assessment') || /\\b\\d+\\s*marks?\\b/i.test(text);
    if (isExam) {
        let marks = 8;
        let time = 10;
        let spag = 0;
        
        let match = text.match(/\\(?\\s*\\b(\\d+)\\s*marks?(?:\\s*\\+\\s*(\\d+)\\s*marks?\\s*for\\s*SPaG)?\\s*\\)?/i);
        if (match) {
            marks = parseInt(match[1]);
            if (match[2]) spag = parseInt(match[2]);
            text = text.replace(match[0], '').trim();
        } else {
            if (text.toLowerCase().includes("narrative account")) marks = 8;
            else if (text.toLowerCase().includes("explain why")) marks = 12;
            else if (text.toLowerCase().includes("16 marks")) marks = 16;
        }
        
        let totalMarks = marks + spag;
        time = Math.round(totalMarks * 1.25);
        if (totalMarks === 4) time = 5;
        if (totalMarks === 8) time = 10;
        if (totalMarks === 12) time = 15;
        if (totalMarks === 16) time = 20;
        if (totalMarks === 20) time = 25;
        
        let marksDisplay = spag > 0 ? \`\${totalMarks} marks (\${marks}+\${spag} SPaG)\` : \`\${marks} marks\`;

        return {
            cleanText: formatText(text),
            badgeHtml: \`<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${marksDisplay} &bull; \${time} mins]</span></div>\`
        };
    }
    return { cleanText: formatText(text), badgeHtml: "" };
};`;

        if (content.includes(oldProcessTask)) {
            content = content.replace(oldProcessTask, newProcessTask);
            patched = true;
        }

        // 4. Cover Image Fallback (Source A)
        if (content.includes('let heroImgSrc = unitData.cover_image ? (typeof resolveAssetPath === "function" ? resolveAssetPath(unitData.cover_image, 2) : `../..${unitData.cover_image.startsWith("/") ? unitData.cover_image : "/" + unitData.cover_image}`) : \'\';')) {
            const fallbackCode = `let defaultCoverImage = "";
    if (unitData.lessons && unitData.lessons.length > 0) {
        let sourceA = unitData.lessons.flatMap(l => l.sources || []).find(s => s.src && s.title && (s.title.includes("Source A") || s.title.includes("Bloodletting") || s.title.includes("Black Death")));
        if (!sourceA) sourceA = unitData.lessons.flatMap(l => l.sources || []).find(s => s.src);
        if (sourceA) defaultCoverImage = sourceA.src;
    }
    let coverImageToUse = unitData.cover_image || defaultCoverImage;
    let heroImgSrc = coverImageToUse ? (typeof resolveAssetPath === "function" ? resolveAssetPath(coverImageToUse, 2) : \`../..\${coverImageToUse.startsWith("/") ? coverImageToUse : "/" + coverImageToUse}\`) : '';`;
            content = content.replace('let heroImgSrc = unitData.cover_image ? (typeof resolveAssetPath === "function" ? resolveAssetPath(unitData.cover_image, 2) : `../..${unitData.cover_image.startsWith("/") ? unitData.cover_image : "/" + unitData.cover_image}`) : \'\';', fallbackCode);
            patched = true;
        }

        // Apply file-specific fixes
        if (file === 'generate_pupil_workbooks.js') {
            content = content.replace(/\$\{\(renderImages && lesson\.primary_source\.caption\) \? `<div class="source-caption">\$\{lesson\.primary_source\.caption\}<\/div>` : ""\}/g, '');
            content = content.replace(/\$\{source\.caption \? `<div class="source-caption" style="margin-top: 5px; font-size: 10pt;">\$\{source\.caption\}<\/div>` : ""\}/g, '');
        }

        if (file === 'generate_workbooks.js') {
            if (content.includes('<strong>Q${lesson.extended.qNum}. ${formatText(lesson.extended.question)}</strong>')) {
                content = content.replace(
                    '<strong>Q${lesson.extended.qNum}. ${formatText(lesson.extended.question)}</strong>',
                    '<strong>${lesson.extended.examQNum ? "Q" + lesson.extended.examQNum + ". " : "Q" + lesson.extended.qNum + ". "}${formatText(lesson.extended.question)}</strong>'
                );
            }
        }

        if (patched) {
            fs.writeFileSync(file, content, 'utf8');
            console.log("Patched " + file);
        }
    });

    // 5. Update data.js
    const dataFile = 'public/units/edexcel_medicine/data.js';
    if (fs.existsSync(dataFile)) {
        let dataContent = fs.readFileSync(dataFile, 'utf8');
        if (dataContent.includes('Explain your answer. (16 marks) You may use the following in your answer:<br>• bloodletting<br>• dissection')) {
            dataContent = dataContent.replace(
                '"question": "\'The main reason why medical care and treatment was ineffective during the medieval period was because medical knowledge was based on Galen\'s ideas.\' How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• bloodletting<br>• dissection<br>You must also use information of your own."',
                '"question": "\'The main reason why medical care and treatment was ineffective during the medieval period was because medical knowledge was based on Galen\'s ideas.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG) You may use the following in your answer:<br>• bloodletting<br>• dissection<br>You must also use information of your own.",\n        "examQNum": 8'
            );
            fs.writeFileSync(dataFile, dataContent, 'utf8');
            console.log("Patched data.js");
        }
    }
}

patchGenerators();
