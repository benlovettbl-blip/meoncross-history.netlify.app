const fs = require('fs');
const puppeteer = require('puppeteer');
const { MEDICINE_ERAS } = require('./components/medicine_textbook_metadata.cjs');

function getBase64Image(relativePath) {
  try {
    const fullPath = require('path').resolve(__dirname, '..', relativePath);
    if (!fs.existsSync(fullPath)) return '';
    const ext = require('path').extname(fullPath).toLowerCase().replace('.', '');
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
  } catch (e) {
    return '';
  }
}

function renderMasterCoverProposal() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The Theatre of War: British Sector & Trench Terrain',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      part1: 'The Ypres Salient, Arras Quarry Tunnels & Somme Frontage',
      part2: 'Trench System Anatomy, Defensive Geometry & Evacuation Access',
      question: 'How did trench architecture and battlefield terrain dictate surgical survival?',
      tags: ['Ypres Salient Vulnerability', 'Arras Underground Caves', 'Passchendaele Liquid Mud'],
    },
    {
      num: '02',
      title: 'The Trench Environment: Mud & Non-Combat Illness',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      part1: 'Waterlogged Trenches, Trench Foot & Whale Oil Inspection Regimes',
      part2: 'Louse-Borne Trench Fever, Vermin & NYDN Shell Shock Psychology',
      question: 'How did physical conditions and vermin create widespread medical crises?',
      tags: ['Trench Foot & Gangrene', 'Trench Fever (Body Lice)', 'Shell Shock (Salmon Protocol)'],
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Gas & Infection',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      part1: 'High-Explosive Shell Blast Ballistics & Mutilating Shrapnel Wounds',
      part2: 'Manured Soil Microbiology (Gas Gangrene/Tetanus) & Poison Gas Weapons',
      question: 'Why did industrialised weaponry and agricultural soil induce fatal sepsis?',
      tags: [
        'Gas Gangrene (Clostridium)',
        'Chlorine / Phosgene / Mustard',
        'Brodie Helmets (1915)',
      ],
    },
    {
      num: '04',
      title: 'The Chain of Evacuation: Stretcher Bearers to CCS',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      part1: 'Stretcher Relays, Regimental Aid Posts & Field Dressing Stations',
      part2: 'Casualty Clearing Stations (CCS Triage) & Base Hospital Transit',
      question:
        'How did the evacuation chain operate as a race against the 12-hour surgical window?',
      tags: ['Stretcher Bearer Relays', 'CCS Emergency Surgery', 'Hospital Trains & Canal Barges'],
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint & Wound Sepsis',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      part1: 'Compound Femur Fractures & The Hugh Owen Thomas Traction Splint',
      part2: 'Carrel-Dakin Continuous Irrigation, Radical Debridement & Mobile Radiography',
      question:
        'How did mechanical traction and antiseptic irrigation revolutionize frontline trauma?',
      tags: ['Thomas Splint (80% → 20% Mortality)', 'Carrel-Dakin Irrigation', 'Mobile X-Ray Vans'],
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      part1: 'Sodium Citrate Anti-Coagulation & Robertson’s 1917 Cambrai Blood Depot',
      part2: 'Harvey Cushing Cranial Decompression & Gillies Plastic Pedicle Reconstruction',
      question:
        'How did catastrophic facial and cranial trauma compel long-term clinical revolutions?',
      tags: [
        'Robertson 1917 Blood Depot',
        'Cushing Magnet Cranial Surgery',
        'Harold Gillies Tube Pedicles',
      ],
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="toc-card">
      <div class="toc-head">
        <span class="toc-badge">ENQUIRY ${e.num}</span>
        <span class="toc-loc">${e.pages} &bull; ${e.ref}</span>
      </div>
      <div class="toc-title">${e.title}</div>
      <div class="toc-parts">
        <div class="toc-part"><span class="part-pill">Part I:</span> <span class="part-txt">${e.part1}</span></div>
        <div class="toc-part"><span class="part-pill">Part II:</span> <span class="part-txt">${e.part2}</span></div>
      </div>
      <div class="toc-q">
        <span class="q-label">KEY QUESTION:</span> <em>"${e.question}"</em>
      </div>
      <div class="toc-tags">
        ${e.tags.map((t) => `<span class="spec-pill">▪ ${t}</span>`).join(' ')}
      </div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Master Cover Redesign - Executive Course Directory</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 12mm 14mm 12mm 14mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 273mm; max-height: 273mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 9.5pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1.5px 6px; border-radius: 2px; }

    .title-wrap { text-align: center; margin-bottom: 5px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 15.2pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 1px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.2pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 1.05fr 1fr; gap: 9px; margin-bottom: 5px; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 60mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 7px 11px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2.5px; margin-bottom: 3.5px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 8.8pt; line-height: 1.38; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 4.5px 0; }

    /* COURSE DIRECTORY & SPECIFICATION BLUEPRINT */
    .directory-box { border: 1.5px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 3px; }
    .directory-header { background: #0f172a; color: #ffffff; padding: 4px 10px; display: flex; justify-content: space-between; align-items: center; }
    .directory-title { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
    .directory-tag { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .directory-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5.5px; padding: 5.5px; background: #f8fafc; flex: 1; }
    
    .toc-card { background: #ffffff; border: 1px solid #cbd5e1; border-top: 2.5px solid #1e3a8a; border-radius: 3px; padding: 4.5px 7px; display: flex; flex-direction: column; justify-content: space-between; }
    .toc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5px; }
    .toc-badge { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 0.5px 4px; border-radius: 2px; letter-spacing: 0.04em; }
    .toc-loc { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #64748b; }
    .toc-title { font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 800; color: #0f172a; line-height: 1.15; margin-bottom: 2px; }
    
    .toc-parts { border-left: 2px solid #cbd5e1; padding-left: 4px; margin-bottom: 2px; }
    .toc-part { font-family: 'Inter', sans-serif; font-size: 5.7pt; line-height: 1.22; color: #334155; margin-bottom: 1px; }
    .part-pill { font-weight: 800; color: #1e3a8a; font-size: 5.5pt; text-transform: uppercase; }
    .part-txt { color: #334155; }

    .toc-q { font-family: 'Lora', Georgia, serif; font-size: 6.2pt; line-height: 1.2; color: #475569; background: #f1f5f9; padding: 2px 4px; border-radius: 2px; margin-bottom: 2px; }
    .q-label { font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.03em; margin-right: 2px; }

    .toc-tags { font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #475569; line-height: 1.2; }
    .spec-pill { margin-right: 5px; white-space: nowrap; color: #1e293b; font-weight: 600; }

    /* Bottom Exam Blueprint Ribbon */
    .exam-ribbon { background: #0f172a; color: #ffffff; padding: 4.5px 10px; display: grid; grid-template-columns: 1fr 1.6fr 1.3fr; gap: 8px; border-top: 1.5px solid #1e3a8a; }
    .ribbon-col { display: flex; flex-direction: column; justify-content: center; }
    .ribbon-head { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 1px; }
    .ribbon-body { font-family: 'Inter', sans-serif; font-size: 6.1pt; font-weight: 600; color: #e2e8f0; line-height: 1.2; }

    .footer { border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; margin-top: 3px; }
  </style>
</head>
<body>
  <div class="page">
    <div>
      <header class="masthead">
        <span class="masthead-title">The History Revision Hub</span>
        <span class="masthead-badge">Master Curriculum Series &bull; KS4 GCSE</span>
      </header>
      <div class="title-wrap">
        <div class="pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 1 Option 11</div>
        <h1 class="main-title">THE BRITISH SECTOR OF THE WESTERN FRONT (1914–1918)</h1>
        <p class="subtitle">Historic Environment: Trench Trauma, Evacuation &amp; Surgical Breakthroughs</p>
      </div>

      <div class="middle-row">
        <div class="hero-col">
          <div class="hero-frame">
            <img class="hero-img" src="${heroImg}" alt="Western Front">
          </div>
          <div class="hero-caption">
            <strong>The British Sector of the Western Front, 1914–1918:</strong> Stretcher Bearers in the Mud of Passchendaele (1917), Imperial War Museum Q 5935.
          </div>
        </div>

        <div class="overview-card">
          <div>
            <div class="overview-header">HISTORICAL OVERVIEW &bull; 1914–1918</div>
            <div class="overview-text">
              <p>The catastrophic industrial violence of the First World War turned the Western Front into an unprecedented trauma laboratory. In the waterlogged, heavily manured clay soils of Flanders and the Somme, high-velocity artillery shrapnel and machine-gun fire inflicted gruesome lacerations contaminated with deadly anaerobic bacteria, inducing gas gangrene, tetanus, and horrific shock.</p>
              <p>To survive, British military medicine pioneered revolutionary innovations: the rapid evacuation chain from Regimental Aid Posts to Casualty Clearing Stations, the life-saving Thomas Splint that slashed compound femur mortality from eighty to twenty percent, mobile X-ray units, preserved blood transfusions at Cambrai, and Harold Gillies’s pioneering plastic surgery.</p>
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 2.5px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Specification Backbone</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Redesigned Bottom Half: Executive Course Directory -->
    <div class="directory-box">
      <div class="directory-header">
        <span class="directory-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="directory-tag">Exact 1:1 Pearson Edexcel Paper 1 Curriculum Alignment</span>
      </div>
      <div class="directory-grid">
        ${cardsHtml}
      </div>
      <div class="exam-ribbon">
        <div class="ribbon-col">
          <div class="ribbon-head">Pearson Edexcel Blueprint</div>
          <div class="ribbon-body">Paper 1 Option 11: Section A (Historic Environment) &bull; 1HI0/11</div>
        </div>
        <div class="ribbon-col">
          <div class="ribbon-head">Section A Question Architecture</div>
          <div class="ribbon-body">Q1: Two Features [4m] &bull; Q2(a): Source Utility [8m] &bull; Q2(b): 4-Prompt Follow-Up [4m]</div>
        </div>
        <div class="ribbon-col">
          <div class="ribbon-head">Disciplinary Architecture</div>
          <div class="ribbon-body">100% Pure Historical Narrative &bull; Zero Inline Distractions &bull; Spaced Retrieval</div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <span>Page 1 &bull; Master Cover &amp; Course Architecture</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span>16 Pages &bull; Saddle-Stitch</span>
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

  await page.setContent(renderMasterCoverProposal(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p = await page.$('.page');
  if (p) await p.screenshot({ path: `${targetDir}/cover_proto_executive_directory.png` });
  console.log('Saved cover_proto_executive_directory.png');

  await browser.close();
})();
