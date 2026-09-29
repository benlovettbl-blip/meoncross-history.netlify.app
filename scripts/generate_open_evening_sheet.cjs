const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

/**
 * Open Evening A3 Department Showcase & Curriculum Guide Generator
 * Formats a publisher-grade, museum-archive A3 display sheet (420mm x 297mm landscape)
 * with authentic historical imagery, curriculum pathways, and live scannable QR codes.
 * Optimized with dense, balanced typography and zero dead space.
 */

async function generateOpenEveningSheet() {
  console.log(
    '🎨 Generating History Department Open Evening A3 Showcase Sheet (Zero Dead-Space Edition)...',
  );

  const HUB_BASE_URL = process.env.HUB_URL || 'https://the-history-revision-hub.netlify.app';
  const portalUrl = `${HUB_BASE_URL}/?view=lessons`;
  const quizUrl = `${HUB_BASE_URL}/?view=quiz`;

  // Generate high-resolution QR codes as base64 data URLs (enlarged for A3 scannability)
  const qrPortalDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    width: 380,
    color: { dark: '#0f172a', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  });

  const qrQuizDataUrl = await QRCode.toDataURL(quizUrl, {
    margin: 1,
    width: 380,
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
      padding: 5mm 7.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background: #fdfbf7;
    }

    /* Classical Double Archival Borders */
    .outer-border {
      position: absolute;
      top: 3.2mm;
      left: 3.2mm;
      right: 3.2mm;
      bottom: 3.2mm;
      border: 2px solid #0f172a;
      pointer-events: none;
      z-index: 50;
    }
    .inner-border {
      position: absolute;
      top: 4.4mm;
      left: 4.4mm;
      right: 4.4mm;
      bottom: 4.4mm;
      border: 1.2px solid #d97706;
      pointer-events: none;
      z-index: 50;
    }

    /* Corner Accents */
    .corner-ornament {
      position: absolute;
      width: 13mm;
      height: 13mm;
      pointer-events: none;
      z-index: 51;
    }
    .corner-tl { top: 5.2mm; left: 5.2mm; border-top: 2px solid #b45309; border-left: 2px solid #b45309; }
    .corner-tr { top: 5.2mm; right: 5.2mm; border-top: 2px solid #b45309; border-right: 2px solid #b45309; }
    .corner-bl { bottom: 5.2mm; left: 5.2mm; border-bottom: 2px solid #b45309; border-left: 2px solid #b45309; }
    .corner-br { bottom: 5.2mm; right: 5.2mm; border-bottom: 2px solid #b45309; border-right: 2px solid #b45309; }

    /* ==========================================================================
       HEADER: Department Masthead & Core Principles
       ========================================================================== */
    .dept-header {
      width: 100%;
      background: linear-gradient(135deg, #091322 0%, #0f172a 50%, #1e293b 100%);
      color: #ffffff;
      padding: 3mm 7mm 2.6mm 7mm;
      border-radius: 4px;
      border-bottom: 2.5px solid #d97706;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5mm;
      position: relative;
      z-index: 10;
      flex-shrink: 0;
    }

    .header-crest {
      display: flex;
      align-items: center;
      gap: 3.2mm;
      flex-shrink: 0;
    }
    .crest-seal {
      width: 14.5mm;
      height: 14.5mm;
      border: 1.5px solid #d97706;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, #1e3a8a 0%, #091322 100%);
      box-shadow: inset 0 0 6px rgba(217, 119, 6, 0.4);
    }
    .crest-seal svg {
      width: 8.8mm;
      height: 8.8mm;
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
      margin-bottom: 0.2mm;
    }
    .main-title {
      font-family: 'Cinzel', serif;
      font-size: 20.5pt;
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
      font-size: 9.4pt;
      color: #e2e8f0;
      margin-top: 0.4mm;
    }

    .header-badges-col {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.2mm;
      flex-shrink: 0;
    }
    .open-evening-badge {
      display: inline-flex;
      align-items: center;
      gap: 2mm;
      background: #b45309;
      color: #fff;
      font-family: 'Cinzel', serif;
      font-size: 7.6pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      padding: 0.9mm 3mm;
      border-radius: 3px;
      border: 1px solid #fbbf24;
      text-transform: uppercase;
    }
    .values-strip {
      display: flex;
      gap: 1.4mm;
    }
    .value-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 700;
      color: #cbd5e1;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0.5mm 1.6mm;
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
      gap: 3.8mm;
      flex: 1;
      min-height: 0;
      margin-top: 2mm;
      margin-bottom: 2mm;
      position: relative;
      z-index: 10;
    }

    .column-panel {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 3.5px solid #0f172a;
      border-radius: 4px;
      padding: 2.5mm 2.8mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
      position: relative;
      height: 100%;
    }

    .column-panel.highlight-col {
      border-top-color: #b45309;
      background: #fffdfa;
    }

    /* Column Header */
    .col-header {
      margin-bottom: 1.2mm;
      flex-shrink: 0;
    }
    .col-badge {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 0.4mm 1.8mm;
      border-radius: 2px;
      text-transform: uppercase;
      margin-bottom: 0.4mm;
    }
    .badge-navy { background: #0f172a; color: #ffffff; }
    .badge-blue { background: #1e3a8a; color: #ffffff; }
    .badge-amber { background: #92400e; color: #ffffff; }
    .badge-gold { background: #78350f; color: #fef3c7; border: 1px solid #d97706; }

    .col-title {
      font-family: 'Playfair Display', serif;
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
      margin: 0 0 0.2mm 0;
    }
    .col-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 7pt;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 0.8mm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Top Row Elements (Height 52mm across all 4 columns for solid presence and alignment) */
    .image-plate-container {
      width: 100%;
      height: 52mm;
      border-radius: 3px;
      overflow: hidden;
      position: relative;
      border: 1px solid #cbd5e1;
      margin-bottom: 1.5mm;
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
      gap: 1.4mm;
      height: 52mm;
      margin-bottom: 1.5mm;
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
      font-size: 6.4pt;
      font-weight: 500;
      padding: 1.8mm 2mm 0.8mm 2mm;
      line-height: 1.2;
    }

    /* Column 4 Top Row: Platform Live Showcase Hero Card (52mm to match image row) */
    .platform-hero-box {
      height: 52mm;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1.2px solid #d97706;
      border-radius: 3px;
      padding: 2.5mm 3mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #ffffff;
      margin-bottom: 1.5mm;
      flex-shrink: 0;
      box-shadow: inset 0 0 12px rgba(217, 119, 6, 0.15);
    }
    .platform-hero-badge {
      font-family: 'Cinzel', serif;
      font-size: 6.4pt;
      font-weight: 800;
      color: #fbbf24;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .platform-hero-title {
      font-family: 'Playfair Display', serif;
      font-size: 10pt;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
    }
    .platform-hero-text {
      font-size: 6.6pt;
      line-height: 1.32;
      color: #cbd5e1;
    }
    .platform-features-strip {
      display: flex;
      gap: 1.2mm;
    }
    .feat-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.1pt;
      font-weight: 700;
      background: rgba(251, 191, 36, 0.15);
      border: 1px solid rgba(251, 191, 36, 0.35);
      color: #fde68a;
      padding: 0.5mm 1.5mm;
      border-radius: 2px;
      white-space: nowrap;
    }

    /* Column Body & Structured Content (Dense, Cohesive Flow with ZERO dead space) */
    .col-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.8mm;
      min-height: 0;
    }

    /* Standardized Curriculum Cards */
    .curriculum-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 2.2mm 2.6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      min-height: 0;
    }
    .curriculum-card.amber-edge { border-left-color: #d97706; }
    .curriculum-card.navy-edge { border-left-color: #0f172a; }
    .curriculum-card.gold-edge { border-left-color: #b45309; }

    .card-top-header {
      margin-bottom: 0.6mm;
    }
    .card-title-row {
      font-family: 'Cinzel', serif;
      font-size: 7.5pt;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 1.15;
    }
    .term-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.3pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .enquiry-stem {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 7.2pt;
      color: #1e3a8a;
      font-weight: 700;
      line-height: 1.22;
      margin-top: 0.3mm;
    }
    .paper-stem {
      font-family: 'Playfair Display', serif;
      font-size: 8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.18;
      margin-top: 0.3mm;
    }

    /* Clean Card List */
    .card-list {
      margin: 0;
      padding-left: 3.2mm;
      list-style-type: square;
    }
    .card-list li {
      font-size: 7pt;
      line-height: 1.36;
      color: #334155;
      margin-bottom: 1.2mm;
    }
    .card-list li:last-child {
      margin-bottom: 0.2mm;
    }
    .card-list li strong {
      color: #0f172a;
    }

    /* Disciplinary Lens / Exam Technique Footnote Tag */
    .card-footnote-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.1pt;
      font-weight: 700;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 2px;
      padding: 0.6mm 1.6mm;
      margin-top: 0.6mm;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      line-height: 1.15;
    }
    .card-footnote-tag.amber-tag {
      color: #92400e;
      background: #fefce8;
      border-color: #fef08a;
    }
    .card-footnote-tag.navy-tag {
      color: #0f172a;
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    /* Pedagogy / Feature Callout Box at Bottom of Columns */
    .feature-callout {
      background: #f1f5f9;
      border: 1px dashed #94a3b8;
      border-radius: 3px;
      padding: 2.2mm 2.6mm;
      flex-shrink: 0;
      height: 17.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .feature-title {
      font-family: 'Cinzel', serif;
      font-size: 7.1pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 1.4mm;
      letter-spacing: 0.04em;
    }
    .feature-text {
      font-size: 6.7pt;
      line-height: 1.32;
      color: #475569;
      margin: 0;
    }

    /* ==========================================================================
       COLUMN 4 SPECIFIC STYLING (QR BLOCKS, SUITE, VOICES)
       ========================================================================== */
    .qr-showcase-card {
      background: #ffffff;
      border: 1.5px solid #d97706;
      border-radius: 3px;
      padding: 2mm 2.6mm;
      display: flex;
      align-items: center;
      gap: 3.2mm;
      box-shadow: 0 1px 4px rgba(217, 119, 6, 0.08);
      height: 33mm;
      flex-shrink: 0;
    }
    .qr-image-frame {
      width: 27mm;
      height: 27mm;
      flex-shrink: 0;
      background: #ffffff;
      padding: 0.6mm;
      border: 1.2px solid #cbd5e1;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-image-frame img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .qr-content-pane {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .qr-meta-badge {
      display: inline-block;
      align-self: flex-start;
      font-family: 'Cinzel', serif;
      font-size: 6.1pt;
      font-weight: 800;
      background: #b45309;
      color: #ffffff;
      padding: 0.4mm 1.5mm;
      border-radius: 2px;
      text-transform: uppercase;
      margin-bottom: 0.4mm;
    }
    .qr-card-title {
      font-family: 'Playfair Display', serif;
      font-size: 9.4pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 0.3mm 0;
    }
    .qr-card-desc {
      font-size: 6.6pt;
      line-height: 1.26;
      color: #475569;
      margin: 0 0 0.6mm 0;
    }
    .qr-bullets {
      margin: 0;
      padding-left: 2.8mm;
      list-style-type: square;
    }
    .qr-bullets li {
      font-size: 6.3pt;
      line-height: 1.24;
      color: #334155;
    }

    /* What Students Receive Strip */
    .suite-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 2mm 2.6mm;
      height: 26mm;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .suite-title {
      font-family: 'Cinzel', serif;
      font-size: 7.1pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .suite-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1mm 2.2mm;
    }
    .suite-item {
      font-size: 6.6pt;
      color: #334155;
      line-height: 1.2;
      display: flex;
      align-items: center;
      gap: 1.2mm;
      font-weight: 500;
    }
    .suite-dot {
      color: #d97706;
      font-weight: 900;
      font-size: 7.2pt;
      line-height: 1;
    }

    /* Testimonials / Student Voice (Generous height for all 3 quotes with ZERO clipping) */
    .voices-card {
      background: #fdfbf7;
      border: 1px solid #e2e8f0;
      border-left: 3mm solid #b45309;
      border-radius: 3px;
      padding: 2.2mm 2.6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1mm;
      height: 53mm;
      flex-shrink: 0;
    }
    .voice-entry {
      font-style: italic;
      font-size: 6.4pt;
      line-height: 1.3;
      color: #334155;
    }
    .voice-author {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-size: 6pt;
      font-weight: 700;
      color: #0f172a;
      text-align: right;
      margin-top: 0.3mm;
    }

    /* ==========================================================================
       FOOTER: Welcome Banner & Open Evening Invitation
       ========================================================================== */
    .dept-footer {
      width: 100%;
      background: #0f172a;
      color: #ffffff;
      padding: 2.8mm 8mm;
      border-radius: 3px;
      border-top: 2px solid #d97706;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4mm;
      position: relative;
      z-index: 10;
      flex-shrink: 0;
    }
    .footer-instructions {
      display: flex;
      align-items: center;
      gap: 2.6mm;
    }
    .footer-step-number {
      width: 6.2mm;
      height: 6.2mm;
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
      line-height: 1.25;
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
          <div class="super-title">Excellence in Historical Scholarship • Key Stage 3 &amp; GCSE</div>
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
          <span class="col-badge badge-navy">Years 7, 8 &amp; 9 Enquiry</span>
          <h2 class="col-title">The KS3 Journey</h2>
          <div class="col-subtitle">A Rich Chronological Narrative</div>
        </div>

        <div class="image-plate-container">
          <img class="img-pos-william" src="${imgWilliam}" alt="Duke William lifts his helmet at Hastings (Bayeux Tapestry)">
          <div class="image-plate-caption">
            <strong>Foundational Enquiry:</strong> 1066 &amp; The Norman Transformation of England
          </div>
        </div>

        <div class="col-content">
          <!-- Year 7 -->
          <div class="curriculum-card navy-edge">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Year 7: Medieval Realms &amp; Health</span>
                  <span class="term-tag">1066–1500</span>
                </div>
                <div class="enquiry-stem">"How did the Conquest transform English society and power?"</div>
              </div>
              <ul class="card-list">
                <li><strong>Norman Subjugation (1066–87):</strong> Feudal hierarchy, Domesday survey, and motte-and-bailey castle network.</li>
                <li><strong>Church, Crown &amp; Law:</strong> Becket's murder 1170, Magna Carta 1215, and royal justice evolution.</li>
                <li><strong>Medieval Society &amp; Health:</strong> Village life, monastic scholarship, and the catastrophic Black Death of 1348.</li>
                <li><strong>Peasants' Revolt (1381):</strong> Poll tax resistance, Wat Tyler, and the breakdown of serfdom.</li>
              </ul>
            </div>
            <div class="card-footnote-tag">✦ Disciplinary Lens: Causation, Change &amp; Evidential Weight</div>
          </div>

          <!-- Year 8 -->
          <div class="curriculum-card navy-edge">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Year 8: Early Modern &amp; Empire</span>
                  <span class="term-tag">1500–1900</span>
                </div>
                <div class="enquiry-stem">"To what extent did religious upheaval and industry reshape Britain?"</div>
              </div>
              <ul class="card-list">
                <li><strong>Reformation &amp; Regicide:</strong> Break with Rome, English Civil War, and the 1649 execution of Charles I.</li>
                <li><strong>Enslavement &amp; Resistance:</strong> Transatlantic slave trade, plantation rebellion, and Equiano's campaign.</li>
                <li><strong>Industrial Revolution:</strong> Coal, steam power, child labour exploitation, and Henry Cort's iron innovations.</li>
                <li><strong>Victorian Empire:</strong> British expansion in India, imperial propaganda, and democratic franchise reform.</li>
              </ul>
            </div>
            <div class="card-footnote-tag">✦ Disciplinary Lens: Historical Significance &amp; Diverse Perspectives</div>
          </div>

          <!-- Year 9 -->
          <div class="curriculum-card navy-edge">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Year 9: The Modern World</span>
                  <span class="term-tag">1900–Present</span>
                </div>
                <div class="enquiry-stem">"Was the Great War an inevitable clash of empires?"</div>
              </div>
              <ul class="card-list">
                <li><strong>Road to 1914:</strong> European alliances, imperial rivalries, trench warfare, and Western Front trauma.</li>
                <li><strong>Inter-War Ideologies:</strong> Weimar collapse, totalitarian rise, and the road to the Second World War.</li>
                <li><strong>The Holocaust (Shoah):</strong> Nazi totalitarianism, Jewish resistance, and European liberation.</li>
                <li><strong>Post-War Transformation:</strong> Decolonisation, Empire Windrush 1948, and modern multicultural Britain.</li>
              </ul>
            </div>
            <div class="card-footnote-tag">✦ Disciplinary Lens: Historiography, Interpretations &amp; Moral Dimension</div>
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
            <strong>Paper 2 Depth Study:</strong> Queen Elizabeth I &amp; The Tudor Golden Age
          </div>
        </div>

        <div class="col-content">
          <!-- Paper 1 -->
          <div class="curriculum-card">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span style="font-weight:800; color:#1e3a8a;">Paper 1: Thematic Breadth</span>
                  <span class="term-tag">30% • 1 hr 15 mins</span>
                </div>
                <div class="paper-stem">Medicine in Britain c1250–Present &amp; Western Front</div>
              </div>
              <ul class="card-list">
                <li><strong>Thematic Evolution:</strong> Galenism &rarr; Renaissance anatomy (Vesalius &amp; Harvey) &rarr; Germ Theory &rarr; Modern NHS.</li>
                <li><strong>Western Front Sector (1914–18):</strong> Evacuation chain (RAP, ADS, MDS, CCS, Base Hospital) and RAMC triage systems.</li>
                <li><strong>Trauma &amp; Clinical Innovation:</strong> Trench foot, phosgene gas, mobile X-ray units, blood transfusions, and Thomas splints.</li>
                <li><strong>Historic Environment Enquiries:</strong> Flandrian mud, gas gangrene, RAMC stretcher-bearers, and underground hospital wards.</li>
              </ul>
            </div>
            <div class="card-footnote-tag">✦ Assessment Focus: Feature Qs (4m) • Source Utility (8m) • Causation Essay (16m)</div>
          </div>

          <!-- Paper 2 -->
          <div class="curriculum-card">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span style="font-weight:800; color:#1e3a8a;">Paper 2: Period &amp; Depth</span>
                  <span class="term-tag">40% • 1 hr 45 mins</span>
                </div>
                <div class="paper-stem">Elizabethan England (1558–88) &amp; Middle East (1945–95)</div>
              </div>
              <ul class="card-list">
                <li><strong>Early Elizabethan England:</strong> Religious Settlement 1559, Catholic plots, Mary Queen of Scots, and the Spanish Armada.</li>
                <li><strong>Age of Discovery:</strong> Sir Francis Drake's circumnavigation, Roanoke colonisation attempts, and Tudor court culture.</li>
                <li><strong>Conflict in Middle East:</strong> UN Partition 1947, Suez 1956, Six-Day War 1967, Yom Kippur 1973, and Oslo Accords 1993.</li>
                <li><strong>Superpower Diplomacy:</strong> US-Soviet proxy tensions, Camp David Accords 1978, and the PLO Palestinian struggle.</li>
              </ul>
            </div>
            <div class="card-footnote-tag">✦ Assessment Focus: Consequences (4m) • Analytical Narrative (8m) • Evaluative Verdict</div>
          </div>

          <!-- Paper 3 -->
          <div class="curriculum-card">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span style="font-weight:800; color:#1e3a8a;">Paper 3: Modern Depth</span>
                  <span class="term-tag">30% • 1 hr 20 mins</span>
                </div>
                <div class="paper-stem">Weimar &amp; Nazi Germany (1918–39)</div>
              </div>
              <ul class="card-list">
                <li><strong>The Weimar Republic:</strong> Versailles impact, 1923 hyperinflation crisis, and Stresemann's golden years of stability.</li>
                <li><strong>Nazi Rise to Power:</strong> Wall Street Crash, mass unemployment, propaganda appeals, and Hitler's 1933 appointment.</li>
                <li><strong>Totalitarian Control:</strong> Reichstag Fire, Gestapo police state, Nuremberg Laws, Hitler Youth, and social control.</li>
                <li><strong>Resistance &amp; Conformity:</strong> Edelweiss Pirates, Church opposition, Gestapo terror networks, and wartime mobilization.</li>
              </ul>
            </div>
            <div class="card-footnote-tag">✦ Assessment Focus: Source Inferences (4m) • Competing Historiographical Views (16m)</div>
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
          <span class="col-badge badge-amber">Living History &amp; Careers</span>
          <h2 class="col-title">Beyond the Desk</h2>
          <div class="col-subtitle">Fieldwork, Heritage &amp; Horizons</div>
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
          <!-- Fieldwork Card -->
          <div class="curriculum-card amber-edge">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>The Annual Ypres Study Tour</span>
                  <span class="term-tag">Belgium</span>
                </div>
                <div class="enquiry-stem" style="color: #92400e;">Residential Fieldwork Experience (Year 9)</div>
              </div>
              <ul class="card-list">
                <li><strong>Walk the Front Line:</strong> Tyne Cot Cemetery, Langemark, and preserved German trenches at Hill 62.</li>
                <li><strong>Last Post Ceremony:</strong> Laying a commemorative wreath under the Menin Gate in memory of the fallen.</li>
                <li><strong>Medical Pioneers:</strong> Investigating Essex Farm Dressing Station and John McCrae's poem.</li>
                <li><strong>Battlefield Archaeology:</strong> Examining surviving craters, shell casings, and preserved field fortifications.</li>
              </ul>
            </div>
            <div class="card-footnote-tag amber-tag">✦ Fieldwork Lens: Physical Geography, Trench Archaeology &amp; Memory</div>
          </div>

          <!-- Local Archive Card -->
          <div class="curriculum-card amber-edge">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Hampshire Archival Investigations</span>
                  <span class="term-tag">Local Study</span>
                </div>
                <div class="enquiry-stem" style="color: #92400e;">Primary Document Scholarship</div>
              </div>
              <ul class="card-list">
                <li><strong>Parish &amp; Census Records:</strong> Examining original 18th &amp; 19th-century county archival registers and rolls.</li>
                <li><strong>Naval &amp; Industrial Heritage:</strong> Portsmouth Dockyard history and Henry Cort's iron foundry at Fontley.</li>
                <li><strong>Medieval Fortifications:</strong> Field study of Portchester Castle and Winchester's Great Hall.</li>
                <li><strong>Oral History &amp; Memorials:</strong> Documenting local war memorials and First World War civic rolls of honour.</li>
              </ul>
            </div>
            <div class="card-footnote-tag amber-tag">✦ Archival Lens: Deciphering Primary Manuscripts &amp; Regional Heritage</div>
          </div>

          <!-- Career Destinations Card -->
          <div class="curriculum-card amber-edge">
            <div>
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Where History Leads</span>
                  <span class="term-tag">Top Career Paths</span>
                </div>
                <div class="enquiry-stem" style="color: #92400e;">Transferrable Disciplinary Rigour</div>
              </div>
              <ul class="card-list">
                <li><strong>Law &amp; The Bar:</strong> Cross-examining contradictory testimony, evidentiary analysis, and case construction.</li>
                <li><strong>Journalism &amp; Media:</strong> Investigative enquiry, rigorous bias detection, and clear, compelling political writing.</li>
                <li><strong>Civil Service &amp; Diplomacy:</strong> Policy evaluation, international relations, and constitutional governance.</li>
                <li><strong>Finance &amp; Strategy:</strong> Dissecting complex historical trends, risk management, and strategic leadership.</li>
              </ul>
            </div>
            <div class="card-footnote-tag amber-tag">✦ Academic Horizon: Russell Group &amp; Oxbridge Humanities Pathway</div>
          </div>

          <div class="feature-callout">
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

        <!-- Column 4 Top Row: Platform Live Showcase Hero Card (52mm to match image row) -->
        <div class="platform-hero-box">
          <div class="platform-hero-badge">✦ Live Department Showcase Station ✦</div>
          <div class="platform-hero-title">Experience the Hub on Department iPads Tonight</div>
          <div class="platform-hero-text">
            Visit our live testing station to navigate interactive digital textbooks, listen to synchronized voiceover narrations, and inspect pupil model answers.
          </div>
          <div class="platform-features-strip">
            <span class="feat-pill">🎧 Audio Narrations</span>
            <span class="feat-pill">📖 4-Act Textbooks</span>
            <span class="feat-pill">⚡ Instant Quizzes</span>
          </div>
        </div>

        <div class="col-content">
          <!-- QR Code 1: Lesson Portal -->
          <div class="qr-showcase-card">
            <div class="qr-image-frame">
              <img src="${qrPortalDataUrl}" alt="Scan to explore interactive lessons">
            </div>
            <div class="qr-content-pane">
              <span class="qr-meta-badge">Online Portal • 24/7 Access</span>
              <h3 class="qr-card-title">Explore Live Lessons</h3>
              <p class="qr-card-desc">
                Scan with your phone to experience our interactive digital textbooks and audio.
              </p>
              <ul class="qr-bullets">
                <li>Full Christine Counsell 4-act narratives</li>
                <li>Synchronized voiceover audio reading</li>
                <li>Dual-coded primary sources &amp; models</li>
              </ul>
            </div>
          </div>

          <!-- QR Code 2: Quizzes -->
          <div class="qr-showcase-card">
            <div class="qr-image-frame">
              <img src="${qrQuizDataUrl}" alt="Scan to take the interactive quiz">
            </div>
            <div class="qr-content-pane">
              <span class="qr-meta-badge">Live Challenge • Open Evening</span>
              <h3 class="qr-card-title">Test Your History</h3>
              <p class="qr-card-desc">
                Take our interactive challenge live tonight! Can you score 100% on recall?
              </p>
              <ul class="qr-bullets">
                <li>20-question rapid retrieval challenges</li>
                <li>Instant scoring &amp; explanatory feedback</li>
                <li>Complete KS3 &amp; GCSE flashcard decks</li>
              </ul>
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
              <div class="suite-item"><span class="suite-dot">▸</span><span>Primary Source Archives</span></div>
              <div class="suite-item"><span class="suite-dot">▸</span><span>Key Chronology Spines</span></div>
            </div>
          </div>

          <!-- Voices of the Department (Full height with 3 complete quotes, ZERO clipping) -->
          <div class="voices-card">
            <div class="voice-entry">
              "History here taught me how to question claims, evaluate evidence, and structure arguments with confidence. The printed workbooks and digital hub made revision straightforward."
              <div class="voice-author">— Year 11 GCSE Student (Grade 9)</div>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; margin: 0.2mm 0;"></div>
            <div class="voice-entry">
              "The combination of structured printed booklets and the 24/7 online revision hub means we always know exactly what our child is studying and how to support them at home."
              <div class="voice-author">— Key Stage 3 Parent</div>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; margin: 0.2mm 0;"></div>
            <div class="voice-entry">
              "The evidential rigour, historiographical debate, and essay coaching in History prepared me directly for analytical reading and debate at university."
              <div class="voice-author">— Department Alumnus (Now Reading Law, Cambridge)</div>
            </div>
          </div>

          <div class="feature-callout" style="background: #fefce8; border-color: #f59e0b;">
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
  const publicDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(publicPdfsDir)) {
    fs.mkdirSync(publicPdfsDir, { recursive: true });
  }

  const htmlOutPath = path.join(publicPdfsDir, 'history_department_open_evening_a3.html');
  const webHtmlPath = path.join(publicDir, 'open_evening_display.html');
  const pdfOutPath = path.join(publicPdfsDir, 'history_department_open_evening_a3.pdf');

  fs.writeFileSync(htmlOutPath, htmlContent, 'utf8');
  fs.writeFileSync(webHtmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML preview to:`);
  console.log(`   - ${htmlOutPath}`);
  console.log(`   - ${webHtmlPath}`);

  // Launch Puppeteer to render exact pixel-perfect A3 PDF
  console.log('🖨️ Launching Puppeteer to compile A3 Landscape PDF (420mm x 297mm)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set viewport to 420mm x 297mm at 96 DPI (approx 1587px x 1123px)
  await page.setViewport({
    width: 1587,
    height: 1123,
    deviceScaleFactor: 2,
  });

  await page.goto(`file://${htmlOutPath}`, { waitUntil: 'networkidle0' });

  // Verify DOM metrics
  const metrics = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  console.log('📐 Rendered DOM dimensions:', metrics);

  await page.pdf({
    path: pdfOutPath,
    format: 'A3',
    landscape: true,
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`🎉 Successfully generated publisher-grade A3 PDF at: ${pdfOutPath}`);
}

if (require.main === module) {
  generateOpenEveningSheet().catch((err) => {
    console.error('❌ Error generating A3 Open Evening Sheet:', err);
    process.exit(1);
  });
}

module.exports = { generateOpenEveningSheet };
