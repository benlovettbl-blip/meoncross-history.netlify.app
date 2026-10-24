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
// VARIANT 1: EXECUTIVE ENQUIRY DOSSIER (LARGE 10.5pt/8.8pt TYPOGRAPHY, ZERO VOIDS)
// --------------------------------------------------------------------------------
function renderVariant1() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The Theatre of War: British Sector & Trench Systems',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      question: 'How did terrain and trench architecture dictate surgical survival?',
      detail1:
        '<strong>Ypres & Somme Terrain:</strong> Passchendaele ridge artillery vulnerability; concentric German shelling; waterlogged Flanders clay.',
      detail2:
        "<strong>Subterranean Works:</strong> Arras chalk quarries linked into Thompson's Cave 700-bed underground hospital with operating theatres.",
    },
    {
      num: '02',
      title: 'Trench Conditions: Mud, Vermin & Non-Combat Illness',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      question: 'How did physical conditions produce mass medical casualties?',
      detail1:
        '<strong>Trench Foot & Gangrene:</strong> Constriction from waterlogged boots; prevented via daily whale oil inspections & dry sock relays.',
      detail2:
        '<strong>Lice & Shell Shock:</strong> Trench Fever pyrexia spread by body lice; psychological casualties (NYDN) managed via the Salmon Protocol.',
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Gas & Infection',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      question: 'Why did industrialised weapons and soil induce fatal sepsis?',
      detail1:
        '<strong>High-Explosive Shrapnel:</strong> Ballistic fragments blasting soiled cloth deep into mangled lacerations; Brodie steel helmets (1915).',
      detail2:
        '<strong>Soil Microbiology & Gas:</strong> Manured clay breeding anaerobic gas gangrene & tetanus; Chlorine (1915), Phosgene & Mustard Gas.',
    },
    {
      num: '04',
      title: 'Chain of Evacuation: Stretcher Bearers to CCS Triage',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      question: 'How did the RAMC race against the 12-hour surgical window?',
      detail1:
        '<strong>Forward Evacuation:</strong> Stretcher bearer relays struggling through liquid mud; Regimental Aid Posts & Advanced Dressing Stations.',
      detail2:
        '<strong>CCS Life-Saving Triage:</strong> Immediate surgical sorting for chest/abdominal trauma; transit via motor ambulances, trains & barges.',
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint & Antiseptics',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      question: 'How did mechanical traction and wound irrigation save lives?',
      detail1:
        '<strong>The Thomas Splint (1915):</strong> Rigid skeletal traction immobilizing compound femur fractures, slashing mortality from 80% to 20%.',
      detail2:
        '<strong>Infection Control & X-Rays:</strong> Carrel-Dakin continuous sodium hypochlorite irrigation; mobile radiography vans locating shrapnel.',
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      question: 'How did massive trauma compel modern surgical specialties?',
      detail1:
        "<strong>Stored Blood Transfusions:</strong> Sodium citrate anti-coagulation; Oswald Robertson's 1917 mobile blood depot at the Battle of Cambrai.",
      detail2:
        "<strong>Neurosurgery & Plastic Surgery:</strong> Harvey Cushing local anaesthesia cranial procedures; Harold Gillies's tube pedicle grafts at Sidcup.",
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="v1-card">
      <div class="v1-card-head">
        <div class="v1-badge-wrap">
          <span class="v1-badge">ENQUIRY ${e.num}</span>
          <span class="v1-pages">${e.pages}</span>
        </div>
        <span class="v1-ref">${e.ref}</span>
      </div>
      <h3 class="v1-title">${e.title}</h3>
      <div class="v1-q-box">
        <span class="v1-q-tag">KEY QUESTION:</span> <em>"${e.question}"</em>
      </div>
      <div class="v1-bullets">
        <div class="v1-bullet">${e.detail1}</div>
        <div class="v1-bullet">${e.detail2}</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Variant 1: High-Legibility Executive Enquiry Dossier</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 9mm 12mm 9mm 12mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 279mm; max-height: 279mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    /* Top Masthead */
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 11pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 8px; border-radius: 2px; }

    /* Title Block */
    .title-wrap { text-align: center; margin-bottom: 5px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 17pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 10.2pt; font-style: italic; color: #475569; margin: 0; }

    /* Middle Row: Balanced 72mm height */
    .middle-row { display: grid; grid-template-columns: 88mm 1fr; gap: 11px; margin-bottom: 5px; }
    .hero-col { border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 64mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1.2px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 10px 14px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 9.5pt; line-height: 1.45; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 6px 0; }
    .overview-text p:last-child { margin-bottom: 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between; font-weight: 700; }

    /* LOWER SECTION: EXECUTIVE DOSSIER WITH LARGE TYPOGRAPHY */
    .v1-container { border: 2px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    
    .v1-banner { background: #0f172a; color: #ffffff; padding: 5.5px 14px; display: flex; justify-content: space-between; align-items: center; }
    .v1-banner-title { font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .v1-banner-badge { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .v1-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; padding: 7px; background: #f8fafc; flex: 1; }
    
    .v1-card { background: #ffffff; border: 1.4px solid #cbd5e1; border-top: 4px solid #1e3a8a; border-radius: 4px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    
    .v1-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
    .v1-badge-wrap { display: flex; align-items: center; gap: 6px; }
    .v1-badge { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 2px 7px; border-radius: 2px; letter-spacing: 0.05em; }
    .v1-pages { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #1e3a8a; }
    .v1-ref { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b; }
    
    .v1-title { font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #0f172a; line-height: 1.25; margin: 0 0 4px 0; }
    
    .v1-q-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 4px 8px; font-family: 'Lora', Georgia, serif; font-size: 8.2pt; font-style: italic; color: #1e3a8a; line-height: 1.28; margin-bottom: 4px; }
    .v1-q-tag { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.04em; margin-right: 4px; font-style: normal; }

    .v1-bullets { display: flex; flex-direction: column; gap: 2.5px; border-top: 1px solid #f1f5f9; padding-top: 3px; }
    .v1-bullet { font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.28; color: #334155; position: relative; padding-left: 10px; }
    .v1-bullet:before { content: "▪"; position: absolute; left: 0; color: #1e3a8a; font-size: 8pt; line-height: 1; top: 0; }
    .v1-bullet strong { color: #0f172a; font-weight: 800; }

    /* Bottom Exam Ribbon */
    .v1-exam-ribbon { background: #0f172a; color: #ffffff; padding: 6px 14px; display: grid; grid-template-columns: 1.1fr 1.6fr 1.3fr; gap: 12px; border-top: 2px solid #1e3a8a; }
    .v1-ribbon-col { display: flex; flex-direction: column; justify-content: center; }
    .v1-ribbon-head { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 2px; }
    .v1-ribbon-body { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 600; color: #e2e8f0; line-height: 1.25; }

    .footer { border-top: 1.2px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #64748b; margin-top: 3px; }
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

    <!-- Variant 1: Executive Enquiry Dossier -->
    <div class="v1-container">
      <div class="v1-banner">
        <span class="v1-banner-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="v1-banner-badge">Exact 1:1 Pearson Edexcel Paper 1 Alignment</span>
      </div>
      <div class="v1-grid">
        ${cardsHtml}
      </div>
      <div class="v1-exam-ribbon">
        <div class="v1-ribbon-col">
          <div class="v1-ribbon-head">Pearson Edexcel Blueprint</div>
          <div class="v1-ribbon-body">Paper 1 Option 11: Section A (Historic Environment) &bull; 1HI0/11</div>
        </div>
        <div class="v1-ribbon-col">
          <div class="v1-ribbon-head">Section A Question Architecture</div>
          <div class="v1-ribbon-body">Q1: Two Features [4m] &bull; Q2(a): Source Utility [8m] &bull; Q2(b): 4-Prompt Follow-Up [4m]</div>
        </div>
        <div class="v1-ribbon-col">
          <div class="v1-ribbon-head">Disciplinary Architecture</div>
          <div class="v1-ribbon-body">100% Pure Historical Narrative &bull; Zero Inline Distractions &bull; Spaced Retrieval</div>
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
// VARIANT 2: DEEP DISCIPLINARY SYLLABUS MATRIX (3 COLUMNS, DENSE, 8.5pt/9.5pt TEXT)
// --------------------------------------------------------------------------------
function renderVariant2() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Variant 2: Deep Disciplinary Syllabus Matrix</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 9mm 12mm 9mm 12mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 279mm; max-height: 279mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 11pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 8px; border-radius: 2px; }

    .title-wrap { text-align: center; margin-bottom: 5px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 17pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 10.2pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 88mm 1fr; gap: 11px; margin-bottom: 5px; }
    .hero-col { border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 64mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1.2px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 10px 14px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 9.5pt; line-height: 1.45; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 6px 0; }
    .overview-text p:last-child { margin-bottom: 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between; font-weight: 700; }

    /* LOWER SECTION: 3 DENSE COLUMNS PACKED WITH SYLLABUS DETAIL */
    .v2-container { border: 2px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    
    .v2-header { background: #0f172a; color: #ffffff; padding: 5.5px 14px; display: flex; justify-content: space-between; align-items: center; }
    .v2-title { font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .v2-badge { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .v2-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; padding: 7px; background: #f8fafc; flex: 1; }
    .v2-col { background: #ffffff; border: 1.4px solid #cbd5e1; border-top: 4px solid #1e3a8a; border-radius: 4px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between; }
    
    .v2-col-head { border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline; }
    .v2-col-title { font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em; }
    .v2-col-badge { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1.5px 5.5px; border-radius: 2px; }

    .v2-subtopic { margin-bottom: 6px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 5px; }
    .v2-subtopic:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
    
    .v2-sub-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
    .v2-sub-title { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #1e3a8a; }
    .v2-sub-loc { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #64748b; }

    .v2-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2.5px; }
    .v2-item { font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.28; color: #334155; position: relative; padding-left: 9px; }
    .v2-item:before { content: "▪"; position: absolute; left: 0; color: #1e3a8a; font-size: 7.5pt; line-height: 1; top: 0; }
    .v2-item strong { color: #0f172a; font-weight: 800; }

    /* Bottom Exam Strip */
    .v2-exam-strip { background: #f1f5f9; border-top: 1.5px solid #cbd5e1; padding: 5px 10px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .v2-strip-card { background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; padding: 4px 7px; border-radius: 3px; }
    .v2-strip-title { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #0f172a; margin-bottom: 2px; }
    .v2-strip-desc { font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; line-height: 1.24; }

    .footer { border-top: 1.2px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #64748b; margin-top: 3px; }
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

    <!-- Variant 2: Deep Disciplinary Syllabus Matrix -->
    <div class="v2-container">
      <div class="v2-header">
        <span class="v2-title">PEARSON EDEXCEL SPECIFICATION BLUEPRINT &bull; DISCIPLINARY SYLLABUS MATRIX</span>
        <span class="v2-badge">Official Syllabus &bull; Cross-Referenced To Enquiries</span>
      </div>
      
      <div class="v2-grid">
        <!-- COLUMN 1: THEATRE OF WAR & ENVIRONMENT -->
        <div class="v2-col">
          <div class="v2-col-head">
            <span class="v2-col-title">1. Landscape &amp; Trenches</span>
            <span class="v2-col-badge">ENQUIRIES 01–02</span>
          </div>

          <div class="v2-subtopic">
            <div class="v2-sub-head">
              <span class="v2-sub-title">British Sector &amp; Battles</span>
              <span class="v2-sub-loc">pp. 3–4</span>
            </div>
            <ul class="v2-list">
              <li class="v2-item"><strong>Terrain &amp; Topography:</strong> Ypres Salient concentric fire; Somme chalk ridges; Arras underground quarries.</li>
              <li class="v2-item"><strong>Trench Systems:</strong> Frontline, support, reserve and zigzag communication lines containing blast radius.</li>
              <li class="v2-item"><strong>Subterranean Wards:</strong> Thompson's Cave 700-bed underground hospital at Arras with piped water &amp; electric lighting.</li>
            </ul>
          </div>

          <div class="v2-subtopic">
            <div class="v2-sub-head">
              <span class="v2-sub-title">Trench Conditions &amp; Illness</span>
              <span class="v2-sub-loc">pp. 5–6</span>
            </div>
            <ul class="v2-list">
              <li class="v2-item"><strong>Trench Foot:</strong> Constriction &amp; wet gangrene; preventative daily whale oil inspections &amp; dry socks.</li>
              <li class="v2-item"><strong>Louse-Borne Illness:</strong> Trench Fever pyrexia; mobile bathhouses &amp; delousing stations.</li>
              <li class="v2-item"><strong>Psychological Breakdown:</strong> Shell Shock (NYDN) managed via forward rest under the Salmon Protocol.</li>
            </ul>
          </div>
        </div>

        <!-- COLUMN 2: TRAUMA & EVACUATION CHAIN -->
        <div class="v2-col">
          <div class="v2-col-head">
            <span class="v2-col-title">2. Trauma &amp; Evacuation</span>
            <span class="v2-col-badge">ENQUIRIES 03–04</span>
          </div>

          <div class="v2-subtopic">
            <div class="v2-sub-head">
              <span class="v2-sub-title">Wounds, Gas &amp; Soil Sepsis</span>
              <span class="v2-sub-loc">pp. 7–8</span>
            </div>
            <ul class="v2-list">
              <li class="v2-item"><strong>Artillery Ballistics:</strong> High-explosive shrapnel tearing tissue; Brodie steel helmets introduced in 1915.</li>
              <li class="v2-item"><strong>Flanders Soil Necrosis:</strong> Manured clay breeding lethal anaerobic clostridium (gas gangrene) and tetanus spores.</li>
              <li class="v2-item"><strong>Chemical Weapons:</strong> Chlorine asphyxiation (1915), Phosgene lung edema, and blistering Mustard Gas (1917).</li>
            </ul>
          </div>

          <div class="v2-subtopic">
            <div class="v2-sub-head">
              <span class="v2-sub-title">RAMC Evacuation Chain</span>
              <span class="v2-sub-loc">pp. 9–10</span>
            </div>
            <ul class="v2-list">
              <li class="v2-item"><strong>Forward Relays:</strong> Stretcher bearer relays across Passchendaele mud to Regimental Aid Posts (RAP).</li>
              <li class="v2-item"><strong>CCS Triage:</strong> Casualty Clearing Stations performing urgent life-saving abdominal &amp; thoracic surgery.</li>
              <li class="v2-item"><strong>Specialized Transit:</strong> Motor ambulance convoys, specialized steam hospital trains, and canal barges.</li>
            </ul>
          </div>
        </div>

        <!-- COLUMN 3: CLINICAL BREAKTHROUGHS & INNOVATIONS -->
        <div class="v2-col">
          <div class="v2-col-head">
            <span class="v2-col-title">3. Surgery &amp; Innovations</span>
            <span class="v2-col-badge">ENQUIRIES 05–06</span>
          </div>

          <div class="v2-subtopic">
            <div class="v2-sub-head">
              <span class="v2-sub-title">Surgical &amp; Wound Care</span>
              <span class="v2-sub-loc">pp. 11–12</span>
            </div>
            <ul class="v2-list">
              <li class="v2-item"><strong>The Thomas Splint:</strong> Hugh Owen Thomas traction splint slashes compound femur mortality from 80% to under 20%.</li>
              <li class="v2-item"><strong>Carrel-Dakin Technique:</strong> Continuous sodium hypochlorite irrigation &amp; radical debridement preventing fatal sepsis.</li>
              <li class="v2-item"><strong>Mobile Radiography:</strong> Forward mobile X-ray vans locating jagged shrapnel fragments deep in wounds.</li>
            </ul>
          </div>

          <div class="v2-subtopic">
            <div class="v2-sub-head">
              <span class="v2-sub-title">Transfusion &amp; Reconstruction</span>
              <span class="v2-sub-loc">pp. 13–14</span>
            </div>
            <ul class="v2-list">
              <li class="v2-item"><strong>Preserved Blood Banks:</strong> Sodium citrate anti-coagulation; Oswald Robertson's 1917 Cambrai forward blood depot.</li>
              <li class="v2-item"><strong>Neurosurgery:</strong> Harvey Cushing's specialized local anaesthesia techniques for deep intracranial trauma.</li>
              <li class="v2-item"><strong>Plastic Surgery:</strong> Harold Gillies and the revolutionary tube pedicle vascular skin flap at Queen's Hospital, Sidcup.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Exam Strip -->
      <div class="v2-exam-strip">
        <div class="v2-strip-card">
          <div class="v2-strip-title">Q1: TWO FEATURES [4m]</div>
          <div class="v2-strip-desc">Identify 2 features + support with specific factual detail.</div>
        </div>
        <div class="v2-strip-card">
          <div class="v2-strip-title">Q2(a): SOURCE UTILITY [8m]</div>
          <div class="v2-strip-desc">Evaluate Sources A &amp; B via Content, NOP, and Context.</div>
        </div>
        <div class="v2-strip-card">
          <div class="v2-strip-title">Q2(b): FOLLOW-UP [4m]</div>
          <div class="v2-strip-desc">4-prompt inquiry: Detail &rarr; Question &rarr; Source &rarr; Purpose.</div>
        </div>
        <div class="v2-strip-card">
          <div class="v2-strip-title">AO BREAKDOWN</div>
          <div class="v2-strip-desc">AO1 Recall (6m) &bull; AO2 Causation (8m) &bull; AO3 Sources (12m).</div>
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

  // Render Variant 1
  await page.setContent(renderVariant1(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p1 = await page.$('.page');
  if (p1) await p1.screenshot({ path: `${targetDir}/cover_redesign_v8_variant1.png` });
  console.log('Saved cover_redesign_v8_variant1.png');

  // Render Variant 2
  await page.setContent(renderVariant2(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const p2 = await page.$('.page');
  if (p2) await p2.screenshot({ path: `${targetDir}/cover_redesign_v8_variant2.png` });
  console.log('Saved cover_redesign_v8_variant2.png');

  await browser.close();
})();
