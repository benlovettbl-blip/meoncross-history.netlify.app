const fs = require('fs');

const file = './great_war/data.js';
let content = fs.readFileSync(file, 'utf8');

const badDoNow = `"items": [
            "1. Name two major powers in Europe in 1870.",
            "2. What is an empire?",
            "3. Why is having a strong army important for a country surrounded by others?",
            "4. Define the term 'Balance of Power'."
        ]`;

const goodDoNow = `"items": [
            { "question": "Name two major powers in Europe in 1870.", "answer": "France and Russia" },
            { "question": "What is an empire?", "answer": "A large group of states or countries ruled by a single monarch (emperor)." },
            { "question": "Why is having a strong army important for a country surrounded by others?", "answer": "To defend against attacks from multiple sides (a two-front war)." },
            { "question": "Define the term 'Balance of Power'.", "answer": "A situation in which nations of the world have roughly equal power, preventing any one nation from dominating." }
        ]`;

if (content.includes(badDoNow)) {
    content = content.replace(badDoNow, goodDoNow);
    fs.writeFileSync(file, content);
    console.log("Successfully fixed the do_now items in great_war/data.js");
} else {
    console.log("Could not find the bad do_now array.");
}
