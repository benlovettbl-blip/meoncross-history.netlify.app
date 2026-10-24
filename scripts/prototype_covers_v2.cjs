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

// --------------------------------------------------------------------------------
// OPTION 1: EXECUTIVE CURRICULUM DOSSIER & EXAM ARCHITECTURE RIBBON
// --------------------------------------------------------------------------------
function renderOption1() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The Theatre of War: British Sector & Terrain',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      question: 'How did trench architecture and Flanders terrain dictate surgical survival?',
      concepts: [
        'Ypres Salient Vulnerability',
        "Arras Underground Caves (Thompson's Cave)",
        'Somme Frontage & Mud',
      ],
    },
    {
      num: '02',
      title: 'The Trench Environment: Mud & Non-Combat Illness',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      question: 'How did the physical conditions of trench warfare create mass medical casualties?',
      concepts: [
        'Trench Foot & Whale Oil Regimes',
        'Trench Fever (Louse Vectors)',
        'Shell Shock (NYDN & Salmon Protocol)',
      ],
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Gas & Sepsis',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      question:
        'Why did high-explosive weaponry and manured soil induce fatal wound complications?',
      concepts: [
        'Manured Flanders Clay & Gas Gangrene',
        'Chlorine, Phosgene & Mustard Gas',
        'Brodie Steel Helmets (1915)',
      ],
    },
    {
      num: '04',
      title: 'The Chain of Evacuation: Stretcher Bearers to CCS',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      question:
        'How did the RAMC evacuation chain race against the critical 12-hour surgical window?',
      concepts: [
        'RAP & Field Dressing Stations',
        'Casualty Clearing Station (CCS) Triage',
        'Ambulance Barges & Hospital Trains',
      ],
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint & Wound Care',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      question:
        'How did mechanical traction and antiseptic irrigation revolutionize frontline survival?',
      concepts: [
        'Hugh Owen Thomas Splint (80% → 20% Mortality)',
        'Carrel-Dakin Antiseptic Irrigation',
        'Mobile Radiography (Mobile X-Ray Units)',
      ],
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      question:
        'How did Western Front trauma compel the birth of modern blood storage and plastic surgery?',
      concepts: [
        'Sodium Citrate Blood Preservation (Robertson 1917)',
        'Harvey Cushing Subdural Neurosurgery',
        "Harold Gillies Pedicle Flaps (Queen's Hospital)",
      ],
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="enquiry-card">
      <div class="card-head">
        <span class="card-badge">ENQUIRY ${e.num}</span>
        <span class="card-loc">${e.pages} &bull; ${e.ref}</span>
      </div>
      <div class="card-title">${e.title}</div>
      <div class="card-question"><em>"${e.question}"</em></div>
      <div class="card-concepts">
        ${e.concepts.map((c) => `<span class="concept-item">▪ <strong>${c.split('(')[0].trim()}</strong></span>`).join(' ')}
      </div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cover Prototype 1 - Executive Curriculum Dossier</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 12mm 14mm 12mm 14mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 273mm; max-height: 273mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 5px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 9.5pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1.5px 6px; border-radius: 2px; }

    .title-wrap { text-align: center; margin-bottom: 6px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 15.2pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 1px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.2pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 1.05fr 1fr; gap: 10px; margin-bottom: 6px; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 64mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 8px 12px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 8.9pt; line-height: 1.39; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 5px 0; }

    /* EXECUTIVE CURRICULUM DOSSIER */
    .dossier-container { border: 1.5px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 4px; }
    .dossier-banner { background: #0f172a; color: #ffffff; padding: 4.5px 10px; display: flex; justify-content: space-between; align-items: center; }
    .dossier-banner-title { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
    .dossier-banner-tag { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 7px; background: #f8fafc; flex: 1; align-content: space-between; }
    .enquiry-card { background: #ffffff; border: 1px solid #cbd5e1; border-top: 2.5px solid #1e3a8a; border-radius: 3px; padding: 5px 8px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
    .card-badge { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1px 4.5px; border-radius: 2px; letter-spacing: 0.05em; }
    .card-loc { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b; }
    .card-title { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 2px; }
    .card-question { font-family: 'Lora', Georgia, serif; font-size: 6.6pt; line-height: 1.25; color: #475569; margin-bottom: 3px; }
    .card-concepts { font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #334155; line-height: 1.25; border-top: 1px dashed #e2e8f0; padding-top: 2.5px; }
    .concept-item { margin-right: 6px; white-space: nowrap; }
    .concept-item strong { color: #1e3a8a; }

    /* Bottom Exam Blueprint Ribbon */
    .exam-ribbon { background: #0f172a; color: #ffffff; padding: 5px 10px; display: grid; grid-template-columns: 1.1fr 1.6fr 1.3fr; gap: 10px; border-top: 1.5px solid #1e3a8a; }
    .ribbon-col { display: flex; flex-direction: column; justify-content: center; }
    .ribbon-head { font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 1.5px; }
    .ribbon-body { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 600; color: #e2e8f0; line-height: 1.2; }

    .footer { border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; margin-top: 4px; }
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
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Specification Backbone</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Redesigned Bottom Half: Option 1 -->
    <div class="dossier-container">
      <div class="dossier-banner">
        <span class="dossier-banner-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="dossier-banner-tag">Exact 1:1 Pearson Edexcel Paper 1 Curriculum Alignment</span>
      </div>
      <div class="dossier-grid">
        ${cardsHtml}
      </div>
      <div class="exam-ribbon">
        <div class="ribbon-col">
          <div class="ribbon-head">Pearson Edexcel Examination Blueprint</div>
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

// --------------------------------------------------------------------------------
// OPTION 2: HIGH-DENSITY DISCIPLINARY SYLLABUS MATRIX & EXAM STRIP (CME-STYLE)
// --------------------------------------------------------------------------------
function renderOption2() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cover Prototype 2 - High-Density Disciplinary Syllabus Matrix</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 12mm 14mm 12mm 14mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 273mm; max-height: 273mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 5px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 9.5pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1.5px 6px; border-radius: 2px; }

    .title-wrap { text-align: center; margin-bottom: 6px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 15.2pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 1px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.2pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 1.05fr 1fr; gap: 10px; margin-bottom: 6px; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 64mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 8px 12px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 8.9pt; line-height: 1.39; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 5px 0; }

    /* HIGH-DENSITY DISCIPLINARY SYLLABUS MATRIX (CME STYLE) */
    .matrix-container { border: 1.5px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 4px; }
    .matrix-header { background: #0f172a; color: #ffffff; padding: 4.5px 10px; display: flex; justify-content: space-between; align-items: center; }
    .matrix-header-title { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
    .matrix-header-tag { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .matrix-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; padding: 6px; background: #f8fafc; flex: 1; }
    .matrix-col { background: #ffffff; border: 1px solid #cbd5e1; border-top: 2.5px solid #1e3a8a; border-radius: 3px; padding: 6px 8px; display: flex; flex-direction: column; justify-content: space-between; }
    .col-head { border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 5px; display: flex; align-items: center; justify-content: space-between; }
    .col-badge { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1px 4.5px; border-radius: 2px; }
    .col-title { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em; }

    .subtopic-block { margin-bottom: 6px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px; }
    .subtopic-block:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
    .subtopic-title-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
    .subtopic-name { font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; color: #1e3a8a; }
    .subtopic-pages { font-family: 'Inter', sans-serif; font-size: 5.5pt; font-weight: 700; color: #64748b; }

    .point-list { list-style: none; margin: 0; padding: 0; }
    .point-item { font-family: 'Inter', sans-serif; font-size: 5.9pt; line-height: 1.28; color: #334155; margin-bottom: 2px; display: flex; gap: 3.5px; }
    .point-item:last-child { margin-bottom: 0; }
    .bullet { color: #1e3a8a; font-weight: 900; font-size: 6.5pt; line-height: 1; flex-shrink: 0; margin-top: 1px; }
    .point-txt strong { color: #0f172a; font-weight: 700; }

    /* Bottom Exam Strip */
    .exam-strip { background: #f1f5f9; border-top: 1px solid #cbd5e1; padding: 4px 8px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
    .strip-box { background: #ffffff; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 2.5px 6px; border-radius: 2px; }
    .strip-box-title { font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #0f172a; margin-bottom: 1px; }
    .strip-box-desc { font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #64748b; line-height: 1.2; }

    .footer { border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; margin-top: 4px; }
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
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Specification Backbone</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Redesigned Bottom Half: Option 2 -->
    <div class="matrix-container">
      <div class="matrix-header">
        <span class="matrix-header-title">PEARSON EDEXCEL SPECIFICATION BLUEPRINT &bull; DISCIPLINARY SYLLABUS MATRIX</span>
        <span class="matrix-header-tag">Official Syllabus &bull; Cross-Referenced To Enquiries</span>
      </div>
      
      <div class="matrix-grid">
        <!-- COLUMN 1: THEATRE OF WAR & TRENCH ENVIRONMENT -->
        <div class="matrix-col">
          <div>
            <div class="col-head">
              <span class="col-title">1. Setting &amp; Environment</span>
              <span class="col-badge">ENQUIRIES 01–02</span>
            </div>

            <div class="subtopic-block">
              <div class="subtopic-title-row">
                <span class="subtopic-name">The British Sector &amp; Battles</span>
                <span class="subtopic-pages">pp. 3–4</span>
              </div>
              <ul class="point-list">
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Terrain &amp; Geography:</strong> Ypres Salient, Somme chalk, Arras tunnels.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Trench System Architecture:</strong> Frontline, support, reserve &amp; zigzag comms.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Major Actions:</strong> 1st/2nd Ypres (1914-15), Somme (1916), Passchendaele (1917).</span></li>
              </ul>
            </div>

            <div class="subtopic-block">
              <div class="subtopic-title-row">
                <span class="subtopic-name">Trench Conditions &amp; Illness</span>
                <span class="subtopic-pages">pp. 5–6</span>
              </div>
              <ul class="point-list">
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Non-Combat Trauma:</strong> Mud, cold, waterlogging &amp; wet gangrene.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Specific Pathologies:</strong> Trench Foot (whale oil), Trench Fever (lice).</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Psychological Breakdown:</strong> Shell Shock (NYDN) &amp; Salmon Protocol.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- COLUMN 2: TRAUMA & EVACUATION CHAIN -->
        <div class="matrix-col">
          <div>
            <div class="col-head">
              <span class="col-title">2. Trauma &amp; Evacuation</span>
              <span class="col-badge">ENQUIRIES 03–04</span>
            </div>

            <div class="subtopic-block">
              <div class="subtopic-title-row">
                <span class="subtopic-name">Battlefield Wounds &amp; Gas</span>
                <span class="subtopic-pages">pp. 7–8</span>
              </div>
              <ul class="point-list">
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Artillery Ballistics:</strong> High-explosive shrapnel &amp; mangled tissue.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Soil Necrosis:</strong> Anaerobic clostridium (gas gangrene) &amp; tetanus.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Chemical Warfare:</strong> Chlorine (1915), Phosgene (1915), Mustard (1917).</span></li>
              </ul>
            </div>

            <div class="subtopic-block">
              <div class="subtopic-title-row">
                <span class="subtopic-name">RAMC Chain of Evacuation</span>
                <span class="subtopic-pages">pp. 9–10</span>
              </div>
              <ul class="point-list">
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Forward Stations:</strong> Stretcher bearer relays &amp; Regimental Aid Post.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Dressing Stations &amp; CCS:</strong> Triage sorting &amp; urgent abdominal surgery.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Base Transport:</strong> Motor ambulances, hospital trains &amp; canal barges.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- COLUMN 3: CLINICAL BREAKTHROUGHS & INNOVATIONS -->
        <div class="matrix-col">
          <div>
            <div class="col-head">
              <span class="col-title">3. Surgery &amp; Innovations</span>
              <span class="col-badge">ENQUIRIES 05–06</span>
            </div>

            <div class="subtopic-block">
              <div class="subtopic-title-row">
                <span class="subtopic-name">Surgical &amp; Wound Care</span>
                <span class="subtopic-pages">pp. 11–12</span>
              </div>
              <ul class="point-list">
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Mechanical Fixation:</strong> Thomas Splint reduces femur mortality (80% → 20%).</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Infection Control:</strong> Carrel-Dakin saline irrigation &amp; wound debridement.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Radiography:</strong> Mobile X-ray vans locating deep subterranean shrapnel.</span></li>
              </ul>
            </div>

            <div class="subtopic-block">
              <div class="subtopic-title-row">
                <span class="subtopic-name">Transfusion &amp; Reconstruction</span>
                <span class="subtopic-pages">pp. 13–14</span>
              </div>
              <ul class="point-list">
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Blood Storage:</strong> Sodium citrate &amp; Robertson's Cambrai blood bank (1917).</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Brain Surgery:</strong> Harvey Cushing's local anaesthesia magnet techniques.</span></li>
                <li class="point-item"><span class="bullet">▪</span><span class="point-txt"><strong>Plastic Surgery:</strong> Harold Gillies &amp; the tube pedicle flap at Sidcup.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Exam Strip -->
      <div class="exam-strip">
        <div class="strip-box">
          <div class="strip-box-title">Q1: TWO FEATURES [4m]</div>
          <div class="strip-box-desc">Identify 2 distinct features + support each with specific factual historical detail.</div>
        </div>
        <div class="strip-box">
          <div class="strip-box-title">Q2(a): SOURCE UTILITY [8m]</div>
          <div class="strip-box-desc">Evaluate utility of Sources A &amp; B using Content, NOP, and own knowledge context.</div>
        </div>
        <div class="strip-box">
          <div class="strip-box-title">Q2(b): FOLLOW-UP [4m]</div>
          <div class="strip-box-desc">Rigorous 4-prompt inquiry: Detail &rarr; Question &rarr; Source Type &rarr; Purpose.</div>
        </div>
        <div class="strip-box">
          <div class="strip-box-title">AO WEIGHTINGS</div>
          <div class="strip-box-desc">AO1 Knowledge (6m) &bull; AO2 Causation (8m) &bull; AO3 Sources (12m) &bull; 16 Marks Total.</div>
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

  // Render Option 1
  await page.setContent(renderOption1(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p1 = await page.$('.page');
  if (p1) await p1.screenshot({ path: `${targetDir}/cover_proto_1_dossier.png` });
  console.log('Saved cover_proto_1_dossier.png');

  // Render Option 2
  await page.setContent(renderOption2(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p2 = await page.$('.page');
  if (p2) await p2.screenshot({ path: `${targetDir}/cover_proto_2_matrix.png` });
  console.log('Saved cover_proto_2_matrix.png');

  await browser.close();
})();
