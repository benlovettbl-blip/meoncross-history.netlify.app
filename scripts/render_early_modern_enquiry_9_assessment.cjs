/**
 * History Revision Hub — Early Modern World (1450–1750)
 * Standalone Synoptic Assessment Sheet & Cover Pack: Enquiry 9
 *
 * Title: How far had Britain transformed into a modern superpower by 1750, and at what human cost?
 * Targets:
 *   - public/units/early_modern_world/enquiry_9_synoptic_assessment.html
 *   - units/early_modern_world/enquiry_9_synoptic_assessment.html
 *   - public/pdfs/early_modern_world_enquiry_9_synoptic_assessment.pdf
 *
 * Publisher Standard:
 * - 2-Page A4 Double-Sided Physical Assessment Sheet / End-of-Term Cover Pack
 * - Strict Institutional Neutrality: 0 prohibited school/teacher identifiers
 * - Commercial School Cover Customizer: data-department-name="The History Department"
 * - Cross-Referenced to Master Textbook: Pages 18–19 (Acts 1–4, Paragraphs [1.1]–[4.3])
 * - Live Micro-QR linking to Online Interactive Lesson 9
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'early_modern_world', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
}

async function renderAssessment() {
  console.log('\n======================================================');
  console.log('🏛️  Compiling Year 8 Enquiry 9 Synoptic Assessment Sheet');
  console.log('======================================================\n');

  const appUrl =
    'https://the-history-revision-hub.netlify.app/?view=lessons&unit=early_modern_world&lesson=9';
  const microQrSvg = generateQrSvg(appUrl);

  const imgEastOffering = getBase64Image('images/east_offering.jpg');
  const imgGinLane = getBase64Image('images/gin_lane.jpg');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS3 Year 8 History • Enquiry 9 Synoptic Assessment Sheet (1450–1750)</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Georgia&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.2pt;
      line-height: 1.32;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page, .page-container {
      width: 100%;
      height: 256mm;
      max-height: 256mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.6mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.1px dotted #64748b;
      height: 7.0mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 1.5px 6px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      font-weight: 700;
    }

    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"])::after {
      content: attr(data-department-name);
      display: inline-block;
      font-size: 11pt;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #0f172a;
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- PAGE 1: SYNOPTIC KNOWLEDGE & THEMATIC SYNTHESIS -->
  <!-- ========================================== -->
  <div class="page page-container" id="page-1" style="padding: 0; display: flex; flex-direction: column; justify-content: space-between; height: 256mm;">
    
    <!-- Top Header Block -->
    <div>
      <!-- Institutional Branding Header -->
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #0f172a;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; color: #475569;">Key Stage 3 Historical Studies &bull; Synoptic Assessment Series</span>
        </div>
      </div>

      <!-- Pupil Record Strip -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #f8fafc; display: grid; grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
        <div><strong>Pupil:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 68%;"></span></div>
        <div><strong>Teaching Group:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 50%;"></span></div>
        <div><strong>Target:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 50%;"></span></div>
        <div><strong>Score:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 45%;"> &nbsp; &nbsp; / 20</span></div>
        <div><strong>Term:</strong> Spring 1750</div>
      </div>

      <!-- Enquiry Title Strip with Master Textbook Reference & Micro-QR -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1; min-width: 0; padding-right: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; color: #1e3a8a; font-weight: 800;">
              KS3 Unit 2 &bull; The Early Modern World (1450–1750) &bull; Culminating Enquiry 9
            </span>
            <span style="background: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe; border-radius: 3px; padding: 1px 6px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">
              📖 Master Textbook Reference: Pages 18–19 (Acts 1–4, Paragraphs [1.1]–[4.3])
            </span>
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #0f172a; margin: 0; line-height: 1.18;">
            How far had Britain transformed into a modern superpower by 1750, and at what human cost?
          </h1>
        </div>
        <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 4px; height: 13.5mm; box-sizing: border-box;">
          <div style="width: 11.5mm; height: 11.5mm; flex-shrink: 0;">
            ${microQrSvg}
          </div>
          <div style="display: flex; flex-direction: column; font-family: 'Inter', sans-serif; font-size: 5.4pt; line-height: 1.1; color: #475569; white-space: nowrap;">
            <strong style="color: #0f172a; text-transform: uppercase; font-size: 5.6pt;">Interactive Hub</strong>
            <span>Scan for Audio, Guided</span>
            <span>Reading &amp; Exemplars</span>
          </div>
        </div>
      </div>

      <!-- Core Synoptic Objectives -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 3px 8px; margin-bottom: 2px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">
        <span><strong>1. Chronological Arc:</strong> Trace England’s shift from peripheral isolation in 1450 to global fiscal-naval superpower in 1750.</span>
        <span><strong>2. Forensic Evidence:</strong> Cite precise Master Textbook paragraphs <code>[1.1]–[4.3]</code>.</span>
        <span><strong>3. Synoptic Verdict:</strong> Balance institutional progress against transatlantic chattel slavery.</span>
      </div>
    </div>

    <!-- TASK 1: RETRIEVAL PRACTICE ('DO NOW' ARC 1450–1750) -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin: 3px 0; background: #ffffff;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Task 1: Synoptic Retrieval Practice (The 300-Year Arc)</strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 6px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
      </div>
      <div style="grid-template-columns: repeat(5, 1fr); gap: 5px; display: grid;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
            <strong style="color: #1e3a8a;">Q1 (L1):</strong> Why did the 1453 Ottoman capture of Constantinople force European oceanic exploration?
          </div>
          <div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
          </div>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
            <strong style="color: #1e3a8a;">Q2 (L2):</strong> How did the 1494 Treaty of Tordesillas &amp; Spanish silver at Potosí ignite Elizabethan privateering?
          </div>
          <div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
          </div>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
            <strong style="color: #1e3a8a;">Q3 (L5):</strong> What constitutional shift occurred between the execution of Charles I (1649) and the 1689 Bill of Rights?
          </div>
          <div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
          </div>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
            <strong style="color: #1e3a8a;">Q4 (L6):</strong> How did the Bank of England (1694) and National Debt establish the British 'Fiscal-Military State'?
          </div>
          <div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
          </div>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
            <strong style="color: #1e3a8a;">Q5 (L8):</strong> How did Queen Nanny &amp; the Jamaican Maroons prove African freedom was won through combat?
          </div>
          <div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
            <div class="task-line-dotted"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- TASK 2: CORE DISCIPLINARY VOCABULARY (DUAL-TERM KEY DIFFERENCES) -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin: 3px 0; background: #f8fafc;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.6px; color: #1e3a8a;">Task 2: Core Disciplinary Vocabulary &bull; Key Conceptual Differences</strong>
        <span class="archival-badge" style="background: #ffffff; font-size: 6.6pt;">Disciplinary Precision</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #0f172a; display: block; border-bottom: 1px solid #f1f5f9; padding-bottom: 1px; margin-bottom: 2px;">1. Constitutional vs Absolutist</strong>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0; line-height: 1.2;">
            Rule limited by parliamentary statute vs unchecked Divine Right royal prerogative.
          </p>
          <div class="task-line-dotted" style="margin-top: 2px;"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #0f172a; display: block; border-bottom: 1px solid #f1f5f9; padding-bottom: 1px; margin-bottom: 2px;">2. Fiscal State vs Feudal Dues</strong>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0; line-height: 1.2;">
            Institutional borrowing via National Debt at 3% vs arbitrary royal levies (Ship Money).
          </p>
          <div class="task-line-dotted" style="margin-top: 2px;"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #0f172a; display: block; border-bottom: 1px solid #f1f5f9; padding-bottom: 1px; margin-bottom: 2px;">3. Chattel Slavery vs Indenture</strong>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0; line-height: 1.2;">
            Lifelong legal status of humans as cargo vs temporary, time-limited contracted labor.
          </p>
          <div class="task-line-dotted" style="margin-top: 2px;"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #0f172a; display: block; border-bottom: 1px solid #f1f5f9; padding-bottom: 1px; margin-bottom: 2px;">4. Rationalism vs Dogma</strong>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0; line-height: 1.2;">
            Newtonian mathematical testing and empirical observation vs uncritical religious dogma.
          </p>
          <div class="task-line-dotted" style="margin-top: 2px;"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
      </div>
    </div>

    <!-- TASK 3: THE FOUR CORE THEMES SYNOPTIC MATRIX (WITH TEXTBOOK PARAGRAPH REFERENCES) -->
    <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; margin-top: 2px; background: #ffffff;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Task 3: The Four Core Themes Synoptic Matrix</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #64748b; margin-left: 6px;">Synthesize Master Textbook evidence across the 300-year curriculum</span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 6px; border-radius: 2px;">Master Textbook Acts 1–4</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;">
        <!-- Theme 1 -->
        <div style="border: 1px solid #cbd5e1; border-top: 2.5px solid #1e3a8a; border-radius: 3px; padding: 3px 5px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #1e3a8a; text-transform: uppercase;">1. Imperial Hegemony</strong>
            <span style="font-family: monospace; font-size: 6.6pt; font-weight: 700; color: #1e3a8a;">[1.1], [1.2]</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0 0 2px 0; line-height: 1.2;">
            Contrast England’s peripheral standing in 1450 with Royal Navy supremacy &amp; East India Company rule in 1750.
          </p>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
        <!-- Theme 2 -->
        <div style="border: 1px solid #cbd5e1; border-top: 2.5px solid #0f172a; border-radius: 3px; padding: 3px 5px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #0f172a; text-transform: uppercase;">2. Constitutional State</strong>
            <span style="font-family: monospace; font-size: 6.6pt; font-weight: 700; color: #0f172a;">[1.3], [2.3]</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0 0 2px 0; line-height: 1.2;">
            How the 1689 Bill of Rights, Bank of England &amp; Stock Exchange created political and economic stability for property owners.
          </p>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
        <!-- Theme 3 -->
        <div style="border: 1px solid #cbd5e1; border-top: 2.5px solid #0369a1; border-radius: 3px; padding: 3px 5px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #0369a1; text-transform: uppercase;">3. Scientific Rationalism</strong>
            <span style="font-family: monospace; font-size: 6.6pt; font-weight: 700; color: #0369a1;">[2.1], [2.2]</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0 0 2px 0; line-height: 1.2;">
            How Isaac Newton, the Royal Society &amp; empirical science fueled breakthroughs in navigation, mining &amp; agriculture.
          </p>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
        <!-- Theme 4 -->
        <div style="border: 1px solid #cbd5e1; border-top: 2.5px solid #b91c1c; border-radius: 3px; padding: 3px 5px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #b91c1c; text-transform: uppercase;">4. Human Cost &amp; Squalor</strong>
            <span style="font-family: monospace; font-size: 6.6pt; font-weight: 700; color: #b91c1c;">[3.1]–[3.3]</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; margin: 0 0 2px 0; line-height: 1.2;">
            How wealth was financed by the Middle Passage &amp; sugar plantations, alongside the domestic Gin Craze &amp; Bloody Code.
          </p>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
      </div>
    </div>

    <!-- Footer Strip -->
    <div class="page-footer footer-strip" style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px;">
      <span>The History Department &bull; KS3 Disciplinary Assessment &bull; Year 8 Early Modern World</span>
      <span style="font-weight: 700; color: #1e3a8a;">Page 1 of 2 (Turn overleaf for Task 4 Extended Writing) &rarr;</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 2: EXTENDED WRITING & HISTORICAL VERDICT -->
  <!-- ========================================== -->
  <div class="page page-container" id="page-2" style="padding: 0; display: flex; flex-direction: column; justify-content: space-between; height: 256mm;">
    
    <!-- Top Block: Header, Sources, Matrix & PEEL Strip -->
    <div>
      <!-- Header Bar -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.8px; color: #1e3a8a; font-weight: 800;">
            Task 4: Historical Evaluation &amp; Synoptic Verdict &bull; Edexcel GCSE Papers 1 &amp; 3 Disciplinary Preparation
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 1px 0 0 0; line-height: 1.2;">
            Enquiry: How far had Britain transformed into a modern superpower by 1750, and at what human cost?
          </h2>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex-shrink: 0;">
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; font-size: 6.8pt;">Independent Synoptic Essay</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #1e3a8a; background: #ffffff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 1px 5px;">📖 Cite Evidence: Paragraphs [1.1]–[4.3]</span>
        </div>
      </div>

      <!-- Dual Primary Archival Sources Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
        <!-- Source A -->
        <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e3a8a; text-transform: uppercase;">Source A: Spiridione Roma (1778)</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b;">EIC Boardroom Ceiling Painting</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 2px;">
              <img src="${imgEastOffering}" style="width: 34mm; height: 20mm; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;" alt="The East Offering Its Riches to Britannia">
              <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; font-style: italic; margin: 0; line-height: 1.22;">
                "The East Offering Its Riches to Britannia: depicts Britannia seated peacefully beneath an olive branch, graciously receiving pearls, porcelain, and tea from kneeling Asian figures."
              </p>
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.18;">
            <strong>Context &amp; Hinge:</strong> Projects British elite self-image as a benevolent, enlightened superpower. <em>Hinge: How does this painting conceal the military violence and taxation of the EIC?</em>
          </div>
        </div>

        <!-- Source B -->
        <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #b91c1c; text-transform: uppercase;">Source B: William Hogarth (1751)</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b;">"Gin Lane" Satirical Social Engraving</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 2px;">
              <img src="${imgGinLane}" style="width: 34mm; height: 20mm; object-fit: cover; border-radius: 2px; border: 1px solid #cbd5e1;" alt="William Hogarth Gin Lane Engraving">
              <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; font-style: italic; margin: 0; line-height: 1.22;">
                "Exposes infant abandonment, suicide, and social collapse in London’s St Giles parish during the Gin Craze, where barely 20% of slum children survived to adulthood."
              </p>
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #991b1b; background: #fef2f2; border: 1px solid #fecaca; border-radius: 2px; padding: 2px 4px; line-height: 1.18;">
            <strong>Context &amp; Hinge:</strong> Exposes the grim domestic poverty beneath imperial wealth. <em>Hinge: Does Gin Lane prove that economic modernity brought social degradation rather than progress?</em>
          </div>
        </div>
      </div>

      <!-- 3-Column Disciplinary Planning Matrix -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; background: #f8fafc; margin-bottom: 3px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 2px;">
          <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 4px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">
              1. Institutional Modernity [1.2, 1.3, 2.1, 2.3]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; line-height: 1.18; display: block;">
              Bank of England (1694), National Debt, Royal Navy supremacy, parliamentary supremacy (1689), Newtonian science &amp; Royal Exchange commerce.
            </span>
          </div>
          <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 4px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #b91c1c; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">
              2. Human Cost &amp; Brutality [3.1, 3.2, 3.3]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; line-height: 1.18; display: block;">
              12.5M enslaved Africans trapped in the Middle Passage; Caribbean sugar lash; domestic Gin Lane squalor, rural enclosures &amp; Bloody Code (200+ capital offenses).
            </span>
          </div>
          <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 4px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #0f172a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">
              3. Evaluative Synoptic Verdict [4.1, 4.2, 4.3]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; line-height: 1.18; display: block;">
              Whig view (liberty, science &amp; capitalism) vs Postcolonial view (predatory exploitation). Britain was a modern state built upon unfree labor.
            </span>
          </div>
        </div>
        <div style="border-top: 1px dashed #cbd5e1; padding-top: 1.5px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #475569; line-height: 1.2;">
          <strong>Sentence Starters &amp; Connectives:</strong> <em>"On the one hand, early modern Britain indisputably pioneered modern institutional structures, demonstrated by [2.3]..." &bull; "Crucially, this commercial ascendancy was directly underwritten by [3.1]..." &bull; "Conversely, Source B exposes that beneath the veneer of Enlightenment sophistication lay..." &bull; "In weighing the evidence, Britain’s 1750 modernity was fundamentally contradictory because..."</em>
        </div>
      </div>

      <!-- Writing Framework Strip (PEEL Historical Argument) -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 2.5px 7px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b;">
        <span><strong style="color: #1e3a8a;">[P] Point:</strong> Direct answer addressing superpower status AND human cost.</span>
        <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific paragraph numbers <code>[1.2]</code>, Acts, dates &amp; sources.</span>
        <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism linking finance to slavery.</span>
        <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluative verdict on historical contradiction.</span>
      </div>

      <!-- Ruled Writing Lines (20 Lines at 7.6mm Line Height) -->
      <div class="auto-fill-writing-lines" style="width: 100%; margin-bottom: 2px;">
        ${Array(20).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
      </div>
    </div>

    <!-- Bottom Section: Formal Teacher Assessment & Feedback Rubric -->
    <div>
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px; font-family: 'Inter', sans-serif;">
          <strong style="font-size: 7.4pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Teacher Assessment &amp; Feedback Ledger &bull; Enquiry 9 Synoptic Portfolio</strong>
          <div style="display: flex; gap: 8px; font-size: 7.2pt;">
            <span><strong>Effort:</strong> 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5</span>
            <span style="color: #1e3a8a; font-weight: 700; background: #eff6ff; border: 1px solid #bfdbfe; padding: 0.5px 6px; border-radius: 2px;">Mark: &nbsp; &nbsp; &nbsp; / 20</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2;">
          <div>
            <strong style="color: #15803d; text-transform: uppercase;">What Went Well (WWW):</strong>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1px 4px; margin-top: 1px; color: #334155;">
              <div>&bull; [ &nbsp; ] Accurate 1450–1750 chronological synthesis</div>
              <div>&bull; [ &nbsp; ] Balanced power vs human cost</div>
              <div>&bull; [ &nbsp; ] Deployed textbook paras [1.1]–[4.3]</div>
              <div>&bull; [ &nbsp; ] Critical evaluation of Sources A &amp; B</div>
            </div>
          </div>
          <div>
            <strong style="color: #b91c1c; text-transform: uppercase;">Even Better If (EBI):</strong>
            <div style="border-bottom: 1px dotted #94a3b8; height: 12px; margin-top: 1px;"></div>
            <div style="display: flex; justify-content: space-between; margin-top: 2px; color: #64748b;">
              <span>Teacher Initials: __________</span>
              <span>Date: ____________</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Page 2 Footer Strip -->
      <div class="page-footer footer-strip" style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 2px;">
        <span>The History Department &bull; KS3 Disciplinary Assessment &bull; Year 8 Early Modern World</span>
        <span style="font-weight: 700; color: #1e3a8a;">Page 2 of 2 &bull; Standalone End-of-Term Portfolio Record</span>
      </div>
    </div>
  </div>

</body>
</html>`;

  // Write HTML to public/units and units/
  const htmlOutPublic = path.join(
    ROOT_DIR,
    'public',
    'units',
    'early_modern_world',
    'enquiry_9_synoptic_assessment.html',
  );
  const htmlOutUnit = path.join(
    ROOT_DIR,
    'units',
    'early_modern_world',
    'enquiry_9_synoptic_assessment.html',
  );

  fs.writeFileSync(htmlOutPublic, html, 'utf8');
  fs.writeFileSync(htmlOutUnit, html, 'utf8');
  console.log(`✅ Saved HTML: ${htmlOutPublic}`);
  console.log(`✅ Saved HTML: ${htmlOutUnit}`);

  // Compile PDF via Puppeteer
  if (!fs.existsSync(PDFS_DIR)) {
    fs.mkdirSync(PDFS_DIR, { recursive: true });
  }
  const pdfOut = path.join(PDFS_DIR, 'early_modern_world_enquiry_9_synoptic_assessment.pdf');

  console.log(`🚀 Compiling PDF via Puppeteer -> ${pdfOut}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfOut,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '12mm',
      right: '12mm',
    },
  });

  await browser.close();
  console.log(`🎉 Successfully compiled standalone assessment PDF: ${pdfOut}`);

  const distPdfDir = path.join(ROOT_DIR, 'dist', 'pdfs');
  if (fs.existsSync(distPdfDir)) {
    const distPdf = path.join(distPdfDir, 'early_modern_world_enquiry_9_synoptic_assessment.pdf');
    fs.copyFileSync(pdfOut, distPdf);
    console.log(`✅ Synchronized PDF to: ${distPdf}`);
  }

  const stats = fs.statSync(pdfOut);
  console.log(`📊 PDF File Size: ${(stats.size / 1024).toFixed(1)} KB`);
}

if (require.main === module) {
  renderAssessment().catch((err) => {
    console.error('❌ Error compiling assessment sheet:', err);
    process.exit(1);
  });
}

module.exports = { renderAssessment };
