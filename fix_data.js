import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    // 1. Get legacy data
    const legacyPath = path.join(__dirname, 'water_and_sanitation/data_legacy.js');
    const legacyContent = fs.readFileSync(legacyPath, 'utf8');
    
    // Quick eval for legacy
    const fn = new Function('module', legacyContent + '; return module.exports;');
    const legacyModule = { exports: {} };
    const legacyData = fn(legacyModule);
    const quizData = legacyData.quizData;
    const tradingCardsData = legacyData.tradingCardsData;

    // 2. Write biographies.json
    fs.writeFileSync(
        path.join(__dirname, 'water_and_sanitation/biographies.json'), 
        JSON.stringify(tradingCardsData, null, 2), 
        'utf8'
    );
    console.log('Created biographies.json');

    // 3. Update data.js
    const dataPath = path.join(__dirname, 'water_and_sanitation/data.js');
    const { unitData } = await import(`file://${dataPath}?t=${Date.now()}`);

    // Map glossary to flashcards and assign quiz questions
    let questionIndex = 0;
    for (let i = 0; i < unitData.lessons.length; i++) {
        const lesson = unitData.lessons[i];
        
        // Add flashcards
        if (lesson.glossary) {
            lesson.flashcards = Object.entries(lesson.glossary).map(([term, definition]) => ({
                term,
                definition
            }));
        }

        // Add 4 quiz questions per lesson
        const lessonQuiz = [];
        for (let j = 0; j < 4; j++) {
            if (questionIndex < quizData.length) {
                const q = quizData[questionIndex++];
                // Format for core_app.js: { question, options, answer }
                const options = [...q.distractors];
                const correctIndex = Math.floor(Math.random() * (options.length + 1));
                options.splice(correctIndex, 0, q.answer);
                lessonQuiz.push({
                    question: q.question || q.q,
                    options: options,
                    answer: correctIndex
                });
            }
        }
        if (lessonQuiz.length > 0) {
            lesson.quiz = lessonQuiz;
        }
    }

    // Write back to data.js
    const newContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};\n`;
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Updated water_and_sanitation/data.js');
}

main().catch(console.error);
