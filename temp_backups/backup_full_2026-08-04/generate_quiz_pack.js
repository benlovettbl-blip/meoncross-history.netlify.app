const fs = require('fs');

let rawData = fs.readFileSync('great_war/data.js', 'utf8');
const dataPrefix = "export const unitData = ";
let jsonStr = rawData.replace(dataPrefix, '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${unit.title} - Quiz Pack</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
        h1 { color: #1a237e; text-align: center; }
        .question-block { margin-bottom: 20px; page-break-inside: avoid; }
        .question { font-weight: bold; margin-bottom: 5px; }
        .options { margin-left: 20px; list-style-type: upper-alpha; }
        .options li { margin-bottom: 3px; }
        @media print {
            body { padding: 0; }
        }
    </style>
</head>
<body>
    <h1>${unit.title}<br><span style="font-size: 0.7em; color: #555;">Knowledge Recall Quiz Pack</span></h1>
    <hr style="margin-bottom: 30px;">
`;

if (unit.quizPack && unit.quizPack.length > 0) {
    unit.quizPack.forEach((q, index) => {
        html += `
        <div class="question-block">
            <div class="question">${index + 1}. ${q.q}</div>
            <ul class="options">
                ${(q.options || [q.a, "Option B", "Option C", "Option D"]).map(opt => `<li>${opt}</li>`).join('')}
            </ul>
        </div>
        `;
    });
} else {
    html += `<p>No quiz data available.</p>`;
}

html += `
</body>
</html>`;

fs.writeFileSync('great_war/quiz_pack.html', html);
console.log('Successfully generated great_war/quiz_pack.html');
