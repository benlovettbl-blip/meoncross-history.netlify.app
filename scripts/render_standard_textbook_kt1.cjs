/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/cme_new (Key Topic 1: The Creation of the State of Israel, 1945–1956)
 * Output: public/pdfs/cme_new_textbook_KT1_PUBLISHER.pdf
 * HTML:   public/units/cme_new/textbook_KT1_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. ZERO AI Fluff & Zero Theatrical Jargon: Removed internal DB IDs and "Act 1–4" staging tags.
 * 2. Official Specification Primacy: Header, cover matrix & lesson banners feature authentic Pearson Edexcel 1HI0/26 spec.
 * 3. Base64 Image Inlining: All archival photos & maps embedded directly as Data URIs (100% reliable offline & in Puppeteer).
 * 4. Automated Map Preservation: All historical maps rendered uncropped with object-fit: contain so no borders or legends are clipped.
 * 5. Clean Chapter Headings: Professional textbook section subheadings with [Section.Paragraph] pills for workbook linkage.
 * 6. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages):
 *    - Page 1:  Master Front Cover (98mm uncropped photographic plate: Ben-Gurion 1948 Declaration, official 3-column spec matrix)
 *    - Page 2:  KT 1.1 Imperial Origins & Contradictory Pledges (1915–1945) - Sections 1 & 2
 *    - Page 3:  KT 1.1 Imperial Origins & Contradictory Pledges (1915–1945) - Sections 3 & 4 + Key Figure: Arthur Balfour
 *    - Page 4:  KT 1.2 Collapse of the Mandate & Insurgency (1945–1947) - Sections 1 & 2
 *    - Page 5:  KT 1.2 Collapse of the Mandate & Insurgency (1945–1947) - Sections 3 & 4 + Key Figure: Clement Attlee
 *    - Page 6:  KT 1.3 UN Resolution 181 & The 1948–49 War (1947–1949) - Sections 1 & 2
 *    - Page 7:  KT 1.3 UN Resolution 181 & The 1948–49 War (1947–1949) - Sections 3 & 4 + Key Figure: David Ben-Gurion
 *    - Page 8:  KT 1.4 The Palestinian Refugee Crisis (Nakba) & Green Line (1948–1954) - Sections 1 & 2
 *    - Page 9:  KT 1.4 The Palestinian Refugee Crisis (Nakba) & Green Line (1948–1954) - Sections 3 & 4 + Key Figure: King Hussein
 *    - Page 10: KT 1.5 Nasser, Border Tension & The Suez Crisis (1955–1963) - Sections 1 & 2
 *    - Page 11: KT 1.5 Nasser, Border Tension & The Suez Crisis (1955–1963) - Sections 3 & 4 + Key Figure: Anthony Eden
 *    - Page 12: Master Back Cover (KT1 Chronological Sequence, Core Terminology & Exam Question Guide)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');

