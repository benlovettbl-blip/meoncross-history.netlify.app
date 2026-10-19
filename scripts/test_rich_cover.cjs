/**
 * scripts/test_rich_cover.cjs
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relativePath) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(ROOT_DIR, cleanPath);
    if (!fs.existsSync(fullPath)) return null;
    const ext = path.extname(fullPath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    const data = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${data}`;
  } catch (err) {
    return null;
  }
}

const coverImgData =
  getBase64Image('/images/portchester_keep.jpg') || '/images/portchester_keep.jpg';

function generateHtml(options = {}) {
  const {
    heroH = '64mm',
    heroW = '80mm',
    itemPad = '3.5mm',
    itemGap = '3.5mm',
    cardPad = '5mm 6mm',
    enquiryDescFontSize = '7.4pt',
  } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    body { background: #0f172a; display: flex; justify-content: center; padding: 20px 0; }
    .a4-page {
      width: 210mm;
      height: 297mm;
      background: #0f172a;
      color: #ffffff;
      padding: 10mm 15mm 9mm 15mm;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 2mm;
      margin-bottom: 3.5mm;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .cover-title-group {
      text-align: center;
      margin-bottom: 3.8mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: #991b1b;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      padding: 2.5px 12px;
      border-radius: 3px;
      margin-bottom: 2mm;
    }
    .cover-title-group h1 {
      font-family: 'Cinzel', serif;
      font-size: 27pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #ffffff;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 2mm;
    }
    .cover-title-group p {
      font-family: 'Lora', Georgia, serif;
      font-size: 10.8pt;
      font-style: italic;
      color: #cbd5e1;
      line-height: 1.35;
    }

    /* Compact Hero Plate & Overview Row */
    .cover-hero-row {
      display: flex;
      gap: 16px;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      padding: 4mm 4.5mm;
      margin-bottom: 4mm;
      align-items: center;
    }
    .cover-hero-artwork-frame {
      width: ${heroW};
      height: ${heroH};
      overflow: hidden;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }
    .cover-hero-artwork-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      display: block;
    }
    .cover-overview-narrative {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2mm;
    }
    .cover-overview-title {
      color: #fca5a5;
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .cover-overview-p {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.8pt;
      line-height: 1.48;
      color: #f1f5f9;
      text-align: justify;
    }

    /* Enquiries Syllabus Box */
    .cover-enquiries-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: ${cardPad};
      border-left: 5px solid #991b1b;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    .cover-enquiries-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 2px solid #0f284e;
      padding-bottom: 1.8mm;
      margin-bottom: 2.8mm;
      font-family: 'Inter', sans-serif;
    }
    .cover-enquiries-header h2 {
      font-size: 9.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0f284e;
    }
    .cover-enquiries-header span {
      font-size: 7.4pt;
      font-weight: 700;
      color: #991b1b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-enquiry-list {
      display: flex;
      flex-direction: column;
      gap: ${itemGap};
    }
    .cover-enquiry-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-family: 'Inter', sans-serif;
      padding-bottom: ${itemPad};
      border-bottom: 1px solid #f1f5f9;
    }
    .cover-enquiry-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .cover-enquiry-num {
      background: #0f284e;
      color: #ffffff;
      font-size: 7.8pt;
      font-weight: 800;
      padding: 2.5px 7px;
      border-radius: 3px;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .cover-enquiry-text {
      flex: 1;
    }
    .cover-enquiry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .cover-enquiry-title {
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
    }
    .cover-enquiry-locator {
      font-size: 7.4pt;
      font-weight: 700;
      color: #991b1b;
      flex-shrink: 0;
      margin-left: 8px;
    }
    .cover-enquiry-question {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.2pt;
      font-style: italic;
      color: #334155;
      line-height: 1.32;
      margin-bottom: 2px;
    }
    .cover-enquiry-desc {
      font-size: ${enquiryDescFontSize};
      color: #64748b;
      line-height: 1.32;
    }

    /* Bottom Concept Strip */
    .cover-concept-strip {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      padding: 2.6mm 4mm;
      margin-top: 4.5mm;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 10px;
      line-height: 1.35;
    }
    .cover-concept-label {
      background: #0f284e;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 2px;
      text-transform: uppercase;
      font-size: 6.5pt;
      letter-spacing: 0.06em;
      flex-shrink: 0;
    }

    .cover-footer-meta {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 2.5mm;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 7pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="a4-page cover-page textbook-page" id="page-1">
    <div class="cover-top-masthead">
      <span>The History Revision Hub &bull; Master Curriculum Series</span>
      <span>Key Stage 3 Disciplinary History</span>
    </div>

    <div class="cover-title-group">
      <span class="cover-date-pill">1066 &ndash; 1381</span>
      <h1>Medieval England</h1>
      <p>The Struggle for Power: Monarchy, Church &amp; Popular Rebellion</p>
    </div>

    <div class="cover-hero-row">
      <div class="cover-hero-artwork-frame">
        <img src="${coverImgData}" alt="Portchester Castle Keep" />
      </div>
      <div class="cover-overview-narrative">
        <div class="cover-overview-title">Volume Overview &amp; Curriculum Scope</div>
        <p class="cover-overview-p">
          From the catastrophic clash of Saxon shield wall and Norman cavalry on Senlac Ridge in 1066 to the armed peasant revolt marching on London in 1381, this reading anthology charts three turbulent centuries in which monarchical authority, spiritual hegemony, and popular resistance forged the medieval English realm.
        </p>
        <p class="cover-overview-p">
          Engineered for Key Stage 3 historical scholarship, this pure narrative anthology provides pupils with continuous, rigorous prose. Every enquiry is organized into numbered paragraph blocks ([1.1] to [5.5]), enabling swift evidence retrieval, paired oral reading, and direct citation in analytical essays.
        </p>
      </div>
    </div>

    <div class="cover-enquiries-box">
      <div class="cover-enquiries-header">
        <h2>Curriculum Enquiries in This Volume</h2>
        <span>Chronological Syllabus Overview</span>
      </div>
      <div class="cover-enquiry-list">
        <div class="cover-enquiry-item">
          <span class="cover-enquiry-num">01</span>
          <div class="cover-enquiry-text">
            <div class="cover-enquiry-top-row">
              <span class="cover-enquiry-title">1066: The Succession Crisis &amp; The Battle of Hastings</span>
              <span class="cover-enquiry-locator">pp. 2&ndash;3 &bull; Ref [1.1]&ndash;[1.5]</span>
            </div>
            <div class="cover-enquiry-question">Key Question: Why did three men claim one throne in 1066, and how did William secure victory at Hastings?</div>
            <div class="cover-enquiry-desc">Edward the Confessor's deathbed void, the Witan's dilemma, Harold Godwinson's coronation, Harald Hardrada's invasion at Stamford Bridge, and the tactical turning point on Senlac Ridge.</div>
          </div>
        </div>

        <div class="cover-enquiry-item">
          <span class="cover-enquiry-num">02</span>
          <div class="cover-enquiry-text">
            <div class="cover-enquiry-top-row">
              <span class="cover-enquiry-title">Castles, Terror &amp; Domesday: How Did the Normans Subjugate England?</span>
              <span class="cover-enquiry-locator">pp. 4&ndash;5 &bull; Ref [2.1]&ndash;[2.5]</span>
            </div>
            <div class="cover-enquiry-question">Key Question: How did William the Conqueror crush English rebellion and consolidate total monarchical control by 1086?</div>
            <div class="cover-enquiry-desc">Motte-and-bailey blitzkrieg, scorched earth during the Harrying of the North, Portchester Castle's stone keep, the 1086 fiscal audit, and total Saxon aristocratic land dispossession.</div>
          </div>
        </div>

        <div class="cover-enquiry-item">
          <span class="cover-enquiry-num">03</span>
          <div class="cover-enquiry-text">
            <div class="cover-enquiry-top-row">
              <span class="cover-enquiry-title">Crown vs Church: Why Did Henry II Clash With Thomas Becket?</span>
              <span class="cover-enquiry-locator">pp. 6&ndash;7 &bull; Ref [3.1]&ndash;[3.5]</span>
            </div>
            <div class="cover-enquiry-question">Key Question: Was the murder of Thomas Becket a defense of royal law or a catastrophic abuse of monarchical tyranny?</div>
            <div class="cover-enquiry-desc">Secular royal justice vs ecclesiastical immunity, the Clarendon clash over criminous clerks, six years of papal exile in France, the fatal Christmas rage, and Canterbury martyrdom.</div>
          </div>
        </div>

        <div class="cover-enquiry-item">
          <span class="cover-enquiry-num">04</span>
          <div class="cover-enquiry-text">
            <div class="cover-enquiry-top-row">
              <span class="cover-enquiry-title">Magna Carta (1215) &amp; Medieval Kingship: Liberty or Barons’ Power Grab?</span>
              <span class="cover-enquiry-locator">pp. 8&ndash;9 &bull; Ref [4.1]&ndash;[4.5]</span>
            </div>
            <div class="cover-enquiry-question">Key Question: Did Magna Carta establish universal rule of law or was it a self-interested treaty protecting aristocratic privilege?</div>
            <div class="cover-enquiry-desc">King John 'Softsword', the loss of Normandy, feudal scutage extortion, the Papal Interdict, catastrophic defeat at Bouvines, Runnymede, and foundational Clause 39 liberties.</div>
          </div>
        </div>

        <div class="cover-enquiry-item">
          <span class="cover-enquiry-num">05</span>
          <div class="cover-enquiry-text">
            <div class="cover-enquiry-top-row">
              <span class="cover-enquiry-title">The Black Death (1348) &amp; The Peasants’ Revolt (1381)</span>
              <span class="cover-enquiry-locator">pp. 10&ndash;11 &bull; Ref [5.1]&ndash;[5.5]</span>
            </div>
            <div class="cover-enquiry-question">Key Question: Did demographic catastrophe and popular rebellion permanently shatter feudal serfdom in England?</div>
            <div class="cover-enquiry-desc">Yersinia pestis pandemic, acute rural labour shortages, Statute of Labourers wage freeze, regressive Poll Taxes, John Ball's sermons, the sack of London, and the Smithfield climax.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cover-concept-strip">
      <span class="cover-concept-label">Core Concepts</span>
      <span>Monarchical Sovereignty &bull; Feudal Land Tenure &bull; Secular vs Canon Law &bull; Constitutional Rule of Law &bull; Demographic Catastrophe &amp; Labour Mobility</span>
    </div>

    <div class="cover-footer-meta">
      <span>The History Revision Hub &bull; Commercial Educational Publishing</span>
      <span>Classroom Reading Edition &bull; 100% Pure Disciplinary Narrative Architecture</span>
    </div>
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

  const testConfigs = [
    {
      heroH: '64mm',
      heroW: '80mm',
      itemPad: '3.5mm',
      itemGap: '3.5mm',
      cardPad: '5mm 6mm',
      enquiryDescFontSize: '7.4pt',
    },
    {
      heroH: '70mm',
      heroW: '84mm',
      itemPad: '4mm',
      itemGap: '4mm',
      cardPad: '5.5mm 6.5mm',
      enquiryDescFontSize: '7.6pt',
    },
    {
      heroH: '76mm',
      heroW: '88mm',
      itemPad: '4.2mm',
      itemGap: '4.2mm',
      cardPad: '6mm 7mm',
      enquiryDescFontSize: '7.8pt',
    },
  ];

  for (let i = 0; i < testConfigs.length; i++) {
    const cfg = testConfigs[i];
    const html = generateHtml(cfg);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const metrics = await page.evaluate(() => {
      const el = document.getElementById('page-1');
      const footer = el.querySelector('.cover-footer-meta');
      const concept = el.querySelector('.cover-concept-strip');
      const fRect = footer.getBoundingClientRect();
      const cRect = concept.getBoundingClientRect();
      const gapAboveFooter = Math.round(fRect.top - cRect.bottom);
      return {
        scrollH: el.scrollHeight,
        clientH: el.clientHeight,
        overflow: el.scrollHeight > el.clientHeight,
        diff: el.scrollHeight - el.clientHeight,
        gapAboveFooter,
      };
    });

    console.log(`Config ${i + 1}:`, metrics);

    if (i === 0) {
      const shotPath = path.join(ROOT_DIR, 'scratch', 'rich_front_cover_optimal.png');
      await page.screenshot({ path: shotPath });
      const artPath = path.join(
        'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\e7ef5e95-188d-421a-92d5-7160b553ca08',
        'rich_front_cover_optimal.png',
      );
      fs.copyFileSync(shotPath, artPath);
    }
  }

  await browser.close();
}

run().catch(console.error);
