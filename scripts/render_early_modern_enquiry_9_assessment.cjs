/**
 * History Revision Hub — Early Modern World (1450–1750)
 * Standalone Synoptic Assessment Sheet & Workload-Reduction Master Paper: Enquiry 9
 *
 * Title: How far had Britain transformed into a modern superpower by 1750, and at what human cost?
 * Targets:
 *   - public/units/early_modern_world/enquiry_9_synoptic_assessment.html
 *   - units/early_modern_world/enquiry_9_synoptic_assessment.html
 *   - public/pdfs/early_modern_world_enquiry_9_synoptic_assessment.pdf
 *
 * Pragmatic Workload-Reduction Architecture (EEF & Dylan Wiliam Standard):
 * - Page 1: Objective Knowledge & Chronology Engine (15 Marks)
 *   • Right-margin response boxes for instant vertical optical scanning.
 *   • In-class peer/self-audit protocol (0 minutes teacher marking outside lessons).
 * - Page 2: Single Focal Evaluative Essay (25 Marks)
 *   • Single 18-line sustained historical argument.
 *   • Pre-printed 4-Level Mastery Rubric + diagnostic WWW / EBI checkboxes (15-second marking).
 *   • Dedicated 3-line Pupil DIRT correction box (pupil does the cognitive work).
 *   • Total teacher marking time per script: 60–75 seconds (~35 mins for a class of 30).
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

async function renderAssessment() {
  console.log('\n================================================================');
  console.log('🏛️  Compiling Year 8 Enquiry 9 Workload-Reduction Assessment Sheet');
  console.log('================================================================\n');

  const appUrl =
    'https://the-history-revision-hub.netlify.app/?view=lessons&unit=early_modern_world&lesson=9';
  const microQrSvg = generateQrSvg(appUrl);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS3 Year 8 History • Enquiry 9 Summative Unit Assessment (1450–1750)</title>
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
      font-size: 8.0pt;
      line-height: 1.28;
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
      border-bottom: 1.15px solid #475569;
      height: 7.0mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.1px dotted #64748b;
      height: 6.8mm;
      width: 100%;
      box-sizing: border-box;
    }
    .margin-box {
      width: 18mm;
      height: 6.8mm;
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 800;
      background: #ffffff;
      color: #0f172a;
      flex-shrink: 0;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
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

  <!-- ================================================================== -->
  <!-- PAGE 1: SUBSTANTIVE KNOWLEDGE & CHRONOLOGY ENGINE (15 MARKS)       -->
  <!-- In-Class Peer/Self-Audit Protocol (0 Mins Teacher Marking Outside) -->
  <!-- ================================================================== -->
  <div class="page page-container" id="page-1" style="padding: 0; display: flex; flex-direction: column; justify-content: space-between; height: 256mm;">
    
    <!-- Top Block: Header, Pupil Record, Enquiry Banner -->
    <div>
      <!-- Institutional Branding Header -->
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 10.5pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #0f172a;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; color: #475569;">Key Stage 3 Historical Studies &bull; Summative Assessment Series</span>
        </div>
      </div>

      <!-- Pupil Record Strip with Instant Score Tally -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 3px 8px; margin-bottom: 3px; background: #f8fafc; display: grid; grid-template-columns: 2fr 1.1fr 1.3fr 1fr 1.2fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; align-items: center;">
        <div><strong>Pupil:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 66%;"></span></div>
        <div><strong>Class:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 50%;"></span></div>
        <div><strong>Target:</strong> EM &bull; EM+ &bull; EXP &bull; EXP+ &bull; GD</div>
        <div><strong>Date:</strong> <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 55%;"></span></div>
        <div style="background: #ffffff; border: 1.2px solid #1e3a8a; border-radius: 3px; padding: 1px 6px; text-align: center; color: #1e3a8a; font-weight: 800;">
          TOTAL SCORE: &nbsp; &nbsp; &nbsp; / 40
        </div>
      </div>

      <!-- Enquiry Title Strip with Master Textbook Reference & Micro-QR -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1; min-width: 0; padding-right: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.8px; color: #1e3a8a; font-weight: 800;">
              KS3 Unit 2 &bull; The Early Modern World (1450–1750) &bull; End-of-Unit Summative Assessment
            </span>
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 0; line-height: 1.18;">
            How far had Britain transformed into a modern superpower by 1750, and at what human cost?
          </h1>
        </div>
        <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 4px; height: 12.5mm; box-sizing: border-box;">
          <div style="width: 10.5mm; height: 10.5mm; flex-shrink: 0;">
            ${microQrSvg}
          </div>
          <div style="display: flex; flex-direction: column; font-family: 'Inter', sans-serif; font-size: 5.2pt; line-height: 1.1; color: #475569; white-space: nowrap;">
            <strong style="color: #0f172a; text-transform: uppercase; font-size: 5.5pt;">Assessment Portal</strong>
            <span>Scan for Exemplars &amp;</span>
            <span>Revision Resources</span>
          </div>
        </div>
      </div>

      <!-- Protocol Banner: In-Class Self/Peer-Audit Engine -->
      <div style="background: #eff6ff; border: 1.2px solid #bfdbfe; border-radius: 3px; padding: 2.5px 8px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e3a8a;">
        <span><strong>⚡ Section A &amp; B: Knowledge Engine:</strong> Write all answers in the right-hand margin boxes. Audited in class in green/purple pen.</span>
        <span style="font-weight: 800; background: #ffffff; border: 1px solid #bfdbfe; padding: 0.5px 6px; border-radius: 2px;">Page 1 Score: &nbsp; &nbsp; / 15</span>
      </div>
    </div>

    <!-- SECTION A, B, C CENTRAL BODY STRETCH -->
    <div class="page-body-stretch" style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: 8px; margin: 2px 0;">
      <!-- SECTION A: CHRONOLOGICAL ARC & TURNING POINTS (4 MARKS) -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">
            Section A: Chronological Arc &bull; Causal Turning Points (1450–1750)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #1e3a8a;">[4 Marks &bull; 1 Mark Each]</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.9pt; color: #475569; margin-bottom: 3px;">
          Number the turning points in correct chronological order from <strong>1 (earliest)</strong> to <strong>4 (latest)</strong> in the right-hand margin boxes:
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 3.5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 6px;">
            <span style="font-size: 7.1pt; color: #1e293b;">
              <strong>A.</strong> The Bank of England is founded and the National Debt created, establishing the British Fiscal-Military State.
            </span>
            <div class="margin-box">Order: [ &nbsp; ]</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 6px;">
            <span style="font-size: 7.1pt; color: #1e293b;">
              <strong>B.</strong> The Ottoman Empire captures Constantinople, closing Silk Road overland access and forcing European oceanic navigation.
            </span>
            <div class="margin-box">Order: [ &nbsp; ]</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 6px;">
            <span style="font-size: 7.1pt; color: #1e293b;">
              <strong>C.</strong> King Charles I is tried and executed for high treason, inaugurating the Commonwealth and Cromwellian Protectorate.
            </span>
            <div class="margin-box">Order: [ &nbsp; ]</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2.5px 6px;">
            <span style="font-size: 7.1pt; color: #1e293b;">
              <strong>D.</strong> Elizabethan privateers intercept Spanish silver fleets from Potosí, sparking the Anglo-Spanish naval conflict.
            </span>
            <div class="margin-box">Order: [ &nbsp; ]</div>
          </div>
        </div>
      </div>

      <!-- SECTION B: CORE SUBSTANTIVE KNOWLEDGE RETRIEVAL (6 MARKS) -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">
            Section B: Core Substantive Knowledge &bull; Enquiries 1–8 Retrieval
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #1e3a8a;">[6 Marks &bull; 1 Mark Each]</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.9pt; color: #475569; margin-bottom: 3px;">
          Write the letter of the correct answer (<strong>A, B, C, or D</strong>) clearly in the right-hand margin box:
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px;">
          <!-- Q1 -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e2e8f0; padding-bottom: 2px;">
            <div style="flex: 1; padding-right: 8px;">
              <div style="font-size: 7.1pt; color: #0f172a;"><strong>1. (L2)</strong> Which 1494 papal agreement divided non-European oceanic navigation between Spain and Portugal?</div>
              <div style="font-size: 6.7pt; color: #475569;">[A] Treaty of Utrecht &bull; [B] Treaty of Tordesillas &bull; [C] Edict of Nantes &bull; [D] Peace of Westphalia</div>
            </div>
            <div class="margin-box">Answer: [ &nbsp; ]</div>
          </div>
          <!-- Q2 -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e2e8f0; padding-bottom: 2px;">
            <div style="flex: 1; padding-right: 8px;">
              <div style="font-size: 7.1pt; color: #0f172a;"><strong>2. (L3)</strong> How did the English East India Company (EIC) transform from humble trading posts into a territorial empire?</div>
              <div style="font-size: 6.7pt; color: #475569;">[A] Through papal grants &bull; [B] Private joint-stock armies &amp; tax collection &bull; [C] Crown conquest &bull; [D] Religious conversions</div>
            </div>
            <div class="margin-box">Answer: [ &nbsp; ]</div>
          </div>
          <!-- Q3 -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e2e8f0; padding-bottom: 2px;">
            <div style="flex: 1; padding-right: 8px;">
              <div style="font-size: 7.1pt; color: #0f172a;"><strong>3. (L4)</strong> Why did the 1605 Gunpowder Plot escalate sectarian religious tension under King James I?</div>
              <div style="font-size: 6.7pt; color: #475569;">[A] Sparked harsh recusancy laws &amp; anti-Catholic oaths &bull; [B] Ended Catholic fines &bull; [C] Forced war with France &bull; [D] Closed Parliament</div>
            </div>
            <div class="margin-box">Answer: [ &nbsp; ]</div>
          </div>
          <!-- Q4 -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e2e8f0; padding-bottom: 2px;">
            <div style="flex: 1; padding-right: 8px;">
              <div style="font-size: 7.1pt; color: #0f172a;"><strong>4. (L6)</strong> What financial breakthrough allowed 18th-century Britain to out-borrow and out-gun absolute monarchies like France?</div>
              <div style="font-size: 6.7pt; color: #475569;">[A] Seizing Dutch gold &bull; [B] Ship Money taxes &bull; [C] Bank of England National Debt at 3% interest &bull; [D] Selling royal land</div>
            </div>
            <div class="margin-box">Answer: [ &nbsp; ]</div>
          </div>
          <!-- Q5 -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e2e8f0; padding-bottom: 2px;">
            <div style="flex: 1; padding-right: 8px;">
              <div style="font-size: 7.1pt; color: #0f172a;"><strong>5. (L7)</strong> What was the economic cornerstone of British merchant wealth generated in Caribbean colonies like Jamaica and Barbados?</div>
              <div style="font-size: 6.7pt; color: #475569;">[A] Silver mining &bull; [B] Enslaved sugar monoculture &bull; [C] Beaver fur trapping &bull; [D] Domestic coal mining</div>
            </div>
            <div class="margin-box">Answer: [ &nbsp; ]</div>
          </div>
          <!-- Q6 -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1; padding-right: 8px;">
              <div style="font-size: 7.1pt; color: #0f172a;"><strong>6. (L8)</strong> How did Queen Nanny and the Jamaican Windward Maroons force the British Crown to sign the 1739 Peace Treaty?</div>
              <div style="font-size: 6.7pt; color: #475569;">[A] Legal petitions in London &bull; [B] Guerrilla mountain warfare &bull; [C] Naval blockades &bull; [D] Paying annual silver ransoms</div>
            </div>
            <div class="margin-box">Answer: [ &nbsp; ]</div>
          </div>
        </div>
      </div>

      <!-- SECTION C: DUAL-TERM DISCIPLINARY DISTINCTION (5 MARKS) -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">
            Section C: Disciplinary Literacy &bull; Dual-Term Conceptual Distinction
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #1e3a8a;">[5 Marks Total]</span>
        </div>
        
        <!-- Term Distinction 1 -->
        <div style="margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; font-size: 7.1pt; color: #0f172a; margin-bottom: 1px;">
            <span><strong>7. Constitutional Monarchy vs Royal Absolutism:</strong> Explain the crucial historical difference:</span>
            <span style="font-size: 6.8pt; font-weight: 700; color: #1e3a8a;">[2 Marks]</span>
          </div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>

        <!-- Term Distinction 2 -->
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 7.1pt; color: #0f172a; margin-bottom: 1px;">
            <span><strong>8. Indentured Servitude vs Transatlantic Chattel Slavery:</strong> Explain the crucial legal difference:</span>
            <span style="font-size: 6.8pt; font-weight: 700; color: #1e3a8a;">[3 Marks]</span>
          </div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
      </div>
    </div>

    <!-- Page 1 Footer Strip & Audit Box -->
    <div>
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 2.5px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.0pt; margin-bottom: 2px;">
        <div><strong>In-Class Peer Audit:</strong> Verified by: <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 100px;"></span></div>
        <div>Sec A: <strong>&nbsp; &nbsp; / 4</strong> &bull; Sec B: <strong>&nbsp; &nbsp; / 6</strong> &bull; Sec C: <strong>&nbsp; &nbsp; / 5</strong></div>
        <div style="background: #ffffff; border: 1.2px solid #1e3a8a; border-radius: 2px; padding: 1px 6px; font-weight: 800; color: #1e3a8a;">
          PAGE 1 AUDIT TOTAL: &nbsp; &nbsp; / 15
        </div>
      </div>

      <div class="page-footer footer-strip" style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 2px;">
        <span>The History Department &bull; KS3 Disciplinary Assessment &bull; Year 8 Early Modern World</span>
        <span style="font-weight: 700; color: #1e3a8a;">Page 1 of 2 &bull; Turn overleaf for Section D Extended Essay &rarr;</span>
      </div>
    </div>
  </div>

  <!-- ================================================================== -->
  <!-- PAGE 2: EXTENDED EVALUATIVE ESSAY & DIAGNOSTIC LEDGER (25 MARKS)   -->
  <!-- Teacher Only Marks Page 2: Target Marking Time 60–75 Seconds       -->
  <!-- ================================================================== -->
  <div class="page page-container" id="page-2" style="padding: 0; display: flex; flex-direction: column; justify-content: space-between; height: 256mm;">
    
    <!-- Top Block: Header, Stimulus Debate Box, Ruled Writing Lines -->
    <div>
      <!-- Header Bar -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; color: #1e3a8a; font-weight: 800;">
            Section D: Synoptic Evaluative Argument &bull; Edexcel GCSE Foundation Standard
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #0f172a; margin: 1px 0 0 0; line-height: 1.18;">
            Enquiry: How far had Britain transformed into a modern superpower by 1750, and at what human cost?
          </h2>
        </div>
        <div style="display: flex; gap: 6px; align-items: baseline; flex-shrink: 0;">
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; font-size: 6.8pt;">Teacher Assessed</span>
          <div class="margin-box" style="height: 6.8mm; width: 22mm; border-color: #1e3a8a; color: #1e3a8a;">
            Essay: &nbsp; &nbsp; / 25
          </div>
        </div>
      </div>

      <!-- Stimulus Debate Box (Historiographical Tension) -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; background: #f8fafc; margin-bottom: 2px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 2px;">
          <!-- Viewpoint 1 -->
          <div style="border-left: 3px solid #1e3a8a; background: #ffffff; padding: 2px 5px; border-radius: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; color: #1e3a8a; text-transform: uppercase;">Viewpoint 1: Modern Institutional Superpower</strong>
            <p style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #334155; margin: 0; line-height: 1.18;">
              "By 1750, Britain pioneered modern governance: parliamentary supremacy (1689), the Bank of England, naval dominance, and scientific rationalism."
            </p>
          </div>
          <!-- Viewpoint 2 -->
          <div style="border-left: 3px solid #b91c1c; background: #ffffff; padding: 2px 5px; border-radius: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; color: #b91c1c; text-transform: uppercase;">Viewpoint 2: Predatory Exploitation &amp; Human Cost</strong>
            <p style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #334155; margin: 0; line-height: 1.18;">
              "British modernity was fundamentally built upon transatlantic chattel slavery, Middle Passage terror, colonial conquest in Bengal, and domestic Gin Lane squalor."
            </p>
          </div>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.7pt; color: #475569; border-top: 1px dashed #cbd5e1; padding-top: 1.5px; line-height: 1.15;">
          <strong>Assessment Task:</strong> Write a balanced historical evaluation. You must: <strong>(1)</strong> assess both viewpoints using specific facts from across Enquiries 1–8, <strong>(2)</strong> explain causal links between financial modernity and colonial slavery, and <strong>(3)</strong> reach a sustained historical verdict.
        </div>
      </div>
    </div>

    <!-- Central Body Stretch: Ruled Writing Lines -->
    <div class="page-body-stretch" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 1px 0;">
      <div class="auto-fill-writing-lines" style="width: 100%; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
        ${Array(21).fill('<div class="task-line" style="height: 6.8mm;"></div>').join('')}
      </div>
    </div>

    <!-- Bottom Section: Teacher Diagnostic Feedback Ledger & Pupil DIRT Box -->
    <div>
      <!-- Teacher Diagnostic Ledger (15-Second Action) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-bottom: 2px;">
        
        <!-- Rubric Level Grid: EM / EM+ / EXP / EXP+ / GD -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 3px; margin-bottom: 3px; font-family: 'Inter', sans-serif;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 3px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; font-size: 6.5pt; font-weight: 800; color: #475569;">
              <span>EM [1–5m]</span>
              <span>1–2</span>
            </div>
            <div style="font-size: 5.9pt; color: #64748b; line-height: 1.12;">Descriptive/one-sided; lacks precise facts or causal links.</div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 3px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; font-size: 6.5pt; font-weight: 800; color: #1e3a8a;">
              <span>EM+ [6–10m]</span>
              <span>3</span>
            </div>
            <div style="font-size: 5.9pt; color: #64748b; line-height: 1.12;">Developing recall; outlines power and cost; basic explanation.</div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 3px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; font-size: 6.5pt; font-weight: 800; color: #0284c7;">
              <span>EXP [11–15m]</span>
              <span>4–5</span>
            </div>
            <div style="font-size: 5.9pt; color: #64748b; line-height: 1.12;">Balanced argument; deploys specific dates/acts; supported verdict.</div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 3px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; font-size: 6.5pt; font-weight: 800; color: #15803d;">
              <span>EXP+ [16–20m]</span>
              <span>6–7</span>
            </div>
            <div style="font-size: 5.9pt; color: #64748b; line-height: 1.12;">Consistent analytical balance; links finance to slavery; sustained verdict.</div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 3px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; font-size: 6.5pt; font-weight: 800; color: #b91c1c;">
              <span>GD [21–25m]</span>
              <span>8–9</span>
            </div>
            <div style="font-size: 5.9pt; color: #64748b; line-height: 1.12;">Sophisticated synoptic synthesis; evaluates contradictions; criteria-led judgment.</div>
          </div>
        </div>

        <!-- Diagnostic Checkboxes: WWW & EBI -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.18; border-top: 1px solid #e2e8f0; padding-top: 2px; margin-bottom: 2px;">
          <!-- WWW Column -->
          <div>
            <strong style="color: #15803d; text-transform: uppercase;">What Went Well (Teacher Ticks):</strong>
            <div style="display: flex; flex-direction: column; gap: 1px; color: #334155; margin-top: 1px;">
              <div>[ &nbsp; ] <strong>W1:</strong> Balanced evaluation weighing institutional power vs human cost.</div>
              <div>[ &nbsp; ] <strong>W2:</strong> Precise substantive knowledge deployed (1689 Bill, Bank of England, sugar).</div>
              <div>[ &nbsp; ] <strong>W3:</strong> Strong causal explanation linking financial modernity to transatlantic slavery.</div>
              <div>[ &nbsp; ] <strong>W4:</strong> Nuanced, criteria-led historical judgment.</div>
            </div>
          </div>
          <!-- EBI Column -->
          <div>
            <strong style="color: #b91c1c; text-transform: uppercase;">Even Better If (Targeted Action):</strong>
            <div style="display: flex; flex-direction: column; gap: 1px; color: #334155; margin-top: 1px;">
              <div>[ &nbsp; ] <strong>E1 (Evidence):</strong> Replace general statements with precise dates, acts, or figures.</div>
              <div>[ &nbsp; ] <strong>E2 (Balance):</strong> Fully evaluate the counter-viewpoint before reaching your verdict.</div>
              <div>[ &nbsp; ] <strong>E3 (Causation):</strong> Explain <em>why</em> and <em>how</em> institutions caused change, not just <em>what</em>.</div>
              <div>[ &nbsp; ] <strong>E4 (Verdict):</strong> Justify your final judgment using explicit historical criteria.</div>
            </div>
          </div>
        </div>

        <!-- Score Summary Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #0f172a; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.0pt;">
          <div>
            Teacher Signature: <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 60px;"></span> &bull; 
            Date: <span style="border-bottom: 1px dotted #0f172a; display: inline-block; width: 45px;"></span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span>Sec D: <strong>&nbsp; &nbsp; / 25</strong> + Page 1: <strong>&nbsp; &nbsp; / 15</strong> = <strong>&nbsp; &nbsp; / 40</strong></span>
            <div style="background: #0f172a; color: #ffffff; padding: 1.5px 8px; border-radius: 3px; font-weight: 800; font-size: 7.0pt; display: flex; gap: 6px; align-items: center;">
              <span>AWARDED LEVEL:</span>
              <span>[ ] EM &nbsp; [ ] EM+ &nbsp; [ ] EXP &nbsp; [ ] EXP+ &nbsp; [ ] GD</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dedicated Pupil DIRT Box (Pupil Does Cognitive Work) -->
      <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 2px 6px; background: #eff6ff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px; font-family: 'Inter', sans-serif;">
          <strong style="font-size: 6.8pt; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">
            Pupil DIRT Action (Directed Improvement &amp; Reflection Time)
          </strong>
          <span style="font-size: 6.4pt; color: #1e3a8a;">Target Code: <strong>[ E1 ] &nbsp; [ E2 ] &nbsp; [ E3 ] &nbsp; [ E4 ]</strong></span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.3pt; color: #334155; margin-bottom: 1px;">
          Using your purple pen and the model upgrade projected on the board, rewrite or expand your argument to resolve your targeted EBI:
        </div>
        <div class="task-line-dotted" style="height: 5.8mm;"></div>
        <div class="task-line-dotted" style="height: 5.8mm;"></div>
        <div class="task-line-dotted" style="height: 5.8mm;"></div>
      </div>

      <!-- Page 2 Footer Strip -->
      <div class="page-footer footer-strip" style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 2px;">
        <span>The History Department &bull; KS3 Disciplinary Assessment &bull; Year 8 Early Modern World</span>
        <span style="font-weight: 700; color: #1e3a8a;">Page 2 of 2 &bull; Standalone Summative Assessment Record</span>
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
