const fs = require('fs');

const text = fs.readFileSync('Paper 1 Medicine Through Time with Western Front Master file for Antigravity.txt', 'utf8');

const lines = text.split('\n');
let examData = {};
let currentKT = null;
let currentQ = null;
let currentModel = null;
let inExamSection = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // e.g. "1.1 MASTERY: KT1.1 Medieval c1250-c1500: Causes of Illness" or "* 1.1 MASTERY: KT1.1" or "* KT1.2"
    const ktMatch = line.match(/(?:KT)(\d\.\d)/);
    if (ktMatch && line.includes('MASTERY')) {
        currentKT = ktMatch[1];
        inExamSection = false;
        continue;
    }
    
    if (line.includes('Section 3: Exam Mastery') || line.includes('Authentic Edexcel')) {
        inExamSection = true;
        continue;
    }
    
    // Some questions for KT5 don't have "Section 3" header, but they start with Q1, Q2, or "1 (a)"
    if (line.match(/^Q\d+\./) || line.match(/^\d\s*\([a-z]\)\./)) {
        if (currentQ) {
            if (!examData[currentKT]) examData[currentKT] = [];
            examData[currentKT].push({ q: currentQ, m: currentModel });
        }
        currentQ = line;
        currentModel = '';
        inExamSection = true;
        
        // Grab following lines that are part of the question
        let j = i + 1;
        while (j < lines.length) {
            let nextLine = lines[j].trim();
            if (nextLine.startsWith('Model Answer') || nextLine.startsWith('Teacher Note') || nextLine.match(/^Q\d+\./) || nextLine.match(/^\d\s*\([a-z]\)\./) || nextLine.includes('MASTERY:') || nextLine.startsWith('Source A:')) {
                break;
            }
            if (nextLine) currentQ += '\n' + nextLine;
            j++;
        }
        i = j - 1;
    } else if (inExamSection && (line.startsWith('Model Answer:') || line.startsWith('Teacher Note'))) {
        currentModel = line;
        let j = i + 1;
        while (j < lines.length) {
            let nextLine = lines[j].trim();
            if (nextLine.match(/^Q\d+\./) || nextLine.match(/^\d\s*\([a-z]\)\./) || nextLine.includes('MASTERY:') || nextLine.startsWith('Source A:')) {
                break;
            }
            if (nextLine) currentModel += '\n' + nextLine;
            j++;
        }
        i = j - 1;
    }
}

if (currentQ) {
    if (!examData[currentKT]) examData[currentKT] = [];
    examData[currentKT].push({ q: currentQ, m: currentModel });
}

// Write the extracted data out so I can see it
fs.writeFileSync('scratch/extracted_exams.json', JSON.stringify(examData, null, 2));
