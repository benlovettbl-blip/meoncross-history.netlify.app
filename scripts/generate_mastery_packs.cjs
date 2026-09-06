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

        const vaultUrl = `https://meoncross-history.netlify.app/units/${unitId}/mastery_pack_${wb.id}.html#practice-mode`;
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
            .screen-vault-toolbar,
            .vault-screen-controls,
            .leitner-modal-overlay {
                display: none !important;
            }
            .answer-text {
                background: transparent !important;
                color: #000000 !important;
                border: none !important;
                padding: 0 !important;
                min-width: 0 !important;
                min-height: 0 !important;
                box-shadow: none !important;
                cursor: default !important;
            }
            .answer-text::after {
                display: none !important;
            }
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
            background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
            color: #ffffff;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.18);
            font-family: 'Outfit', sans-serif;
        }
        .toolbar-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.92rem;
            font-weight: 600;
            letter-spacing: 0.3px;
        }
        .toolbar-badge {
            background: #ef4444;
            color: white;
            font-size: 0.68rem;
            padding: 2px 7px;
            border-radius: 9999px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .toolbar-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .toolbar-btn {
            background: #f1f5f9;
            color: #0f172a;
            padding: 6px 13px;
            border-radius: 6px;
            font-weight: 700;
            text-decoration: none;
            font-size: 0.82rem;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s ease;
        }
        .toolbar-btn:hover {
            transform: translateY(-1px);
            filter: brightness(0.95);
        }
        .toolbar-btn.primary {
            background: #fbbf24;
            color: #0f172a;
            box-shadow: 0 2px 6px rgba(251, 191, 36, 0.4);
        }
        .toolbar-btn.secondary {
            background: rgba(255, 255, 255, 0.15);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .toolbar-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.25);
        }

        /* Leitner 3-Box Practice Modal Styles */
        .leitner-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(6px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            box-sizing: border-box;
            font-family: 'Outfit', sans-serif;
            animation: leitnerFadeIn 0.2s ease-out;
        }
        @keyframes leitnerFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .leitner-modal-card {
            background: #ffffff;
            width: 100%;
            max-width: 680px;
            max-height: 92vh;
            border-radius: 14px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: leitnerSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes leitnerSlideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .leitner-modal-header {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%);
            color: #ffffff;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .leitner-header-title h3 {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.25rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .leitner-unit-subtitle {
            margin: 3px 0 0 0;
            font-size: 0.82rem;
            color: #93c5fd;
        }
        .leitner-close-btn {
            background: rgba(255,255,255,0.15);
            border: none;
            color: #ffffff;
            font-size: 1.6rem;
            line-height: 1;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
        }
        .leitner-close-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.05);
        }
        /* Leitner Spaced Streak & 7-Day Heatmap */
        .leitner-streak-bar {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid #334155;
        }
        .streak-badge-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .streak-fire-icon {
            font-size: 1.8rem;
            line-height: 1;
            filter: drop-shadow(0 2px 8px rgba(239, 68, 68, 0.5));
            animation: pulseGlow 2s infinite ease-in-out;
        }
        @keyframes pulseGlow {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 2px 6px rgba(245, 158, 11, 0.4)); }
            50% { transform: scale(1.12); filter: drop-shadow(0 2px 12px rgba(239, 68, 68, 0.8)); }
        }
        .streak-text-group {
            display: flex;
            flex-direction: column;
        }
        .streak-count-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.95rem;
            font-weight: 800;
            letter-spacing: 0.4px;
            color: #fef08a;
        }
        .streak-subtitle {
            font-size: 0.72rem;
            color: #94a3b8;
        }
        .streak-heatmap-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
        }
        .streak-heatmap-title {
            font-size: 0.68rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #94a3b8;
        }
        .streak-heatmap-days {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .heatmap-day {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
        }
        .heatmap-label {
            font-size: 0.62rem;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
        }
        .heatmap-cell {
            width: 18px;
            height: 18px;
            border-radius: 4px;
            background: #334155;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.65rem;
            font-weight: bold;
            color: transparent;
            transition: all 0.2s ease;
            box-sizing: border-box;
        }
        .heatmap-cell.active {
            background: #10b981;
            color: #ffffff;
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
        .heatmap-cell.today {
            border: 2px solid #fbbf24;
        }
        @media (max-width: 600px) {
            .leitner-streak-bar {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px 14px;
                gap: 8px;
            }
            .streak-heatmap-container {
                align-items: flex-start;
                width: 100%;
            }
            .streak-heatmap-days {
                justify-content: space-between;
                width: 100%;
            }
        }
        .leitner-box-stats {
            background: #f8fafc;
            padding: 10px 16px;
            display: flex;
            gap: 10px;
            border-bottom: 1px solid #e2e8f0;
        }
        .leitner-stat-pill {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 8px 10px;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 600;
            border: 1px solid transparent;
            cursor: default;
        }
        .leitner-stat-pill.box-1 {
            background: #fef2f2;
            color: #991b1b;
            border-color: #fecaca;
        }
        .leitner-stat-pill.box-2 {
            background: #fffbeb;
            color: #92400e;
            border-color: #fde68a;
        }
        .leitner-stat-pill.box-3 {
            background: #ecfdf5;
            color: #065f46;
            border-color: #a7f3d0;
        }
        .leitner-stat-pill strong {
            font-size: 1rem;
        }
        .leitner-filter-row {
            padding: 10px 20px 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
        .leitner-filter-row label {
            font-size: 0.85rem;
            font-weight: 700;
            color: #334155;
            white-space: nowrap;
        }
        .leitner-topic-select {
            flex: 1;
            padding: 6px 10px;
            border-radius: 6px;
            border: 1px solid #cbd5e1;
            font-family: 'Outfit', sans-serif;
            font-size: 0.85rem;
            background: #ffffff;
            color: #0f172a;
        }
        .leitner-card-container {
            padding: 16px 20px;
            perspective: 1000px;
        }
        .leitner-card {
            width: 100%;
            min-height: 220px;
            cursor: pointer;
            position: relative;
        }
        .leitner-card-inner {
            position: relative;
            width: 100%;
            min-height: 220px;
            text-align: center;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
        }
        .leitner-card.flipped .leitner-card-inner {
            transform: rotateY(180deg);
        }
        .leitner-card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            min-height: 220px;
            backface-visibility: hidden;
            border-radius: 12px;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            border: 2px solid #e2e8f0;
        }
        .leitner-card-front {
            background: #ffffff;
            color: #0f172a;
        }
        .leitner-card-back {
            background: #fffbc8;
            color: #0f172a;
            transform: rotateY(180deg);
            border-color: #fde047;
        }
        .card-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            font-size: 0.8rem;
            font-weight: 700;
        }
        .qnum-badge {
            background: #1e3a8a;
            color: #ffffff;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 800;
        }
        .qnum-badge.ans {
            background: #b45309;
        }
        .box-badge {
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .box-badge.b1 { background: #fee2e2; color: #b91c1c; }
        .box-badge.b2 { background: #fef3c7; color: #b45309; }
        .box-badge.b3 { background: #d1fae5; color: #047857; }
        .card-question-text {
            font-family: 'Inter', sans-serif;
            font-size: 1.15rem;
            line-height: 1.4;
            font-weight: 600;
            color: #1e293b;
            margin: 15px 0;
            text-align: center;
        }
        .card-answer-text {
            font-family: 'Outfit', sans-serif;
            font-size: 1.25rem;
            line-height: 1.35;
            font-weight: 800;
            color: #0f172a;
            margin: 15px 0;
            text-align: center;
        }
        .card-prompt-hint {
            font-size: 0.78rem;
            color: #64748b;
            font-style: italic;
        }
        .leitner-action-bar {
            padding: 0 20px 14px 20px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
        }
        .leitner-rate-btn {
            border: 2px solid transparent;
            border-radius: 10px;
            padding: 10px 8px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            transition: all 0.15s ease;
        }
        .leitner-rate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .btn-box-1 {
            background: #fef2f2;
            border-color: #fca5a5;
            color: #991b1b;
        }
        .btn-box-2 {
            background: #fffbeb;
            border-color: #fcd34d;
            color: #92400e;
        }
        .btn-box-3 {
            background: #ecfdf5;
            border-color: #6ee7b7;
            color: #065f46;
        }
        .btn-title {
            font-size: 0.85rem;
            font-weight: 800;
        }
        .btn-sub {
            font-size: 0.7rem;
            opacity: 0.85;
        }
        .leitner-modal-footer {
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .leitner-nav-btn {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            color: #334155;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .leitner-nav-btn:hover {
            background: #e2e8f0;
        }
        .leitner-header-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .leitner-teacher-btn {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            padding: 6px 14px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.3px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
            transition: all 0.15s ease;
        }
        .leitner-teacher-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.45);
        }
        /* Rapid-Fire Classroom Retrieval Timer Bar */
        .rapid-fire-timer-bar {
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            padding: 8px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            transition: all 0.3s ease;
        }
        .rapid-fire-timer-bar.timer-expired {
            background: #fee2e2;
            border-color: #f87171;
            animation: timerPulseRed 0.8s infinite alternate ease-in-out;
        }
        @keyframes timerPulseRed {
            from { box-shadow: inset 0 0 10px rgba(239, 68, 68, 0.3); }
            to { box-shadow: inset 0 0 20px rgba(239, 68, 68, 0.7); }
        }
        .timer-badge-group {
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
        }
        .timer-flame {
            font-size: 1.2rem;
            line-height: 1;
        }
        .timer-title {
            font-size: 0.82rem;
            font-weight: 700;
            color: #334155;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .timer-countdown {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.15rem;
            font-weight: 800;
            color: #0284c7;
            min-width: 44px;
            text-align: right;
            transition: color 0.2s ease;
        }
        .timer-countdown.warning {
            color: #d97706;
        }
        .timer-countdown.critical {
            color: #dc2626;
            animation: pulseCritical 0.4s infinite alternate;
        }
        @keyframes pulseCritical {
            from { transform: scale(1); }
            to { transform: scale(1.15); }
        }
        .timer-progress-track {
            flex: 1;
            height: 8px;
            background: #cbd5e1;
            border-radius: 999px;
            overflow: hidden;
            position: relative;
        }
        .timer-progress-fill {
            height: 100%;
            width: 100%;
            background: linear-gradient(90deg, #10b981 0%, #059669 100%);
            border-radius: 999px;
            transition: width 0.1s linear, background 0.3s ease;
        }
        .timer-btn-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .timer-ctrl-btn {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 4px 10px;
            border-radius: 5px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            color: #1e293b;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .timer-ctrl-btn:hover {
            background: #f8fafc;
            border-color: #94a3b8;
        }
        .timer-ctrl-btn.reset {
            color: #2563eb;
        }

        /* Full-Screen Teacher Presentation Mode (Projector / Smartboard) */
        .leitner-modal-overlay.teacher-mode {
            padding: 0;
            background: #020617;
            align-items: stretch;
            justify-content: stretch;
        }
        .leitner-modal-overlay.teacher-mode .leitner-modal-card {
            max-width: 100vw;
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            box-shadow: none;
            background: #090e1f;
            border: none;
            animation: none;
        }
        .leitner-modal-overlay.teacher-mode .leitner-modal-header {
            background: #020617;
            border-bottom: 2px solid #3b82f6;
            padding: 14px 32px;
        }
        .leitner-modal-overlay.teacher-mode .leitner-header-title h3 {
            font-size: 1.65rem;
            color: #60a5fa;
            letter-spacing: 0.8px;
        }
        .leitner-modal-overlay.teacher-mode .leitner-unit-subtitle {
            font-size: 0.95rem;
            color: #93c5fd;
        }
        .leitner-modal-overlay.teacher-mode .leitner-teacher-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
            font-size: 0.9rem;
            padding: 8px 16px;
        }
        .leitner-modal-overlay.teacher-mode .leitner-streak-bar,
        .leitner-modal-overlay.teacher-mode .leitner-box-stats {
            display: none;
        }
        .leitner-modal-overlay.teacher-mode .leitner-filter-row {
            padding: 12px 32px 6px 32px;
            background: #090e1f;
        }
        .leitner-modal-overlay.teacher-mode .leitner-filter-row label {
            color: #cbd5e1;
            font-size: 1rem;
        }
        .leitner-modal-overlay.teacher-mode .leitner-topic-select {
            background: #1e293b;
            color: #f8fafc;
            border: 1px solid #475569;
            font-size: 1rem;
            padding: 8px 14px;
        }
        .leitner-modal-overlay.teacher-mode .rapid-fire-timer-bar {
            background: #111827;
            border: 2px solid #3b82f6;
            margin: 10px 32px;
            padding: 12px 24px;
            border-radius: 12px;
        }
        .leitner-modal-overlay.teacher-mode .timer-title {
            color: #94a3b8;
            font-size: 1.1rem;
            font-weight: 800;
        }
        .leitner-modal-overlay.teacher-mode .timer-countdown {
            font-size: 2rem;
            color: #38bdf8;
            min-width: 65px;
        }
        .leitner-modal-overlay.teacher-mode .timer-progress-track {
            height: 12px;
            background: #1e293b;
        }
        .leitner-modal-overlay.teacher-mode .timer-ctrl-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
            font-weight: 800;
            background: #1e293b;
            color: #ffffff;
            border-color: #475569;
        }
        .leitner-modal-overlay.teacher-mode .timer-ctrl-btn:hover {
            background: #334155;
        }
        .leitner-modal-overlay.teacher-mode .leitner-card-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 14px 32px;
        }
        .leitner-modal-overlay.teacher-mode .leitner-card {
            min-height: 420px;
            max-height: 52vh;
            max-width: 1250px;
            margin: 0 auto;
            width: 100%;
        }
        .leitner-modal-overlay.teacher-mode .leitner-card-inner {
            min-height: 420px;
            height: 100%;
        }
        .leitner-modal-overlay.teacher-mode .leitner-card-face {
            min-height: 420px;
            border-radius: 18px;
            padding: 36px 50px;
            box-shadow: 0 16px 50px rgba(0,0,0,0.7);
        }
        .leitner-modal-overlay.teacher-mode .leitner-card-front {
            background: #0f172a;
            border: 4px solid #38bdf8;
            color: #f8fafc;
        }
        .leitner-modal-overlay.teacher-mode .leitner-card-back {
            background: #1e1b4b;
            border: 4px solid #facc15;
            color: #fef08a;
        }
        .leitner-modal-overlay.teacher-mode .card-meta {
            font-size: 1.1rem;
        }
        .leitner-modal-overlay.teacher-mode .qnum-badge {
            font-size: 1rem;
            padding: 5px 12px;
        }
        .leitner-modal-overlay.teacher-mode .box-badge {
            font-size: 1rem;
            padding: 5px 12px;
        }
        .leitner-modal-overlay.teacher-mode .card-question-text {
            font-size: 3rem !important; /* ~48pt typography */
            line-height: 1.25 !important;
            font-weight: 700;
            color: #ffffff;
            margin: auto 0;
            text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }
        .leitner-modal-overlay.teacher-mode .card-answer-text {
            font-size: 3.15rem !important; /* ~48pt+ typography */
            line-height: 1.25 !important;
            font-weight: 800;
            color: #fef08a;
            margin: auto 0;
            text-shadow: 0 2px 14px rgba(0,0,0,0.6);
        }
        .leitner-modal-overlay.teacher-mode .card-prompt-hint {
            font-size: 1.05rem;
            color: #94a3b8;
        }
        .leitner-modal-overlay.teacher-mode .leitner-action-bar {
            padding: 10px 32px 14px 32px;
            background: #090e1f;
        }
        .leitner-modal-overlay.teacher-mode .leitner-rate-btn {
            padding: 12px;
        }
        .leitner-modal-overlay.teacher-mode .leitner-rate-btn .btn-title {
            font-size: 1.1rem;
        }
        .leitner-modal-overlay.teacher-mode .leitner-modal-footer {
            background: #020617;
            border-top: 1px solid #1e293b;
            padding: 14px 32px;
        }
        .leitner-modal-overlay.teacher-mode .leitner-nav-btn {
            font-size: 1.05rem;
            padding: 10px 22px;
        }
        @media (max-width: 600px) {
            .leitner-modal-card {
                max-height: 96vh;
                border-radius: 10px;
            }
            .card-question-text {
                font-size: 1rem;
            }
            .card-answer-text {
                font-size: 1.1rem;
            }
            .btn-sub {
                display: none;
            }
            .leitner-stat-pill {
                padding: 6px 4px;
                font-size: 0.74rem;
            }
            .leitner-stat-pill strong {
                font-size: 0.88rem;
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
            margin-bottom: 6px;
        }
        .vault-subtitle {
            text-align: center;
            font-style: italic;
            margin-bottom: 16px;
            color: #475569;
            font-size: 1rem;
        }
        .vault-screen-controls {
            background: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(0,0,0,0.12);
            border-radius: 8px;
            padding: 10px 14px;
            margin-bottom: 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
        }
        .vault-mode-indicator {
            font-size: 0.85rem;
            font-weight: 700;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .vault-btn-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .vault-toggle-btn {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 5px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            color: #1e293b;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .vault-toggle-btn:hover {
            background: #f1f5f9;
            border-color: #94a3b8;
        }
        .vault-toggle-btn.leitner-shortcut {
            background: #fef3c7;
            border-color: #fcd34d;
            color: #92400e;
        }
        .vault-toggle-btn.leitner-shortcut:hover {
            background: #fde68a;
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
            align-items: center;
        }
        .answer-num {
            font-weight: bold;
            width: 32px;
            flex-shrink: 0;
            color: #1e3a8a;
        }
        .answer-text {
            font-weight: 600;
            display: inline-block;
            cursor: pointer;
            user-select: none;
            position: relative;
            background: #e2e8f0;
            color: transparent !important;
            border-radius: 6px;
            padding: 3px 12px;
            min-height: 24px;
            min-width: 140px;
            box-sizing: border-box;
            border: 1px dashed #94a3b8;
            transition: all 0.15s ease;
        }
        .answer-text::after {
            content: '🔒 Tap to Reveal';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.76rem;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.4px;
        }
        .answer-text:hover {
            background: #cbd5e1;
        }
        .answer-text.revealed {
            background: #ffffff;
            color: #0f172a !important;
            border: 1px solid #10b981;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .answer-text.revealed::after {
            display: none !important;
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
        <div class="toolbar-brand">
            <span>⚡</span>
            <span>Mastery Practice Mode</span>
            <span class="toolbar-badge">Mobile</span>
        </div>
        <div class="toolbar-actions">
            <button id="open-leitner-btn" class="toolbar-btn primary" onclick="openLeitnerModal()">🗂️ Leitner Flashcards</button>
            <a href="#the-vault" class="toolbar-btn secondary">🔓 The Vault</a>
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
                        <div class="cover-qr-title">⚡ Interactive Leitner &amp; Scratch-Off Vault</div>
                        <div class="cover-qr-desc">Scan with your phone to launch 3-Box Spaced Flashcards (#practice-mode) &amp; tap-to-reveal self-marking solutions.</div>
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
            <p class="vault-subtitle">Restricted Access: Answer Keys</p>
            <div class="vault-screen-controls">
                <span class="vault-mode-indicator">🔒 Tap each badge to scratch-off &amp; reveal</span>
                <div class="vault-btn-group">
                    <button class="vault-toggle-btn" onclick="toggleAllAnswers(true)">👁️ Reveal All</button>
                    <button class="vault-toggle-btn" onclick="toggleAllAnswers(false)">🔒 Shield All</button>
                    <button class="vault-toggle-btn leitner-shortcut" onclick="openLeitnerModal()">⚡ Leitner Deck</button>
                </div>
            </div>
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
                    <div class="answer-text" onclick="this.classList.toggle('revealed')">${ans.a}</div>
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

    <!-- Interactive Leitner 3-Box Practice Modal -->
    <div id="leitner-modal" class="leitner-modal-overlay" style="display: none;">
        <div class="leitner-modal-card">
            <div class="leitner-modal-header">
                <div class="leitner-header-title">
                    <h3>⚡ Leitner Spaced Practice</h3>
                    <p class="leitner-unit-subtitle">${unit.title.replace(/"/g, '&quot;')} · ${wb.title.replace(/"/g, '&quot;')}</p>
                </div>
                <div class="leitner-header-actions">
                    <button class="leitner-teacher-btn" onclick="toggleTeacherMode()" id="teacher-mode-btn" title="Toggle Classroom Projector Display (Shortcut: T)">📽️ Teacher Mode</button>
                    <button class="leitner-close-btn" onclick="closeLeitnerModal()" title="Close Practice Mode">&times;</button>
                </div>
            </div>

            <!-- Daily Spaced Retrieval Streak & 7-Day Heatmap -->
            <div class="leitner-streak-bar">
                <div class="streak-badge-wrap">
                    <span class="streak-fire-icon" id="streak-fire-icon">🔥</span>
                    <div class="streak-text-group">
                        <span class="streak-count-title" id="streak-title">0-Day Spaced Streak</span>
                        <span class="streak-subtitle" id="streak-subtitle">Practice retrieval today to start your streak!</span>
                    </div>
                </div>
                <div class="streak-heatmap-container">
                    <div class="streak-heatmap-title">7-Day Spaced Activity</div>
                    <div class="streak-heatmap-days" id="streak-heatmap-days">
                        <!-- Rendered dynamically by JS -->
                    </div>
                </div>
            </div>

            <div class="leitner-box-stats">
                <div class="leitner-stat-pill box-1" id="stat-box-1" title="Box 1: Daily Practice">
                    <span>🔴</span>
                    <span>Box 1 (Learning):</span>
                    <strong id="count-box-1">0</strong>
                </div>
                <div class="leitner-stat-pill box-2" id="stat-box-2" title="Box 2: Review Every 3 Days">
                    <span>🟡</span>
                    <span>Box 2 (Consolidating):</span>
                    <strong id="count-box-2">0</strong>
                </div>
                <div class="leitner-stat-pill box-3" id="stat-box-3" title="Box 3: Mastered (Weekly)">
                    <span>🟢</span>
                    <span>Box 3 (Mastered):</span>
                    <strong id="count-box-3">0</strong>
                </div>
            </div>

            <div class="leitner-filter-row">
                <label for="leitner-topic-select">Filter Topic:</label>
                <select id="leitner-topic-select" class="leitner-topic-select" onchange="changeLeitnerTopic(this.value)">
                    <option value="all">All Topics (${questions.length} Questions)</option>
                    ${pages.map((p, idx) => `<option value="${idx}">Part ${idx + 1}: ${p.title.replace(/"/g, '&quot;')}</option>`).join('\n')}
                </select>
            </div>

            <!-- Rapid-Fire Classroom Retrieval Timer (Whiteboard / Projector Drill) -->
            <div class="rapid-fire-timer-bar" id="rapid-fire-bar">
                <div class="timer-badge-group">
                    <span class="timer-flame">⏱️</span>
                    <span class="timer-title">Rapid-Fire Recall:</span>
                    <span class="timer-countdown" id="timer-countdown-text">15s</span>
                </div>
                <div class="timer-progress-track">
                    <div class="timer-progress-fill" id="timer-progress-fill"></div>
                </div>
                <div class="timer-btn-group">
                    <button class="timer-ctrl-btn" id="timer-toggle-btn" onclick="toggleRapidFireTimer()" title="Start / Pause 15s Timer (Enter)">▶️ Start</button>
                    <button class="timer-ctrl-btn reset" onclick="resetRapidFireTimer(true)" title="Reset &amp; Start 15s Countdown (Shortcut: R)">🔄 15s (R)</button>
                </div>
            </div>

            <!-- Flashcard Area -->
            <div class="leitner-card-container">
                <div class="leitner-card" id="leitner-flashcard" onclick="flipCurrentCard()">
                    <div class="leitner-card-inner">
                        <div class="leitner-card-face leitner-card-front">
                            <div class="card-meta">
                                <span id="card-qnum-badge" class="qnum-badge">Q# 1</span>
                                <span id="card-box-badge" class="box-badge b1">Box 1</span>
                            </div>
                            <div class="card-question-text" id="card-question-text">
                                Loading question...
                            </div>
                            <div class="card-prompt-hint">👆 Tap card to flip &amp; reveal answer</div>
                        </div>
                        <div class="leitner-card-face leitner-card-back">
                            <div class="card-meta">
                                <span class="qnum-badge ans">Answer Key</span>
                                <span id="card-box-badge-back" class="box-badge b1">Box 1</span>
                            </div>
                            <div class="card-answer-text" id="card-answer-text">
                                Loading answer...
                            </div>
                            <div class="card-prompt-hint">Rate your retrieval effort below 👇</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rating Actions (Leitner 3-Box Movement) -->
            <div class="leitner-action-bar">
                <button class="leitner-rate-btn btn-box-1" onclick="rateCurrentCard(1)">
                    <span class="btn-title">🔴 Box 1</span>
                    <span class="btn-sub">Needs Work (Blank)</span>
                </button>
                <button class="leitner-rate-btn btn-box-2" onclick="rateCurrentCard(2)">
                    <span class="btn-title">🟡 Box 2</span>
                    <span class="btn-sub">Got It (Effortful)</span>
                </button>
                <button class="leitner-rate-btn btn-box-3" onclick="rateCurrentCard(3)">
                    <span class="btn-title">🟢 Box 3</span>
                    <span class="btn-sub">Mastered (Instant)</span>
                </button>
            </div>

            <!-- Navigation Footer -->
            <div class="leitner-modal-footer">
                <button class="leitner-nav-btn" onclick="prevCard()">⬅️ Prev</button>
                <button class="leitner-nav-btn" onclick="shuffleCurrentDeck()">🔀 Shuffle</button>
                <button class="leitner-nav-btn" onclick="resetCurrentDeck()">🔄 Reset</button>
                <button class="leitner-nav-btn" onclick="nextCard()">Next ➡️</button>
            </div>
        </div>
    </div>

</body>
</html>
<script>
  (function() {
    if (navigator.userAgent.includes("HeadlessChrome") || navigator.userAgent.includes("Puppeteer")) return;

    const LEITNER_STORAGE_KEY = 'leitner_v1_${unitId}_${wb.id}';
    const STREAK_STORAGE_KEY = 'leitner_spaced_activity_v1';
    const ALL_DECK = ${JSON.stringify(
      questions.map((q, idx) => ({
        id: idx + 1,
        q: q.q,
        a: q.a,
        topic: q.lessonTitle,
      })),
    )};

    let currentDeck = [...ALL_DECK];
    let currentIndex = 0;
    let userBoxes = {};
    let isTeacherMode = false;
    let timerInterval = null;
    let timerRemainingMs = 15000;
    let timerEndTime = 0;
    let isTimerRunning = false;

    function getLocalDateString(d) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    function recordLeitnerActivity() {
      try {
        const todayStr = getLocalDateString(new Date());
        let activity = JSON.parse(localStorage.getItem(STREAK_STORAGE_KEY) || '[]');
        if (!activity.includes(todayStr)) {
          activity.push(todayStr);
          localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(activity));
        }
        updateStreakAndHeatmap();
      } catch (e) {}
    }

    function updateStreakAndHeatmap() {
      let activity = [];
      try {
        activity = JSON.parse(localStorage.getItem(STREAK_STORAGE_KEY) || '[]');
      } catch (e) {}

      const today = new Date();
      const todayStr = getLocalDateString(today);
      const yesterday = new Date(Date.now() - 86400000);
      const yesterdayStr = getLocalDateString(yesterday);

      const practicedToday = activity.includes(todayStr);
      let streak = 0;

      if (practicedToday) {
        streak = 1;
        let checkDate = new Date(Date.now() - 86400000);
        while (activity.includes(getLocalDateString(checkDate))) {
          streak++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        }
      } else if (activity.includes(yesterdayStr)) {
        let checkDate = new Date(yesterday.getTime());
        while (activity.includes(getLocalDateString(checkDate))) {
          streak++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        }
      }

      // Update Streak Text
      const titleEl = document.getElementById('streak-title');
      const subtitleEl = document.getElementById('streak-subtitle');
      if (titleEl) {
        if (streak > 0) {
          titleEl.textContent = '🔥 ' + streak + '-Day Spaced Streak!';
        } else {
          titleEl.textContent = '⚡ 0-Day Spaced Streak';
        }
      }
      if (subtitleEl) {
        if (practicedToday) {
          subtitleEl.textContent = 'Streak active today! Great effort on retrieval practice.';
        } else if (streak > 0) {
          subtitleEl.textContent = 'Practice today to extend your ' + streak + '-day streak!';
        } else {
          subtitleEl.textContent = 'Practice 5 mins today to ignite your streak!';
        }
      }

      // Render 7-Day Heatmap
      const heatmapEl = document.getElementById('streak-heatmap-days');
      if (heatmapEl) {
        const dayLetters = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        let html = '';
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 86400000);
          const dStr = getLocalDateString(d);
          const isToday = (i === 0);
          const isActive = activity.includes(dStr);
          const label = dayLetters[d.getDay()];

          html += '<div class="heatmap-day" title="' + dStr + ': ' + (isActive ? 'Practiced' : 'No Practice') + '">' +
            '<span class="heatmap-label">' + label + '</span>' +
            '<div class="heatmap-cell ' + (isActive ? 'active' : '') + ' ' + (isToday ? 'today' : '') + '">' +
            (isActive ? '✓' : '') +
            '</div></div>';
        }
        heatmapEl.innerHTML = html;
      }
    }

    function loadLeitnerProgress() {
      try {
        const raw = localStorage.getItem(LEITNER_STORAGE_KEY);
        if (raw) userBoxes = JSON.parse(raw);
      } catch (e) {
        userBoxes = {};
      }
    }

    function saveLeitnerProgress() {
      try {
        localStorage.setItem(LEITNER_STORAGE_KEY, JSON.stringify(userBoxes));
      } catch (e) {}
    }

    function getCardBox(cardId) {
      return userBoxes[cardId] || 1;
    }

    function updateStats() {
      let b1 = 0, b2 = 0, b3 = 0;
      ALL_DECK.forEach(card => {
        const b = getCardBox(card.id);
        if (b === 3) b3++;
        else if (b === 2) b2++;
        else b1++;
      });
      const el1 = document.getElementById('count-box-1');
      const el2 = document.getElementById('count-box-2');
      const el3 = document.getElementById('count-box-3');
      if (el1) el1.textContent = b1;
      if (el2) el2.textContent = b2;
      if (el3) el3.textContent = b3;
    }

    function renderCurrentCard() {
      if (currentDeck.length === 0) return;
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex >= currentDeck.length) currentIndex = 0;

      const card = currentDeck[currentIndex];
      const cardBox = getCardBox(card.id);

      const cardEl = document.getElementById('leitner-flashcard');
      if (cardEl) cardEl.classList.remove('flipped');

      const qNumBadge = document.getElementById('card-qnum-badge');
      if (qNumBadge) qNumBadge.textContent = 'Q#' + card.id + ' (' + (currentIndex + 1) + '/' + currentDeck.length + ')';

      const boxBadge = document.getElementById('card-box-badge');
      const boxBadgeBack = document.getElementById('card-box-badge-back');
      const boxClass = 'box-badge b' + cardBox;
      const boxText = 'Box ' + cardBox + ' (' + (cardBox === 1 ? 'Daily' : cardBox === 2 ? '3-Day' : 'Weekly') + ')';

      if (boxBadge) {
        boxBadge.className = boxClass;
        boxBadge.textContent = boxText;
      }
      if (boxBadgeBack) {
        boxBadgeBack.className = boxClass;
        boxBadgeBack.textContent = boxText;
      }

      const qText = document.getElementById('card-question-text');
      if (qText) qText.textContent = card.q;

      const aText = document.getElementById('card-answer-text');
      if (aText) aText.textContent = card.a;

      updateStats();
    }

    window.flipCurrentCard = function() {
      const cardEl = document.getElementById('leitner-flashcard');
      if (cardEl) cardEl.classList.toggle('flipped');
      recordLeitnerActivity();
    };

    window.rateCurrentCard = function(targetBox) {
      if (currentDeck.length === 0) return;
      const card = currentDeck[currentIndex];
      userBoxes[card.id] = targetBox;
      saveLeitnerProgress();
      recordLeitnerActivity();

      const cardEl = document.getElementById('leitner-flashcard');
      if (cardEl) cardEl.classList.remove('flipped');

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentDeck.length;
        renderCurrentCard();
      }, 120);
    };

    window.toggleTeacherMode = function() {
      isTeacherMode = !isTeacherMode;
      const modal = document.getElementById('leitner-modal');
      const btn = document.getElementById('teacher-mode-btn');
      if (modal) {
        if (isTeacherMode) {
          modal.classList.add('teacher-mode');
          if (btn) btn.textContent = '✖️ Exit Presentation (T)';
          if (modal.requestFullscreen) {
            modal.requestFullscreen().catch(() => {});
          } else if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
          }
          resetRapidFireTimer(true);
        } else {
          modal.classList.remove('teacher-mode');
          if (btn) btn.textContent = '📽️ Teacher Mode';
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          stopRapidFireTimer();
        }
      }
    };

    window.startRapidFireTimer = function() {
      stopRapidFireTimer();
      isTimerRunning = true;
      timerEndTime = Date.now() + timerRemainingMs;
      const toggleBtn = document.getElementById('timer-toggle-btn');
      if (toggleBtn) toggleBtn.textContent = '⏸️ Pause';
      const bar = document.getElementById('rapid-fire-bar');
      if (bar) bar.classList.remove('timer-expired');

      timerInterval = setInterval(() => {
        const now = Date.now();
        const diff = Math.max(0, timerEndTime - now);
        timerRemainingMs = diff;
        updateTimerDisplay(diff);

        if (diff <= 0) {
          stopRapidFireTimer();
          handleTimerExpired();
        }
      }, 50);
    };

    window.stopRapidFireTimer = function() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      isTimerRunning = false;
      const toggleBtn = document.getElementById('timer-toggle-btn');
      if (toggleBtn) toggleBtn.textContent = '▶️ Start';
    };

    window.toggleRapidFireTimer = function() {
      if (isTimerRunning) {
        stopRapidFireTimer();
      } else {
        if (timerRemainingMs <= 0) timerRemainingMs = 15000;
        startRapidFireTimer();
      }
    };

    window.resetRapidFireTimer = function(autoStart = true) {
      stopRapidFireTimer();
      timerRemainingMs = 15000;
      updateTimerDisplay(15000);
      const bar = document.getElementById('rapid-fire-bar');
      if (bar) bar.classList.remove('timer-expired');
      if (autoStart) {
        startRapidFireTimer();
      }
    };

    function updateTimerDisplay(ms) {
      const countdownEl = document.getElementById('timer-countdown-text');
      const fillEl = document.getElementById('timer-progress-fill');
      const seconds = Math.ceil(ms / 1000);

      if (countdownEl) {
        countdownEl.textContent = seconds + 's';
        countdownEl.classList.remove('warning', 'critical');
        if (seconds <= 3) countdownEl.classList.add('critical');
        else if (seconds <= 5) countdownEl.classList.add('warning');
      }

      if (fillEl) {
        const pct = Math.max(0, Math.min(100, (ms / 15000) * 100));
        fillEl.style.width = pct + '%';
        if (seconds <= 3) {
          fillEl.style.background = 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)';
        } else if (seconds <= 5) {
          fillEl.style.background = 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)';
        } else {
          fillEl.style.background = 'linear-gradient(90deg, #10b981 0%, #059669 100%)';
        }
      }
    }

    function handleTimerExpired() {
      const countdownEl = document.getElementById('timer-countdown-text');
      if (countdownEl) countdownEl.textContent = '0s';
      const bar = document.getElementById('rapid-fire-bar');
      if (bar) bar.classList.add('timer-expired');
      if (isTeacherMode) {
        const cardEl = document.getElementById('leitner-flashcard');
        if (cardEl && !cardEl.classList.contains('flipped')) {
          cardEl.classList.add('flipped');
        }
      }
    }

    window.nextCard = function() {
      if (currentDeck.length === 0) return;
      const cardEl = document.getElementById('leitner-flashcard');
      if (cardEl) cardEl.classList.remove('flipped');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentDeck.length;
        renderCurrentCard();
        if (isTeacherMode || isTimerRunning) resetRapidFireTimer(true);
      }, 100);
    };

    window.prevCard = function() {
      if (currentDeck.length === 0) return;
      const cardEl = document.getElementById('leitner-flashcard');
      if (cardEl) cardEl.classList.remove('flipped');
      setTimeout(() => {
        currentIndex = (currentIndex - 1 + currentDeck.length) % currentDeck.length;
        renderCurrentCard();
        if (isTeacherMode || isTimerRunning) resetRapidFireTimer(true);
      }, 100);
    };

    window.shuffleCurrentDeck = function() {
      for (let i = currentDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
      }
      currentIndex = 0;
      renderCurrentCard();
      if (isTeacherMode || isTimerRunning) resetRapidFireTimer(true);
    };

    window.resetCurrentDeck = function() {
      if (confirm('Reset all Leitner Box assignments for this Mastery Pack?')) {
        userBoxes = {};
        saveLeitnerProgress();
        renderCurrentCard();
      }
    };

    window.changeLeitnerTopic = function(val) {
      if (val === 'all') {
        currentDeck = [...ALL_DECK];
      } else {
        const pageIdx = parseInt(val, 10);
        const startQ = pageIdx * 20 + 1;
        const endQ = startQ + 20;
        currentDeck = ALL_DECK.filter(c => c.id >= startQ && c.id < endQ);
      }
      currentIndex = 0;
      renderCurrentCard();
      if (isTeacherMode || isTimerRunning) resetRapidFireTimer(true);
    };

    window.openLeitnerModal = function() {
      const modal = document.getElementById('leitner-modal');
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        loadLeitnerProgress();
        updateStreakAndHeatmap();
        renderCurrentCard();
      }
    };

    window.closeLeitnerModal = function() {
      const modal = document.getElementById('leitner-modal');
      if (modal) {
        stopRapidFireTimer();
        if (isTeacherMode) toggleTeacherMode();
        modal.style.display = 'none';
        document.body.style.overflow = '';
        if (window.location.hash === '#practice-mode') {
          history.replaceState(null, null, ' ');
        }
      }
    };

    window.toggleAllAnswers = function(reveal) {
      const answerEls = document.querySelectorAll('.answer-text');
      answerEls.forEach(el => {
        if (reveal) el.classList.add('revealed');
        else el.classList.remove('revealed');
      });
    };

    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('leitner-modal');
      if (!modal || modal.style.display === 'none') return;
      if (e.key === 'Escape') {
        if (isTeacherMode) toggleTeacherMode();
        else closeLeitnerModal();
      }
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCurrentCard(); }
      else if (e.key === 't' || e.key === 'T') { e.preventDefault(); toggleTeacherMode(); }
      else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); resetRapidFireTimer(true); }
      else if (e.key === '1') rateCurrentCard(1);
      else if (e.key === '2') rateCurrentCard(2);
      else if (e.key === '3') rateCurrentCard(3);
      else if (e.key === 'ArrowRight') nextCard();
      else if (e.key === 'ArrowLeft') prevCard();
    });

    document.addEventListener("DOMContentLoaded", function() {
      loadLeitnerProgress();
      updateStreakAndHeatmap();
      if (window.location.hash === '#practice-mode') {
        openLeitnerModal();
      }
      window.addEventListener('hashchange', () => {
        if (window.location.hash === '#practice-mode') {
          openLeitnerModal();
        }
      });
    });
  })();
</script>
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
