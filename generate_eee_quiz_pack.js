const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'eee', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');

const match = code.match(/export const unitData = (\{[\s\S]+\});/);
let unit = new Function(`return ${match[1]}`)();

const keyTopics = [
    { title: "Key Topic 1: Queen, government and religion, 1558–69", prefix: "lesson_1" },
    { title: "Key Topic 2: Challenges to Elizabeth at home and abroad, 1569–88", prefix: "lesson_2" },
    { title: "Key Topic 3: Elizabethan society in the Age of Exploration, 1558–88", prefix: "lesson_3" }
];

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England - Master Quiz Pack</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 20mm; }
    body { font-family: 'Outfit', sans-serif; font-size: 12pt; line-height: 1.6; color: #000; }
    h1 { font-family: 'Playfair Display', serif; font-size: 32pt; text-align: center; margin-top: 100px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 20pt; color: #1a237e; border-bottom: 2px solid #ccc; padding-bottom: 5px; page-break-before: always; page-break-after: avoid; }
    .task-lines { border-bottom: 1px solid #ccc; height: 30px; margin-top: 10px; }
  </style>
</head>
<body>
<h1 style="text-align:center; font-size: 28pt; margin-top: 50px;">Early Elizabethan England<br>Master Quiz Pack</h1>`;

keyTopics.forEach(kt => {
    let questions = [];
    unit.lessons.forEach(l => {
        if (l.id.startsWith(kt.prefix) && l.do_now && l.do_now.questions) {
            questions = questions.concat(l.do_now.questions);
        }
    });

    html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 24pt;">${kt.title}: End of Topic Quiz Pack</h2>
<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> Answer the ${questions.length} quick-fire recall questions below. The scrambled answers are provided in the Answer Bank on the next page.</p>
<div style="display: flex; flex-wrap: wrap; gap: 20px;">
  <div style="width: 100%; column-count: 2; column-gap: 40px;">`;

    questions.forEach((q, i) => {
        html += `<div style="margin-bottom: 12px; break-inside: avoid;">
<div style="font-weight: 500; font-size: 10.5pt;">${i + 1}. ${q.question}</div>
<div class="task-lines"></div>
</div>`;
    });

    html += `</div></div>`;

    // Answer Bank
    let sortedAnswers = questions.map(q => q.answer).sort();
    html += `<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 20pt; text-align: center;">${kt.title} Answer Bank</h2>
<div style="border: 2px solid #1a237e; padding: 20px; background: #f8f9fa; border-radius: 8px;">
<p style="text-align: center; font-size: 11pt; line-height: 1.8;">`;

    html += sortedAnswers.map(a => `<strong>${a}</strong>`).join(" &nbsp;&bull;&nbsp; ");
    html += `</p></div>`;
});

html += `</body></html>`;
fs.writeFileSync(path.join(__dirname, 'eee', 'quiz_pack.html'), html);
console.log("Generated eee/quiz_pack.html");
