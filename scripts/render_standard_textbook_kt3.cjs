/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/cme_new (Key Topic 3: The Search for Peace, 1974–1995)
 * Output: public/pdfs/cme_new_textbook_KT3_PUBLISHER.pdf
 * HTML:   public/units/cme_new/textbook_KT3_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. ZERO AI Fluff & Zero Theatrical Jargon: Removed internal DB IDs and "Act 1–4" staging tags.
 * 2. Official Specification Primacy: Header, cover matrix & lesson banners feature authentic Pearson Edexcel 1HI0/26 spec.
 * 3. Base64 Image Inlining: All archival photos & maps embedded directly as Data URIs (100% reliable offline & in Puppeteer).
 * 4. Automated Map Preservation: All historical maps rendered uncropped with object-fit: contain so no borders or legends are clipped.
 * 5. Clean Chapter Headings: Professional textbook section subheadings with [Section.Paragraph] pills for workbook linkage.
 * 6. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages):
 *    - Page 1:  Master Front Cover (98mm uncropped photographic plate: Oslo South Lawn Handshake, official 3-column spec matrix)
 *    - Page 2:  KT 3.1 Diplomatic Negotiations & Shuttle Diplomacy (1974–1978) - Sections 1 & 2
 *    - Page 3:  KT 3.1 Diplomatic Negotiations & Shuttle Diplomacy (1974–1978) - Sections 3 & 4 + Key Figure: Henry Kissinger
 *    - Page 4:  KT 3.2 Camp David Accords & The Treaty of Washington (1978–1982) - Sections 1 & 2
 *    - Page 5:  KT 3.2 Camp David Accords & The Treaty of Washington (1978–1982) - Sections 3 & 4 + Key Figure: Menachem Begin
 *    - Page 6:  KT 3.3 The Palestinian Issue in Lebanon (1974–1985) - Sections 1 & 2
 *    - Page 7:  KT 3.3 The Palestinian Issue in Lebanon (1974–1985) - Sections 3 & 4 + Key Figure: Ariel Sharon
 *    - Page 8:  KT 3.4 The First Intifada & Superpower Shifts (1987–1992) - Sections 1 & 2
 *    - Page 9:  KT 3.4 The First Intifada & Superpower Shifts (1987–1992) - Sections 3 & 4 + Key Figure: Yasser Arafat
 *    - Page 10: KT 3.5 The Oslo Accords to Oslo II & Rabin's Assassination (1993–1995) - Sections 1 & 2
 *    - Page 11: KT 3.5 The Oslo Accords to Oslo II & Rabin's Assassination (1993–1995) - Sections 3 & 4 + Key Figure: Yitzhak Rabin
 *    - Page 12: Master Back Cover (KT3 Chronological Sequence, Core Terminology & Exam Question Guide)
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

async function buildPublisherTextbookHtmlKT3() {
  const coverBase64 = getBase64Image('images/oslo_handshake.jpg');

  // Generate high-contrast QR Code for Key Topic 3 interactive quiz & flashcards
  const quizUrl = 'https://the-history-revision-hub.netlify.app/?unit=cme_new&quiz=true&lesson=10';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    width: 140,
    margin: 1,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });

  // Images for sources and key figures
  const sinaiMap = getBase64Image('images/cme_sinai_peninsula_map.jpg');
  const cardKissinger =
    getBase64Image('units/cme_new/assets/henry_kissinger.jpg') ||
    getBase64Image('units/cme_new/assets/card_carter.png');

  const campDavidPhoto = getBase64Image('images/cme_camp_david_1978.jpg');
  const treatyHandshake = getBase64Image('images/cme_treaty_triple_handshake_1979.jpg');
  const cardBegin = getBase64Image('units/cme_new/assets/card_begin.png');

  const lebanonMap = getBase64Image('images/cme_lebanon_1982_campaign_map.png');
  const cardSharon = getBase64Image('units/cme_new/assets/card_sharon.png');

  const intifadaPhoto = getBase64Image('units/cme_new/assets/first_intifada.png');
  const madridPhoto = getBase64Image('images/cme_madrid_conference_1991.jpg');
  const cardArafat = getBase64Image('units/cme_new/assets/card_arafat.png');

  const osloMap =
    getBase64Image('units/cme_new/assets/cme_oslo_ii_official_map.jpg') ||
    getBase64Image('images/cme_west_bank_oslo_areas.png');
  const cardRabin = getBase64Image('units/cme_new/assets/card_rabin.png');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) History — Key Topic 3 Course Textbook</title>
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
      font-size: 8.8pt;
      line-height: 1.44;
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
      max-height: 125px;
      object-fit: cover;
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
  </style>
