const fs = require('fs');
const path = require('path');

const WORKSHEETS_DIR = path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets');

// Shared CSS styles matching the gold standard of lessons 2, 3, 7, 9
const sharedStyles = `
    :root {
      --ink: #1e293b;
      --ink-muted: #475569;
      --navy-primary: #1e3a8a;
      --navy-deep: #0f172a;
      --parchment: #fdfbf7;
      --accent-gold: #b45309;
      --border-gray: #cbd5e1;
      --card-bg: #ffffff;
      --cut-guide: #94a3b8;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      background: #f1f5f9;
      font-family: 'Inter', sans-serif;
      color: var(--ink);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15mm;
      padding: 15mm 0;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      body {
        background: transparent;
        padding: 0;
        gap: 0;
      }
      .worksheet-page {
        box-shadow: none !important;
        page-break-after: always;
        break-after: page;
        margin: 0;
      }
    }

    .worksheet-page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      position: relative;
      overflow: hidden;
      padding: 6.5mm 7.5mm;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .exercise-book-cutline {
      width: 100%;
      height: 100%;
      border: 1.5px dashed var(--cut-guide);
      border-radius: 6px;
      padding: 4.5mm 5.5mm;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #ffffff;
      box-sizing: border-box;
      overflow: hidden;
    }

    .cut-indicator {
      position: absolute;
      top: -3.5mm;
      left: 14mm;
      background: #ffffff;
      padding: 0 5px;
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--cut-guide);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .sheet-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 2mm;
      flex-shrink: 0;
    }

    .brand-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .brand-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: 'Cinzel', serif;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 1.5px 6px;
      border-radius: 3px;
      letter-spacing: 0.05em;
    }

    .brand-text {
      font-size: 7.5pt;
      font-weight: 700;
      color: var(--navy-primary);
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .student-fields {
      display: flex;
      gap: 12px;
      font-size: 8pt;
      font-weight: 600;
      color: var(--ink);
    }

    .field-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-line {
      display: inline-block;
      width: 32mm;
      border-bottom: 1.2px solid var(--ink);
      height: 3.5mm;
    }

    .field-line.short {
      width: 20mm;
    }

    .enquiry-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
      color: #ffffff;
      border-radius: 5px;
      padding: 2.2mm 3.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.2mm;
      flex-shrink: 0;
    }

    .enquiry-title-group h1 {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.02em;
      line-height: 1.15;
    }

    .enquiry-title-group .enquiry-question {
      font-family: 'Lora', serif;
      font-size: 7.6pt;
      font-style: italic;
      color: #cbd5e1;
      margin-top: 0.4mm;
    }

    .lesson-badge {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 1.5mm 3.5mm;
      border-radius: 4px;
      text-align: center;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* SECTION 1: ARCHIVAL EVIDENCE & STORY CARD */
    .story-evidence-grid {
      display: grid;
      grid-template-columns: 58mm 1fr;
      gap: 3mm;
      margin-bottom: 2.2mm;
      flex-shrink: 0;
    }

    .archival-plate-box {
      border: 1px solid var(--border-gray);
      border-radius: 4px;
      padding: 1.5mm;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .archival-img {
      width: 100%;
      height: 38mm;
      object-fit: contain;
      background: #ffffff;
      border-radius: 3px;
      border: 1px solid #cbd5e1;
    }

    .archival-caption {
      font-size: 6.2pt;
      line-height: 1.25;
      color: var(--ink-muted);
      margin-top: 1mm;
      font-style: italic;
      text-align: center;
    }

    .story-text-box {
      background: var(--parchment);
      border: 1px solid #fed7aa;
      border-left: 3.5px solid var(--accent-gold);
      border-radius: 4px;
      padding: 2.2mm 2.8mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .story-header {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1.2mm;
    }

    .story-prose {
      font-family: 'Lora', serif;
      font-size: 8.1pt;
      line-height: 1.45;
      color: #1e293b;
    }

    .story-prose strong {
      color: var(--navy-primary);
    }

    /* DYNAMIC EXPANDING TASK CARDS */
    .task-card-expand {
      background: #ffffff;
      border: 1.2px solid var(--border-gray);
      border-radius: 5px;
      padding: 2.2mm 3mm;
      display: flex;
      flex-direction: column;
      min-height: 0;
      margin-bottom: 2.2mm;
      box-sizing: border-box;
    }

    .p1-task1 {
      flex: 1.15;
    }

    .p1-task2 {
      flex: 1.05;
      margin-bottom: 0;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5mm;
      padding-bottom: 1mm;
      border-bottom: 1px solid #e2e8f0;
      flex-shrink: 0;
    }

    .task-num-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: var(--navy-deep);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .task-tag {
      font-size: 6.5pt;
      font-weight: 700;
      text-transform: uppercase;
      background: #e0e7ff;
      color: #3730a3;
      padding: 1px 5px;
      border-radius: 3px;
    }

    .artifact-detective-grid {
      display: grid;
      grid-template-columns: 46mm 1fr;
      gap: 3mm;
      flex: 1;
      min-height: 0;
    }

    .artifact-container {
      background: #fdfbf7;
      border: 1px dashed #d97706;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.8mm;
      overflow: hidden;
    }

    .artifact-img {
      width: 42mm;
      height: 38mm;
      object-fit: contain;
      border-radius: 3px;
    }

    .artifact-caption {
      font-size: 6.0pt;
      line-height: 1.25;
      color: var(--ink-muted);
      text-align: center;
      margin-top: 1mm;
      font-style: italic;
    }

    .detective-questions {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.8mm;
      flex: 1;
      min-height: 0;
    }

    .q-block {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .q-item {
      font-size: 7.6pt;
      font-weight: 700;
      color: var(--navy-deep);
      line-height: 1.25;
      flex-shrink: 0;
      margin-bottom: 0.6mm;
    }

    .ruled-handwriting-lines {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      min-height: 0;
    }

    .ruled-line {
      flex: 1;
      min-height: 5.4mm;
      border-bottom: 1.2px dashed #94a3b8;
    }

    /* TASK 2: ACTIVE 3-STAGE CHRONOLOGY */
    .timeline-3col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.8mm;
      flex: 1;
      min-height: 0;
      margin-top: 0.5mm;
    }

    .timeline-step-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-top: 3.5px solid var(--navy-primary);
      border-radius: 4px;
      padding: 1.8mm 2.2mm;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .step-badge {
      font-size: 6.4pt;
      font-weight: 800;
      color: var(--navy-primary);
      margin-bottom: 0.5mm;
      letter-spacing: 0.04em;
      flex-shrink: 0;
    }

    .step-title {
      font-size: 7.4pt;
      font-weight: 700;
      color: var(--navy-deep);
      margin-bottom: 0.5mm;
      flex-shrink: 0;
    }

    .step-desc {
      font-size: 6.6pt;
      color: var(--ink-muted);
      line-height: 1.25;
      margin-bottom: 1mm;
      flex-shrink: 0;
    }

    .step-response-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }

    .sheet-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1.5mm;
      border-top: 1px solid #e2e8f0;
      font-size: 6.8pt;
      color: var(--ink-muted);
      flex-shrink: 0;
      margin-top: 1.5mm;
    }

    /* PAGE 2 STYLES */
    .p2-task3 {
      flex: 1.32;
    }

    .p2-task4 {
      flex: 0.95;
    }

    .p2-task5 {
      flex: 0.95;
      margin-bottom: 0;
    }

    .visual-investigation-grid {
      display: grid;
      grid-template-columns: 66mm 1fr;
      gap: 3.5mm;
      flex: 1;
      min-height: 0;
    }

    .canvas-drawing-col {
      display: flex;
      flex-direction: column;
      min-height: 0;
      height: 100%;
      box-sizing: border-box;
    }

    .drawing-outer-shell {
      flex: 1;
      min-height: 0;
      border: 2px dashed #b45309;
      border-radius: 6px;
      background: #fdfbf7;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3mm;
      box-sizing: border-box;
    }

    .canvas-subcaption {
      font-size: 6.4pt;
      font-weight: 700;
      color: #92400e;
      text-align: center;
      margin-top: 1.5mm;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }

    .investigation-ledger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5mm;
      flex: 1;
      min-height: 0;
    }

    .ledger-row {
      background: #ffffff;
      border: 1px solid #e7e5e4;
      border-left: 3.5px solid var(--navy-primary);
      border-radius: 4px;
      padding: 1.5mm 2.2mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }

    .ledger-item-line {
      display: flex;
      align-items: baseline;
      gap: 4px;
      font-size: 7.3pt;
      font-weight: 700;
      color: var(--navy-deep);
    }

    .ledger-reason-prompt {
      font-size: 6.6pt;
      color: var(--ink-muted);
      margin-top: 0.4mm;
      font-weight: 500;
    }

    /* THINKING HEADS */
    .thinking-heads-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      flex: 1;
      min-height: 0;
      margin-top: 0.5mm;
    }

    .head-card {
      background: #ffffff;
      border: 1px solid var(--border-gray);
      border-radius: 5px;
      padding: 2.2mm 2.8mm;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .head-title-row {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 1mm;
      flex-shrink: 0;
    }

    .head-badge {
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: var(--navy-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6.8pt;
      font-weight: 800;
    }

    .head-name {
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--navy-deep);
    }

    .thought-bubble {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-radius: 5px;
      padding: 2mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }

    .thought-prompt {
      font-size: 7.1pt;
      color: var(--navy-primary);
      font-weight: 600;
      line-height: 1.25;
      flex-shrink: 0;
      margin-bottom: 1mm;
    }

    .bubble-lines {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      min-height: 0;
    }

    .bubble-line {
      border-bottom: 1.2px dashed #94a3b8;
      flex: 1;
      min-height: 5.2mm;
    }

    /* SYNTHESIS FRAME */
    .synthesis-container {
      background: #fdfbf7;
      border: 1.2px solid #fed7aa;
      border-left: 4px solid var(--accent-gold);
      border-radius: 5px;
      padding: 2.2mm 2.8mm;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .synthesis-header {
      font-family: 'Lora', serif;
      font-size: 7.6pt;
      font-style: italic;
      color: var(--navy-primary);
      font-weight: 700;
      margin-bottom: 1mm;
      flex-shrink: 0;
    }
`;

