const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relativePath) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Load data
let rawData = fs.readFileSync(path.join(ROOT_DIR, 'units', 'ks2_ww2', 'data.js'), 'utf8');
rawData = rawData
  .replace(/^const unitData\s*=\s*/, '')
  .replace(/export default[\s\S]*$/, '')
  .trim();
if (rawData.endsWith(';')) rawData = rawData.slice(0, -1);
const unitData = JSON.parse(rawData);

const l1 = unitData.lessons[0];
const sourceA = l1.narrative_blocks[0].source;
const imgA = getBase64Image(sourceA.image);
const imgB = getBase64Image('/units/ks2_ww2/assets/gas_mask_box_1939.jpg');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS2 WWII Enquiry 1 Spread Prototype</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { margin: 0; padding: 0; background: #94a3b8; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; gap: 20px; align-items: center; }
    
    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      padding: 12mm 15mm 10mm 15mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 8px;
      font-size: 7.5pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3.5px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #64748b;
    }

    /* Common Typography */
    .prose-text {
      font-family: 'Lora', Georgia, serif;
      font-size: 12.0pt;
      line-height: 1.58;
      color: #1e293b;
      text-align: justify;
      margin: 0 0 10px 0;
    }
    .prose-text strong {
      color: #0f172a;
      font-weight: 700;
    }

    .act-header {
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin: 10px 0 4px 0;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .act-ref-pill {
      background: #0f172a;
      color: #fff;
      font-size: 7.5pt;
      padding: 1.5px 6px;
      border-radius: 3px;
      font-weight: 800;
    }

    /* Verso (Left Page) Specifics */
    .verso-banner {
      margin-bottom: 8px;
    }
    .enquiry-pill {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 3px;
    }
    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 15.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      line-height: 1.15;
    }
    .enquiry-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.8pt;
      font-style: italic;
      color: #475569;
      margin: 0 0 6px 0;
    }
    .enquiry-question-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 4px solid #1e3a8a;
      padding: 5px 10px;
      border-radius: 4px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .enquiry-question-label {
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }
    .enquiry-question-text {
      font-family: 'Playfair Display', serif;
      font-size: 9.5pt;
      font-style: italic;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    /* Verso 2-Column or Grid */
    .verso-content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      flex: 1;
    }

    /* Primary Source Card */
    .source-card {
      border: 1.5px solid #cbd5e1;
      border-radius: 5px;
      background: #f8fafc;
      padding: 7px;
      margin-bottom: 8px;
    }
    .source-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .source-letter-tag {
      background: #0f172a;
      color: #fff;
      font-size: 7pt;
      font-weight: 800;
      padding: 1.5px 6px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .source-type-tag {
      font-size: 7pt;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
    }
    .source-img-wrap {
      width: 100%;
      height: 60mm;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 5px;
      background: #e2e8f0;
    }
    .source-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .source-caption {
      font-size: 7.5pt;
      line-height: 1.4;
      color: #334155;
      font-style: italic;
      margin: 0;
    }
    .source-citation {
      font-size: 6.8pt;
      color: #64748b;
      font-style: normal;
      margin-top: 2px;
    }

    /* Think & Discuss Card */
    .discuss-card {
      background: #fefce8;
      border: 1.5px solid #fef08a;
      border-left: 4.5px solid #ca8a04;
      border-radius: 4px;
      padding: 8px 10px;
    }
    .discuss-header {
      font-size: 7.8pt;
      font-weight: 800;
      color: #854d0e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .discuss-hinge {
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 700;
      color: #713f12;
      line-height: 1.35;
      margin: 0 0 6px 0;
    }
    .discuss-pointers {
      margin: 0;
      padding-left: 16px;
      font-size: 7.8pt;
      line-height: 1.4;
      color: #854d0e;
    }
    .discuss-pointers li {
      margin-bottom: 3px;
    }

    /* Recto (Right Page) Specifics */
    .recto-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }
    .recto-mechanism-pill {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      color: #1e3a8a;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .recto-content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      flex: 1;
      margin-bottom: 10px;
    }

    /* Vocabulary Box */
    .vocab-box {
      border: 1.5px solid #e2e8f0;
      border-radius: 4px;
      background: #fdfbf7;
      padding: 8px 10px;
      margin-bottom: 8px;
    }
    .vocab-title {
      font-size: 7.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .vocab-item {
      font-size: 7.8pt;
      line-height: 1.35;
      color: #334155;
      margin-bottom: 4px;
    }
    .vocab-term {
      font-weight: 800;
      color: #1e3a8a;
    }

    /* Bottom Quick Retrieval Strip */
    .retrieval-strip {
      background: #f8fafc;
      border: 1.5px solid #0f172a;
      border-radius: 5px;
      padding: 8px 12px;
      margin-top: auto;
    }
    .retrieval-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 6px;
    }
    .retrieval-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .retrieval-tagline {
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
    }
    .retrieval-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 16px;
    }
    .retrieval-q-item {
      font-size: 8.0pt;
      line-height: 1.35;
      color: #1e293b;
    }
    .retrieval-q-num {
      font-weight: 800;
      color: #1e3a8a;
    }
    .retrieval-options {
      color: #64748b;
      font-size: 7.2pt;
      margin-top: 1.5px;
    }
  </style>
