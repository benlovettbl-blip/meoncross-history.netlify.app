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

// ================================================================================
// DESIGN 1: EXECUTIVE ENQUIRY DOSSIER (Rich Content, Balanced Proportions, Exam Ribbon)
// ================================================================================
function renderDesign1() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The Theatre of War: British Sector & Terrain',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      question: 'How did trench architecture and terrain dictate surgical survival?',
      points: [
        '<strong>Terrain:</strong> Ypres Salient concentric fire; Somme chalk ridges; Arras underground quarries.',
        '<strong>Trench System:</strong> Frontline, support, reserve lines & zigzag communication trenches.',
        '<strong>Major Actions:</strong> 1st/2nd Ypres (1914–15), Somme (1916), Arras & Passchendaele (1917).',
      ],
    },
    {
      num: '02',
      title: 'The Trench Environment: Mud & Non-Combat Illness',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      question: 'How did the physical conditions of trench warfare create mass casualties?',
      points: [
        '<strong>Trench Foot:</strong> Constriction & wet gangrene; prevention via whale oil & dry socks.',
        '<strong>Trench Fever:</strong> Pyrexia transmitted by body lice; delousing stations & heat treatments.',
        '<strong>Shell Shock:</strong> NYDN diagnosis; traumatic neurosis, Charles Myers & the Salmon Protocol.',
      ],
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Gas & Sepsis',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      question: 'Why did high-explosive artillery and manured soil induce lethal trauma?',
      points: [
        '<strong>Ballistic Wounds:</strong> High-explosive shell shrapnel causing jagged, deep-tissue tears.',
        '<strong>Soil Ecology:</strong> Intensive Flanders fertilizer harboring tetanus & gas gangrene microbes.',
        '<strong>Chemical Weapons:</strong> Chlorine asphyxiation (1915), Phosgene, and blister agent Mustard Gas (1917).',
      ],
    },
    {
      num: '04',
      title: 'The Chain of Evacuation: Stretcher Bearers to CCS',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      question: 'How did the RAMC evacuation chain race against the critical surgical window?',
      points: [
        '<strong>Forward Posts:</strong> Stretcher bearer relays (Passchendaele mud) & Regimental Aid Post.',
        '<strong>Advanced Triage:</strong> Dressing Stations & Casualty Clearing Station (urgent life-saving surgery).',
        '<strong>Base Transport:</strong> Motor ambulances, specialized hospital trains, and canal barge convoys.',
      ],
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint & Wound Care',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      question: 'How did mechanical traction and antiseptic irrigation transform survival?',
      points: [
        '<strong>Thomas Splint:</strong> Mechanical femur stabilization slashes mortality from 80% to 20%.',
        '<strong>Carrel-Dakin:</strong> Continuous sodium hypochlorite irrigation & radical wound debridement.',
        '<strong>Mobile Radiography:</strong> Forward X-ray vans detecting subterranean metal fragments.',
      ],
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      question: 'How did massive facial and cranial trauma compel surgical revolutions?',
      points: [
        "<strong>Blood Storage:</strong> Sodium citrate & Oswald Robertson's 1917 Cambrai mobile blood depot.",
        "<strong>Neurosurgery:</strong> Harvey Cushing's local anaesthesia techniques for deep intracranial trauma.",
        '<strong>Plastic Surgery:</strong> Harold Gillies & the tube pedicle skin graft technique at Sidcup.',
      ],
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="card-item">
      <div class="card-top">
        <span class="card-badge">ENQUIRY ${e.num}</span>
        <span class="card-loc">${e.pages} &bull; ${e.ref}</span>
      </div>
      <div class="card-title">${e.title}</div>
      <div class="card-q"><em>"${e.question}"</em></div>
      <ul class="card-pts">
        ${e.points.map((p) => `<li>${p}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Design 1: Executive Enquiry Dossier</title>
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

    /* DOSSIER CONTAINER */
    .dossier-box { border: 1.5px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 3px; }
    .dossier-head { background: #0f172a; color: #ffffff; padding: 4px 10px; display: flex; justify-content: space-between; align-items: center; }
    .dossier-title { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
    .dossier-tag { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5.5px; padding: 5.5px; background: #f8fafc; flex: 1; }
    .card-item { background: #ffffff; border: 1px solid #cbd5e1; border-top: 2.5px solid #1e3a8a; border-radius: 3px; padding: 4.5px 7px; display: flex; flex-direction: column; justify-content: space-between; }
    .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5px; }
    .card-badge { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 0.5px 4px; border-radius: 2px; letter-spacing: 0.04em; }
    .card-loc { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #64748b; }
    .card-title { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0f172a; line-height: 1.15; margin-bottom: 1.5px; }
    .card-q { font-family: 'Lora', Georgia, serif; font-size: 6.3pt; line-height: 1.2; color: #475569; margin-bottom: 2px; }
    
    .card-pts { list-style: none; margin: 0; padding: 0; border-top: 1px solid #f1f5f9; padding-top: 2px; }
    .card-pts li { font-family: 'Inter', sans-serif; font-size: 5.7pt; line-height: 1.24; color: #334155; margin-bottom: 1.5px; position: relative; padding-left: 7px; }
    .card-pts li:last-child { margin-bottom: 0; }
    .card-pts li:before { content: "▪"; position: absolute; left: 0; color: #1e3a8a; font-size: 6pt; }
    .card-pts strong { color: #0f172a; font-weight: 700; }

    /* Bottom Exam Blueprint Ribbon */
    .exam-ribbon { background: #0f172a; color: #ffffff; padding: 4px 10px; display: grid; grid-template-columns: 1fr 1.6fr 1.3fr; gap: 8px; border-top: 1.5px solid #1e3a8a; }
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

    <!-- Redesigned Bottom Half: Design 1 -->
    <div class="dossier-box">
      <div class="dossier-head">
        <span class="dossier-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="dossier-tag">Exact 1:1 Pearson Edexcel Paper 1 Curriculum Alignment</span>
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

// ================================================================================
// DESIGN 2: TWO-TIER ARCHITECTURE (Course Roadmap Grid + Specification Deep-Dive)
// ================================================================================
function renderDesign2() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Design 2: Two-Tier Architecture</title>
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

    .middle-row { display: grid; grid-template-columns: 1.05fr 1fr; gap: 9px; margin-bottom: 6px; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 60mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 7px 11px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2.5px; margin-bottom: 3.5px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 8.8pt; line-height: 1.38; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 4.5px 0; }

    /* TWO-TIER SECTION */
    .two-tier-container { flex: 1; display: flex; flex-direction: column; gap: 6px; }

    /* TIER 1: ENQUIRY ROADMAP (3x2 compact grid) */
    .tier1-box { border: 1.5px solid #0f172a; border-radius: 4px; background: #ffffff; overflow: hidden; }
    .tier-header { background: #0f172a; color: #ffffff; padding: 3.5px 8px; display: flex; justify-content: space-between; align-items: center; }
    .tier-title { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .tier-badge { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; color: #93c5fd; text-transform: uppercase; }

    .tier1-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; padding: 6px; background: #f8fafc; }
    .t1-card { background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 2.5px; padding: 4px 6px; }
    .t1-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px; }
    .t1-num { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; color: #1e3a8a; }
    .t1-pages { font-family: 'Inter', sans-serif; font-size: 5.4pt; font-weight: 700; color: #64748b; }
    .t1-title { font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; color: #0f172a; line-height: 1.15; margin-bottom: 2px; }
    .t1-desc { font-family: 'Inter', sans-serif; font-size: 5.6pt; color: #475569; line-height: 1.22; }

    /* TIER 2: SPECIFICATION & ASSESSMENT DEEP-DIVE */
    .tier2-box { border: 1.5px solid #cbd5e1; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .tier2-header { background: #1e3a8a; color: #ffffff; padding: 3.5px 8px; display: flex; justify-content: space-between; align-items: center; }
    .tier2-title { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .tier2-badge { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #bfdbfe; }

    .tier2-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; padding: 6px; background: #ffffff; flex: 1; }
    .t2-col { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 2px; padding: 5px 7px; display: flex; flex-direction: column; }
    .t2-col-title { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3.5px; }
    .t2-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2.5px; }
    .t2-list li { font-family: 'Inter', sans-serif; font-size: 5.6pt; line-height: 1.24; color: #334155; }
    .t2-list strong { color: #0f172a; font-weight: 700; }

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

    <!-- Redesigned Bottom Half: Design 2 -->
    <div class="two-tier-container">
      <!-- TIER 1: ENQUIRY DIRECTORY -->
      <div class="tier1-box">
        <div class="tier-header">
          <span class="tier-title">CANONICAL DISCIPLINARY ENQUIRY SEQUENCE</span>
          <span class="tier-badge">6 Classroom Spreads &bull; Pages 3–14</span>
        </div>
        <div class="tier1-grid">
          <div class="t1-card">
            <div class="t1-top"><span class="t1-num">ENQUIRY 01</span><span class="t1-pages">pp. 3–4</span></div>
            <div class="t1-title">The Theatre of War &amp; Battles</div>
            <div class="t1-desc">Trench design, Ypres Salient, Arras tunnels &amp; Somme terrain obstacles.</div>
          </div>
          <div class="t1-card">
            <div class="t1-top"><span class="t1-num">ENQUIRY 02</span><span class="t1-pages">pp. 5–6</span></div>
            <div class="t1-title">Trench Conditions &amp; Illness</div>
            <div class="t1-desc">Trench Foot, lice &amp; Trench Fever, vermin, and Shell Shock (NYDN).</div>
          </div>
          <div class="t1-card">
            <div class="t1-top"><span class="t1-num">ENQUIRY 03</span><span class="t1-pages">pp. 7–8</span></div>
            <div class="t1-title">Battlefield Trauma &amp; Gas</div>
            <div class="t1-desc">Shrapnel mangled tissue, gas gangrene, tetanus &amp; chemical weapons.</div>
          </div>
          <div class="t1-card">
            <div class="t1-top"><span class="t1-num">ENQUIRY 04</span><span class="t1-pages">pp. 9–10</span></div>
            <div class="t1-title">The Chain of Evacuation</div>
            <div class="t1-desc">Stretcher relays, RAP, Dressing Stations &amp; Casualty Clearing Stations.</div>
          </div>
          <div class="t1-card">
            <div class="t1-top"><span class="t1-num">ENQUIRY 05</span><span class="t1-pages">pp. 11–12</span></div>
            <div class="t1-title">Surgical Breakthroughs</div>
            <div class="t1-desc">Thomas Splint traction, Carrel-Dakin wound irrigation &amp; mobile X-rays.</div>
          </div>
          <div class="t1-card">
            <div class="t1-top"><span class="t1-num">ENQUIRY 06</span><span class="t1-pages">pp. 13–14</span></div>
            <div class="t1-title">Innovations &amp; Reconstruction</div>
            <div class="t1-desc">Oswald Robertson's blood bank, Harvey Cushing neurosurgery &amp; Gillies pedicles.</div>
          </div>
        </div>
      </div>

      <!-- TIER 2: SPECIFICATION & EXAMINATION BLUEPRINT -->
      <div class="tier2-box">
        <div class="tier2-header">
          <span class="tier2-title">PEARSON EDEXCEL SPECIFICATION &amp; ASSESSMENT BLUEPRINT</span>
          <span class="tier2-badge">Option 11 &bull; 1HI0/11 Section A Criteria</span>
        </div>
        <div class="tier2-grid">
          <div class="t2-col">
            <div class="t2-col-title">Historic Environment Core</div>
            <ul class="t2-list">
              <li>▪ <strong>Terrain:</strong> Vulnerability of the Ypres Salient &amp; concentric artillery.</li>
              <li>▪ <strong>Soil Necrosis:</strong> Manured clay, anaerobic clostridium &amp; tetanus.</li>
              <li>▪ <strong>Transport:</strong> Motor ambulances, barges &amp; ambulance trains.</li>
              <li>▪ <strong>Underground:</strong> Thompson's Cave 700-bed hospital at Arras.</li>
            </ul>
          </div>
          <div class="t2-col">
            <div class="t2-col-title">Clinical Innovations</div>
            <ul class="t2-list">
              <li>▪ <strong>Thomas Splint:</strong> Slashing compound fracture mortality from 80% to 20%.</li>
              <li>▪ <strong>Wound Antiseptics:</strong> Carrel-Dakin continuous sodium hypochlorite irrigation.</li>
              <li>▪ <strong>Preserved Blood:</strong> Sodium citrate &amp; Robertson's 1917 Cambrai depot.</li>
              <li>▪ <strong>Plastic Surgery:</strong> Harold Gillies &amp; tube pedicle skin grafts at Sidcup.</li>
            </ul>
          </div>
          <div class="t2-col">
            <div class="t2-col-title">Section A Exam Stems</div>
            <ul class="t2-list">
              <li>▪ <strong>Q1: Two Features [4m]:</strong> Feature + specific factual evidence.</li>
              <li>▪ <strong>Q2(a): Source Utility [8m]:</strong> Evaluate Sources A &amp; B (Content, NOP, Context).</li>
              <li>▪ <strong>Q2(b): Follow-Up [4m]:</strong> Detail &rarr; Question &rarr; Source &rarr; Purpose.</li>
              <li>▪ <strong>Weighting:</strong> AO1 Detail (6m) &bull; AO2 Causation (8m) &bull; AO3 Sources (12m).</li>
            </ul>
          </div>
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

  // Render Design 1
  await page.setContent(renderDesign1(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p1 = await page.$('.page');
  if (p1) await p1.screenshot({ path: `${targetDir}/cover_proto_design_1.png` });
  console.log('Saved cover_proto_design_1.png');

  // Render Design 2
  await page.setContent(renderDesign2(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p2 = await page.$('.page');
  if (p2) await p2.screenshot({ path: `${targetDir}/cover_proto_design_2.png` });
  console.log('Saved cover_proto_design_2.png');

  await browser.close();
})();