function createWorksheetHtml(meta) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS2 History Worksheet • ${meta.lessonTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
${sharedStyles}
  </style>
</head>
<body>

  <!-- ========================================================
       PAGE 1: SOURCE EVIDENCE & ACTIVE CHRONOLOGY (SHEET 1)
       ======================================================== -->
  <div class="worksheet-page" id="sheet-page-1">
    <div class="exercise-book-cutline">
      <div class="cut-indicator">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
        Cut along dashed line to stick neatly into exercise book
      </div>

      <!-- Masthead -->
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">KS2 HISTORY</span>
          <span class="brand-text">THE HISTORY REVISION HUB • YEAR 5 WORLD WAR II</span>
        </div>
        <div class="student-fields">
          <div class="field-item">Name: <span class="field-line"></span></div>
          <div class="field-item">Date: <span class="field-line short"></span></div>
        </div>
      </div>

      <!-- Enquiry Title -->
      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>${meta.bannerTitle}</h1>
          <p class="enquiry-question">Key Enquiry Question: ${meta.enquiryQuestion}</p>
        </div>
        <div class="lesson-badge">
          ${meta.lessonBadge}<br><span style="font-size: 6.2pt; font-weight:600;">KEY STAGE 2</span>
        </div>
      </div>

      <!-- Section 1: Archival Story & Evidence Card -->
      <div class="story-evidence-grid">
        <div class="archival-plate-box">
          <img src="${meta.sourceImgA}" class="archival-img" alt="${meta.sourceTitleA}">
          <p class="archival-caption"><strong>${meta.sourceTitleA}:</strong> ${meta.sourceCaptionA}</p>
        </div>
        <div class="story-text-box">
          <div class="story-header">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Historical Reading • What this tells us
          </div>
          <p class="story-prose">
            ${meta.storyProse}
          </p>
        </div>
      </div>

      <!-- Task 1: Primary Evidence Detective -->
      <div class="task-card-expand p1-task1">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Task 1: Artifact Detective • ${meta.task1Title}
          </span>
          <span class="task-tag">Primary Evidence</span>
        </div>
        <div class="artifact-detective-grid">
          <div class="artifact-container">
            <img src="${meta.sourceImgB}" class="artifact-img" alt="${meta.sourceTitleB}">
            <p class="artifact-caption"><strong>${meta.sourceTitleB}:</strong> ${meta.sourceCaptionB}</p>
          </div>
          <div class="detective-questions">
            <div class="q-block">
              <p class="q-item">1. ${meta.task1Q1}</p>
              <div class="ruled-handwriting-lines">
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
              </div>
            </div>
            <div class="q-block">
              <p class="q-item">2. ${meta.task1Q2}</p>
              <div class="ruled-handwriting-lines">
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
                <div class="ruled-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task 2: Active Chronological Challenge -->
      <div class="task-card-expand p1-task2">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Task 2: Active Chronological Challenge • ${meta.task2Title}
          </span>
          <span class="task-tag">Chronological Understanding</span>
        </div>
        <div class="timeline-3col">
          <div class="timeline-step-card">
            <span class="step-badge">${meta.stage1Badge}</span>
            <span class="step-title">${meta.stage1Title}</span>
            <p class="step-desc">${meta.stage1Desc}</p>
            <div class="step-response-box">
              <p style="font-size:6.8pt; font-weight:700; color:#1e3a8a; margin-bottom:0.5mm;">${meta.stage1Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
          </div>
          <div class="timeline-step-card">
            <span class="step-badge">${meta.stage2Badge}</span>
            <span class="step-title">${meta.stage2Title}</span>
            <p class="step-desc">${meta.stage2Desc}</p>
            <div class="step-response-box">
              <p style="font-size:6.8pt; font-weight:700; color:#1e3a8a; margin-bottom:0.5mm;">${meta.stage2Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
          </div>
          <div class="timeline-step-card">
            <span class="step-badge">${meta.stage3Badge}</span>
            <span class="step-title">${meta.stage3Title}</span>
            <p class="step-desc">${meta.stage3Desc}</p>
            <div class="step-response-box">
              <p style="font-size:6.8pt; font-weight:700; color:#1e3a8a; margin-bottom:0.5mm;">${meta.stage3Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 History Exercise Book Series</span>
        <span>${meta.lessonBadge} • Sheet 1 of 2 (Trim along dashed outer cutline)</span>
      </div>
    </div>
  </div>

  <!-- ========================================================
       PAGE 2: INQUIRY TASKS & MASTER SYNTHESIS (SHEET 2)
       ======================================================== -->
  <div class="worksheet-page" id="sheet-page-2">
    <div class="exercise-book-cutline">
      <div class="cut-indicator">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
        Cut along dashed line to stick neatly into exercise book
      </div>

      <!-- Masthead -->
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">KS2 ACTIVITY</span>
          <span class="brand-text">${meta.page2Masthead}</span>
        </div>
        <div class="student-fields">
          <div class="field-item">Name: <span class="field-line"></span></div>
          <div class="field-item">${meta.lessonBadge} • Sheet 2</div>
        </div>
      </div>

      <!-- Task 3: Visual Investigation & Tactile Ledger -->
      <div class="task-card-expand p2-task3">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Task 3: Visual Investigation • ${meta.task3Title}
          </span>
          <span class="task-tag">${meta.task3Tag}</span>
        </div>
        <div class="visual-investigation-grid">
          <div class="canvas-drawing-col">
            <div class="drawing-outer-shell">
              ${meta.canvasVisualHtml}
            </div>
            <p class="canvas-subcaption">${meta.canvasInstruction}</p>
          </div>
          <div class="investigation-ledger">
            <div class="ledger-row">
              <div class="ledger-item-line">
                <span>1. ${meta.ledger1Title}</span>
              </div>
              <p class="ledger-reason-prompt">${meta.ledger1Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
            <div class="ledger-row">
              <div class="ledger-item-line">
                <span>2. ${meta.ledger2Title}</span>
              </div>
              <p class="ledger-reason-prompt">${meta.ledger2Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
            <div class="ledger-row">
              <div class="ledger-item-line">
                <span>3. ${meta.ledger3Title}</span>
              </div>
              <p class="ledger-reason-prompt">${meta.ledger3Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
            <div class="ledger-row">
              <div class="ledger-item-line">
                <span>4. ${meta.ledger4Title}</span>
              </div>
              <p class="ledger-reason-prompt">${meta.ledger4Prompt}</p>
              <div class="ruled-line"></div>
              <div class="ruled-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task 4: Thinking Heads -->
      <div class="task-card-expand p2-task4">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Task 4: "Thinking Heads" • Contrasting Historical Perspectives
          </span>
          <span class="task-tag">Contrasting Perspectives</span>
        </div>
        <div class="thinking-heads-grid">
          <div class="head-card">
            <div class="head-title-row">
              <span class="head-badge">1</span>
              <span class="head-name">${meta.head1Name}</span>
            </div>
            <div class="thought-bubble">
              <p class="thought-prompt">${meta.head1Prompt}</p>
              <div class="bubble-lines">
                <div class="bubble-line"></div>
                <div class="bubble-line"></div>
                <div class="bubble-line"></div>
              </div>
            </div>
          </div>
          <div class="head-card">
            <div class="head-title-row">
              <span class="head-badge">2</span>
              <span class="head-name">${meta.head2Name}</span>
            </div>
            <div class="thought-bubble">
              <p class="thought-prompt">${meta.head2Prompt}</p>
              <div class="bubble-lines">
                <div class="bubble-line"></div>
                <div class="bubble-line"></div>
                <div class="bubble-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task 5: Mission Challenge -->
      <div class="task-card-expand p2-task5">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Task 5: Mission Challenge • ${meta.synthesisTitle}
          </span>
          <span class="task-tag">Historian Challenge</span>
        </div>
        <div class="synthesis-container">
          <p class="synthesis-header">Big Question: ${meta.synthesisPrompt}</p>
          <div class="bubble-lines" style="flex:1;">
            <div class="bubble-line"></div>
            <div class="bubble-line"></div>
            <div class="bubble-line"></div>
            <div class="bubble-line"></div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 History Exercise Book Series</span>
        <span>${meta.lessonBadge} • Sheet 2 of 2 (Trim along dashed outer cutline)</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

const lessonsToGenerate = [
  // =========================================================================
  // LESSON 1: OUTBREAK 1939 & GAS MASKS
  // =========================================================================
  {
    filename: 'lesson_01_outbreak_gasmasks_worksheet.html',
    lessonTitle: 'Lesson 1: Outbreak 1939 & Home Front Mobilisation',
    bannerTitle: 'Outbreak 1939 & Home Front Mobilisation',
    enquiryQuestion:
      'Why did ordinary British families carry cardboard boxes and tape their windows in September 1939?',
    lessonBadge: 'LESSON 01',
    sourceImgA: 'gas_masks_children_1939.jpg',
    sourceTitleA: 'Source A (Archival Photograph)',
    sourceCaptionA:
      'Schoolchildren in double file across the playground during a gas mask drill in 1941. (Imperial War Museum)',
    storyProse:
      'On Sunday 3 September 1939, Prime Minister Neville Chamberlain announced over the radio that Britain was at war with Germany. Within fifteen minutes, the first air raid siren sounded across London.<br><br>Fearing that enemy bombers might drop poison gas bombs, the government issued <strong>38 million gas masks</strong> in cardboard boxes with string straps. Even walking to school or playing outside, children had to carry their boxes everywhere and practise wearing them during lessons.',

    task1Title: 'The Civilian Respirator Box',
    sourceImgB: 'gas_mask_box_1939.jpg',
    sourceTitleB: 'Source B (Archival Artifact)',
    sourceCaptionB:
      'Authentic 1939 British civilian respirator with rubber facepiece and original cardboard carton carrier with shoulder cord. (Auckland War Memorial Museum AM 1995.59.20)',
    task1Q1:
      'Look closely at Source B. Why did the government give children cardboard boxes with string straps instead of metal containers, and why was writing their name and address on the label so critical?',
    task1Q2:
      'Comparing Source A and Source B, what does having to carry a gas mask to school every single day tell us about how the threat of war changed ordinary childhood overnight?',

    task2Title: 'The First 72 Hours of War',
    stage1Badge: 'STAGE 1 • 3 SEPT 1939',
    stage1Title: 'The Radio Announcement',
    stage1Desc:
      'Chamberlain speaks at 11:15am. Within minutes, the first wailing air raid siren sounds across Britain.',
    stage1Prompt: 'How would you and your family react to hearing that siren for the first time?',
    stage2Badge: 'STAGE 2 • 4 SEPT 1939',
    stage2Title: 'The Blackout Begins',
    stage2Desc:
      'Streetlights turned off; car lights dimmed; windows covered with thick black curtains or painted.',
    stage2Prompt: 'Why was lighting even a single match outdoors strictly forbidden by Wardens?',
    stage3Badge: 'STAGE 3 • 5 SEPT 1939',
    stage3Title: 'School Playground Drills',
    stage3Desc:
      'Teachers time pupils to fit rubber face masks in 10 seconds and practise doing sums in silence.',
    stage3Prompt: 'What strange sensations and sounds would children experience inside the mask?',

    page2Masthead: 'The Home Front & Blackout Precautions',
    task3Title: 'Gas Mask Carrier Inspection & Daily Emergency Kit',
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #78350f; border-radius:5px; background:#fef3c7; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2mm; box-shadow:inset 0 0 8px rgba(0,0,0,0.05);">
        <div style="position:absolute; top:-3.5mm; width:30mm; height:3.5mm; border:1.8px dashed #92400e; border-bottom:none; border-radius:3px;"></div>
        <div style="font-size:7pt; font-weight:800; color:#78350f; text-transform:uppercase; margin-bottom:1.5mm; text-align:center;">General Civilian<br>Respirator Box</div>
        <div style="width:40mm; height:18mm; border:1px solid #d97706; background:#ffffff; border-radius:3px; padding:1.5mm; font-size:6pt; color:#475569;">
          <strong>PUPIL NAME:</strong><br>
          <strong>SCHOOL / CLASS:</strong><br>
          <strong>HOME ADDRESS:</strong>
        </div>
        <div style="margin-top:1.5mm; font-size:5.8pt; color:#92400e; font-weight:700;">INSPECTED & CERTIFIED • 1939</div>
      </div>
    `,
    canvasInstruction: 'Draw your carrying strap and personalise your gas mask box label above',
    ledger1Title: 'Cardboard Box & Shoulder Strap',
    ledger1Prompt: 'Why must this box never be left behind on a bus, playground, or bedroom?',
    ledger2Title: 'Eye-Piece Anti-Dimming Ointment',
    ledger2Prompt:
      'Why was a small cloth or soap stick stored inside to stop breath fogging the glass?',
    ledger3Title: 'Sticky Window Adhesive Tape',
    ledger3Prompt: 'Why did families criss-cross sticky brown tape across living room windows?',
    ledger4Title: 'National Identity Card (N.I.)',
    ledger4Prompt:
      'Why did every civilian have to carry an identity card with their unique serial number?',

    head1Name: '10-Year-Old London Schoolchild',
    head1Prompt:
      'Prompt: What fears, discomforts, or strange curiosities do you feel carrying this black rubber mask to school on your first day of war?',
    head2Name: 'Air Raid Precautions (ARP) Warden',
    head2Prompt:
      "Prompt: What serious responsibilities do you hold patrolling pitch-black streets at night shouting 'Put that light out!'?",

    synthesisTitle: 'Preparing for Total War',
    synthesisPrompt:
      'In what ways did the outbreak of war and the fear of aerial bombing transform the daily routine of ordinary British schoolchildren within just 72 hours?',
  },

  // =========================================================================
  // LESSON 4: THE BLITZ & AIR RAIDS
  // =========================================================================
  {
    filename: 'lesson_04_the_blitz_shelters_worksheet.html',
    lessonTitle: 'Lesson 4: The Blitz & Air Raid Shelters',
    bannerTitle: 'The Blitz & Garden Air Raid Shelters',
    enquiryQuestion:
      'How did British families survive 57 consecutive nights of bombing, and what was life like inside a shelter?',
    lessonBadge: 'LESSON 04',
    sourceImgA: 'anderson_shelter_family.jpg',
    sourceTitleA: 'Source A (Archival Photograph)',
    sourceCaptionA:
      'Alan and Doris stepping down into their steel Anderson shelter in their London garden during the 1940 Blitz.',
    storyProse:
      'Between September 1940 and May 1941, the German air force bombed British cities for <strong>57 consecutive nights</strong> in a campaign called the Blitz. Over one million London homes were damaged or destroyed.<br><br>To protect families, the government provided curved corrugated steel <strong>Anderson shelters</strong> to bury halfway into back gardens covered with soil and turf. In crowded streets without gardens, thousands sheltered in Underground tube stations, sleeping along the platforms.',

    task1Title: 'Underground Tube Station Shelters',
    sourceImgB: 'tube_station_shelter_1940.jpg',
    sourceTitleB: 'Source B (Archival Photograph)',
    sourceCaptionB:
      'Shelterers sleeping along the curved platform of Swiss Cottage Underground station during the London Blitz, c. 1940. (London Transport Museum / Imperial War Museum)',
    task1Q1:
      'Look closely at Source B. Why did over 150,000 Londoners choose to sleep on dusty Underground platforms rather than stay in their own bedrooms or small back garden shelters?',
    task1Q2:
      'Notice the bunks, blankets, and children sleeping. What were the biggest daily challenges (noise, cold, lack of privacy, sanitation) of living communally underground?',

    task2Title: 'A Night in the Blitz',
    stage1Badge: 'STAGE 1 • 8:00 PM',
    stage1Title: 'The Siren Sounds',
    stage1Desc:
      'The wailing siren gives only three minutes warning. Wardens blow whistles as families scramble outside.',
    stage1Prompt:
      'List 3 essential items your family would grab before running into the dark garden:',
    stage2Badge: 'STAGE 2 • 1:00 AM',
    stage2Title: 'The Raids Overhead',
    stage2Desc:
      'High-explosive bombs shake the earth. Searchlights criss-cross the sky and anti-aircraft guns thunder.',
    stage2Prompt:
      'What sounds and physical sensations would children experience inside the metal shelter?',
    stage3Badge: 'STAGE 3 • 6:30 AM',
    stage3Title: 'The All-Clear Sounds',
    stage3Desc:
      'The steady continuous siren tone announces morning safety. Families emerge to survey street damage.',
    stage3Prompt:
      'What feelings of relief and heartache would neighbours share in the morning light?',

    page2Masthead: 'Shelter Living & Civilian Resilience',
    task3Title: 'Anderson Shelter Architecture & Survival Kit',
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #334155; border-radius:50% 50% 0 0 / 70% 70% 0 0; background:#e2e8f0; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding:2mm; box-shadow:inset 0 0 10px rgba(0,0,0,0.1);">
        <div style="position:absolute; top:2mm; font-size:6.2pt; font-weight:800; color:#1e293b; text-transform:uppercase;">Earth & Turf Mound (3ft)</div>
        <div style="position:absolute; top:6mm; width:44mm; height:20mm; border:1.5px solid #64748b; border-bottom:none; border-radius:50% 50% 0 0; background:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:5.8pt; color:#334155; font-weight:700;">Corrugated Steel Arches</div>
        <div style="width:26mm; height:18mm; border:1.8px solid #0f172a; background:#94a3b8; border-radius:3px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:5.5pt; color:#ffffff; font-weight:700;">
          <span>SHELTER DOOR</span>
          <span>Bunk Beds Inside</span>
        </div>
      </div>
    `,
    canvasInstruction:
      'Annotate the earth mound, corrugated steel arches, and interior bunks above',
    ledger1Title: 'Paraffin Hurricane Lamp & Matches',
    ledger1Prompt: 'Why was having safe lighting vital inside the pitch-black, windowless shelter?',
    ledger2Title: 'Woollen Blankets & Hot Water Bottle',
    ledger2Prompt: 'How did families survive freezing winter nights with cold, damp soil floors?',
    ledger3Title: 'Flask of Hot Tea & Tin of Biscuits',
    ledger3Prompt: 'Why was sharing warm food and drink so important for maintaining high spirits?',
    ledger4Title: 'Battery Radio & Pack of Playing Cards',
    ledger4Prompt: 'Why did parents need games, stories, and songs to distract anxious children?',

    head1Name: 'Mother Sheltering in Garden Anderson',
    head1Prompt:
      'Prompt: What thoughts run through your mind as you hold your children in the damp, shaking shelter listening to overhead bombers?',
    head2Name: 'Auxiliary Fireman (AFS) on the Street',
    head2Prompt:
      'Prompt: What immense dangers do you face clambering across burning rooftops to extinguish incendiary bombs with water hoses?',

    synthesisTitle: 'Courage Under Fire',
    synthesisPrompt:
      "Why was British civilian resilience and community solidarity described as the 'secret weapon' that prevented Hitler from breaking Britain's morale during the Blitz?",
  },

  // =========================================================================
  // LESSON 5: DIG FOR VICTORY & FOOD RATIONING
  // =========================================================================
  {
    filename: 'lesson_05_dig_for_victory_rationing_worksheet.html',
    lessonTitle: 'Lesson 5: Dig for Victory & Wartime Food Rationing',
    bannerTitle: 'Dig for Victory & Food Rationing',
    enquiryQuestion:
      'Why did cabbages and carrots become weapons of war on the British Home Front?',
    lessonBadge: 'LESSON 05',
    sourceImgA: 'dig_for_victory_poster.jpg',
    sourceTitleA: 'Source A (Ministry of Agriculture Poster)',
    sourceCaptionA:
      'A famous 1940 "Dig for Victory" poster showing a young boy with a spade and hoe marching to turn garden soil into food.',
    storyProse:
      'Before the war, Britain imported <strong>55 million tonnes of food</strong> each year by merchant ship. When German U-boat submarines began sinking cargo vessels in the Atlantic, food supplies dropped dangerously low.<br><br>The government introduced rationing: every person received a Ration Book with coupons for meat, butter, sugar, and eggs. Meanwhile, the "Dig for Victory" campaign urged families to turn flowerbeds, parks, and school lawns into vegetable allotments.',

    task1Title: 'The Ministry of Food Ration Book',
    sourceImgB: 'ration_book_coupons_1940.jpg',
    sourceTitleB: 'Source B (Archival Document)',
    sourceCaptionB:
      "Authentic Ministry of Food Child's Ration Book with coupons for bacon, sugar, meat, butter, and margarine. (Wellcome Collection L0072436)",
    task1Q1:
      'Look closely at Source B. Why did every citizen, rich or poor, have to register with a local grocer and surrender official paper coupons to buy basic weekly food?',
    task1Q2:
      'Look at Source A. Why did the government target children and families with positive gardening posters rather than frightening them with messages of starvation?',

    task2Title: "The Battle for the Nation's Larder",
    stage1Badge: 'STAGE 1 • JAN 1940',
    stage1Title: 'Rationing Begins',
    stage1Desc:
      'Bacon, butter, and sugar rationed first. Weekly butter allowance is just 50g (two small pats) per person.',
    stage1Prompt: 'How would a family with three children change their daily breakfast routine?',
    stage2Badge: 'STAGE 2 • OCT 1940',
    stage2Title: 'Dig for Victory Campaign',
    stage2Desc:
      'Lawns, flowerbeds, and golf courses ploughed. Over 1.4 million allotments produce fresh root vegetables.',
    stage2Prompt: 'Why did growing food at home directly save the lives of merchant navy sailors?',
    stage3Badge: 'STAGE 3 • 1941',
    stage3Title: 'Lord Woolton & Waste Laws',
    stage3Desc:
      "Wasting food made a crime. Families collect kitchen scraps for pig clubs; mothers bake 'Woolton Pie'.",
    stage3Prompt: 'Why was throwing away stale bread or potato peelings punished with heavy fines?',

    page2Masthead: 'Ration Books & Allotment Harvests',
    task3Title: 'Wartime Ration Book Allowance & Allotment Menu',
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #b45309; border-radius:5px; background:#fef3c7; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:2.5mm; box-shadow:inset 0 0 8px rgba(0,0,0,0.06);">
        <div style="font-size:7pt; font-weight:900; color:#78350f; text-transform:uppercase; text-align:center; border-bottom:1.5px solid #d97706; width:100%; padding-bottom:1mm;">Ministry of Food<br>Weekly Ration Allowance</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5mm; width:100%; font-size:5.8pt; color:#451a03; font-weight:700;">
          <div style="background:#ffffff; border:1px solid #d97706; padding:1mm; border-radius:2px; text-align:center;">1 EGG<br><span style="font-size:5pt; color:#78350f;">Per Week</span></div>
          <div style="background:#ffffff; border:1px solid #d97706; padding:1mm; border-radius:2px; text-align:center;">50g BUTTER<br><span style="font-size:5pt; color:#78350f;">Per Person</span></div>
          <div style="background:#ffffff; border:1px solid #d97706; padding:1mm; border-radius:2px; text-align:center;">100g BACON<br><span style="font-size:5pt; color:#78350f;">2 Rashers</span></div>
          <div style="background:#ffffff; border:1px solid #d97706; padding:1mm; border-radius:2px; text-align:center;">225g SUGAR<br><span style="font-size:5pt; color:#78350f;">For Baking</span></div>
        </div>
        <div style="font-size:5.6pt; font-weight:700; color:#92400e; text-align:center;">COUPON SHEET • YEAR 5 ALLOTMENT</div>
      </div>
    `,
    canvasInstruction:
      'Examine the weekly allowance coupon stamps above and design your daily meals',
    ledger1Title: "The Famous 'Woolton Pie'",
    ledger1Prompt:
      'How did combining turnips, carrots, and potatoes with oatmeal crust create a nutritious family meal?',
    ledger2Title: 'National Dried Milk & Rosehip Syrup',
    ledger2Prompt:
      'Why did the government provide special vitamin syrups to children and expectant mothers?',
    ledger3Title: 'School Vegetable Patches',
    ledger3Prompt:
      'How did schoolchildren helping to dig allotments after class support the national war effort?',
    ledger4Title: 'The Street Pig Club & Scrap Bins',
    ledger4Prompt:
      'Why did neighbours save vegetable peelings in street bins to feed community-reared pigs?',

    head1Name: 'Ministry of Food Inspector',
    head1Prompt:
      'Prompt: Why is it your vital national duty to prevent black-market food hoarding and ensure fair shares for every family?',
    head2Name: 'British Mother Planning Meals',
    head2Prompt:
      'Prompt: How do you use resourcefulness and imagination to stretch a tiny weekly ration of butter and meat to feed hungry children?',

    synthesisTitle: 'Fair Shares for All',
    synthesisPrompt:
      'Why was the British wartime rationing system considered one of the fairest, healthiest, and most successful government social policies in modern British history?',
  },

  // =========================================================================
  // LESSON 6: WOMEN AT WAR & THE LAND ARMY
  // =========================================================================
  {
    filename: 'lesson_06_women_at_war_land_army_worksheet.html',
    lessonTitle: 'Lesson 6: Women at War & The Land Army',
    bannerTitle: 'Women at War & The Land Army',
    enquiryQuestion:
      'How did women keep Britain running on farms, in factories, and behind the front line?',
    lessonBadge: 'LESSON 06',
    sourceImgA: 'womens_land_army_harvest.jpg',
    sourceTitleA: 'Source A (Wartime Painting)',
    sourceCaptionA:
      'Land-girls resting under the shade of a tree during a harvest day in 1941, painted by Thomas Hennell. (Imperial War Museum)',
    storyProse:
      'With millions of young men drafted into the armed forces, Britain faced an acute labour shortage. For the first time in British history, women were called up to serve their country in industry, transport, and agriculture.<br><br>Over <strong>80,000 volunteers</strong> joined the Women\'s Land Army ("Land Girls"), working 50-hour weeks driving tractors, milking cows, and harvesting crops. Others built fighter planes, drove buses, and operated radar stations.',

    task1Title: "Women's Land Army Recruitment",
    sourceImgB: 'land_army_poster_1941.jpg',
    sourceTitleB: 'Source B (Recruitment Poster)',
    sourceCaptionB:
      '1941 recruitment poster: "Come and Help with the Victory Harvest - Join the Women\'s Land Army", depicting a smiling Land Girl. (Ministry of Agriculture / HMSO)',
    task1Q1:
      'Look closely at Source B. How did recruitment posters persuade city women that physical farm labour in the countryside was a patriotic and rewarding duty?',
    task1Q2:
      "Comparing Source A and Source B, what were the physical realities of working 50-hour weeks in mud, rain, and winter cold compared to the poster's sunny image?",

    task2Title: 'Mobilising the Female Workforce',
    stage1Badge: 'STAGE 1 • 1939',
    stage1Title: 'The Volunteer Call',
    stage1Desc:
      'Young women volunteer for the Land Army. Issued green jerseys, brown breeches, and timber boots.',
    stage1Prompt:
      'What would a young woman from a city office find hardest on her first week on a farm?',
    stage2Badge: 'STAGE 2 • DEC 1941',
    stage2Title: 'Conscription of Women',
    stage2Desc:
      'Britain becomes the first nation to legally conscript unmarried women aged 20-30 for war industry.',
    stage2Prompt:
      'Why was conscripting women seen as a revolutionary moment in British social history?',
    stage3Badge: 'STAGE 3 • 1943',
    stage3Title: 'The Peak Industrial Effort',
    stage3Desc:
      'Women produce 70% of munitions, weld tank hulls, assemble Spitfires, and plot radar signals.',
    stage3Prompt:
      'How did building fighter aircraft prove women were just as capable as male engineers?',

    page2Masthead: 'Factories, Farms & Airfields',
    task3Title: "Women's Land Army Service Armlet & Farm Duties",
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #166534; border-radius:5px; background:#f0fdf4; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:2.5mm; box-shadow:inset 0 0 8px rgba(0,0,0,0.05);">
        <div style="font-size:7pt; font-weight:900; color:#14532d; text-transform:uppercase; text-align:center; border-bottom:1.5px solid #22c55e; width:100%; padding-bottom:1mm;">Women's Land Army<br>Official Armlet & Badge</div>
        <div style="width:38mm; height:20mm; border:2px solid #15803d; background:#166534; border-radius:4px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#ffffff;">
          <div style="font-size:10pt; font-weight:900; letter-spacing:0.1em;">W L A</div>
          <div style="font-size:5.5pt; letter-spacing:0.05em; color:#86efac;">TIMBER & AGRICULTURE</div>
        </div>
        <div style="font-size:5.6pt; font-weight:700; color:#166534; text-align:center;">SERVICE BADGE • DEVONSHIRE HOSTEL</div>
      </div>
    `,
    canvasInstruction: 'Annotate the official WLA armlet and bronze service badge above',
    ledger1Title: 'Dawn Milking (5:00 AM)',
    ledger1Prompt:
      "Why was rising before dawn in freezing unheated barns essential to maintain Britain's milk supply?",
    ledger2Title: 'Heavy Tractor Ploughing',
    ledger2Prompt:
      'How did operating heavy mechanical machinery shatter old stereotypes about female physical strength?',
    ledger3Title: "The Women's Timber Corps ('Lumber Jills')",
    ledger3Prompt:
      'Why was felling giant trees vital to provide wooden pit props for coal mines and railways?',
    ledger4Title: 'Harvesting Grain & Pest Control',
    ledger4Prompt:
      'Why was catching rats and gathering every ear of wheat described as frontline economic defence?',

    head1Name: 'Munitions Factory Worker',
    head1Prompt:
      'Prompt: What immense pressures and physical dangers do you face working 12-hour night shifts assembling explosive shells and Spitfires?',
    head2Name: 'City Volunteer Land Girl',
    head2Prompt:
      'Prompt: How has trading your comfortable London shop job for muddy boots, blistered hands, and rural farm life changed your view of yourself?',

    synthesisTitle: 'The Decisive Home Front Army',
    synthesisPrompt:
      'Why could Britain not have survived, fed its population, or won the Second World War without the mass mobilization of millions of women?',
  },

  // =========================================================================
  // LESSON 8: SECRET CODEBREAKERS & BLETCHLEY PARK
  // =========================================================================
  {
    filename: 'lesson_08_bletchley_codebreakers_worksheet.html',
    lessonTitle: 'Lesson 8: Secret Codebreakers & Bletchley Park',
    bannerTitle: 'Secret Codebreakers & The Enigma Machine',
    enquiryQuestion:
      'How did Alan Turing and the secret minds at Bletchley Park crack the unbreakable German cipher?',
    lessonBadge: 'LESSON 08',
    sourceImgA: 'enigma_machine_bletchley.jpg',
    sourceTitleA: 'Source A (Museum Artifact)',
    sourceCaptionA:
      'An Enigma cipher machine showing its alphabetical keyboard, illuminating lampboard, and spinning rotor wheels. (Bletchley Park Trust)',
    storyProse:
      'The German military used an electrical cipher typewriter called the <strong>Enigma machine</strong> to scramble battle orders. With spinning rotor wheels and plugboard cables, Enigma could scramble a message into <strong>158 million million million combinations</strong>.<br><br>At secret Bletchley Park in Buckinghamshire, genius mathematician Alan Turing and thousands of young codebreakers designed electromechanical "Bombe" machines that tested combinations at lightning speed, breaking the code daily.',

    task1Title: "Alan Turing's Bombe Machine",
    sourceImgB: 'bombe_bletchley_park.jpg',
    sourceTitleB: 'Source B (Archival Photograph)',
    sourceCaptionB:
      'The towering electromechanical Bombe machine in Hut 11, with dozens of spinning coloured drums designed to decipher Enigma keys.',
    task1Q1:
      'Look closely at Source B. Why did Alan Turing realize that only an electromechanical machine (the Bombe) could test thousands of cipher combinations fast enough to save lives?',
    task1Q2:
      'Looking at Source A and Source B, why was the midnight reset of German cipher keys such a desperate daily race against time for codebreakers?',

    task2Title: 'The Codebreaking Pipeline',
    stage1Badge: 'STAGE 1',
    stage1Title: 'Radio Intercept (Y-Stations)',
    stage1Desc:
      'Coastal listening stations intercept Morse code radio signals transmitted by German U-boats and armies.',
    stage1Prompt:
      'Why did listening operators need lightning-fast ears to transcribe Morse code dits and dahs?',
    stage2Badge: 'STAGE 2',
    stage2Title: 'Hut 8 & The Turing Bombes',
    stage2Desc:
      "Coded slips rushed to Bletchley. Bombes whirr through rotor settings to find the day's secret key.",
    stage2Prompt:
      "What went through codebreakers' minds when the machine suddenly stopped on a winning match?",
    stage3Badge: 'STAGE 3',
    stage3Title: "'Ultra' Secret Intelligence",
    stage3Desc:
      'Decrypted battle orders delivered to Churchill in locked yellow dispatch boxes to re-route convoys.',
    stage3Prompt:
      'Why was keeping the secret that Britain had cracked Enigma just as critical as breaking the code?',

    page2Masthead: 'Alan Turing & The Bombe Machines',
    task3Title: 'The Enigma Rotor Mechanism & Cipher Wheel',
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #1e3a8a; border-radius:50%; background:#f8fafc; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2mm; box-shadow:inset 0 0 10px rgba(0,0,0,0.1);">
        <div style="position:absolute; width:44mm; height:44mm; border:1.5px dashed #3b82f6; border-radius:50%;"></div>
        <div style="width:28mm; height:28mm; border:2px solid #0f172a; border-radius:50%; background:#e2e8f0; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:6pt; font-weight:800; color:#0f172a; text-align:center;">
          <span>ROTOR I</span>
          <span style="font-size:8pt; color:#1e3a8a;">A → X</span>
          <span style="font-size:5pt; color:#475569;">ELECTRIC CONTACTS</span>
        </div>
        <div style="position:absolute; bottom:2.5mm; font-size:5.5pt; font-weight:800; color:#1e3a8a;">PLUGBOARD STECKER</div>
      </div>
    `,
    canvasInstruction:
      'Annotate the outer letter ring, internal wiring, and stepping ratchet above',
    ledger1Title: 'The Plugboard (Steckerboard)',
    ledger1Prompt:
      'How did swapping 10 pairs of letters before the rotors turned create millions of extra combinations?',
    ledger2Title: 'The Three Spinning Rotors',
    ledger2Prompt:
      'Why did the rotor wheel stepping forward with every keystroke prevent simple letter-frequency decoding?',
    ledger3Title: 'The Reflector (Umkehrwalze)',
    ledger3Prompt:
      'Why was the rule that a letter could never be encrypted as itself the fatal flaw Turing exploited?',
    ledger4Title: 'The 30-Year Secrecy Oath',
    ledger4Prompt:
      'Why did over 10,000 workers at Bletchley never tell their spouses or families what they did for 30 years?',

    head1Name: 'Alan Turing (Mathematician & Pioneer)',
    head1Prompt:
      'Prompt: What mathematical breakthrough convinced you that logic machines could defeat human ciphers and save millions of Allied lives?',
    head2Name: 'Wren Operating the Bombe in Hut 11',
    head2Prompt:
      'Prompt: What does it feel like to spend 8 hours in deafening mechanical rotor noise knowing your dials might save a convoy at sea tonight?',

    synthesisTitle: 'Shortening the War',
    synthesisPrompt:
      'Historians calculate that Bletchley Park shortened the war by up to two years. How did silent codebreaking in secret wooden huts save millions of civilian and soldier lives?',
  },

  // =========================================================================
  // LESSON 10: VE DAY, REBUILDING & REMEMBRANCE
  // =========================================================================
  {
    filename: 'lesson_10_ve_day_remembrance_worksheet.html',
    lessonTitle: 'Lesson 10: VE Day, Rebuilding & Remembrance',
    bannerTitle: 'VE Day & The End of War in Europe',
    enquiryQuestion:
      'Why did millions celebrate with street parties on 8 May 1945, and what challenges lay ahead?',
    lessonBadge: 'LESSON 10',
    sourceImgA: 've_day_street_party_1945.jpg',
    sourceTitleA: 'Source A (Archival Photograph)',
    sourceCaptionA:
      "A vast crowd of celebrating citizens fills Trafalgar Square beneath Nelson's Column on 8 May 1945. (Imperial War Museum)",
    storyProse:
      'On Tuesday 8 May 1945, Prime Minister Winston Churchill announced that Nazi Germany had surrendered. After <strong>five years, eight months, and four days</strong> of air raids, blackout, and separation, the war in Europe was finally over.<br><br>Across Britain, communities dragged tables into the middle of bomb-damaged streets, decorated houses with Union flags, and shared precious saved ration sweets so children could celebrate peace.',

    task1Title: 'The Bomb-Damaged Street Party',
    sourceImgB: 've_day_children_table_1945.jpg',
    sourceTitleB: 'Source B (Archival Photograph)',
    sourceCaptionB:
      'Two young girls wave Union flags amidst the bomb rubble and ruined brickwork of Battersea, London, on VE Day, 8 May 1945. (Imperial War Museum HU 49414)',
    task1Q1:
      'Look closely at Source B. Notice the rubble and ruined brickwork behind the children. What does this contrast between destruction and celebration tell us about civilian resilience?',
    task1Q2:
      'Families saved sugar, margarine, and jam coupons for months to bake treats for this single afternoon. Why was giving children a street party so important to British mothers?',

    task2Title: '8 May 1945: The Day Peace Arrived',
    stage1Badge: 'STAGE 1 • 3:00 PM',
    stage1Title: "Churchill's Broadcast",
    stage1Desc:
      'Crowds gather around wireless sets in silence to hear Churchill proclaim: "The German war is at an end!"',
    stage1Prompt:
      'What emotions would sweep through a family hearing the prime minister utter those words?',
    stage2Badge: 'STAGE 2 • 6:00 PM',
    stage2Title: 'The Street Party Feasts',
    stage2Desc:
      'Tables dragged onto pavements. Pianos wheeled out. Neighbours sing wartime songs and dance the conga.',
    stage2Prompt:
      'Why did neighbours who had sheltered together through the Blitz share such unbreakable bonds?',
    stage3Badge: 'STAGE 3 • 10:00 PM',
    stage3Title: 'Floodlights and Bonfires',
    stage3Desc:
      "Blackout ended. For the first time in six years, bright floodlights illuminate St Paul's Cathedral and Big Ben.",
    stage3Prompt:
      'Why was switching on the lights across Britain the most powerful symbol of victory?',

    page2Masthead: 'Peace, Rebuilding & Remembrance',
    task3Title: 'VE Day Street Party Planner & Community Table Canvas',
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #1e3a8a; border-radius:5px; background:#eff6ff; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:2mm; box-shadow:inset 0 0 8px rgba(0,0,0,0.05);">
        <div style="width:100%; display:flex; justify-content:space-around; border-bottom:1.5px dashed #dc2626; padding-bottom:1mm;">
          <span style="font-size:7pt;">🚩</span><span style="font-size:7pt;">🇬🇧</span><span style="font-size:7pt;">🚩</span><span style="font-size:7pt;">🇬🇧</span><span style="font-size:7pt;">🚩</span>
        </div>
        <div style="width:42mm; height:24mm; border:1.8px solid #94a3b8; background:#ffffff; border-radius:3px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5mm; font-size:6.2pt; color:#1e3a8a; font-weight:800; text-align:center;">
          <span>COMMUNITY PEACE TABLE</span>
          <span style="font-size:5.2pt; color:#64748b; font-weight:600; margin-top:1mm;">Sandwiches • Jelly • Scones • Tea</span>
          <span style="font-size:5.2pt; color:#b91c1c; font-weight:700; margin-top:1mm;">WELCOME HOME HEROES</span>
        </div>
        <div style="font-size:5.6pt; font-weight:700; color:#1e3a8a; text-align:center;">STREET CELEBRATION • 8 MAY 1945</div>
      </div>
    `,
    canvasInstruction: 'Draw your community bunting flags and celebration table arrangement above',
    ledger1Title: 'The Pooled Ration Sweet Feast',
    ledger1Prompt:
      'How did children sharing saved chocolate and homemade jam tarts create a festive celebration?',
    ledger2Title: 'The Empty Chairs of Remembrance',
    ledger2Prompt:
      'Why did many mothers and soldiers feel quiet tears of sorrow amidst the cheering crowds?',
    ledger3Title: 'Continuing Post-War Rationing',
    ledger3Prompt:
      'Why did food and clothing rationing have to continue for years after 1945 across Britain?',
    ledger4Title: 'Rebuilding Bomb-Damaged Britain',
    ledger4Prompt:
      'With 1 in 3 homes damaged, how did Britain begin building new prefabricated houses and schools?',

    head1Name: '10-Year-Old London Child at the Party',
    head1Prompt:
      'Prompt: You have lived almost your entire memory in blackout, sirens, and fear. How does it feel to see the street bathed in bright light and laughter?',
    head2Name: 'Returning Soldier Surveying His Street',
    head2Prompt:
      'Prompt: What mixed feelings of profound joy and quiet sorrow do you feel looking at your bomb-damaged neighbourhood and missing friends?',

    synthesisTitle: 'Lessons for Tomorrow',
    synthesisPrompt:
      'Why is it vital that we continue to remember the sacrifices, courage, and lessons of the Second World War generation today?',
  },

  // =========================================================================
  // LESSON 11: AFTER THE WAR • THE WINDERMERE CHILDREN (1945)
  // =========================================================================
  {
    filename: 'lesson_11_windermere_children_worksheet.html',
    lessonTitle: 'Lesson 11: After the War — The Windermere Children & Rebuilding Lives',
    bannerTitle: 'After the War • The Windermere Children',
    enquiryQuestion:
      'How did 300 child survivors rebuild their lives by Lake Windermere in August 1945?',
    lessonBadge: 'LESSON 11',
    sourceImgA: 'windermere_children_calgarth_1945.jpg',
    sourceTitleA: 'Source A (Archival Photograph)',
    sourceCaptionA:
      'Child survivors arrive at the Calgarth Estate by Lake Windermere in August 1945 to begin their recovery. (Lake District Holocaust Project)',
    storyProse:
      'In August 1945, three months after the war in Europe ended, ten RAF Stirling bombers flew 300 exhausted child survivors from Prague to Carlisle Airport. These children had survived the horrors of Nazi concentration camps after borders shut on 1 September 1939.<br><br>They were brought to the idyllic <strong>Calgarth Estate by Lake Windermere</strong>. Here, volunteers, doctors, and psychologists gave them clean beds, hot food, swimming in the lake, and red bicycles, helping them begin the long journey to rebuild their shattered lives.',

    task1Title: 'From Auschwitz to Ambleside • Primary & Literary Detective',
    sourceImgB: 'tom_palmer_after_the_war.jpg',
    sourceTitleB: 'Source B (Historical Fiction Cover)',
    sourceCaptionB:
      'Cover of "After the War: From Auschwitz to Ambleside" by Tom Palmer (illustrated by Violet Tobacco, Barrington Stoke), based on real survivor testimonies.',
    task1Q1:
      'Author Tom Palmer based his novel on real survivor testimonies from the Lake District Holocaust Project. Why is historical fiction a powerful way to help us understand real historical events?',
    task1Q2:
      'When the children first arrived at Calgarth, many hid bread under their pillows because they were terrified food would run out. What does this reveal about the severe trauma they carried?',

    task2Title: 'August 1945: The Journey to Windermere',
    stage1Badge: 'STAGE 1 • PRAGUE AIRLIFT',
    stage1Title: 'The Stirling Bombers',
    stage1Desc:
      'RAF bombers fly 300 orphaned children from Czechoslovakia to Britain. Many had never flown before.',
    stage1Prompt:
      'What mixture of bewilderment and relief would a child feel stepping aboard an Allied aircraft in 1945?',
    stage2Badge: 'STAGE 2 • CALGARTH ESTATE',
    stage2Title: 'Sanctuary by the Lake',
    stage2Desc:
      'Arriving at wooden chalets surrounded by fells and water. Clean sheets, hot soup, and medical examinations.',
    stage2Prompt:
      'Why was the tranquil, natural beauty of the Lake District chosen as an ideal setting for psychological healing?',
    stage3Badge: 'STAGE 3 • REBUILDING CHILDHOOD',
    stage3Title: 'Bicycles, Swimming & Hope',
    stage3Desc:
      'Local residents donate 300 red bicycles. The children learn English, play football, swim, and forge lifelong bonds.',
    stage3Prompt:
      'How did simple activities like riding a bicycle help children rediscover what it meant to be a child?',

    page2Masthead: 'The Windermere Sanctuary & Oral History',
    task3Title: 'Windermere Sanctuary Map & Calgarth Recovery Ledger',
    task3Tag: 'Tactile Investigation',
    canvasVisualHtml: `
      <div style="width:52mm; height:50mm; border:2px solid #047857; border-radius:5px; background:#ecfdf5; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:2mm; box-shadow:inset 0 0 8px rgba(0,0,0,0.05);">
        <div style="width:100%; display:flex; justify-content:space-around; border-bottom:1.5px dashed #059669; padding-bottom:1mm;">
          <span style="font-size:7pt;">🚲</span><span style="font-size:7pt;">🌲</span><span style="font-size:7pt;">🏕️</span><span style="font-size:7pt;">🌊</span><span style="font-size:7pt;">🚲</span>
        </div>
        <div style="width:42mm; height:24mm; border:1.8px solid #059669; background:#ffffff; border-radius:3px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5mm; font-size:6.2pt; color:#065f46; font-weight:800; text-align:center;">
          <span>CALGARTH ESTATE • 1945</span>
          <span style="font-size:5.2pt; color:#047857; font-weight:600; margin-top:1mm;">Lake Windermere Sanctuary</span>
          <span style="font-size:5.2pt; color:#b45309; font-weight:700; margin-top:1mm;">300 RECOVERING CHILDREN</span>
        </div>
        <div style="font-size:5.6pt; font-weight:700; color:#065f46; text-align:center;">TROUTBECK BRIDGE • WINDERMERE</div>
      </div>
    `,
    canvasInstruction:
      'Draw or annotate the Calgarth chalets, Lake Windermere, and recovery activities above',
    ledger1Title: 'Kindertransport vs Windermere Contrast',
    ledger1Prompt:
      'How did the 1938–39 Kindertransport (rescued before war) differ from the 1945 Windermere arrival (survivors of camps)?',
    ledger2Title: 'The Symbol of the Red Bicycle',
    ledger2Prompt:
      'Why did riding bicycles freely along country lanes represent liberation and restored childhood for these boys and girls?',
    ledger3Title: "The '45 Aid Society & Family Bonds",
    ledger3Prompt:
      'Having lost almost all their biological families, how did the 300 children become brothers and sisters for life?',
    ledger4Title: 'Tom Palmer & Preserving Oral History',
    ledger4Prompt:
      'Why is it vital that authors and historians interview living survivors before their firsthand voices are lost?',

    head1Name: 'Arek (15-Year-Old Camp Survivor)',
    head1Prompt:
      'Prompt: You have endured years of hunger and cruelty. You are handed a new red bicycle and told you are safe by the lake. What thoughts race through your mind?',
    head2Name: 'Marie Paneth (Art Therapist at Calgarth)',
    head2Prompt:
      'Prompt: You give paper and paints to children who cannot yet speak English. How does art help them express grief and begin to smile again?',

    synthesisTitle: 'From Darkness to New Life',
    synthesisPrompt:
      'Sir Nicholas Winton rescued children before the war began; the Windermere team helped children rebuild after the war ended. What does the story of the Windermere Children teach us about human compassion and hope?',
  },
];

// Generate all companion worksheets
lessonsToGenerate.forEach((lesson) => {
  const html = createWorksheetHtml(lesson);
  const outPath = path.join(WORKSHEETS_DIR, lesson.filename);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✅ Generated gold-standard bespoke worksheet: ${lesson.filename}`);
});
console.log('🎉 Successfully generated companion worksheets to gold standard architecture!');
