const processTaskTextWithTariff = (text) => {
    if (!text) return { cleanText: "", badgeHtml: "" };
    
    let isExam = text.toLowerCase().includes('assessment') || /\b\d+\s*marks?\b/i.test(text);
    if (isExam) {
        let marks = 8;
        let time = 10;
        let spag = 0;
        
        let match = text.match(/\(?\s*\b(\d+)\s*marks?(?:\s*\+\s*(\d+)\s*marks?\s*for\s*SPaG)?\s*\)?/i);
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
        
        let marksDisplay = spag > 0 ? `${totalMarks} marks (${marks}+${spag} SPaG)` : `${marks} marks`;

        return {
            cleanText: formatText(text),
            badgeHtml: `<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[${marksDisplay} &bull; ${time} mins]</span></div>`
        };
    }
    return { cleanText: formatText(text), badgeHtml: "" };
};
const formatText = text => text;
console.log(processTaskTextWithTariff("How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)"));