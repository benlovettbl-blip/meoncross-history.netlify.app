import fs from 'fs';
import { unitData } from './weimar_nazi_germany/data.js';

const mocksFile = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/extracted_mocks.json', 'utf8');
const { extractedMocks, mappings, adapted2026 } = JSON.parse(mocksFile);

function injectQuestion(lessonId, qData) {
    const lesson = unitData.lessons.find(l => l.id === lessonId);
    if (!lesson) {
        console.error("Could not find lesson:", lessonId);
        return;
    }
    if (!lesson.exam_practice) {
        lesson.exam_practice = [];
    } else {
        lesson.exam_practice = lesson.exam_practice.filter(ep => ep.question && ep.question.trim() !== '');
    }
    // Don't add duplicate
    const exists = lesson.exam_practice.find(ep => ep.question === qData.question);
    if (!exists) {
        lesson.exam_practice.push(qData);
        console.log(`Injected into ${lessonId}: ${qData.type}`);
    }
}

// Inject NotebookLM mocks
for (const mock of extractedMocks) {
    const lessonId = mappings[mock.id];
    if (lessonId) {
        const { id, ...cleanData } = mock;
        injectQuestion(lessonId, cleanData);
    }
}

// Inject Adapted 2026
for (const mock of adapted2026) {
    const { lesson_id, ...cleanData } = mock;
    injectQuestion(lesson_id, cleanData);
}

const output = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
fs.writeFileSync('./weimar_nazi_germany/data.js', output);
console.log("Successfully injected all mocks and saved data.js.");
