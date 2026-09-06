const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const rootDir = path.join(__dirname, '..');
const publicUnitsDir = path.join(rootDir, 'public', 'units');

if (!fs.existsSync(publicUnitsDir)) {
  console.log("No public/units directory found. Please run 'npm run sync' first.");
  process.exit(0);
}

const units = fs
  .readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
  .map((d) => d.name);

(async () => {
  for (const unitId of units) {
    if (unitId === 'trip_ypres') continue;
    const unitDir = path.join(publicUnitsDir, unitId);
    let dataJsPath = path.join(unitDir, 'data.js');
    if (!fs.existsSync(dataJsPath)) {
      dataJsPath = path.join(rootDir, 'units', unitId, 'data.js');
    }

    if (!fs.existsSync(dataJsPath)) continue;

    try {
      let unit;
      try {
        const dataModule = await import(require('url').pathToFileURL(dataJsPath).href);
        unit = dataModule.unitData || dataModule.default || dataModule[unitId];
      } catch (e) {
        console.warn(
          `Could not load data for unit ${unitId}: ${e.message}. Skipping mastery pack generation.`,
        );
        continue;
      }

      // Only process units that have lessons
      if (!unit.lessons) continue;

      // If unit has no workbooks (KS3), create a default one
      if (!unit.workbooks) {
        unit.workbooks = [{ id: 'full', title: 'Complete Unit Mastery', prefix: 'lesson' }];
      }

      for (const wb of unit.workbooks) {
        // Collect 80 questions (or as many as available) from the lessons for this Key Topic
        let questions = [];
        let prefix = wb.prefix || wb.id;
        let matchingLessons;
        if (unitId === 'medieval_england' || unitId === 'australia' || wb.id === 'full') {
          matchingLessons = unit.lessons;
        } else {
          matchingLessons = unit.lessons.filter(
            (l) => (l.id && l.id.startsWith(prefix)) || (l.title && l.title.startsWith(prefix)),
          );
        }

        function resolveAns(q) {
          if (typeof q.a === 'string' && q.a.trim()) return q.a.trim();
          if (
            typeof q.answer === 'number' &&
            q.options &&
            q.options[q.answer] &&
            q.options[q.answer].trim()
          )
            return q.options[q.answer].trim();
          if (typeof q.answer === 'string') {
            const num = parseInt(q.answer, 10);
            if (
              !isNaN(num) &&
              String(num) === q.answer.trim() &&
              q.options &&
              q.options[num] &&
              q.options[num].trim()
            ) {
              return q.options[num].trim();
            }
            if (q.answer.trim()) return q.answer.trim();
          }
          if (
            q.options &&
            typeof q.answer !== 'undefined' &&
            q.options[q.answer] &&
            q.options[q.answer].trim()
          )
            return q.options[q.answer].trim();
          if (
            q.explanation &&
            typeof q.explanation === 'string' &&
            q.explanation.trim() &&
            !q.explanation.includes(' ')
          ) {
            return q.explanation.trim();
          }
          return (q.answer || q.a || '').toString().trim();
        }

        for (const lesson of matchingLessons) {
          if (unitId === 'medieval_england') {
            // In medieval_england, every lesson has exactly 20 comprehensive quiz questions (10 spaced retrieval + 10 current content).
            // Only quiz questions are used so that each 20-question mastery page perfectly maps 1-to-1 with its lesson.
            if (lesson.quiz && Array.isArray(lesson.quiz)) {
              lesson.quiz.forEach((q) => {
                questions.push({
                  lessonTitle: lesson.title,
                  q: q.question || q.q,
                  a: resolveAns(q),
                });
              });
            }
          } else {
            if (lesson.quiz && Array.isArray(lesson.quiz)) {
              lesson.quiz.forEach((q) => {
                questions.push({
                  lessonTitle: lesson.title,
                  q: q.question || q.q,
                  a: resolveAns(q),
                });
              });
            }
            if (lesson.do_now && Array.isArray(lesson.do_now.items)) {
              lesson.do_now.items.forEach((q) => {
                questions.push({
                  lessonTitle: lesson.title,
                  q: q.question || q.q,
                  a: resolveAns(q),
                });
              });
            }
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
          } else if (
            questions[i].lessonTitle !== currentLessonTitle &&
            currentPage.length > 0 &&
            false
          ) {
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

        // Handle background image for cover
        let bgImage = '';
        if (wb.image) {
          bgImage = wb.image;
        } else if (unit.homepage_background) {
          bgImage = unit.homepage_background;
        } else if (unit.cover_image) {
          bgImage = unit.cover_image;
        }

        // Convert absolute web paths to relative paths for Puppeteer local file loading
        if (bgImage && bgImage.startsWith('/units/')) {
          const parts = bgImage.split('/');
          // /units/water_and_sanitation/assets/foo.png -> ./assets/foo.png
          bgImage = './' + parts.slice(3).join('/');
        } else if (bgImage && bgImage.startsWith('/data/')) {
          bgImage = '../..' + bgImage;
        } else if (bgImage && bgImage.startsWith('images/')) {
          bgImage = '../../' + bgImage;
        } else if (bgImage && bgImage.startsWith('assets/')) {
          bgImage = '../../' + bgImage;
        }

        let enquiryText = '';
        if (wb.enquiry) {
          enquiryText = wb.enquiry;
        } else if (unit.enquiry) {
          enquiryText = unit.enquiry;
        }

        const vaultUrl = `https://meoncross-history.netlify.app/units/${unitId}/mastery_pack_${wb.id}.html`;
        const qrDataUrl = await QRCode.toDataURL(vaultUrl, {
          margin: 1,
          width: 280,
          color: {
            dark: '#1e3a8a',
            light: '#ffffff',
          },
        });

        // Build the HTML
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mastery Pack: ${wb.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
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
            ${bgImage ? `background-image: url('${bgImage}'); background-size: cover; background-position: center;` : ''}
        }
        .cover::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: ${bgImage ? 'rgba(0,0,0,0.65)' : 'linear-gradient(135deg, rgba(211, 47, 47, 0.2) 0%, rgba(0,0,0,0.8) 100%)'};
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
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: 4rem;
            color: #ffffff;
            letter-spacing: -0.5px;
            margin-bottom: 10px;
            text-shadow: 0px 4px 12px rgba(0,0,0,0.8);
        }
        .cover h2 {
            font-family: 'Outfit', sans-serif;
            font-weight: 300;
            font-size: 1.5rem;
            color: #f8fafc;
            margin-top: 10px;
            margin-bottom: 15px;
            font-style: italic;
            text-shadow: 0px 2px 8px rgba(0,0,0,0.8);
        }
        .cover h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.2rem;
            color: #ef4444; /* bright red */
            margin-top: 0;
            margin-bottom: 60px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .cover-bottom {
            margin-top: auto;
            text-align: left;
            background: rgba(255, 255, 255, 0.95);
            color: #121212;
            border-radius: 8px;
            padding: 20px 25px;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            border-left: 5px solid var(--brand-red);
        }
        .cover-bottom p {
            font-family: 'Outfit', sans-serif;
            font-size: 1.2rem;
            margin: 5px 0;
        }

        /* Cover QR Card */
        .cover-qr-card {
            margin-top: 14px;
            display: flex;
            align-items: center;
            gap: 14px;
            background: #f8fafc;
            border: 2px dashed #1e3a8a;
            border-radius: 8px;
            padding: 10px 14px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .cover-qr-img {
            width: 78px;
            height: 78px;
            border-radius: 4px;
            flex-shrink: 0;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 2px;
            display: block;
        }
        .cover-qr-info {
            flex: 1;
            text-align: left;
        }
        .cover-qr-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.95rem;
            font-weight: 800;
            color: #1e3a8a;
            margin-bottom: 2px;
        }
        .cover-qr-desc {
            font-size: 0.8rem;
            color: #334155;
            line-height: 1.3;
            margin-bottom: 3px;
        }
        .cover-qr-url {
            font-size: 0.72rem;
            font-weight: 700;
            color: #2563eb;
            word-break: break-all;
        }

        /* Screen-Only Mobile Toolbar */
        .screen-vault-toolbar {
            position: sticky;
            top: 0;
            background: #1e3a8a;
            color: #ffffff;
            padding: 10px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            font-family: 'Outfit', sans-serif;
        }
        .screen-vault-toolbar a {
            background: #fbbf24;
            color: #0f172a;
            padding: 6px 14px;
            border-radius: 6px;
            font-weight: 700;
            text-decoration: none;
            font-size: 0.85rem;
            display: inline-block;
        }
        @media print {
            .screen-vault-toolbar {
                display: none !important;
            }
        }

        /* Strategy Page */
        .strategy h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 2.1rem;
            color: var(--brand-dark);
            border-bottom: 3px solid var(--brand-red);
            padding-bottom: 6px;
            margin-bottom: 12px;
        }
        .strategy h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.15rem;
            color: var(--brand-red);
            margin-top: 14px;
            margin-bottom: 4px;
        }
        .strategy p, .strategy li {
            font-size: 0.95rem;
            line-height: 1.4;
            margin-bottom: 6px;
        }
        .strategy ul {
            margin-top: 4px;
            margin-bottom: 8px;
            padding-left: 20px;
        }
        .rag-box {
            display: inline-block;
            width: 14px; height: 14px;
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
        .col-attempt { width: 8%; }
        .col-date { width: 13%; }
        .col-score { width: 14%; }
        .col-sig { width: 37%; }
        .col-target { width: 28%; }
        .tracker-table td {
            vertical-align: middle;
        }
        .col-sig-cell {
            padding: 8px 10px !important;
        }
        .parent-stamp-box {
            border: 2px dashed #1e3a8a;
            border-radius: 6px;
            background: #f8fafc;
            padding: 8px 10px;
            text-align: left;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .stamp-badge {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.8px;
            color: #1e3a8a;
            text-transform: uppercase;
            border-bottom: 1px dashed #cbd5e1;
            padding-bottom: 3px;
            margin-bottom: 6px;
            text-align: center;
        }
        .stamp-effort {
            font-size: 0.84rem;
            font-weight: 700;
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
        }
        .stamp-stars {
            font-size: 1rem;
            letter-spacing: 2px;
            white-space: nowrap;
        }
        .stamp-hint {
            font-size: 0.7rem;
            font-weight: normal;
            color: #64748b;
        }
        .stamp-field {
            display: flex;
            align-items: flex-end;
            margin-top: 4px;
            font-size: 0.8rem;
            color: #334155;
            font-weight: 600;
        }
        .stamp-label {
            white-space: nowrap;
        }
        .stamp-line {
            flex-grow: 1;
            border-bottom: 1px solid #94a3b8;
            margin-left: 6px;
            height: 12px;
        }
        .reflection-box {
            border: 2px solid var(--brand-dark);
            padding: 20px;
            margin-top: 30px;
            min-height: 150px;
        }
    </style>
</head>
<body>

    <!-- Mobile Screen-Only Toolbar -->
    <div class="screen-vault-toolbar">
        <span>📱 Mobile Revision Mode · Interactive Digital Vault</span>
        <div>
            <a href="#the-vault">⚡ Jump to The Vault Solutions</a>
        </div>
    </div>

    <!-- Cover Page -->
    <div class="page cover page-break">
        <div class="cover-content">
            <h1>${unit.title}</h1>
            ${enquiryText ? `<h2>"${enquiryText}"</h2>` : ''}
            <h3>Mastery Pack: ${wb.title.toUpperCase()}</h3>
            
            <div class="cover-bottom">
                <p><strong>Operative / Student Name:</strong> ___________________________</p>
                <p><strong>Target:</strong> Total Recall of ${questions.length} Crucial Questions</p>
                <div class="cover-qr-card">
                    <img src="${qrDataUrl}" alt="Digital Vault QR Code" class="cover-qr-img">
                    <div class="cover-qr-info">
                        <div class="cover-qr-title">📱 Interactive Digital Vault</div>
                        <div class="cover-qr-desc">Scan with your phone to launch mobile self-marking mode &amp; solutions at home without flipping pages.</div>
                        <div class="cover-qr-url">${vaultUrl.replace('https://', '')}</div>
                    </div>
                </div>
                <p style="margin-top: 12px; font-size: 0.85rem; color: #777;">RESTRICTED ACCESS - MASTER YOUR MEMORY</p>
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

        <h2>5. The 3-Star Parent Effort Rubric</h2>
        <p>When authenticating your spaced retrieval practice on the final Mastery Tracker, your parent or guardian will evaluate your effort using the following criteria:</p>
        <ul>
            <li><strong>⭐⭐⭐ 3 Stars (Full Mastery):</strong> Completed under strict exam conditions without glancing at notes or the Knowledge Vault. Total independent recall.</li>
            <li><strong>⭐⭐ 2 Stars (Consolidating):</strong> Required 1–2 hints from the Knowledge Vault, but demonstrated sound foundational understanding.</li>
            <li><strong>⭐ 1 Star (Needs Intervention):</strong> Rushed, mind went blank, or completed with notes open. Target facts must be hunted down and re-tested tomorrow.</li>
        </ul>
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
          pageObj.questions.forEach((q) => {
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
    <div class="page vault-page page-break vault-bg" id="the-vault">
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
        pages.forEach((p) => {
          p.questions.forEach((q) => {
            if (currentVaultPage.length === 40) {
              vaultPages.push(currentVaultPage);
              currentVaultPage = [];
            }
            currentVaultPage.push({ num: globalQNum++, a: q.a, title: p.title });
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
          let currentTitle = '';
          vp.forEach((ans) => {
            if (ans.title !== currentTitle) {
              if (currentTitle !== '') html += `</div>`;
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
          if (currentTitle !== '') html += `</div>`;
        });

        html += `
        </div>
    </div>
    `;

        const stampBoxHtml = `
                        <div class="parent-stamp-box">
                            <div class="stamp-badge">PARENT VALIDATION STAMP</div>
                            <div class="stamp-effort">
                                <span>Effort: ⭐ ⭐ ⭐</span>
                                <span class="stamp-hint">(Circle 1–3)</span>
                            </div>
                            <div class="stamp-field"><span class="stamp-label">Date:</span><span class="stamp-line"></span></div>
                            <div class="stamp-field"><span class="stamp-label">Signature:</span><span class="stamp-line"></span></div>
                        </div>`;

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
                    <th class="col-sig">Parent Validation Stamp</th>
                    <th class="col-target">Target for Next Time</th>
                </tr>
            </thead>
            <tbody>
                <tr><td><strong>1</strong></td><td></td><td></td><td class="col-sig-cell">${stampBoxHtml}</td><td></td></tr>
                <tr><td><strong>2</strong></td><td></td><td></td><td class="col-sig-cell">${stampBoxHtml}</td><td></td></tr>
                <tr><td><strong>3</strong></td><td></td><td></td><td class="col-sig-cell">${stampBoxHtml}</td><td></td></tr>
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
${`
<script>
  document.addEventListener("DOMContentLoaded", function() {
    if (navigator.userAgent.includes("HeadlessChrome") || navigator.userAgent.includes("Puppeteer")) return;
    function replaceLines(className) {
      const lines = document.querySelectorAll('.' + className);
      if (lines.length === 0) return;
      let group = [];
      lines.forEach((line, i) => {
        group.push(line);
        const next = lines[i + 1];
        if (!next || line.nextElementSibling !== next) {
          const wrapper = document.createElement('textarea');
          wrapper.className = 'interactive-textarea';
          wrapper.style.width = '100%';
          wrapper.style.height = (group.length * line.offsetHeight) + 'px';
          wrapper.style.border = '2px dashed #94a3b8';
          wrapper.style.borderRadius = '6px';
          wrapper.style.padding = '12px';
          wrapper.style.boxSizing = 'border-box';
          wrapper.style.fontFamily = 'Outfit, sans-serif';
          wrapper.style.fontSize = '1.1rem';
          wrapper.style.resize = 'vertical';
          wrapper.style.marginTop = group[0].style.marginTop || '10px';
          wrapper.style.marginBottom = '10px';
          wrapper.style.background = '#f8fafc';
          wrapper.placeholder = 'Type your answer here...';
          group[0].parentNode.insertBefore(wrapper, group[0]);
          group.forEach(l => l.remove());
          group = [];
        }
      });
    }
    replaceLines('task-lines');
    replaceLines('task-lines-large');
    document.querySelectorAll('.dirt-box, .hint-box').forEach(b => b.contentEditable = true);
  });
</script>
`}
        `;

        const outPath = path.join(unitDir, `mastery_pack_${wb.id}.html`);
        fs.writeFileSync(outPath, html);
        console.log(`Successfully generated Mastery Pack for ${unitId}: ${wb.id}`);
      }
    } catch (err) {
      console.error(`Error processing unit ${unitId}:`, err);
    }
  }
})();
