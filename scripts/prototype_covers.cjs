const fs = require('fs');
const puppeteer = require('puppeteer');

// Load unit data and metadata
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

// Option A: Refined CME-Style Disciplinary Matrix (High density, structured cards, locator badges, no empty voids, exam ribbon)
function renderOptionA() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cover Prototype A</title>
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
    .pill { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 15.5pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 1px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.2pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 1.05fr 1fr; gap: 10px; margin-bottom: 6px; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 60mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 8px 12px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 8.8pt; line-height: 1.38; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 5px 0; }

    /* Redesigned Specification Matrix: High density, academic typography, no void gaps */
    .spec-matrix-container { border: 1.5px solid #0f172a; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 4px; }
    .spec-matrix-header { background: #0f172a; color: #ffffff; padding: 4px 10px; display: flex; justify-content: space-between; align-items: center; }
    .spec-header-title { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
    .spec-header-sub { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 600; color: #94a3b8; }

    .spec-matrix-body { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: #cbd5e1; flex: 1; }
    .spec-col-box { background: #ffffff; padding: 6px 8px; display: flex; flex-direction: column; }
    .spec-box-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 5px; }
    .spec-box-tag { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; background: #1e3a8a; color: #ffffff; padding: 1px 4px; border-radius: 2px; }
    .spec-box-title { font-family: 'Inter', sans-serif; font-size: 6.7pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.03em; }

    .spec-items-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between; }
    .spec-item-row { display: flex; gap: 5px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.28; color: #334155; }
    .spec-item-bullet { color: #1e3a8a; font-weight: 900; font-size: 7pt; line-height: 1; flex-shrink: 0; margin-top: 1px; }
    .spec-item-content { flex: 1; }
    .spec-item-content strong { color: #0f172a; font-weight: 700; }

    /* Bottom Exam Blueprint Strip */
    .spec-exam-strip { background: #f8fafc; border-top: 1px solid #cbd5e1; padding: 4px 8px; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6pt; }
    .exam-tag-card { background: #ffffff; border: 1px solid #e2e8f0; border-left: 2.5px solid #1e3a8a; padding: 2px 5px; border-radius: 2px; }
    .exam-tag-title { font-weight: 800; color: #0f172a; margin-bottom: 1px; }
    .exam-tag-desc { color: #64748b; font-size: 5.4pt; }

    .footer { border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; }
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
          <div class="overview-header">HISTORICAL OVERVIEW &bull; 1914–1918</div>
          <div class="overview-text">
            <p>The catastrophic industrial violence of the First World War turned the Western Front into an unprecedented trauma laboratory. In the waterlogged, heavily manured clay soils of Flanders and the Somme, high-velocity artillery shrapnel and machine-gun fire inflicted gruesome lacerations contaminated with deadly anaerobic bacteria, inducing gas gangrene, tetanus, and horrific shock.</p>
            <p>To survive, British military medicine pioneered revolutionary innovations: the rapid evacuation chain from Regimental Aid Posts to Casualty Clearing Stations, the life-saving Thomas Splint that slashed compound femur mortality from eighty to twenty percent, mobile X-ray units, preserved blood transfusions at Cambrai, and Harold Gillies’s pioneering plastic surgery.</p>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Specification Backbone</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tier 2: Refined High-Density Specification Matrix -->
    <div class="spec-matrix-container">
      <div class="spec-matrix-header">
        <span class="spec-header-title">PEARSON EDEXCEL SPECIFICATION BLUEPRINT &bull; DISCIPLINARY SYLLABUS MATRIX</span>
        <span class="spec-header-sub">Paper 1 Option 11: The Historic Environment &bull; Complete Core Coverage</span>
      </div>

      <div class="spec-matrix-body">
        <!-- Col 1 -->
        <div class="spec-col-box">
          <div class="spec-box-header">
            <span class="spec-box-title">Core Specification Enquiries</span>
            <span class="spec-box-tag">COL 01</span>
          </div>
          <ul class="spec-items-list">
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>L21: Theatre of War:</strong> Trench geography, Ypres Salient &amp; Arras tunnels</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>L22: Trench Environment:</strong> Mud, lice, trench foot &amp; NYDN shell shock</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>L23: Battlefield Trauma:</strong> High explosive shrapnel, gas attacks &amp; infection</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>L24: Chain of Evacuation:</strong> Bearers, RAP, Dressing Stations &amp; CCS triage</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>L25: Surgical Breakthroughs:</strong> Thomas Splint, debridement &amp; mobile X-rays</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>L26: Lifesaving Innovations:</strong> Blood storage banks &amp; plastic reconstruction</span></li>
          </ul>
        </div>

        <!-- Col 2 -->
        <div class="spec-col-box">
          <div class="spec-box-header">
            <span class="spec-box-title">Historic Environment Concepts</span>
            <span class="spec-box-tag">COL 02</span>
          </div>
          <ul class="spec-items-list">
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>The Salient Vulnerability:</strong> Concentric German artillery bombardment</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Fertilised Soil Ecology:</strong> Anaerobic gas gangrene &amp; tetanus clostridium</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Triage &amp; Speed Window:</strong> Stretcher bearer relays to forward surgical CCS</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Biomechanical Fixation:</strong> Hugh Owen Thomas traction femur stabilisation</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Blood Preservation:</strong> Oswald Robertson’s 1917 Cambrai citrate depot</span></li>
          </ul>
        </div>

        <!-- Col 3 -->
        <div class="spec-col-box">
          <div class="spec-box-header">
            <span class="spec-box-title">Examination Architecture</span>
            <span class="spec-box-tag">COL 03</span>
          </div>
          <ul class="spec-items-list">
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Q1(a): Feature 1 [2m]:</strong> Identify feature + specific historical evidence</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Q1(b): Feature 2 [2m]:</strong> Identify distinct feature + factual detail</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Q2(a): Source Utility [8m]:</strong> Evaluate Sources A &amp; B (Content, NOP, Context)</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Q2(b): 4-Prompt Follow-Up [4m]:</strong> Detail, Question, Source type, Purpose</span></li>
            <li class="spec-item-row"><span class="spec-item-bullet">▪</span><span class="spec-item-content"><strong>Assessment Objectives:</strong> AO1 Detail (6m) &bull; AO2 Analysis &bull; AO3 Sources (12m)</span></li>
          </ul>
        </div>
      </div>

      <!-- Exam Blueprint Strip -->
      <div class="spec-exam-strip">
        <div class="exam-tag-card">
          <div class="exam-tag-title">Q1: TWO FEATURES [4m]</div>
          <div class="exam-tag-desc">Describe two key features of medical treatment or evacuation.</div>
        </div>
        <div class="exam-tag-card">
          <div class="exam-tag-title">Q2(a): SOURCE UTILITY [8m]</div>
          <div class="exam-tag-desc">How useful are Sources A and B for an enquiry into trench trauma?</div>
        </div>
        <div class="exam-tag-card">
          <div class="exam-tag-title">Q2(b): FOLLOW-UP [4m]</div>
          <div class="exam-tag-desc">Detail &rarr; Question &rarr; Source Type &rarr; Investigation Purpose.</div>
        </div>
        <div class="exam-tag-card">
          <div class="exam-tag-title">AO BREAKDOWN</div>
          <div class="exam-tag-desc">AO1 Knowledge (6m) &bull; AO2 Causation (8m) &bull; AO3 Sources (12m).</div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <span>Page 1 &bull; Master Cover &amp; Specification Blueprint</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span>16 Pages &bull; Saddle-Stitch</span>
    </footer>
  </div>
</body>
</html>`;
}

// Option B: The "Executive Curriculum Dossier" (6-Enquiry Cards with Embedded Spec Anchors + Assessment Footer Strip)
function renderOptionB() {
  const era = MEDICINE_ERAS.western_front;
  const heroImg = getBase64Image(era.coverImage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cover Prototype B</title>
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
    .pill { font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #1e3a8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
    .main-title { font-family: 'Cinzel', serif; font-size: 15.5pt; font-weight: 900; letter-spacing: 0.03em; color: #0f172a; margin: 0 0 1px 0; white-space: nowrap; }
    .subtitle { font-family: 'Playfair Display', Georgia, serif; font-size: 9.2pt; font-style: italic; color: #475569; margin: 0; }

    .middle-row { display: grid; grid-template-columns: 1.05fr 1fr; gap: 10px; margin-bottom: 6px; }
    .hero-col { border: 1px solid #cbd5e1; border-radius: 4px; padding: 3.5px; background: #fafaf9; display: flex; flex-direction: column; }
    .hero-frame { height: 60mm; overflow: hidden; border-radius: 3px; background: #fff; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .hero-caption { font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.25; color: #475569; margin-top: 3px; }

    .overview-card { border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 4px; padding: 8px 12px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
    .overview-header { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px; }
    .overview-text { font-family: 'Lora', Georgia, serif; font-size: 8.8pt; line-height: 1.38; color: #1e293b; text-align: justify; }
    .overview-text p { margin: 0 0 5px 0; }

    /* Option B: 6 Enquiry Cards with Specification Anchors + Bottom Blueprint Ribbon */
    .dossier-container { border: 1px solid #cbd5e1; border-radius: 4px; background: #ffffff; flex: 1; display: flex; flex-direction: column; padding: 6px 8px; margin-top: 4px; }
    .dossier-header-strip { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f172a; padding-bottom: 2.5px; margin-bottom: 5px; }
    .dossier-header-title { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.10em; text-transform: uppercase; color: #0f172a; }
    .dossier-header-sub { font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-weight: 700; text-transform: uppercase; }

    .dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; flex: 1; margin-bottom: 5px; }
    .enquiry-card { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between; }
    .enquiry-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5px; }
    .enquiry-badge { font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 900; background: #0f172a; color: #ffffff; padding: 1px 4.5px; border-radius: 2px; }
    .enquiry-loc { font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; color: #1e3a8a; }
    .enquiry-title { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f172a; line-height: 1.18; margin-bottom: 1.5px; }
    .enquiry-anchor { font-family: 'Lora', Georgia, serif; font-size: 6.2pt; color: #475569; font-style: italic; line-height: 1.22; }
    .enquiry-spec-tag { font-family: 'Inter', sans-serif; font-size: 5.4pt; font-weight: 700; color: #1e3a8a; background: #e0f2fe; padding: 1px 4px; border-radius: 2px; display: inline-block; margin-top: 2px; align-self: flex-start; }

    /* Bottom Blueprint Ribbon */
    .blueprint-ribbon { background: #0f172a; color: #ffffff; border-radius: 3px; padding: 4px 8px; display: grid; grid-template-columns: 1.4fr 1.3fr 1.3fr; gap: 8px; font-family: 'Inter', sans-serif; }
    .ribbon-col { border-right: 1px solid #334155; padding-right: 6px; }
    .ribbon-col:last-child { border-right: none; padding-right: 0; }
    .ribbon-head { font-size: 5.8pt; font-weight: 900; color: #93c5fd; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1px; }
    .ribbon-body { font-size: 5.6pt; color: #cbd5e1; line-height: 1.25; }

    .footer { border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; }
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
          <div class="overview-header">HISTORICAL OVERVIEW &bull; 1914–1918</div>
          <div class="overview-text">
            <p>The catastrophic industrial violence of the First World War turned the Western Front into an unprecedented trauma laboratory. In the waterlogged, heavily manured clay soils of Flanders and the Somme, high-velocity artillery shrapnel and machine-gun fire inflicted gruesome lacerations contaminated with deadly anaerobic bacteria, inducing gas gangrene, tetanus, and horrific shock.</p>
            <p>To survive, British military medicine pioneered revolutionary innovations: the rapid evacuation chain from Regimental Aid Posts to Casualty Clearing Stations, the life-saving Thomas Splint that slashed compound femur mortality from eighty to twenty percent, mobile X-ray units, preserved blood transfusions at Cambrai, and Harold Gillies’s pioneering plastic surgery.</p>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 3px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Specification Backbone</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Option B: 6 Enquiry Cards with Specification Anchors + Bottom Blueprint Ribbon -->
    <div class="dossier-container">
      <div class="dossier-header-strip">
        <span class="dossier-header-title">CANONICAL DISCIPLINARY ENQUIRIES &bull; SPECIFICATION BLUEPRINT</span>
        <span class="dossier-header-sub">Exact 1:1 Pearson Edexcel Paper 1 Option 11 Curriculum Alignment</span>
      </div>

      <div class="dossier-grid">
        <div class="enquiry-card">
          <div class="enquiry-card-top">
            <span class="enquiry-badge">ENQUIRY 01</span>
            <span class="enquiry-loc">pp. 3–4 &bull; Ref [1.1]–[1.5]</span>
          </div>
          <div class="enquiry-title">The Theatre of War: British Sector, Trench Geography &amp; Battles</div>
          <div class="enquiry-anchor">"How did trench design and battlefield terrain shape surgical survival?"</div>
          <span class="enquiry-spec-tag">Spec Anchor: Ypres Salient &bull; Arras Chalk Caves &bull; Somme Frontage</span>
        </div>

        <div class="enquiry-card">
          <div class="enquiry-card-top">
            <span class="enquiry-badge">ENQUIRY 02</span>
            <span class="enquiry-loc">pp. 5–6 &bull; Ref [2.1]–[2.5]</span>
          </div>
          <div class="enquiry-title">The Trench Environment: Mud, Vermin &amp; Non-Combat Illnesses</div>
          <div class="enquiry-anchor">"How did the horrific physical environment create widespread health crises?"</div>
          <span class="enquiry-spec-tag">Spec Anchor: Trench Foot &bull; Trench Fever (Lice) &bull; Shell Shock (NYDN)</span>
        </div>

        <div class="enquiry-card">
          <div class="enquiry-card-top">
            <span class="enquiry-badge">ENQUIRY 03</span>
            <span class="enquiry-loc">pp. 7–8 &bull; Ref [3.1]–[3.5]</span>
          </div>
          <div class="enquiry-title">Battlefield Trauma: High Explosive Shrapnel, Gas Attacks &amp; Infection</div>
          <div class="enquiry-anchor">"How did industrialised weaponry and manured soil create lethal wounds?"</div>
          <span class="enquiry-spec-tag">Spec Anchor: Gas Gangrene &bull; Phosgene / Mustard Gas &bull; Brodie Helmets</span>
        </div>

        <div class="enquiry-card">
          <div class="enquiry-card-top">
            <span class="enquiry-badge">ENQUIRY 04</span>
            <span class="enquiry-loc">pp. 9–10 &bull; Ref [4.1]–[4.5]</span>
          </div>
          <div class="enquiry-title">The Chain of Evacuation: Bearers, RAP, Dressing Stations &amp; CCS</div>
          <div class="enquiry-anchor">"How did the evacuation chain function as a race against surgical time?"</div>
          <span class="enquiry-spec-tag">Spec Anchor: Stretcher Bearer Relays &bull; CCS Triage &bull; Ambulance Trains</span>
        </div>

        <div class="enquiry-card">
          <div class="enquiry-card-top">
            <span class="enquiry-badge">ENQUIRY 05</span>
            <span class="enquiry-loc">pp. 11–12 &bull; Ref [5.1]–[5.5]</span>
          </div>
          <div class="enquiry-title">Surgical Breakthroughs: Thomas Splint, Debridement &amp; Mobile X-Rays</div>
          <div class="enquiry-anchor">"How did mechanical innovations conquer compound fractures and wound sepsis?"</div>
          <span class="enquiry-spec-tag">Spec Anchor: Hugh Owen Thomas Splint &bull; Carrel-Dakin &bull; Mobile Radiography</span>
        </div>

        <div class="enquiry-card">
          <div class="enquiry-card-top">
            <span class="enquiry-badge">ENQUIRY 06</span>
            <span class="enquiry-loc">pp. 13–14 &bull; Ref [6.1]–[6.5]</span>
          </div>
          <div class="enquiry-title">Lifesaving Innovations: Blood Storage, Brain Surgery &amp; Reconstruction</div>
          <div class="enquiry-anchor">"How did massive head trauma drive neurosurgery and facial reconstruction?"</div>
          <span class="enquiry-spec-tag">Spec Anchor: Sodium Citrate (Robertson) &bull; Cushing &bull; Harold Gillies Pedicles</span>
        </div>
      </div>

      <!-- Bottom Blueprint Ribbon -->
      <div class="blueprint-ribbon">
        <div class="ribbon-col">
          <div class="ribbon-head">Pearson Edexcel Examination Blueprint</div>
          <div class="ribbon-body">Paper 1 Option 11: Section A (Historic Environment) &bull; 1HI0/11</div>
        </div>
        <div class="ribbon-col">
          <div class="ribbon-head">Section A Question Breakdown</div>
          <div class="ribbon-body">Q1: Two Features [4m] &bull; Q2(a): Source Utility [8m] &bull; Q2(b): 4-Prompt Follow-Up [4m]</div>
        </div>
        <div class="ribbon-col">
          <div class="ribbon-head">Disciplinary Architecture</div>
          <div class="ribbon-body">100% Pure Historical Narrative &bull; Zero Inline Distractions &bull; Retrieval Engine</div>
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

  // Render Option A
  await page.setContent(renderOptionA(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const pA = await page.$('.page');
  if (pA) await pA.screenshot({ path: `${targetDir}/cover_proto_A.png` });
  console.log('Saved cover_proto_A.png');

  // Render Option B
  await page.setContent(renderOptionB(), { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  const pB = await page.$('.page');
  if (pB) await pB.screenshot({ path: `${targetDir}/cover_proto_B.png` });
  console.log('Saved cover_proto_B.png');

  await browser.close();
})();
