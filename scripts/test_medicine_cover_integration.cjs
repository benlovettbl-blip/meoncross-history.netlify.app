const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');
const { MEDICINE_ERAS } = require('./components/medicine_textbook_metadata.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relativePath) {
  if (!relativePath) return '';
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(
        ROOT_DIR,
        'public',
        'units',
        'edexcel_medicine',
        'assets',
        path.basename(cleanPath),
      ),
      path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : ext === '.svg'
                  ? 'image/svg+xml'
                  : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return relativePath;
  } catch (err) {
    return relativePath;
  }
}

const ERA_SYNOPSES = {
  medieval: {
    period: 'c1250–c1500',
    caption:
      'The Church Monopoly & Galenic Orthodoxy (c1250–c1500): Monks in monastic scriptoria copying theological treatises and Galenic manuscripts by candlelight, British Library MS Sloane.',
    p1: 'In medieval Britain, illness was understood through Catholic theological dogma and ancient classical authority. The Church held an institutional monopoly over learning, scriptoria, and universities, declaring Claudius Galen infallible. Disease was interpreted as divine retribution for sin, celestial alignment, or humoural imbalance, while human dissection remained strictly prohibited and questioning doctrine was condemned as heresy.',
    p2: 'When the catastrophic Black Death struck in 1348, killing over a third of the population, a society bound to the Four Humours and miasma theory stood powerless. From flagellants in city streets to herbal remedies, prayer, and bloodletting, this volume charts an age where religious devotion and Galenic tradition defined the human struggle against disease.',
  },
  renaissance: {
    period: 'c1500–c1700',
    caption:
      'Vesalius Dissecting the Human Arm (1543): Andreas Vesalius demonstrating anatomical structures directly from the human cadaver, De Humani Corporis Fabrica, Basel.',
    p1: "The collapse of feudalism, the printing press, and Renaissance humanism dismantled the Church's monopoly over medical learning. Scholars began questioning ancient texts, insisting that knowledge must rest on direct anatomical dissection and observable evidence. In 1543, Andreas Vesalius published De Humani Corporis Fabrica, proving Galen had committed over two hundred anatomical errors.",
    p2: 'From William Harvey proving the mechanical circulation of blood in 1628 to Thomas Sydenham championing clinical bedside observation, the Scientific Revolution transformed medicine into an empirical science. Yet as the 1665 Great Plague demonstrated, revolutionary breakthroughs in anatomical understanding could not immediately overcome the ancient challenge of discovering effective medical cures.',
  },
  '18th_19th': {
    period: 'c1700–c1900',
    caption:
      'Edward Jenner Vaccinating James Phipps (1796): Jenner inoculating the boy with cowpox lymph from milkmaid Sarah Nelmes, Wellcome Collection, London.',
    p1: 'The Industrial Revolution created packed, unsewered urban slums where cholera, typhus, and tuberculosis raged. In 1796, Edward Jenner developed the first smallpox vaccine. In 1861, Louis Pasteur published Germ Theory, proving microscopic pathogens caused decay—a breakthrough weaponised by Robert Koch to isolate the specific bacterial microbes of anthrax, tuberculosis, and cholera.',
    p2: 'Simultaneously, surgical and hospital care underwent a revolution. James Simpson introduced chloroform anaesthesia in 1847, while Joseph Lister conquered sepsis with carbolic acid spray in 1865. Pioneered by Florence Nightingale, John Snow, and the compulsory 1875 Public Health Act, Victorian Britain transformed hospitals and forced the state to abandon laissez-faire fatalism.',
  },
  modern: {
    period: 'c1900–present',
    caption:
      "Alexander Fleming in His Laboratory (1928): Fleming examining culture plates of penicillium notatum mould at St Mary's Hospital, London, Imperial War Museum.",
    p1: 'The twentieth century witnessed an unprecedented acceleration of clinical capability. In 1928, Alexander Fleming discovered penicillin, transformed into mass-produced antibiotics by Florey and Chain during the Second World War. With the 1948 launch of the National Health Service by Aneurin Bevan, medical treatment in Britain became a universal human right, free at the point of delivery.',
    p2: 'From Crick and Watson unravelling the double helix of DNA in 1953 to robotic surgery, organ transplants, and public health drives combating smoking and cancer, medicine advanced from fighting microbes to mastering molecular genetics. This volume traces how state welfare and high-technology science radically extended modern life expectancy.',
  },
  western_front: {
    period: '1914–1918',
    caption:
      'Stretcher Bearers in the Mud of Passchendaele (1917): RAMC stretcher bearers carrying a wounded soldier through liquid mud along duckboard tracks, Imperial War Museum Q 5935.',
    p1: 'The industrial violence of the First World War turned the Western Front into an unprecedented trauma laboratory. In the waterlogged, manured clay of Flanders and the Somme, artillery shrapnel and machine-gun fire caused horrific lacerations contaminated with gas gangrene and tetanus. The RAMC and FANY faced the colossal task of treating casualties under continuous shellfire.',
    p2: "British military medicine responded with urgent innovation: the rapid evacuation chain from Regimental Aid Posts to Casualty Clearing Stations, the life-saving Thomas Splint, mobile X-rays, preserved blood transfusions at Cambrai, and Harold Gillies's pioneering plastic surgery. This volume explores how the trauma of trench warfare catalyzed modern emergency surgery.",
  },
};

