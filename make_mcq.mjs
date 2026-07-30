import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'eee', 'data.js');

let content = fs.readFileSync(dataFilePath, 'utf8');

let jsonStr = content.replace('export const unitData = ', '').trim();
if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
}

let unitData;
try {
    unitData = eval('(' + jsonStr + ')');
} catch (e) {
    console.error("Error evaluating data.js", e);
    process.exit(1);
}

// Helper to shuffle an array
function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

let updatedCount = 0;

unitData.lessons.forEach(lesson => {
    if (lesson.quiz && lesson.quiz.length > 0) {
        const isMCQ = !!lesson.quiz[0].options;
        if (!isMCQ) {
            console.log(`Converting quiz for lesson: ${lesson.title}`);
            const allAnswers = lesson.quiz.map(q => q.a || q.answer).filter(a => a);
            
            const newQuiz = lesson.quiz.map((q) => {
                const qText = q.q || q.question;
                const correctA = q.a || q.answer;
                
                // Find 3 unique distractors
                const distractors = new Set();
                let attempts = 0;
                while(distractors.size < 3 && attempts < 100) {
                    const randA = allAnswers[Math.floor(Math.random() * allAnswers.length)];
                    if (randA !== correctA) {
                        distractors.add(randA);
                    }
                    attempts++;
                }
                
                // If we couldn't find enough distractors (very short quiz?), just pad with some generic ones
                if (distractors.size < 1) distractors.add("The Spanish Armada");
                if (distractors.size < 2) distractors.add("Queen Mary I");
                if (distractors.size < 3) distractors.add("The Pope");

                const options = [correctA, ...Array.from(distractors)];
                shuffleArray(options);
                
                const correctIndex = options.indexOf(correctA);
                
                return {
                    question: qText,
                    options: options,
                    answer: correctIndex
                };
            });
            
            lesson.quiz = newQuiz;
            updatedCount++;
        }
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
    console.log(`Successfully converted ${updatedCount} lesson quizzes to multiple choice.`);
} else {
    console.log("No non-MCQ quizzes found to convert.");
}
