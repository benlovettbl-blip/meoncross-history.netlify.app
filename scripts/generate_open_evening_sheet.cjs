const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

/**
 * Open Evening A3 Department Showcase & Curriculum Guide Generator
 * Formats a publisher-grade, museum-archive A3 display sheet (420mm x 297mm landscape)
 * with authentic historical imagery, curriculum pathways, and live scannable QR codes.
 */

async function generateOpenEveningSheet() {
  console.log('🎨 Generating History Department Open Evening A3 Showcase Sheet...');

  const HUB_BASE_URL = process.env.HUB_URL || 'https://the-history-revision-hub.netlify.app';
  const portalUrl = `${HUB_BASE_URL}/?view=lessons`;
  const quizUrl = `${HUB_BASE_URL}/?view=quiz`;

  // Generate high-resolution QR codes as base64 data URLs
  const qrPortalDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    width: 340,
    color: { dark: '#0f172a', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  });

  const qrQuizDataUrl = await QRCode.toDataURL(quizUrl, {
    margin: 1,
    width: 340,
    color: { dark: '#0f172a', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  });

  // Helper to load and encode local images to base64
  function getBase64Image(relPath) {
    const absPath = path.join(__dirname, '..', relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`⚠️ Warning: Image not found at ${absPath}`);
      return '';
    }
    const ext = path.extname(absPath).replace('.', '').toLowerCase();
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    const buffer = fs.readFileSync(absPath);
    return `data:${mime};base64,${buffer.toString('base64')}`;
  }

  const imgWilliam = getBase64Image('public/images/william_the_conqueror.jpg');
  const imgElizabeth = getBase64Image('public/images/elizabeth_coronation_portrait.jpg');
  const imgYpres = getBase64Image('public/images/ypres_cloth_hall.jpg');
  const imgTyneCot = getBase64Image('public/images/ypres_tyne_cot.jpg');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The History Department - Open Evening Showcase & Curriculum Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A3 landscape;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 420mm;
      height: 297mm;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #fdfbf7;
      color: #1e293b;
      position: relative;
      overflow: hidden;
    }

    /* Outer Presentation Board */
    .a3-board {
      width: 420mm;
      height: 297mm;
      padding: 7mm 9mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background: #fdfbf7;
    }

    /* Classical Double Archival Borders */
    .outer-border {
      position: absolute;
      top: 4mm;
      left: 4mm;
      right: 4mm;
      bottom: 4mm;
      border: 2px solid #0f172a;
      pointer-events: none;
      z-index: 50;
    }
    .inner-border {
      position: absolute;
      top: 5.4mm;
      left: 5.4mm;
      right: 5.4mm;
      bottom: 5.4mm;
      border: 1px solid #d97706;
      pointer-events: none;
      z-index: 50;
    }

    /* Corner Accents */
    .corner-ornament {
      position: absolute;
      width: 12mm;
      height: 12mm;
      pointer-events: none;
      z-index: 51;
    }
    .corner-tl { top: 6.2mm; left: 6.2mm; border-top: 2px solid #b45309; border-left: 2px solid #b45309; }
    .corner-tr { top: 6.2mm; right: 6.2mm; border-top: 2px solid #b45309; border-right: 2px solid #b45309; }
    .corner-bl { bottom: 6.2mm; left: 6.2mm; border-bottom: 2px solid #b45309; border-left: 2px solid #b45309; }
    .corner-br { bottom: 6.2mm; right: 6.2mm; border-bottom: 2px solid #b45309; border-right: 2px solid #b45309; }

    /* ==========================================================================
       HEADER: Department Masthead & Core Principles
       ========================================================================== */
    .dept-header {
      width: 100%;
      background: linear-gradient(135deg, #091322 0%, #0f172a 50%, #1e293b 100%);
      color: #ffffff;
      padding: 3.5mm 7mm 3mm 7mm;
      border-radius: 4px;
      border-bottom: 2.5px solid #d97706;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6mm;
      position: relative;
      z-index: 10;
    }

    .header-crest {
      display: flex;
      align-items: center;
      gap: 3.5mm;
      flex-shrink: 0;
    }
    .crest-seal {
      width: 15mm;
      height: 15mm;
      border: 1.5px solid #d97706;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, #1e3a8a 0%, #091322 100%);
      box-shadow: inset 0 0 6px rgba(217, 119, 6, 0.4);
    }
    .crest-seal svg {
      width: 9mm;
      height: 9mm;
      fill: #fbbf24;
    }

    .header-titles {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .super-title {
      font-family: 'Cinzel', serif;
      font-size: 7.8pt;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: #fbbf24;
      text-transform: uppercase;
      margin-bottom: 0.3mm;
    }
    .main-title {
      font-family: 'Cinzel', serif;
      font-size: 21pt;
      font-weight: 900;
      letter-spacing: 0.04em;
      line-height: 1.05;
      color: #ffffff;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }
    .tagline-sub {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 9.6pt;
      color: #e2e8f0;
      margin-top: 0.7mm;
    }

    .header-badges-col {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.5mm;
      flex-shrink: 0;
    }
    .open-evening-badge {
      display: inline-flex;
      align-items: center;
      gap: 2mm;
      background: #b45309;
      color: #fff;
      font-family: 'Cinzel', serif;
      font-size: 7.8pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      padding: 1mm 3.2mm;
      border-radius: 3px;
      border: 1px solid #fbbf24;
      text-transform: uppercase;
    }
    .values-strip {
      display: flex;
      gap: 1.6mm;
    }
    .value-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 700;
      color: #cbd5e1;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0.6mm 1.8mm;
      border-radius: 2px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* ==========================================================================
       MAIN CONTENT: 4-Column Balanced Architectural Showcase
       ========================================================================== */
    .showcase-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4.5mm;
      height: 226mm;
      margin-top: 2.8mm;
      margin-bottom: 2.5mm;
      position: relative;
      z-index: 10;
    }

    .column-panel {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-top: 3.5px solid #0f172a;
      border-radius: 4px;
      padding: 3mm 3mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
      position: relative;
    }

    .column-panel.highlight-col {
      border-top-color: #b45309;
      background: #fdfcf9;
    }

    /* Column Header */
    .col-header {
      margin-bottom: 1.5mm;
      flex-shrink: 0;
    }
    .col-badge {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 0.6mm 1.8mm;
      border-radius: 2px;
      text-transform: uppercase;
      margin-bottom: 0.8mm;
    }
    .badge-navy { background: #0f172a; color: #ffffff; }
    .badge-blue { background: #1e3a8a; color: #ffffff; }
    .badge-amber { background: #92400e; color: #ffffff; }
    .badge-gold { background: #78350f; color: #fef3c7; border: 1px solid #d97706; }

    .col-title {
      font-family: 'Playfair Display', serif;
      font-size: 13.5pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.12;
      margin: 0 0 0.5mm 0;
    }
    .col-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 1.2mm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Image Plate */
    .image-plate-container {
      width: 100%;
      height: 41mm;
      border-radius: 3px;
      overflow: hidden;
      position: relative;
      border: 1px solid #cbd5e1;
      margin-bottom: 2mm;
      background: #0f172a;
      flex-shrink: 0;
    }
    .image-plate-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .img-pos-william { object-position: 50% 0% !important; }
    .img-pos-queen { object-position: 50% 12% !important; }
    .img-pos-cloth { object-position: 50% 45% !important; }

    .dual-image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5mm;
      height: 41mm;
      margin-bottom: 2mm;
      flex-shrink: 0;
    }
    .dual-image-item {
      position: relative;
      border-radius: 3px;
      overflow: hidden;
      border: 1px solid #cbd5e1;
      background: #0f172a;
    }
    .dual-image-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .image-plate-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(15, 23, 42, 0.94) 55%);
      color: #f8fafc;
      font-size: 6.2pt;
      font-weight: 500;
      padding: 1.8mm 2mm 0.8mm 2mm;
      line-height: 1.2;
    }

    /* Column Body & Structured Content */
    .col-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2.2mm;
    }

    .enquiry-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #1e3a8a;
      border-radius: 2px;
      padding: 2.2mm 2.6mm;
      display: flex;
      flex-direction: column;
      gap: 0.8mm;
    }
    .enquiry-card.amber-edge { border-left-color: #d97706; }
    .enquiry-card.navy-edge { border-left-color: #0f172a; }

    .enquiry-year {
      font-family: 'Cinzel', serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .enquiry-year .term-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .enquiry-stem {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 6.8pt;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.22;
    }

    /* Clean Card List */
    .card-list {
      margin: 0;
      padding-left: 3.2mm;
      list-style-type: square;
    }
    .card-list li {
      font-size: 6.6pt;
      line-height: 1.3;
      color: #334155;
      margin-bottom: 0.6mm;
    }
    .card-list li:last-child {
      margin-bottom: 0;
    }
    .card-list li strong {
      color: #0f172a;
    }

    /* Pedagogy / Feature Callout Box */
    .feature-callout {
      background: #f1f5f9;
      border: 1px dashed #94a3b8;
      border-radius: 3px;
      padding: 2mm 2.4mm;
      margin-top: auto;
    }
    .feature-title {
      font-family: 'Cinzel', serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 0.6mm;
      display: flex;
      align-items: center;
      gap: 1.5mm;
      letter-spacing: 0.04em;
    }
    .feature-text {
      font-size: 6.5pt;
      line-height: 1.32;
      color: #475569;
      margin: 0;
    }

    /* Exam Paper Breakdown */
    .paper-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #0f172a;
      border-radius: 2px;
      padding: 2.2mm 2.6mm;
      display: flex;
      flex-direction: column;
      gap: 0.8mm;
    }
    .paper-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .paper-badge {
      font-family: 'Cinzel', serif;
      font-size: 6.5pt;
      font-weight: 800;
      background: #0f172a;
      color: #ffffff;
      padding: 0.4mm 1.5mm;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .paper-weighting {
      font-family: 'Inter', sans-serif;
      font-size: 6pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
    }
    .paper-title {
      font-family: 'Playfair Display', serif;
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.2;
    }

    /* Fieldwork & Career List */
    .bullet-list {
      margin: 0;
      padding-left: 3.5mm;
      list-style-type: square;
    }
    .bullet-list li {
      font-size: 6.7pt;
      line-height: 1.3;
      color: #334155;
      margin-bottom: 0.8mm;
    }
    .bullet-list li:last-child {
      margin-bottom: 0;
    }
    .bullet-list li strong { color: #0f172a; }

    /* QR Code Showcase Box (Column 4) */
    .qr-interactive-block {
      background: #ffffff;
      border: 1.5px solid #d97706;
      border-radius: 4px;
      padding: 2.2mm 2.4mm;
      display: flex;
      align-items: center;
      gap: 3mm;
      box-shadow: 0 2px 4px rgba(217, 119, 6, 0.08);
      flex-shrink: 0;
    }
    .qr-image-wrapper {
      width: 27mm;
      height: 27mm;
      flex-shrink: 0;
      background: #ffffff;
      padding: 1mm;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-image-wrapper img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .qr-info {
      flex: 1;
    }
    .qr-badge {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 6pt;
      font-weight: 800;
      background: #b45309;
      color: #ffffff;
      padding: 0.4mm 1.5mm;
      border-radius: 2px;
      text-transform: uppercase;
      margin-bottom: 0.6mm;
    }
    .qr-title {
      font-family: 'Playfair Display', serif;
      font-size: 9.2pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 0.6mm 0;
    }
    .qr-desc {
      font-size: 6.6pt;
      line-height: 1.28;
      color: #475569;
      margin: 0;
    }

    /* What Students Receive Strip */
    .suite-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 2mm 2.4mm;
      flex-shrink: 0;
    }
    .suite-title {
      font-family: 'Cinzel', serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 0.8mm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .suite-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2mm 2mm;
    }
    .suite-item {
      font-size: 6.3pt;
      color: #334155;
      line-height: 1.25;
      display: flex;
      align-items: flex-start;
      gap: 1.2mm;
    }
    .suite-dot {
      color: #d97706;
      font-weight: 900;
      font-size: 7pt;
      line-height: 1;
    }

    /* Testimonials / Student Voice */
    .voices-card {
      background: #fdfbf7;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #b45309;
      border-radius: 3px;
      padding: 2.2mm 2.5mm;
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
    }
    .voice-entry {
      font-style: italic;
      font-size: 6.6pt;
      line-height: 1.32;
      color: #334155;
    }
    .voice-author {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-size: 6pt;
      font-weight: 700;
      color: #0f172a;
      text-align: right;
      margin-top: 0.6mm;
    }

    /* ==========================================================================
       FOOTER: Welcome Banner & Open Evening Invitation
       ========================================================================== */
    .dept-footer {
      width: 100%;
      background: #0f172a;
      color: #ffffff;
      padding: 2.6mm 7.5mm;
      border-radius: 3px;
      border-top: 2px solid #d97706;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4mm;
      position: relative;
      z-index: 10;
    }
    .footer-instructions {
      display: flex;
      align-items: center;
      gap: 2.5mm;
    }
    .footer-step-number {
      width: 6mm;
      height: 6mm;
      background: #d97706;
      color: #ffffff;
      border-radius: 50%;
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 7.2pt;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .footer-text {
      font-size: 7.4pt;
      line-height: 1.22;
      color: #e2e8f0;
    }
    .footer-text strong {
      color: #fbbf24;
      font-weight: 700;
    }

    .footer-brand {
      font-family: 'Cinzel', serif;
      font-size: 7.6pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #ffffff;
      text-align: right;
      white-space: nowrap;
    }
    .footer-brand span {
      color: #fbbf24;
    }
  </style>
</head>
<body>

  <!-- Decorative Outer Frame -->
  <div class="outer-border"></div>
  <div class="inner-border"></div>
  <div class="corner-ornament corner-tl"></div>
  <div class="corner-ornament corner-tr"></div>
  <div class="corner-ornament corner-bl"></div>
  <div class="corner-ornament corner-br"></div>

  <div class="a3-board">

    <!-- ====================================================================
         TOP HEADER MASTHEAD
         ==================================================================== -->
    <header class="dept-header" data-department-name="The History Department">
      <div class="header-crest">
        <div class="crest-seal">
          <svg viewBox="0 0 24 24">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.1-2.67 7.93-6 8.91-3.33-.98-6-4.81-6-8.91V6.43l6-2.25zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
          </svg>
        </div>
        <div class="header-titles">
          <div class="super-title">Excellence in Historical Scholarship • Key Stage 3 & GCSE</div>
          <h1 class="main-title"><span class="school-brand-target">The History Department</span></h1>
          <div class="tagline-sub">Inspiring intellectual curiosity, evidential rigour, and critical independence</div>
        </div>
      </div>

      <div class="header-badges-col">
        <div class="open-evening-badge">
          <span>★</span> Open Evening Guide &bull; 2026–2027 <span>★</span>
        </div>
        <div class="values-strip">
          <span class="value-pill">Chronological Breadth</span>
          <span class="value-pill">Primary Evidence</span>
          <span class="value-pill">Analytical Writing</span>
          <span class="value-pill">Living History</span>
        </div>
      </div>
    </header>

    <!-- ====================================================================
         4-COLUMN SHOWCASE GRID
         ==================================================================== -->
    <main class="showcase-grid">

      <!-- ================================================================
           COLUMN 1: KEY STAGE 3 (YEARS 7-9)
           ================================================================ -->
      <section class="column-panel">
        <div class="col-header">
          <span class="col-badge badge-navy">Years 7, 8 & 9 Enquiry</span>
          <h2 class="col-title">The KS3 Journey</h2>
          <div class="col-subtitle">A Rich Chronological Narrative</div>
        </div>

        <div class="image-plate-container">
          <img class="img-pos-william" src="${imgWilliam}" alt="Duke William lifts his helmet at Hastings (Bayeux Tapestry)">
          <div class="image-plate-caption">
            <strong>Foundational Enquiry:</strong> 1066 & The Norman Transformation of England
          </div>
        </div>

        <div class="col-content">
          <div class="enquiry-card navy-edge">
            <div class="enquiry-year">
              <span>Year 7: Medieval Realms &amp; Health</span>
              <span class="term-tag">1066–1500</span>
            </div>
            <div class="enquiry-stem">"How did the Conquest transform English society and power?"</div>
            <ul class="card-list">
              <li><strong>Norman Subjugation:</strong> Feudal hierarchy, Domesday survey, and motte-and-bailey fortifications.</li>
              <li><strong>Church &amp; Crown:</strong> Becket's murder 1170, Magna Carta 1215, and medieval religious power.</li>
              <li><strong>Public Health:</strong> Galenic humours, Islamic scholarship, and the Black Death pandemic of 1348.</li>
            </ul>
          </div>

          <div class="enquiry-card navy-edge">
            <div class="enquiry-year">
              <span>Year 8: Early Modern &amp; Empire</span>
              <span class="term-tag">1500–1900</span>
            </div>
            <div class="enquiry-stem">"To what extent did upheaval and industry reshape Britain?"</div>
            <ul class="card-list">
              <li><strong>Reformation &amp; Regicide:</strong> Break with Rome, English Civil War, and the 1649 execution of Charles I.</li>
              <li><strong>Enslavement &amp; Abolition:</strong> The transatlantic trade, plantation resistance, and Olaudah Equiano.</li>
              <li><strong>Industrial Revolution:</strong> Coal, steam power, child labour, and Henry Cort's iron innovations.</li>
            </ul>
          </div>

          <div class="enquiry-card navy-edge">
            <div class="enquiry-year">
              <span>Year 9: The Modern World</span>
              <span class="term-tag">1900–Present</span>
            </div>
            <div class="enquiry-stem">"Was the Great War an inevitable clash of empires?"</div>
            <ul class="card-list">
              <li><strong>Road to 1914:</strong> European alliances, imperial rivalries, trench warfare, and Western Front trauma.</li>
              <li><strong>The Holocaust (Shoah):</strong> Nazi totalitarianism, Jewish resistance, and European liberation.</li>
              <li><strong>Post-War Transformation:</strong> Decolonisation, the Empire Windrush 1948, and modern multicultural Britain.</li>
            </ul>
          </div>

          <div class="feature-callout">
            <div class="feature-title">
              <span>✦</span> Christine Counsell 4-Act Framework
            </div>
            <p class="feature-text">
              Every lesson is structured as a compelling historical narrative. Students complete dedicated printed workbooks with disciplinary vocabulary and causal analysis.
            </p>
          </div>
        </div>
      </section>

      <!-- ================================================================
           COLUMN 2: GCSE HISTORY (YEARS 10-11)
           ================================================================ -->
      <section class="column-panel">
        <div class="col-header">
          <span class="col-badge badge-blue">Edexcel GCSE (9–1)</span>
          <h2 class="col-title">Academic Rigour</h2>
          <div class="col-subtitle">Specification 1HI0 In-Depth Study</div>
        </div>

        <div class="image-plate-container">
          <img class="img-pos-queen" src="${imgElizabeth}" alt="Queen Elizabeth I Coronation Portrait">
          <div class="image-plate-caption">
            <strong>Paper 2 Depth Study:</strong> Queen Elizabeth I & The Tudor Golden Age
          </div>
        </div>

        <div class="col-content">
          <div class="paper-card">
            <div class="paper-header">
              <span class="paper-badge">Paper 1</span>
              <span class="paper-weighting">30% • 1 hr 15 mins</span>
            </div>
            <div class="paper-title">Medicine in Britain &amp; Western Front</div>
            <ul class="card-list">
              <li><strong>Thematic Breadth c1250–Present:</strong> Galenism &rarr; Renaissance anatomy (Vesalius &amp; Harvey) &rarr; Germ Theory &rarr; Modern NHS.</li>
              <li><strong>Historic Environment 1914–18:</strong> Western Front evacuation chain (RAP, ADS, MDS, CCS, Base Hospital) and RAMC triage.</li>
              <li><strong>Trauma &amp; Innovation:</strong> Trench foot, phosgene gas, mobile X-ray units, blood transfusions, and Thomas splints.</li>
            </ul>
          </div>

          <div class="paper-card">
            <div class="paper-header">
              <span class="paper-badge">Paper 2</span>
              <span class="paper-weighting">40% • 1 hr 45 mins</span>
            </div>
            <div class="paper-title">Elizabethan England &amp; Middle East</div>
            <ul class="card-list">
              <li><strong>Early Elizabethan (1558–88):</strong> Religious Settlement 1559, Catholic plots, Mary Queen of Scots, and the Spanish Armada.</li>
              <li><strong>Global Horizons:</strong> Sir Francis Drake's circumnavigation, Roanoke colonisation attempts, and Tudor court culture.</li>
              <li><strong>Conflict in Middle East (1945–95):</strong> UN Partition 1947, 1948 War, Suez 1956, Six-Day War 1967, Yom Kippur, and Oslo 1993.</li>
            </ul>
          </div>

          <div class="paper-card">
            <div class="paper-header">
              <span class="paper-badge">Paper 3</span>
              <span class="paper-weighting">30% • 1 hr 20 mins</span>
            </div>
            <div class="paper-title">Weimar &amp; Nazi Germany (1918–39)</div>
            <ul class="card-list">
              <li><strong>The Weimar Republic:</strong> Versailles impact, 1923 hyperinflation crisis, and Stresemann's golden years of stability.</li>
              <li><strong>The Nazi Rise to Power:</strong> Wall Street Crash, mass unemployment, propaganda appeals, and Hitler's 1933 appointment.</li>
              <li><strong>Totalitarian Control:</strong> Reichstag Fire, Gestapo police state, Nuremberg Laws, Hitler Youth, and women in the Third Reich.</li>
            </ul>
          </div>

          <div class="feature-callout">
            <div class="feature-title">
              <span>✦</span> Examiner-Calibrated Technique
            </div>
            <p class="feature-text">
              Students receive explicit training in source utility evaluation (content, provenance, context), competing interpretations, and structured 16-mark causal essays.
            </p>
          </div>
        </div>
      </section>

      <!-- ================================================================
           COLUMN 3: FIELDWORK, ARCHIVES & FUTURE PATHWAYS
           ================================================================ -->
      <section class="column-panel">
        <div class="col-header">
          <span class="col-badge badge-amber">Living History & Careers</span>
          <h2 class="col-title">Beyond the Desk</h2>
          <div class="col-subtitle">Fieldwork, Heritage & Horizons</div>
        </div>

        <div class="dual-image-grid">
          <div class="dual-image-item">
            <img class="img-pos-cloth" src="${imgYpres}" alt="Ypres Cloth Hall & Flanders Fields">
            <div class="image-plate-caption">
              <strong>Ypres Cloth Hall</strong>
            </div>
          </div>
          <div class="dual-image-item">
            <img src="${imgTyneCot}" alt="Tyne Cot Commonwealth War Graves Cemetery">
            <div class="image-plate-caption">
              <strong>Tyne Cot Cemetery</strong>
            </div>
          </div>
        </div>

        <div class="col-content">
          <div class="enquiry-card amber-edge">
            <div class="enquiry-year">
              <span>The Annual Ypres Study Tour</span>
              <span class="term-tag">Belgium</span>
            </div>
            <div class="enquiry-stem">Residential Fieldwork Experience (Year 9)</div>
            <ul class="card-list">
              <li><strong>Walk the Front Line:</strong> Tyne Cot Cemetery, Langemark, and preserved German trenches at Hill 62.</li>
              <li><strong>Last Post Ceremony:</strong> Laying a school wreath under the Menin Gate in memory of the fallen.</li>
              <li><strong>Medical Pioneers:</strong> Investigating Essex Farm Dressing Station and John McCrae's poem.</li>
            </ul>
          </div>

          <div class="enquiry-card amber-edge">
            <div class="enquiry-year">
              <span>Hampshire Archival Investigations</span>
              <span class="term-tag">Local Study</span>
            </div>
            <div class="enquiry-stem">Primary Document Scholarship</div>
            <ul class="card-list">
              <li><strong>Parish &amp; Census Records:</strong> Examining original 18th &amp; 19th-century county archives.</li>
              <li><strong>Naval &amp; Industrial Heritage:</strong> Portsmouth Dockyard history and Henry Cort's iron foundry at Fontley.</li>
            </ul>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 2px; padding: 2mm 2.4mm;">
            <div style="font-family: 'Cinzel', serif; font-size: 7pt; font-weight: 800; color: #0f172a; margin-bottom: 0.8mm; text-transform: uppercase;">
              Where History Leads (Top Career Paths):
            </div>
            <ul class="bullet-list">
              <li><strong>Law &amp; The Bar:</strong> Cross-examining contradictory testimony, forensic evidentiary analysis, and persuasive case construction.</li>
              <li><strong>Journalism &amp; Media:</strong> Investigative enquiry, rigorous bias detection, and clear, compelling political writing.</li>
              <li><strong>Civil Service &amp; Diplomacy:</strong> Policy evaluation, international affairs, and constitutional governance.</li>
              <li><strong>Finance &amp; Strategy:</strong> Dissecting complex historical trends, risk management, and strategic executive leadership.</li>
            </ul>
          </div>

          <div class="feature-callout" style="margin-top: auto;">
            <div class="feature-title">
              <span>✦</span> The History Society &amp; Debating
            </div>
            <p class="feature-text">
              Pupils participate in weekly historical debates, Model United Nations, and national essay competitions run by the Historical Association.
            </p>
          </div>
        </div>
      </section>

      <!-- ================================================================
           COLUMN 4: DIGITAL REVISION HUB & LIVE QR CODES
           ================================================================ -->
      <section class="column-panel highlight-col">
        <div class="col-header">
          <span class="col-badge badge-gold">Interactive Platform</span>
          <h2 class="col-title">Digital Revision Hub</h2>
          <div class="col-subtitle">Scan &amp; Explore Tonight</div>
        </div>

        <div class="col-content">
          <!-- QR Code 1: Lesson Portal -->
          <div class="qr-interactive-block">
            <div class="qr-image-wrapper">
              <img src="${qrPortalDataUrl}" alt="Scan to explore interactive lessons">
            </div>
            <div class="qr-info">
              <span class="qr-badge">Online Portal</span>
              <h3 class="qr-title">Explore Live Lessons</h3>
              <p class="qr-desc">
                Scan with your phone to experience our interactive digital textbooks, dual-coded primary sources, and synchronized audio read-aloud narrations.
              </p>
            </div>
          </div>

          <!-- QR Code 2: Quizzes -->
          <div class="qr-interactive-block">
            <div class="qr-image-wrapper">
              <img src="${qrQuizDataUrl}" alt="Scan to take the interactive quiz">
            </div>
            <div class="qr-info">
              <span class="qr-badge">Open Evening Challenge</span>
              <h3 class="qr-title">Test Your History</h3>
              <p class="qr-desc">
                Take our 20-question interactive challenge live tonight! Can you score 100% on our Key Stage 3 &amp; GCSE recall quizzes?
              </p>
            </div>
          </div>

          <!-- Student & Parent Support Suite -->
          <div class="suite-box">
            <div class="suite-title">✦ Every Pupil Receives:</div>
            <div class="suite-grid">
              <div class="suite-item"><span class="suite-dot">▸</span><span>Printed Course Workbooks</span></div>
              <div class="suite-item"><span class="suite-dot">▸</span><span>24/7 Digital Audio Hub</span></div>
              <div class="suite-item"><span class="suite-dot">▸</span><span>Full Model Answer Banks</span></div>
              <div class="suite-item"><span class="suite-dot">▸</span><span>Self-Quizzing Flashcards</span></div>
            </div>
          </div>

          <!-- Voices of the Department -->
          <div class="voices-card">
            <div class="voice-entry">
              "History here taught me how to question claims, evaluate evidence, and structure arguments with confidence. The printed workbooks and digital hub made revision straightforward."
              <div class="voice-author">— Year 11 GCSE Student (Grade 9)</div>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; margin: 0.5mm 0;"></div>
            <div class="voice-entry">
              "The combination of structured printed booklets and the 24/7 online revision hub means we always know exactly what our child is studying and how to support them."
              <div class="voice-author">— Key Stage 3 Parent</div>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; margin: 0.5mm 0;"></div>
            <div class="voice-entry">
              "The evidential rigor and essay coaching in History prepared me directly for analytical reading and debate at university."
              <div class="voice-author">— Alumnus (Now Reading Law)</div>
            </div>
          </div>

          <div class="feature-callout" style="background: #fefce8; border-color: #f59e0b; margin-top: auto;">
            <div class="feature-title" style="color: #78350f;">
              <span>✦</span> Independent Home Learning
            </div>
            <p class="feature-text" style="color: #92400e;">
              Pupils have continuous access to interactive timelines, retrieval question banks, and audio revision recordings across all devices.
            </p>
          </div>
        </div>
      </section>

    </main>

    <!-- ====================================================================
         BOTTOM WELCOME & INTERACTIVE CALL TO ACTION STRIP
         ==================================================================== -->
    <footer class="dept-footer">
      <div class="footer-instructions">
        <div class="footer-step-number">1</div>
        <div class="footer-text">
          <strong>Browse the Materials:</strong> Inspect our complete collection of KS3 &amp; GCSE printed pupil workbooks on the display tables.
        </div>
      </div>

      <div class="footer-instructions">
        <div class="footer-step-number">2</div>
        <div class="footer-text">
          <strong>Experience the Tech:</strong> Try our interactive Revision Hub, audio narrations, and quizzes on the department iPads.
        </div>
      </div>

      <div class="footer-instructions">
        <div class="footer-step-number">3</div>
        <div class="footer-text">
          <strong>Speak With Us:</strong> Our Head of History, teaching specialists, and GCSE Subject Ambassadors are ready to answer your questions.
        </div>
      </div>

      <div class="footer-brand">
        <span class="school-brand-target">The History Department</span> &bull; <span>Excellence in History</span>
      </div>
    </footer>

  </div>

</body>
</html>`;

  // Output paths
  const publicPdfsDir = path.join(__dirname, '..', 'public', 'pdfs');
  if (!fs.existsSync(publicPdfsDir)) {
    fs.mkdirSync(publicPdfsDir, { recursive: true });
  }

  const htmlPath = path.join(publicPdfsDir, 'history_department_open_evening_a3.html');
  const pdfPath = path.join(publicPdfsDir, 'history_department_open_evening_a3.pdf');
  const standaloneHtmlPath = path.join(__dirname, '..', 'public', 'open_evening_display.html');

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  fs.writeFileSync(standaloneHtmlPath, htmlContent, 'utf8');
  console.log('✅ Saved HTML preview to:');
  console.log('   -', htmlPath);
  console.log('   -', standaloneHtmlPath);

  // Render to PDF using Puppeteer
  console.log('🖨️ Launching Puppeteer to compile A3 Landscape PDF (420mm x 297mm)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1587,
    height: 1123,
    deviceScaleFactor: 2,
  });

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Verify page count by checking body scroll bounds
  const dimensions = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  console.log('📐 Rendered DOM dimensions:', dimensions);

  await page.pdf({
    path: pdfPath,
    format: 'A3',
    landscape: true,
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  await browser.close();
  console.log('🎉 Successfully generated publisher-grade A3 PDF at:', pdfPath);
}

generateOpenEveningSheet().catch((err) => {
  console.error('❌ Error generating Open Evening sheet:', err);
  process.exit(1);
});
