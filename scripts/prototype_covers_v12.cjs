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

function renderCoverV12() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The Theatre of War: British Sector & Trench Systems',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      question: 'How did terrain and trench architecture dictate surgical survival?',
      b1: '<strong>Topography & Artillery:</strong> Passchendaele ridge German observation dominance; concentric artillery bombardment of Ypres Salient; chalk tunnel networks of Arras.',
      b2: '<strong>Trench Anatomy & Blast Containment:</strong> Zigzag communications trenches, frontline firebays, traverse parapets, and duckboard drainage sumps.',
      b3: "<strong>Subterranean Care:</strong> Thompson's Cave at Arras: bombproof 700-bed hospital with electric lighting, piped water & operating theatres.",
    },
    {
      num: '02',
      title: 'The Trench Environment: Mud, Vermin & Illnesses',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      question: 'How did physical conditions produce mass medical casualties?',
      b1: '<strong>Trench Foot & Gangrene:</strong> Freezing mud & blood constriction; prevented via mandatory daily whale oil rub inspections and buddy-system dry sock relays.',
      b2: '<strong>Vermin & Trench Fever:</strong> Body lice transmitting pyrexia managed via mobile delousing stations, fumigation wagons, and steam sterilizers.',
      b3: '<strong>Psychological Trauma:</strong> Shell Shock (NYDN) managed close to frontlines to prevent hospitalisation via the Charles Myers Salmon Protocol.',
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Infection & Gas',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      question: 'Why did industrialised weapons and soil induce fatal sepsis?',
      b1: '<strong>High-Explosive Shrapnel:</strong> Artillery blasting jagged casing metal and soiled uniform wool deep into flesh; Brodie helmets (1915) cutting head trauma by 75%.',
      b2: '<strong>Soil Microbiology & Gas Gangrene:</strong> Manured Flanders clay harboring lethal anaerobic bacteria (clostridium perfringens); urgent tetanus antitoxin.',
      b3: '<strong>Chemical Warfare:</strong> Chlorine gas asphyxiation (1915), Phosgene lung edema, and Mustard Gas chemical burns (1917); Small Box Respirators (1916).',
    },
    {
      num: '04',
      title: 'Chain of Evacuation: Stretcher Bearers to CCS Triage',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      question: 'How did the RAMC race against the 12-hour surgical window?',
      b1: '<strong>Forward Relays:</strong> Stretcher bearer relays (teams of 4–8 men) hauling casualties through waist-deep mud to Regimental Aid Posts and Dressing Stations.',
      b2: '<strong>CCS Triage & Immediate Surgery:</strong> Casualty Clearing Stations performing emergency operations within 12 hours to prevent septic peritonitis.',
      b3: '<strong>Specialised Transport:</strong> Motor ambulance convoys, heated multi-ward steam hospital trains, and smooth canal barge flotillas to coastal Base Hospitals.',
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint & Antiseptics',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      question: 'How did mechanical traction and wound irrigation save lives?',
      b1: '<strong>The Thomas Splint (1915):</strong> Rigid skeletal traction immobilizing compound femur fractures, slashing battlefield mortality from 80% to under 20%.',
      b2: '<strong>Carrel-Dakin Technique:</strong> Continuous sodium hypochlorite antiseptic irrigation flushing deep recesses; radical debridement of necrotic flesh.',
      b3: '<strong>Mobile Radiography:</strong> Vehicle-powered mobile X-ray vans locating shrapnel fragments and guided bullets before surgery.',
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      question: 'How did massive trauma compel modern surgical specialties?',
      b1: "<strong>Preserved Blood Transfusions:</strong> Sodium citrate & glucose storage allowing Oswald Robertson to build the world's first mobile blood depot at Cambrai (1917).",
      b2: '<strong>Brain Surgery:</strong> Harvey Cushing’s pioneered local anaesthesia techniques, silver clip haemostasis, and electromagnets extracting cranial shrapnel.',
      b3: '<strong>Plastic Reconstruction:</strong> Harold Gillies and the revolutionary "tube pedicle" vascular skin flap technique at Queen’s Hospital, Sidcup, restoring facial trauma.',
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="card-box">
      <div class="card-head">
        <div class="badge-cluster">
          <span class="enquiry-tag">ENQUIRY ${e.num}</span>
          <span class="page-locator">${e.pages}</span>
        </div>
        <span class="ref-tag">${e.ref}</span>
      </div>
      
      <h3 class="card-heading">${e.title}</h3>
      
      <div class="card-question">
        <span class="q-badge">CORE ENQUIRY:</span>
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Western Front Master Cover - Bespoke High-Density Calibrated</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 8mm 11mm 8mm 11mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 281mm; max-height: 281mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    /* Top Masthead */
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 11pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 8px; border-radius: 2px; }

    /* Title Block */
    .title-wrap { text-align: center; margin-bottom: 4px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 17pt; font-weight: 900; letter-spacing: 0.02em; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 10.2pt; font-style: italic; color: #475569; margin: 0; }

    /* Middle Row: Precision calibrated to 59mm height */
    .middle-row { display: grid; grid-template-columns: 82mm 1fr; gap: 10px; margin-bottom: 4px; height: 59mm; }
    .hero-col { border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; display: flex; flex-direction: column; height: 100%; }
    .hero-frame { flex: 1; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; color: #475569; margin-top: 2px; }

    .overview-card { border: 1.2px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 7px 11px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 9.0pt; line-height: 1.36; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 4px 0; }
    .overview-text p:last-child { margin-bottom: 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 2px; display: flex; justify-content: space-between; font-weight: 700; }

    /* LOWER SECTION: CANONICAL DISCIPLINARY ENQUIRIES - HIGH DENSITY, LARGE READABLE FONTS, ZERO VOIDS */
    .master-dossier { border: 2.2px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-bottom: 3px; }
    
    .dossier-header-bar { background: #0f172a; color: #ffffff; padding: 4.5px 12px; display: flex; justify-content: space-between; align-items: center; }
    .dossier-header-title { font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; }
    .dossier-header-badge { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; }

    .dossier-card-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 5px; padding: 5px; background: #f1f5f9; flex: 1; }
    
    /* The Enquiry Card: Snug, Filled, Readable, Zero Dead Space */
    .card-box { background: #ffffff; border: 1.4px solid #cbd5e1; border-top: 3.5px solid #1e3a8a; border-radius: 4px; padding: 5px 8px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    
    .card-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px; }
    .badge-cluster { display: flex; align-items: baseline; gap: 5px; }
    .enquiry-tag { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1.5px 6.5px; border-radius: 2px; letter-spacing: 0.05em; }
    .page-locator { font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; color: #1e3a8a; }
    .ref-tag { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #64748b; }

    .card-heading { font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #0f172a; line-height: 1.18; margin: 0 0 2px 0; }

    .card-question { background: #eff6ff; border: 1px solid #bfdbfe; border-left: 3.5px solid #1e3a8a; border-radius: 2.5px; padding: 2.5px 6px; display: flex; align-items: baseline; gap: 4px; margin-bottom: 2.5px; }
    .q-badge { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.04em; white-space: nowrap; flex-shrink: 0; }
    .q-quote { font-family: 'Lora', Georgia, serif; font-size: 8.2pt; font-style: italic; color: #1e3a8a; line-height: 1.22; }

    .card-points { display: flex; flex-direction: column; gap: 2px; border-top: 1px solid #e2e8f0; padding-top: 2.5px; }
    .pt-row { display: flex; align-items: flex-start; gap: 4.5px; font-family: 'Inter', sans-serif; font-size: 7.7pt; line-height: 1.26; color: #334155; }
    .bullet-dot { color: #1e3a8a; font-size: 8.5pt; font-weight: 900; line-height: 1.0; flex-shrink: 0; }
    .pt-content { flex: 1; }
    .pt-content strong { color: #0f172a; font-weight: 800; }

    /* Bottom Exam Ribbon: Calibrated Single-Line Per Cell */
    .master-exam-ribbon { background: #0f172a; color: #ffffff; padding: 4.5px 12px; display: grid; grid-template-columns: 1fr 1.3fr 1.1fr; gap: 8px; border-top: 2px solid #1e3a8a; align-items: center; }
    .ribbon-cell { display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
    .ribbon-cell-title { font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 1px; white-space: nowrap; }
    .ribbon-cell-content { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 600; color: #e2e8f0; line-height: 1.2; white-space: nowrap; }

    .footer { border-top: 1.2px solid #cbd5e1; padding-top: 2px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; }
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

    <!-- Solid, Zero-Void Master Course Dossier -->
    <div class="master-dossier">
      <div class="dossier-header-bar">
        <span class="dossier-header-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="dossier-header-badge">Pearson Edexcel Paper 1 Alignment</span>
      </div>
      <div class="dossier-card-grid">
        ${cardsHtml}
      </div>
      <div class="master-exam-ribbon">
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Pearson Edexcel Blueprint</div>
          <div class="ribbon-cell-content">Paper 1 Option 11 &bull; Historic Environment</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Section A Exam Architecture</div>
          <div class="ribbon-cell-content">Q1: Features [4m] &bull; Q2(a): Utility [8m] &bull; Q2(b): Follow-Up [4m]</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Disciplinary Architecture</div>
          <div class="ribbon-cell-content">Pure Narrative &bull; Zero Clutter &bull; Spaced Retrieval</div>
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

  await page.setContent(renderCoverV12(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p = await page.$('.page');
  if (p) await p.screenshot({ path: `${targetDir}/cover_v12_perfect.png` });

  const overflowCheck = await page.evaluate(() => {
    const pageEl = document.querySelector('.page');
    return {
      scrollH: pageEl.scrollHeight,
      clientH: pageEl.clientHeight,
      diff: pageEl.scrollHeight - pageEl.clientHeight,
    };
  });
  console.log('V12 overflow check:', overflowCheck);

  await browser.close();
})();
