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

function renderHighLegibilityCover() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The British Sector of the Western Front: Landscape & Trench Systems',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      part1: 'The Ypres Salient, Arras Quarry Tunnels & Somme Chalk Frontage',
      part2: 'Trench System Architecture, Zigzag Defensive Design & Evacuation Geography',
      question:
        'How did trench architecture and battlefield terrain dictate surgical survival rates?',
      bullets: [
        '<strong>Topography & Salient Hazard:</strong> German artillery observation from Passchendaele ridge; concentric bombardment.',
        "<strong>Subterranean Infrastructure:</strong> Underground chalk cavern hospitals at Arras (Thompson's Cave 700-bed facility).",
      ],
    },
    {
      num: '02',
      title: 'The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      part1: 'Waterlogged Clay, Constant Cold, Trench Foot & Whale Oil Inspection Regimes',
      part2: 'Body Lice Vectors, Trench Fever Pyrexia & Shell Shock (NYDN) Treatment Protocol',
      question:
        'How did the horrific physical conditions of the trenches produce mass medical casualties?',
      bullets: [
        '<strong>Pathologies of Trench Life:</strong> Trench Foot capillary constriction, gangrene risk, and louse-borne Trench Fever.',
        '<strong>Psychological Trauma:</strong> Shell Shock (NYDN), forward psychiatric care, and the Salmon Evacuation Protocol.',
      ],
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Infection & Poison Gas',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      part1: 'High-Explosive Shell Blast Ballistics, Massive Tissue Damage & Shrapnel Wounds',
      part2: 'Fertilised Manured Soil Microbiology (Gas Gangrene & Tetanus) & Chemical Warfare',
      question:
        'Why did industrialised weaponry and agricultural soil create uniquely lethal trauma?',
      bullets: [
        '<strong>Microbiology of Flanders Soil:</strong> Anaerobic clostridium perfringens causing explosive gas gangrene & tetanus.',
        '<strong>Chemical Weapons:</strong> Chlorine asphyxiation (1915), Phosgene lung edema, and blistering Mustard Gas (1917).',
      ],
    },
    {
      num: '04',
      title: 'The RAMC Chain of Evacuation: Stretcher Bearers to Base Hospitals',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      part1: 'Stretcher Relays, Regimental Aid Posts (RAP) & Advanced Dressing Stations (ADS)',
      part2: 'Casualty Clearing Stations (CCS Triage) & Base Hospital Evacuation Transport',
      question:
        'How did the RAMC evacuation chain operate as a race against the 12-hour surgical window?',
      bullets: [
        '<strong>Forward Relays & Triage:</strong> Stretcher bearer relays across Passchendaele mud; sorting priority cases at the CCS.',
        '<strong>Specialised Transit:</strong> Motor ambulance convoys, steam hospital trains, and smooth inland canal barges.',
      ],
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint, Antiseptics & Radiography',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      part1: 'Compound Femur Fractures & The Hugh Owen Thomas Traction Splint Innovation',
      part2: 'Carrel-Dakin Continuous Saline Irrigation, Wound Debridement & Mobile X-Rays',
      question:
        'How did mechanical traction and continuous antiseptic irrigation transform frontline survival?',
      bullets: [
        '<strong>Biomechanical Fixation:</strong> The Thomas Splint slashed compound femur mortality from 80% to under 20% by 1916.',
        '<strong>Wound Management:</strong> Deep surgical debridement, Carrel-Dakin hypochlorite flush, and mobile radiology vans.',
      ],
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Storage, Neurosurgery & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      part1: 'Sodium Citrate Anti-Coagulation & Oswald Robertson’s 1917 Cambrai Blood Depot',
      part2: 'Harvey Cushing Cranial Decompression & Harold Gillies Pedicle Flap Reconstruction',
      question:
        'How did catastrophic head and facial trauma compel long-term surgical revolutions?',
      bullets: [
        '<strong>Preserved Blood Banks:</strong> Citrate glucose preservation allowing forward blood depots for severe haemorrhagic shock.',
        '<strong>Reconstructive Surgery:</strong> Gillies’s "tube pedicle" vascular grafts at Sidcup restoring mangled facial anatomy.',
      ],
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="enquiry-card">
      <div class="card-header">
        <div class="card-badge-row">
          <span class="enquiry-badge">ENQUIRY ${e.num}</span>
          <span class="enquiry-loc">${e.pages} &bull; ${e.ref}</span>
        </div>
        <h3 class="enquiry-name">${e.title}</h3>
      </div>

      <div class="card-body">
        <div class="enquiry-parts">
          <div class="part-row"><span class="part-tag">PART I:</span> <span class="part-text">${e.part1}</span></div>
          <div class="part-row"><span class="part-tag">PART II:</span> <span class="part-text">${e.part2}</span></div>
        </div>

        <div class="enquiry-question-box">
          <span class="q-tag">KEY QUESTION</span>
          <p class="q-text">"${e.question}"</p>
        </div>

        <ul class="enquiry-bullets">
          ${e.bullets.map((b) => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Western Front Master Cover - High-Legibility Redesign</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 10mm 12mm 10mm 12mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 277mm; max-height: 277mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    /* Top Masthead */
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 10pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 7px; border-radius: 2px; }

    /* Title Block */
    .title-wrap { text-align: center; margin-bottom: 5px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 16.5pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.8pt; font-style: italic; color: #475569; margin: 0; }

    /* Middle Hero Row */
    .middle-row { display: grid; grid-template-columns: 86mm 1fr; gap: 10px; margin-bottom: 5px; }
    .hero-col { border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 62mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1.2px solid #cbd5e1; border-left: 4px solid #1e3a8a; border-radius: 4px; padding: 8px 12px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 9.2pt; line-height: 1.44; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 5px 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between; font-weight: 600; }

    /* REDESIGNED EXECUTIVE ENQUIRY DIRECTORY */
    .dossier-container { border: 1.8px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    
    .dossier-banner { background: #0f172a; color: #ffffff; padding: 4.5px 12px; display: flex; justify-content: space-between; align-items: center; }
    .dossier-title { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
    .dossier-badge { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 6px; background: #f8fafc; flex: 1; }
    
    /* Individual Enquiry Card: Solid, Snug, High-Legibility */
    .enquiry-card { background: #ffffff; border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 3px; padding: 6px 8px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    
    .card-badge-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
    .enquiry-badge { font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1.5px 5.5px; border-radius: 2px; letter-spacing: 0.05em; }
    .enquiry-loc { font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; color: #475569; }
    
    .enquiry-name { font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; color: #0f172a; line-height: 1.2; margin: 0; }
    
    .card-body { display: flex; flex-direction: column; gap: 3.5px; flex: 1; }

    .enquiry-parts { border-left: 2.5px solid #cbd5e1; padding-left: 5px; display: flex; flex-direction: column; gap: 1.5px; margin-top: 1px; }
    .part-row { font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.25; color: #334155; }
    .part-tag { font-weight: 900; color: #1e3a8a; font-size: 6.2pt; }
    .part-text { color: #334155; }

    .enquiry-question-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 2.5px; padding: 3px 6px; display: flex; align-items: baseline; gap: 5px; }
    .q-tag { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.04em; white-space: nowrap; flex-shrink: 0; }
    .q-text { font-family: 'Lora', Georgia, serif; font-size: 7.2pt; font-style: italic; color: #1e3a8a; margin: 0; line-height: 1.25; }

    .enquiry-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
    .enquiry-bullets li { font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.26; color: #334155; position: relative; padding-left: 8px; }
    .enquiry-bullets li:before { content: "▪"; position: absolute; left: 0; color: #1e3a8a; font-size: 7pt; line-height: 1; }
    .enquiry-bullets strong { color: #0f172a; font-weight: 700; }

    /* Bottom Exam Ribbon: High-Density & Professional */
    .exam-ribbon { background: #0f172a; color: #ffffff; padding: 5px 12px; display: grid; grid-template-columns: 1.1fr 1.6fr 1.3fr; gap: 10px; border-top: 2px solid #1e3a8a; }
    .ribbon-col { display: flex; flex-direction: column; justify-content: center; }
    .ribbon-head { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 1.5px; }
    .ribbon-body { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 600; color: #e2e8f0; line-height: 1.22; }

    .footer { border-top: 1.2px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; margin-top: 3px; }
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
          <div class="overview-footer">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Specification Backbone</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Redesigned High-Legibility Executive Enquiry Directory -->
    <div class="dossier-container">
      <div class="dossier-banner">
        <span class="dossier-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="dossier-badge">Exact 1:1 Pearson Edexcel Paper 1 Curriculum Alignment</span>
      </div>
      <div class="dossier-grid">
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

  await page.setContent(renderHighLegibilityCover(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p = await page.$('.page');
  if (p) await p.screenshot({ path: `${targetDir}/cover_proto_high_legibility.png` });
  console.log('Saved cover_proto_high_legibility.png');

  await browser.close();
})();
