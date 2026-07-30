const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicUnitsDir = path.join(rootDir, 'public', 'units');

if (!fs.existsSync(publicUnitsDir)) {
  console.log("No public/units directory found. Please run 'npm run sync' first.");
  process.exit(0);
}

const units = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.'))
  .map(d => d.name);

for (const unitId of units) {
  const unitDir = path.join(publicUnitsDir, unitId);
  const dataJsPath = path.join(unitDir, 'data.js');
  
  if (!fs.existsSync(dataJsPath)) continue;

  try {
    let rawData = fs.readFileSync(dataJsPath, 'utf8');
    
    // Naive parsing: strip imports and exports
    let jsonStr = rawData.replace(/import .*?;\n/g, '');
    jsonStr = jsonStr.replace(/export const unitData = |export default |export const gwData = /g, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    let unit;
    try {
      let mock_exams = {};
      unit = eval('(' + jsonStr + ')');
    } catch (e) {
      console.warn(`Could not parse data for unit ${unitId}. Skipping mastery pack generation.`);
      continue;
    }

    // Only process units that have workbooks configured (periods)
    if (!unit.workbooks || !unit.lessons) continue;

    for (const wb of unit.workbooks) {
        // Collect 80 questions (or as many as available) from the lessons for this Key Topic
        let questions = [];
        let prefix = wb.prefix || wb.id;
        let matchingLessons = unit.lessons.filter(l => l.id.startsWith(prefix) || l.title.startsWith(prefix));
        
        for (const lesson of matchingLessons) {
            if (lesson.quiz && Array.isArray(lesson.quiz)) {
                lesson.quiz.forEach(q => {
                    let ansStr = '';
                    if (q.options && typeof q.answer !== 'undefined') {
                        ansStr = q.options[q.answer];
                    } else if (q.a) {
                        ansStr = q.a;
                    }
                    questions.push({
                        lessonTitle: lesson.title,
                        q: q.question || q.q,
                        a: ansStr
                    });
                });
            }
            if (lesson.do_now && Array.isArray(lesson.do_now.items)) {
                lesson.do_now.items.forEach(q => {
                    let ansStr = q.answer || q.a || '';
                    if (!ansStr && q.options && typeof q.answer !== 'undefined') {
                        ansStr = q.options[q.answer];
                    }
                    questions.push({
                        lessonTitle: lesson.title,
                        q: q.question || q.q,
                        a: ansStr
                    });
                });
            }
        }

        if (questions.length === 0) continue;

        // Ensure we group exactly by 20 questions per page
        const pages = [];
        let currentPage = [];
        let currentLessonTitle = questions[0].lessonTitle;

        for (let i = 0; i < questions.length; i++) {
            if (currentPage.length === 20) {
                pages.push({ title: currentLessonTitle, questions: currentPage });
                currentPage = [];
                currentLessonTitle = questions[i].lessonTitle;
            } else if (questions[i].lessonTitle !== currentLessonTitle && currentPage.length > 0 && false) {
                // We could split rigidly by lesson, but the blueprint asks for 20 per page.
                // Assuming exactly 20 questions per lesson.
            }
            if (currentPage.length === 0) {
                currentLessonTitle = questions[i].lessonTitle;
            }
            currentPage.push(questions[i]);
        }
        if (currentPage.length > 0) {
            pages.push({ title: currentLessonTitle, questions: currentPage });
        }

        // Build the HTML
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mastery Pack: ${wb.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-dark: #121212;
            --brand-red: #d32f2f;
            --brand-grey: #f5f5f5;
        }
        @page {
            size: A4;
            margin: 20mm;
        }
        @media print {
            .page-break { page-break-after: always; }
            body { font-size: 11pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .vault-bg { background-color: #fffbc8 !important; } /* Pastel yellow for vault */
        }
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.15;
            color: #2c3e50;
            background: #fff;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 10mm auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            position: relative;
            box-sizing: border-box;
        }
        @media print {
            .page {
                margin: 0;
                box-shadow: none;
                width: 100%;
                min-height: 100%;
                padding: 0;
            }
        }
        
        /* Cover Page Styling */
        .cover {
            background-color: var(--brand-dark);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
        }
        .cover::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(211, 47, 47, 0.2) 0%, rgba(0,0,0,0.8) 100%);
            z-index: 1;
        }
        .cover-content {
            z-index: 2;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }
        .cover h1 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
            font-size: 4rem;
            color: var(--brand-red);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        .cover h2 {
            font-family: 'Outfit', sans-serif;
            font-weight: 300;
            font-size: 1.5rem;
            color: #ddd;
            margin-top: 0;
            margin-bottom: 60px;
        }
        .cover-bottom {
            margin-top: auto;
            text-align: left;
            border-top: 2px solid var(--brand-red);
            padding-top: 20px;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }
        .cover-bottom p {
            font-family: 'Outfit', sans-serif;
            font-size: 1.2rem;
            margin: 5px 0;
        }

        /* Strategy Page */
        .strategy h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 2.5rem;
            color: var(--brand-dark);
            border-bottom: 4px solid var(--brand-red);
            padding-bottom: 10px;
        }
        .strategy h2 {
            font-family: 'Outfit', sans-serif;
            color: var(--brand-red);
            margin-top: 30px;
        }
        .strategy p, .strategy li {
            font-size: 1.1rem;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        .rag-box {
            display: inline-block;
            width: 15px; height: 15px;
            border: 1px solid #000;
            margin-right: 5px;
            vertical-align: middle;
        }

        /* Grids */
        .grid-page h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.4rem;
            color: var(--brand-dark);
            border-bottom: 2px solid var(--brand-dark);
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 8px 10px;
            text-align: left;
            vertical-align: top;
            font-size: 0.95rem;
        }
        th {
            background-color: var(--brand-dark);
            color: white;
            font-family: 'Outfit', sans-serif;
        }
        tr:nth-child(even) {
            background-color: var(--brand-grey);
        }
        .col-qnum { width: 5%; text-align: center; font-weight: bold; }
        .col-question { width: 45%; }
        .col-rag { width: 4%; text-align: center; }
        .col-notes { width: 38%; }
        
        .rag-checkbox {
            width: 12px; height: 12px;
            border: 1px solid #888;
            margin: 0 auto;
            background: white;
        }

        /* Footer Debrief */
        .debrief {
            margin-top: auto;
            border: 2px dashed var(--brand-red);
            padding: 15px;
            background: #fff;
            margin-top: 20px;
        }
        .debrief h3 {
            margin: 0 0 10px 0;
            font-family: 'Montserrat', sans-serif;
            color: var(--brand-red);
        }
        .debrief p {
            margin: 5px 0;
            font-weight: 600;
        }

        /* The Vault (Answers) */
        .vault-page {
            background-color: #fffbc8; /* Pastel yellow */
            position: relative;
        }
        .vault-watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 15rem;
            color: rgba(0,0,0,0.03);
            z-index: 0;
            pointer-events: none;
        }
        .vault-content {
            position: relative;
            z-index: 1;
        }
        .vault-page h1 {
            font-family: 'Montserrat', sans-serif;
            text-align: center;
            font-size: 2.5rem;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }
        .answer-list {
            margin-bottom: 30px;
        }
        .answer-list h3 {
            font-family: 'Outfit', sans-serif;
            border-bottom: 1px solid #999;
            padding-bottom: 5px;
        }
        .answer-item {
            margin-bottom: 8px;
            font-size: 0.95rem;
            display: flex;
        }
        .answer-num {
            font-weight: bold;
            width: 30px;
            flex-shrink: 0;
        }
        .answer-text {
            font-weight: 600;
        }

        /* Tracker Page */
        .tracker-page h1 {
            font-family: 'Montserrat', sans-serif;
            text-align: center;
        }
        .tracker-table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
        }
        .tracker-table th, .tracker-table td {
            padding: 15px;
            font-size: 1.1rem;
            border: 1px solid #ccc;
            text-align: center;
        }
        .tracker-table th {
            background-color: var(--brand-dark);
            color: white;
            font-family: 'Outfit', sans-serif;
        }
        .col-attempt { width: 10%; }
        .col-date { width: 15%; }
        .col-score { width: 15%; }
        .col-sig { width: 30%; }
        .col-target { width: 30%; }
        .reflection-box {
            border: 2px solid var(--brand-dark);
            padding: 20px;
            margin-top: 30px;
            min-height: 150px;
        }
    </style>
