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
  <title>KS2 WWII Enquiry 1 Spread Balanced</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { margin: 0; padding: 0; background: #64748b; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; gap: 20px; align-items: center; }
    
    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      padding: 10mm 14mm 8mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    }

    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2.5px;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7pt;
      color: #64748b;
    }

    /* Common Typography */
    .prose-text {
      font-family: 'Lora', Georgia, serif;
      font-size: 11.2pt;
      line-height: 1.50;
      color: #1e293b;
      text-align: justify;
      margin: 0 0 6px 0;
    }
    .prose-text strong {
      color: #0f172a;
      font-weight: 700;
    }

    .act-header {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin: 4px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .act-ref-pill {
      background: #0f172a;
      color: #fff;
      font-size: 6.8pt;
      padding: 1px 4.5px;
      border-radius: 2px;
      font-weight: 800;
    }

    /* Verso (Left Page) Specifics */
    .verso-banner {
      margin-bottom: 5px;
    }
    .enquiry-pill {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 2.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 2px;
    }
    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 14pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.15;
    }
    .enquiry-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-style: italic;
      color: #475569;
      margin: 0 0 4px 0;
    }
    .enquiry-question-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 3.5px solid #1e3a8a;
      padding: 3.5px 8px;
      border-radius: 3px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .enquiry-question-label {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }
    .enquiry-question-text {
      font-family: 'Playfair Display', serif;
      font-size: 8.8pt;
      font-style: italic;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    /* 2-Column Content Grid */
    .content-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      flex: 1;
    }

    /* Primary Source Card */
    .source-card {
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      background: #f8fafc;
      padding: 5px;
      margin-bottom: 5px;
    }
    .source-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5px;
    }
    .source-letter-tag {
      background: #0f172a;
      color: #fff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1px 4.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .source-type-tag {
      font-size: 6.5pt;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
    }
    .source-img-wrap {
      width: 100%;
      height: 42mm;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 3px;
      background: #e2e8f0;
    }
    .source-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .source-caption {
      font-size: 6.8pt;
      line-height: 1.3;
      color: #334155;
      font-style: italic;
      margin: 0;
    }
    .source-citation {
      font-size: 6.2pt;
      color: #64748b;
      font-style: normal;
      margin-top: 1px;
    }

    /* Think & Discuss Card */
    .discuss-card {
      background: #fefce8;
      border: 1.5px solid #fef08a;
      border-left: 3.5px solid #ca8a04;
      border-radius: 3.5px;
      padding: 5px 8px;
      margin-top: 3px;
    }
    .discuss-header {
      font-size: 7.2pt;
      font-weight: 800;
      color: #854d0e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 2.5px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .discuss-hinge {
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      font-weight: 700;
      color: #713f12;
      line-height: 1.3;
      margin: 0 0 4px 0;
    }
    .discuss-pointers {
      margin: 0;
      padding-left: 14px;
      font-size: 7pt;
      line-height: 1.32;
      color: #854d0e;
    }
    .discuss-pointers li {
      margin-bottom: 1.5px;
    }

    /* Recto Specifics */
    .recto-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3.5px;
      margin-bottom: 8px;
    }
    .recto-mechanism-pill {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Vocabulary Box */
    .vocab-box {
      border: 1.5px solid #e2e8f0;
      border-radius: 4px;
      background: #fdfbf7;
      padding: 8px 10px;
      margin-bottom: 6px;
    }
    .vocab-title {
      font-size: 7.2pt;
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
      border-radius: 4px;
      padding: 7px 11px;
      margin-top: 8px;
    }
    .retrieval-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
    }
    .retrieval-title {
      font-size: 7.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .retrieval-tagline {
      font-size: 6.6pt;
      color: #64748b;
      font-weight: 600;
    }
    .retrieval-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 14px;
    }
    .retrieval-q-item {
      font-size: 7.8pt;
      line-height: 1.32;
      color: #1e293b;
    }
    .retrieval-q-num {
      font-weight: 800;
      color: #1e3a8a;
    }
    .retrieval-options {
      color: #64748b;
      font-size: 7pt;
      margin-top: 1px;
    }
  </style>
