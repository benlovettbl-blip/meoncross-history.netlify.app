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
// APPROACH A: GOLDEN RATIO 50/50 SPLIT (80mm Hero Plate + Packed 2x3 Dossier with 10pt/8.5pt Text)
// ================================================================================
function renderApproachA() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'Theatre of War: British Sector & Trench Systems',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      part1: 'Ypres Salient concentric fire, Somme chalk & Arras tunnels',
      part2: 'Trench design, communications geometry & evacuation routes',
      question: 'How did terrain and trench architecture dictate surgical survival?',
      corePoints:
        "<strong>Key Focus:</strong> Passchendaele ridge artillery dominance; Arras underground cavern hospitals (Thompson's Cave 700 beds).",
    },
    {
      num: '02',
      title: 'Trench Environment: Mud, Vermin & Illnesses',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      part1: 'Waterlogging, persistent cold, Trench Foot & whale oil regimes',
      part2: 'Body lice vectors, Trench Fever & Shell Shock (NYDN) protocol',
      question: 'How did physical conditions create widespread medical crises?',
      corePoints:
        '<strong>Key Focus:</strong> Trench Foot gangrene prevention; pyrexia delousing regimes; forward psychiatric care (Salmon Protocol).',
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery, Infection & Gas',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      part1: 'High-explosive shell shrapnel, ballistics & mangled tissue',
      part2: 'Manured soil microbiology (gas gangrene/tetanus) & chemical gas',
      question: 'Why did industrialised weaponry induce fatal wound sepsis?',
      corePoints:
        '<strong>Key Focus:</strong> Anaerobic clostridium perfringens in Flanders clay; Chlorine (1915), Phosgene & Mustard Gas (1917).',
    },
    {
      num: '04',
      title: 'Chain of Evacuation: Bearers to Base Hospitals',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      part1: 'Stretcher relays, Regimental Aid Posts & Field Dressing Stations',
      part2: 'Casualty Clearing Stations (CCS triage) & specialized transit',
      question: 'How did the RAMC race against the 12-hour surgical window?',
      corePoints:
        '<strong>Key Focus:</strong> 8-man bearer teams in Passchendaele mud; forward abdominal & chest surgery; ambulance trains & canal barges.',
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint & Antiseptics',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      part1: 'Compound femur fractures & Hugh Owen Thomas traction splint',
      part2: 'Carrel-Dakin saline irrigation, wound debridement & mobile X-rays',
      question: 'How did mechanical traction transform frontline survival?',
      corePoints:
        '<strong>Key Focus:</strong> Thomas Splint slashed femur mortality from 80% to 20%; continuous hypochlorite irrigation; mobile radiography vans.',
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      part1: 'Sodium citrate preservation & Robertson’s 1917 blood depot',
      part2: 'Harvey Cushing brain surgery & Harold Gillies plastic pedicles',
      question: 'How did massive trauma compel modern surgical specialties?',
      corePoints:
        "<strong>Key Focus:</strong> Oswald Robertson's mobile Cambrai blood bank; Cushing intracranial decompression; Gillies tube pedicle grafts at Sidcup.",
    },
  ];

  const cardsHtml = enquiries
    .map(
      (e) => `
    <div class="card-item">
      <div class="card-head-row">
        <span class="card-badge">ENQUIRY ${e.num}</span>
        <span class="card-locator">${e.pages} &bull; ${e.ref}</span>
      </div>
      <h3 class="card-title">${e.title}</h3>
      <div class="card-subtopics">
        <div class="sub-row"><span class="sub-tag">PART I:</span> <span class="sub-text">${e.part1}</span></div>
        <div class="sub-row"><span class="sub-tag">PART II:</span> <span class="sub-text">${e.part2}</span></div>
      </div>
      <div class="card-q-box">
        <span class="q-label">KEY QUESTION:</span> <em>"${e.question}"</em>
      </div>
      <div class="card-core-points">${e.corePoints}</div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Approach A: Golden Ratio 50/50 Balanced Cover</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 10mm 12mm 10mm 12mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 277mm; max-height: 277mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 10.5pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 7px; border-radius: 2px; }

    .title-wrap { text-align: center; margin-bottom: 5px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 17pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 10pt; font-style: italic; color: #475569; margin: 0; }

    /* Top Middle Row: Sized generously to 78mm for majestic presence */
    .middle-row { display: grid; grid-template-columns: 88mm 1fr; gap: 11px; margin-bottom: 5px; }
    .hero-col { border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 72mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1.2px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 10px 14px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 9.6pt; line-height: 1.48; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 6px 0; }
    .overview-text p:last-child { margin-bottom: 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between; font-weight: 700; }

    /* Lower Section: 100% Filled, zero dead space, rich readable typography */
    .dossier-container { border: 2px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    
    .dossier-banner { background: #0f172a; color: #ffffff; padding: 5px 12px; display: flex; justify-content: space-between; align-items: center; }
    .dossier-title { font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .dossier-badge { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 6px; background: #f8fafc; flex: 1; }
    
    .card-item { background: #ffffff; border: 1.2px solid #cbd5e1; border-top: 3.5px solid #1e3a8a; border-radius: 3px; padding: 7px 9px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    
    .card-head-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
    .card-badge { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; letter-spacing: 0.05em; }
    .card-locator { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #475569; }
    
    .card-title { font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; color: #0f172a; line-height: 1.2; margin: 0 0 3px 0; }
    
    .card-subtopics { border-left: 2.5px solid #cbd5e1; padding-left: 6px; display: flex; flex-direction: column; gap: 2px; margin-bottom: 3px; }
    .sub-row { font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; color: #334155; }
    .sub-tag { font-weight: 900; color: #1e3a8a; font-size: 6.8pt; }
    .sub-text { color: #334155; }

    .card-q-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 2.5px; padding: 3.5px 7px; font-family: 'Lora', Georgia, serif; font-size: 7.8pt; font-style: italic; color: #1e3a8a; line-height: 1.25; margin-bottom: 3px; }
    .q-label { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 900; color: #1e3a8a; letter-spacing: 0.04em; margin-right: 3px; font-style: normal; }

    .card-core-points { font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.28; color: #334155; border-top: 1px solid #f1f5f9; padding-top: 3px; }
    .card-core-points strong { color: #0f172a; font-weight: 800; }

    /* Bottom Exam Ribbon */
    .exam-ribbon { background: #0f172a; color: #ffffff; padding: 6px 14px; display: grid; grid-template-columns: 1.1fr 1.6fr 1.3fr; gap: 12px; border-top: 2px solid #1e3a8a; }
    .ribbon-col { display: flex; flex-direction: column; justify-content: center; }
    .ribbon-head { font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 2px; }
    .ribbon-body { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 600; color: #e2e8f0; line-height: 1.25; }

    .footer { border-top: 1.2px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; margin-top: 3px; }
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

    <!-- Redesigned High-Density Executive Enquiry Directory -->
    <div class="dossier-container">
      <div class="dossier-banner">
        <span class="dossier-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="dossier-badge">Exact 1:1 Pearson Edexcel Paper 1 Alignment</span>
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
// APPROACH B: 6 FULL-WIDTH HORIZONTAL DISCIPLINARY STRIPS (Dense, Sleek, 0px Void)
// ================================================================================
function renderApproachB() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  const enquiries = [
    {
      num: '01',
      title: 'The British Sector of the Western Front: Landscape & Trench Systems',
      pages: 'pp. 3–4',
      ref: 'Ref [21.1]–[21.5]',
      question: 'How did terrain and trench architecture dictate surgical survival?',
      spec: "Ypres Salient concentric fire &bull; Passchendaele ridge &bull; Arras chalk caverns (Thompson's Cave 700 beds) &bull; Somme frontage",
    },
    {
      num: '02',
      title: 'The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
      pages: 'pp. 5–6',
      ref: 'Ref [22.1]–[22.5]',
      question: 'How did the horrific physical conditions produce mass medical casualties?',
      spec: 'Trench Foot capillary constriction & whale oil &bull; Trench Fever (body lice) &bull; Shell Shock (NYDN) forward Salmon Protocol',
    },
    {
      num: '03',
      title: 'Battlefield Trauma: Artillery Shrapnel, Infection & Poison Gas',
      pages: 'pp. 7–8',
      ref: 'Ref [23.1]–[23.5]',
      question: 'Why did industrialised weaponry and agricultural soil create fatal sepsis?',
      spec: 'High-explosive shell ballistics &bull; Fertilised Flanders clay (clostridium gas gangrene & tetanus) &bull; Chlorine, Phosgene & Mustard Gas',
    },
    {
      num: '04',
      title: 'The RAMC Chain of Evacuation: Stretcher Bearers to Base Hospitals',
      pages: 'pp. 9–10',
      ref: 'Ref [24.1]–[24.5]',
      question:
        'How did the evacuation chain operate as a race against the 12-hour surgical window?',
      spec: 'Stretcher bearer relays (Passchendaele mud) &bull; RAP & Dressing Stations &bull; CCS urgent triage surgery &bull; Ambulance trains & canal barges',
    },
    {
      num: '05',
      title: 'Surgical Breakthroughs: Thomas Splint, Antiseptics & Radiography',
      pages: 'pp. 11–12',
      ref: 'Ref [25.1]–[25.5]',
      question: 'How did mechanical traction and continuous irrigation transform survival?',
      spec: 'Thomas Splint slashes compound femur mortality (80% &rarr; 20%) &bull; Carrel-Dakin continuous hypochlorite flush &bull; Mobile X-ray vans',
    },
    {
      num: '06',
      title: 'Lifesaving Innovations: Blood Storage, Neurosurgery & Reconstruction',
      pages: 'pp. 13–14',
      ref: 'Ref [26.1]–[26.5]',
      question: 'How did massive head and facial trauma compel modern surgical specialties?',
      spec: "Sodium citrate preservation & Oswald Robertson's 1917 Cambrai blood bank &bull; Cushing intracranial surgery &bull; Gillies tube pedicles",
    },
  ];

  const stripsHtml = enquiries
    .map(
      (e) => `
    <div class="strip-item">
      <div class="strip-left">
        <span class="strip-badge">ENQUIRY ${e.num}</span>
        <span class="strip-locator">${e.pages}</span>
      </div>
      <div class="strip-main">
        <div class="strip-title-row">
          <h3 class="strip-title">${e.title}</h3>
          <span class="strip-ref">${e.ref}</span>
        </div>
        <div class="strip-q"><em>"${e.question}"</em></div>
        <div class="strip-spec"><strong>Syllabus Anchors:</strong> ${e.spec}</div>
      </div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Approach B: 6 Horizontal Disciplinary Highway Strips</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page { size: A4 portrait; margin: 10mm 12mm 10mm 12mm; }
    body { font-family: 'Lora', Georgia, serif; background: #fff; margin: 0; padding: 0; }
    .page { width: 100%; height: 277mm; max-height: 277mm; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
    
    .masthead { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; }
    .masthead-title { font-family: 'Cinzel', serif; font-size: 10.5pt; font-weight: 900; letter-spacing: 0.12em; color: #0f172a; }
    .masthead-badge { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 7px; border-radius: 2px; }

    .title-wrap { text-align: center; margin-bottom: 5px; }
    .pill { font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 17pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 10pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 88mm 1fr; gap: 11px; margin-bottom: 5px; }
    .hero-col { border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 68mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1.2px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 10px 14px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 9.5pt; line-height: 1.46; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 6px 0; }
    .overview-text p:last-child { margin-bottom: 0; }
    .overview-footer { font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between; font-weight: 700; }

    /* 6 Full-Width Horizontal Highway Strips */
    .highway-container { border: 2px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    
    .highway-banner { background: #0f172a; color: #ffffff; padding: 5px 12px; display: flex; justify-content: space-between; align-items: center; }
    .highway-title { font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .highway-badge { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; }

    .highway-list { display: flex; flex-direction: column; gap: 4px; padding: 5px; background: #f8fafc; flex: 1; justify-content: space-between; }
    
    .strip-item { background: #ffffff; border: 1.2px solid #cbd5e1; border-left: 4.5px solid #1e3a8a; border-radius: 3px; padding: 5.5px 8px; display: flex; gap: 10px; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    
    .strip-left { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 22mm; flex-shrink: 0; border-right: 1.5px solid #e2e8f0; padding-right: 8px; }
    .strip-badge { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1.5px 5.5px; border-radius: 2px; letter-spacing: 0.04em; white-space: nowrap; margin-bottom: 2px; }
    .strip-locator { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #0f172a; }

    .strip-main { flex: 1; display: flex; flex-direction: column; gap: 1.5px; }
    .strip-title-row { display: flex; justify-content: space-between; align-items: baseline; }
    .strip-title { font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 800; color: #0f172a; margin: 0; }
    .strip-ref { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #64748b; }

    .strip-q { font-family: 'Lora', Georgia, serif; font-size: 7.4pt; font-style: italic; color: #1e3a8a; line-height: 1.2; }
    .strip-spec { font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; line-height: 1.22; }
    .strip-spec strong { color: #0f172a; }

    /* Bottom Exam Ribbon */
    .exam-ribbon { background: #0f172a; color: #ffffff; padding: 5px 14px; display: grid; grid-template-columns: 1.1fr 1.6fr 1.3fr; gap: 12px; border-top: 2px solid #1e3a8a; }
    .ribbon-col { display: flex; flex-direction: column; justify-content: center; }
    .ribbon-head { font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #93c5fd; margin-bottom: 1.5px; }
    .ribbon-body { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 600; color: #e2e8f0; line-height: 1.22; }

    .footer { border-top: 1.2px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; margin-top: 3px; }
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

    <!-- 6 Full-Width Horizontal Highway Strips -->
    <div class="highway-container">
      <div class="highway-banner">
        <span class="highway-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="highway-badge">Exact 1:1 Pearson Edexcel Paper 1 Alignment</span>
      </div>
      <div class="highway-list">
        ${stripsHtml}
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

  // Render Approach A
  await page.setContent(renderApproachA(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const pA = await page.$('.page');
  if (pA) await pA.screenshot({ path: `${targetDir}/cover_redesign_approach_A.png` });
  console.log('Saved cover_redesign_approach_A.png');

  // Render Approach B
  await page.setContent(renderApproachB(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const pB = await page.$('.page');
  if (pB) await pB.screenshot({ path: `${targetDir}/cover_redesign_approach_B.png` });
  console.log('Saved cover_redesign_approach_B.png');

  await browser.close();
})();