</head>
<body>

  <!-- ====================================================================
       PAGE 1: MASTER FRONT COVER (Key Topic 3 Course Textbook)
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
            Key Topic 3
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Course Textbook &bull; Chronological Enquiry Sequence &bull; 1974–1995
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 16pt; margin: 2px 0; font-weight: 900; line-height: 1.15; color: #000;">
          THE SEARCH FOR PEACE
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #333; font-style: italic; line-height: 1.25;">
          From Shuttle Diplomacy and Camp David to Lebanon, the Intifada, and the Oslo Accords
        </div>
      </div>

      <!-- Master Wide Photographic Plate (White House Lawn Handshake, 13 September 1993) -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 5px; display: flex; flex-direction: column;">
        <div style="height: 98mm; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${coverBase64}" alt="Signing of the Oslo Accords, White House Lawn (13 September 1993)" style="height: 100%; max-width: 100%; object-fit: contain; display: block;">
        </div>
        <div style="border-top: 1.5px solid #000; padding: 4px 10px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
              Archival Primary Record &bull; 13 September 1993
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000; color: #fff; padding: 1px 6px; border-radius: 2px;">
              WHITE-HOUSE / ACC-1993-09-13
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 800; line-height: 1.2; margin: 1px 0;">
            The Historic Handshake: Yitzhak Rabin and Yasser Arafat, White House Lawn
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #111; line-height: 1.25;">
            Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shake hands following the signing of the Oslo Declaration of Principles, hosted by US President Bill Clinton.
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
          <span style="font-size: 7.0pt; letter-spacing: 0.5px;">Key Topic 3 Coverage</span>
        </div>

        <div style="padding: 6px 10px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.34; color: #111; flex: 1;">
          <!-- 3.1 -->
          <div style="border-right: 1.2px solid #cbd5e1; padding-right: 8px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 1.5px; display: block; margin-bottom: 4px;">
                3.1 Diplomacy &amp; Camp David, 1974–79
              </strong>
              <div style="margin-bottom: 2.5px;">&bull; Oil crisis &amp; superpowers: <strong>Kissinger's shuttle diplomacy</strong>.</div>
              <div style="margin-bottom: 2.5px;">&bull; Disengagement accords (1974–75) &amp; Suez reopening.</div>
              <div style="margin-bottom: 2.5px;">&bull; <strong>Sadat's visit to Jerusalem</strong> (Nov 1977) &amp; Knesset speech.</div>
              <div>&bull; <strong>Camp David Accords (1978)</strong> &amp; 1979 Washington Peace Treaty.</div>
            </div>

            <!-- Chronological Sequence Flow -->
            <div style="margin-top: 4px; padding: 3px 5px; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; border-radius: 3px;">
              <div style="font-size: 6.4pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #1e3a8a; margin-bottom: 2px; display: flex; justify-content: space-between;">
                <span>Causal Chain of Events</span>
                <span style="color: #64748b; font-weight: 700;">Chronology</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1px;">
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">1974–75</span>
                  <span>Kissinger's Shuttle Diplomacy</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Nov 1977</span>
                  <span>Sadat Addresses Israeli Knesset</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Sep 1978</span>
                  <span>Camp David Accords Brokered</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #b91c1c; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Mar 1979</span>
                  <span>Egypt-Israel Peace Treaty Signed</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3.2 -->
          <div style="border-right: 1.2px solid #cbd5e1; padding-right: 8px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 1.5px; display: block; margin-bottom: 4px;">
                3.2 The Palestinian Issue, 1974–93
              </strong>
              <div style="margin-bottom: 2.5px;">&bull; PLO recognition &amp; <strong>Arafat's 1974 UN address</strong> ('olive branch').</div>
              <div style="margin-bottom: 2.5px;">&bull; Lebanese Civil War, Coastal Road &amp; <strong>1982 Lebanon invasion</strong>.</div>
              <div style="margin-bottom: 2.5px;">&bull; <strong>Sabra and Shatila massacres</strong> &amp; Kahan Commission report.</div>
              <div>&bull; <strong>First Intifada (1987)</strong>: UNLU, 'Iron Fist', &amp; rise of Hamas.</div>
            </div>

            <!-- Chronological Sequence Flow -->
            <div style="margin-top: 4px; padding: 3px 5px; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; border-radius: 3px;">
              <div style="font-size: 6.4pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #1e3a8a; margin-bottom: 2px; display: flex; justify-content: space-between;">
                <span>Causal Chain of Events</span>
                <span style="color: #64748b; font-weight: 700;">Chronology</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1px;">
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">1974</span>
                  <span>Arafat Addresses UN General Assembly</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Jun 1982</span>
                  <span>Operation Peace for Galilee (Lebanon)</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Sep 1982</span>
                  <span>Sabra and Shatila Refugee Massacres</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #b91c1c; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Dec 1987</span>
                  <span>First Intifada Erupts in Gaza &amp; West Bank</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3.3 -->
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 1.5px; display: block; margin-bottom: 4px;">
                3.3 Attempts at a Solution, 1988–95
              </strong>
              <div style="margin-bottom: 2.5px;">&bull; <strong>Arafat renounces terrorism</strong> &amp; recognizes Israel (1988).</div>
              <div style="margin-bottom: 2.5px;">&bull; Soviet collapse &amp; <strong>1991 Madrid Peace Conference</strong>.</div>
              <div style="margin-bottom: 2.5px;">&bull; Secret Norwegian talks &amp; <strong>Oslo I Accords (1993)</strong>.</div>
              <div>&bull; <strong>Oslo II (1995) Areas A, B, C</strong> &amp; assassination of Rabin.</div>
            </div>

            <!-- Chronological Sequence Flow -->
            <div style="margin-top: 4px; padding: 3px 5px; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; border-radius: 3px;">
              <div style="font-size: 6.4pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #1e3a8a; margin-bottom: 2px; display: flex; justify-content: space-between;">
                <span>Causal Chain of Events</span>
                <span style="color: #64748b; font-weight: 700;">Chronology</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1px;">
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Dec 1988</span>
                  <span>Arafat Renounces Terror in Geneva</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Oct 1991</span>
                  <span>Madrid Peace Conference Convenes</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #1e3a8a; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Sep 1993</span>
                  <span>Oslo I Declaration of Principles</span>
                </div>
                <div style="text-align: center; font-size: 6.2pt; line-height: 0.7; color: #b45309; font-weight: 900;">&darr;</div>
                <div style="display: flex; align-items: center; gap: 4px; font-size: 6.7pt; font-weight: 600; color: #0f172a;">
                  <span style="background: #b91c1c; color: #fff; font-size: 5.6pt; font-weight: 800; padding: 0.5px 3px; border-radius: 2px; flex-shrink: 0;">Nov 1995</span>
                  <span>Yitzhak Rabin Assassinated in Tel Aviv</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333; font-weight: 700;">
        <span>Paper 2: Conflict in the Middle East, 1945–1995 &bull; Key Topic 3 Student Textbook</span>
        <span>Page 1 of 12</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGE 2: KT 3.1 DIPLOMATIC NEGOTIATIONS & SHUTTLE DIPLOMACY (LEFT)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 3.1</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 3.1</span>
        <span class="spec-ref-badge">SUPERPOWER DIPLOMACY &bull; 1974–1978</span>
      </div>
      <h1 class="lesson-title">
        Diplomatic Negotiations: Shuttle Diplomacy to Jerusalem
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> The oil crisis and superpower involvement: the roles of the USA (Kissinger’s shuttle diplomacy) and the USSR; the 1974–75 disengagement accords; the reopening of the Suez Canal; the 1977 Israeli election of Menachem Begin; Sadat’s visit to Israel (November 1977) and Knesset speech.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The 1973 Oil Shock &amp; Superpower Roles</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.1]</span>
        The October 1973 Yom Kippur War fundamentally transformed global geopolitics. For the first time, Arab members of <strong>OPEC</strong> successfully wielded the 'oil weapon,' cutting crude oil production and placing an embargo on Western nations supporting Israel. Crude oil prices quadrupled from $3 to $12 per barrel, triggering crippling inflation, industrial stagnation, and fuel rationing across Western Europe and the United States.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.2]</span>
        The economic shock forced the United States to reassess its Middle Eastern strategy. Washington could no longer afford an unstable status quo in which regional flare-ups threatened the global economy and brought the US and Soviet Union to the brink of nuclear confrontation. US Secretary of State <strong>Henry Kissinger</strong> recognized that the psychological breakthrough of the 1973 war—which restored Arab self-respect while shattering Israel's belief in its permanent military invulnerability—created an unprecedented window for negotiated diplomacy.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Diplomatic Map</span>
          </div>
          <span class="source-date-micro">1974–1975</span>
        </div>
        <div class="archival-title">The Sinai Disengagement Accords (Sinai I &amp; II)</div>
        ${sinaiMap ? `<img src="${sinaiMap}" class="archival-map-image" alt="Sinai Disengagement Map">` : ''}
        <div class="archival-body">
          Kissinger's phased disengagement treaties established a UN buffer zone east of the Suez Canal, allowing Egypt to clear and reopen the vital maritime waterway in June 1975.
        </div>
        <div class="archival-footer">
          <span>US State Department Historical Office</span>
          <span>Sinai Disengagement Records, 1975</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">Henry Kissinger’s "Shuttle Diplomacy" (1974–1975)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.3]</span>
        Because Arab states still refused to sit in direct face-to-face negotiations with Israel, Kissinger pioneered <strong>shuttle diplomacy</strong>. Traveling relentlessly on his Air Force Boeing 707 between Jerusalem, Cairo, and Damascus, Kissinger acted as an intermediary, carrying draft proposals, personal assurances, and American aid packages.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.4]</span>
        Kissinger's strategy yielded concrete breakthroughs. In January 1974, Egypt and Israel signed the <strong>Sinai I Disengagement Accord</strong>, pulling Israeli troops back from the canal and creating a UN-monitored buffer zone. In May 1974, Kissinger brokered a parallel Syrian-Israeli disengagement on the Golan Heights. In September 1975, the <strong>Sinai II Accord</strong> saw Israel withdraw further to the strategic Gidi and Mitla Passes, returning the Abu Rudeis oilfields to Egypt. In exchange, Egypt pledged non-belligerency, allowed non-military Israeli cargoes through the canal, and on 5 June 1975, officially reopened the <strong>Suez Canal</strong> to international commerce after eight years of closure.
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 2 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 3: KT 3.1 DIPLOMATIC NEGOTIATIONS & SHUTTLE DIPLOMACY (RIGHT)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 3: THE SEARCH FOR PEACE, 1974–1995</strong></span>
      <span>ENQUIRY: SHUTTLE DIPLOMACY TO JERUSALEM</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The 1977 Likud Victory &amp; Menachem Begin</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.5]</span>
        In May 1977, Israeli politics underwent an earthquake. For 29 years since 1948, the moderate, secular Labour Party had governed Israel uninterruptedly. In the wake of public anger over the military unpreparedness in 1973, the right-wing <strong>Likud Party</strong> won the national election.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.6]</span>
        The new Prime Minister was <strong>Menachem Begin</strong>, former commander of the underground Irgun militia. Begin was a committed ideological Revisionist Zionist who believed in 'Greater Israel' (<em>Eretz Yisrael</em>) and viewed the West Bank and Gaza as biblical Judea and Samaria, lands that could never be surrendered. However, regarding the Sinai Desert—which held no biblical sanctity—Begin was pragmatically willing to consider territorial compromise if it secured permanent peace with Egypt and detached Israel's most formidable Arab adversary from the conflict.
      </div>

      <div class="section-banner">
        <span class="section-title">Sadat’s Historic Gamble: Speech to the Knesset (1977)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.7]</span>
        In Egypt, President <strong>Anwar Sadat</strong> faced severe domestic crises. In January 1977, deadly 'Bread Riots' erupted across Cairo after IMF-mandated subsidy cuts, threatening his regime. Sadat realized Egypt could no longer sustain a ruinous war economy spending over 30% of its GDP on the military. Frustrated by sluggish multilateral diplomacy in Geneva, Sadat took a breathtaking geopolitical gamble.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[1.8]</span>
        On 9 November 1977, Sadat announced to the Egyptian Parliament that he was prepared to go "to the ends of the earth—even to the Israeli Knesset" to discuss peace. Begin immediately issued a formal invitation. On 19 November 1977, Sadat's presidential aircraft landed at Ben-Gurion Airport, where he was greeted with full state honours by Begin and Golda Meir. The following day, Sadat addressed the Knesset in Jerusalem. While reaffirming that peace required total Israeli withdrawal from Arab lands captured in 1967 and the realization of Palestinian rights, Sadat declared unequivocally: <em>"No more war, no more bloodshed."</em> In a single stroke, the psychological barrier of hatred that had paralyzed Arab-Israeli relations for three decades was shattered.
      </div>

      <!-- Key Figure Box: Henry Kissinger -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1923–2023</span>
        </div>
        <div class="kf-identity-row">
          ${cardKissinger ? `<img src="${cardKissinger}" class="kf-portrait" alt="Henry Kissinger">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Henry Kissinger</h4>
            <div class="kf-role">US Secretary of State (1973–1977)</div>
          </div>
        </div>
        <div class="kf-significance">
          Architect of 'shuttle diplomacy' who brokered post-1973 disengagement accords, realigning Egypt towards the Western superpower orbit.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Pioneered Step-by-Step Diplomacy:</strong> Avoided unresolvable comprehensive summits in favor of pragmatic, bilateral troop disengagements in Sinai and Golan.</li>
          <li><strong>Marginalised Soviet Influence:</strong> Exploited Egyptian frustration with Moscow to make the United States the sole indispensable mediator in the Middle East.</li>
          <li><strong>Secured Reopening of Suez:</strong> Brokered the 1975 Sinai II Accord, restoring international maritime shipping and reducing global oil tensions.</li>
        </ul>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 3 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 4: KT 3.2 CAMP DAVID ACCORDS & TREATY OF WASHINGTON (LEFT)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 3.2</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 3.2</span>
        <span class="spec-ref-badge">HISTORIC ACCORDS &bull; 1978–1982</span>
      </div>
      <h1 class="lesson-title">
        The Camp David Accords &amp; The Treaty of Washington
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> The Camp David Summit (September 1978) and the role of Jimmy Carter; the two Frameworks for Peace; the Egypt-Israel Peace Treaty of Washington (March 1979); the Israeli withdrawal from Sinai; and the Arab backlash, expulsion of Egypt, and assassination of Sadat (1981).
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Camp David Summit (September 1978)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.1]</span>
        Following Sadat's visit to Jerusalem, direct negotiations quickly deadlocked over Israeli settlements in Sinai and the future of the West Bank. Sensing an impending diplomatic collapse, newly elected US President <strong>Jimmy Carter</strong> intervened decisively. In September 1978, Carter invited Sadat and Begin to the secluded presidential retreat at <strong>Camp David</strong> in the Catoctin Mountains of Maryland.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.2]</span>
        For thirteen grueling days, Carter engaged in marathon mediation. Mutual antipathy between Begin and Sadat was so intense that after three days they refused to speak to each other; Carter was forced to walk back and forth between their cabins carrying handwritten revisions. Begin refused to dismantle Jewish settlements in Sinai or grant sovereignty to the West Bank, while Sadat insisted on total Israeli withdrawal and Palestinian self-determination. Through relentless personal diplomacy, threats to withhold US military subsidies, and appeal to their shared monotheistic values, Carter forged a breakthrough on 17 September 1978.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">September 1978</span>
        </div>
        <div class="archival-title">Begin, Carter, and Sadat at the Camp David Summit</div>
        ${campDavidPhoto ? `<img src="${campDavidPhoto}" class="archival-image" alt="Camp David Summit 1978">` : ''}
        <div class="archival-body">
          Jimmy Carter's thirteen-day marathon mediation at Camp David produced the historic 'Framework for Peace in the Middle East' between Menachem Begin and Anwar Sadat.
        </div>
        <div class="archival-footer">
          <span>White House Historical Collection</span>
          <span>Camp David, Maryland, 17 September 1978</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Two Frameworks for Peace</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.3]</span>
        The Camp David agreement comprised two distinct frameworks:
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.4]</span>
        <strong>1. Framework for the Conclusion of a Peace Treaty between Egypt and Israel:</strong> Israel agreed to completely evacuate the Sinai Peninsula in phases over three years, dismantling eighteen Israeli settlements (including the town of Yamit) and returning the oilfields. In return, Egypt agreed to establish full diplomatic relations, exchange ambassadors, open normal trade, and demilitarize the Sinai with international peacekeeping observers.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.5]</span>
        <strong>2. Framework for Peace in the Middle East:</strong> Envisioned a five-year transitional period for the West Bank and Gaza Strip, during which Israeli military administration would be replaced by a self-governing Palestinian authority. However, this framework was left deliberately vague: Begin insisted 'autonomy' applied only to the people, not the land, and fiercely rejected any independent Palestinian state.
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 4 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 5: KT 3.2 CAMP DAVID ACCORDS & TREATY OF WASHINGTON (RIGHT)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 3: THE SEARCH FOR PEACE, 1974–1995</strong></span>
      <span>ENQUIRY: THE CAMP DAVID BREAKTHROUGH &amp; AFTERMATH</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The 1979 Washington Treaty &amp; Sinai Withdrawal</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.6]</span>
        On 26 March 1979, on the North Lawn of the White House, Sadat and Begin formally signed the <strong>Treaty of Peace between Egypt and Israel</strong>. The treaty ended 31 years of official state of war. Under the agreement, Israel completed its phased evacuation of Sinai by April 1982, forcibly removing resisting Jewish settlers from Yamit.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.7]</span>
        The treaty was a profound strategic triumph for Israel. By neutralizing Egypt—the most populous Arab country and the only army capable of leading a multi-front assault—Israel eliminated the existential threat of a coordinated conventional invasion. The United States guaranteed the pact by granting massive annual military subsidies: approximately $3 billion to Israel and $2 billion to Egypt annually.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">26 March 1979</span>
        </div>
        <div class="archival-title">Signing the Egypt-Israel Peace Treaty in Washington</div>
        ${treatyHandshake ? `<img src="${treatyHandshake}" class="archival-image" alt="Treaty of Washington 1979">` : ''}
        <div class="archival-body">
          "Sadat, Carter, and Begin join hands on the White House lawn, formalizing the first peace treaty between the State of Israel and an Arab sovereign nation."
        </div>
        <div class="archival-footer">
          <span>US National Archives (NARA)</span>
          <span>Washington, D.C., 26 March 1979</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">Arab Fury, Boycott &amp; The Assassination of Sadat</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.8]</span>
        Across the Arab world, the treaty provoked explosive fury. Arab states condemned Sadat as a traitor who had broken the Khartoum 'Three Noes,' abandoned the Palestinians, and sold out Arab solidarity for a separate bilateral deal. The Arab League immediately suspended Egypt's membership, severed diplomatic relations, moved its headquarters from Cairo to Tunis, and imposed a strict economic boycott.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[2.9]</span>
        Within Egypt, domestic opposition surged among leftists, Arab nationalists, and Islamist groups. On 6 October 1981, during a military parade celebrating the eighth anniversary of the 1973 Suez crossing, radical Egyptian Islamic Jihad soldiers leaped from a military truck and opened fire on the reviewing stand with automatic rifles and grenades. Sadat was assassinated instantly. His successor, <strong>Hosni Mubarak</strong>, honored the treaty with Israel while maintaining a 'cold peace,' re-establishing Egypt's ties with the Arab world.
      </div>

      <!-- Key Figure Box: Menachem Begin -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1913–1992</span>
        </div>
        <div class="kf-identity-row">
          ${cardBegin ? `<img src="${cardBegin}" class="kf-portrait" alt="Menachem Begin">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Menachem Begin</h4>
            <div class="kf-role">Prime Minister of Israel (1977–1983)</div>
          </div>
        </div>
        <div class="kf-significance">
          Likud leader who made peace with Egypt at Camp David while accelerating Jewish settlement expansion across the West Bank and Gaza.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Surrendered Sinai for Peace:</strong> Evacuated the entire Sinai Peninsula and dismantled Jewish settlements to eliminate Egypt from the Arab war coalition.</li>
          <li><strong>Shared 1978 Nobel Peace Prize:</strong> Awarded the Nobel Peace Prize alongside Anwar Sadat for the historic Camp David breakthrough.</li>
          <li><strong>Annexed Jerusalem &amp; Invaded Lebanon:</strong> Passed the 1980 Jerusalem Law declaring unified Jerusalem Israel's eternal capital, and launched the 1982 invasion of Lebanon.</li>
        </ul>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 5 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 6: KT 3.3 THE PALESTINIAN ISSUE IN LEBANON (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 3.3</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 3.3</span>
        <span class="spec-ref-badge">LEBANON &amp; MASSACRE &bull; 1974–1985</span>
      </div>
      <h1 class="lesson-title">
        The Palestinian Issue: Lebanon &amp; Sabra and Shatila
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> The Palestinian problem in Lebanon; the creation of 'Fatahland'; Operation Litani (1978); Operation Peace for Galilee (June 1982); the siege of West Beirut and PLO evacuation; the Sabra and Shatila massacres (September 1982); and the Kahan Commission report.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Rise of "Fatahland" in Southern Lebanon</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.1]</span>
        Following its violent expulsion from Jordan during Black September (1970), Yasser Arafat relocated the <strong>Palestine Liberation Organization (PLO)</strong> headquarters and 15,000 armed fighters to Lebanon. Exploiting Lebanon's fragile sectarian system and the outbreak of the <strong>Lebanese Civil War (1975)</strong>, the PLO established a de facto state-within-a-state across southern Lebanon, which Israelis dubbed <strong>'Fatahland.'</strong>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.2]</span>
        From southern Lebanon, Palestinian fedayeen launched cross-border rocket barrages and commando raids into northern Israeli towns. In March 1978, Fatah militants landed on the Israeli coast, hijacked an intercity bus on the Coastal Highway, and killed 38 Israeli civilians (including 13 children). Israel retaliated with <strong>Operation Litani</strong>, invading southern Lebanon with 25,000 troops. The UN deployed a peacekeeping force (<strong>UNIFIL</strong>) along the border, but PLO rocket attacks against Israeli settlements in Galilee continued.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Military Campaign Map</span>
          </div>
          <span class="source-date-micro">June 1982</span>
        </div>
        <div class="archival-title">Operation Peace for Galilee: Israeli Advance to Beirut</div>
        ${lebanonMap ? `<img src="${lebanonMap}" class="archival-map-image" alt="1982 Lebanon War Map">` : ''}
        <div class="archival-body">
          IDF armored columns bypassed UNIFIL lines, pushing 40 kilometers north and laying siege to West Beirut to destroy the PLO infrastructure and force its evacuation.
        </div>
        <div class="archival-footer">
          <span>IDF Operations Branch</span>
          <span>Lebanon Campaign Record, June 1982</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">Operation Peace for Galilee &amp; The Siege of Beirut</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.3]</span>
        On 3 June 1982, Palestinian terrorists from the dissident Abu Nidal group critically wounded Israeli ambassador Shlomo Argov in London. Although Abu Nidal was a bitter rival of Arafat, Israeli Defence Minister <strong>Ariel Sharon</strong> and Prime Minister Begin used the shooting as a pretext for a full-scale invasion. On 6 June 1982, Israel launched <strong>Operation Peace for Galilee</strong>.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.4]</span>
        While the Israeli cabinet was told the advance would extend only 40 kilometers to push PLO artillery out of range, Sharon had secretly planned to push all the way to Beirut, link up with Christian Phalangist allies, and install a pro-Israeli government. In Operation Mole Cricket 19, the Israeli Air Force destroyed Syria's Soviet-supplied anti-aircraft missile batteries in the Bekaa Valley and shot down 82 Syrian MiGs. By mid-June, Israeli forces encircled West Beirut, subjecting the city to ten weeks of devastating aerial and naval bombardment. In August 1982, US special envoy Philip Habib brokered an agreement: over 14,000 PLO fighters evacuated Beirut by sea, with Arafat establishing a new exile headquarters in distant <strong>Tunis</strong>.
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 6 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 7: KT 3.3 THE PALESTINIAN ISSUE IN LEBANON (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 3: THE SEARCH FOR PEACE, 1974–1995</strong></span>
      <span>ENQUIRY: SABRA &amp; SHATILA AND THE LEBANON AFTERMATH</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Sabra &amp; Shatila Massacres (September 1982)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.5]</span>
        On 14 September 1982, Lebanon's newly elected Christian President, <strong>Bachir Gemayel</strong>—Israel's key ally—was assassinated in a massive bomb blast at Phalangist headquarters. The following morning, claiming that 2,000 PLO terrorists remained hidden in the refugee camps, Sharon ordered Israeli forces to occupy West Beirut and authorize Lebanese Christian Phalangist militiamen to enter the Palestinian refugee camps of <strong>Sabra and Shatila</strong> to 'mop up' fighters.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.6]</span>
        What followed was a horrific atrocity. For 36 hours between 16 and 18 September, Phalangist militiamen systematically butchered defenseless civilians while Israeli flares illuminated the night sky above the camps and Israeli sentries guarded camp exits. Between 800 and 2,000 Palestinian and Lebanese civilians—overwhelmingly women, children, and elderly men—were massacred with axes, knives, and machine guns.
      </div>

      <div class="section-banner">
        <span class="section-title">The Kahan Commission &amp; Israeli Domestic Outrage</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.7]</span>
        The horror of the massacres shattered Israel's moral self-image and triggered a massive domestic political convulsion. On 25 September 1982, an unprecedented 400,000 Israelis—nearly 10% of the entire national population—rallied in Tel Aviv's Kings of Israel Square, demanding an independent judicial inquiry and Sharon's resignation.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[3.8]</span>
        In February 1983, the official <strong>Kahan Commission</strong> published its findings. It exonerated the IDF of direct guilt, concluding that Phalangists had perpetrated the killings. However, the commission found Defence Minister Ariel Sharon guilty of <em>"indirect responsibility"</em> and serious negligence for ignoring the obvious danger of bloodshed when ordering bloodthirsty Phalangists into the camps. Sharon was forced to resign as Defence Minister. Deeply depressed by the Lebanese quagmire, Israeli casualties, and the death of his wife, Menachem Begin resigned as Prime Minister in August 1983, retreating into seclusion. Israel remained bogged down in southern Lebanon until its final withdrawal in May 2000, facing the rise of a new and deadlier enemy: the Iranian-backed Shia militia <strong>Hezbollah</strong>.
      </div>

      <!-- Key Figure Box: Ariel Sharon -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1928–2014</span>
        </div>
        <div class="kf-identity-row">
          ${cardSharon ? `<img src="${cardSharon}" class="kf-portrait" alt="Ariel Sharon">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Ariel Sharon</h4>
            <div class="kf-role">Israeli Defence Minister (1981–1983)</div>
          </div>
        </div>
        <div class="kf-significance">
          Aggressive military commander who orchestrated the 1982 invasion of Lebanon and was found indirectly responsible for the Sabra and Shatila massacres.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Engineered Operation Peace for Galilee:</strong> Advanced IDF troops 60 miles to Beirut to destroy PLO military infrastructure.</li>
          <li><strong>Authorized Phalangist Camp Entry:</strong> Allowed Christian militia into Sabra and Shatila, leading to mass slaughter and international condemnation.</li>
          <li><strong>Forced Resignation:</strong> Dismissed as Defence Minister in 1983 following the scathing judicial verdict of the Kahan Commission.</li>
        </ul>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 7 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 8: KT 3.4 FIRST INTIFADA & SUPERPOWER SHIFTS (LEFT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 3.4</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 3.4</span>
        <span class="spec-ref-badge">GRASSROOTS UPRISING &bull; 1987–1992</span>
      </div>
      <h1 class="lesson-title">
        The First Intifada &amp; Shifting Superpower Alliances
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> Causes and outbreak of the First Intifada (December 1987); the roles of the UNLU and Hamas; Yitzhak Rabin’s 'Iron Fist' policy; international media impact; Arafat’s 1988 Geneva renunciation of terrorism; the collapse of the Soviet Union; and the 1991 Madrid Conference.
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Spark at Jabalia &amp; Outbreak of the Intifada</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.1]</span>
        By December 1987, Palestinian frustration had reached boiling point. For twenty years since 1967, 1.5 million Palestinians in the West Bank and Gaza had lived under military occupation, facing curfews, land confiscations, home demolitions, and arbitrary checkpoints. Simultaneously, Israeli right-wing governments had built over 100 Jewish settlements, settling 70,000 Israelis in the occupied territories.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.2]</span>
        On 8 December 1987, an IDF tank transporter collided with civilian cars at the Erez checkpoint in Gaza, killing four Palestinian labourers from the <strong>Jabalia refugee camp</strong>. Believing the crash was a deliberate act of revenge for an earlier stabbing, thousands of mourners turned the funerals into an angry riot. The spontaneous uprising spread like wildfire across Gaza and the West Bank, becoming known as the <strong>First Intifada</strong> (Arabic for 'shaking off').
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">December 1987</span>
        </div>
        <div class="archival-title">Palestinian Youths Confronting Israeli Armoured Vehicles</div>
        ${intifadaPhoto ? `<img src="${intifadaPhoto}" class="archival-image" alt="First Intifada Stones vs Tanks">` : ''}
        <div class="archival-body">
          Television broadcasts showing unarmed Palestinian youths throwing stones against heavily armed Israeli soldiers transformed international public sympathy.
        </div>
        <div class="archival-footer">
          <span>Reuters News Agency</span>
          <span>Gaza City, December 1987</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">UNLU, Hamas &amp; Rabin's "Iron Fist"</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.3]</span>
        Unlike earlier military conflicts, the Intifada was a civil, grassroots uprising directed not from Tunis, but by local underground committees united as the <strong>Unified National Leadership of the Uprising (UNLU)</strong>. The UNLU organized commercial general strikes, tax boycotts, barricades, and mass demonstrations. Crucially, the uprising saw the birth of <strong>Hamas</strong> (the Islamic Resistance Movement), founded by Sheikh Ahmed Yassin in Gaza, which rejected the secular PLO and advocated armed jihad to destroy Israel.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.4]</span>
        Israeli Defence Minister <strong>Yitzhak Rabin</strong> responded with an uncompromising <strong>'Iron Fist' policy</strong>. Deploying thousands of troops, the IDF imposed prolonged curfews, rounded up 40,000 suspects into desert detention camps, closed Palestinian schools and universities, and ordered soldiers to "break the bones" of stone-throwers. However, nightly global television broadcasts showing teenage boys facing tanks shattered Israel's international image, causing profound moral distress inside Israeli society.
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 8 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 9: KT 3.4 FIRST INTIFADA & SUPERPOWER SHIFTS (RIGHT SPREAD)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 3: THE SEARCH FOR PEACE, 1974–1995</strong></span>
      <span>ENQUIRY: THE FIRST INTIFADA &amp; THE SUPERPOWER SHIFT</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">Arafat's Geneva Concessions &amp; US Dialogue (1988)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.5]</span>
        The Intifada showed PLO Chairman Yasser Arafat that leadership of the Palestinian national cause was passing to the youth of Gaza and the West Bank. To retain political relevance, Arafat orchestrated a historic diplomatic pivot. In November 1988, the Palestine National Council in Algiers proclaimed the symbolic independence of Palestine on the 1967 borders, implicitly recognizing Israel.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.6]</span>
        In December 1988, addressing a special UN session in Geneva, Arafat fulfilled three conditions demanded by Washington: he explicitly recognized <strong>UN Security Council Resolutions 242 and 338</strong>, accepted Israel's right to exist in peace and security, and totally renounced all forms of terrorism. In response, outgoing US President Ronald Reagan opened the first official diplomatic dialogue with the PLO, ending sixteen years of official American isolation.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE B</span>
            <span class="source-type">Archival Photograph</span>
          </div>
          <span class="source-date-micro">30 October 1991</span>
        </div>
        <div class="archival-title">The Opening Session of the Madrid Peace Conference</div>
        ${madridPhoto ? `<img src="${madridPhoto}" class="archival-image" alt="Madrid Conference 1991">` : ''}
        <div class="archival-body">
          Co-sponsored by Presidents Bush and Gorbachev, the 1991 Madrid Conference brought Israel, Syria, Lebanon, and a Jordanian-Palestinian delegation face-to-face for the first time.
        </div>
        <div class="archival-footer">
          <span>Palacio Real de Madrid Historical Record</span>
          <span>Madrid, 30 October 1991</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Soviet Collapse &amp; The 1991 Madrid Conference</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.7]</span>
        Between 1989 and 1991, the global Cold War framework collapsed. The fall of the Berlin Wall and the dissolution of the <strong>Soviet Union</strong> deprived radical Arab states (Syria, Iraq) of their superpower patron and weapons supplier. Simultaneously, over 400,000 Soviet Jews emigrated to Israel, dramatically bolstering Israel's economy and military reserves.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[4.8]</span>
        In the 1991 Gulf War, the US crushed Saddam Hussein's Iraqi army. Because Arafat made the disastrous blunder of backing Saddam, wealthy Gulf States cut off all financial subsidies to the PLO, leaving it politically isolated and bankrupt. Exploiting this moment of undisputed American hegemony, US President George H.W. Bush and Secretary of State James Baker convened the <strong>Madrid Peace Conference (October 1991)</strong>, forcing Israeli Prime Minister Yitzhak Shamir and Arab delegations into direct face-to-face negotiations for the first time.
      </div>

      <!-- Key Figure Box: Yasser Arafat -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1929–2004</span>
        </div>
        <div class="kf-identity-row">
          ${cardArafat ? `<img src="${cardArafat}" class="kf-portrait" alt="Yasser Arafat">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Yasser Arafat</h4>
            <div class="kf-role">Chairman of the PLO (1969–2004)</div>
          </div>
        </div>
        <div class="kf-significance">
          Leader who transformed the Palestinian national movement from guerilla armed struggle to international diplomacy, signing the 1993 Oslo Accords.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Renounced Terrorism in 1988:</strong> Formally recognized Israel and accepted UN Resolution 242 in Geneva, opening formal diplomatic dialogue with the US.</li>
          <li><strong>Authorized Oslo Backchannel:</strong> Negotiated the 1993 Oslo Declaration of Principles in secret, securing PLO recognition and return to Palestine.</li>
          <li><strong>Became First PA President:</strong> Established the Palestinian National Authority in Gaza and Jericho in 1994, sharing the 1994 Nobel Peace Prize.</li>
        </ul>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 9 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 10: KT 3.5 OSLO ACCORDS TO OSLO II & ASSASSINATION (LEFT)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>EDEXCEL GCSE (9–1) HISTORY</strong> &bull; OPTION 26/27: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
      <span>SPECIFICATION 1HI0/26 &bull; KEY TOPIC 3.5</span>
    </div>

    <div class="lesson-hero">
      <div class="lesson-badge-strip">
        <span class="topic-badge">KEY TOPIC 3.5</span>
        <span class="spec-ref-badge">OSLO &amp; TRAGEDY &bull; 1993–1995</span>
      </div>
      <h1 class="lesson-title">
        The Oslo Accords, Oslo II &amp; Rabin’s Assassination
      </h1>
      <div class="lesson-spec-anchor">
        <strong>Pearson Specification Focus:</strong> Secret negotiations in Norway; the Oslo I Accords (1993) and Declaration of Principles; the 1994 Israel-Jordan Peace Treaty; Oslo II (1995) and the division of the West Bank into Areas A, B, and C; rising extremism and Hamas suicide bombings; and the assassination of Yitzhak Rabin (4 November 1995).
      </div>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">The Secret Norwegian Backchannel (1993)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.1]</span>
        In June 1992, the Israeli Labour Party returned to power under Prime Minister <strong>Yitzhak Rabin</strong>, with <strong>Shimon Peres</strong> as Foreign Minister. Rabin campaigned on a pledge to achieve peace with the Palestinians within nine months. While official multilateral talks dragged endlessly in Washington, Norwegian sociologist Terje Rød-Larsen and Foreign Minister Johan Jørgen Holst established a secret backchannel in a secluded farmhouse outside Oslo.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.2]</span>
        Away from media scrutiny, Israeli academics and PLO officials (led by Ahmed Qurei / Abu Ala) met for fourteen clandestine sessions. Both sides made historic concessions. Israel agreed to recognize the PLO as the official representative of the Palestinian people, while the PLO officially recognized the State of Israel's right to exist in peace and security and reiterated its rejection of terrorism.
      </div>

      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE A</span>
            <span class="source-type">Historical Treaty Map</span>
          </div>
          <span class="source-date-micro">September 1995</span>
        </div>
        <div class="archival-title">The West Bank Divided: Oslo II Areas A, B, and C</div>
        ${osloMap ? `<img src="${osloMap}" class="archival-map-image" alt="Oslo II Areas A B C Map">` : ''}
        <div class="archival-body">
          Oslo II carved the West Bank into disconnected Palestinian enclaves (Area A: full PA control; Area B: joint control; Area C: full Israeli security and settlement jurisdiction).
        </div>
        <div class="archival-footer">
          <span>Palestinian-Israeli Interim Agreement (Taba Accord)</span>
          <span>September 1995</span>
        </div>
      </div>

      <div class="section-banner">
        <span class="section-title">The Oslo I Accords (1993) &amp; The Jordan Treaty (1994)</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.3]</span>
        On 13 September 1993, on the South Lawn of the White House, Rabin and Arafat signed the <strong>Declaration of Principles (Oslo I)</strong>, sealed with a reluctant, historic handshake encouraged by President Bill Clinton. Oslo I established phased interim self-government: Israel would withdraw from the Gaza Strip and the West Bank town of Jericho (the 1994 Cairo Agreement), handing civil administration to the newly created <strong>Palestinian National Authority (PA)</strong> headed by Arafat.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.4]</span>
        The momentum of Oslo spurred regional normalization. On 26 October 1994, Yitzhak Rabin and <strong>King Hussein of Jordan</strong> signed the <strong>Israel-Jordan Peace Treaty</strong> in the Arava Valley, formalizing borders, water-sharing arrangements, and recognizing Jordan's special historic custodianship over Muslim holy shrines in Jerusalem.
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; GCSE History Student Textbook</span>
      <span>Page 10 of 12</span>
    </div>
  </div>

  <!-- ====================================================================
       PAGE 11: KT 3.5 OSLO ACCORDS TO OSLO II & ASSASSINATION (RIGHT)
       ==================================================================== -->
  <div class="textbook-page">
    <div class="running-header">
      <span><strong>KEY TOPIC 3: THE SEARCH FOR PEACE, 1974–1995</strong></span>
      <span>ENQUIRY: OSLO II, EXTREMISM &amp; THE FATAL BLOW</span>
    </div>

    <div class="two-column-prose">
      <div class="section-banner">
        <span class="section-title">Oslo II (1995) &amp; The Division into Areas A, B, and C</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.5]</span>
        In September 1995, Rabin and Arafat signed the <strong>Interim Agreement on the West Bank and Gaza Strip (Oslo II / Taba Accord)</strong>. Oslo II extended Palestinian self-rule to major Palestinian cities, carving the West Bank into three administrative zones:
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.6]</span>
        &bull; <strong>Area A (3% of land, later 18%):</strong> Included major Arab cities (Jenin, Nablus, Ramallah, Bethlehem, Hebron). Palestinian Authority held exclusive civil and security control.<br>
        &bull; <strong>Area B (24% of land):</strong> Comprised 450 Palestinian villages. The PA administered civil services and policing, while Israel retained overriding military security.<br>
        &bull; <strong>Area C (73% of land, later 60%):</strong> Comprised all Jewish settlements, military bases, bypass roads, the Jordan Valley, and unpopulated state lands, remaining under total Israeli civil and military control.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.7]</span>
        Crucially, Oslo II postponed the most explosive <strong>'Final Status Issues'</strong>—the permanent borders, the status of Jerusalem, Jewish settlements, and the right of return of Palestinian refugees—to future negotiations. This structural flaw allowed extremists on both sides to undermine the process.
      </div>

      <div class="section-banner">
        <span class="section-title">Rising Extremism &amp; The Assassination of Rabin</span>
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.8]</span>
        The peace process provoked violent backlash from extremists on both sides. In February 1994, Jewish extremist Baruch Goldstein massacred 29 Palestinian worshippers inside the Ibrahimi Mosque in Hebron. In retaliation, <strong>Hamas and Palestinian Islamic Jihad</strong> launched a deadly campaign of suicide bombings against Israeli civilian buses in Tel Aviv, Jerusalem, and Afula, killing dozens of civilians and destroying Israeli public confidence in peace.
      </div>
      <div class="numbered-para">
        <span class="para-ref-pill">[5.9]</span>
        In Israel, right-wing opposition led by Likud's Benjamin Netanyahu fiercely attacked Rabin, with protest crowds chanting "Rabin is a traitor" and displaying posters of Rabin in Nazi SS uniform. On the evening of <strong>4 November 1995</strong>, Rabin addressed a massive peace rally of 100,000 supporters in Kings of Israel Square in Tel Aviv. As he walked to his car, <strong>Yigal Amir</strong>, a 25-year-old ultra-nationalist Jewish law student who believed giving up biblical land violated Jewish law, fired three hollow-point bullets into Rabin's back. Rabin died at Ichilov Hospital. His assassination dealt a fatal blow to the Oslo peace process, derailing the momentum toward a two-state solution.
      </div>

      <!-- Key Figure Box: Yitzhak Rabin -->
      <div class="key-figure-box">
        <div class="kf-header">
          <span class="kf-tag">KEY FIGURE</span>
          <span class="kf-lifespan">1922–1995</span>
        </div>
        <div class="kf-identity-row">
          ${cardRabin ? `<img src="${cardRabin}" class="kf-portrait" alt="Yitzhak Rabin">` : ''}
          <div class="kf-identity-text">
            <h4 class="kf-name">Yitzhak Rabin</h4>
            <div class="kf-role">Prime Minister of Israel (1974–77, 1992–95)</div>
          </div>
        </div>
        <div class="kf-significance">
          Former IDF Chief of Staff who recognized the PLO, signed the Oslo Accords, and was assassinated by an Israeli extremist on 4 November 1995.
        </div>
        <div class="kf-actions-title">Strategic Decisions &amp; Actions:</div>
        <ul class="kf-actions-list">
          <li><strong>Authorized Secret Oslo Negotiations:</strong> Recognized that military force could not suppress the Palestinian national movement, approving the backchannel talks in Norway.</li>
          <li><strong>Signed Oslo Accords &amp; Jordan Treaty:</strong> Exchanged mutual recognition with Arafat at the White House and signed the 1994 Israel-Jordan Peace Treaty with King Hussein.</li>
          <li><strong>Paid the Ultimate Sacrifice for Peace:</strong> Stood firm against right-wing incitement until his assassination at a Tel Aviv peace rally on 4 November 1995.</li>
        </ul>
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
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">KEY TOPIC 3 SYNTHESIS</span>
        </div>
      </div>

      <!-- Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 5px 10px; background: #fff; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0 0 2px 0; font-weight: 900; color: #000;">
          KEY TOPIC 3: CHRONOLOGY &amp; DISCIPLINARY MASTERY (1974–1995)
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; line-height: 1.3;">
          Comprehensive revision index of peace diplomacy, military incursions, and Edexcel examination question frameworks.
        </div>
      </div>

      <!-- Chronological Matrix Table -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <div style="background: #0f172a; color: #fff; padding: 4px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px;">
          Key Topic 3 Master Timeline &bull; Critical Chronological Sequence
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.32;">
          <tbody>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; width: 85px; white-space: nowrap;">1974–1975</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a; width: 140px;">Kissinger's Shuttle Diplomacy</td>
              <td style="padding: 3.5px 8px; color: #334155;">Sinai I and II disengagement accords signed; Egypt reopens the Suez Canal to commercial traffic in June 1975.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Nov 1974</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Arafat Addresses the UN</td>
              <td style="padding: 3.5px 8px; color: #334155;">Arafat delivers his famous 'olive branch and gun' speech; UN grants PLO permanent observer status.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">May 1977</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Menachem Begin Elected</td>
              <td style="padding: 3.5px 8px; color: #334155;">Right-wing Likud Party wins Israeli elections, ending 29 years of uninterrupted Labour rule.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Nov 1977</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Sadat Visits Jerusalem</td>
              <td style="padding: 3.5px 8px; color: #334155;">Anwar Sadat addresses the Israeli Knesset in Jerusalem, proclaiming 'No more war' and breaking 30-year deadlock.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Sep 1978</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Camp David Accords</td>
              <td style="padding: 3.5px 8px; color: #334155;">Jimmy Carter brokers peace frameworks between Begin and Sadat after thirteen days of intense mediation.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">26 Mar 1979</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Treaty of Washington</td>
              <td style="padding: 3.5px 8px; color: #334155;">Egypt-Israel Peace Treaty signed; Israel returns Sinai, but Egypt faces total diplomatic boycott by Arab states.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">6 Oct 1981</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Assassination of Sadat</td>
              <td style="padding: 3.5px 8px; color: #334155;">Egyptian Islamic Jihad militants assassinate Anwar Sadat at a military parade in Cairo.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Jun 1982</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Operation Peace for Galilee</td>
              <td style="padding: 3.5px 8px; color: #334155;">Israel invades Lebanon; IDF besieges West Beirut and forces over 14,000 PLO fighters to evacuate to Tunisia.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Sep 1982</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Sabra and Shatila Massacres</td>
              <td style="padding: 3.5px 8px; color: #334155;">Phalangist militiamen butcher civilians in refugee camps; Kahan Commission finds Sharon indirectly responsible.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">Dec 1987</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">First Intifada Erupts</td>
              <td style="padding: 3.5px 8px; color: #334155;">Grassroots uprising begins in Gaza and West Bank; stone-throwers confront Rabin's 'Iron Fist' policy; Hamas founded.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">13 Sep 1993</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Oslo I Accords Signed</td>
              <td style="padding: 3.5px 8px; color: #334155;">Rabin and Arafat shake hands on White House lawn; Palestinian Authority established for interim self-rule.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 8px; font-weight: 800; color: #1e3a8a; white-space: nowrap;">4 Nov 1995</td>
              <td style="padding: 3.5px 8px; font-weight: 700; color: #0f172a;">Assassination of Rabin</td>
              <td style="padding: 3.5px 8px; color: #334155;">Prime Minister Yitzhak Rabin assassinated by Jewish extremist Yigal Amir at a peace rally in Tel Aviv.</td>
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
            <div>&bull; <strong>Shuttle Diplomacy:</strong> Intensive bilateral mediation where an envoy travels between parties refusing direct talks.</div>
            <div>&bull; <strong>Framework for Peace:</strong> The 1978 Camp David accords outlining Egyptian peace and transitional Palestinian autonomy.</div>
            <div>&bull; <strong>Operation Peace for Galilee:</strong> Israeli invasion of Lebanon (1982) aiming to eliminate PLO rocket bases and armed enclaves.</div>
            <div>&bull; <strong>First Intifada:</strong> Grassroots Palestinian uprising (1987–1993) characterized by demonstrations, strikes, and stone-throwing.</div>
            <div>&bull; <strong>UNLU:</strong> Unified National Leadership of the Uprising; underground coalition directing Intifada resistance.</div>
            <div>&bull; <strong>Areas A, B, and C:</strong> Administrative zones created by Oslo II (1995) dividing West Bank civil and military control.</div>
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
              <em>Model Question:</em> &ldquo;Explain one consequence of Anwar Sadat's visit to Jerusalem in November 1977.&rdquo;<br>
              <span style="color: #64748b; font-size: 6.3pt; font-weight: 600;">Formula: Trigger &rarr; Direct diplomatic breakthrough &rarr; Leading to Camp David. (1 paragraph)</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #b45309; padding: 2.5px 5px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #b45309;">Q2: Write an analytical narrative explaining... [8 Marks]</span><br>
              <em>Model Question:</em> &ldquo;Write an analytical narrative explaining the collapse of the peace process between 1993 and 1995. You may use: (1) Hamas suicide bombings, (2) Rabin's assassination.&rdquo;<br>
              <span style="color: #64748b; font-size: 6.3pt; font-weight: 600;">Formula: 3 chronological stages linked with causal connectives (&lsquo;Consequently&rsquo;, &lsquo;As a direct result&rsquo;).</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #15803d; padding: 2.5px 5px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #15803d;">Q3: Explain the importance of... for... [8 Marks]</span><br>
              <em>Model Question:</em> &ldquo;Explain the importance of the Sabra and Shatila massacres (1982) for Israeli domestic politics.&rdquo;<br>
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
              Key Topic 3 Knowledge Quiz &amp; Flashcards
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e293b; line-height: 1.34; margin-bottom: 3.5px;">
            Scan the QR code with any smartphone or tablet camera to launch the interactive, self-marking retrieval bank for Key Topic 3. Test your rapid recall across Shuttle Diplomacy, Camp David, Lebanon (1982), Sabra and Shatila, First Intifada, Oslo Accords, and Rabin's assassination with instant model answers and scoring.
          </div>
          <div style="display: flex; gap: 10px; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 700; color: #475569;">
            <span>&bull; 20 Specification Recall Questions</span>
            <span>&bull; Instant Self-Marking &amp; Explanations</span>
            <span>&bull; Digital Leitner Flashcard Deck</span>
          </div>
        </div>
        <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
          <img src="${qrDataUrl}" alt="Key Topic 3 Quiz QR" style="width: 22mm; height: 22mm; display: block; border: 1px solid #cbd5e1; border-radius: 3px; padding: 1px; background: #fff;">
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
  console.log('🚀 Compiling Publisher-Level Standard Textbook for Middle East Key Topic 3...');

  const htmlContent = await buildPublisherTextbookHtmlKT3();

  // Save HTML companion
  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_KT3_PUBLISHER.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML companion to: ${htmlPath}`);

  // Compile PDF with Puppeteer
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPath = path.join(pdfOutputDir, 'cme_new_textbook_KT3_PUBLISHER.pdf');

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

  console.log(`🎉 Masterpiece PDF Textbook KT3 successfully compiled!`);
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

module.exports = { buildPublisherTextbookHtmlKT3, run };
