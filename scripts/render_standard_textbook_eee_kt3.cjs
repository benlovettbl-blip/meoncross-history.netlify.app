// scripts/render_standard_textbook_eee_kt3.cjs
// 12-Page Publisher-Grade Master Textbook Generator for Early Elizabethan England (KT3)
// Strictly follows 12-page publisher geometry, zero overflow, and institutional neutrality

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const DATA = require('./eee_textbook_data_kt3.cjs');

const HTML_OUTPUT_PATH = path.join(__dirname, '../public/units/eee/textbook_KT3_PUBLISHER.html');
const PDF_OUTPUT_PATH = path.join(__dirname, '../public/pdfs/eee_textbook_KT3_PUBLISHER.pdf');
const PDF_ALIAS_PATH = path.join(__dirname, '../public/pdfs/eee_textbook_KT3.pdf');
const GDRIVE_PATH =
  'G:/My Drive/AAMX/Dep File/Year 11 (GCSE)/Paper 2 - Early Elizabethan England/Early Elizabethan England Master Textbook (KT3).pdf';

function generateHTML(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.title} - ${data.topicTitle}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap');

    :root {
      --primary-navy: #0f172a;
      --accent-crimson: #881337;
      --royal-gold: #b45309;
      --gold-border: #d97706;
      --ink-dark: #0f172a;
      --body-text: #1e293b;
      --muted-text: #475569;
      --parchment-bg: #fffbeb;
      --subtle-card-bg: #f8fafc;
      --border-light: #cbd5e1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      background-color: #525659;
      font-family: 'Newsreader', serif;
      color: var(--body-text);
      line-height: 1.45;
      font-size: 13.5px;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 15mm auto;
      background: #ffffff;
      padding: 16mm 18mm;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }

    @media print {
      body {
        background: none;
      }
      .a4-page {
        margin: 0;
        box-shadow: none;
        width: 210mm;
        height: 297mm;
        max-height: 297mm;
        padding: 14mm 16mm;
      }
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid var(--primary-navy);
      padding-bottom: 4px;
      margin-bottom: 12px;
      font-family: 'Inter', sans-serif;
    }
    .header-series {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent-crimson);
    }
    .header-topic {
      font-size: 8.5px;
      font-weight: 600;
      color: var(--muted-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-light);
      padding-top: 5px;
      margin-top: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      color: var(--muted-text);
    }
    .page-num {
      font-weight: 700;
      color: var(--primary-navy);
    }

    .cover-page {
      padding: 16mm 18mm;
      background: linear-gradient(180deg, #ffffff 0%, #fcfbf7 100%);
    }
    .cover-top {
      text-align: center;
      border-bottom: 3px double var(--royal-gold);
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .cover-badge {
      display: inline-block;
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      background: var(--primary-navy);
      color: #ffffff;
      padding: 4px 14px;
      border-radius: 2px;
      margin-bottom: 8px;
    }
    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 25px;
      font-weight: 900;
      color: var(--primary-navy);
      letter-spacing: 1px;
      line-height: 1.15;
      margin-bottom: 4px;
    }
    .cover-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: var(--accent-crimson);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .cover-enquiry-banner {
      background: var(--parchment-bg);
      border-left: 4px solid var(--royal-gold);
      border-right: 4px solid var(--royal-gold);
      padding: 8px 12px;
      font-style: italic;
      font-size: 13.5px;
      color: var(--primary-navy);
      text-align: center;
    }

    .cover-hero-container {
      width: 100%;
      height: 168mm;
      max-height: 168mm;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    .cover-hero-img {
      width: 100%;
      flex: 1;
      min-height: 0;
      object-fit: contain;
      background: #0f172a;
    }
    .cover-hero-caption {
      padding: 6px 12px;
      font-family: 'Newsreader', serif;
      font-size: 11px;
      color: var(--muted-text);
      background: #ffffff;
      border-top: 1px solid var(--border-light);
      line-height: 1.35;
      font-style: italic;
    }

    .spec-matrix-box {
      background: var(--subtle-card-bg);
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 8px 12px;
    }
    .spec-matrix-title {
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary-navy);
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
    }
    .spec-matrix-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 14px;
    }
    .spec-item {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      line-height: 1.3;
      color: var(--ink-dark);
    }
    .spec-item strong {
      color: var(--accent-crimson);
      font-weight: 700;
    }

    .enquiry-header {
      margin-bottom: 10px;
    }
    .enquiry-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
    }
    .enquiry-badge {
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      font-weight: 800;
      background: var(--accent-crimson);
      color: #ffffff;
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .enquiry-period {
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      font-weight: 700;
      color: var(--royal-gold);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 19px;
      font-weight: 800;
      color: var(--primary-navy);
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .enquiry-focus-box {
      background: var(--parchment-bg);
      border-left: 3px solid var(--accent-crimson);
      padding: 6px 10px;
      font-family: 'Newsreader', serif;
      font-style: italic;
      font-size: 12.5px;
      color: #334155;
      line-height: 1.35;
    }

    .two-column-narrative {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 16px;
      flex: 1;
      min-height: 0;
    }
    .narrative-col-left {
      display: flex;
      flex-direction: column;
      gap: 9px;
      text-align: justify;
    }
    .narrative-col-left p {
      text-indent: 12px;
      font-size: 12.8px;
      line-height: 1.45;
    }
    .narrative-col-left p:first-of-type {
      text-indent: 0;
    }
    .narrative-col-left p:first-of-type::first-letter {
      font-family: 'Cinzel', serif;
      font-size: 34px;
      font-weight: 700;
      float: left;
      line-height: 0.85;
      padding-right: 6px;
      padding-top: 2px;
      color: var(--accent-crimson);
    }

    .narrative-col-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .figure-card {
      background: #ffffff;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .figure-img-box {
      width: 100%;
      height: 48mm;
      background: #0f172a;
      overflow: hidden;
    }
    .figure-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    .figure-caption {
      padding: 5px 8px;
      font-size: 10px;
      line-height: 1.35;
      color: var(--muted-text);
      font-family: 'Newsreader', serif;
      font-style: italic;
      background: #f8fafc;
      border-top: 1px solid var(--border-light);
    }

    .concept-spotlight-box {
      background: var(--subtle-card-bg);
      border: 1px solid #cbd5e1;
      border-left: 3px solid var(--primary-navy);
      border-radius: 3px;
      padding: 8px 10px;
    }
    .spotlight-title {
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--primary-navy);
      margin-bottom: 4px;
    }
    .spotlight-desc {
      font-size: 11.5px;
      line-height: 1.4;
      color: #334155;
    }

    .key-actors-box {
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 7px 9px;
      background: #ffffff;
    }
    .actors-heading {
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--accent-crimson);
      margin-bottom: 5px;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 3px;
    }
    .actor-entry {
      margin-bottom: 4px;
      font-size: 11px;
      line-height: 1.3;
    }
    .actor-name {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      color: var(--primary-navy);
    }
    .actor-role {
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      color: var(--royal-gold);
      font-weight: 600;
      margin-left: 4px;
    }

    .full-narrative-spread {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
      min-height: 0;
    }
    .narrative-prose-block {
      text-align: justify;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .narrative-prose-block p {
      font-size: 13.2px;
      line-height: 1.46;
      text-indent: 14px;
    }
    .narrative-prose-block p:first-of-type {
      text-indent: 0;
    }

    .archival-source-box {
      background: var(--parchment-bg);
      border: 1px solid #d4c5a9;
      border-radius: 4px;
      padding: 10px 14px;
      position: relative;
      margin-top: 4px;
    }
    .archival-source-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      border-bottom: 1px dashed #bfa882;
      padding-bottom: 3px;
    }
    .archival-meta-tag {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--accent-crimson);
    }
    .archival-date {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      font-weight: 700;
      color: var(--royal-gold);
    }
    .archival-source-title {
      font-family: 'Cinzel', serif;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-navy);
      margin-bottom: 4px;
    }
    .archival-source-body {
      font-style: italic;
      font-size: 12.2px;
      line-height: 1.42;
      color: #27272a;
      margin-bottom: 8px;
      padding-left: 8px;
      border-left: 2px solid var(--royal-gold);
    }
    .archival-context-box {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid #e2d9c8;
      border-radius: 3px;
      padding: 6px 10px;
      font-size: 11.2px;
      line-height: 1.38;
      color: #3f3f46;
    }
    .archival-context-box strong {
      color: var(--accent-crimson);
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .vocab-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      background: var(--subtle-card-bg);
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 7px 10px;
      margin-top: 4px;
    }
    .vocab-item {
      font-size: 9.5px;
      line-height: 1.3;
      font-family: 'Inter', sans-serif;
    }
    .vocab-term {
      font-weight: 800;
      color: var(--primary-navy);
      display: block;
      margin-bottom: 2px;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.5px;
    }
    .vocab-def {
      color: var(--muted-text);
      font-family: 'Newsreader', serif;
      font-size: 11px;
    }

    .masterclass-page {
      padding: 15mm 17mm;
    }
    .masterclass-header {
      border-bottom: 2px solid var(--accent-crimson);
      padding-bottom: 6px;
      margin-bottom: 12px;
    }
    .masterclass-badge {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background: var(--accent-crimson);
      color: #ffffff;
      padding: 2px 7px;
      border-radius: 2px;
    }
    .masterclass-title {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 800;
      color: var(--primary-navy);
      margin-top: 3px;
    }
    .masterclass-intro {
      font-size: 12px;
      line-height: 1.38;
      color: var(--muted-text);
      margin-top: 3px;
    }

    .exam-card {
      background: #ffffff;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .exam-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 800;
      color: var(--primary-navy);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }
    .exam-marks {
      color: var(--accent-crimson);
    }
    .exam-q-text {
      font-family: 'Inter', sans-serif;
      font-size: 11.5px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 6px;
      background: #f1f5f9;
      padding: 5px 8px;
      border-left: 3px solid var(--accent-crimson);
    }
    .model-answer-box {
      background: #fdfcf9;
      border: 1px solid #e7dfcf;
      border-left: 3px solid var(--royal-gold);
      padding: 7px 10px;
      font-size: 11.5px;
      line-height: 1.4;
      color: #27272a;
      white-space: pre-line;
    }

    .q2-breakdown-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 6px;
    }
    .q2-step-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3px solid var(--primary-navy);
      padding: 6px 8px;
      border-radius: 3px;
    }
    .q2-step-point {
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      color: var(--primary-navy);
      margin-bottom: 3px;
    }
    .q2-step-text {
      font-size: 10.5px;
      line-height: 1.35;
      color: #334155;
      margin-bottom: 4px;
    }
    .q2-step-exp {
      font-size: 10px;
      line-height: 1.3;
      color: var(--accent-crimson);
      font-style: italic;
      border-top: 1px dashed #cbd5e1;
      padding-top: 3px;
    }

    .back-cover-page {
      padding: 15mm 17mm;
      background: linear-gradient(180deg, #ffffff 0%, #faf8f5 100%);
    }
    .back-cover-header {
      text-align: center;
      border-bottom: 2px solid var(--primary-navy);
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .back-cover-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 800;
      color: var(--primary-navy);
    }
    .back-cover-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
      font-weight: 700;
      color: var(--royal-gold);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 2px;
    }

    .ko-timeline-box {
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 8px 10px;
      background: #ffffff;
      margin-bottom: 8px;
    }
    .ko-title {
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary-navy);
      margin-bottom: 6px;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 3px;
    }
    .ko-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 14px;
    }
    .ko-item {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      line-height: 1.25;
      color: #1e293b;
    }
    .ko-date {
      font-weight: 800;
      color: var(--accent-crimson);
      display: inline-block;
      width: 58px;
    }

    .back-vocab-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px 8px;
      background: #ffffff;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 8px 10px;
      margin-bottom: 8px;
    }
    .back-vocab-item {
      font-size: 8.5px;
      line-height: 1.25;
    }
    .back-vocab-term {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: var(--primary-navy);
      text-transform: uppercase;
      font-size: 8px;
      display: block;
    }
    .back-vocab-def {
      font-family: 'Newsreader', serif;
      font-size: 10.5px;
      color: var(--muted-text);
    }

    .qr-cards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 8px;
    }
    .qr-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3px solid var(--royal-gold);
      border-radius: 3px;
      padding: 5px 6px;
      text-align: center;
    }
    .qr-code-label {
      font-family: 'Inter', sans-serif;
      font-size: 8px;
      font-weight: 800;
      color: var(--royal-gold);
      text-transform: uppercase;
    }
    .qr-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      font-weight: 700;
      color: var(--primary-navy);
      margin: 2px 0;
      line-height: 1.15;
    }
    .qr-card-desc {
      font-size: 7.8px;
      line-height: 1.2;
      color: var(--muted-text);
      font-family: 'Inter', sans-serif;
    }

    .checklist-box {
      background: #ffffff;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 6px 10px;
    }
    .checklist-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--primary-navy);
      margin-bottom: 4px;
    }
    .checklist-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 12px;
    }
    .check-item {
      font-family: 'Inter', sans-serif;
      font-size: 8px;
      line-height: 1.25;
      color: #334155;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .check-box-square {
      width: 8px;
      height: 8px;
      border: 1px solid var(--royal-gold);
      border-radius: 1px;
      flex-shrink: 0;
    }
  </style>
