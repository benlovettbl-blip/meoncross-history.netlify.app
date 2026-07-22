const fs = require('fs');

const text = fs.readFileSync('./Paper 1 Medicine Through Time with Western Front Master file for Antigravity.txt', 'utf8');
const lines = text.split('\n');

// Re-generate temp_data2.js to be safe
let dataString = fs.readFileSync('./edexcel_medicine/data.js', 'utf8');
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync('./scratch/temp_data2.js', tempFile);
delete require.cache[require.resolve('./temp_data2.js')];
const unitData = require('./temp_data2.js');

const ktToLessonIndex = {
  "1.1": 0, "1.2": 1, "1.3": 2,
  "2.1": 3, "2.2": 4, "2.3": 5,
  "3.1": 6, "3.2": 7, "3.3": 8,
  "4.1": 9, "4.2": 10, "4.3": 11, "4.4": 12
};

let currentKT = null;
let currentQ = null;
let currentModel = "";

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for KT header (e.g. KT1.1) to know which lesson we're in
    const ktMatch = line.match(/(?:KT)(\d\.\d)/);
    if (ktMatch && !line.includes('MASTERY')) {
        currentKT = ktMatch[1];
    }
    
    // If line has marks (e.g. 12 marks, 16 marks) and starts with "* Explain" or "* 'The Theory"
    if (line.match(/\(\d{1,2}\s*marks?\)/i) && line.startsWith('*')) {
        currentQ = line.replace(/^\*\s*/, ''); // remove the bullet point star
    }
    
    if (line.startsWith('Model Answer:') && currentKT) {
        currentModel = line;
        let j = i + 1;
        while (j < lines.length) {
            let nextLine = lines[j].trim();
            // Stop when we hit a new KT header, or the end of the section, or another question
            if (nextLine.startsWith('KT') || nextLine.match(/\(\d{1,2}\s*marks?\)/i) || nextLine.startsWith('* Teacher Note') || nextLine.startsWith('________________')) {
                break;
            }
            if (nextLine) currentModel += '<br><br>' + nextLine;
            j++;
        }
        
        // Save it to the database
        const lessonIndex = ktToLessonIndex[currentKT];
        if (lessonIndex !== undefined && unitData.lessons[lessonIndex] && unitData.lessons[lessonIndex].extended) {
            
            // Re-fetch the teacher note from the existing data to append it safely
            let existingModel = unitData.lessons[lessonIndex].extended.model || "";
            let teacherNote = "";
            if (existingModel.includes('Teacher Note')) {
                teacherNote = existingModel.substring(existingModel.indexOf('Teacher Note'));
                teacherNote = teacherNote.replace('Teacher Note on Exam Technique:', 'Teacher Note & Exam Scaffolding:**');
                if (!teacherNote.startsWith('**')) teacherNote = '**' + teacherNote;
            }
            
            // Format bullet points in the model answer if any
            let htmlModel = currentModel.replace(/Model Answer:/g, '<strong>Model Answer:</strong>');
            htmlModel = htmlModel.replace(/\n\*\s/g, '<br>• ');
            
            // Append scaffolding if we found one
            if (teacherNote) {
                htmlModel += "\n\n<hr>\n\n" + teacherNote;
            }
            
            unitData.lessons[lessonIndex].extended.question = currentQ;
            unitData.lessons[lessonIndex].extended.model = htmlModel;
            console.log(`Updated KT${currentKT} with actual Notebook LM Model Answer.`);
        }
        
        currentQ = null;
        currentModel = "";
        i = j - 1; // skip lines we already processed
    }
}

const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync('./edexcel_medicine/data.js', newString);
console.log('Successfully replaced AI generated models with the NotebookLM ones from the text file.');
