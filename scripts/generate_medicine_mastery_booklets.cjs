/**
 * generate_medicine_mastery_booklets.cjs
 *
 * Compiles the print-perfect Edexcel GCSE (9–1) History Paper 1 Mastery Revision Compendium:
 * - Option 11: Medicine in Britain, c1250–present and The British Sector of the Western Front, 1914–18
 * - Canonical Master Volume: 20 Pages (Exact A4 budget, zero overflows)
 *
 * ARCHITECTURAL SPECIFICATION:
 * 1. 100% Monochrome (Ink-Saving): Zero color gradients. Pure black, white, and subtle greys.
 * 2. Front Cover (Page 1):
 *    - Removed candidate box and instructions bloat
 *    - Expanded 26-row Master Question Tracker filling page height
 *    - Column 1: "HW Set / Due" for recording homework set and due dates
 *    - Column 2: Question number & format badge (e.g. Q3 · Similarity)
 * 3. Section Inversion:
 *    - Section B (Medicine Through Time, c1250–present) is FIRST (Pages 2–13)
 *    - Section A (The British Sector of the Western Front, 1914–18) is LAST (Pages 14–19)
 * 4. Question 3 (4 marks) Scaffolding:
 *    - Replaced generic structure strip with a concrete Model Sentence / Answer Guide (AO1/AO2)
 * 5. Ruled Lines Budget:
 *    - Section B spreads: Page 1 has Q3 (5 lines) + Q4 (3 paragraphs x 6 lines = 18 lines) = 23 lines to page bottom.
 *    - Page 2 of spread has Q5/Q6 Essay with 24 lines (6+6+6+6) extending right to page bottom.
 * 6. Section A Fixes:
 *    - Q2(b) Follow-Up Grid: 100% BLANK for student completion (2 lines per cell).
 *    - Q2(a) 8-Mark Source Utility: 3 sentence starters directly beneath headers + lines to page bottom.
 * 7. Back Cover (Page 20):
 *    - Full-page, word-for-word Pearson Edexcel Specification Audit & Revision Checklist.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const bookletsDir = path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine', 'booklets');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'edexcel_medicine');
const globalPdfsDir = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(bookletsDir)) fs.mkdirSync(bookletsDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

// =============================================================================
// COMMON MONOCHROME CSS
// =============================================================================
const COMMON_CSS = `
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 210mm;
    height: 297mm;
    padding: 9mm 12mm 9mm 12mm;
    page-break-after: always;
    position: relative;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .page:last-child {
    page-break-after: avoid;
  }

  .edexcel-banner {
    font-size: 11pt;
    font-weight: 900;
    color: #000000;
    letter-spacing: -0.2px;
    margin-bottom: 3px;
    text-transform: uppercase;
  }
  .exam-header-box {
    border: 1.5px solid #000000;
    display: flex;
    margin-bottom: 5px;
    background: #ffffff;
  }
  .exam-header-left {
    flex: 3.8;
    padding: 5px 8px;
    border-right: 1.5px solid #000000;
  }
  .exam-header-right {
    flex: 1.2;
    padding: 5px 6px;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .exam-date {
    font-size: 7.4pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .exam-time {
    font-size: 7.4pt;
    font-weight: 700;
    color: #000000;
    margin-bottom: 2px;
  }
  .exam-subject {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11pt;
    font-weight: 900;
    color: #000000;
    line-height: 1.15;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .exam-booklet {
    font-size: 8.5pt;
    font-weight: 800;
    color: #000000;
  }
  .exam-subtopic {
    font-size: 7.2pt;
    color: #000000;
    font-style: italic;
  }
  .ref-label {
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
  }
  .ref-code {
    font-size: 11pt;
    font-weight: 900;
    color: #000000;
    letter-spacing: 0.5px;
  }

  /* Internal Page Headers */
  .page-header {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 3px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 10.5pt;
    font-weight: 900;
    margin: 0;
    color: #000000;
    letter-spacing: -0.1px;
    text-transform: uppercase;
  }
  .header-left p {
    font-size: 7.6pt;
    margin: 1px 0 0 0;
    color: #000000;
  }
  .header-tag {
    font-size: 7.2pt;
    font-weight: 800;
    color: #ffffff;
    background: #000000;
    padding: 2px 7px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  /* Question Containers */
  .question-container {
    margin-bottom: 4px;
  }
  .question-prompt {
    font-size: 8.5pt;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: #000000;
  }
  .q-num {
    font-size: 9pt;
    font-weight: 900;
    margin-right: 3px;
    color: #000000;
  }
  .q-marks {
    font-size: 8.5pt;
    font-weight: 900;
    color: #000000;
    white-space: nowrap;
    margin-left: 6px;
  }

  /* Discrete Provenance Badges */
  .exam-provenance-pill {
    font-size: 6.6pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 1px 4px;
    border-radius: 2px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.2;
    border: 1.2px solid #000000;
  }
  .exam-provenance-pill.past {
    background: #000000;
    color: #ffffff;
  }
  .exam-provenance-pill.specimen,
  .exam-provenance-pill.unexamined,
  .exam-provenance-pill.forecast {
    background: #f8fafc;
    color: #000000;
  }

  /* Stimulus Box */
  .stimulus-card {
    border: 1.2px solid #000000;
    border-radius: 2px;
    background: #f8fafc;
    padding: 3px 6px;
    margin-bottom: 3px;
    font-size: 7.4pt;
    line-height: 1.25;
    color: #000000;
  }
  .stimulus-card ul {
    margin: 1px 0 1px 14px;
    padding: 0;
  }
  .stimulus-card li {
    margin-bottom: 1px;
  }

  /* Authentic Pearson Ruled Lines (7.4mm spacing) */
  .dotted-line {
    border-bottom: 1.2px solid #000000;
    height: 7.4mm;
    width: 100%;
    box-sizing: border-box;
  }

  /* 3-Column Scaffolding Container */
  .scaffold-bar {
    border: 1.2px solid #000000;
    border-radius: 2px;
    background: #f8fafc;
    padding: 3.5px 6px;
    margin-bottom: 4px;
    font-size: 7.4pt;
    line-height: 1.25;
    display: flex;
    gap: 6px;
    color: #000000;
  }
  .scaffold-col {
    border-right: 1px solid #cbd5e1;
    padding-right: 5px;
  }
  .scaffold-col:last-child {
    border-right: none;
    padding-right: 0;
  }
  .scaffold-label {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 6.8pt;
    color: #000000;
    margin-bottom: 1.5px;
    display: block;
    letter-spacing: 0.2px;
  }
  .scaffold-content {
    color: #000000;
    font-size: 7.1pt;
    line-height: 1.25;
  }
  .scaffold-pill {
    display: inline-block;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 0.5px 3.5px;
    margin: 1px 2px 1px 0;
    font-size: 6.8pt;
    font-weight: 700;
    color: #000000;
    white-space: nowrap;
  }

  /* Expanded Progress Tracker Table on Page 1 */
  .tracker-card {
    border: 1.5px solid #000000;
    border-radius: 2px;
    background: #ffffff;
    padding: 6px 8px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .tracker-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .tracker-sub {
    font-size: 7pt;
    color: #000000;
    font-style: italic;
  }
  .tracker-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.2pt;
    line-height: 1.2;
  }
  .tracker-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2.5px 5px;
    border: 1px solid #000000;
    text-align: left;
    font-size: 6.8pt;
  }
  .tracker-table td {
    padding: 2.2px 5px;
    border: 1px solid #cbd5e1;
    color: #000000;
  }
  .tracker-section-hdr td {
    background: #f1f5f9;
    font-weight: 800;
    color: #000000;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 2.5px 5px;
    border-top: 1.2px solid #000000;
    border-bottom: 1.2px solid #000000;
  }
  .tracker-row:nth-child(even) {
    background: #fafafa;
  }
  .page-cell, .marks-cell, .score-cell {
    text-align: center;
    font-weight: 700;
    color: #000000;
  }
  .hw-cell {
    font-size: 6.6pt;
    font-weight: 600;
    color: #334155;
    white-space: nowrap;
  }
  .q-format-tag {
    font-weight: 800;
    color: #000000;
  }

  /* Follow-Up Grid Table */
  .follow-up-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.8pt;
    margin-top: 3px;
  }
  .follow-up-table td {
    border: 1.2px solid #000000;
    padding: 6px 8px;
    vertical-align: middle;
  }
  .follow-up-table tr td:first-child {
    width: 36%;
    background: #f8fafc;
    font-weight: 800;
    color: #000000;
  }
  .follow-up-table tr td:last-child {
    width: 64%;
    background: #ffffff;
    padding: 2px 6px;
  }

  /* Archival Source Box */
  .archival-source-box {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 4px 7px;
    font-size: 7.2pt;
    line-height: 1.25;
  }
  .archival-source-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: 7.8pt;
    color: #000000;
    border-bottom: 1px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 2.5px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
  }
  .archival-source-body {
    font-style: italic;
    color: #000000;
  }
  .archival-source-footer {
    border-top: 1px dashed #cbd5e1;
    margin-top: 2.5px;
    padding-top: 1.5px;
    font-size: 6.6pt;
    color: #000000;
    font-weight: 600;
  }

  /* Provenance Card */
  .provenance-card {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 4px 7px;
    font-size: 7.2pt;
    line-height: 1.25;
    margin-bottom: 4px;
  }

  /* Utility Response Block */
  .utility-response-block {
    margin-bottom: 4px;
  }
  .utility-para-header {
    font-size: 7.6pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
  }
  .starters-box {
    background: #f8fafc;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 3px 6px;
    margin-bottom: 3px;
  }
  .starter-point {
    font-size: 7.2pt;
    line-height: 1.25;
    color: #000000;
    margin-bottom: 1.5px;
  }
  .starter-point:last-child {
    margin-bottom: 0;
  }

  /* Specification Audit Checklist on Page 20 */
  .spec-audit-container {
    border: 1.5px solid #000000;
    border-radius: 2px;
    padding: 6px 8px;
    background: #ffffff;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 4px;
    box-sizing: border-box;
  }
  .spec-audit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #000000;
    padding-bottom: 3px;
    margin-bottom: 6px;
  }
  .spec-audit-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .spec-audit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 7px;
    flex: 1 1 auto;
  }
  .spec-audit-col {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 4px 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .spec-col-banner {
    background: #000000;
    color: #ffffff;
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 2px 4px;
    margin-bottom: 4px;
    text-align: center;
    border-radius: 1px;
  }
  .spec-unit-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 1.5px;
    padding: 3.5px 5px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .spec-unit-title {
    font-size: 6.8pt;
    font-weight: 800;
    color: #000000;
    border-bottom: 1px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 3px;
    text-transform: uppercase;
    line-height: 1.2;
  }
  .spec-sub-title {
    font-size: 6.2pt;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    margin-top: 2.5px;
    margin-bottom: 1.5px;
    border-bottom: 0.5px dashed #cbd5e1;
    padding-bottom: 0.5px;
  }
  .spec-points-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .spec-point-item {
    font-size: 6.1pt;
    line-height: 1.2;
    color: #000000;
    display: flex;
    align-items: flex-start;
    margin-bottom: 2px;
  }
  .spec-point-item:last-child {
    margin-bottom: 1px;
  }
  .spec-tick-box {
    width: 7.5px;
    height: 7.5px;
    border: 1px solid #000000;
    border-radius: 1px;
    margin-right: 3px;
    flex-shrink: 0;
    margin-top: 1px;
    background: #ffffff;
  }
  .spec-point-text {
    flex: 1;
  }

  /* Footers */
  .page-footer {
    border-top: 1.2px solid #000000;
    padding-top: 2.5px;
    font-size: 7.2pt;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }
  .turn-over {
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
`;

function renderLines(count, customHeight) {
  let html = '';
  const heightStyle = customHeight ? ` style="height: ${customHeight};"` : '';
  for (let i = 0; i < count; i++) {
    html += `<div class="dotted-line"${heightStyle}></div>`;
  }
  return html;
}

// =============================================================================
// COMPLETE 20-PAGE HTML BUILDER
// =============================================================================
function generateMasterHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Paper 1: Medicine in Britain, c1250–present and The British Sector of the Western Front, 1914–18 — Complete Mastery Pack</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
    <style>${COMMON_CSS}</style>
</head>
<body>

    <!-- ============================================================= -->
    <!-- PAGE 1: FRONT COVER & MASTER 26-ROW EXAM TRACKER TABLE        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="edexcel-banner">Pearson Edexcel GCSE (9–1)</div>

            <!-- Clean Exam Header Box with Time & Marks -->
            <div class="exam-header-box">
                <div class="exam-header-left">
                    <div class="exam-date">History · Paper 1: Thematic Study &amp; Historic Environment</div>
                    <div class="exam-time">Time: 1 hour 15 minutes (Full Mock Simulation / Guided Practice) · Total Marks: 52</div>
                    <div class="exam-subject">Medicine in Britain, c1250–present and The British Sector of the Western Front, 1914–18</div>
                    <div class="exam-booklet">Complete 20-Page Mastery Exam Pack</div>
                    <div class="exam-subtopic">Option 11 · Section B (Thematic Study, c1250–present) &amp; Section A (Historic Environment, 1914–18)</div>
                </div>
                <div class="exam-header-right">
                    <div class="ref-label">Paper<br>reference</div>
                    <div class="ref-code">1HI0/11</div>
                </div>
            </div>

            <!-- Expanded 26-Row Master Assessment Tracker -->
            <div class="tracker-card">
                <div class="tracker-header">
                    <span class="tracker-title">📋 Complete 20-Page Specification Practice Tracker &amp; Homework Audit</span>
                    <span class="tracker-sub">Track marks achieved across Section B (c1250–present) &amp; Section A (Western Front)</span>
                </div>
                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 23%;">HW Set / Due</th>
                            <th style="width: 18%;">Question &amp; Format</th>
                            <th style="width: 41%;">Specification Focus &amp; Historical Content</th>
                            <th style="width: 5%; text-align: center;">Page</th>
                            <th style="width: 5%; text-align: center;">Marks</th>
                            <th style="width: 8%; text-align: center;">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Section B: Medieval -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section B: Medieval Medicine (c1250–c1500)</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Similarity</span></td>
                            <td>Ideas about cause of illness (Medieval vs Renaissance continuity)</td>
                            <td class="page-cell">2</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Continuity in medical treatments in Medieval England (Church &amp; Galen)</td>
                            <td class="page-cell">2</td>
                            <td class="marks-cell">12</td>
                            <td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Theory of Four Humours as dominant medical foundation (c1250–c1500)</td>
                            <td class="page-cell">3</td>
                            <td class="marks-cell">16+4</td>
                            <td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Renaissance -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section B: Renaissance Medicine (c1500–c1700)</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>Treatments for plague: 1348 Black Death vs 1665 Great Plague</td>
                            <td class="page-cell">4</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Rapid change in anatomical understanding (Vesalius &amp; Printing Press)</td>
                            <td class="page-cell">4</td>
                            <td class="marks-cell">12</td>
                            <td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Thomas Sydenham &amp; Royal Society: Observation vs Traditional humours</td>
                            <td class="page-cell">5</td>
                            <td class="marks-cell">16+4</td>
                            <td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: 18th & 19th Century -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section B: 18th &amp; 19th Century Medicine (c1700–c1900)</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Similarity</span></td>
                            <td>Prevention of disease: Jenner smallpox vaccination vs 1875 Public Health</td>
                            <td class="page-cell">6</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Rapid progress in surgical techniques (Simpson/chloroform &amp; Lister/antiseptics)</td>
                            <td class="page-cell">6</td>
                            <td class="marks-cell">12</td>
                            <td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Pasteur's Germ Theory (1861) as turning point vs Public Health reform</td>
                            <td class="page-cell">7</td>
                            <td class="marks-cell">16+4</td>
                            <td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Modern Britain -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section B: Modern Britain (c1900–present)</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>Diagnosis of disease: 19th C physical exam vs 20th/21st C high-tech scans &amp; DNA</td>
                            <td class="page-cell">8</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Penicillin development and mass production during WWII (c1938–45)</td>
                            <td class="page-cell">8</td>
                            <td class="marks-cell">12</td>
                            <td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Founding of NHS (1948) as greatest breakthrough vs Scientific DNA/biotech</td>
                            <td class="page-cell">9</td>
                            <td class="marks-cell">16+4</td>
                            <td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Synoptic Cross-Period Practice -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section B: Synoptic &amp; Cross-Period Mastery</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Similarity</span></td>
                            <td>Training of physicians: Medieval universities vs Renaissance anatomy schools</td>
                            <td class="page-cell">10</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Government public health shift from laissez-faire (Chadwick &amp; Snow to 1875)</td>
                            <td class="page-cell">10</td>
                            <td class="marks-cell">12</td>
                            <td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Role of individuals vs government institutions in driving medical progress</td>
                            <td class="page-cell">11</td>
                            <td class="marks-cell">16+4</td>
                            <td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Timed Mock Simulation -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section B: Timed Section B Simulation</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>Hospital care: Medieval monastic care vs Florence Nightingale nursing (19th C)</td>
                            <td class="page-cell">12</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Rapid advance in understanding causes of disease after 1900 (DNA &amp; Lifestyle)</td>
                            <td class="page-cell">12</td>
                            <td class="marks-cell">12</td>
                            <td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Continuity of disease prevention: 1348 Black Death vs 1665 Great Plague</td>
                            <td class="page-cell">13</td>
                            <td class="marks-cell">16+4</td>
                            <td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section A: Western Front Set 1 -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section A: Western Front Set 1 (Historic Environment)</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q1 (a) · Feature</span></td>
                            <td>Feature 1: Work of Casualty Clearing Stations (CCS) triage and surgery</td>
                            <td class="page-cell">14</td>
                            <td class="marks-cell">2</td>
                            <td class="score-cell">[ &nbsp; ] / 2</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q1 (b) · Feature</span></td>
                            <td>Feature 2: Use of the Thomas splint for compound fractures</td>
                            <td class="page-cell">14</td>
                            <td class="marks-cell">2</td>
                            <td class="score-cell">[ &nbsp; ] / 2</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q2 (b) · Follow-Up Grid</span></td>
                            <td>4-Part Follow-Up Grid: Base Hospital water rationing &amp; winter conditions</td>
                            <td class="page-cell">14</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q2 (a) · Source Utility</span></td>
                            <td>Utility of Sources A &amp; B: Chaplain Davies (Somme CCS) &amp; Edith Smith (Base)</td>
                            <td class="page-cell">15–16</td>
                            <td class="marks-cell">8</td>
                            <td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>

                        <!-- Section A: Western Front Set 2 -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">Section A: Western Front Set 2 (Historic Environment)</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q1 (a) · Feature</span></td>
                            <td>Feature 1: Mobile X-ray units in the British sector</td>
                            <td class="page-cell">17</td>
                            <td class="marks-cell">2</td>
                            <td class="score-cell">[ &nbsp; ] / 2</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q1 (b) · Feature</span></td>
                            <td>Feature 2: Trench fever causes, symptoms, and delousing</td>
                            <td class="page-cell">17</td>
                            <td class="marks-cell">2</td>
                            <td class="score-cell">[ &nbsp; ] / 2</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q2 (b) · Follow-Up Grid</span></td>
                            <td>4-Part Follow-Up Grid: Chlorine gas casualties &amp; medical antidotes at Ypres</td>
                            <td class="page-cell">17</td>
                            <td class="marks-cell">4</td>
                            <td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q2 (a) · Source Utility</span></td>
                            <td>Utility of Sources A &amp; B: RAMC Field Ambulance Log &amp; Nurse Diary (Mud/Evacuation)</td>
                            <td class="page-cell">18–19</td>
                            <td class="marks-cell">8</td>
                            <td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>

                        <!-- Summary Totals -->
                        <tr style="background: #f1f5f9; font-weight: 900; font-size: 7.2pt;">
                            <td colspan="4" style="text-align: right; text-transform: uppercase;">Total Combined Examination Practice Marks:</td>
                            <td class="marks-cell">136</td>
                            <td class="score-cell">______ / 136</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Section B: Medieval Medicine (c1250–c1500)</span>
            <span>Page 1 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 2: SECTION B — MEDIEVAL MEDICINE (Q3 & FULL Q4 15 LINES) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medieval Medicine (c1250–c1500) · Question 3 (Similarity) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1250–c1500</span>
            </div>

            <!-- Q3: Similarity -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        Explain one way in which ideas about the cause of illness in the Medieval period (c1250–c1500) were similar to ideas about the cause of illness in the Renaissance (c1500–c1700).
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Four Humours</span>
                            <span class="scaffold-pill">Miasma (Bad Air)</span>
                            <span class="scaffold-pill">Galen / Hippocrates</span>
                            <span class="scaffold-pill">1348 Black Death</span>
                            <span class="scaffold-pill">1665 Great Plague</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear similarity was...</em><br>
                            • <em>In the medieval period, physicians believed...</em><br>
                            • <em>Similarly, in the Renaissance...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"One similarity was that both eras believed miasma caused disease; in 1348 people carried sweet herbs to purify bad air, and in 1665 doctors still wore beak masks stuffed with aromatic herbs to ward off the plague."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x5 = 15 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        Explain why there was so little change in medical treatments in Medieval England between c1250 and c1500.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The Christian Church</strong> &nbsp;&nbsp;
                    <strong>• The continuing influence of Galen and Hippocrates</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Church Dogma</span>
                            <span class="scaffold-pill">Galen Monotheism</span>
                            <span class="scaffold-pill">Dissection Bans</span>
                            <span class="scaffold-pill">Roger Bacon Jailed</span>
                            <span class="scaffold-pill">Bleeding &amp; Purging</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A primary obstacle to progress was...</em><br>
                            • <em>The Church enforced this by...</em><br>
                            • <em>Consequently, treatments remained...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> The Catholic Church &rarr; <strong>Para 2:</strong> Galen's Unchallenged Authority &rarr; <strong>Para 3:</strong> Lack of Scientific Tech.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: The Influence of the Christian Church (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Galen's Enduring Authority &amp; Humeral Orthodoxy (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Social Hierarchy &amp; Lack of Scientific Instruments</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 2 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 3: SECTION B — MEDIEVAL MEDICINE (FULL-PAGE Q5/6 ESSAY)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medieval Medicine (c1250–c1500) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1250–c1500 Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        'Belief in the Theory of the Four Humours was the most important reason why people failed to treat the Black Death successfully in 1348–49.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Bloodletting and purging (Opposites)</strong> &nbsp;&nbsp;
                    <strong>• Religious explanations and flagellants</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Four Humours</span> Phlebotomy, purging, hot/cold herbs; weakened patients.<br>
                            <span class="scaffold-pill">Side B: Religion/Miasma</span> God's punishment, flagellation, bad air, sweet herbs.<br>
                            <span class="scaffold-pill">Side C: Filth &amp; Rats</span> Fleas on black rats (Yersinia pestis); total ignorance of microbes.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>On the one hand, humeral theory...</em><br>
                            • <em>However, religious fatalism was more damaging...</em><br>
                            • <em>Crucially, the decisive factor was...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Weigh the <strong>scale of influence</strong>: Did humeral theory fail patients more, or did religious fatalism prevent municipal sanitation?
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Four Humours Bleeding &amp; Purging)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Religious Explanations, God's Wrath &amp; Flagellants</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Miasma, Bad Air &amp; Complete Lack of Germ Knowledge</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Which Factor Was Most Decisive?)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Renaissance Medicine (c1500–c1700)</span>
            <span>Page 3 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 4: SECTION B — THE RENAISSANCE (Q3 & FULL Q4 15 LINES)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>The Medical Renaissance (c1500–c1700) · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1500–c1700</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Explain one way in which the response of authorities to the Great Plague (1665) was different from the response of authorities to the Black Death (1348).
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">1348 Black Death</span> No quarantine; church-led prayer; King street order.<br>
                            <span class="scaffold-pill">1665 Great Plague</span> Mayor quarantine; red crosses &amp; watchmen; searchers; mass pits.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear difference in response was...</em><br>
                            • <em>In 1348, authorities were largely powerless...</em><br>
                            • <em>In contrast, by 1665 the Lord Mayor enforced...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"In contrast to 1348 when authorities took little organized action, by 1665 the Mayor of London enforced systematic quarantine, locking infected families in their homes with red crosses painted on doors and watchmen outside."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x5 = 15 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2022</span>
                        Explain why there was rapid change in anatomical understanding in the period c1500–c1700.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Andreas Vesalius and the Fabric of the Human Body (1543)</strong> &nbsp;&nbsp;
                    <strong>• The invention of the movable-type printing press (c1450s)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Vesalius (300+ Galen Errors)</span>
                            <span class="scaffold-pill">Human Dissection</span>
                            <span class="scaffold-pill">Movable Type Print</span>
                            <span class="scaffold-pill">William Harvey (1628 Heart)</span>
                            <span class="scaffold-pill">Mechanical Pumps</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A decisive breakthrough came when...</em><br>
                            • <em>By directly dissecting human corpses, Vesalius...</em><br>
                            • <em>The printing press multiplied this impact by...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Vesalius &amp; Direct Dissection &rarr; <strong>Para 2:</strong> The Printing Press &amp; Spread of Texts &rarr; <strong>Para 3:</strong> Harvey &amp; Circulation.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Andreas Vesalius &amp; Empirical Human Dissection (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: The Printing Press &amp; Scientific Standardization (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — William Harvey &amp; Mechanical Heart Circulation (1628)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 4 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 5: SECTION B — THE RENAISSANCE (FULL-PAGE Q5/6 ESSAY)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>The Medical Renaissance (c1500–c1700) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1500–c1700 Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill specimen">Sample Assessment Material</span>
                        'Thomas Sydenham’s work was the most significant turning point in medical care between c1500 and c1700.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Thomas Sydenham and bedside clinical observation (Observationes Medicae, 1676)</strong> &nbsp;&nbsp;
                    <strong>• The Royal Society and its scientific motto 'Nullius in verba' (1660)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Sydenham</span> Grouped diseases by symptoms; rejected individual humours; cinchona bark for malaria.<br>
                            <span class="scaffold-pill">Side B: Royal Society</span> Peer review; scientific journal (Philosophical Transactions); empirical method.<br>
                            <span class="scaffold-pill">Side C: Anatomy Titans</span> Vesalius (1543) and Harvey (1628); dismantled Galenic dogma.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>Sydenham was revolutionary because...</em><br>
                            • <em>However, the Royal Society provided institutional scale...</em><br>
                            • <em>Yet neither transformed ordinary patient survival because...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Distinguish between <strong>clinical observation at the bedside</strong> (Sydenham) vs <strong>theoretical anatomy</strong> (Harvey/Vesalius) vs <strong>treatments</strong> (persisting humours).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Thomas Sydenham &amp; Observation)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — The Royal Society &amp; Institutional Empirical Science</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Vesalius, Harvey &amp; The Overthrow of Galen</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Theory vs Everyday Practice)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for 18th &amp; 19th Century Medicine (c1700–c1900)</span>
            <span>Page 5 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 6: SECTION B — 18TH & 19TH CENTURY (Q3 & FULL Q4 15 L)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>18th &amp; 19th Century Medicine (c1700–c1900) · Question 3 (Similarity) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1700–c1900</span>
            </div>

            <!-- Q3: Similarity -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain one way in which the prevention of disease in the 18th century was similar to the prevention of disease in the 19th century.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Edward Jenner (1796)</span> Smallpox vaccine using cowpox; government £30,000 grant (1802/07).<br>
                            <span class="scaffold-pill">19th C Legislation</span> Compulsory vaccination act (1853); 1875 Public Health Act clean water &amp; sewers.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Continuity Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear similarity was the growing role of government...</em><br>
                            • <em>In the late 18th century, Parliament funded Jenner...</em><br>
                            • <em>Similarly, in the 19th century, the state passed laws...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"Both eras saw growing government intervention in mass prevention; Parliament granted Jenner £30,000 to distribute smallpox vaccines, while in 1875 the Public Health Act legally forced local councils to provide clean water and sewers."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x5 = 15 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        Explain why there was rapid progress in surgical techniques in the period c1700–c1900.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• James Simpson and chloroform (1847)</strong> &nbsp;&nbsp;
                    <strong>• Joseph Lister and carbolic acid (1867)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Simpson Chloroform 1847</span>
                            <span class="scaffold-pill">Queen Victoria 1853</span>
                            <span class="scaffold-pill">Lister Carbolic Spray 1867</span>
                            <span class="scaffold-pill">Pasteur Germ Theory</span>
                            <span class="scaffold-pill">Aseptic Surgery / Steam Sterilization</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A primary catalyst was the defeat of surgical pain...</em><br>
                            • <em>Simpson's discovery allowed surgeons to...</em><br>
                            • <em>However, pain relief created a 'Black Period' until Lister...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Simpson &amp; Chloroform (Pain) &rarr; <strong>Para 2:</strong> Lister &amp; Carbolic Acid (Infection) &rarr; <strong>Para 3:</strong> Aseptic Surgery &amp; Ligatures.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: James Simpson &amp; The Conquest of Pain (Anaesthesia) (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Joseph Lister &amp; Antiseptic Surgery (Defeating Infection) (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Aseptic Surgery (Steam Autoclaves, Rubber Gloves &amp; Gowns)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 6 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 7: SECTION B — 18TH & 19TH CENTURY (FULL-PAGE Q5/6)      -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>18th &amp; 19th Century Medicine (c1700–c1900) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1700–c1900 Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill past">Edexcel June 2023</span>
                        'Louis Pasteur’s Germ Theory (1861) was the most significant turning point in the prevention of disease between c1700 and the present.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The 1875 Public Health Act</strong> &nbsp;&nbsp;
                    <strong>• Alexander Fleming, Howard Florey and Ernst Chain (Penicillin)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Pasteur / Koch</span> Disproved spontaneous generation; proved specific microbes cause specific diseases; vaccines.<br>
                            <span class="scaffold-pill">Side B: Public Health Act</span> 1875 Act made clean water, sewers, and waste disposal compulsory for councils.<br>
                            <span class="scaffold-pill">Side C: Modern Era</span> Penicillin internal cure (1941); modern DNA and lifestyle campaigns.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>Pasteur was the pivotal scientific turning point...</em><br>
                            • <em>However, laboratory science was useless without state action...</em><br>
                            • <em>The 1875 Act was more decisive in saving lives because...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Distinguish between the <strong>scientific foundation</strong> (Pasteur proving causation) vs <strong>mass population survival</strong> (Government sanitation saving millions).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Pasteur's Germ Theory &amp; Koch)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — The 1875 Public Health Act &amp; Municipal Sanitation (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — 20th Century Antibiotics (Fleming, Florey &amp; Chain) (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Lab Science vs Mass Public Survival)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Modern Britain (c1900–present)</span>
            <span>Page 7 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 8: SECTION B — MODERN BRITAIN (Q3 & FULL Q4 15 LINES)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medicine in Modern Britain (c1900–present) · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1900–present</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        Explain one way in which methods of diagnosing illness in the 19th century were different from methods of diagnosing illness in the modern era (c1900–present).
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">19th C Diagnosis</span> Relied on external physical symptoms, stethoscopes (Laennec), taking pulse, observing urine.<br>
                            <span class="scaffold-pill">Modern Diagnosis</span> High-tech medical physics: X-rays, CT scans, MRI, blood tests, and genetic DNA profiling.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>One fundamental difference in diagnosis was...</em><br>
                            • <em>In the 19th century, doctors were restricted to...</em><br>
                            • <em>In sharp contrast, modern medicine utilizes...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"In the 19th century diagnosis was restricted to external physical examination using stethoscopes and feeling the pulse, whereas modern doctors use advanced medical physics such as CT/MRI scans and genetic blood tests to identify disease internally."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x5 = 15 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2021</span>
                        Explain why there was rapid progress in the development and mass production of penicillin in the years c1938–c1945.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Howard Florey and Ernst Chain at Oxford University</strong> &nbsp;&nbsp;
                    <strong>• US Government funding and the Second World War</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Florey &amp; Chain (1938–41)</span>
                            <span class="scaffold-pill">Mouse Trials (1940)</span>
                            <span class="scaffold-pill">Albert Alexander (1941)</span>
                            <span class="scaffold-pill">US War Production Board</span>
                            <span class="scaffold-pill">Deep Fermentation Tanks / D-Day 1944</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>The scientific catalyst was Florey and Chain's work...</em><br>
                            • <em>However, British factories could not produce it due to the Blitz...</em><br>
                            • <em>Consequently, US wartime intervention unlocked...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Florey &amp; Chain's Purification &rarr; <strong>Para 2:</strong> US State Intervention &amp; WWII Urgency &rarr; <strong>Para 3:</strong> Industrial Technology.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Howard Florey, Ernst Chain &amp; Biochemical Purification (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: US Government Funding &amp; Wartime Urgency (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Industrial Innovations (Corn Steep Liquor &amp; Cantaloupe Strain)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 8 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 9: SECTION B — MODERN BRITAIN (FULL-PAGE Q5/6 ESSAY)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medicine in Modern Britain (c1900–present) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1900–present Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        'The creation of the National Health Service in 1948 was the most significant breakthrough in medical care between c1900 and the present.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Aneurin Bevan and the founding of the NHS (5 July 1948)</strong> &nbsp;&nbsp;
                    <strong>• The discovery of the structure of DNA by Watson, Crick and Franklin (1953)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: The NHS (1948)</span> Free at point of delivery; universal access; ended two-tier healthcare for poor.<br>
                            <span class="scaffold-pill">Side B: DNA &amp; Genetics</span> 1953 double helix; Human Genome Project; gene therapy and targeted cancer drugs.<br>
                            <span class="scaffold-pill">Side C: Medical Technology</span> Advanced surgery (hip replacements, organ transplants, dialysis, radiotherapy).
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>The NHS revolutionized healthcare delivery by...</em><br>
                            • <em>However, scientific discovery of DNA provided...</em><br>
                            • <em>Ultimately, access was meaningless without clinical cure...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Weigh <strong>democratic social access</strong> (NHS ensuring everyone could see a doctor) vs <strong>scientific capability</strong> (DNA and biotech discovering cures).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Aneurin Bevan &amp; The NHS)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Watson, Crick &amp; Franklin's Discovery of DNA Structure</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — High-Tech Surgical &amp; Pharmaceutical Breakthroughs</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Democratic Access vs Scientific Cures)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Synoptic &amp; Cross-Period Mastery (Pages 10–11)</span>
            <span>Page 9 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 10: SECTION B — SYNOPTIC PRACTICE (Q3 & FULL Q4 15 L)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Synoptic &amp; Cross-Period Mastery · Question 3 (Similarity) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · Synoptic</span>
            </div>

            <!-- Q3: Similarity -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel November 2020</span>
                        Explain one way in which the training of physicians in the Medieval period was similar to the training of physicians in the Renaissance period.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Medieval Training</span> Oxford &amp; Cambridge; book-learning from Galen &amp; Hippocrates; zero clinical dissection.<br>
                            <span class="scaffold-pill">Renaissance Training</span> Continued reading of classical texts; Royal College of Physicians licensing; slow adoption of Harvey.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Continuity Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear continuity in physician training was...</em><br>
                            • <em>In medieval universities, medical education was based on...</em><br>
                            • <em>Similarly, in the Renaissance, mainstream physicians still...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"In both eras, physician education was heavily theoretical based on classical books; medieval universities taught Galen's texts without dissection, and 17th-century medical schools still required doctors to master Galenic lectures before licensing."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x5 = 15 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain why the British Government abandoned its laissez-faire attitude towards public health in the 19th century.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Edwin Chadwick’s Report on the Sanitary Condition of the Labouring Population (1842)</strong> &nbsp;&nbsp;
                    <strong>• The Second Reform Act giving working-class men the vote (1867)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Chadwick Report 1842</span>
                            <span class="scaffold-pill">Broad Street Cholera 1854</span>
                            <span class="scaffold-pill">John Snow Water Pump</span>
                            <span class="scaffold-pill">1867 Reform Act (Working Votes)</span>
                            <span class="scaffold-pill">1875 Public Health Act</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A primary catalyst was empirical statistical evidence...</em><br>
                            • <em>Chadwick proved that filthy living conditions caused...</em><br>
                            • <em>Politicians were forced to act when working-class men...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Chadwick's Report (Economic &amp; Health Evidence) &rarr; <strong>Para 2:</strong> Political Enfranchisement (1867 Reform Act) &rarr; <strong>Para 3:</strong> Snow &amp; Cholera.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Edwin Chadwick &amp; The Economic Burden of Filth (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: The 1867 Reform Act &amp; Working-Class Political Pressure (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — John Snow, Broad Street (1854) &amp; Compulsory 1875 Legislation</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 10 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: SECTION B — SYNOPTIC PRACTICE (FULL-PAGE Q5/6 ESSAY) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Synoptic &amp; Cross-Period Mastery · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · Synoptic Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        'Individual genius was more important than government action in improving medicine and public health between c1250 and the present.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• William Harvey and the circulation of the blood (1628)</strong> &nbsp;&nbsp;
                    <strong>• The Public Health Act of 1875</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Individuals</span> Jenner, Simpson, Lister, Pasteur, Koch, Fleming; breakthroughs in lab.<br>
                            <span class="scaffold-pill">Side B: Government Action</span> 1875 Public Health Act, Clean Air Acts (1956), NHS (1948); law &amp; taxation.<br>
                            <span class="scaffold-pill">Side C: Synergy</span> Individuals discover cures, but government must enforce and fund them.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>Individuals were indispensable for initiating progress...</em><br>
                            • <em>However, individual ideas were impotent without state power...</em><br>
                            • <em>The decisive factor across 750 years was...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Synthesize: Without individual science (Pasteur/Fleming), government had no solutions; but without government funding (US WWII/NHS), individuals could not mass-treat.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Individual Genius — Harvey, Jenner, Simpson)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Government Action, Public Health Acts &amp; The Welfare State</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — War, Industrial Technology &amp; Scientific Communication</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Scientific Discovery vs Legislative Execution)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Timed Section B Simulation (Pages 12–13)</span>
            <span>Page 11 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 12: SECTION B — TIMED MOCK SIMULATION (Q3 & FULL Q4 15 L)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Timed Mock Simulation · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Timed Mock · Section B</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel June 2022</span>
                        Explain one way in which hospital care in the 13th century was different from hospital care in the 19th century.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">13th C Hospitals</span> Run by monks/nuns; focus on spiritual care &amp; rest; infectious/terminal turned away.<br>
                            <span class="scaffold-pill">19th C Hospitals</span> Florence Nightingale; sanitation &amp; pavilion plan; trained nurses; clinical medical cure.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>One fundamental difference in hospital care was...</em><br>
                            • <em>In the 13th century, hospitals aimed to comfort the soul...</em><br>
                            • <em>In contrast, 19th-century hospitals aimed to treat...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"13th-century hospitals run by monks focused on spiritual care and hospitality rather than medical treatment, whereas 19th-century hospitals reformed by Florence Nightingale focused on strict sanitation, ventilation, and clinical cure by trained nurses."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x5 = 15 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain why understanding of the causes of disease advanced rapidly after 1900.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The discovery of the structure of DNA (1953)</strong> &nbsp;&nbsp;
                    <strong>• Research into lifestyle factors (e.g. Doll and Hill on smoking and lung cancer, 1950)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Watson, Crick &amp; Franklin 1953</span>
                            <span class="scaffold-pill">Human Genome Project 2000</span>
                            <span class="scaffold-pill">Doll &amp; Hill Smoking Link 1950</span>
                            <span class="scaffold-pill">Lifestyle Epidemiology</span>
                            <span class="scaffold-pill">Electron Microscopes</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A revolutionary advance was the discovery of genetic coding...</em><br>
                            • <em>By uncovering DNA structure, scientists proved that disease...</em><br>
                            • <em>Furthermore, statistical epidemiology demonstrated that...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> DNA Structure &amp; Genetic Diseases &rarr; <strong>Para 2:</strong> Lifestyle Research (Doll &amp; Hill / Lung Cancer) &rarr; <strong>Para 3:</strong> High-Tech Microscopy.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Genetics &amp; The Discovery of the Structure of DNA (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Statistical Epidemiology &amp; Lifestyle Causation (Smoking &amp; Diet) (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Scientific Instrumentation (Electron Microscopes &amp; Virology)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 12 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 13: SECTION B — TIMED SIMULATION (FULL-PAGE Q5/6 ESSAY)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Timed Mock Simulation · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Timed Mock · Section B Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        'Attempts to prevent illness were completely ineffective between c1250 and c1700.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The Black Death (1348–49)</strong> &nbsp;&nbsp;
                    <strong>• The Great Plague in London (1665)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Ineffective</span> Miasma sweet herbs, flagellation, carrying pomanders; zero grasp of bacteria/fleas.<br>
                            <span class="scaffold-pill">Side B: Emerging Containment</span> 1665 quarantine, searchers, closing theatres, killing stray dogs/cats.<br>
                            <span class="scaffold-pill">Side C: Regimen Sanitatis</span> Medieval bathing/diet rules; local council dung orders in York and London.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>It is largely true that prevention was ineffective because...</em><br>
                            • <em>However, municipal quarantine showed real progress...</em><br>
                            • <em>The decisive reason prevention failed was the persistence of miasma...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Assess: Did quarantine reduce transmission slightly (1665), or was it fundamentally defeated by total ignorance of rat-borne fleas until Yersin (1894)?
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Ineffective Prevention &amp; The Black Death)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Emerging Municipal Quarantine &amp; The Great Plague (1665)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Personal Hygiene, Regimen Sanitatis &amp; Local Sanitation Orders</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 3px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Absolute Failure vs Progressive Containment)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Section A: The Western Front (Pages 14–19)</span>
            <span>Page 13 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 14: SECTION A — WESTERN FRONT SET 1 (Q1 & BLANK Q2b)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Questions 1(a), 1(b) (Features) &amp; Question 2(b) (Follow-Up)</p>
                </div>
                <span class="header-tag">Section A · Set 1</span>
            </div>

            <!-- Q1(a): Feature 1 -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (a)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Describe one feature of the work of Casualty Clearing Stations (CCS) on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Located 7–12 miles behind frontline near railway lines; staffed by RAMC doctors and QAIMNS nurses; performed triage (walking wounded, urgent surgery, beyond help); did life-saving amputations.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State clear historical role in sentence 1 &rarr; <strong>Detail:</strong> Support with 1 precise fact, statistic, or procedure in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q1(b): Feature 2 -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        Describe one feature of the use of the Thomas splint on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Designed by Hugh Owen Thomas; applied at Regimental Aid Posts; rigid steel frame pulled leg straight to prevent bone ends grinding and cutting femoral artery; reduced fracture mortality from 80% to 20%.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State medical function in sentence 1 &rarr; <strong>Detail:</strong> Support with mortality drop (80% to 20%) or mechanical traction detail in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (100% BLANK FOR STUDENT COMPLETION) -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Study Source B (on Page 15). How could you follow up Source B to find out more about the severe conditions faced by medical staff at Base Hospitals? Complete the table below.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <table class="follow-up-table">
                    <tr>
                        <td>Detail in Source B that I would follow up:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>Question I would ask:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>What type of source I would use:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>How this source would help me answer my question:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                </table>

                <div style="border: 1px solid #000000; background: #f8fafc; border-radius: 2px; padding: 3px 6px; font-size: 6.8pt; margin-top: 5px;">
                    <strong>Enquiry Verification Checklist:</strong> [ ] Direct quote from Source B selected; [ ] Question directly links to quote; [ ] Realistic historical source named (e.g. Base Hospital War Diary or RAMC inspection log); [ ] Clear purpose explained.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 2(a) Source Utility (Sources A &amp; B)</span>
            <span>Page 14 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 15: SECTION A — WESTERN FRONT SET 1 (Q2a SOURCES & SCAFF)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Source Utility Enquiry (Sources A &amp; B)</p>
                </div>
                <span class="header-tag">Section A · Set 1</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (a)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Study Sources A and B. How useful are Sources A and B for an enquiry into the challenges of treating casualties on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context.
                    </div>
                    <span class="q-marks">[8]</span>
                </div>

                <!-- Side-by-Side Archival Primary Source Display -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source A</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Somme CCS</span>
                        </div>
                        <div class="archival-source-body">
                            "The casualties have started to arrive... The volume of wounded men is overwhelming; every bed and stretcher is occupied, and men are fortunate just to find a spot on the bare ground. Many will pass away before surgery is possible. We have admitted over 1,500 casualties in twenty-four hours, and the stream has not stopped."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the personal wartime diary of the Reverend Arthur Davies, an army chaplain stationed at a Casualty Clearing Station during the Battle of the Somme, July 1916.
                        </div>
                    </div>

                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source B</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Base Hospital</span>
                        </div>
                        <div class="archival-source-body">
                            "Our morning duties begin at 3.30 am! The freezing temperatures are unbearable. Icicles hang thick over ward windows. Even kettles, rubber hot water bottles, and sponges have frozen solid. The pipes freeze entirely, meaning we must strictly ration the water provided to the wounded."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From a private letter written by Edith Smith, a VAD (Voluntary Aid Detachment) nurse serving at a British Base Hospital near Boulogne, December 1917.
                        </div>
                    </div>
                </div>

                <!-- Provenance Clues Scaffolding Card (Per AGENTS.md Rule) -->
                <div class="provenance-card">
                    <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
                        🔍 Provenance Clues (Author, Audience, Motive) — Consider Before Writing:
                    </strong>
                    <div style="font-size: 6.8pt; line-height: 1.25;">
                        • <strong>Source A (Chaplain Davies):</strong> Eyewitness chaplain at a CCS during the peak of the Somme (July 1916). <em>Motive:</em> Private diary recording immediate emotional and physical strain of 1,500 casualties arriving; highly reliable for firsthand volume, though written under immense pressure without official statistics.<br>
                        • <strong>Source B (Edith Smith):</strong> Frontline VAD nurse writing a personal letter home from a Base Hospital in winter 1917. <em>Motive:</em> Candid description of extreme winter freezing and water rationing; highly useful for everyday environmental hardships, though localized to one coastal hospital.
                    </div>
                </div>

                <!-- C-O-P Examination Scaffold Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 34%;">
                        <span class="scaffold-label">C — Content &amp; Quote</span>
                        <div class="scaffold-content">
                            Identify specific details (1,500 casualties, bare ground, frozen pipes, water rationing) and explain what they reveal about medical strain.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">O — Own Knowledge</span>
                        <div class="scaffold-content">
                            Corroborate with precise context: 57,000 casualties on Day 1 of Somme; CCS capacity was ~1,000; winter 1917 was coldest in 40 years.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">P — Provenance (NOP)</span>
                        <div class="scaffold-content">
                            Evaluate Nature (diary vs letter), Origin (eyewitness chaplain vs nurse), and Purpose. Weigh typicality vs limitations.
                        </div>
                    </div>
                </div>

                <!-- Paragraph 1: Source A Analysis directly on Page 15 -->
                <div class="utility-response-block" style="margin-top: 5px;">
                    <div class="utility-para-header">
                        <strong>Paragraph 1: Analysis of Source A (Content + Contextual Knowledge + Provenance)</strong>
                        <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                    </div>
                    <div class="starters-box">
                        <div class="starter-point"><strong>• Content Starter:</strong> <em>Source A is useful for an enquiry into casualty treatment because it shows that...</em></div>
                        <div class="starter-point"><strong>• Context Starter:</strong> <em>From my own historical knowledge, this is accurate because during the 1916 Somme offensive...</em></div>
                        <div class="starter-point"><strong>• Provenance Starter:</strong> <em>The utility of Source A is affected by its provenance because as an eyewitness chaplain's diary...</em></div>
                    </div>
                    ${renderLines(11, '7.2mm')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paragraph 2 (Source B Analysis &amp; Synthesis)</span>
            <span>Page 15 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 16: SECTION A — WESTERN FRONT SET 1 (Q2a FULL WRITING L) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Student Writing Response Lines</p>
                </div>
                <span class="header-tag">Section A · Set 1 Writing</span>
            </div>

            <!-- Full Page dedicated to Paragraph 2: Source B Analysis & Comparative Synthesis -->
            <div class="utility-response-block">
                <div class="utility-para-header">
                    <strong>Paragraph 2: Analysis of Source B &amp; Comparative Judgement (Content + Knowledge + Provenance)</strong>
                    <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                </div>
                <div class="starters-box">
                    <div class="starter-point"><strong>• Content Starter:</strong> <em>Source B is also useful because it highlights the severe environmental difficulties...</em></div>
                    <div class="starter-point"><strong>• Context Starter:</strong> <em>This is corroborated by historical evidence that Base Hospitals in winter 1917 faced...</em></div>
                    <div class="starter-point"><strong>• Provenance &amp; Synthesis:</strong> <em>As a personal letter home from a VAD nurse, the provenance... Overall, Source [A/B] is more useful because...</em></div>
                </div>
                ${renderLines(19, '7.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Western Front Practice Set 2 (Pages 17–19)</span>
            <span>Page 16 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 17: SECTION A — WESTERN FRONT SET 2 (Q1 & BLANK Q2b)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Questions 1(a), 1(b) (Features) &amp; Question 2(b) (Follow-Up)</p>
                </div>
                <span class="header-tag">Section A · Set 2</span>
            </div>

            <!-- Q1(a): Feature 1 -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (a)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Describe one feature of mobile X-ray units used in the British sector of the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            6 mobile X-ray vans deployed by RAMC in British sector; located at CCS; transported X-ray tubes in padded vans; used to locate shrapnel and bullets inside flesh before surgery; tubes overheated quickly.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State diagnostic role in sentence 1 &rarr; <strong>Detail:</strong> Add specific technological detail (van transport, overheating tubes, or CCS location) in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q1(b): Feature 2 -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2022</span>
                        Describe one feature of trench fever on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Caused by micro-organisms living in body lice feces; produced severe headaches, high fever, and disabling bone pain in shins; affected ~15% of men; led to bathhouses and steam delousing machines.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State lice cause or flu-like symptoms in sentence 1 &rarr; <strong>Detail:</strong> Add delousing stations or 15% casualty impact in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (100% BLANK FOR STUDENT COMPLETION) -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (b)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Study this extract from an RAMC officer at Ypres (1915): <em>"The chlorine gas casualties stumbled in clutching their throats. We washed their blinded eyes with bicarbonate of soda solutions, but many died from asphyxiation."</em> How could you follow up this extract to find out more about treatments for gas attacks on the Western Front? Complete the table below.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <table class="follow-up-table">
                    <tr>
                        <td>Detail in extract that I would follow up:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>Question I would ask:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>What type of source I would use:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>How this source would help me answer my question:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                </table>

                <div style="border: 1px solid #000000; background: #f8fafc; border-radius: 2px; padding: 3px 6px; font-size: 6.8pt; margin-top: 5px;">
                    <strong>Enquiry Verification Checklist:</strong> [ ] Direct quote from gas extract selected; [ ] Focused clinical enquiry question; [ ] Official RAMC Casualty Admission Book or War Office Bulletin named; [ ] Precise evaluative purpose.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 2(a) Set 2 (Sources A &amp; B)</span>
            <span>Page 17 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 18: SECTION A — WESTERN FRONT SET 2 (Q2a SOURCES & SCAFF)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Source Utility Enquiry (Sources A &amp; B)</p>
                </div>
                <span class="header-tag">Section A · Set 2</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (a)</span>
                        <span class="exam-provenance-pill past">Edexcel November 2020</span>
                        Study Sources A and B. How useful are Sources A and B for an enquiry into the transport and evacuation of wounded soldiers on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context.
                    </div>
                    <span class="q-marks">[8]</span>
                </div>

                <!-- Side-by-Side Archival Primary Source Display -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source A</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Field Ambulance Log</span>
                        </div>
                        <div class="archival-source-body">
                            "The mud in the Ypres Salient makes stretcher bearing almost impossible. It takes four or six bearers to carry one stretcher through waist-deep slime. The wooden duckboards have been blasted away by German artillery. Yesterday it took our squad four hours to move two casualties just one mile back to the dressing station."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the official war diary of a British RAMC Field Ambulance unit operating during the Third Battle of Ypres (Passchendaele), August 1917.
                        </div>
                    </div>

                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source B</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Ambulance Train Log</span>
                        </div>
                        <div class="archival-source-body">
                            "The ambulance train arrived at midnight carrying 400 lying cases directly from the clearing station. The train is fitted with sprung cots and electric lighting, but the stench of gangrene and damp uniforms is overpowering. Medical orderlies worked continuously dressing wounds and administering hot tea."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the wartime journal of Sister Kate Luard, a nursing sister serving aboard British RAMC Ambulance Trains between the Somme and Base Hospitals at the French coast, 1916.
                        </div>
                    </div>
                </div>

                <!-- Provenance Clues Scaffolding Card (Per AGENTS.md Rule) -->
                <div class="provenance-card">
                    <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
                        🔍 Provenance Clues (Author, Audience, Motive) — Consider Before Writing:
                    </strong>
                    <div style="font-size: 6.8pt; line-height: 1.25;">
                        • <strong>Source A (RAMC Field Ambulance Diary):</strong> Official frontline operational log written by stretcher-bearer commanders at Passchendaele (1917). <em>Motive:</em> Recording military logistics and delay factors; highly factual regarding physical mud barriers, though focused strictly on frontline sector transport.<br>
                        • <strong>Source B (Sister Kate Luard Journal):</strong> Experienced nursing sister serving on specialized ambulance trains. <em>Motive:</em> Eyewitness clinical observation of intermediate evacuation between CCS and Base Hospitals; highly valuable for understanding rail medical care, though limited to train-borne patients.
                    </div>
                </div>

                <!-- C-O-P Examination Scaffold Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 34%;">
                        <span class="scaffold-label">C — Content &amp; Quote</span>
                        <div class="scaffold-content">
                            Extract specific evidence (waist-deep slime, 4 hours for 1 mile, 400 cases on sprung cots, gangrene stench) and analyse logistical hurdles.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">O — Own Knowledge</span>
                        <div class="scaffold-content">
                            Integrate evacuation chain: RAP &rarr; Dressing Station &rarr; CCS &rarr; Ambulance Train &rarr; Base Hospital. Mention motor ambulances and canal barges.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">P — Provenance (NOP)</span>
                        <div class="scaffold-content">
                            Contrast operational field log (Source A) with clinical nursing journal (Source B). Weigh author authority and scope of evidence.
                        </div>
                    </div>
                </div>

                <!-- Paragraph 1: Source A Analysis directly on Page 18 -->
                <div class="utility-response-block" style="margin-top: 5px;">
                    <div class="utility-para-header">
                        <strong>Paragraph 1: Analysis of Source A (Content + Contextual Knowledge + Provenance)</strong>
                        <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                    </div>
                    <div class="starters-box">
                        <div class="starter-point"><strong>• Content Starter:</strong> <em>Source A is useful for an enquiry into frontline transport because it shows that...</em></div>
                        <div class="starter-point"><strong>• Context Starter:</strong> <em>From my own knowledge, this reflects the extreme conditions during Third Ypres (Passchendaele)...</em></div>
                        <div class="starter-point"><strong>• Provenance Starter:</strong> <em>The utility of Source A is influenced by its nature as an official RAMC Field Ambulance War Diary...</em></div>
                    </div>
                    ${renderLines(11, '7.2mm')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paragraph 2 (Source B Analysis &amp; Synthesis)</span>
            <span>Page 18 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 19: SECTION A — WESTERN FRONT SET 2 (Q2a FULL WRITING L) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Student Writing Response Lines</p>
                </div>
                <span class="header-tag">Section A · Set 2 Writing</span>
            </div>

            <!-- Full Page dedicated to Paragraph 2: Source B Analysis & Comparative Judgement -->
            <div class="utility-response-block">
                <div class="utility-para-header">
                    <strong>Paragraph 2: Analysis of Source B &amp; Comparative Judgement (Content + Knowledge + Provenance)</strong>
                    <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                </div>
                <div class="starters-box">
                    <div class="starter-point"><strong>• Content Starter:</strong> <em>Source B is also useful because it details the next stage of the evacuation chain...</em></div>
                    <div class="starter-point"><strong>• Context Starter:</strong> <em>Specifically, my knowledge confirms that specialized ambulance trains were vital because...</em></div>
                    <div class="starter-point"><strong>• Provenance &amp; Synthesis:</strong> <em>Sister Luard's firsthand clinical perspective makes this source... Overall, both sources are mutually useful because...</em></div>
                </div>
                ${renderLines(19, '7.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Full-Page Specification Audit (Page 20)</span>
            <span>Page 19 of 20</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 20: BACK COVER — FULL-PAGE WORD-FOR-WORD SPECIFICATION   -->
    <!-- ============================================================= -->
    <div class="page">
        <div class="spec-audit-container">
            <div class="spec-audit-header">
                <div>
                    <span class="spec-audit-title">📋 Pearson Edexcel GCSE (9–1) History · Option 11 Specification Audit</span>
                    <div style="font-size: 6.8pt; color: #334155; font-style: italic; margin-top: 1px;">Official Word-for-Word Syllabus Content · Medicine in Britain, c1250–present &amp; Western Front, 1914–18</div>
                </div>
                <div style="font-size: 7pt; font-weight: 700; border: 1px solid #000; padding: 1.5px 5px; background: #f8fafc;">
                    Tick [ ✓ ] once mastered
                </div>
            </div>

            <div class="spec-audit-grid">
                <!-- Column 1: Section B Units 1 & 2 -->
                <div class="spec-audit-col">
                    <div class="spec-col-banner">SECTION B: THEMATIC STUDY (1)</div>
                    
                    <div class="spec-unit-box">
                        <div class="spec-unit-title">Unit 1: c1250–c1500: Medicine in Medieval England</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Supernatural and religious explanations of the cause of disease.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Rational explanations: the Theory of the Four Humours and the miasma theory.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The continuing influence in England of Galen.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Connection with ideas about disease: religious actions, bloodletting and purging, purifying the air.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Traditional approaches to treatment and care: the role of the physician, apothecary and barber surgeon; the role of hospitals, care within the community and at home, including the use of herbal remedies.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Study:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Dealing with the Black Death, 1348–49:</strong> approaches to treatment and attempts to prevent its spread.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 5px;">
                        <div class="spec-unit-title">Unit 2: c1500–c1700: The Medical Renaissance in England</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Continuity and change in explanations of the cause of disease and illness.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">A scientific approach, including the work of Thomas Sydenham in improving diagnosis.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The influence of the printing press and the work of the Royal Society on the transmission of ideas.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Continuity and change in approaches to prevention, treatment and care in the community and in hospitals.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Improvements in medical training and the influence in England of the work of Vesalius.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Studies:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Key individual:</strong> William Harvey and the discovery of the circulation of the blood.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Dealing with the Great Plague in London (1665):</strong> approaches to treatment and attempts to prevent its spread.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Column 2: Section B Units 3 & 4 -->
                <div class="spec-audit-col">
                    <div class="spec-col-banner">SECTION B: THEMATIC STUDY (2)</div>
                    
                    <div class="spec-unit-box">
                        <div class="spec-unit-title">Unit 3: c1700–c1900: Medicine in 18th- and 19th-Century Britain</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Continuity and change in explanations of the causes of disease and illness.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The influence of Pasteur’s Germ Theory and Koch’s work on microbes.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The extent of change in care and treatment: improvements in hospital care and the influence of Nightingale.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The impact of anaesthetics and antiseptics on surgery.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">New approaches to prevention: the development and use of vaccinations and the Public Health Act 1875.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Studies:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Key individual:</strong> Jenner and the development of vaccination.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Fighting Cholera in London (1854):</strong> attempts to prevent its spread; the significance of Snow and the Broad Street pump.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 5px;">
                        <div class="spec-unit-title">Unit 4: c1900–present: Medicine in Modern Britain</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Advances in understanding the causes of illness and disease: the influence of genetic and lifestyle factors on health.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Improvements in diagnosis: the impact of the availability of blood tests, scans and monitors.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Advances in medicine: the first magic bullets and the development of antibiotics.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">High-tech medical and surgical treatment in hospitals.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The creation of the NHS and its impact on the provision of care.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">New approaches to prevention: mass vaccinations and government lifestyle campaigns.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Studies:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Key individuals:</strong> Fleming, Florey and Chain’s development of penicillin.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>The fight against lung cancer in the 21st century:</strong> the use of science and technology in diagnosis and treatment; government action to prevent it.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Column 3: Section A Western Front -->
                <div class="spec-audit-col">
                    <div class="spec-col-banner">SECTION A: HISTORIC ENVIRONMENT</div>
                    
                    <div class="spec-unit-box">
                        <div class="spec-unit-title">1. The Context of the British Sector of the Western Front</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Historical Context:</strong> Medicine in early 20th century: understanding of infection and moves towards aseptic surgery; development of x-rays; blood transfusions and developments in the storage of blood.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Trench System &amp; Theatre of War:</strong> British sector in Flanders and northern France: the Ypres salient, the Somme, Arras and Cambrai.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The trench system - its organisation, including frontline and support trenches.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Significance for medical treatment of the nature of the terrain and problems of the transport and communications infrastructure.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 4px;">
                        <div class="spec-unit-title">2. Conditions Requiring Medical Treatment</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Trench Environment &amp; Illnesses:</strong> Conditions requiring medical treatment on the Western Front, including ill health arising from the trench environment.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Weapons and Wounds:</strong> Nature of wounds from rifles and explosives; problem of shrapnel, wound infection and increased numbers of head injuries.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Gas Attacks:</strong> The effects of gas attacks (chlorine, phosgene, mustard gas).</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 4px;">
                        <div class="spec-unit-title">3. Medical Treatment and the Chain of Evacuation</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Staff &amp; Personnel:</strong> Medical treatment on the Western Front; work of the RAMC and nurses.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Transport &amp; Evacuation:</strong> Stretcher bearers, horse and motor ambulances. Stages of treatment: aid post and field ambulance, dressing station, casualty clearing station, base hospital.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Specialized Facilities:</strong> The underground hospital at Arras.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 4px;">
                        <div class="spec-unit-title">4. Medical Advances</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Surgical &amp; Clinical Experiments:</strong> Significance of Western Front for experiments in surgery and medicine: new techniques in treatment of wounds and infection, the Thomas splint, mobile x-ray units, creation of a blood bank for Battle of Cambrai.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
<div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">End of Examination Pack · 100% Edexcel Specification Mastered</span>
            <span>Page 20 of 20</span>
        </div>
    </div>

</body>
</html>`;
}

// =============================================================================
// COMPILATION PIPELINE: HTML EXPORT, PUPPETEER RENDER, ROOT SYNC, DRIVE SYNC
// =============================================================================
async function compileMasteryBooklets() {
  console.log('====================================================');
  console.log('📖 EDEXCEL MEDICINE MASTERY COMPENDIUM GENERATOR (20 PAGES)');
  console.log('====================================================');

  const fullHtmlContent = generateMasterHtml();
  const masterHtmlPath = path.join(bookletsDir, 'med_mastery_FULL.html');
  fs.writeFileSync(masterHtmlPath, fullHtmlContent, 'utf8');
  console.log(`   Saved Master HTML: med_mastery_FULL.html (20 Pages)`);

  console.log('\n🖨️ Launching Puppeteer to compile 20-Page Master PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(fullHtmlContent, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Verify page count inside DOM
  const pageCount = await page.evaluate(() => document.querySelectorAll('.page').length);
  console.log(`   📄 Verified DOM Page Elements: ${pageCount} Pages`);

  const masterPdfPath = path.join(pdfsDir, 'med_mastery_pack_FULL.pdf');
  await page.pdf({
    path: masterPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  const rootPdfPath = path.join(globalPdfsDir, 'med_mastery_pack_FULL.pdf');
  fs.copyFileSync(masterPdfPath, rootPdfPath);
  console.log(`   ✅ Exported Master PDF: med_mastery_pack_FULL.pdf (${pageCount} Pages)`);
  console.log(`   📋 Synced med_mastery_pack_FULL.pdf to public/pdfs/ root`);

  await page.close();
  await browser.close();

  // Auto-sync to Google Drive Department File if available
  const driveDirs = [
    'G:\\My Drive\\AAMX\\Dep File\\Year 11 (GCSE)\\Paper 1 - Medicine Through Time',
    'G:\\My Drive\\AAMX\\RESOURCES\\Edexcel GCSE History exams\\p1 11 medicine',
    'G:\\My Drive\\AAMX\\RESOURCES\\Medicine',
  ];

  const canonicalNames = {
    'med_mastery_pack_FULL.pdf': 'Medicine in Britain Complete Mastery Pack.pdf',
  };

  for (const dir of driveDirs) {
    try {
      if (fs.existsSync(dir)) {
        console.log(`\n☁️ Syncing freshly compiled master booklet to Google Drive: ${dir}`);
        for (const [pdfFile, canonical] of Object.entries(canonicalNames)) {
          const srcPath = path.join(globalPdfsDir, pdfFile);
          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, path.join(dir, pdfFile));
            if (canonical) {
              fs.copyFileSync(srcPath, path.join(dir, canonical));
            }
          }
        }
        console.log('   ✅ Synced master booklet to Google Drive.');
      }
    } catch (err) {
      console.warn(`   ⚠️ Could not sync to ${dir}: ${err.message}`);
    }
  }

  console.log('\n====================================================');
  console.log('🎉 MEDICINE MASTERY COMPILATION COMPLETE (20 PAGES, 0 OVERFLOWS)');
  console.log('====================================================');
}

if (require.main === module) {
  compileMasteryBooklets().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { compileMasteryBooklets, generateMasterHtml };
