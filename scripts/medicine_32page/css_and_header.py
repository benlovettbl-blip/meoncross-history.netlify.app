"""
css_and_header.py
Contains COMMON_CSS and script preamble.
"""

def get_preamble():
    return '''/**
 * generate_medicine_mastery_booklets.cjs
 *
 * Compiles the print-perfect Edexcel GCSE (9–1) History Paper 1 Mastery Revision Compendium:
 * - Option 11: Medicine in Britain, c1250–present and The British Sector of the Western Front, 1914–18
 * - Canonical Master Volume: 32 Pages (8-Sheet Saddle-Stitched Compendium, zero overflows)
 *
 * ARCHITECTURAL SPECIFICATION:
 * 1. 100% Monochrome (Ink-Saving): Zero color gradients. Pure black, white, and subtle greys.
 * 2. Front Cover (Page 1):
 *    - Expanded 32-row Master Question & Homework Tracker filling page height
 * 3. Section B Spreads (Pages 2–17):
 *    - Spread 1: Medieval Medicine (c1250–c1500)
 *    - Spread 2: Renaissance Medicine (c1500–c1700)
 *    - Spread 3: 18th & 19th C Surgery (c1700–c1900)
 *    - Spread 4: 18th & 19th C Public Health & Cholera (NEW)
 *    - Spread 5: Modern Britain: Antibiotics & The NHS (c1900–present)
 *    - Spread 6: 21st C Science, Genetics & Prevention (NEW)
 *    - Spread 7: Synoptic & Cross-Period Thematic Mastery
 *    - Spread 8: The 4-Mark Comparison Mastery Lab & Paired Choice Strategy (NEW)
 * 4. Section A Historic Environment (Pages 18–29):
 *    - Set 1: Somme 1916 (CCS & Evacuation Chain)
 *    - Set 2: Ypres 1915/17 (Gas Warfare & Stretcher Relays)
 *    - Set 3: Arras 1917 (Underground Hospitals & Carrel-Dakin) (NEW)
 *    - Set 4: Cambrai 1917 (Blood Depots & Thomas Splints) (NEW)
 * 5. Reference & Masterclass (Pages 30–32):
 *    - Page 30: Western Front Primary Source Provenance Typology & Utility Matrix (NEW)
 *    - Page 31: Official 2026 Pearson Edexcel Examining Masterclass: Secrets of Grade 9 Execution (NEW)
 *    - Page 32: Back Cover — Full-Page Pearson Edexcel Specification Audit & Revision Checklist
 * 6. Ruled Lines Budget:
 *    - All essay paragraphs strictly 6 lines each (18 lines for Q4; 24 lines for Q5/6).
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
    padding: 8.5mm 11.5mm 8.5mm 11.5mm;
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
    font-size: 10.5pt;
    font-weight: 900;
    color: #000000;
    letter-spacing: -0.2px;
    margin-bottom: 2.5px;
    text-transform: uppercase;
  }
  .exam-header-box {
    border: 1.5px solid #000000;
    display: flex;
    margin-bottom: 4px;
    background: #ffffff;
  }
  .exam-header-left {
    flex: 3.8;
    padding: 4px 7px;
    border-right: 1.5px solid #000000;
  }
  .exam-header-right {
    flex: 1.2;
    padding: 4px 5px;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .exam-date {
    font-size: 7.2pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .exam-time {
    font-size: 7.2pt;
    font-weight: 700;
    color: #000000;
    margin-bottom: 1.5px;
  }
  .exam-subject {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 10.5pt;
    font-weight: 900;
    color: #000000;
    line-height: 1.15;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .exam-booklet {
    font-size: 8.2pt;
    font-weight: 800;
    color: #000000;
  }
  .exam-subtopic {
    font-size: 7pt;
    color: #000000;
    font-style: italic;
  }
  .ref-label {
    font-size: 6.6pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
  }
  .ref-code {
    font-size: 10.5pt;
    font-weight: 900;
    color: #000000;
    letter-spacing: 0.5px;
  }

  /* Internal Page Headers */
  .page-header {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2.5px;
    margin-bottom: 3.5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 10pt;
    font-weight: 900;
    margin: 0;
    color: #000000;
    letter-spacing: -0.1px;
    text-transform: uppercase;
  }
  .header-left p {
    font-size: 7.4pt;
    margin: 1px 0 0 0;
    color: #000000;
  }
  .header-tag {
    font-size: 7pt;
    font-weight: 800;
    color: #ffffff;
    background: #000000;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  /* Question Containers */
  .question-container {
    margin-bottom: 3.5px;
  }
  .question-prompt {
    font-size: 8.3pt;
    font-weight: 700;
    line-height: 1.28;
    margin-bottom: 2.5px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: #000000;
  }
  .q-num {
    font-size: 8.8pt;
    font-weight: 900;
    margin-right: 3px;
    color: #000000;
  }
  .q-marks {
    font-size: 8.3pt;
    font-weight: 900;
    color: #000000;
    white-space: nowrap;
    margin-left: 5px;
  }

  /* Discrete Provenance Badges */
  .exam-provenance-pill {
    font-size: 6.4pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 1px 3.5px;
    border-radius: 2px;
    margin-right: 3.5px;
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
    padding: 3px 5.5px;
    margin-bottom: 2.5px;
    font-size: 7.2pt;
    line-height: 1.22;
    color: #000000;
  }
  .stimulus-card ul {
    margin: 1px 0 1px 12px;
    padding: 0;
  }
  .stimulus-card li {
    margin-bottom: 1px;
  }

  /* Ruled Lines */
  .dotted-line {
    border-bottom: 1.2px solid #000000;
    height: 6.4mm;
    width: 100%;
    box-sizing: border-box;
  }

  /* 3-Column Scaffolding Container */
  .scaffold-bar {
    border: 1.2px solid #000000;
    border-radius: 2px;
    background: #f8fafc;
    padding: 3px 5px;
    margin-bottom: 3.5px;
    font-size: 7.2pt;
    line-height: 1.22;
    display: flex;
    gap: 5px;
    color: #000000;
  }
  .scaffold-col {
    border-right: 1px solid #cbd5e1;
    padding-right: 4px;
  }
  .scaffold-col:last-child {
    border-right: none;
    padding-right: 0;
  }
  .scaffold-label {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 6.6pt;
    color: #000000;
    margin-bottom: 1.5px;
    display: block;
    letter-spacing: 0.2px;
  }
  .scaffold-content {
    color: #000000;
    font-size: 6.9pt;
    line-height: 1.22;
  }
  .scaffold-pill {
    display: inline-block;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 0.5px 3px;
    margin: 1px 1.5px 1px 0;
    font-size: 6.6pt;
    font-weight: 700;
    color: #000000;
    white-space: nowrap;
  }

  /* Progress Tracker Table on Page 1 */
  .tracker-card {
    border: 1.5px solid #000000;
    border-radius: 2px;
    background: #ffffff;
    padding: 3.5px 5px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 2.5px;
  }
  .tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 1px;
    margin-bottom: 2px;
  }
  .tracker-title {
    font-size: 8pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .tracker-sub {
    font-size: 6.6pt;
    color: #000000;
    font-style: italic;
  }
  .tracker-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.1pt;
    line-height: 1.1;
  }
  .tracker-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    text-transform: uppercase;
    padding: 1.6px 3px;
    border: 1px solid #000000;
    text-align: left;
    font-size: 6.1pt;
  }
  .tracker-table td {
    padding: 1px 3px;
    border: 1px solid #cbd5e1;
    color: #000000;
  }
  .tracker-section-hdr td {
    background: #f1f5f9;
    font-weight: 800;
    color: #000000;
    font-size: 6.2pt;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    padding: 1.2px 3px;
    border-top: 1.1px solid #000000;
    border-bottom: 1.1px solid #000000;
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
    font-size: 5.8pt;
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
    font-size: 7.5pt;
    margin-top: 2.5px;
  }
  .follow-up-table td {
    border: 1.2px solid #000000;
    padding: 5px 7px;
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
    padding: 1.5px 5px;
  }

  /* Archival Source Box */
  .archival-source-box {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 3.5px 6px;
    font-size: 7.1pt;
    line-height: 1.22;
  }
  .archival-source-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: 7.6pt;
    color: #000000;
    border-bottom: 1px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 2px;
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
    margin-top: 2px;
    padding-top: 1.5px;
    font-size: 6.4pt;
    color: #000000;
    font-weight: 600;
  }

  /* Provenance Card */
  .provenance-card {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 3.5px 6px;
    font-size: 7.1pt;
    line-height: 1.22;
    margin-bottom: 3.5px;
  }

  /* Utility Response Block */
  .utility-response-block {
    margin-bottom: 3.5px;
  }
  .utility-para-header {
    font-size: 7.4pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 2.5px;
    display: flex;
    justify-content: space-between;
  }
  .starters-box {
    background: #f8fafc;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 2.5px 5px;
    margin-bottom: 2.5px;
  }
  .starter-point {
    font-size: 7pt;
    line-height: 1.22;
    color: #000000;
    margin-bottom: 1.2px;
  }
  .starter-point:last-child {
    margin-bottom: 0;
  }

  /* 4-Mark Comparison Lab (Page 16) */
  .lab-drill-box {
    border: 1.2px solid #000000;
    border-radius: 2px;
    background: #ffffff;
    padding: 3.5px 5.5px;
    margin-bottom: 3.5px;
  }
  .lab-drill-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 2.5px;
  }
  .lab-drill-title {
    font-size: 7.6pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
  }

  /* Paired Choice Card (Page 17) */
  .choice-container {
    border: 1.2px solid #000000;
    border-radius: 2px;
    background: #f8fafc;
    padding: 3.5px 6px;
    margin-bottom: 3.5px;
    font-size: 7.1pt;
    line-height: 1.22;
  }

  /* Provenance Matrix Table (Page 30) */
  .matrix-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.5pt;
    line-height: 1.18;
    margin-top: 2.5px;
  }
  .matrix-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2.5px 4px;
    border: 1px solid #000000;
    text-align: left;
    font-size: 6.5pt;
  }
  .matrix-table td {
    padding: 2.8px 4px;
    border: 1px solid #000000;
    color: #000000;
    vertical-align: top;
  }
  .matrix-table tr:nth-child(even) {
    background: #f8fafc;
  }
  .source-type-title {
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
    display: block;
    margin-bottom: 1px;
  }

  /* Senior Examiner Masterclass (Page 31) */
  .examiner-card {
    border: 1.2px solid #000000;
    border-radius: 2px;
    background: #ffffff;
    padding: 4px 6.5px;
    margin-bottom: 4px;
  }
  .examiner-header {
    border-bottom: 1px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 2.5px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .examiner-rule-title {
    font-size: 7.6pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
  }
  .examiner-badge {
    font-size: 6.4pt;
    font-weight: 800;
    background: #000000;
    color: #ffffff;
    padding: 1px 4px;
    border-radius: 1.5px;
    text-transform: uppercase;
  }
  .examiner-body {
    font-size: 6.9pt;
    line-height: 1.24;
    color: #000000;
  }

  /* Specification Audit Checklist on Page 32 */
  .spec-audit-container {
    border: 1.5px solid #000000;
    border-radius: 2px;
    padding: 4.5px 6.5px;
    background: #ffffff;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 2.5px;
    box-sizing: border-box;
  }
  .spec-audit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 3.5px;
  }
  .spec-audit-title {
    font-size: 8.2pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .spec-audit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    flex: 1 1 auto;
  }
  .spec-audit-col {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 3px 4.5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .spec-col-banner {
    background: #000000;
    color: #ffffff;
    font-size: 6.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 1.6px 3px;
    margin-bottom: 2.5px;
    text-align: center;
    border-radius: 1px;
  }
  .spec-unit-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 1.5px;
    padding: 2.5px 4px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .spec-unit-title {
    font-size: 6.5pt;
    font-weight: 800;
    color: #000000;
    border-bottom: 1px solid #000000;
    padding-bottom: 1px;
    margin-bottom: 2px;
    text-transform: uppercase;
    line-height: 1.16;
  }
  .spec-sub-title {
    font-size: 5.9pt;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    margin-top: 1.8px;
    margin-bottom: 1px;
    border-bottom: 0.5px dashed #cbd5e1;
    padding-bottom: 0.5px;
  }
  .spec-points-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .spec-point-item {
    font-size: 5.8pt;
    line-height: 1.15;
    color: #000000;
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5px;
  }
  .spec-point-item:last-child {
    margin-bottom: 0.5px;
  }
  .spec-tick-box {
    width: 6.8px;
    height: 6.8px;
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
    padding-top: 2px;
    font-size: 6.9pt;
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
'''