</head>
<body>

  <!-- VERSO: PAGE 4 (ACT 1 + ACT 2 + SOURCE A + THINK & DISCUSS) -->
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

    <div class="content-grid-2col">
      <!-- Col 1: Act 1 Prose + Source A -->
      <div>
        <div class="act-header" style="margin-top: 0;">
          <span class="act-ref-pill">Ref [1.1–1.2]</span>
          <span>${l1.narrative_blocks[0].title}</span>
        </div>
        <p class="prose-text">${l1.narrative_blocks[0].text.replace(/<span class="para-ref">.*?<\/span>\s*/g, '')}</p>

        <!-- Primary Source Card in Col 1 -->
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
      </div>

      <!-- Col 2: Act 2 Prose + Think & Discuss -->
      <div>
        <div class="act-header" style="margin-top: 0;">
          <span class="act-ref-pill">Ref [1.3–1.4]</span>
          <span>${l1.narrative_blocks[1].title}</span>
        </div>
        <p class="prose-text">${l1.narrative_blocks[1].text.replace(/<span class="para-ref">.*?<\/span>\s*/g, '')}</p>

        <!-- Think & Discuss Card in Col 2 -->
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

  <!-- RECTO: PAGE 5 (ACT 3 + SOURCE B + VOCABULARY + RETRIEVAL QUIZ) -->
  <div class="page" id="page-5">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span>Enquiry 01 • Part II &nbsp;|&nbsp; Page 5</span>
    </div>

    <div class="recto-banner">
      <span class="recto-mechanism-pill">DECISIVE HISTORICAL MECHANISM: TOTAL CIVILIAN MOBILISATION</span>
      <span style="font-size: 7.2pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase;">The British Home Front (1939)</span>
    </div>

    <div class="content-grid-2col">
      <!-- Col 1: Act 3 Prose + Primary Artifact B -->
      <div>
        <div class="act-header" style="margin-top: 0;">
          <span class="act-ref-pill">Ref [1.5–1.6]</span>
          <span>${l1.narrative_blocks[2].title}</span>
        </div>
        <p class="prose-text">${l1.narrative_blocks[2].text.replace(/<span class="para-ref">.*?<\/span>\s*/g, '')}</p>

        <!-- Primary Artifact B -->
        <div class="source-card">
          <div class="source-header-row">
            <span class="source-letter-tag">Source B</span>
            <span class="source-type-tag">Primary Artifact (1939)</span>
          </div>
          <div class="source-img-wrap" style="height: 48mm;">
            <img class="source-img" src="${imgB || ''}" alt="Gas mask box">
          </div>
          <p class="source-caption">The standard cardboard gas mask box with string carrying strap, carried everywhere by British civilians.</p>
          <div class="source-citation">Imperial War Museum Collection • Primary Home Front Artifact</div>
        </div>
      </div>

      <!-- Col 2: Key Vocabulary + Historical Context Card -->
      <div>
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

        <div style="background: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 4px; padding: 7px 9px; font-size: 7.5pt; line-height: 1.4; color: #334155;">
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 7pt; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Home Front Historical Context</strong>
          During the autumn of 1939, over 1.4 million civilian volunteers joined Air Raid Precautions (ARP) services. ARP wardens patrolled in pitch-black conditions, armed with whistles and rattles, ensuring no light guided enemy aircraft.
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

fs.writeFileSync(path.join(ROOT_DIR, 'scratch', 'test_ks2_spread_balanced.html'), html);
console.log('Saved balanced spread prototype to scratch/test_ks2_spread_balanced.html');

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
    'file:///' +
      path.join(ROOT_DIR, 'scratch', 'test_ks2_spread_balanced.html').replace(/\\/g, '/'),
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
    path: path.join(ROOT_DIR, 'scratch', 'test_ks2_spread_balanced.png'),
    fullPage: true,
  });
  console.log('Saved screenshot to scratch/test_ks2_spread_balanced.png');

  await browser.close();
})();
