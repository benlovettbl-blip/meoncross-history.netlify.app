/**
 * scripts/prototype_quiz_back_cover.cjs
 * Test fitting quiz questions on the Back Cover (Page 12)
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const data = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'data', 'medieval_england.json'), 'utf8'),
);

// Set of 60 questions: 10 per Enquiry topic
const enquiries60 = [
  {
    num: '01',
    title: '1066 & The Battle of Hastings',
    ref: 'pp. 2–3 • Ref [1.1]–[1.5]',
    questions: data.data.lessons[0].quiz.slice(10, 20).map((q) => q.q || q.question),
  },
  {
    num: '02',
    title: 'Castles, Terror & Domesday',
    ref: 'pp. 4–5 • Ref [2.1]–[2.5]',
    questions: data.data.lessons[1].quiz.slice(10, 20).map((q) => q.q || q.question),
  },
  {
    num: '03',
    title: 'Crown vs Church: Henry II & Becket',
    ref: 'pp. 6–7 • Ref [3.1]–[3.5]',
    questions: data.data.lessons[2].quiz.slice(10, 20).map((q) => q.q || q.question),
  },
  {
    num: '04',
    title: 'Magna Carta & Medieval Kingship',
    ref: 'pp. 8–9 • Ref [4.1]–[4.5]',
    questions: data.data.lessons[3].quiz.slice(10, 20).map((q) => q.q || q.question),
  },
  {
    num: '05',
    title: "The Black Death & Peasants' Revolt",
    ref: 'pp. 10–11 • Ref [5.1]–[5.5]',
    questions: [
      ...data.data.lessons[5].quiz.slice(10, 16).map((q) => q.q || q.question),
      ...data.data.lessons[6].quiz.slice(10, 16).map((q) => q.q || q.question),
    ].slice(0, 10), // 10 questions for Enquiry 5 (5 plague + 5 revolt)
  },
];

// Set of 50 questions: exactly 10 per enquiry
const total50 = enquiries60.reduce((acc, e) => acc + e.questions.length, 0);

// Set of 100 questions: 20 per enquiry
const enquiries100 = [
  {
    num: '01',
    title: '1066 & The Battle of Hastings',
    ref: 'pp. 2–3 • Ref [1.1]–[1.5]',
    questions: data.data.lessons[0].quiz.map((q) => q.q || q.question),
  },
  {
    num: '02',
    title: 'Castles, Terror & Domesday',
    ref: 'pp. 4–5 • Ref [2.1]–[2.5]',
    questions: data.data.lessons[1].quiz.map((q) => q.q || q.question),
  },
  {
    num: '03',
    title: 'Crown vs Church: Henry II & Becket',
    ref: 'pp. 6–7 • Ref [3.1]–[3.5]',
    questions: data.data.lessons[2].quiz.map((q) => q.q || q.question),
  },
  {
    num: '04',
    title: 'Magna Carta & Medieval Kingship',
    ref: 'pp. 8–9 • Ref [4.1]–[4.5]',
    questions: data.data.lessons[3].quiz.map((q) => q.q || q.question),
  },
  {
    num: '05',
    title: "The Black Death & Peasants' Revolt",
    ref: 'pp. 10–11 • Ref [5.1]–[5.5]',
    questions: [
      ...data.data.lessons[5].quiz.slice(10, 20).map((q) => q.q || q.question),
      ...data.data.lessons[6].quiz.slice(10, 20).map((q) => q.q || q.question),
    ],
  },
];

function generateHtml(enquirySet, layoutColumns = 3, fontSize = '7.5pt') {
  let globalQNum = 1;

  let columnsHtml = '';
  enquirySet.forEach((enq) => {
    let qItemsHtml = enq.questions
      .map((qText, idx) => {
        const qNum = globalQNum++;
        return `
        <div class="quiz-item">
          <span class="quiz-num">${qNum}.</span>
          <span class="quiz-text">${qText}</span>
        </div>
      `;
      })
      .join('');

    columnsHtml += `
      <div class="quiz-section-card">
        <div class="quiz-section-header">
          <div class="quiz-section-title-wrap">
            <span class="quiz-sec-num">ENQUIRY ${enq.num}</span>
            <span class="quiz-sec-title">${enq.title}</span>
          </div>
          <span class="quiz-sec-ref">${enq.ref}</span>
        </div>
        <div class="quiz-items-list">
          ${qItemsHtml}
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Master Knowledge Quiz Back Cover Prototype</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0f172a;
      display: flex;
      justify-content: center;
      padding: 20px;
      font-family: 'Inter', sans-serif;
    }
    .a4-page {
      width: 210mm;
      height: 297mm;
      background: #faf8f5;
      padding: 10mm 14mm 8mm 14mm;
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      overflow: hidden;
    }
    .back-header-strip {
      border-bottom: 2px solid #8b0000;
      padding-bottom: 2.2mm;
      margin-bottom: 2.8mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h1 {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      color: #0b192c;
      letter-spacing: 0.05em;
      line-height: 1.1;
    }
    .header-left p {
      font-size: 8pt;
      color: #8b0000;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .header-right {
      text-align: right;
    }
    .badge-capsule {
      background: #0b192c;
      color: #fff;
      font-size: 7.2pt;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-block;
    }
    .header-right p {
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }

    /* INSTRUCTIONS BANNER */
    .quiz-instructions-strip {
      background: #f1f5f9;
      border-left: 3px solid #8b0000;
      padding: 2mm 3.5mm;
      margin-bottom: 2.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.4pt;
      color: #1e293b;
    }
    .quiz-instructions-strip strong {
      color: #0b192c;
    }

    /* QUIZ CONTAINER */
    .quiz-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2mm;
    }
    .quiz-columns-grid {
      columns: ${layoutColumns};
      column-gap: 3.5mm;
      height: 100%;
    }
    .quiz-section-card {
      break-inside: avoid;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 2.5mm 3mm;
      margin-bottom: 2.8mm;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .quiz-section-header {
      border-bottom: 1.5px solid #8b0000;
      padding-bottom: 1.5px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .quiz-sec-num {
      font-size: 6.8pt;
      font-weight: 800;
      color: #8b0000;
      letter-spacing: 0.05em;
      margin-right: 4px;
    }
    .quiz-sec-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0b192c;
    }
    .quiz-sec-ref {
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
    }
    .quiz-items-list {
      display: flex;
      flex-direction: column;
      gap: 1.6px;
      margin-top: 2px;
    }
    .quiz-item {
      display: flex;
      gap: 3px;
      font-size: ${fontSize};
      line-height: 1.25;
      color: #1e293b;
    }
    .quiz-num {
      font-weight: 800;
      color: #8b0000;
      min-width: 14px;
      flex-shrink: 0;
    }
    .quiz-text {
      flex: 1;
    }

    /* FOOTER */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2mm;
      display: flex;
      justify-content: space-between;
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="a4-page" id="page-12">
    <div class="back-header-strip">
      <div class="header-left">
        <h1>Master Knowledge Retrieval Quiz</h1>
        <p>Canonical Disciplinary Checkpoints &bull; Medieval England 1066&ndash;1381</p>
      </div>
      <div class="header-right">
        <span class="badge-capsule">Self-Assessment &bull; Paired Quiz</span>
        <p>No Answers Provided &bull; Verify in Text [1.1]&ndash;[5.5]</p>
      </div>
    </div>

    <div class="quiz-instructions-strip">
      <span><strong>Student Retrieval Directive:</strong> Answer questions orally with your partner or in your revision exercise book without opening the text.</span>
      <span><strong>Cross-Reference:</strong> Paragraph citations locate exact corroborating narrative evidence.</span>
    </div>

    <div class="quiz-body">
      <div class="quiz-columns-grid">
        ${columnsHtml}
      </div>
    </div>

    <footer class="page-footer">
      <span>The History Revision Hub &bull; Master Curriculum Series</span>
      <span>Classroom Retrieval Edition &bull; Page 12 of 12</span>
    </footer>
  </div>
</body>
</html>`;
}

async function run() {
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  // Test 1: 50 Questions in 2 columns
  console.log('Testing 50-Question Layout...');
  const page50 = await browser.newPage();
  await page50.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const html50 = generateHtml(enquiries60, 2, '7.6pt');
  await page50.setContent(html50, { waitUntil: 'networkidle0' });

  const metrics50 = await page50.evaluate(() => {
    const el = document.getElementById('page-12');
    return {
      scrollH: el.scrollHeight,
      clientH: el.clientHeight,
      overflow: el.scrollHeight > el.clientHeight,
      diff: el.scrollHeight - el.clientHeight,
    };
  });
  console.log('50-Question layout metrics (2 cols):', metrics50);
  const screenshot50Path = path.join(ROOT_DIR, 'scratch', 'quiz_back_cover_50q.png');
  await page50.screenshot({ path: screenshot50Path });

  // Copy to artifacts
  const artifact50 = path.join(
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\e7ef5e95-188d-421a-92d5-7160b553ca08',
    'quiz_back_cover_50q.png',
  );
  fs.copyFileSync(screenshot50Path, artifact50);

  // Test 2: 100 Questions in 3 columns
  console.log('\nTesting 100-Question Layout...');
  const page100 = await browser.newPage();
  await page100.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const html100 = generateHtml(enquiries100, 3, '6.4pt');
  await page100.setContent(html100, { waitUntil: 'networkidle0' });

  const metrics100 = await page100.evaluate(() => {
    const el = document.getElementById('page-12');
    return {
      scrollH: el.scrollHeight,
      clientH: el.clientHeight,
      overflow: el.scrollHeight > el.clientHeight,
      diff: el.scrollHeight - el.clientHeight,
    };
  });
  console.log('100-Question layout metrics (3 cols):', metrics100);
  const screenshot100Path = path.join(ROOT_DIR, 'scratch', 'quiz_back_cover_100q.png');
  await page100.screenshot({ path: screenshot100Path });

  const artifact100 = path.join(
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\e7ef5e95-188d-421a-92d5-7160b553ca08',
    'quiz_back_cover_100q.png',
  );
  fs.copyFileSync(screenshot100Path, artifact100);

  console.log('\nArtifacts saved.');
  await browser.close();
}

run().catch(console.error);
