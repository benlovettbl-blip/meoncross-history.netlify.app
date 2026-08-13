const fs = require('fs');

let file = 'great_war/data.js';
let content = fs.readFileSync(file, 'utf8');
let dbText = content.replace('export const unitData = ', '').trim();
if (dbText.endsWith(';')) dbText = dbText.slice(0, -1);
let db = eval('(' + dbText + ')');

// In great_war:
// Lesson 0: "Explain why Bismarck's policy... was successful"
// Lesson 1: "Explain why Bismarck's policy... was successful" (DUPLICATED)
// Lesson 2: NOTHING
// Lesson 3: NOTHING
// Lesson 4: NOTHING
// Lesson 5: "Explain why the assassination... led to the outbreak"

// Let's see what is actually inside db.lessons
let lessons = db.lessons;

lessons[0].exam_practice = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain why Bismarck's policy of 'Blood and Iron' was successful in uniting Germany.",
            "marks": 8,
            "hints": [
                "Sentence Starter: Bismarck's policy was successful because it relied on military strength rather than...",
                "Sentence Starter: For example, he modernized the Prussian army and used it to...",
                "Sentence Starter: This resulted in a unified German Empire that was built on military victories over..."
            ]
        }
    ]
};

lessons[1].exam_practice = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain why the Franco-Prussian War created a lasting legacy of hatred between France and Germany.",
            "marks": 8,
            "hints": [
                "Sentence Starter: The war created hatred because of the humiliating terms of the peace treaty...",
                "Sentence Starter: For example, France was forced to pay a massive indemnity and lost the territory of...",
                "Sentence Starter: This resulted in a strong French desire for 'Revanche' (revenge) that lasted until..."
            ]
        }
    ]
};

lessons[2].exam_practice = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain how the 'Scramble for Africa' increased tension between European powers.",
            "marks": 8,
            "hints": [
                "Sentence Starter: The Scramble for Africa increased tension because it led to intense imperial competition...",
                "Sentence Starter: For example, incidents like the Moroccan Crises showed that Germany was trying to...",
                "Sentence Starter: This resulted in European powers forming tighter alliances and increasing their military readiness to protect their..."
            ]
        }
    ]
};

lessons[3].exam_practice = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain why the naval race between Britain and Germany damaged their relations.",
            "marks": 8,
            "hints": [
                "Sentence Starter: The naval race damaged relations because Britain saw it as a direct threat to...",
                "Sentence Starter: For example, the launch of HMS Dreadnought in 1906 escalated the competition by...",
                "Sentence Starter: This resulted in widespread public fear in Britain and the belief that Germany was preparing for..."
            ]
        }
    ]
};

lessons[4].exam_practice = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain how the Alliance System contributed to the outbreak of the First World War.",
            "marks": 8,
            "hints": [
                "Sentence Starter: The Alliance System contributed to the war by dividing Europe into two armed camps...",
                "Sentence Starter: For example, if one country was attacked, its allies were obligated to...",
                "Sentence Starter: This resulted in a local conflict in the Balkans rapidly escalating into a..."
            ]
        }
    ]
};

lessons[5].exam_practice = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain why the assassination of Archduke Franz Ferdinand led to the outbreak of the First World War.",
            "marks": 8,
            "hints": [
                "Sentence Starter: The assassination led to war because it provided Austria-Hungary with the perfect excuse to...",
                "Sentence Starter: For example, Austria-Hungary issued an impossible ultimatum to Serbia, knowing that...",
                "Sentence Starter: This resulted in the activation of the alliance system, drawing Russia and then Germany into the..."
            ]
        }
    ]
};

let newContent = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
fs.writeFileSync(file, newContent);
console.log("Successfully fixed exam practice shifting in great_war/data.js");
