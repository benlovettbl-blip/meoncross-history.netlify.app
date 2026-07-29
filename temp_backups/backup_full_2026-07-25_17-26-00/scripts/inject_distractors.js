const fs = require('fs');

let dataStr = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
const questions = require('../questions_dump.json');

// Filter out extremely long answers to make good distractors
const allAnswers = [...new Set(questions.map(q => q.a).filter(a => a && a.length < 150))];

function getDistractors(correctAnswer) {
    let pool = allAnswers.filter(a => a !== correctAnswer);
    pool.sort(() => 0.5 - Math.random());
    return pool.slice(0, 3);
}

let matchCount = 0;

questions.forEach(q => {
    if (!q.a) return;
    
    let distractors = getDistractors(q.a);
    let options = [q.a, ...distractors];
    options.sort(() => 0.5 - Math.random()); // Shuffle options
    
    let answerStr = JSON.stringify(q.a);
    
    // Sometimes the answer key is "a", sometimes "answer"
    let searchStrAnswer = `"answer": ${answerStr}`;
    let searchStrA = `"a": ${answerStr}`;
    
    let replacement = `${searchStrAnswer},\n          "options": ${JSON.stringify(options)}`;
    let replacementA = `${searchStrA},\n          "options": ${JSON.stringify(options)}`;
    
    if (dataStr.includes(searchStrAnswer) && !dataStr.includes(`"options": ${JSON.stringify(options)}`)) {
        dataStr = dataStr.replace(searchStrAnswer, replacement);
        matchCount++;
    } else if (dataStr.includes(searchStrA) && !dataStr.includes(`"options": ${JSON.stringify(options)}`)) {
        dataStr = dataStr.replace(searchStrA, replacementA);
        matchCount++;
    }
});

fs.writeFileSync('edexcel_medicine/data.js', dataStr);
console.log(`Injected options for ${matchCount} questions.`);
