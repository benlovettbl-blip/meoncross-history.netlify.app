const fs = require('fs');

const examData = JSON.parse(fs.readFileSync('./scratch/extracted_exams.json', 'utf8'));

let dataString = fs.readFileSync('./edexcel_medicine/data.js', 'utf8');
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync('./scratch/temp_data.js', tempFile);
delete require.cache[require.resolve('./temp_data.js')];
const unitData = require('./temp_data.js');

const ktToLessonIndex = {
  "1.1": 0, "1.2": 1, "1.3": 2,
  "2.1": 3, "2.2": 4, "2.3": 5,
  "3.1": 6, "3.2": 7, "3.3": 8,
  "4.1": 9, "4.2": 10, "4.3": 11, "4.4": 12,
  "5.1": 13, "5.2": 14, "5.3": 15, "5.4": 16, "5.5": 17
};

for (const kt in examData) {
    if (examData[kt] && examData[kt].length > 0) {
        const lessonIndex = ktToLessonIndex[kt];
        if (lessonIndex !== undefined && unitData.lessons[lessonIndex]) {
            let bestQ = null;
            let maxMarks = -1;
            
            examData[kt].forEach(item => {
                const marksMatch = item.q.match(/\((\d+)\s*marks?\)/i);
                const marks = marksMatch ? parseInt(marksMatch[1]) : 0;
                if (marks > maxMarks) {
                    maxMarks = marks;
                    bestQ = item;
                }
            });
            
            if (bestQ) {
                let fullText = bestQ.q + '\n' + bestQ.m;
                
                // Usually it starts with "Q2. ..." or "1 (a)..."
                // The Teacher Note or Model Answer usually starts with "* Teacher Note" or "Model Answer:"
                let qText = fullText;
                let mText = "";
                
                if (fullText.includes('* Teacher Note')) {
                    qText = fullText.split('* Teacher Note')[0].trim();
                    mText = 'Teacher Note' + fullText.split('* Teacher Note')[1].trim();
                } else if (fullText.includes('Model Answer:')) {
                    qText = fullText.split('Model Answer:')[0].trim();
                    mText = 'Model Answer:' + fullText.split('Model Answer:')[1].trim();
                }
                
                // Cleanup junk at the end of mText
                mText = mText.split('* From <https')[0].trim();
                mText = mText.split('________________')[0].trim();
                
                // Format bullet points
                qText = qText.replace(/\n\*\s/g, '<br>• ');
                mText = mText.replace(/\n\*\s/g, '<br>• ');
                
                if (!unitData.lessons[lessonIndex].extended) {
                    unitData.lessons[lessonIndex].extended = {};
                }
                
                unitData.lessons[lessonIndex].extended.question = qText;
                unitData.lessons[lessonIndex].extended.model = mText;
            }
        }
    }
}

const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync('./edexcel_medicine/data.js', newString);
console.log('edexcel_medicine/data.js updated with correct Model Answers.');