/**
 * Robust Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  console.warn(`[WARN] Image not found on disk: ${relPath}`);
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

async function buildPublisherTextbookHtmlKT1() {
  const coverBase64 = getBase64Image('images/cme_bengurion_declaration_1948.jpg');

  // Generate high-contrast QR Code for Key Topic 1 interactive quiz & flashcards
  const quizUrl = 'https://the-history-revision-hub.netlify.app/?unit=cme_new&quiz=true&lesson=1';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    width: 140,
    margin: 1,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });

  // Images for sources and key figures
  const sykesPicotMap = getBase64Image('images/cme_sykes_picot_1916_map.jpg');
  const allenbyPhoto = getBase64Image('images/cme_allenby_jerusalem_1917.jpg');
  const balfourLetter = getBase64Image('images/cme_balfour_declaration_1917.jpg');
  const cardBalfour = getBase64Image('units/cme_new/assets/card_balfour.png');

  const sergeantsPhoto = getBase64Image('images/cme_sergeants_affair_1947.jpg');
  const kingDavidRuins = getBase64Image('units/cme_new/assets/king_david_ruins.png');
  const exodusPhoto =
    getBase64Image('units/cme_new/assets/exodus_ship.jpg') ||
    getBase64Image('images/cme_exodus.jpeg');
  const cardAttlee = getBase64Image('units/cme_new/assets/card_attlee.png');

  const partitionMap = getBase64Image(
    'units/cme_new/assets/UN_Partition_Plan_For_Palestine_1947_fixed.png',
  );
  const arabInvasionMap = getBase64Image('images/cme_1948_arab_invasion_map.png');
  const bengurionDec = getBase64Image('images/cme_bengurion_declaration_1948.jpg');
  const cardBenGurion = getBase64Image('units/cme_new/assets/card_bengurion.png');

  const refugeesPhoto = getBase64Image('images/cme_palestinian_refugees_1948.jpg');
  const gazaRefugees = getBase64Image('images/cme_palestinian_refugees_leaving_gaza.webp');
  const cardHussein = getBase64Image('units/cme_new/assets/card_hussein.png');
  const palestine1949Map = getBase64Image('units/cme_new/assets/palestine_1949_map.png');

  const alAhramPhoto = getBase64Image('images/cme_alahram_suez_1956.jpg');
  const portSaidPhoto = getBase64Image('images/cme_port_said_british_troops_1956.jpg');
  const suezCampaignMap = getBase64Image('images/cme_suez_1956_campaign_map.jpg');
  const cardEden = getBase64Image('units/cme_new/assets/card_eden.png');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) History — Key Topic 1 Course Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }

    @page {
      size: A4 portrait;
      margin: 12mm 14mm 12mm 14mm;
    }

    body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.6pt;
      line-height: 1.47;
      color: #1c1917;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Strict A4 Page Container (297mm - 24mm margins = 273mm printable height) */
    .textbook-page {
      width: 100%;
      height: 273mm;
      max-height: 273mm;
      overflow: hidden;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    /* Running Header */
    .running-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #475569;
      flex-shrink: 0;
    }
    .running-header strong {
      color: #0f172a;
      font-weight: 800;
    }

    /* Running Footer */
    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Lesson Hero Banner (Page 1 of each lesson spread) */
    .lesson-hero {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 6px;
      margin-bottom: 8px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.0pt;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 7.0pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 2px 0 4px 0;
      line-height: 1.22;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      color: #334155;
      line-height: 1.35;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 4px 8px;
      border-radius: 0 4px 4px 0;
    }

    /* 2-Column Cambridge / OUP Reading Prose Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 18px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
    }

    /* Chapter Section Heading */
    .section-banner {
      column-span: all;
      background: #f8fafc;
      border-left: 3.5px solid #1e3a8a;
      border-bottom: 1px solid #e2e8f0;
      padding: 3.5px 8px;
      border-radius: 0 3px 3px 0;
      margin: 7px 0 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      break-inside: avoid;
    }
    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.6pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.01em;
    }

    /* Paragraph Styling with Pure [Section.Paragraph] pill */
    .numbered-para {
      margin: 0 0 6px 0;
      text-indent: 0;
      line-height: 1.42;
    }
    .para-ref-pill {
      font-family: 'Inter', monospace;
      font-size: 7.0pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 1px 4px;
      border-radius: 2px;
      margin-right: 4px;
      display: inline-block;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    /* Primary Historical Source Box */
    .archival-source-box {
      background: #fdfcfb;
      border: 1px solid #e7e5e4;
      border-top: 3px solid #1e3a8a;
      border-radius: 4px;
      padding: 6px 8px;
      margin: 6px 0;
      break-inside: avoid;
      font-family: 'Newsreader', Georgia, serif;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .source-identity {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .source-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }
    .source-type {
      font-size: 6.8pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .source-date-micro {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
    }
    .archival-title {
      font-family: 'Playfair Display', serif;
      font-size: 8.8pt;
      font-weight: 700;
      color: #0f172a;
      margin: 1px 0 3px 0;
      line-height: 1.25;
    }
    .archival-image {
      width: 100%;
      max-height: 155px;
      object-fit: contain;
      background: #fafaf9;
      border-radius: 3px;
      margin: 4px 0;
      border: 1px solid #cbd5e1;
      display: block;
    }
    .archival-map-image {
      width: 100%;
      max-height: 155px;
      object-fit: contain;
      background: #fafaf9;
      border-radius: 3px;
      margin: 4px 0;
      border: 1px solid #cbd5e1;
      display: block;
    }
    .archival-body {
      font-size: 8.2pt;
      line-height: 1.38;
      color: #1e293b;
      margin: 3px 0;
      font-style: italic;
      background: #f8fafc;
      padding: 4px 7px;
      border-left: 2.5px solid #94a3b8;
      border-radius: 0 3px 3px 0;
    }
    .archival-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 3px;
      margin-top: 3px;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }

    /* Key Figure Profile Box (Embedded in Reading Column) */
    .key-figure-box {
      background: #fdfcfb;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #1e3a8a;
      border-radius: 4px;
      padding: 6px 8px;
      margin: 7px 0;
      break-inside: avoid;
      font-family: 'Newsreader', Georgia, serif;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 6.6pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .kf-lifespan {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 700;
      color: #64748b;
    }
    .kf-identity-row {
      display: flex;
      gap: 7px;
      align-items: center;
      margin-bottom: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
    }
    .kf-portrait {
      width: 44px;
      height: 54px;
      object-fit: cover;
      border-radius: 3px;
      border: 1px solid #94a3b8;
      background: #ffffff;
      flex-shrink: 0;
    }
    .kf-identity-text {
      flex: 1;
      min-width: 0;
    }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.6pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.18;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      line-height: 1.25;
    }
    .kf-significance {
      font-size: 7.8pt;
      font-style: italic;
      color: #334155;
      line-height: 1.34;
      margin-bottom: 3px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 3px 0 2px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      line-height: 1.35;
      color: #1e293b;
    }
    .kf-actions-list li {
      margin-bottom: 1.5px;
    }

    /* Concept Spotlight Box (Curriculum Depth & Historical Mechanism) */
    .concept-spotlight-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 4px;
      padding: 6px 9px;
      margin: 7px 0;
      break-inside: avoid;
      font-family: 'Newsreader', Georgia, serif;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
      padding-bottom: 2px;
      border-bottom: 1px solid #ffedd5;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 6.6pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .csb-category {
      font-size: 6.2pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.2pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 3px 0;
      line-height: 1.2;
    }
    .csb-body {
      font-size: 7.8pt;
      line-height: 1.38;
      color: #1e293b;
      margin-bottom: 3px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 2px 6px;
      border-radius: 0 2px 2px 0;
    }

    /* Compact Concept Spotlight Variant */
    .concept-spotlight-box.compact {
      padding: 4px 7px;
      margin: 4px 0;
    }
    .concept-spotlight-box.compact .csb-title {
      font-size: 8.5pt;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .concept-spotlight-box.compact .csb-body {
      font-size: 7.3pt;
      line-height: 1.25;
      margin-bottom: 2px;
    }
    .concept-spotlight-box.compact .csb-takeaway {
      font-size: 6.2pt;
      line-height: 1.2;
      padding: 1.5px 5px;
    }

    /* Full-Width Bottom Enquiry Deck (Pinned to bottom of page container) */
    .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 2px;
      padding: 6px 10px;
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-top: 3px solid #1e3a8a;
      border-radius: 4px;
      font-family: 'Inter', sans-serif;
    }
    .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
    }
    .beb-title {
      font-size: 7.2pt;
      font-weight: 900;
      color: #1e3a8a;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .beb-badge {
      font-size: 6.2pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      font-size: 7.2pt;
      line-height: 1.35;
      color: #334155;
    }
    .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 2px;
      text-transform: uppercase;
      font-size: 6.6pt;
      letter-spacing: 0.03em;
    }

    /* Full-Width Bottom Vocabulary Deck (Pinned to bottom of left page container) */
    .bottom-vocab-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 2px;
      padding: 6px 10px;
      background: #fdfaf6;
      border: 1.5px solid #fed7aa;
      border-top: 3px solid #b45309;
      border-radius: 4px;
      font-family: 'Inter', sans-serif;
    }
    .bvb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      border-bottom: 1px solid #fed7aa;
      padding-bottom: 2px;
    }
    .bvb-title {
      font-size: 7.2pt;
      font-weight: 900;
      color: #92400e;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .bvb-badge {
      font-size: 6.2pt;
      font-weight: 800;
      background: #b45309;
      color: #fff;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      font-size: 7.0pt;
      line-height: 1.34;
      color: #334155;
    }
    .bvb-col {
      background: #ffffff;
      padding: 4px 7px;
      border: 1px solid #ffedd5;
      border-left: 2.5px solid #b45309;
      border-radius: 3px;
    }
    .bvb-col strong {
      display: block;
      color: #7c2d12;
      margin-bottom: 2px;
      font-size: 6.7pt;
      font-weight: 800;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>

  <!-- ====================================================================
       PAGE 1: MASTER FRONT COVER (Key Topic 1 Course Textbook)
       ==================================================================== -->
  <div class="textbook-page" style="padding: 2mm 2mm; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Course Textbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">OPTION 26/27 &bull; 1HI0/26</span>
        </div>
      </div>

      <!-- Key Topic Title & Inquiry Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 5px 10px; background: #fff; margin-bottom: 4px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
          <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
            Key Topic 1
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Course Textbook &bull; Chronological Enquiry Sequence &bull; 1945–1956
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 16pt; margin: 2px 0; font-weight: 900; line-height: 1.15; color: #000;">
          THE CREATION OF THE STATE OF ISRAEL
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #333; font-style: italic; line-height: 1.25;">
          From Imperial Mandate and UN Partition to the 1948 War and the 1956 Suez Crisis
        </div>
      </div>

      <!-- Master Wide Photographic Plate (Ben-Gurion Independence Declaration, 14 May 1948) -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 5px; display: flex; flex-direction: column;">
        <div style="height: 87mm; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${coverBase64}" alt="David Ben-Gurion Declaring the State of Israel (Rudi Weissenstein, 14 May 1948)" style="height: 100%; max-width: 100%; object-fit: contain; display: block;">
        </div>
        <div style="border-top: 1.5px solid #000; padding: 4px 10px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
              Archival Primary Record &bull; 14 May 1948
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
              GPO-ARCHIVE / ACC-1948-05-14
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 800; line-height: 1.2; margin: 1px 0;">
            Proclamation of the State of Israel, Tel Aviv Museum of Art
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #111; line-height: 1.25;">
            David Ben-Gurion reading the Declaration of Independence beneath the portrait of Zionist visionary Theodor Herzl, 14 May 1948 (Rudi Weissenstein).
          </div>
          <div style="margin-top: 2px; padding-top: 2px; border-top: 1px dashed #999; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; text-transform: uppercase; color: #333;">
            <span>Archival Primary Record</span>
            <span>Edexcel Paper 2 Master Archive</span>
          </div>
        </div>
      </div>

      <!-- Pearson Edexcel Specification Coverage (Official 3-Column Matrix) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; flex: 1; display: flex; flex-direction: column; margin-bottom: 4px;">
        <div style="background: #000; color: #fff; padding: 3px 12px; font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>Pearson Edexcel GCSE (9–1) History Specification Content</span>
          <span style="font-size: 7.0pt; letter-spacing: 0.5px;">Key Topic 1 Coverage</span>
        </div>

        <div style="padding: 6px 10px 10px 10px; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
          <!-- Row 1: 3-column specification bullets -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.34; color: #111;">
            <!-- 1.1 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 8px;">
              <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 1.5px; display: block; margin-bottom: 4px;">
                1.1 Creation of Israel, 1945–48
              </strong>
              <div style="margin-bottom: 2.5px;">&bull; Conflicting post-WWII interests: Jewish immigration vs Arab national self-determination.</div>
              <div style="margin-bottom: 2.5px;">&bull; Armed Jewish insurgency: Haganah, <strong>Irgun</strong> &amp; Lehi; bombing of <strong>King David Hotel (July 1946)</strong>.</div>
              <div style="margin-bottom: 2.5px;">&bull; British exhaustion: 100,000 troops deployed, post-war debts, and the <strong>SS Exodus affair (July 1947)</strong>.</div>
              <div style="margin-bottom: 2.5px;">&bull; Referral to UN: UNSCOP commission &amp; <strong>UN Resolution 181 Partition Plan</strong> (Nov 1947).</div>
              <div>&bull; Outbreak of sectarian communal civil war following UN partition announcement.</div>
            </div>

            <!-- 1.2 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 8px;">
              <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 1.5px; display: block; margin-bottom: 4px;">
                1.2 The 1948–49 War &amp; Refugees
              </strong>
              <div style="margin-bottom: 2.5px;">&bull; British Mandate terminates; Ben-Gurion proclaims <strong>State of Israel</strong> (14 May 1948).</div>
              <div style="margin-bottom: 2.5px;">&bull; Immediate Arab invasion by five neighboring armies; initial Israeli defensive crisis.</div>
              <div style="margin-bottom: 2.5px;">&bull; Turning points: First UN Truce (June 1948), <strong>Czech arms resupply</strong> &amp; IDF unification.</div>
              <div style="margin-bottom: 2.5px;">&bull; <strong>1949 Armistice agreements (Green Line)</strong>: Israeli territory expands from 56% to 78%.</div>
              <div>&bull; <strong>Palestinian refugee crisis (Nakba)</strong>: 700,000 displaced; UNRWA &amp; 1950 Law of Return.</div>
            </div>

            <!-- 1.3 -->
            <div>
              <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 1.5px; display: block; margin-bottom: 4px;">
                1.3 The Suez Crisis, 1955–63
              </strong>
              <div style="margin-bottom: 2.5px;">&bull; Rise of <strong>Gamal Abdel Nasser</strong>, Pan-Arabism, Gaza Raid &amp; Czech arms deal (1955).</div>
              <div style="margin-bottom: 2.5px;">&bull; US cancels Aswan Dam loans; Nasser announces <strong>nationalisation of Suez Canal</strong> (July 1956).</div>
              <div style="margin-bottom: 2.5px;">&bull; Secret tripartite collusion: Anglo-French-Israeli invasion across Sinai &amp; Port Said.</div>
              <div style="margin-bottom: 2.5px;">&bull; Superpower intervention: US financial pressure halts invasion; UN emergency ceasefire.</div>
              <div>&bull; Humiliating British/French withdrawal, deployment of <strong>UNEF peacekeepers</strong> in Sinai.</div>
            </div>
          </div>

          <!-- Row 2: Causal Chain of Events (Mathematically locked to exact same horizontal line) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 6px;">
            <div style="display: flex; flex-direction: column;">
              <div style="padding: 4px 6px; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.8px solid #1e3a8a; border-radius: 4px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 6.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #1e3a8a; margin-bottom: 2px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
                  <span>Causal Chain of Events</span>
                  <span style="color: #64748b; font-weight: 700;">Chronology</span>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; margin-top: 2px;">
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">1917</span>
                    <span>Balfour Declaration: Jewish Homeland</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Jul 1946</span>
                    <span>King David Hotel Bombing (Irgun)</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Feb 1947</span>
                    <span>Britain Refers Mandate to the UN</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Nov 1947</span>
                    <span>UN Resolution 181: Partition Plan</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #b91c1c; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Apr 1948</span>
                    <span>Deir Yassin &amp; Sectarian Civil War</span>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; flex-direction: column;">
              <div style="padding: 4px 6px; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.8px solid #1e3a8a; border-radius: 4px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 6.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #1e3a8a; margin-bottom: 2px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
                  <span>Causal Chain of Events</span>
                  <span style="color: #64748b; font-weight: 700;">Chronology</span>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; margin-top: 2px;">
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">14 May 48</span>
                    <span>Ben-Gurion Declares State of Israel</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">15 May 48</span>
                    <span>Five Arab Armies Invade Palestine</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Jun 1948</span>
                    <span>First UN Truce: Czech Arms &amp; IDF</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Oct 1948</span>
                    <span>Operation Yoav Breaks Negev Siege</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #b91c1c; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">1949</span>
                    <span>Green Line Armistice: Nakba Exodus</span>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; flex-direction: column;">
              <div style="padding: 4px 6px; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.8px solid #1e3a8a; border-radius: 4px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 6.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #1e3a8a; margin-bottom: 2px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
                  <span>Causal Chain of Events</span>
                  <span style="color: #64748b; font-weight: 700;">Chronology</span>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; margin-top: 2px;">
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Feb 1955</span>
                    <span>Gaza Raid Exposes Egyptian Weakness</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Sep 1955</span>
                    <span>Egyptian-Czech Arms Agreement</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">26 Jul 56</span>
                    <span>Nasser Nationalises Suez Canal</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">24 Oct 56</span>
                    <span>Secret Sèvres Collusion Protocol</span>
                  </div>
                  <div style="text-align: center; font-size: 5.8pt; line-height: 0.6; color: #b45309; font-weight: 900;">&darr;</div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 6.6pt; font-weight: 600; color: #0f172a;">
                    <span style="background: #b91c1c; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; min-width: 44px; text-align: center;">Nov 1956</span>
                    <span>Sinai Invasion; US Halts Blitz &amp; UNEF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333; font-weight: 700;">
        <span>Paper 2: Conflict in the Middle East, 1945–1995 &bull; Key Topic 1 Student Textbook</span>
        <span>Page 1 of 12</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGE 2: KT 1.1 IMPERIAL ORIGINS & CONFLICTING PLEDGES (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 1.1</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 1.1</span>
        <span class="spec-ref-badge">HISTORICAL FOUNDATIONS &bull; 1915–1945</span>
      </div>
      <h1 class="lesson-title">
        Broken Promises &amp; Imperial Borders: Why Was Conflict Inevitable?
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> Conflicting interests and demands of Jews and Arabs within the British Mandate; the McMahon-Hussein Correspondence (1915), the secret Sykes-Picot Agreement (1916), the Balfour Declaration (1917), and the 1939 British White Paper.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Ottoman Collapse &amp; The First World War</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.1]</span>
        For over four centuries leading up to 1914, the Middle East was administered as regional provinces of the Turkish <strong>Ottoman Empire</strong>. The local population was overwhelmingly Arab, comprising both Muslim and Christian communities who had lived alongside ancient, indigenous Jewish communities in Jerusalem, Safed, Tiberias, and Hebron. There were no national borders dividing Lebanon, Syria, Jordan, or Iraq; the geographic area historically referred to as Palestine was governed under Ottoman sanjaks.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.2]</span>
        When the Ottoman Empire entered World War One on the side of Imperial Germany in October 1914, Great Britain faced a grave strategic crisis. The Ottoman Sultan declared a holy jihad against Allied forces, threatening Britain's vital imperial lifeline: the <strong>Suez Canal</strong>, through which Indian troops, Australian grain, and Persian oil flowed to the Western Front. To undermine Turkish power from within, British military intelligence in Cairo actively sought an alliance with Arab tribal leaders.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Historical Map</span>
          </div>
          <span class="source-date-micro">May 1916</span>
        </div>
        <div class="archival-title">The Secret Sykes-Picot Carve-Up of the Middle East</div>
        ${sykesPicotMap ? `<img src="${sykesPicotMap}" class="archival-map-image" alt="Sykes-Picot Map">` : ''}
        <div class="archival-body">
          "France and Great Britain are prepared to recognize and protect an independent Arab State or a Confederation of Arab States... subject to French direct rule along the Syrian coast and British direct rule in southern Mesopotamia."
        </div>
        <div class="archival-footer">
          <span>Anglo-French Secret Diplomatic Agreement</span>
          <span>16 May 1916</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">Contradictory Wartime Pledges: McMahon vs. Sykes-Picot</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.3]</span>
        Between July 1915 and March 1916, Sir Henry McMahon, British High Commissioner in Egypt, exchanged ten critical letters with Sharif Hussein of Mecca. In return for an armed Arab revolt against Ottoman garrisons, McMahon promised British recognition of an independent Arab state across the Arabian Peninsula and the Levant. However, McMahon inserted ambiguous geographic exemptions regarding territories "lying to the west of the districts of Damascus, Homs, Hama and Aleppo." While Arabs firmly believed Palestine was included in the promised independent realm, British officials later claimed Palestine lay west of Damascus and was deliberately excluded.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.4]</span>
        Simultaneously and in absolute secrecy, British diplomat Sir Mark Sykes and French representative François Georges-Picot drafted the <strong>Sykes-Picot Agreement (May 1916)</strong>. Disregarding McMahon's pledges, Britain and France drew an arbitrary line across the map: France claimed direct control of modern Lebanon and Syria, while Britain claimed Iraq and Transjordan. Crucially, Palestine was designated for international administration to safeguard religious shrines. When Bolshevik revolutionaries leaked the secret treaty in November 1917, Arab leaders were enraged by what they regarded as imperial duplicity.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">11 December 1917</span>
        </div>
        <div class="archival-title">General Allenby Enters Jerusalem on Foot via the Jaffa Gate</div>
        ${allenbyPhoto ? `<img src="${allenbyPhoto}" class="archival-image" style="object-position: 50% 88%; max-height: 140px;" alt="General Allenby in Jerusalem">` : ''}
        <div class="archival-body">
          General Sir Edmund Allenby enters the Holy City on foot out of religious respect, formally ending four centuries of Ottoman Turkish rule and establishing British military administration across Palestine.
        </div>
        <div class="archival-footer">
          <span>Imperial War Museum Archive</span>
          <span>Jerusalem Operations, 11 December 1917 (Q 12616)</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Specification Terminology & Concepts -->
    <div class="bottom-vocab-box">
      <div class="bvb-header">
        <span class="bvb-title">KEY SPECIFICATION TERMINOLOGY &amp; CONCEPTS</span>
        <span class="bvb-badge">DISCIPLINARY VOCABULARY</span>
      </div>
      <div class="bvb-grid">
        <div class="bvb-col">
          <strong>Zionism:</strong>
          Movement founded by Theodor Herzl (1897) advocating for a sovereign Jewish national homeland in Palestine.
        </div>
        <div class="bvb-col">
          <strong>McMahon-Hussein (1915):</strong>
          British letters promising an independent Arab state in exchange for an armed revolt against Ottoman rule.
        </div>
        <div class="bvb-col">
          <strong>Sykes-Picot (1916):</strong>
          Secret Anglo-French treaty partitioning the Middle East into British and French imperial spheres of control.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 2 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 3: KT 1.1 IMPERIAL ORIGINS & CONFLICTING PLEDGES (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 1: THE CREATION OF ISRAEL, 1945–1956</strong></span>
      <span>ENQUIRY: IMPERIAL ORIGINS &amp; CONFLICTING PLEDGES</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Balfour Declaration &amp; Zionist Aspirations</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.5]</span>
        On 2 November 1917, British Foreign Secretary Arthur Balfour issued a historic 67-word public letter to Lord Walter Rothschild, a prominent leader of the British Jewish community. The <strong>Balfour Declaration</strong> stated that His Majesty's Government viewed with favour "the establishment in Palestine of a national home for the Jewish people," while adding the safeguard that "nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities in Palestine."
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.6]</span>
        The declaration was driven by a mixture of strategic and political motives. British Prime Minister David Lloyd George sought to enlist global Jewish sympathy—particularly in revolutionary Russia and the United States—to bolster the Allied war effort. Strategically, British control over Palestine offered an essential buffer safeguarding the Suez Canal. For the Zionist movement, founded by Theodor Herzl in 1897, the declaration provided indispensable diplomatic legitimacy from the world's leading imperial power.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Diplomatic Document</span>
          </div>
          <span class="source-date-micro">2 November 1917</span>
        </div>
        <div class="archival-title">The Balfour Declaration to Lord Walter Rothschild</div>
        ${balfourLetter ? `<img src="${balfourLetter}" class="archival-map-image" style="max-height: 155px; background: #fdfbf7;" alt="Balfour Declaration Letter">` : ''}
        <div class="archival-body">
          "His Majesty's Government view with favour the establishment in Palestine of a national home for the Jewish people, and will use their best endeavours to facilitate the achievement of this object..."
        </div>
        <div class="archival-footer">
          <span>Foreign Office Dispatch / Arthur Balfour</span>
          <span>The National Archives, Kew (FO 371/3058)</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Mandate Era &amp; The 1939 British White Paper</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.7]</span>
        In 1922, the League of Nations formalized Britain's administrative rule as the <strong>Mandate for Palestine</strong>, explicitly incorporating the Balfour Declaration into international law. Between 1922 and 1939, waves of Jewish immigration (Aliyah), fleeing rising antisemitism and Nazi persecution in Europe, transformed the demographic landscape. The Jewish population increased from roughly 11% in 1922 to nearly 30% by 1939. Land purchases by the Jewish National Fund led to evictions of Palestinian tenant farmers, sparking severe inter-communal riots in 1929 and the nationwide <strong>Arab Revolt (1936–1939)</strong>.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.8]</span>
        To suppress the rebellion, Britain deployed 25,000 troops and instituted harsh emergency regulations. In 1937, the Peel Commission recommended partition for the first time, but both communities rejected it. With World War Two looming and Britain desperately needing Arab oil and stability across the Middle East, the British government issued the <strong>May 1939 White Paper</strong>. It capped Jewish immigration at 75,000 over five years, restricted land transfers to Jews, and promised independence within ten years under majority Arab rule. Zionist leaders viewed the White Paper as a catastrophic betrayal at the very moment European Jewry faced annihilation.
      </div>

      <!-- Key Figure Box: Arthur Balfour -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1848–1930</span>
        </div>
        <div class="kf-identity-row">
          ${cardBalfour ? `<img src="${cardBalfour}" class="kf-portrait" alt="Arthur Balfour">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Arthur Balfour</h4>
            <div class="kf-role">British Foreign Secretary (1916–1919)</div>
          </div>
        </div>
        <div class="kf-significance">
          Authored the 1917 Balfour Declaration, transforming Zionism from a fringe political movement into a legally recognized international project.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Secured Imperial Cabinet Support:</strong> Persuaded Lloyd George's War Cabinet to issue a formal British pledge for a Jewish national home.</li>
          <li><strong>Drafted Ambiguous Safeguards:</strong> Inserted protective clauses for existing non-Jewish communities while deliberately refusing to define the borders or governance of the proposed homeland.</li>
          <li><strong>Institutionalised the Mandate:</strong> Championed the incorporation of the Balfour Declaration into the 1922 League of Nations Mandate.</li>
        </ul>
      </div>

      <!-- Concept Spotlight: The Balfour Formula -->
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL CONCEPT</span>
          <span class="csb-category">DIPLOMATIC AMBIGUITY</span>
        </div>
        <h4 class="csb-title">The Balfour Formula: 'National Home' vs 'State'</h4>
        <div class="csb-body">
          Arthur Balfour and Lloyd George's War Cabinet deliberately selected the unprecedented phrase 'a national home for the Jewish people' rather than 'a Jewish state'. This calculated ambiguity was designed to avoid alarming non-Zionist British Jews and Palestinian Arabs while rallying Jewish wartime support in America and Russia. Simultaneously, it protected British imperial control over the approaches to the Suez Canal. It created an irreconcilable diplomatic contradiction that bedevilled the British administration for thirty years.
        </div>
        <div class="csb-takeaway">
          <strong>Exam Distinction:</strong> 'National Home' offered cultural and spiritual refuge without explicitly guaranteeing sovereign statehood or defined territorial boundaries.
        </div>
      </div>

      <!-- Archival Dispatch: War Cabinet Minutes -->
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">War Cabinet Record</span>
          </div>
          <span class="source-date-micro">31 October 1917</span>
        </div>
        <div class="archival-title">Balfour Defends the Formula to the War Cabinet</div>
        <div class="archival-body">
          "The vast majority of Jews in Russia and America appear to be favourably disposed to Zionism... If we could make a declaration favourable to such an ideal, we should be able to carry out extremely useful propaganda in both countries. Furthermore, it establishes a strategic buffer adjacent to the vital maritime corridor of the Suez Canal."
        </div>
        <div class="archival-footer">
          <span>British War Cabinet Minutes (CAB/23/4)</span>
          <span>10 Downing Street, 31 October 1917</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Enquiry Check & Discussion -->
    <div class="bottom-enquiry-box">
      <div class="beb-header">
        <span class="beb-title">KEY ENQUIRY CHECK &bull; IMPERIAL ORIGINS &amp; CONFLICTING PLEDGES</span>
        <span class="beb-badge">CHECK YOUR UNDERSTANDING</span>
      </div>
      <div class="beb-grid">
        <div class="beb-col">
          <strong>1. Contradictory Pledges:</strong>
          Explain why Arab leaders viewed the McMahon-Hussein letters and the Sykes-Picot Agreement as proof of British duplicity.
        </div>
        <div class="beb-col">
          <strong>2. Imperial Strategy:</strong>
          Why did British strategic interests in the Suez Canal lead Lloyd George's cabinet to endorse the Balfour Declaration in 1917?
        </div>
        <div class="beb-col">
          <strong>3. Evaluative Hinge:</strong>
          Why did the 1939 British White Paper anger both Zionists and Palestinian Arab nationalists simultaneously?
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 3 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 4: KT 1.2 COLLAPSE OF THE MANDATE & INSURGENCY (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 1.2</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 1.2</span>
        <span class="spec-ref-badge">MANDATE COLLAPSE &bull; 1945–1947</span>
      </div>
      <h1 class="lesson-title">
        The Collapse of the British Mandate &amp; Jewish Insurgency
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> Conflicting interests after World War Two; Jewish insurgency (Irgun and Lehi); the bombing of the King David Hotel (July 1946); British economic and military exhaustion; the SS Exodus affair (1947); and UNSCOP recommendations.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">Post-WWII Crisis &amp; The Jewish Insurgency</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.1]</span>
        In 1945, the revelation of the Nazi Holocaust, in which six million European Jews were systematically murdered, electrified global opinion. Over 250,000 Jewish survivors languished in Displaced Persons (DP) camps across Germany and Austria, desperate to emigrate to Palestine. However, Britain's new Labour Foreign Secretary, <strong>Ernest Bevin</strong>, stubbornly enforced the 1939 White Paper's quota of just 1,500 immigrants per month, fearing that opening the floodgates would alienate Arab states and jeopardize Middle Eastern oil supplies.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.2]</span>
        Outraged by Bevin's policy, the three Jewish underground militias in Palestine united under the <strong>United Resistance Movement</strong>. While the mainstream <strong>Haganah</strong> focused on organizing illegal immigrant blockade-runners (Aliyah Bet) and sabotaging British radar stations, radical right-wing paramilitary groups—the <strong>Irgun</strong> (led by Menachem Begin) and the <strong>Lehi</strong> (Stern Gang)—launched an aggressive urban guerilla insurgency targeting British soldiers, police officers, and infrastructure.
      </div>

      <div class="section-banner">
        <span class="section-title">The King David Hotel Bombing (July 1946)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.3]</span>
        On 22 July 1946, the Irgun struck the heart of the British administration. Disguised as Arab milkmen, Irgun operatives smuggled 350 kilograms of TNT inside milk churns into the basement of the <strong>King David Hotel</strong> in Jerusalem, which housed the British Military Headquarters and Secretariat. The resulting massive explosion demolished the entire southern wing of the six-story stone building, killing 91 people: 28 Britons, 41 Arabs, 17 Jews, and 5 others.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.4]</span>
        The bombing shocked the British public and government. British authorities declared martial law, imposed severe curfews, and enclosed government buildings inside barbed-wire security compounds nicknamed 'Bevingrad.' Over 20,000 British soldiers conducted house-to-house sweeps in Tel Aviv and Jerusalem, detaining thousands of suspects. Yet rather than deterring the insurgents, the harsh security crackdown intensified Jewish popular hostility toward British rule.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">22 July 1946</span>
        </div>
        <div class="archival-title">Ruins of the King David Hotel, Jerusalem</div>
        ${kingDavidRuins ? `<img src="${kingDavidRuins}" class="archival-image" style="width: 100%; height: auto; max-height: 155px; object-fit: contain; background: #fafaf9;" alt="King David Hotel Ruins">` : ''}
        <div class="archival-body">
          Rescue workers and British soldiers search the rubble of the southwest wing of the King David Hotel after 350 kg of TNT detonated, killing 91 British, Arab, and Jewish civil servants and soldiers.
        </div>
        <div class="archival-footer">
          <span>Palestine Police Photographic Section</span>
          <span>Jerusalem Incident Archive (22 July 1946)</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Acre Prison Breakout &amp; The Sergeants Affair (1947)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.5]</span>
        On 4 May 1947, the Irgun executed one of the most audacious insurgent operations of the Mandate era: the <strong>Acre Prison Break</strong>. Disguised as British Royal Engineers, Irgun commandos used explosive gelignite to blow a massive breach through the historic walls of the Crusader fortress at Acre. Amid heavy machine-gun fire and diversionary mortar barrages, 27 Irgun and Lehi commanders escaped, while 214 Arab prisoners also broke out amidst the pandemonium.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.6]</span>
        The British responded with severe military justice, sentencing three captured Irgun operatives—Avshalom Haviv, Meir Nakar, and Yaakov Weiss—to death by hanging. In July 1947, when British authorities executed the three men at Acre, the Irgun carried out its threat of immediate retaliation. Operatives abducted two young British Army Intelligence Corps NCOs, <strong>Sergeants Clifford Martin and Mervyn Paice</strong>, and hanged them in an orange grove near Netanya. When British troops discovered the hanging bodies, a hidden anti-personnel mine detonated, severely wounding a British captain. The <strong>Sergeants Affair</strong> provoked anti-Jewish riots across British cities and destroyed British domestic tolerance for remaining in Palestine.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">July 1947</span>
        </div>
        <div class="archival-title">The Sergeants Affair: Bodies Found Near Netanya</div>
        ${sergeantsPhoto ? `<img src="${sergeantsPhoto}" class="archival-image" style="width: 100%; height: auto; max-height: 180px; object-fit: contain; background: transparent;" alt="The Sergeants Affair">` : ''}
        <div class="archival-body">
          British military intelligence discovered the booby-trapped bodies of British Sergeants Clifford Martin and Mervyn Paice hanged in an orange grove by the Irgun, triggering anti-Jewish riots across British cities.
        </div>
        <div class="archival-footer">
          <span>British War Office Archives</span>
          <span>July 1947</span>
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 4 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 5: KT 1.2 COLLAPSE OF THE MANDATE & INSURGENCY (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 1: THE CREATION OF ISRAEL, 1945–1956</strong></span>
      <span>ENQUIRY: COLLAPSE OF THE MANDATE &amp; INSURGENCY</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The SS Exodus Affair &amp; British Exhaustion</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.7]</span>
        In July 1947, the aging American riverboat <strong>SS Exodus 1947</strong>, packed with 4,514 Holocaust survivors including 655 children, approached the coast of Palestine without immigration visas. Royal Navy destroyers rammed the vessel in international waters, boarded with tear gas and batons, and killed three passengers. Instead of placing the refugees in Mediterranean internment camps on Cyprus as was customary, Foreign Secretary Bevin decided to make a punitive example: he ordered the refugees shipped back to port of departure in France, and when they refused to disembark, forcibly deported them to British-occupied Germany.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.8]</span>
        The spectacle of British soldiers dragging emaciated Holocaust survivors back behind barbed wire in Hamburg triggered a global public relations catastrophe. American newspapers expressed intense outrage, and US President Harry S. Truman exerted severe diplomatic pressure. For a British economy crippled by war debt, rationing, and imperial overstretch, stationing 100,000 troops in Palestine at an annual cost of £40 million had become financially and politically intolerable.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">July 1947</span>
        </div>
        <div class="archival-title">The SS Exodus Arriving in Haifa under Naval Escort</div>
        ${exodusPhoto ? `<img src="${exodusPhoto}" class="archival-image" style="max-height: 140px;" alt="SS Exodus in Haifa">` : ''}
        <div class="archival-body">
          "The spectacle of Holocaust survivors being forced behind barbed wire by British bayonets in Germany destroyed Britain's moral standing and convinced the United Nations that the Mandate had to end."
        </div>
        <div class="archival-footer">
          <span>United Nations Special Committee on Palestine Archive</span>
          <span>Haifa Port, 18 July 1947</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">UN Referral &amp; The UNSCOP Inquiry</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.9]</span>
        By early 1947, Great Britain was gripped by acute economic crisis: severe fuel shortages during the brutal winter of 1946–47, bread rationing at home, and crushing war debts owed to the United States. Stationing 100,000 soldiers in Palestine cost £40 million annually, drawing fierce parliamentary condemnation. Convinced that reconciling Zionist demands for statehood with Arab demands for independence was impossible without open military subjugation, Prime Minister <strong>Clement Attlee</strong> made the momentous decision in February 1947 to surrender Britain's imperial mandate and refer the entire question to the newly created <strong>United Nations</strong>.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.10]</span>
        The UN created the <strong>United Nations Special Committee on Palestine (UNSCOP)</strong>, composed of eleven neutral nations (including Sweden, Canada, and Guatemala) to guarantee impartiality. UNSCOP toured the country for five weeks, witnessed firsthand the violent interception of the SS Exodus in Haifa harbor, and conducted extensive interviews with Jewish Agency leaders David Ben-Gurion and Moshe Sharett. The Arab Higher Committee completely boycotted the inquiry, arguing that Palestine's indigenous Arab majority possessed an inherent democratic right to self-determination and that European crimes against Jews could not justly be compensated with Arab ancestral land. In August 1947, UNSCOP published its report: a unanimous recommendation to terminate the British Mandate, and a majority recommendation (7 to 3) to partition Palestine into independent Arab and Jewish states with international trusteeship over Jerusalem. In September, Britain announced it would reject enforcing any partition opposed by either party, setting a rigid, unilateral evacuation deadline of 15 May 1948.
      </div>

      <!-- Key Figure Box: Clement Attlee -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1883–1967</span>
        </div>
        <div class="kf-identity-row">
          ${cardAttlee ? `<img src="${cardAttlee}" class="kf-portrait" alt="Clement Attlee">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Clement Attlee</h4>
            <div class="kf-role">British Prime Minister (1945–1951)</div>
          </div>
        </div>
        <div class="kf-significance">
          Labour Prime Minister who ended the British Mandate in Palestine, prioritizing domestic reconstruction over costly imperial policing.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Referred Mandate to the UN:</strong> Recognized in February 1947 that Britain could not satisfy both Jewish and Arab demands without unsustainable military force.</li>
          <li><strong>Set Hard Evacuation Deadline:</strong> Refused to enforce UN Partition, setting a rigid withdrawal date of 15 May 1948 to minimize British casualties.</li>
          <li><strong>Withdrew 100,000 British Troops:</strong> Ended British financial drainage (£40M/year) amidst post-war rationing and economic austerity.</li>
        </ul>
      </div>

      <!-- Concept Spotlight: The Economic Drain -->
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL MECHANISM</span>
          <span class="csb-category">IMPERIAL EXHAUSTION</span>
        </div>
        <h4 class="csb-title">The Economic Drain: 100,000 British Troops &amp; Post-War Austerity</h4>
        <div class="csb-body">
          By early 1947, Great Britain was gripped by severe economic strain: devastating coal shortages during the freeze of 1946–47, strict bread rationing at home, and heavy war debts owed to Washington. Deploying 100,000 soldiers in Palestine cost £40 million annually (£1.8 billion today). Clement Attlee's Cabinet realized Britain could no longer sustain costly imperial policing while constructing the National Health Service and Welfare State at home.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Domestic economic exhaustion—not military collapse—forced Britain's historic decision to hand the Palestine Mandate to the United Nations.
        </div>
      </div>

      <!-- Archival Dispatch: Bevin's UN Referral -->
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Parliamentary Statement</span>
          </div>
          <span class="source-date-micro">25 February 1947</span>
        </div>
        <div class="archival-title">Ernest Bevin Announces Referral to the UN</div>
        <div class="archival-body">
          "His Majesty's Government have been faced with an irreconcilable conflict of principles. We have decided that we are unable to accept the scheme put forward by either the Arabs or the Jews... and we have resolved to refer the whole problem to the United Nations. We are not going to the United Nations to ask for their advice; we are setting the problem before them so that they may settle it, as Britain can no longer bear this unilateral burden alone."
        </div>
        <div class="archival-footer">
          <span>Hansard Parliamentary Debates</span>
          <span>House of Commons, 25 February 1947</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Enquiry Check & Discussion -->
    <div class="bottom-enquiry-box">
      <div class="beb-header">
        <span class="beb-title">KEY ENQUIRY CHECK &bull; COLLAPSE OF THE MANDATE &amp; INSURGENCY</span>
        <span class="beb-badge">CHECK YOUR UNDERSTANDING</span>
      </div>
      <div class="beb-grid">
        <div class="beb-col">
          <strong>1. Insurgency Impact:</strong>
          How did the combination of the King David Hotel bombing and the Sergeants Affair make British military occupation untenable?
        </div>
        <div class="beb-col">
          <strong>2. International Outcry:</strong>
          Explain why the interception and forced deportation of the SS Exodus refugees destroyed Britain's international standing.
        </div>
        <div class="beb-col">
          <strong>3. Evaluative Hinge:</strong>
          Why did Clement Attlee's government decide to surrender the Palestine Mandate to the UN rather than enforce a compromise?
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 5 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 6: KT 1.3 UN RESOLUTION 181 & THE 1948–49 WAR (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 1.3</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 1.3</span>
        <span class="spec-ref-badge">PARTITION &amp; WAR &bull; 1947–1949</span>
      </div>
      <h1 class="lesson-title">
        UN Resolution 181 &amp; The 1948–49 Arab-Israeli War
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> UN Resolution 181 (Partition Plan, November 1947); outbreak of civil war; the British evacuation; David Ben-Gurion’s declaration of Israel (14 May 1948); invasion by five Arab armies; the UN truces; and the 1949 Armistice Agreements (Green Line).
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">UN Resolution 181 &amp; The Outbreak of Civil War</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.1]</span>
        On 29 November 1947, the UN General Assembly voted 33 to 13 (with 10 abstentions, including Great Britain) to adopt <strong>Resolution 181</strong>, partitioning Palestine into two independent states. The proposed Jewish state received 56% of the territory—including the fertile coastal plain, the eastern Galilee, and the arid Negev Desert—even though Jews constituted roughly 33% of the total population and owned approximately 7% of the land. The proposed Arab state received 43% of the land, while Jerusalem and Bethlehem were designated a <em>Corpus Separatum</em> under UN international administration.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.2]</span>
        Jewish leaders, headed by David Ben-Gurion, accepted partition as an indispensable international recognition of statehood, despite misgivings over borders. Arab leaders and the Arab Higher Committee rejected it outright, condemning it as an illegitimate imposition that violated self-determination. The day after the vote, violence erupted as Arab snipers ambushed Jewish buses near Petah Tikva, igniting a vicious six-month <strong>civil war</strong>. Both sides fought for control of roads and strategic villages, while British forces passively withdrew to coastal enclaves. In April 1948, the Haganah launched <strong>Plan Dalet</strong>, an offensive aimed at securing supply corridors to besieged Jewish Jerusalem.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Historical Map</span>
          </div>
          <span class="source-date-micro">November 1947</span>
        </div>
        <div class="archival-title">The UN Partition Plan (Resolution 181)</div>
        ${partitionMap ? `<img src="${partitionMap}" class="archival-map-image" alt="UN Partition Plan 1947">` : ''}
        <div class="archival-body">
          "Independent Arab and Jewish States and the Special International Regime for the City of Jerusalem shall come into existence two months after evacuation of the armed forces of the mandatory Power."
        </div>
        <div class="archival-footer">
          <span>United Nations General Assembly</span>
          <span>Resolution 181 (II), 29 November 1947</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Declaration of Independence &amp; Arab Invasion</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.3]</span>
        On Friday afternoon, 14 May 1948, hours before the British Mandate officially expired at midnight, David Ben-Gurion read the <strong>Declaration of the Establishment of the State of Israel</strong> at the Tel Aviv Museum of Art. Within hours, US President Harry Truman granted de facto recognition, followed swiftly by the Soviet Union.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.4]</span>
        On the morning of 15 May 1948, regular military forces from five Arab states—<strong>Egypt, Transjordan, Syria, Iraq, and Lebanon</strong>—invaded Palestine. The Arab League declared their goal was to liberate Palestine and establish a unitary Arab state. In the initial weeks, the Arab forces held substantial superiority in heavy artillery, armored vehicles, and airpower. Egyptian columns advanced within 20 miles of Tel Aviv, while the British-officered Arab Legion of Transjordan seized East Jerusalem, driving Jewish defenders from the Old City.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Military Campaign Map</span>
          </div>
          <span class="source-date-micro">May–October 1948</span>
        </div>
        <div class="archival-title">The 1948 Arab Invasions &amp; Frontline Offensives</div>
        ${arabInvasionMap ? `<img src="${arabInvasionMap}" class="archival-map-image" alt="1948 Arab Invasions">` : ''}
        <div class="archival-body">
          Coordinated five-nation Arab offensive launched on 15 May 1948, showing axes of advance across northern Galilee, central Jerusalem, and southern coastal approaches towards Tel Aviv.
        </div>
        <div class="archival-footer">
          <span>IDF Historical Branch Records</span>
          <span>1948 War Archive</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Specification Terminology & Concepts -->
    <div class="bottom-vocab-box">
      <div class="bvb-header">
        <span class="bvb-title">KEY SPECIFICATION TERMINOLOGY &amp; CONCEPTS</span>
        <span class="bvb-badge">DISCIPLINARY VOCABULARY</span>
      </div>
      <div class="bvb-grid">
        <div class="bvb-col">
          <strong>UN Resolution 181 (1947):</strong>
          UN General Assembly partition plan allocating 56% of Mandatory Palestine to create an independent Jewish state.
        </div>
        <div class="bvb-col">
          <strong>Haganah &amp; The IDF:</strong>
          The primary Jewish defense militia, officially consolidated into the national Israel Defense Forces on 26 May 1948.
        </div>
        <div class="bvb-col">
          <strong>The Green Line (1949):</strong>
          Armistice demarcation boundaries signed on Rhodes, leaving Israel in control of 78% of the former British Mandate.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 6 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 7: KT 1.3 UN RESOLUTION 181 & THE 1948–49 WAR (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 1: THE CREATION OF ISRAEL, 1945–1956</strong></span>
      <span>ENQUIRY: UN RESOLUTION 181 &amp; THE 1948–49 WAR</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The First UN Truce &amp; The Czech Arms Resupply</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.5]</span>
        The turning point came during the <strong>First UN Truce (11 June – 8 July 1948)</strong>, negotiated by UN mediator Count Folke Bernadotte. While both sides were theoretically barred from importing weapons or reinforcements, Israel exploited the four-week lull with extraordinary efficiency. Jewish agents finalized a secret weapons pipeline with <strong>Czechoslovakia</strong> (authorized by Stalin), secretly airlifting tens of thousands of Mauser rifles, machine guns, artillery, and 25 Avia S-199 fighter aircraft into Israel (Operation Balak).
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.6]</span>
        Israel reorganized its competing underground militias into a single, disciplined national military: the <strong>Israel Defense Forces (IDF)</strong>. To eliminate rival commands, Prime Minister David Ben-Gurion ruthlessly enforced state authority. When the Irgun attempted to land an independent cargo of heavy weaponry aboard the transport ship <em>Altalena</em> on Tel Aviv beach in June 1948, Ben-Gurion ordered the IDF to shell the vessel, killing sixteen Irgun fighters and forcing Menachem Begin to disband his forces completely. Israeli troop numbers surged from 30,000 in May to 65,000 by July and over 100,000 by December. In contrast, the five invading Arab armies were crippled by severe political rivalries, non-existent communication, and mutual distrust between King Abdullah of Jordan and the Egyptian monarchy.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">14 May 1948</span>
        </div>
        <div class="archival-title">David Ben-Gurion Proclaims the State of Israel</div>
        ${bengurionDec ? `<img src="${bengurionDec}" class="archival-image" style="max-height: 135px;" alt="Ben-Gurion Declaration">` : ''}
        <div class="archival-body">
          "We hereby declare the establishment of a Jewish state in Eretz-Israel, to be known as the State of Israel." Proclamation read at the Tel Aviv Museum beneath Theodor Herzl's portrait on 14 May 1948.
        </div>
        <div class="archival-footer">
          <span>Israel Government Press Office (GPO)</span>
          <span>Independence Hall, Tel Aviv (14 May 1948)</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">IDF Counter-Offensives &amp; The 1949 Armistice</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.7]</span>
        When fighting resumed during the 'Ten Days' of July 1948, the reinforced IDF launched sweeping counter-offensives. Operation Dani captured Lydda and Ramle; Operation Yoav broke the Egyptian blockade of the Negev; and Operation Hiram cleared northern Galilee. In September 1948, Jewish extremist paramilitaries from the <strong>Lehi (Stern Gang)</strong> assassinated UN Mediator Count Folke Bernadotte in Jerusalem after he proposed revising the partition borders and repatriating Arab refugees. The murder shocked world opinion and prompted Ben-Gurion to outlaw Lehi permanently. American diplomat <strong>Ralph Bunche</strong> stepped in to lead the United Nations peace mission.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.8]</span>
        Between February and July 1949, Bunche presided over protracted bilateral negotiations on the Greek island of Rhodes, resulting in separate <strong>Armistice Agreements</strong> between Israel and Egypt, Lebanon, Jordan, and Syria. The resulting ceasefire boundaries, universally known as the <strong>Green Line</strong>, left Israel in control of 78% of Mandatory Palestine—nearly a third more territory than proposed under UN Resolution 181. Transjordan occupied and subsequently annexed the West Bank and East Jerusalem, while Egypt retained military administration of the Gaza Strip. Crucially, Arab states refused to sign permanent peace treaties or recognize Israel's legal sovereignty, ensuring the border remained a volatile military frontline.
      </div>

      <!-- Key Figure Box: David Ben-Gurion -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1886–1973</span>
        </div>
        <div class="kf-identity-row">
          ${cardBenGurion ? `<img src="${cardBenGurion}" class="kf-portrait" alt="David Ben-Gurion">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">David Ben-Gurion</h4>
            <div class="kf-role">First Prime Minister of Israel (1948–1963)</div>
          </div>
        </div>
        <div class="kf-significance">
          Founding father of the State of Israel who proclaimed independence and unified underground militias into the IDF during the 1948 War.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Proclaimed Independence:</strong> Declared the State of Israel on 14 May 1948 despite intense US State Department pressure to delay.</li>
          <li><strong>Created Unified Military (IDF):</strong> Disbanded underground paramilitaries (Irgun, Lehi, Palmach) into a single national army, ordering the shelling of the Irgun arms ship <em>Altalena</em>.</li>
          <li><strong>Secured Czech Arms Pipeline:</strong> Authorized emergency funding for Czechoslovakian aircraft and rifles during the critical first UN truce.</li>
        </ul>
      </div>

      <!-- Concept Spotlight: The Altalena Affair -->
      <div class="concept-spotlight-box compact">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL CRISIS</span>
          <span class="csb-category">STATE SOVEREIGNTY &bull; JUNE 1948</span>
        </div>
        <div class="csb-title">The Altalena Affair: Enforcing the State's Monopoly on Force</div>
        <div class="csb-body">
          When the Irgun attempted to land arms aboard the transport ship <em>Altalena</em> on Tel Aviv beach during the first truce, Ben-Gurion ordered the newly formed IDF to shell the vessel. Sixteen Irgun fighters died, but Ben-Gurion decisively established that no independent private militias would be tolerated within the new sovereign state.
        </div>
        <div class="csb-takeaway">
          <strong>Key Significance:</strong> Established undisputed civilian authority over the armed forces, preventing civil war.
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Enquiry Check & Discussion -->
    <div class="bottom-enquiry-box">
      <div class="beb-header">
        <span class="beb-title">KEY ENQUIRY CHECK &bull; THE 1948–49 WAR &amp; ARMISTICE</span>
        <span class="beb-badge">CHECK YOUR UNDERSTANDING</span>
      </div>
      <div class="beb-grid">
        <div class="beb-col">
          <strong>1. Turning Point Truce:</strong>
          How did the secret Czechoslovakian arms airlift during the First UN Truce transform the IDF's military balance?
        </div>
        <div class="beb-col">
          <strong>2. Arab Disunity:</strong>
          Why were the five invading Arab armies unable to coordinate an effective joint military offensive against Israel?
        </div>
        <div class="beb-col">
          <strong>3. Evaluative Hinge:</strong>
          Why did the 1949 Green Line armistice fail to produce lasting peace treaties between Israel and its Arab neighbours?
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 7 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 8: KT 1.4 PALESTINIAN REFUGEE CRISIS & GREEN LINE (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 1.4</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 1.4</span>
        <span class="spec-ref-badge">AFTERMATH OF 1948 &bull; 1948–1954</span>
      </div>
      <h1 class="lesson-title">
        The Palestinian Refugee Crisis (Nakba) &amp; The Green Line
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> The Palestinian refugee problem (Nakba): causes, scale, and conditions in refugee camps; UN Resolution 194; the establishment of UNRWA; the 1949 Armistice Agreements (Green Line); and Israel’s Law of Return.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The 1948 Palestinian Exodus (The Nakba)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.1]</span>
        During the 1948–49 War, between 700,000 and 750,000 Palestinian Arabs—over 80% of the Arab population living within what became the borders of Israel—fled or were expelled from their towns and villages. Palestinians refer to this catastrophe as the <strong>Nakba</strong>. Over 400 Arab villages were depopulated, abandoned, and subsequently demolished or re-inhabited by incoming Jewish immigrants.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.2]</span>
        Historians identify multiple, interrelated causes for the flight. In the early phases, the collapse of Palestinian urban leadership and the flight of wealthy elites created widespread panic among poorer villagers. Panic turned to terror following the massacre of over 100 Arab villagers at <strong>Deir Yassin</strong> by Irgun and Lehi fighters in April 1948, reports of which were amplified by Arab radio broadcasts to rally resistance, but instead accelerated civilian flight. In later phases, the IDF carried out deliberate expulsions under Plan Dalet to secure military axes, most notably the forced expulsion of 50,000 residents from Lydda and Ramle in July 1948.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">1948</span>
        </div>
        <div class="archival-title">Palestinian Refugees Fleeing Their Homes during the 1948 War</div>
        ${refugeesPhoto ? `<img src="${refugeesPhoto}" class="archival-image" alt="Palestinian Refugees 1948">` : ''}
        <div class="archival-body">
          Over 700,000 Palestinian refugees were displaced into camps in Gaza, the West Bank, Lebanon, Syria, and Jordan, transforming the demographic balance of the region.
        </div>
        <div class="archival-footer">
          <span>UNRWA Historical Archive</span>
          <span>1948 Nakba Record</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">Refugee Camps, UNRWA &amp; UN Resolution 194</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.3]</span>
        The displaced Palestinians fled into neighboring Arab regions: approximately 280,000 to the West Bank, 200,000 to the Gaza Strip, 100,000 to Lebanon, 75,000 to Syria, and 70,000 to Transjordan. The vast majority ended up in squalid, overcrowded tent cities. In December 1948, the UN passed <strong>Resolution 194</strong>, resolving that refugees wishing to return to their homes and live at peace should be permitted to do so at the earliest practicable date, and compensation should be paid for lost property.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.4]</span>
        Israel adamantly refused the return of refugees, arguing that repatriating hundreds of thousands of hostile Arabs would constitute national suicide and that Arab states bore responsibility for invading. In December 1949, the UN created the <strong>United Nations Relief and Works Agency (UNRWA)</strong> to provide basic food rations, healthcare, and education to the refugees. Except for Jordan, which granted citizenship, Arab host states refused to integrate refugees permanently, insisting they maintain refugee status to preserve their collective right of return.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">1949–1950</span>
        </div>
        <div class="archival-title">Displaced Families at an UNRWA Tent Camp</div>
        ${gazaRefugees ? `<img src="${gazaRefugees}" class="archival-image" alt="UNRWA Refugee Camp">` : ''}
        <div class="archival-body">
          Makeshift canvas tents in an emergency UNRWA refugee camp. Over 700,000 Palestinians faced severe overcrowding, winter storms, and reliance on emergency food rations across Gaza and the West Bank.
        </div>
        <div class="archival-footer">
          <span>UNRWA Photographic Archive</span>
          <span>Refugee Relief Record, 1949–1950</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Specification Terminology & Concepts -->
    <div class="bottom-vocab-box">
      <div class="bvb-header">
        <span class="bvb-title">KEY SPECIFICATION TERMINOLOGY &amp; CONCEPTS</span>
        <span class="bvb-badge">DISCIPLINARY VOCABULARY</span>
      </div>
      <div class="bvb-grid">
        <div class="bvb-col">
          <strong>The Nakba (Catastrophe):</strong>
          The expulsion and flight of over 700,000 Palestinian Arabs from their ancestral homes during the 1948 War.
        </div>
        <div class="bvb-col">
          <strong>Law of Return (1950):</strong>
          Fundamental Israeli legislation granting every Jewish individual worldwide the legal right to immigrate and gain citizenship.
        </div>
        <div class="bvb-col">
          <strong>Fedayeen Guerrillas:</strong>
          Palestinian nationalist irregulars conducting armed infiltration, sabotage, and mine raids across the armistice frontiers.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 8 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 9: KT 1.4 PALESTINIAN REFUGEE CRISIS & GREEN LINE (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 1: THE CREATION OF ISRAEL, 1945–1956</strong></span>
      <span>ENQUIRY: REFUGEES, GREEN LINE &amp; STATE CONSOLIDATION</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The 1949 Armistice Borders &amp; Infiltration</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.5]</span>
        The bilateral armistice lines negotiated at Rhodes were drawn with green pencil on military maps, becoming universally known as the <strong>Green Line</strong>. Crucially, Arab delegates insisted that these demarcations were solely temporary military ceasefire boundaries rather than permanent international borders, as they refused to confer de jure recognition upon Israel. Israel, in turn, treated the Green Line as its provisional sovereign frontier, fortifying border outposts.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.6]</span>
        The Green Line created severe friction on the ground. Villages were severed from their farming lands, wells, and ancestral cemeteries. In the early 1950s, thousands of destitute Palestinian refugees crossed the armistice lines back into Israel. While most were unarmed peasants seeking to harvest crops or retrieve belongings, armed Palestinian militants—known as <strong>fedayeen</strong> ('self-sacrificers')—carried out sabotage and guerrilla attacks against Israeli border settlements. Israel responded with an aggressive reprisal policy: for every attack, the IDF launched punitive, cross-border strikes against host villages, creating a continuous cycle of border escalation.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Historical Map</span>
          </div>
          <span class="source-date-micro">1949 Armistice</span>
        </div>
        <div class="archival-title">The 1949 Armistice Agreements &amp; The Green Line</div>
        ${palestine1949Map ? `<img src="${palestine1949Map}" class="archival-map-image" style="max-height: 140px;" alt="1949 Armistice Map">` : ''}
        <div class="archival-body">
          "The 1949 Armistice Lines (Green Line) expanded Israel's territory to 78% of Mandatory Palestine. The West Bank was incorporated into Jordan, while the Gaza Strip fell under Egyptian military administration."
        </div>
        <div class="archival-footer">
          <span>United Nations Armistice Commission</span>
          <span>Rhodes Agreements Record (1949)</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Law of Return &amp; Mass Jewish Ingathering</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.7]</span>
        While adamantly refusing the repatriation of Palestinian Arab refugees, the Israeli Knesset enacted the foundational <strong>Law of Return (5 July 1950)</strong>. The landmark statute declared that every Jewish person across the global diaspora possessed an inalienable, ancestral right to immigrate to Israel and claim immediate, automatic citizenship. Over the subsequent four years, Israel's Jewish population more than doubled, soaring from approximately 650,000 in May 1948 to over 1.5 million by 1953.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.8]</span>
        This demographic transformation occurred through two major waves: first, approximately 300,000 European Holocaust survivors from DP camps; second, over 600,000 <strong>Mizrahi Jews</strong> fleeing rising persecution, anti-Zionist riots, and state-sponsored expulsions across the Arab world (including ancient Jewish communities in Iraq, Yemen, Morocco, Libya, and Egypt). To absorb the massive influx, Israel established emergency transit camps (<em>ma'abarot</em>) of tin huts and canvas tents, gradually building new development towns along vulnerable frontiers. This mass ingathering cemented Israel's Jewish demographic majority but deepened the bitter rift with the Arab world, where Palestinians saw Jewish immigrants occupying their requisitioned ancestral homes.
      </div>

      <!-- Key Figure Box: King Hussein -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1935–1999</span>
        </div>
        <div class="kf-identity-row">
          ${cardHussein ? `<img src="${cardHussein}" class="kf-portrait" alt="King Hussein of Jordan">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">King Hussein of Jordan</h4>
            <div class="kf-role">King of Jordan (1952–1999)</div>
          </div>
        </div>
        <div class="kf-significance">
          Monarch who ruled Jordan and the annexed West Bank, managing the largest population of Palestinian refugees in the Middle East.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Integrated Palestinian Refugees:</strong> Granted full Jordanian citizenship to hundreds of thousands of displaced Palestinians across the West Bank and East Bank.</li>
          <li><strong>Maintained Custodianship of Holy Sites:</strong> Preserved Jordan's historic custodianship over Muslim and Christian holy places in Jerusalem (Haram al-Sharif / Temple Mount).</li>
          <li><strong>Managed Border Clashes:</strong> Struggled to control cross-border fedayeen raids while facing massive Israeli military reprisal strikes (such as Qibya in 1953 and Samu in 1966).</li>
        </ul>
      </div>

      <!-- Concept Spotlight: UNRWA and Refugee Camps -->
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL REALITY</span>
          <span class="csb-category">DISPLACEMENT &amp; SETTLEMENT</span>
        </div>
        <h4 class="csb-title">UNRWA &amp; The Refugee Camps: From Canvas to Concrete</h4>
        <div class="csb-body">
          Established by UN Resolution 302 in December 1949, UNRWA provided emergency shelter, healthcare, and food rations to over 700,000 displaced Palestinians. What were intended as temporary tent encampments gradually hardened into permanent concrete cinderblock townships across Gaza, the West Bank, Jordan, Syria, and Lebanon. Host nations, except Jordan, denied full citizenship to keep the collective 'Right of Return' alive, cementing generations of Palestinians in stateless refugee camps.
        </div>
        <div class="csb-takeaway">
          <strong>Disciplinary Insight:</strong> Camp permanence institutionalized the refugee crisis as the enduring moral and territorial core of the conflict.
        </div>
      </div>

      <!-- Archival Dispatch: Law of Return 1950 -->
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Legislative Enactment</span>
          </div>
          <span class="source-date-micro">5 July 1950</span>
        </div>
        <div class="archival-title">The Law of Return Enacted by the Israeli Knesset</div>
        <div class="archival-body">
          "Every Jew has the right to come to this country as an oleh (immigrant)... An immigrant's visa shall be granted to every Jew who has expressed his desire to settle in Israel, unless the Minister of Immigration is satisfied that the applicant is acting against the Jewish people." Enacted on 5 July 1950, doubling Israel's Jewish population within three years.
        </div>
        <div class="archival-footer">
          <span>Knesset Parliamentary Records</span>
          <span>Laws of the State of Israel (Vol. 4, 1950)</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Enquiry Check & Discussion -->
    <div class="bottom-enquiry-box">
      <div class="beb-header">
        <span class="beb-title">KEY ENQUIRY CHECK &bull; REFUGEES, GREEN LINE &amp; STATE CONSOLIDATION</span>
        <span class="beb-badge">CHECK YOUR UNDERSTANDING</span>
      </div>
      <div class="beb-grid">
        <div class="beb-col">
          <strong>1. The Nakba:</strong>
          Explain the primary factors (military offensives, panic, psychological warfare) that caused over 700,000 Palestinians to become refugees.
        </div>
        <div class="beb-col">
          <strong>2. Demographics &amp; Return:</strong>
          How did the 1950 Law of Return and Mizrahi immigration fundamentally alter Israel's demographic security?
        </div>
        <div class="beb-col">
          <strong>3. Evaluative Hinge:</strong>
          Why did the Green Line border become an unstable battleground of fedayeen raids and IDF reprisals rather than a peaceful frontier?
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 9 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 10: KT 1.5 NASSER & THE 1956 SUEZ CRISIS (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 1.5</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 1.5</span>
        <span class="spec-ref-badge">SUPERPOWER CRISIS &bull; 1955–1963</span>
      </div>
      <h1 class="lesson-title">
        Increased Tension, Nasser, and the 1956 Suez Crisis
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> The rise of Gamal Abdel Nasser and Pan-Arabism; the 1955 Czech arms deal; the Aswan High Dam; nationalisation of the Suez Canal (July 1956); the secret Protocol of Sèvres; the Suez War; and the humiliating withdrawal of Britain and France.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Rise of Nasser &amp; The Czech Arms Deal (1955)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.1]</span>
        In July 1952, a group of nationalist Egyptian army officers called the <strong>Free Officers</strong> overthrew King Farouk in a bloodless coup. By 1954, <strong>Gamal Abdel Nasser</strong> emerged as President of Egypt. Charismatic and fiercely anti-colonial, Nasser championed <strong>Pan-Arabism</strong>—the belief that the Arab world should unite to throw off Western imperial domination and confront Israel. Nasser stepped up support for Palestinian fedayeen operating out of the Gaza Strip and blocked Israeli shipping through the <strong>Straits of Tiran</strong> (the entrance to the Gulf of Aqaba) and the Suez Canal.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.2]</span>
        In February 1955, after an Israeli reprisal raid in Gaza killed 38 Egyptian soldiers, Nasser sought modern weapons. Rebuffed by the United States, Nasser stunned the West in September 1955 by signing the <strong>Egyptian-Czech Arms Deal</strong>. In exchange for Egyptian cotton, the Soviet bloc supplied Egypt with 200 MiG-15 fighter jets, 300 tanks, and submarines. This shattered Western arms monopolies in the Middle East, shifted the military balance against Israel, and brought Cold War superpower rivalry directly into the region.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Archival Newspaper</span>
          </div>
          <span class="source-date-micro">27 July 1956</span>
        </div>
        <div class="archival-title">Al-Ahram Front Page: Suez Canal Nationalised</div>
        ${alAhramPhoto ? `<img src="${alAhramPhoto}" class="archival-image" alt="Al-Ahram Suez Nationalisation">` : ''}
        <div class="archival-body">
          "President Nasser announces from Alexandria: 'The Suez Canal Company has been nationalized in the name of the Egyptian nation! The canal was dug by Egyptian blood; its revenues belong to Egypt!'"
        </div>
        <div class="archival-footer">
          <span>Al-Ahram Daily (Cairo)</span>
          <span>Friday, 27 July 1956</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Aswan Dam &amp; Nationalisation of the Canal</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.3]</span>
        Nasser's flagship modernization project was the <strong>Aswan High Dam</strong>, intended to control the Nile's annual floods and generate hydroelectricity for Egyptian industrialization. In July 1956, angered by Nasser's recognition of Communist China and arms deals with Moscow, US Secretary of State John Foster Dulles abruptly cancelled $70 million in American funding, followed swiftly by Britain and the World Bank.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.4]</span>
        On 26 July 1956, in a dramatic radio speech in Alexandria, Nasser delivered a secret code-word: *de Lesseps* (the French engineer who built the canal). At that signal, Egyptian troops seized the headquarters of the Anglo-French <strong>Suez Canal Company</strong>. Nasser announced the canal was nationalized and that transit toll revenues would fund the construction of the Aswan Dam. While Arab populations celebrated wildly, British Prime Minister <strong>Anthony Eden</strong> viewed Nasser as an expansionist dictator—a "Mussolini on the Nile"—who threatened Britain's imperial oil route and prestige.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">November 1956</span>
        </div>
        <div class="archival-title">British Paratroopers &amp; Centurion Tanks at Port Said</div>
        ${portSaidPhoto ? `<img src="${portSaidPhoto}" class="archival-image" alt="British Troops at Port Said 1956">` : ''}
        <div class="archival-body">
          British paratroopers and Centurion tanks of the Royal Tank Regiment advance through the war-damaged streets of Port Said during Operation Musketeer, shortly before the UN-enforced ceasefire.
        </div>
        <div class="archival-footer">
          <span>Imperial War Museum Archive</span>
          <span>Suez Landings, Port Said (MH 31737)</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Specification Terminology & Concepts -->
    <div class="bottom-vocab-box">
      <div class="bvb-header">
        <span class="bvb-title">KEY SPECIFICATION TERMINOLOGY &amp; CONCEPTS</span>
        <span class="bvb-badge">DISCIPLINARY VOCABULARY</span>
      </div>
      <div class="bvb-grid">
        <div class="bvb-col">
          <strong>Canal Nationalisation:</strong>
          Nasser's seizure of the Anglo-French Suez Canal Company in July 1956 following Western cancellation of Aswan Dam loans.
        </div>
        <div class="bvb-col">
          <strong>Protocol of Sèvres:</strong>
          Secret tripartite collusion pact signed by Britain, France, and Israel in October 1956 to invade Egypt and depose Nasser.
        </div>
        <div class="bvb-col">
          <strong>UNEF Peacekeepers:</strong>
          The United Nations Emergency Force, deployed as a neutral buffer across Sinai to monitor the tripartite military withdrawal.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 10 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 11: KT 1.5 NASSER & THE 1956 SUEZ CRISIS (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 1: THE CREATION OF ISRAEL, 1945–1956</strong></span>
      <span>ENQUIRY: THE SUEZ CRISIS &amp; RETREAT OF EMPIRE</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Secret Protocol of Sèvres &amp; Military Operation</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.5]</span>
        Determined to overthrow Nasser, Britain and France held secret talks with Israel at a private villa in Sèvres, outside Paris, in October 1956. Together they concocted the <strong>Protocol of Sèvres</strong>: Israel would launch a surprise invasion across the Sinai Desert towards the Suez Canal; Britain and France would then pose as impartial peacekeepers, issuing an ultimatum demanding both Egypt and Israel withdraw 10 miles from the canal; when Nasser inevitably refused to evacuate his own territory, Anglo-French forces would intervene militarily to "separate the combatants" and seize the canal.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.6]</span>
        On 29 October 1956, Israel launched <strong>Operation Kadesh</strong>. Israeli paratroopers dropped near the Mitla Pass, while armored columns swept across Sinai, routing Egyptian garrisons and reaching the canal within 100 hours. On 30 October, London and Paris issued their pre-planned ultimatum. When Egypt rejected it, British and French bombers destroyed the Egyptian Air Force on the ground, and on 5 November, Allied paratroopers and marine commandos landed at <strong>Port Said</strong> (Operation Musketeer).
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Military Campaign Map</span>
          </div>
          <span class="source-date-micro">October–November 1956</span>
        </div>
        <div class="archival-title">Operation Kadesh &amp; The Anglo-French Assault on Port Said</div>
        ${suezCampaignMap ? `<img src="${suezCampaignMap}" class="archival-map-image" style="max-height: 140px;" alt="1956 Suez Campaign Map">` : ''}
        <div class="archival-body">
          Israeli forces seized the Sinai Peninsula in 100 hours while Anglo-French amphibious forces secured the northern entrance to the Suez Canal before international intervention forced a halt.
        </div>
        <div class="archival-footer">
          <span>War Office Historical Summary</span>
          <span>Port Said Operation Musketeer, 1956</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Superpower Ultimatum &amp; British Humiliation</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.7]</span>
        The military triumph was swiftly converted into an absolute diplomatic disaster. US President <strong>Dwight D. Eisenhower</strong> was furious that Britain and France had colluded behind his back on the eve of the US presidential election, distracting the world from the Soviet invasion of Hungary. Refusing to support the operation, Eisenhower threatened to destroy the British economy by blocking International Monetary Fund (IMF) loans and dumping US holdings of British sterling unless Allied forces immediately ceased fire. Soviet Premier Nikolai Bulganin went further, threatening rocket attacks on London and Paris.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.8]</span>
        Facing financial collapse, Eden ordered an immediate ceasefire on 6 November. By December, British and French troops made a humiliating withdrawal from Egypt, followed by Israeli withdrawal from Sinai in March 1957. The consequences were profound: Britain was stripped of its status as an independent global superpower; Anthony Eden resigned in disgrace in January 1957; the United Nations deployed its first peacekeeping force (<strong>UNEF</strong>) along the Egypt-Israel border; and Nasser, despite military defeat, emerged as an untouchable hero of anti-colonial resistance across the Arab world.
      </div>

      <!-- Key Figure Box: Anthony Eden -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1897–1977</span>
        </div>
        <div class="kf-identity-row">
          ${cardEden ? `<img src="${cardEden}" class="kf-portrait" alt="Anthony Eden">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Anthony Eden</h4>
            <div class="kf-role">British Prime Minister (1955–1957)</div>
          </div>
        </div>
        <div class="kf-significance">
          Prime Minister whose secret collusion in the 1956 Suez Crisis ended in international humiliation, shattering British imperial prestige.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Concluded Protocol of Sèvres:</strong> Authorized the secret tripartite plan with France and Israel to seize the Suez Canal and overthrow Nasser.</li>
          <li><strong>Miscalculated US Reaction:</strong> Erroneously assumed Eisenhower would remain neutral or support Britain against Soviet encroachment.</li>
          <li><strong>Resigned in Disgrace:</strong> Capitulated to US financial pressure, suffering total political collapse and resigning as Prime Minister in January 1957.</li>
        </ul>
      </div>

      <!-- Concept Spotlight: Protocol of Sevres -->
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL MECHANISM</span>
          <span class="csb-category">DIPLOMATIC COLLUSION</span>
        </div>
        <h4 class="csb-title">The Protocol of Sèvres: Collusion &amp; Imperial Rupture</h4>
        <div class="csb-body">
          Drafted in secrecy at a private villa outside Paris on 24 October 1956, the Protocol of Sèvres bound Britain, France, and Israel in an artificial conspiracy. Israel would attack Egypt; Britain and France would intervene as 'neutral peacekeepers' to separate the combatants and seize the canal. Prime Minister Anthony Eden ordered all British copies burned to hide the conspiracy, dreading international condemnation and legal prosecution under the UN Charter.
        </div>
        <div class="csb-takeaway">
          <strong>Exam Significance:</strong> Exposed the total collapse of 19th-century imperial gunboat diplomacy in a post-WWII world governed by superpowers and the UN.
        </div>
      </div>

      <!-- Archival Dispatch: Eisenhower's Financial Ultimatum -->
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Presidential Ultimatum</span>
          </div>
          <span class="source-date-micro">6 November 1956</span>
        </div>
        <div class="archival-title">President Eisenhower's Sterling Ultimatum to Eden</div>
        <div class="archival-body">
          President Dwight D. Eisenhower blocked IMF emergency loans and threatened to dump US holdings of the British pound sterling unless Eden ordered an immediate ceasefire in Egypt within 24 hours. Facing currency collapse with reserves plunging $50 million daily and unable to finance food and fuel imports, Downing Street was forced into an unconditional capitulation.
        </div>
        <div class="archival-footer">
          <span>US Department of State Diplomatic Files</span>
          <span>Foreign Relations of the United States (1956)</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Box: Key Enquiry Check & Discussion -->
    <div class="bottom-enquiry-box">
      <div class="beb-header">
        <span class="beb-title">KEY ENQUIRY CHECK &bull; THE SUEZ CRISIS &amp; RETREAT OF EMPIRE</span>
        <span class="beb-badge">CHECK YOUR UNDERSTANDING</span>
      </div>
      <div class="beb-grid">
        <div class="beb-col">
          <strong>1. Secret Collusion:</strong>
          Why did Britain, France, and Israel secretly draft the Protocol of Sèvres, and why was international deception necessary?
        </div>
        <div class="beb-col">
          <strong>2. Superpower Powerplay:</strong>
          How did US financial leverage (IMF loan blockage and run on sterling) force Anthony Eden to order a ceasefire within 48 hours?
        </div>
        <div class="beb-col">
          <strong>3. Evaluative Hinge:</strong>
          Why is the 1956 Suez Crisis regarded by historians as the definitive end of Britain's status as an independent global superpower?
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 11 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 12: MASTER BACK COVER (Chronology, Concepts & Exam Matrix)
       ==================================================================== -->
  <div class="textbook-page" style="padding: 2mm 2mm; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Specification Review</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">KEY TOPIC 1 SYNTHESIS</span>
        </div>
      </div>

      <!-- Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 5px 10px; background: #fff; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0 0 2px 0; font-weight: 900; color: #000;">
          KEY TOPIC 1: CHRONOLOGY &amp; DISCIPLINARY MASTERY (1915–1956)
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; line-height: 1.3;">
          Comprehensive revision index of foundational turning points, diplomatic agreements, and Edexcel examination question frameworks.
        </div>
      </div>

      <!-- Chronological Matrix Table -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <div style="background: #0f172a; color: #fff; padding: 4px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px;">
          Key Topic 1 Master Timeline &bull; Critical Chronological Sequence
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.32;">
          <tbody>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; width: 85px; white-space: nowrap;">1915–1916</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a; width: 140px;">McMahon-Hussein Letters</td>
              <td style="padding: 3.5px 8px; color: #334155;">Britain promises Sharif Hussein an independent Arab kingdom in exchange for an armed revolt against the Ottoman Empire.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">May 1916</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Sykes-Picot Agreement</td>
              <td style="padding: 3.5px 8px; color: #334155;">Secret Anglo-French deal partitioning the Middle East into British and French imperial spheres of influence.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">2 Nov 1917</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Balfour Declaration</td>
              <td style="padding: 3.5px 8px; color: #334155;">British Foreign Secretary pledges British support for a 'national home for the Jewish people' in Palestine.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">May 1939</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">British White Paper</td>
              <td style="padding: 3.5px 8px; color: #334155;">Caps Jewish immigration at 75,000 over 5 years and limits land sales, infuriating Zionists on the eve of the Holocaust.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">22 Jul 1946</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">King David Hotel Bombing</td>
              <td style="padding: 3.5px 8px; color: #334155;">Irgun detonates explosives in British HQ in Jerusalem, killing 91 administrative and military personnel.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Jul 1947</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">SS Exodus Affair</td>
              <td style="padding: 3.5px 8px; color: #334155;">Royal Navy intercepts 4,500 Holocaust survivors and ships them back to Germany, creating global public outcry against Britain.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">29 Nov 1947</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">UN Resolution 181</td>
              <td style="padding: 3.5px 8px; color: #334155;">UN General Assembly votes 33–13 to partition Palestine into Jewish and Arab states; immediate civil war breaks out.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">14 May 1948</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Creation of State of Israel</td>
              <td style="padding: 3.5px 8px; color: #334155;">David Ben-Gurion proclaims independence in Tel Aviv; British Mandate terminates at midnight.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">15 May 1948</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Invasion of Five Arab Armies</td>
              <td style="padding: 3.5px 8px; color: #334155;">Egypt, Transjordan, Syria, Iraq, and Lebanon invade; Israeli counter-offensives and Czech arms secure victory.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">1949</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Armistice Agreements (Green Line)</td>
              <td style="padding: 3.5px 8px; color: #334155;">Ceasefire lines leave Israel in control of 78% of Palestine; West Bank annexed by Jordan, Gaza held by Egypt.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">26 Jul 1956</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Nationalisation of Suez Canal</td>
              <td style="padding: 3.5px 8px; color: #334155;">Nasser nationalises the Anglo-French canal company following US withdrawal of funding for the Aswan Dam.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Oct–Nov 1956</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">The Suez Crisis &amp; US Intervention</td>
              <td style="padding: 3.5px 8px; color: #334155;">Protocol of Sèvres collusion; Israeli Sinai blitz &amp; Anglo-French invasion of Port Said halted by US financial threats.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Core Specification Terminology & Exam Question Models -->
      <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 8px; margin-bottom: 5px;">
        
        <!-- Key Historical Concepts & Terminology -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.4px; display: block; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px;">
            Key Disciplinary Terminology
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.34; color: #334155; display: flex; flex-direction: column; gap: 3px;">
            <div>&bull; <strong>Mandate:</strong> Legal trustee authorization under the League of Nations for Britain to administer Palestine.</div>
            <div>&bull; <strong>Nakba:</strong> Arabic for 'catastrophe'; the mass displacement of over 700,000 Palestinian Arabs during the 1948 War.</div>
            <div>&bull; <strong>Green Line:</strong> The 1949 armistice demarcation boundary separating Israel from Jordan's West Bank and Egyptian Gaza.</div>
            <div>&bull; <strong>Law of Return (1950):</strong> Israeli legislation granting every Jewish individual worldwide the legal right to immigrate to Israel.</div>
            <div>&bull; <strong>Protocol of Sèvres:</strong> Secret tripartite collusion pact between Britain, France, and Israel in October 1956 to invade Egypt.</div>
            <div>&bull; <strong>UNEF:</strong> United Nations Emergency Force deployed in Sinai to maintain buffer between Egypt and Israel after Suez.</div>
          </div>
        </div>

        <!-- Examination Question Structure with Concrete Specification Models -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.4px;">
              Edexcel Paper 2 Exam Framework &amp; Models
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; background: #0f172a; color: #fff; padding: 1px 5px; border-radius: 2px;">
              32 MARKS TOTAL
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.9pt; line-height: 1.3; color: #1e293b; display: flex; flex-direction: column; gap: 3.5px;">
            <div style="background: #f8fafc; border-left: 2.5px solid #1e3a8a; padding: 2.5px 5px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #1e3a8a;">Q1: Explain ONE consequence of... [4 Marks]</span><br>
              <em>Model Question:</em> &ldquo;Explain one consequence of the bombing of the King David Hotel in July 1946.&rdquo;<br>
              <span style="color: #64748b; font-size: 6.3pt; font-weight: 600;">Formula: Trigger &rarr; Destruction of HQ &rarr; Hardening of British resolve to evacuate. (1 paragraph)</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #b45309; padding: 2.5px 5px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #b45309;">Q2: Write an analytical narrative explaining... [8 Marks]</span><br>
              <em>Model Question:</em> &ldquo;Write an analytical narrative explaining the outbreak of the Suez Crisis (1956). You may use: (1) Czech Arms Deal (1955), (2) Suez Nationalisation.&rdquo;<br>
              <span style="color: #64748b; font-size: 6.3pt; font-weight: 600;">Formula: 3 chronological stages linked with causal connectives (&lsquo;Consequently&rsquo;, &lsquo;As a direct result&rsquo;).</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #15803d; padding: 2.5px 5px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #15803d;">Q3: Explain the importance of... for... [8 Marks]</span><br>
              <em>Model Question:</em> &ldquo;Explain the importance of the SS Exodus affair (1947) for the British decision to hand Palestine to the UN.&rdquo;<br>
              <span style="color: #64748b; font-size: 6.3pt; font-weight: 600;">Formula: 2 PEEL paragraphs explaining &lsquo;What difference did X make to Y?&rsquo;</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Interactive Digital Retrieval & Revision Hub (Full-Width Strip) -->
      <div style="border: 1.5px solid #1e3a8a; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 6px 10px; background: #f8fafc; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 4px;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2.5px;">
            <span style="background: #1e3a8a; color: #fff; font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; padding: 1.5px 6px; border-radius: 2px; letter-spacing: 0.5px;">
              Interactive Digital Retrieval Hub
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.3px;">
              Key Topic 1 Knowledge Quiz &amp; Flashcards
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e293b; line-height: 1.34; margin-bottom: 3.5px;">
            Scan the QR code with any smartphone or tablet camera to launch the interactive, self-marking retrieval bank for Key Topic 1. Test your rapid recall across the Balfour Declaration, King David Hotel, UN Partition, 1948 War, Palestinian Refugee Crisis (Nakba), and the Suez Crisis with instant model answers and scoring.
          </div>
          <div style="display: flex; gap: 10px; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 700; color: #475569;">
            <span>&bull; 20 Specification Recall Questions</span>
            <span>&bull; Instant Self-Marking &amp; Explanations</span>
            <span>&bull; Digital Leitner Flashcard Deck</span>
          </div>
        </div>
        <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
          <img src="${qrDataUrl}" alt="Key Topic 1 Quiz QR" style="width: 22mm; height: 22mm; display: block; border: 1px solid #cbd5e1; border-radius: 3px; padding: 1px; background: #fff;">
          <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-top: 2px; letter-spacing: 0.3px;">
            Scan for Mobile Quiz
          </span>
        </div>
      </div>

      <!-- Back Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333; font-weight: 700;">
        <span>Paper 2: Conflict in the Middle East, 1945–1995 &bull; Specification Review Index</span>
        <span>Page 12 of 12</span>
      </div>

    </div>
  </div>

</body>
</html>`;
}

async function run() {
  console.log('🚀 Compiling Publisher-Level Standard Textbook for Middle East Key Topic 1...');

  const htmlContent = await buildPublisherTextbookHtmlKT1();

  // Save HTML companion
  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_KT1_PUBLISHER.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML companion to: ${htmlPath}`);

  // Compile PDF with Puppeteer
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPath = path.join(pdfOutputDir, 'cme_new_textbook_KT1_PUBLISHER.pdf');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  console.log(`🎉 Masterpiece PDF Textbook KT1 successfully compiled!`);
  console.log(`📄 PDF Output: ${pdfPath}`);

  await page.close();
  await browser.close();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal compilation error:', err);
    process.exit(1);
  });
}

module.exports = { buildPublisherTextbookHtmlKT1, run };