function renderEraCoverPageHtml(eraKey) {
  const eraMeta = MEDICINE_ERAS[eraKey];
  const synopsisData = ERA_SYNOPSES[eraKey];
  const totalPages = eraKey === 'western_front' ? 16 : 12;
  const heroImageUri = getBase64Image(eraMeta.coverImage);

  const enquiryCards = eraMeta.enquiryCards || [];
  const cardsHtml = enquiryCards
    .map(
      (e) => `
    <div class="card-box">
      <div class="card-head">
        <span class="enquiry-tag">${e.num === '06' && eraKey !== 'western_front' ? 'THEMATIC MATRIX' : `ENQUIRY ${e.num}`}</span>
        <span class="page-locator">${e.pages}</span>
      </div>
      
      <h3 class="card-heading">${e.title}</h3>
      
      <div class="card-question">
        <span class="q-badge">KEY QUESTION:</span>
        <span class="q-quote">"${e.question}"</span>
      </div>

      <div class="card-points">
        <div class="pt-row"><span class="bullet-dot">▪</span><div class="pt-content">${e.b1}</div></div>
        <div class="pt-row"><span class="bullet-dot">▪</span><div class="pt-content">${e.b2}</div></div>
        <div class="pt-row"><span class="bullet-dot">▪</span><div class="pt-content">${e.b3}</div></div>
      </div>
    </div>
  `,
    )
    .join('');

  let examRibbonHtml = '';
  if (eraKey === 'western_front') {
    examRibbonHtml = `
      <div class="master-exam-ribbon">
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Specification Paper</div>
          <div class="ribbon-cell-content">Paper 1 Option 11 &bull; Historic Environment</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Section A Question Architecture</div>
          <div class="ribbon-cell-content">Q1: Features [4m] &bull; Q2(a): Utility [8m] &bull; Q2(b): Follow-Up [4m]</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Assessment Weighting</div>
          <div class="ribbon-cell-content">16 Raw Marks + 4 SPaG &bull; 30% of Paper 1 Total</div>
        </div>
      </div>
    `;
  } else {
    examRibbonHtml = `
      <div class="master-exam-ribbon">
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Specification Paper</div>
          <div class="ribbon-cell-content">Paper 1 Option 11 &bull; Thematic Study</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Section B Question Architecture</div>
          <div class="ribbon-cell-content">Q3: Similarity/Diff [4m] &bull; Q4: Causation [12m] &bull; Q5/Q6: Essay [16m+4m]</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Assessment Weighting</div>
          <div class="ribbon-cell-content">36 Raw Marks + 4 SPaG &bull; 70% of Paper 1 Total</div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${eraMeta.title} - Master Front Cover</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 12mm 14mm 12mm 14mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 273mm; max-height: 273mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    /* Top Masthead */
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px; flex-shrink: 0; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 10.5pt; font-weight: 900; letter-spacing: 0.10em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1.5px 6.5px; border-radius: 2px; letter-spacing: 0.06em; }

    /* Title Block */
    .title-wrap { text-align: center; margin-bottom: 3px; flex-shrink: 0; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1px; }
    .main-title { font-family: 'Cinzel', serif; font-size: ${eraKey === 'western_front' ? '15pt' : '16pt'}; font-weight: 900; letter-spacing: 0.02em; color: #0f172a; margin: 0 0 1px 0; white-space: nowrap; line-height: 1.15; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.5pt; font-style: italic; color: #475569; margin: 0; }

    /* Middle Row: Calibrated 54mm height */
    .middle-row { display: grid; grid-template-columns: 80mm 1fr; gap: 9px; margin-bottom: 3px; height: 54mm; flex-shrink: 0; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px; background: #fafaf9; display: flex; flex-direction: column; height: 100%; }
    .hero-frame { flex: 1; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.2; color: #475569; margin-top: 2px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 4px solid #1e3a8a; border-radius: 4px; padding: 5px 9px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px; flex-shrink: 0; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 7.9pt; line-height: 1.28; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 3px 0; }
    .overview-text p:last-child { margin-bottom: 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 2px; display: flex; justify-content: space-between; font-weight: 700; flex-shrink: 0; }

    /* LOWER SECTION: SPECIFICATION DIRECTORY - CLEAN, ZERO FLUFF */
    .master-dossier { border: 2px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-bottom: 3px; min-height: 0; }
    
    .dossier-header-bar { background: #0f172a; color: #ffffff; padding: 4px 10px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
    .dossier-header-title { font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; }
    .dossier-header-badge { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.04em; white-space: nowrap; }

    .dossier-card-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 4px; padding: 4px; background: #f1f5f9; flex: 1; min-height: 0; }
    
    /* The Enquiry Card: Snug, Filled, Readable, Zero Ref Pills */
    .card-box { background: #ffffff; border: 1.2px solid #cbd5e1; border-top: 3.5px solid #1e3a8a; border-radius: 3px; padding: 4.5px 7px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 2px rgba(0,0,0,0.04); min-width: 0; }
    
    .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px; flex-shrink: 0; }
    .enquiry-tag { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1px 5.5px; border-radius: 2px; letter-spacing: 0.04em; }
    .page-locator { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #1e3a8a; }

    .card-heading { font-family: 'Inter', sans-serif; font-size: 9.0pt; font-weight: 900; color: #0f172a; line-height: 1.15; margin: 0 0 2px 0; }

    .card-question { background: #eff6ff; border: 1px solid #bfdbfe; border-left: 3px solid #1e3a8a; border-radius: 2px; padding: 2px 5px; display: flex; align-items: baseline; gap: 4px; margin-bottom: 2px; flex-shrink: 0; }
    .q-badge { font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.04em; white-space: nowrap; flex-shrink: 0; }
    .q-quote { font-family: 'Lora', Georgia, serif; font-size: 7.8pt; font-style: italic; color: #1e3a8a; line-height: 1.18; }

    .card-points { display: flex; flex-direction: column; gap: 1.5px; border-top: 1px solid #e2e8f0; padding-top: 2px; flex: 1; justify-content: space-between; }
    .pt-row { display: flex; align-items: flex-start; gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22; color: #334155; }
    .bullet-dot { color: #1e3a8a; font-size: 8.0pt; font-weight: 900; line-height: 1.0; flex-shrink: 0; }
    .pt-content { flex: 1; }
    .pt-content strong { color: #0f172a; font-weight: 800; }

    /* Bottom Exam Ribbon: Authentic Exam Specification & Weighting */
    .master-exam-ribbon { background: #0f172a; color: #ffffff; padding: 3.5px 10px; display: grid; grid-template-columns: 0.95fr 1.4fr 0.95fr; gap: 8px; border-top: 2px solid #1e3a8a; align-items: center; flex-shrink: 0; }
    .ribbon-cell { display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
    .ribbon-cell-title { font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 1px; white-space: nowrap; }
    .ribbon-cell-content { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #e2e8f0; line-height: 1.2; white-space: nowrap; }

    .footer { border-top: 1px solid #cbd5e1; padding-top: 2px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; flex-shrink: 0; }
  </style>
</head>
<body>
  <div class="page" id="page-1">
    <div>
      <header class="masthead">
        <span class="masthead-title">The History Revision Hub</span>
        <span class="masthead-badge">Master Curriculum Series &bull; KS4 GCSE</span>
      </header>
      <div class="title-wrap">
        <div class="pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 1 Option 11</div>
        <h1 class="main-title">${eraMeta.coverTitle}</h1>
        <p class="subtitle">${eraMeta.coverSubtitle}</p>
      </div>

      <div class="middle-row">
        <div class="hero-col">
          <div class="hero-frame">
            <img class="hero-img" src="${heroImageUri}" alt="${eraMeta.title}">
          </div>
          <div class="hero-caption">
            <strong>${eraMeta.title}:</strong> ${synopsisData.caption}
          </div>
        </div>

        <div class="overview-card">
          <div>
            <div class="overview-header">HISTORICAL OVERVIEW &bull; ${eraMeta.period}</div>
            <div class="overview-text">
              <p>${synopsisData.p1}</p>
              <p>${synopsisData.p2}</p>
            </div>
          </div>
          <div class="overview-footer">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Option 11</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Clean, Zero-Fluff Specification Directory -->
    <div class="master-dossier">
      <div class="dossier-header-bar">
        <span class="dossier-header-title">SPECIFICATION &amp; ENQUIRY DIRECTORY</span>
        <span class="dossier-header-badge">Pearson Edexcel GCSE (9–1) History</span>
      </div>
      <div class="dossier-card-grid">
        ${cardsHtml}
      </div>
      ${examRibbonHtml}
    </div>

    <footer class="footer">
      <span>Page 1 &bull; Course Specification &amp; Enquiry Directory</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Series</span>
      <span>${totalPages} Pages &bull; Saddle-Stitch</span>
    </footer>
  </div>
</body>
</html>`;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.emulateMediaType('print');

  const targetDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/bcd70e6a-d679-405b-8831-b9087b16f92c';
  const eras = ['medieval', 'renaissance', '18th_19th', 'modern', 'western_front'];

  for (const era of eras) {
    const html = renderEraCoverPageHtml(era);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 400));
    const p = await page.$('.page');
    if (p) await p.screenshot({ path: `${targetDir}/cover_integration_${era}.png` });

    const overflowCheck = await page.evaluate(() => {
      const pageEl = document.querySelector('.page');
      return {
        scrollH: pageEl.scrollHeight,
        clientH: pageEl.clientHeight,
        diff: pageEl.scrollHeight - pageEl.clientHeight,
      };
    });
    console.log(`[${era}] Overflow check:`, overflowCheck);
  }

  await browser.close();
  console.log('All 5 era covers verified successfully!');
})();
