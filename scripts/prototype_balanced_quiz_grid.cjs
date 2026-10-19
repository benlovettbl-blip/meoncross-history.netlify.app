/**
 * scripts/prototype_balanced_quiz_grid.cjs
 * Test 6-box 2x3 grid (60 questions total, 10 per box)
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const data = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'data', 'medieval_england.json'), 'utf8'),
);

const sections = [
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
    title: 'Crown vs Church (Henry II & Becket)',
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
    num: '05A',
    title: 'The Black Death (1348)',
    ref: 'p. 10 • Ref [5.1]–[5.2]',
    questions: data.data.lessons[5].quiz.slice(10, 20).map((q) => q.q || q.question),
  },
  {
    num: '05B',
    title: "The Peasants' Revolt (1381)",
    ref: 'p. 11 • Ref [5.3]–[5.5]',
    questions: data.data.lessons[6].quiz.slice(10, 20).map((q) => q.q || q.question),
  },
];

function generateBalancedGridHtml() {
  let globalQNum = 1;

  const boxesHtml = sections
    .map((sec) => {
      const qList = sec.questions
        .map((qText) => {
          const qNum = globalQNum++;
          return `
        <div class="quiz-item">
          <span class="quiz-num">${qNum}.</span>
          <span class="quiz-text">${qText}</span>
        </div>
      `;
        })
        .join('');

      return `
      <div class="quiz-grid-card">
        <div class="quiz-grid-header">
          <div class="quiz-title-wrap">
            <span class="quiz-badge">ENQUIRY ${sec.num}</span>
            <span class="quiz-title">${sec.title}</span>
          </div>
          <span class="quiz-locator">${sec.ref}</span>
        </div>
        <div class="quiz-items-wrap">
          ${qList}
        </div>
      </div>
    `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Master Knowledge Retrieval Quiz - 6-Box Grid</title>
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
      padding: 9.5mm 13mm 7.5mm 13mm;
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      overflow: hidden;
    }

    /* HEADER */
    .back-header-strip {
      border-bottom: 2.2px solid #8b0000;
      padding-bottom: 2mm;
      margin-bottom: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h1 {
      font-family: 'Cinzel', serif;
      font-size: 15.5pt;
      font-weight: 800;
      color: #0b192c;
      letter-spacing: 0.04em;
      line-height: 1.1;
    }
    .header-left p {
      font-size: 7.8pt;
      color: #8b0000;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1.5px;
    }
    .header-right {
      text-align: right;
    }
    .badge-capsule {
      background: #0b192c;
      color: #fff;
      font-size: 7pt;
      font-weight: 700;
      padding: 2.5px 8px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-block;
    }
    .header-right p {
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }

    /* INSTRUCTIONS BANNER */
    .quiz-instructions-strip {
      background: #f1f5f9;
      border-left: 3px solid #8b0000;
      padding: 1.8mm 3mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #1e293b;
    }
    .quiz-instructions-strip strong {
      color: #0b192c;
    }

    /* 2x3 GRID CONTAINER */
    .quiz-grid-container {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      gap: 2.5mm 3.5mm;
    }

    .quiz-grid-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 2.2mm 2.8mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .quiz-grid-header {
      border-bottom: 1.4px solid #8b0000;
      padding-bottom: 1.5px;
      margin-bottom: 1.8px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .quiz-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .quiz-badge {
      font-size: 6.5pt;
      font-weight: 800;
      color: #8b0000;
      letter-spacing: 0.04em;
    }
    .quiz-title {
      font-size: 7.6pt;
      font-weight: 800;
      color: #0b192c;
    }
    .quiz-locator {
      font-size: 6.3pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-items-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5px;
    }
    .quiz-item {
      display: flex;
      gap: 3.5px;
      font-size: 7.2pt;
      line-height: 1.25;
      color: #1e293b;
    }
    .quiz-num {
      font-weight: 800;
      color: #8b0000;
      min-width: 15px;
      flex-shrink: 0;
    }
    .quiz-text {
      flex: 1;
    }

    /* FOOTER */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 1.8mm;
      margin-top: 2.2mm;
      display: flex;
      justify-content: space-between;
      font-size: 6.8pt;
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
      <span><strong>Student Retrieval Directive:</strong> Test your factual mastery orally in pairs or in your revision exercise book without opening the text.</span>
      <span><strong>Verification:</strong> Paragraph citations locate exact corroborating narrative evidence in Enquiries 1&ndash;5.</span>
    </div>

    <div class="quiz-grid-container">
      ${boxesHtml}
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

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const html = generateBalancedGridHtml();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const metrics = await page.evaluate(() => {
    const el = document.getElementById('page-12');
    return {
      scrollH: el.scrollHeight,
      clientH: el.clientHeight,
      overflow: el.scrollHeight > el.clientHeight,
      diff: el.scrollHeight - el.clientHeight,
    };
  });
  console.log('Balanced 6-Box Grid metrics:', metrics);

  const screenshotPath = path.join(ROOT_DIR, 'scratch', 'quiz_back_cover_6box_grid.png');
  await page.screenshot({ path: screenshotPath });

  const artifactPath = path.join(
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\e7ef5e95-188d-421a-92d5-7160b553ca08',
    'quiz_back_cover_6box_grid.png',
  );
  fs.copyFileSync(screenshotPath, artifactPath);

  console.log('Artifact saved to:', artifactPath);
  await browser.close();
}

run().catch(console.error);