</head>
<body>

    <!-- Cover Page -->
    <div class="page cover page-break">
        <div class="cover-content">
            <h1 style="font-size: 3rem; line-height: 1.2;">THE ${unit.title.toUpperCase()} DOSSIER:<br>${wb.title.toUpperCase()}</h1>
            <h2>${questions.length} Crucial Questions. Complete Knowledge Mastery.</h2>
            
            <div class="cover-bottom">
                <p><strong>Operative / Student Name:</strong> ___________________________</p>
                <p><strong>Target:</strong> Total Recall</p>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #bbb;">RESTRICTED ACCESS - MASTER YOUR MEMORY</p>
            </div>
        </div>
    </div>

    <!-- Strategy Page -->
    <div class="page strategy page-break">
        <h1>How to Hack Your Memory<br><span style="font-size: 1.2rem; color: #555;">(Rules of Engagement)</span></h1>
        
        <h2>1. Never Just Read</h2>
        <p>Reading the answers feels like learning, but it’s an illusion. You must force your brain to struggle to find the answer. The struggle is what builds memory pathways.</p>

        <h2>2. Cover, Recall, Check</h2>
        <p>Cover the answer sheet. Write your answer down in the notes section (or say it out loud). Only then are you allowed to check 'The Vault'.</p>

        <h2>3. Track Your Threat Level</h2>
        <p>Use the R-A-G (Red, Amber, Green) checkboxes next to every question after you attempt it.</p>
        <ul>
            <li><span class="rag-box" style="background: #4ade80;"></span> <strong>Green:</strong> I nailed it instantly.</li>
            <li><span class="rag-box" style="background: #fbbf24;"></span> <strong>Amber:</strong> I got it, but I had to think hard.</li>
            <li><span class="rag-box" style="background: #f87171;"></span> <strong>Red:</strong> My mind went blank. (Revisit these tomorrow).</li>
        </ul>

        <h2>4. The Interrogation (Homework Protocol)</h2>
        <p>True mastery requires testing under pressure. Hand 'The Vault' (answers) to your parent or guardian. They will test you on 20 random questions. They hold the score; they hold the signature.</p>
    </div>

    <!-- Question Grids -->
    `;

        let globalQNum = 1;
        pages.forEach((pageObj, pageIndex) => {
            html += `
    <div class="page grid-page page-break" style="display: flex; flex-direction: column;">
        <h2>${pageObj.title}</h2>
        <table>
            <thead>
                <tr>
                    <th class="col-qnum">Q#</th>
                    <th class="col-question">The Target Question</th>
                    <th class="col-rag">R</th>
                    <th class="col-rag">A</th>
                    <th class="col-rag">G</th>
                    <th class="col-notes">Notes / My Answer</th>
                </tr>
            </thead>
            <tbody>
            `;
            pageObj.questions.forEach(q => {
                html += `
                <tr>
                    <td class="col-qnum">${globalQNum}</td>
                    <td class="col-question">${q.q}</td>
                    <td class="col-rag"><div class="rag-checkbox"></div></td>
                    <td class="col-rag"><div class="rag-checkbox"></div></td>
                    <td class="col-rag"><div class="rag-checkbox"></div></td>
                    <td class="col-notes"></td>
                </tr>
                `;
                globalQNum++;
            });
            html += `
            </tbody>
        </table>
        
        <div class="debrief">
            <h3>MISSION DEBRIEF</h3>
            <p>Score: _______ / 20</p>
            <p>Parent/Guardian Authentication (Signature): ___________________________</p>
            <p>Date: _______</p>
        </div>
    </div>
            `;
        });

        // The Vault (Answers)
        html += `
    <!-- The Vault -->
    <div class="page vault-page page-break vault-bg">
        <div class="vault-watermark">🔒</div>
        <div class="vault-content">
            <h1>THE VAULT</h1>
            <p style="text-align: center; font-style: italic; margin-bottom: 30px;">Restricted Access: Answer Keys</p>
        `;

        globalQNum = 1;
        // Group answers by page/lesson for The Vault
        // 40 answers per page fits nicely
        let vaultPages = [];
        let currentVaultPage = [];
        pages.forEach(p => {
            p.questions.forEach(q => {
                if (currentVaultPage.length === 40) {
                    vaultPages.push(currentVaultPage);
                    currentVaultPage = [];
                }
                currentVaultPage.push({num: globalQNum++, a: q.a, title: p.title});
            });
        });
        if (currentVaultPage.length > 0) vaultPages.push(currentVaultPage);

        vaultPages.forEach((vp, vIndex) => {
            if (vIndex > 0) {
                html += `
        </div>
    </div>
    <div class="page vault-page page-break vault-bg">
        <div class="vault-watermark">🔒</div>
        <div class="vault-content">
                `;
            }
            let currentTitle = "";
            vp.forEach(ans => {
                if (ans.title !== currentTitle) {
                    if (currentTitle !== "") html += `</div>`;
                    currentTitle = ans.title;
                    html += `<div class="answer-list"><h3>${currentTitle}</h3>`;
                }
                html += `
                <div class="answer-item">
                    <div class="answer-num">${ans.num}.</div>
                    <div class="answer-text">${ans.a}</div>
                </div>
                `;
            });
            if (currentTitle !== "") html += `</div>`;
        });

        html += `
        </div>
    </div>
    `;

        // Tracker Page
        html += `
    <!-- Tracker Page -->
    <div class="page tracker-page">
        <h1>Mastery Tracker</h1>
        <p style="text-align: center; margin-bottom: 30px;">Track your total recall score across all ${questions.length} questions.</p>
        
        <table class="tracker-table">
            <thead>
                <tr>
                    <th class="col-attempt">Attempt</th>
                    <th class="col-date">Date</th>
                    <th class="col-score">Score (/${questions.length})</th>
                    <th class="col-sig">Parent/Guardian Signature</th>
                    <th class="col-target">Target for Next Time</th>
                </tr>
            </thead>
            <tbody>
                <tr><td><strong>1</strong></td><td></td><td></td><td></td><td></td></tr>
                <tr><td><strong>2</strong></td><td></td><td></td><td></td><td></td></tr>
                <tr><td><strong>3</strong></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
        </table>

        <div class="reflection-box">
            <h3 style="margin-top: 0;">Operative Reflection</h3>
            <p><strong>My ultimate strength in this unit is...</strong><br><br><br></p>
            <p><strong>The three specific facts I need to hunt down and memorize tonight are...</strong><br><br><br></p>
        </div>
    </div>

</body>
</html>
        `;

        const outPath = path.join(unitDir, `mastery_pack_${wb.id}.html`);
        fs.writeFileSync(outPath, html);
        console.log(`Successfully generated Mastery Pack for ${unitId}: ${wb.id}`);
    }
  } catch (err) {
    console.error(`Error processing unit ${unitId}:`, err);
  }
}
