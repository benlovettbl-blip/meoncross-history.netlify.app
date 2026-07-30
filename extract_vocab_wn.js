const fs = require('fs');

const file = fs.readFileSync('./weimar_nazi_germany/data.js', 'utf-8');
const lessons = [];

// Simple regex extraction since we just need the lesson titles and vocab terms
const lessonMatches = [...file.matchAll(/"id":\s*"(.*?)",\s*"title":\s*"(.*?)",[\s\S]*?"vocab":\s*\[([\s\S]*?)\]/g)];

lessonMatches.forEach(match => {
    const id = match[1];
    const title = match[2];
    const vocabBlock = match[3];
    const terms = [...vocabBlock.matchAll(/"term":\s*"(.*?)"/g)].map(m => m[1]);
    
    lessons.push({
        id,
        title,
        terms
    });
});

console.log(JSON.stringify(lessons, null, 2));