</head>
<body>

  <!-- ============================================================= -->
  <!-- PAGE 1: MASTER FRONT COVER & SPECIFICATION MATRIX              -->
  <!-- ============================================================= -->
  <div class="a4-page cover-page" id="page-1">
    <div class="cover-top">
      <div class="cover-badge">Edexcel GCSE (9–1) History • Paper 2 British Depth Study</div>
      <h1 class="cover-title">Early Elizabethan England, 1558–88</h1>
      <div class="cover-subtitle">${data.topicTitle}</div>
      <div class="cover-enquiry-banner">
        <strong>Overarching Historical Enquiry:</strong> “${data.enquiryQuestion}”
      </div>
    </div>

    <div class="cover-hero-container">
      <img src="${data.coverImage}" class="cover-hero-img" alt="Roanoke Colony">
      <div class="cover-hero-caption">${data.coverCaption}</div>
    </div>

    <div class="spec-matrix-box">
      <div class="spec-matrix-title">
        <span>Edexcel Specification Coverage Matrix (Key Topic 3)</span>
        <span style="color: var(--accent-crimson);">Paper 2 • Option B4</span>
      </div>
      <div class="spec-matrix-grid">
        ${data.specMatrix
          .map(
            (m) => `
          <div class="spec-item">
            <strong>${m.code}: ${m.title}</strong> — ${m.spec}
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer">
      <span>GCSE History Revision Hub • Publisher-Grade Master Series</span>
      <span>${data.period}</span>
      <span class="page-num">Page 1</span>
    </div>
  </div>

  <!-- ============================================================= -->
  <!-- PAGES 2 - 9: THE FOUR CORE HISTORICAL ENQUIRIES (2 PAGES EACH) -->
  <!-- ============================================================= -->
  ${data.enquiries
    .map((enq, idx) => {
      const leftPageNum = 2 + idx * 2;
      const rightPageNum = leftPageNum + 1;

      return `
      <!-- ENQUIRY ${enq.number} (PART 1 - LEFT SPREAD) -->
      <div class="a4-page" id="page-${leftPageNum}">
        <div class="page-header">
          <span class="header-series">Key Topic 3: Society & Exploration • Enquiry ${enq.number}</span>
          <span class="header-topic">Part I: Origins & Narrative Spine</span>
        </div>

        <div class="enquiry-header">
          <div class="enquiry-meta">
            <span class="enquiry-badge">Enquiry ${enq.number}</span>
            <span class="enquiry-period">${data.period}</span>
          </div>
          <h2 class="enquiry-title">${enq.title}</h2>
          <div class="enquiry-focus-box">
            <strong>Enquiry Question:</strong> ${enq.focus}
          </div>
        </div>

        <div class="two-column-narrative">
          <div class="narrative-col-left">
            <p>${enq.paragraphs[0]}</p>
            <p>${enq.paragraphs[1]}</p>
          </div>

          <div class="narrative-col-right">
            <div class="figure-card">
              <div class="figure-img-box">
                <img src="${enq.sideImage}" alt="${enq.keyFigures[0].name}">
              </div>
              <div class="figure-caption">${enq.sideImageCaption}</div>
            </div>

            <div class="concept-spotlight-box">
              <div class="spotlight-title">Historical Spotlight: ${enq.spotlight.title}</div>
              <div class="spotlight-desc">${enq.spotlight.desc}</div>
            </div>

            <div class="key-actors-box">
              <div class="actors-heading">Key Figures & Direct Stakes</div>
              ${enq.keyFigures
                .map(
                  (fig) => `
                <div class="actor-entry">
                  <span class="actor-name">${fig.name}</span>
                  <span class="actor-role">(${fig.role})</span>
                  <div style="color: #475569; font-size: 10px; margin-top: 1px;">${fig.desc}</div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <div class="page-footer">
          <span>Early Elizabethan England, 1558–88 • The History Department</span>
          <span class="page-num">Page ${leftPageNum}</span>
        </div>
      </div>

      <!-- ENQUIRY ${enq.number} (PART 2 - RIGHT SPREAD) -->
      <div class="a4-page" id="page-${rightPageNum}">
        <div class="page-header">
          <span class="header-series">Key Topic 3: Society & Exploration • Enquiry ${enq.number}</span>
          <span class="header-topic">Part II: Primary Evidence & Analysis</span>
        </div>

        <div class="full-narrative-spread">
          <div class="narrative-prose-block">
            <p>${enq.paragraphs[2]}</p>
          </div>

          <div class="archival-source-box">
            <div class="archival-source-header">
              <span class="archival-meta-tag">${enq.source.meta}</span>
              <span class="archival-date">${enq.source.date}</span>
            </div>
            <div class="archival-source-title">${enq.source.title}</div>
            <div class="archival-source-body">${enq.source.body}</div>
            <div class="archival-context-box">
              <strong>Hinge Question for Historical Analysis:</strong>
              ${enq.source.hingeQuestion}
            </div>
          </div>

          <div class="vocab-strip">
            ${enq.vocab
              .map(
                (v) => `
              <div class="vocab-item">
                <span class="vocab-term">${v.term}</span>
                <span class="vocab-def">${v.def}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="page-footer">
          <span>Early Elizabethan England, 1558–88 • The History Department</span>
          <span class="page-num">Page ${rightPageNum}</span>
        </div>
      </div>
    `;
    })
    .join('')}

  <!-- ============================================================= -->
  <!-- PAGE 10: SYNOPTIC ASSESSMENT MATRIX & PAPER 2 Q1/Q2 MASTERCLASS-->
  <!-- ============================================================= -->
  <div class="a4-page masterclass-page" id="page-10">
    <div class="page-header">
      <span class="header-series">Edexcel GCSE History Paper 2 Exam Masterclass</span>
      <span class="header-topic">Key Topic 3 Synthesis</span>
    </div>

    <div class="masterclass-header">
      <span class="masterclass-badge">Examination Strategy</span>
      <h2 class="masterclass-title">Key Topic 3 Synthesis & Feature Analysis</h2>
      <div class="masterclass-intro">${data.examMasterclass.overview}</div>
    </div>

    <div class="exam-card">
      <div class="exam-card-title">
        <span>Question 1: Feature Description (Paper 2 Section B)</span>
        <span class="exam-marks">[4 Marks]</span>
      </div>
      <div class="exam-q-text">${data.examMasterclass.q1.question}</div>
      <div style="font-family: 'Inter', sans-serif; font-size: 10px; color: var(--muted-text); margin-bottom: 5px;">
        <strong>Examiner Rule:</strong> ${data.examMasterclass.q1.structure}
      </div>
      <div class="model-answer-box">
        <strong>Model Answer (Full Marks):</strong><br>
        ${data.examMasterclass.q1.modelAnswer}
      </div>
    </div>

    <div class="exam-card">
      <div class="exam-card-title">
        <span>Question 2: Causal Explanation Masterclass (Paper 2 Section B)</span>
        <span class="exam-marks">[12 Marks]</span>
      </div>
      <div class="exam-q-text">${data.examMasterclass.q2.question}</div>
      <div style="font-family: 'Inter', sans-serif; font-size: 10px; color: var(--muted-text); margin-bottom: 4px;">
        <strong>Stimulus Points Provided:</strong> • ${data.examMasterclass.q2.stimulus[0]} • ${data.examMasterclass.q2.stimulus[1]} <em>(You must also include a third point of own knowledge).</em>
      </div>

      <div class="q2-breakdown-grid">
        ${data.examMasterclass.q2.paragraphs
          .map(
            (p, i) => `
          <div class="q2-step-card">
            <div class="q2-step-point">Para ${i + 1}: ${p.point}</div>
            <div class="q2-step-text"><strong>Evidence:</strong> ${p.evidence}</div>
            <div class="q2-step-exp"><strong>Analysis:</strong> ${p.explanation}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer">
      <span>Early Elizabethan England, 1558–88 • Exam Masterclass</span>
      <span class="page-num">Page 10</span>
    </div>
  </div>

  <!-- ============================================================= -->
  <!-- PAGE 11: 16-MARK ESSAY STRATEGY & HISTORIOGRAPHICAL DEBATE    -->
  <!-- ============================================================= -->
  <div class="a4-page masterclass-page" id="page-11">
    <div class="page-header">
      <span class="header-series">Edexcel GCSE History Paper 2 Exam Masterclass</span>
      <span class="header-topic">16-Mark Essay Strategy</span>
    </div>

    <div class="masterclass-header">
      <span class="masterclass-badge">Essay Architecture</span>
      <h2 class="masterclass-title">Question 3: Judgment & Historical Synthesis [16 Marks]</h2>
      <div class="masterclass-intro">
        Paper 2 Question 3 requires sustained, criteria-led evaluation. Students must write three structured analytical paragraphs plus an authentic, nuanced conclusion that directly answers 'how far'.
      </div>
    </div>

    <div class="exam-card" style="margin-bottom: 8px;">
      <div class="exam-card-title">
        <span>Sample Examination Essay Prompt (Section B)</span>
        <span class="exam-marks">[16 Marks + 4 SPaG]</span>
      </div>
      <div class="exam-q-text">${data.examMasterclass.q3.question}</div>
      <div style="font-family: 'Inter', sans-serif; font-size: 10px; color: var(--muted-text); margin-bottom: 4px;">
        <strong>Stimulus Clues:</strong> • ${data.examMasterclass.q3.stimulus[0]} • ${data.examMasterclass.q3.stimulus[1]}
      </div>
      <div class="model-answer-box" style="font-size: 11px; line-height: 1.38;">
        <strong>Strategic Thesis Statement:</strong> While hostility with the Secotan Native Americans—provoked by Ralph Lane’s heavy-handed military brutality and the assassination of Chief Wingina—severed essential food supplies and made the 1585 Roanoke outpost unviable, it was not the fundamental cause of colonial failure. The primary reasons were structural planning errors: the disastrous loss of seed grain when the <em>Tiger</em> grounded on a sandbar, a colonist cohort composed of aristocratic gentlemen who refused manual labour, and the three-year delay caused by the 1588 Spanish Armada embargo that stranded Governor John White in England.
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 3px solid var(--accent-crimson); padding: 7px 10px; border-radius: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 800; color: var(--accent-crimson); text-transform: uppercase; margin-bottom: 3px;">
          Argument For the Statement (Native Relations)
        </div>
        <div style="font-size: 10.5px; line-height: 1.35; color: #334155;">
          • English colonists lacked fishing and subsistence farming skills and relied entirely on native tribes for food.<br>
          • Ralph Lane responded with extreme paranoia, burning an entire native village over a missing cup and assassinating Chief Wingina.<br>
          • In 1587, native warfare was renewed with the murder of George Howe, forcing John White to leave the settlers isolated.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 3px solid var(--primary-navy); padding: 7px 10px; border-radius: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 800; color: var(--primary-navy); text-transform: uppercase; margin-bottom: 3px;">
          Counter-Argument (Structural & Logistical Planning)
        </div>
        <div style="font-size: 10.5px; line-height: 1.35; color: #334155;">
          • <strong>Loss of Provisions:</strong> The flagship *Tiger* grounded on a sandbar, ruining food casks and seed crops before landing.<br>
          • <strong>Unsuitable Personnel:</strong> Too many 'gentlemen' who refused manual labor and soldiers prone to violence; too few farmers.<br>
          • <strong>The Armada Embargo:</strong> White was stranded in England from 1587 to 1590 because all ships were requisitioned to fight Spain.
        </div>
      </div>
    </div>

    <div class="concept-spotlight-box">
      <div class="spotlight-title">Examiner Verdict Strategy: Linking Triggering Symptoms to Root Causes</div>
      <div class="spotlight-desc" style="font-size: 11px;">
        High-level essays argue that conflict with Native Americans was a <em>symptom</em> of the colonists’ inability to feed themselves. Because the grounding of the *Tiger* and lack of farming skills created desperate starvation, the English were forced into coercive extortion of indigenous food, triggering the warfare that doomed the colony.
      </div>
    </div>

    <div class="page-footer">
      <span>Early Elizabethan England, 1558–88 • Exam Masterclass</span>
      <span class="page-num">Page 11</span>
    </div>
  </div>

  <!-- ============================================================= -->
  <!-- PAGE 12: MASTER KNOWLEDGE ORGANISER & SPEC CHECKLIST          -->
  <!-- ============================================================= -->
  <div class="a4-page back-cover-page" id="page-12">
    <div class="back-cover-header">
      <h2 class="back-cover-title">Key Topic 3: Revision Knowledge Organiser</h2>
      <div class="back-cover-subtitle">Core Chronology • Tier 3 Vocabulary • Specification Audit</div>
    </div>

    <div class="ko-timeline-box">
      <div class="ko-title">Causal Chronology & Turning Points (1558–1590)</div>
      <div class="ko-grid">
        ${data.backCover.knowledgeOrganiser
          .map(
            (k) => `
          <div class="ko-item">
            <span class="ko-date">${k.date}</span> ${k.event}
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="back-vocab-grid">
      ${data.backCover.vocabulary
        .map(
          (v) => `
        <div class="back-vocab-item">
          <span class="back-vocab-term">${v.term}</span>
          <span class="back-vocab-def">${v.def}</span>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="qr-cards-grid">
      ${data.backCover.qrCards
        .map(
          (q) => `
        <div class="qr-card">
          <div class="qr-code-label">Interactive Deck</div>
          <div class="qr-card-title">${q.title}</div>
          <div class="qr-card-desc">${q.desc}</div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="checklist-box">
      <div class="checklist-title">Key Topic 3 Specification Mastery Checklist</div>
      <div class="checklist-grid">
        ${data.backCover.checklist
          .map(
            (c) => `
          <div class="check-item">
            <span class="check-box-square"></span>
            <span>${c}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer">
      <span>GCSE History Revision Hub • Publisher-Grade Master Series</span>
      <span>KT3 Complete</span>
      <span class="page-num">Page 12</span>
    </div>
  </div>

</body>
</html>`;
}

async function renderTextbook() {
  console.log('================================================================');
  console.log('🏛️ RENDERING EARLY ELIZABETHAN ENGLAND KEY TOPIC 3 MASTER TEXTBOOK');
  console.log('================================================================');

  const html = generateHTML(DATA);
  fs.writeFileSync(HTML_OUTPUT_PATH, html, 'utf8');
  console.log('✅ HTML compiled to:', HTML_OUTPUT_PATH);

  console.log('🚀 Launching Puppeteer for A4 PDF compilation & layout audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Page audit
  const pageAudit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a4-page');
    const results = [];
    pages.forEach((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH - clientH;
      results.push({
        pageNum: idx + 1,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: overflow,
      });
    });
    return results;
  });

  console.log('\n📊 Page Height & Overflow Audit (Target: 12 Pages, Max 297mm):');
  let hasOverflow = false;
  pageAudit.forEach((res) => {
    const status =
      res.overflow <= 0 ? '✅ OPTIMAL (0px overflow)' : `❌ OVERFLOW (+${res.overflow}px)`;
    if (res.overflow > 0) hasOverflow = true;
    console.log(
      `   Page ${res.pageNum.toString().padStart(2, ' ')}: ${res.scrollHeight}px / ${res.clientHeight}px | ${status}`,
    );
  });

  if (hasOverflow) {
    console.warn('\n⚠️ WARNING: Content overflow detected on one or more pages!');
  } else {
    console.log('\n🎉 AUDIT PASSED: Perfect 0px overflow across all 12 pages in A4!');
  }

  // Generate PDF
  await page.pdf({
    path: PDF_OUTPUT_PATH,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log('✅ Master Publisher PDF generated:', PDF_OUTPUT_PATH);

  // Synchronize active alias
  fs.copyFileSync(PDF_OUTPUT_PATH, PDF_ALIAS_PATH);
  console.log('✅ Synchronized active alias:', PDF_ALIAS_PATH);

  // Sync to Google Drive
  try {
    const gdriveDir = path.dirname(GDRIVE_PATH);
    if (fs.existsSync(gdriveDir)) {
      fs.copyFileSync(PDF_OUTPUT_PATH, GDRIVE_PATH);
      console.log('✅ Synchronized directly to Google Drive Department File:\n   -', GDRIVE_PATH);
    }
  } catch (err) {
    console.warn('⚠️ Google Drive sync skipped:', err.message);
  }

  await browser.close();
  console.log('🎉 Key Topic 3 Master Textbook compilation complete!\n');
}

renderTextbook().catch((err) => {
  console.error('❌ Error rendering KT3 Master Textbook:', err);
  process.exit(1);
});
