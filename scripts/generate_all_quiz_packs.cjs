const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicUnitsDir = path.join(rootDir, 'public', 'units');

// Ensure public/units exists
if (!fs.existsSync(publicUnitsDir)) {
  console.log("No public/units directory found. Please run 'npm run sync' first.");
  process.exit(0);
}

const units = fs
  .readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
  .map((d) => d.name);

for (const unitId of units) {
  const unitDir = path.join(publicUnitsDir, unitId);
  const dataJsPath = path.join(unitDir, 'data.js');

  if (!fs.existsSync(dataJsPath)) continue;

  try {
    let rawData = fs.readFileSync(dataJsPath, 'utf8');

    // Naive parsing: strip imports and exports
    let jsonStr = rawData.replace(/import .*?;\n/g, '');
    jsonStr = jsonStr.replace(/export const unitData = |export default /g, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

    let unit;
    try {
      // Define dummy variables for any imports used in the data object
      let mock_exams = {};
      // Use eval for robustness against JS syntax (like functions or unquoted keys) that strict JSON.parse rejects
      // We wrap it in parentheses to force it to be treated as an expression.
      unit = eval('(' + jsonStr + ')');
    } catch (e) {
      console.warn(`Could not parse data for unit ${unitId}. Skipping quiz pack generation.`);
      continue;
    }

    let quizPack = unit.quizPack || [];

    // Dynamically build one from lesson quizzes or Do Now questions if missing
    if (quizPack.length === 0 && unit.lessons) {
      unit.lessons.forEach((l) => {
        if (l.quiz && Array.isArray(l.quiz)) {
          l.quiz.forEach((q) => {
            let ansText = '';
            if (typeof q.a === 'string' && q.a) {
              ansText = q.a;
            } else if (typeof q.answer === 'number' && q.options && q.options[q.answer]) {
              ansText = q.options[q.answer];
            } else if (typeof q.answer === 'string') {
              ansText = q.answer;
            } else if (q.options && typeof q.answer !== 'undefined' && q.options[q.answer]) {
              ansText = q.options[q.answer];
            }
            quizPack.push({
              q: q.question || q.q,
              a: ansText,
              options: q.options,
            });
          });
        }
        if (l.do_now && l.do_now.items) {
          l.do_now.items.forEach((item) => {
            if (item.question && item.answer) {
              quizPack.push({
                q: item.question,
                a: item.answer,
                options: item.options || [item.answer, 'Option B', 'Option C', 'Option D'],
              });
            }
          });
        }
        if (l.flashcards && Array.isArray(l.flashcards)) {
          l.flashcards.forEach((fc) => {
            quizPack.push({
              q: 'Define: ' + fc.term,
              a: fc.definition,
              options: [
                fc.definition,
                'A different historical term',
                'An incorrect definition',
                'None of the above',
              ],
            });
          });
        }
        if (l.fun_facts && Array.isArray(l.fun_facts)) {
          l.fun_facts.forEach((ff) => {
            quizPack.push({
              q: 'True or False: ' + ff,
              a: 'True',
              options: ['True', 'False'],
            });
          });
        }
      });
    }

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${unit.title} - Quiz Pack</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0f172a;
            --accent: #3b82f6;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --bg-light: #f8fafc;
            --border: #e2e8f0;
        }
        * { box-sizing: border-box; }
        body { 
            font-family: 'Inter', sans-serif; 
            padding: 40px; 
            color: var(--text-main); 
            max-width: 900px; 
            margin: 0 auto; 
            background-color: #f1f5f9;
        }
        .page-container {
            background: white;
            padding: 40px 50px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 25px;
            border-bottom: 2px solid var(--border);
        }
        h1 { 
            font-family: 'Outfit', sans-serif;
            color: var(--primary); 
            margin: 0 0 10px 0;
            font-weight: 800;
            font-size: 2.2rem;
            line-height: 1.2;
        }
        .subtitle {
            font-family: 'Outfit', sans-serif;
            font-size: 1.1rem;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
        }
        .questions-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px 40px;
        }
        .question-block { 
            page-break-inside: avoid; 
            background: var(--bg-light);
            padding: 20px;
            border-radius: 8px;
            border: 1px solid var(--border);
        }
        .question { 
            font-weight: 600; 
            margin-bottom: 12px; 
            font-size: 1.05rem;
            line-height: 1.4;
            color: var(--primary);
        }
        .options { 
            list-style-type: none; 
            padding: 0;
            margin: 0;
        }
        .options li { 
            margin-bottom: 8px; 
            display: flex;
            align-items: flex-start;
            font-size: 0.95rem;
            color: var(--text-muted);
        }
        .option-bubble {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #cbd5e1;
            margin-right: 10px;
            font-size: 0.7rem;
            font-weight: bold;
            color: #94a3b8;
            flex-shrink: 0;
            margin-top: 2px;
        }
        @media print {
            body { 
                padding: 0; 
                background: white; 
            }
            .page-container {
                box-shadow: none;
                padding: 0;
            }
            .question-block {
                border: 1px solid #cbd5e1;
            }
        }
    </style>
</head>
<body>
    <div class="page-container">
        <header>
            <h1>${unit.title}</h1>
            <div class="subtitle">Knowledge Recall Quiz Pack</div>
        </header>
        
        <div class="questions-grid">
`;

    if (quizPack && quizPack.length > 0) {
      const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
      quizPack.forEach((q, index) => {
        html += `
            <div class="question-block">
                <div class="question">${index + 1}. ${q.q}</div>
                <ul class="options">
                    ${(q.options || [q.a, 'Option B', 'Option C', 'Option D']).map((opt, i) => `<li><span class="option-bubble">${letters[i] || '-'}</span> ${opt}</li>`).join('')}
                </ul>
            </div>
            `;
      });
    } else {
      html += `<div style="grid-column: 1 / -1; text-align: center; color: #64748b;">No quiz data available for this unit.</div>`;
    }

    html += `
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(unitDir, 'quiz_pack.html'), html);
    console.log(`Successfully generated quiz pack for ${unitId}`);
  } catch (err) {
    console.error(`Error generating quiz pack for ${unitId}:`, err);
  }
}
