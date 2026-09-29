const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

/**
 * Open Evening A3 Department Showcase & Curriculum Guide Generator
 * Formats a publisher-grade, museum-archive A3 display sheet (420mm x 297mm landscape)
 * with authentic historical imagery, curriculum pathways, and live scannable QR codes for mobile phones.
 * Perfectly calibrated with generous, large typography, zero clutter, zero iPads, and zero artificial quotes.
 */

async function generateOpenEveningSheet() {
  console.log(
    '🎨 Generating History Department Open Evening A3 Showcase Sheet (Publisher-Grade Master)...',
  );

  const HUB_BASE_URL = process.env.HUB_URL || 'https://the-history-revision-hub.netlify.app';
  const portalUrl = `${HUB_BASE_URL}/?view=lessons`;
  const quizUrl = `${HUB_BASE_URL}/?view=quiz`;

  // Generate high-resolution QR codes as base64 data URLs (enlarged for instant smartphone scannability)
  const qrPortalDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    width: 440,
    color: { dark: '#0f172a', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  });

  const qrQuizDataUrl = await QRCode.toDataURL(quizUrl, {
    margin: 1,
    width: 440,
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

  // Authentic primary historical imagery
  const imgWilliam = getBase64Image('public/images/bayeux_william_hastings_wide.jpg');
  const imgElizabeth = getBase64Image('public/images/elizabeth_coronation_portrait.jpg');
  const imgYpres = getBase64Image('public/images/ypres_cloth_hall.jpg');
  const imgTyneCot = getBase64Image('public/images/ypres_tyne_cot.jpg');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The History Department - Open Evening Showcase &amp; Curriculum Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Screen Presentation Canvas */
    @media screen {
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100vh;
        height: auto;
        background: #091322;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #1e293b;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: auto;
        overflow-y: auto;
        padding: 16px 0 32px 0;
      }
      .screen-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: min(96vw, 1587px);
        background: #0f172a;
        border: 1px solid #334155;
        border-radius: 6px;
        padding: 8px 18px;
        margin-bottom: 14px;
        color: #f8fafc;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        z-index: 100;
        flex-shrink: 0;
      }
      .screen-toolbar-title {
        font-family: 'Cinzel', serif;
        font-size: 10.5pt;
        font-weight: 800;
        color: #fbbf24;
        display: flex;
        align-items: center;
        gap: 8px;
        letter-spacing: 0.06em;
      }
      .screen-toolbar-actions {
        display: flex;
        gap: 10px;
      }
      .screen-btn {
        background: #b45309;
        color: #ffffff;
        border: 1px solid #fbbf24;
        padding: 6px 14px;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-size: 8.5pt;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.18s ease;
      }
      .screen-btn:hover {
        background: #d97706;
      }
      .screen-btn.btn-secondary {
        background: #1e293b;
        border-color: #64748b;
        color: #e2e8f0;
      }
      .screen-btn.btn-secondary:hover {
        background: #334155;
        color: #ffffff;
      }
      .a3-board-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 20px;
        position: relative;
      }
      .a3-board {
        width: 420mm;
        height: 297mm;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
        margin: 0 auto;
        flex-shrink: 0;
        position: relative;
        background: #fdfbf7;
        padding: 5mm 7.5mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    /* Print / PDF Mode */
    @media print {
      @page {
        size: A3 landscape;
        margin: 0;
      }
      .screen-toolbar {
        display: none !important;
      }
      .a3-board-wrapper {
        padding: 0 !important;
        margin: 0 !important;
        overflow: visible !important;
        display: block !important;
        width: 420mm !important;
        height: 297mm !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 420mm !important;
        height: 297mm !important;
        background: #fdfbf7 !important;
        overflow: hidden !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .a3-board {
        width: 420mm !important;
        height: 297mm !important;
        padding: 5mm 7.5mm !important;
        margin: 0 !important;
        box-shadow: none !important;
        position: relative !important;
        background: #fdfbf7 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }
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
      padding: 2.8mm 7mm 2.4mm 7mm;
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
      gap: 3.5mm;
      flex-shrink: 0;
    }
    .crest-seal {
      width: 14mm;
      height: 14mm;
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
      font-size: 8.2pt;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: #fbbf24;
      text-transform: uppercase;
      margin-bottom: 0.2mm;
    }
    .main-title {
      font-family: 'Cinzel', serif;
      font-size: 20pt;
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
      margin-top: 0.3mm;
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
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      padding: 1mm 3.4mm;
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
      font-size: 7pt;
      font-weight: 700;
      color: #cbd5e1;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0.5mm 1.8mm;
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
      gap: 4.2mm;
      flex: 1;
      min-height: 0;
      margin-top: 2.2mm;
      margin-bottom: 2.2mm;
      position: relative;
      z-index: 10;
    }

    .column-panel {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 4px solid #0f172a;
      border-radius: 4px;
      padding: 2.6mm 3mm;
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
      margin-bottom: 1.4mm;
      flex-shrink: 0;
    }
    .col-badge {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 0.4mm 2.2mm;
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
      font-size: 14pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
      margin: 0 0 0.2mm 0;
    }
    .col-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 0.6mm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Top Row Elements (Height 42mm across all 4 columns for solid presence and alignment) */
    .image-plate-container {
      width: 100%;
      height: 42mm;
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
    .img-pos-william { object-position: 50% 50% !important; }
    .img-pos-queen { object-position: 50% 0% !important; }
    .img-pos-cloth { object-position: 50% 8% !important; }

    .dual-image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.6mm;
      height: 42mm;
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
      font-size: 7.2pt;
      font-weight: 600;
      padding: 1.8mm 2.2mm 1mm 2.2mm;
      line-height: 1.25;
    }

    /* Column 4 Top Row: Platform Live Showcase Hero Card */
    .platform-hero-box {
      height: 42mm;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1.5px solid #d97706;
      border-radius: 3px;
      padding: 2.4mm 3.2mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #ffffff;
      margin-bottom: 2mm;
      flex-shrink: 0;
      box-shadow: inset 0 0 12px rgba(217, 119, 6, 0.15);
    }
    .platform-hero-badge {
      font-family: 'Cinzel', serif;
      font-size: 7pt;
      font-weight: 800;
      color: #fbbf24;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .platform-hero-title {
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.18;
    }
    .platform-hero-text {
      font-size: 7.6pt;
      line-height: 1.34;
      color: #cbd5e1;
    }
    .platform-features-strip {
      display: flex;
      gap: 1.4mm;
    }
    .feat-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      background: rgba(251, 191, 36, 0.15);
      border: 1px solid rgba(251, 191, 36, 0.35);
      color: #fde68a;
      padding: 0.5mm 2mm;
      border-radius: 2px;
      white-space: nowrap;
    }

    /* Column Body & Structured Content: Generous, Clear Spacing */
    .col-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2.2mm;
      min-height: 0;
    }

    /* Standardized Curriculum Cards */
    .curriculum-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #1e3a8a;
      border-radius: 3px;
      padding: 2.4mm 3mm;
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
      margin-bottom: 0.8mm;
    }
    .card-title-row {
      font-family: 'Cinzel', serif;
      font-size: 9.4pt;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 1.15;
    }
    .term-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 800;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .enquiry-stem {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 8.4pt;
      color: #1e3a8a;
      font-weight: 700;
      line-height: 1.22;
      margin-top: 0.3mm;
    }
    .paper-stem {
      font-family: 'Playfair Display', serif;
      font-size: 8.6pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin-top: 0.3mm;
    }

    /* Clean, Large Bullet Lists */
    .card-list {
      margin: 0;
      padding-left: 3.5mm;
      list-style-type: square;
    }
    .card-list li {
      font-size: 8.2pt;
      line-height: 1.34;
      color: #334155;
      margin-bottom: 1.1mm;
    }
    .card-list li:last-child {
      margin-bottom: 0;
    }
    .card-list li strong {
      color: #0f172a;
    }

    /* ==========================================================================
       COLUMN 4 SPECIFIC STYLING (QR BLOCKS FOR MOBILE PHONES & SUITE)
       ========================================================================== */
    .qr-showcase-card {
      background: #ffffff;
      border: 1.8px solid #d97706;
      border-radius: 3px;
      padding: 2.4mm 3.2mm;
      display: flex;
      align-items: center;
      gap: 3.5mm;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
      flex: 1.15;
      min-height: 0;
    }
    .qr-image-frame {
      width: 32mm;
      height: 32mm;
      flex-shrink: 0;
      background: #ffffff;
      padding: 0.8mm;
      border: 1.4px solid #cbd5e1;
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
    .qr-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6mm;
    }
    .qr-meta-badge {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 6.8pt;
      font-weight: 800;
      background: #b45309;
      color: #ffffff;
      padding: 0.5mm 2mm;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .qr-url-pill {
      font-family: 'Inter', monospace, sans-serif;
      font-size: 6.4pt;
      font-weight: 700;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.3mm 1.8mm;
      border-radius: 2px;
    }
    .qr-card-title {
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 0.4mm 0;
    }
    .qr-card-desc {
      font-size: 7.8pt;
      line-height: 1.3;
      color: #475569;
      margin: 0 0 0.6mm 0;
    }
    .qr-bullets {
      margin: 0;
      padding-left: 3.2mm;
      list-style-type: square;
    }
    .qr-bullets li {
      font-size: 7.6pt;
      line-height: 1.3;
      color: #334155;
      margin-bottom: 0.4mm;
    }

    /* What Students & Parents Receive Strip */
    .suite-box {
      background: #f8fafc;
      border: 1.4px solid #cbd5e1;
      border-radius: 3px;
      padding: 2.6mm 3.2mm;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .suite-title {
      font-family: 'Cinzel', serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.8mm;
    }
    .suite-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.4mm 2.8mm;
      flex: 1;
      align-content: space-around;
    }
    .suite-item {
      font-size: 8pt;
      color: #334155;
      line-height: 1.25;
      display: flex;
      align-items: center;
      gap: 1.4mm;
      font-weight: 600;
    }
    .suite-dot {
      color: #d97706;
      font-weight: 900;
      font-size: 8pt;
      line-height: 1;
    }

    /* ==========================================================================
       FOOTER: Welcome Banner & Open Evening Invitation (Mobile Phone Scanning)
       ========================================================================== */
    .dept-footer {
      width: 100%;
      background: #0f172a;
      color: #ffffff;
      padding: 3mm 8mm;
      border-radius: 3px;
      border-top: 2.5px solid #d97706;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5mm;
      position: relative;
      z-index: 10;
      flex-shrink: 0;
    }
    .footer-instructions {
      display: flex;
      align-items: center;
      gap: 3mm;
    }
    .footer-step-number {
      width: 7mm;
      height: 7mm;
      background: #d97706;
      color: #ffffff;
      border-radius: 50%;
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 8pt;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .footer-text {
      font-size: 8.4pt;
      line-height: 1.3;
      color: #e2e8f0;
    }
    .footer-text strong {
      color: #fbbf24;
      font-weight: 700;
    }

    .footer-brand {
      font-family: 'Cinzel', serif;
      font-size: 8.5pt;
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

  <!-- Screen-Only Navigation & Control Bar -->
  <aside class="screen-toolbar">
    <div class="screen-toolbar-title">
      <span>🏛️</span>
      <span>The History Department &bull; Open Evening Showcase Sheet (A3 Landscape)</span>
    </div>
    <div class="screen-toolbar-actions">
      <button class="screen-btn btn-secondary" onclick="toggleFit()" id="zoomBtn">🔍 Fit to Screen</button>
      <a class="screen-btn btn-secondary" href="pdfs/history_department_open_evening_a3.pdf" target="_blank">📄 Open PDF File</a>
      <button class="screen-btn" onclick="window.print()">🖨️ Print / Save A3 PDF</button>
    </div>
  </aside>

  <div class="a3-board-wrapper" id="boardWrapper">

    <!-- Decorative Outer Frame -->
    <div class="outer-border"></div>
    <div class="inner-border"></div>
    <div class="corner-ornament corner-tl"></div>
    <div class="corner-ornament corner-tr"></div>
    <div class="corner-ornament corner-bl"></div>
    <div class="corner-ornament corner-br"></div>

    <div class="a3-board" id="a3Board">

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
            <img class="img-pos-william" src="${imgWilliam}" alt="Duke William lifts his helmet to rally his knights at Hastings (Bayeux Tapestry c. 1070s)">
            <div class="image-plate-caption">
              <strong>Primary Record:</strong> Bayeux Tapestry (c. 1070s) &bull; Duke William Rallies the Normans at Hastings
            </div>
          </div>

          <div class="col-content">
            <!-- Year 7 -->
            <div class="curriculum-card navy-edge">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Year 7: Medieval Britain &amp; Health</span>
                  <span class="term-tag">1066–1500</span>
                </div>
                <div class="enquiry-stem">"How did conquest and public health transform medieval society?"</div>
              </div>
              <ul class="card-list">
                <li><strong>Norman Subjugation (1066–87):</strong> Feudal hierarchy, Domesday survey, and motte-and-bailey castle network.</li>
                <li><strong>Church, Crown &amp; Law:</strong> Becket's murder 1170, Magna Carta 1215, and the roots of parliamentary power.</li>
                <li><strong>Pandemic &amp; Rebellion:</strong> The catastrophic 1348 Black Death and the radical 1381 Peasants' Revolt.</li>
              </ul>
            </div>

            <!-- Year 8 -->
            <div class="curriculum-card navy-edge">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Year 8: Early Modern &amp; Empire</span>
                  <span class="term-tag">1500–1900</span>
                </div>
                <div class="enquiry-stem">"To what extent did religious upheaval, empire and steam reshape Britain?"</div>
              </div>
              <ul class="card-list">
                <li><strong>Reformation &amp; Regicide:</strong> Break with Rome, English Civil War, and the 1649 execution of Charles I.</li>
                <li><strong>Enslavement &amp; Resistance:</strong> Transatlantic trade, plantation rebellion, and Equiano's abolition campaign.</li>
                <li><strong>Industrial Revolution &amp; Empire:</strong> Steam power, child labour reform, and British expansion in India and Australia.</li>
              </ul>
            </div>

            <!-- Year 9 (Notice: ZERO mention of Ypres trip!) -->
            <div class="curriculum-card navy-edge">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Year 9: Conflict &amp; Modernity</span>
                  <span class="term-tag">1900–Present</span>
                </div>
                <div class="enquiry-stem">"Was the twentieth-century global crisis inevitable?"</div>
              </div>
              <ul class="card-list">
                <li><strong>The Great War (1914–18):</strong> Alliance systems, imperial rivalries, trench warfare, and Western Front trauma.</li>
                <li><strong>Totalitarian Dictatorships:</strong> Weimar democracy collapse, economic depression, and the rise of Fascism.</li>
                <li><strong>The Holocaust &amp; Modernity:</strong> Nazi persecution and liberation, followed by the Welfare State and Windrush.</li>
              </ul>
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
            <img class="img-pos-queen" src="${imgElizabeth}" alt="Queen Elizabeth I Ermine Portrait (Nicholas Hilliard, 1585)">
            <div class="image-plate-caption">
              <strong>Paper 2 Depth Study:</strong> Queen Elizabeth I &amp; The Tudor Golden Age (Hilliard, 1585)
            </div>
          </div>

          <div class="col-content">
            <!-- Paper 1 -->
            <div class="curriculum-card">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span style="font-weight:800; color:#1e3a8a;">Paper 1: Thematic Breadth</span>
                  <span class="term-tag">30% • 1 hr 15m</span>
                </div>
                <div class="paper-stem">Medicine in Britain c1250–Present &amp; Western Front</div>
              </div>
              <ul class="card-list">
                <li><strong>Thematic Evolution:</strong> Medieval Galenism &rarr; Renaissance anatomy (Vesalius &amp; Harvey) &rarr; Germ Theory &rarr; Modern NHS.</li>
                <li><strong>Western Front Sector:</strong> RAMC evacuation chain (RAP, Dressing Stations, Casualty Clearing Stations, Base Hospitals).</li>
                <li><strong>Clinical Innovation Under Fire:</strong> Trench foot, gas gangrene, mobile X-rays, blood transfusions, and Thomas splints.</li>
              </ul>
            </div>

            <!-- Paper 2 -->
            <div class="curriculum-card">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span style="font-weight:800; color:#1e3a8a;">Paper 2: Period &amp; Depth</span>
                  <span class="term-tag">40% • 1 hr 45m</span>
                </div>
                <div class="paper-stem">Elizabethan England (1558–88) &amp; Middle East (1945–95)</div>
              </div>
              <ul class="card-list">
                <li><strong>Early Elizabethan England:</strong> Religious Settlement 1559, Catholic plots, Mary Queen of Scots, and the Spanish Armada.</li>
                <li><strong>Age of Discovery:</strong> Sir Francis Drake's circumnavigation, Roanoke colonisation, and Elizabethan theatre culture.</li>
                <li><strong>Conflict in the Middle East:</strong> UN Partition 1947, Suez Crisis 1956, Six-Day War 1967, and Camp David Accords 1978.</li>
              </ul>
            </div>

            <!-- Paper 3 -->
            <div class="curriculum-card">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span style="font-weight:800; color:#1e3a8a;">Paper 3: Modern Depth</span>
                  <span class="term-tag">30% • 1 hr 20m</span>
                </div>
                <div class="paper-stem">Weimar &amp; Nazi Germany (1918–39)</div>
              </div>
              <ul class="card-list">
                <li><strong>The Weimar Republic:</strong> Versailles impact, 1923 hyperinflation crisis, and Stresemann's golden recovery.</li>
                <li><strong>Rise of Totalitarianism:</strong> Wall Street Crash, mass unemployment, propaganda appeals, and Hitler's appointment in 1933.</li>
                <li><strong>Life Under the Police State:</strong> The Gestapo terror network, social control of youth and women, and church opposition.</li>
              </ul>
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
              <img class="img-pos-cloth" src="${imgYpres}" alt="Ypres Cloth Hall &amp; Flanders Fields">
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
            <!-- Fieldwork Card (Corrected: NOT annual, for Years 10 & 11) -->
            <div class="curriculum-card amber-edge">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Ypres &amp; Flanders Fieldwork</span>
                  <span class="term-tag">Years 10 &amp; 11</span>
                </div>
                <div class="enquiry-stem" style="color: #92400e;">Key Stage 4 Residential Battlefield Study Tour</div>
              </div>
              <ul class="card-list">
                <li><strong>Walking the Historic Front Line:</strong> Tyne Cot Cemetery, Langemark, and preserved trenches at Hill 62 Sanctuary Wood.</li>
                <li><strong>The Last Post at Menin Gate:</strong> Participating in the poignant evening act of remembrance for the fallen.</li>
                <li><strong>Medicine Under Fire:</strong> Investigating Essex Farm Advanced Dressing Station, linking directly to GCSE Paper 1.</li>
              </ul>
            </div>

            <!-- Local Archive Card -->
            <div class="curriculum-card amber-edge">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Hampshire Archival Studies</span>
                  <span class="term-tag">Local Study</span>
                </div>
                <div class="enquiry-stem" style="color: #92400e;">Primary Document Scholarship</div>
              </div>
              <ul class="card-list">
                <li><strong>Parish &amp; Census Records:</strong> Deciphering authentic 18th &amp; 19th-century county archival registers and rolls.</li>
                <li><strong>Naval &amp; Industrial Heritage:</strong> Portsmouth Royal Dockyard history and Henry Cort's iron innovations at Fontley.</li>
                <li><strong>Medieval Fortifications:</strong> Field study of Portchester Castle and Winchester's Great Hall.</li>
              </ul>
            </div>

            <!-- Career Destinations Card -->
            <div class="curriculum-card amber-edge">
              <div class="card-top-header">
                <div class="card-title-row">
                  <span>Where History Leads</span>
                  <span class="term-tag">Career Paths</span>
                </div>
                <div class="enquiry-stem" style="color: #92400e;">Transferable Disciplinary Rigour</div>
              </div>
              <ul class="card-list">
                <li><strong>Law &amp; The Bar:</strong> Evidential cross-examination, assessing credibility, and structuring persuasive cases.</li>
                <li><strong>Journalism &amp; Diplomacy:</strong> Investigative enquiry, bias detection, political writing, and civil service policy.</li>
                <li><strong>Finance &amp; Strategy:</strong> Dissecting complex historical trends, risk management, and strategic decision-making.</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ================================================================
             COLUMN 4: DIGITAL REVISION HUB & MOBILE PHONE QR CODES
             (Zero iPads, Zero artificial quotes, Clean spacious layout)
             ================================================================ -->
        <section class="column-panel highlight-col">
          <div class="col-header">
            <span class="col-badge badge-gold">Interactive Platform</span>
            <h2 class="col-title">Digital Revision Hub</h2>
            <div class="col-subtitle">Scan With Your Phone Tonight</div>
          </div>

          <!-- Column 4 Top Row: Platform Live Showcase Hero Card -->
          <div class="platform-hero-box">
            <div class="platform-hero-badge">✦ Mobile-First Digital Platform ✦</div>
            <div class="platform-hero-title">Scan on Your Mobile Phone Tonight</div>
            <div class="platform-hero-text">
              Parents and visitors can scan our live QR codes using any mobile phone camera. Instantly explore our complete collection of digital textbooks, audio narrations, and revision quizzes on your phone tonight!
            </div>
            <div class="platform-features-strip">
              <span class="feat-pill">📱 Mobile-Optimized</span>
              <span class="feat-pill">🎧 Audio Narrations</span>
              <span class="feat-pill">⚡ Live Quizzes</span>
            </div>
          </div>

          <div class="col-content">
            <!-- QR Code 1: Lesson Portal -->
            <div class="qr-showcase-card">
              <div class="qr-image-frame">
                <img src="${qrPortalDataUrl}" alt="Scan with your mobile phone to explore interactive lessons">
              </div>
              <div class="qr-content-pane">
                <div class="qr-header-row">
                  <span class="qr-meta-badge">📱 Scan on Phone</span>
                  <span class="qr-url-pill">the-history-revision-hub.netlify.app</span>
                </div>
                <h3 class="qr-card-title">Explore Live Lessons</h3>
                <p class="qr-card-desc">
                  Point your smartphone camera at this code to open our interactive digital textbooks across all 16 units on your phone.
                </p>
                <ul class="qr-bullets">
                  <li>Full Christine Counsell 4-act enquiry narratives</li>
                  <li>Synchronized teacher voiceover audio reading</li>
                  <li>Dual-coded primary sources and model answers</li>
                </ul>
              </div>
            </div>

            <!-- QR Code 2: Quizzes -->
            <div class="qr-showcase-card">
              <div class="qr-image-frame">
                <img src="${qrQuizDataUrl}" alt="Scan with your mobile phone to take the interactive quiz">
              </div>
              <div class="qr-content-pane">
                <div class="qr-header-row">
                  <span class="qr-meta-badge">📱 Live Challenge</span>
                  <span class="qr-url-pill">.../?view=quiz</span>
                </div>
                <h3 class="qr-card-title">Test Your History Knowledge</h3>
                <p class="qr-card-desc">
                  Scan with your smartphone to take our 20-question rapid retrieval challenge live tonight!
                </p>
                <ul class="qr-bullets">
                  <li>20-question rapid historical recall quizzes</li>
                  <li>Instant scoring and explanatory feedback</li>
                  <li>Complete KS3 and GCSE self-quizzing decks</li>
                </ul>
              </div>
            </div>

            <!-- Student & Parent Support Suite -->
            <div class="suite-box">
              <div class="suite-title">✦ Every Pupil &amp; Family Receives:</div>
              <div class="suite-grid">
                <div class="suite-item"><span class="suite-dot">▸</span><span>Printed Course Workbooks</span></div>
                <div class="suite-item"><span class="suite-dot">▸</span><span>24/7 Digital Audio Hub</span></div>
                <div class="suite-item"><span class="suite-dot">▸</span><span>Model Answer Banks</span></div>
                <div class="suite-item"><span class="suite-dot">▸</span><span>Self-Quizzing Flashcards</span></div>
                <div class="suite-item"><span class="suite-dot">▸</span><span>Primary Source Archives</span></div>
                <div class="suite-item"><span class="suite-dot">▸</span><span>Key Chronology Spines</span></div>
              </div>
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
            <strong>Scan on Your Phone:</strong> Open your smartphone camera to scan our QR codes and explore the interactive Revision Hub, audio narrations, and quizzes.
          </div>
        </div>

        <div class="footer-instructions">
          <div class="footer-step-number">3</div>
          <div class="footer-text">
            <strong>Speak With Us:</strong> Our Head of History and teaching specialists are here to answer any questions about our curriculum.
          </div>
        </div>

        <div class="footer-brand">
          <span class="school-brand-target">The History Department</span> &bull; <span>Excellence in History</span>
        </div>
      </footer>

    </div>
  </div>

  <script>
    let isFitted = false;
    function toggleFit() {
      const board = document.getElementById('a3Board');
      const wrapper = document.getElementById('boardWrapper');
      const btn = document.getElementById('zoomBtn');
      if (!board || !btn || !wrapper) return;

      if (!isFitted) {
        const availableWidth = window.innerWidth - 32;
        const boardWidth = board.offsetWidth;
        const scale = Math.min(availableWidth / boardWidth, 1);
        board.style.transform = 'scale(' + scale + ')';
        board.style.transformOrigin = 'top center';
        wrapper.style.height = (board.offsetHeight * scale + 24) + 'px';
        btn.innerHTML = '🔍 Actual Size (100%)';
        isFitted = true;
      } else {
        board.style.transform = 'none';
        wrapper.style.height = 'auto';
        btn.innerHTML = '🔍 Fit to Screen';
        isFitted = false;
      }
    }
  </script>

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

  // Emulate print media so @media print rules apply cleanly with zero screen toolbars
  await page.emulateMediaType('print');

  // Verify DOM metrics in print mode
  const metrics = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  console.log('📐 Rendered DOM dimensions (print):', metrics);

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