</head>
<body>

  <!-- VERSO: PAGE 4 -->
  <div class="page" id="page-4">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span>Enquiry 01 • Part I &nbsp;|&nbsp; Page 4</span>
    </div>

    <div class="verso-banner">
      <span class="enquiry-pill">ENQUIRY 01 • SEPTEMBER 1939</span>
      <h2 class="enquiry-title">${l1.title.replace(/^Enquiry \d+:\s*/i, '')}</h2>
      <div class="enquiry-subtitle">${l1.subtitle}</div>
      <div class="enquiry-question-card">
        <span class="enquiry-question-label">Key Enquiry Question:</span>
        <span class="enquiry-question-text">&ldquo;${l1.enquiryQuestion}&rdquo;</span>
      </div>
    </div>

    <div class="verso-content-grid">
      <!-- Left Column: Act 1 Narrative -->
      <div>
        <div class="act-header" style="margin-top: 0;">
          <span class="act-ref-pill">Ref [1.1–1.2]</span>
          <span>${l1.narrative_blocks[0].title}</span>
        </div>
        <p class="prose-text">${l1.narrative_blocks[0].text.replace(/<span class="para-ref">.*?<\/span>\s*/g, '')}</p>
      </div>

      <!-- Right Column: Source A + Think & Discuss -->
      <div>
        <div class="source-card">
          <div class="source-header-row">
            <span class="source-letter-tag">Source A</span>
            <span class="source-type-tag">Primary Photograph (1939)</span>
          </div>
          <div class="source-img-wrap">
            <img class="source-img" src="${imgA || ''}" alt="Gas masks drill">
          </div>
          <p class="source-caption">${sourceA.caption}</p>
          <div class="source-citation">${sourceA.citation}</div>
        </div>

        <div class="discuss-card">
          <div class="discuss-header">
            <span>🗣️ Think &amp; Discuss • Classroom Hinge Question</span>
          </div>
          <div class="discuss-hinge">${sourceA.hinge_question}</div>
          <ul class="discuss-pointers">
            ${(sourceA.discussion_ideas || []).map((d) => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 MASTER CLASSROOM TEXTBOOK</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- RECTO: PAGE 5 -->
  <div class="page" id="page-5">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span>Enquiry 01 • Part II &nbsp;|&nbsp; Page 5</span>
    </div>

    <div class="recto-banner">
      <span class="recto-mechanism-pill">DECISIVE MECHANISM: TOTAL CIVILIAN MOBILISATION</span>
      <span style="font-size: 7.2pt; color: #64748b; font-weight: 700;">THE BRITISH HOME FRONT</span>
    </div>

    <div class="recto-content-grid">
      <!-- Left Column: Act 2 & Act 3 Narrative -->
      <div>
        <div class="act-header" style="margin-top: 0;">
          <span class="act-ref-pill">Ref [1.3–1.4]</span>
          <span>${l1.narrative_blocks[1].title}</span>
        </div>
        <p class="prose-text">${l1.narrative_blocks[1].text.replace(/<span class="para-ref">.*?<\/span>\s*/g, '')}</p>

        <div class="act-header">
          <span class="act-ref-pill">Ref [1.5–1.6]</span>
          <span>${l1.narrative_blocks[2].title}</span>
        </div>
        <p class="prose-text">${l1.narrative_blocks[2].text.replace(/<span class="para-ref">.*?<\/span>\s*/g, '')}</p>
      </div>

      <!-- Right Column: Source B / Artifact + Key Vocab -->
      <div>
        <div class="source-card">
          <div class="source-header-row">
            <span class="source-letter-tag">Source B</span>
            <span class="source-type-tag">Primary Artifact (1939)</span>
          </div>
          <div class="source-img-wrap" style="height: 52mm;">
            <img class="source-img" src="${imgB || ''}" alt="Gas mask box">
          </div>
          <p class="source-caption">The standard cardboard gas mask box with string carrying strap, carried everywhere by British civilians.</p>
          <div class="source-citation">Imperial War Museum Collection • Primary Home Front Artifact</div>
        </div>

        <div class="vocab-box">
          <div class="vocab-title">
            <span>📖 Key Enquiry Vocabulary</span>
          </div>
          ${l1.vocab
            .map(
              (v) => `
            <div class="vocab-item">
              <span class="vocab-term">${v.term}:</span> ${v.definition}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </div>

    <!-- Quick Retrieval Strip Across Bottom -->
    <div class="retrieval-strip">
      <div class="retrieval-header-row">
        <span class="retrieval-title">Check Your Understanding • Quick Retrieval</span>
        <span class="retrieval-tagline">Test recall with a partner • Answers verified in narrative above</span>
      </div>
      <div class="retrieval-grid">
        ${l1.quiz
          .map(
            (q, idx) => `
          <div class="retrieval-q-item">
            <span class="retrieval-q-num">Q${idx + 1}.</span> <strong>${q.q}</strong>
            <div class="retrieval-options">
              ${q.options.map((opt, oIdx) => `[${String.fromCharCode(65 + oIdx)}] ${opt}`).join(' &nbsp;•&nbsp; ')}
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="running-footer">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 MASTER CLASSROOM TEXTBOOK</span>
      <span>Page 5</span>
    </div>
  </div>

</body>
</html>`;

fs.writeFileSync(path.join(ROOT_DIR, 'scratch', 'test_ks2_spread.html'), html);
console.log('Saved spread prototype to scratch/test_ks2_spread.html');

(async () => {
  const chromePath = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ].find((p) => fs.existsSync(p));

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2400 });
  await page.goto(
    'file:///' + path.join(ROOT_DIR, 'scratch', 'test_ks2_spread.html').replace(/\\/g, '/'),
    { waitUntil: 'networkidle0' },
  );

  const p4Metrics = await page.evaluate(() => {
    const el = document.getElementById('page-4');
    return {
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      overflow: el.scrollHeight - el.clientHeight,
    };
  });
  const p5Metrics = await page.evaluate(() => {
    const el = document.getElementById('page-5');
    return {
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      overflow: el.scrollHeight - el.clientHeight,
    };
  });

  console.log('Page 4 (Verso) Metrics:', p4Metrics);
  console.log('Page 5 (Recto) Metrics:', p5Metrics);

  await page.screenshot({
    path: path.join(ROOT_DIR, 'scratch', 'test_ks2_spread.png'),
    fullPage: true,
  });
  console.log('Saved screenshot to scratch/test_ks2_spread.png');

  await browser.close();
})();
