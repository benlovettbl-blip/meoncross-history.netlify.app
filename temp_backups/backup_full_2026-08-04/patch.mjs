import fs from 'fs';
import { unitData } from './eee/data.js';
import { mock_exams } from './eee/mock_exams.js';

// Convert existing exam_practice to arrays if necessary, and clear them to avoid duplicates.
unitData.lessons.forEach(lesson => {
    lesson.exam_practice = [];
});

// Mapping of partial question text to Lesson IDs based on our plan
const mapping = {
    "characteristic of poverty": "lesson_3_2",
    "attempts to colonise Virginia": "lesson_3_4",
    "Northern Earls' Rebellion (1569-70) posed": "lesson_2_1",
    "Northern Earls' Rebellion (1569) was a serious": "lesson_2_1",
    "Mary, Queen of Scots: her claim to the English throne was the main cause of the Revolt of the Northern Earls": "lesson_2_1",
    "Economic difficulties were the most significant challenge Elizabeth faced upon her accession": "lesson_1_1",
    "Elizabeth's government was completely dependent on the Privy Council": "lesson_1_1",
    "role of the Justices of the Peace (JPs)": "lesson_1_1",
    "Elizabethan England in 1558: society and government": "lesson_1_1",
    "challenges at home and from abroad upon her accession in 1558": "lesson_1_1",
    "Spanish strategic errors were the primary cause of England's triumph over the Armada": "lesson_2_4",
    "English naval tactics were the main reason for the defeat of the Spanish Armada": "lesson_2_4",
    "feature of the Ridolfi Plot": "lesson_2_1",
    "feature of the Throckmorton Plot": "lesson_2_1",
    "relations between England and Spain declined in the years 1568-1585": "lesson_2_2",
    "threat from Catholics at home was more serious than the threat from Spain in the years 1569-1588": "lesson_2_2",
    "voyages of exploration in Elizabeth's reign were primarily motivated by a desire for wealth": "lesson_3_3",
    "Drake's circumnavigation of the globe": "lesson_3_3",
    "feature of Elizabethan grammar schools": "lesson_3_1",
    "feature of Elizabethan pastimes for the rich": "lesson_3_1",
    "feature of the theatre": "lesson_3_1",
    "development of the theatre was the most significant change to leisure": "lesson_3_1",
    "Babington Plot (1586) led to the execution of Mary, Queen of Scots": "lesson_2_1",
    "Mary, Queen of Scots, was executed in 1587": "lesson_2_1",
    "Walsingham and the use of spies was the main reason for the significance of Mary Queen of Scots’ execution": "lesson_2_1",
    "feature of Walsingham and the use of spies": "lesson_2_1",
    "religious settlement of 1559 successfully solved the problem of religion": "lesson_1_2",
    "role of the Church of England in early Elizabethan society": "lesson_1_2",
    "why Elizabeth's religious settlement was introduced in 1559": "lesson_1_2",
    "Catholic challenge was a greater threat to Elizabeth's religious settlement than the Puritan challenge in the years 1559–69": "lesson_1_3",
    "feature of the poor rate": "lesson_3_2",
    "1572 Vagabonds Act": "lesson_3_2",
    "drive to expand trade was the main reason for the attempted colonisation of Virginia": "lesson_3_4",
    "Drake and the raid on Cadiz": "lesson_2_3",
    "actions of Robert Dudley were the main reason for deteriorating relations with Spain in the years 1585–88": "lesson_2_3"
};

// Flatten all questions
let allQuestions = [];
mock_exams.forEach(mock => {
    mock.questions.forEach(q => {
        if (q.type === 'essay_choice') {
            q.options.forEach(opt => {
                allQuestions.push({
                    text: opt.text,
                    marks: q.marks,
                    bullet_points: opt.bullet_points,
                    model_answer: opt.model_answer
                });
            });
        } else {
            allQuestions.push({
                text: q.text,
                marks: q.marks,
                bullet_points: q.bullet_points,
                model_answer: q.model_answer
            });
        }
    });
});

// Map questions to lessons
let unmapped = [];
allQuestions.forEach(q => {
    let matchedLessonId = null;
    for (const [key, lessonId] of Object.entries(mapping)) {
        if (q.text.includes(key)) {
            matchedLessonId = lessonId;
            break;
        }
    }
    
    if (matchedLessonId) {
        let lesson = unitData.lessons.find(l => l.id === matchedLessonId);
        if (lesson) {
            let hint = `This is a ${q.marks}-mark question.`;
            if (q.bullet_points && q.bullet_points.length > 0) {
                hint += `\n\nYou may use the following in your answer:\n- ${q.bullet_points[0]}\n- ${q.bullet_points[1]}\n\nYou must also use information of your own.`;
            }
            
            // For 2 mark questions, they are asked twice in Edexcel
            let formattedQ = q.text;
            if (q.marks === 2) {
                formattedQ = q.text + " (2 marks)\n" + q.text + " (2 marks)";
                hint += " Remember the new Edexcel specification asks this as two separate 2-mark questions: 'Describe one feature...' twice. Identify a feature (1 mark) and add supporting detail (1 mark).";
            } else {
                formattedQ = q.text + ` (${q.marks} marks)`;
            }
            
            lesson.exam_practice.push({
                question: formattedQ,
                hint: hint,
                model_answer: q.model_answer
            });
        }
    } else {
        unmapped.push(q.text);
    }
});

if (unmapped.length > 0) {
    console.log("Unmapped questions:", unmapped);
} else {
    console.log("All questions mapped successfully!");
}

const newFileContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};\n`;
fs.writeFileSync('eee/data.js', newFileContent);
console.log("Updated eee/data.js");
