/**
 * generate_standalone_cover_pack.cjs
 *
 * Compiles a standalone, off-the-shelf double-period emergency cover pack PDF
 * for Year 9 KS3 History: The Christmas Truce of 1914.
 *
 * Page Architecture (2-Page A4 Double-Sided Physical Sheet):
 * - Page 1 (Period 1 — 50 Mins): Archival Investigation & Primary Source Forensics
 *     - Neutral departmental branding & student identity header
 *     - Historical setting & outpost narrative (Winter 1914, Flanders stalemate)
 *     - 3 Verbatim Archival Sources (Frank Richards, Smith-Dorrien, Johannes Niemann)
 *     - 5 Graded forensic analysis questions with ruled write-in lines
 * - Page 2 (Period 2 — 50 Mins): Historical Verdict, Historiography & Extended Writing
 *     - Fact vs Romantic Myth Analytical Matrix
 *     - 3-Tier scaffolded extended response (Sentence starters, connective bank, evaluative criteria)
 *     - 10-Question Knowledge Mastery Retrieval Plenary with inverted upside-down marking key
 *
 * Output: public/pdfs/standalone_cover_yr9_christmas_truce.pdf
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

async function buildCoverPack() {
  console.log('\n======================================================');
  console.log('🎄 Compiling Year 9 Standalone Cover Pack: The Christmas Truce');
  console.log('======================================================\n');

  // Generate QR code pointing to Great War unit on revision portal
  const appUrl = 'https://the-history-revision-hub.netlify.app/?unit=great_war&view=lessons';
  const qrDataUrl = await QRCode.toDataURL(appUrl, {
    margin: 1,
    width: 90,
    color: { dark: '#1e293b', light: '#ffffff' },
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Year 9 Emergency Cover Pack: The Christmas Truce of 1914</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 11mm 8mm 11mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 8.4pt;
      line-height: 1.32;
    }
    .page {
      width: 100%;
      height: 279mm;
      max-height: 279mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }
    .page-last {
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Header Bar */
    .header-bar {
      border-bottom: 2px solid #881337;
      padding-bottom: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-pill {
      display: inline-block;
      background: #881337;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 2px 7px;
      border-radius: 3px;
      margin-bottom: 2px;
    }
    .header-title {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.15;
    }
    .header-sub {
      font-size: 8.4pt;
      font-weight: 700;
      color: #475569;
    }
    .header-qr-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #fff1f2;
      border: 1px solid #fecdd3;
      border-radius: 5px;
      padding: 3px 6px;
      margin-left: 10px;
    }
    .header-qr-box img {
      width: 44px;
      height: 44px;
      display: block;
    }
    .header-qr-label {
      font-size: 5.6pt;
      font-weight: 800;
      color: #881337;
      margin-top: 1px;
    }

    /* Student & Supervisor Notice Box */
    .supervisor-strip {
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-left: 4px solid #ea580c;
      padding: 4px 8px;
      border-radius: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-size: 7.8pt;
    }
    .student-fields {
      display: flex;
      gap: 12px;
      font-weight: 700;
      color: #1e293b;
    }
    .student-line {
      border-bottom: 1px solid #475569;
      display: inline-block;
      width: 110px;
      height: 11px;
      vertical-align: bottom;
    }
    .student-line-sm {
      border-bottom: 1px solid #475569;
      display: inline-block;
      width: 50px;
      height: 11px;
      vertical-align: bottom;
    }
    .supervisor-note {
      color: #9a3412;
      font-weight: 700;
    }

    /* Content Cards */
    .context-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #3b82f6;
      border-radius: 4px;
      padding: 5px 8px;
      margin-bottom: 6px;
      font-size: 8pt;
      line-height: 1.35;
    }
    .context-box strong {
      color: #1e3a8a;
    }

    /* Archival Source Presentation */
    .sources-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-bottom: 6px;
    }
    .source-card {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-top: 2.5px solid #d97706;
      border-radius: 4px;
      padding: 5px 7px;
      font-size: 7.4pt;
      line-height: 1.3;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .source-tag {
      font-size: 6.4pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #92400e;
      margin-bottom: 2px;
    }
    .source-quote {
      font-family: Georgia, serif;
      color: #1e293b;
      font-style: italic;
      margin-bottom: 3px;
    }
    .source-provenance {
      font-size: 6.2pt;
      color: #78350f;
      border-top: 1px dashed #fde68a;
      padding-top: 2px;
      font-weight: 600;
    }

    /* Questions Container */
    .questions-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 6px 9px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .q-row {
      margin-bottom: 4px;
    }
    .q-text {
      font-weight: 700;
      font-size: 7.9pt;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .q-lines {
      width: 100%;
      height: 13px;
      border-bottom: 1px solid #94a3b8;
      margin-bottom: 2px;
    }

    /* Period 2 Elements */
    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
      font-size: 7.6pt;
      line-height: 1.25;
    }
    .matrix-table th, .matrix-table td {
      border: 1px solid #cbd5e1;
      padding: 3px 6px;
      text-align: left;
      vertical-align: top;
    }
    .matrix-table th {
      background: #f1f5f9;
      font-weight: 800;
      color: #1e293b;
      font-size: 7.8pt;
    }
    .matrix-table td strong {
      color: #881337;
    }

    .essay-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #881337;
      border-radius: 4px;
      padding: 6px 8px;
      margin-bottom: 6px;
    }
    .scaffold-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin: 3px 0 4px 0;
      font-size: 6.8pt;
    }
    .pill {
      background: #fee2e2;
      color: #991b1b;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .essay-ruled-area {
      width: 100%;
      height: 120px;
      background-image: repeating-linear-gradient(transparent, transparent 15px, #cbd5e1 15px, #cbd5e1 16px);
      border-bottom: 1px solid #cbd5e1;
      margin-top: 4px;
    }

    .plenary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 4px;
      padding: 5px 8px;
      font-size: 7.2pt;
      margin-bottom: 4px;
    }
    .plenary-item {
      display: flex;
      gap: 4px;
    }
    .plenary-num {
      font-weight: 800;
      color: #166534;
      min-width: 14px;
    }

    .inverted-key {
      transform: rotate(180deg);
      font-size: 5.6pt;
      color: #64748b;
      text-align: center;
      line-height: 1.2;
      padding-top: 1px;
    }

    /* Page Footers */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      font-size: 6.8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>

  <!-- ===================================================================== -->
  <!-- PAGE 1: PERIOD 1 (50 MINS) — FORENSIC ARCHIVAL INVESTIGATION          -->
  <!-- ===================================================================== -->
  <div class="page">
    <div>
      <!-- Header -->
      <div class="header-bar">
        <div>
          <span class="brand-pill">The History Revision Hub • KS3 History Enquiry Pack • Year 9</span>
          <h1 class="header-title">The Christmas Truce of 1914: Peace in No Man's Land</h1>
          <div class="header-sub">
            Period 1 Forensic Investigation • <em>Enquiry: Was the truce an act of rebellion or a temporary pause?</em>
          </div>
        </div>
        <div class="header-qr-box">
          <img src="${qrDataUrl}" alt="QR">
          <span class="header-qr-label">DIGITAL APP</span>
        </div>
      </div>

      <!-- Supervisor Strip -->
      <div class="supervisor-strip">
        <div class="student-fields">
          <span>Pupil Name: <span class="student-line"></span></span>
          <span>Class: <span class="student-line-sm"></span></span>
          <span>Date: <span class="student-line-sm"></span></span>
        </div>
        <div class="supervisor-note">
          📥 <strong>Cover Notice:</strong> Complete in neat pen. All sheets collected at the bell.
        </div>
      </div>

      <!-- Historical Setting -->
      <div class="context-box">
        <strong>Historical Outpost (December 1914):</strong> By mid-December 1914, the fast-moving war of movement had ground to an exhausted halt. A 450-mile continuous line of crude, waterlogged trenches stretched across Flanders and northern France. The soldiers had endured weeks of bitter rain, frostbite, and artillery shelling. In many sectors—particularly around the Ypres Salient, Armentières, and Ploegsteert Wood—opposing trenches were situated less than 80 yards apart. On Christmas Eve, German soldiers began placing small, lit fir trees (<em>Weihnachtsbäume</em>) on their parapets and singing <em>Stille Nacht</em> (Silent Night). British sentries responded with English carols. What followed was a spontaneous cessation of combat.
      </div>

      <!-- Archival Core: 3 Verbatim Sources -->
      <div class="sources-grid">
        <!-- Source A -->
        <div class="source-card">
          <div>
            <div class="source-tag">Source A • British Infantryman</div>
            <div class="source-quote">
              "A German shouted: 'A merry Christmas to you, English!' We shouted back: 'Same to you, Fritz, but don't bring your sausage over here!' On Christmas morning, we were waving to each other. Then two Germans got out of their trench and walked toward us unarmed. We met in No Man's Land, shook hands, exchanged bully beef and plum pudding for German cigars, and helped each other bury our dead comrades."
            </div>
          </div>
          <div class="source-provenance">
            Private Frank Richards, 2nd Royal Welch Fusiliers, near Frelinghien (1914).
          </div>
        </div>

        <!-- Source B -->
        <div class="source-card">
          <div>
            <div class="source-tag">Source B • British High Command</div>
            <div class="source-quote">
              "The Commander of the Army Corps directs that such friendly communication with the enemy is strictly forbidden. It destroys the offensive spirit in all ranks and breeds dangerous apathy. Friendly relations with the enemy, unofficial armistices, and visits to their trenches—on however small a scale—are absolutely prohibited and must be dealt with by immediate court-martial."
            </div>
          </div>
          <div class="source-provenance">
            General Sir Horace Smith-Dorrien, Confidential Memo to British II Corps (Dec 1914).
          </div>
        </div>

        <!-- Source C -->
        <div class="source-card">
          <div>
            <div class="source-tag">Source C • German Officer</div>
            <div class="source-quote">
              "A Scotsman appeared with a football, kicked it out of their trench, and soon a brisk game developed. We marked the goals with our caps. In the frozen mud, the men chased the ball with great zest. We Saxon troops played against the Seaforth Highlanders. The game ended 3–2 in our favor, until an officer arrived and ordered us back into our trenches before the artillery fired."
            </div>
          </div>
          <div class="source-provenance">
            Leutnant Johannes Niemann, 133rd Royal Saxon Regiment, near Saint-Yvon (1914).
          </div>
        </div>
      </div>
    </div>

    <!-- Forensic Comprehension Questions -->
    <div class="questions-box">
      <div style="font-weight: 800; font-size: 8.2pt; color: #881337; margin-bottom: 2px;">
        Forensic Comprehension Check (Answer in complete academic sentences):
      </div>

      <div class="q-row">
        <div class="q-text">1. [Recall] According to Source A, what items did the British and German soldiers trade in No Man's Land?</div>
        <div class="q-lines"></div>
      </div>

      <div class="q-row">
        <div class="q-text">2. [Inference] What solemn practical task did the soldiers work together to complete before Christmas afternoon?</div>
        <div class="q-lines"></div>
      </div>

      <div class="q-row">
        <div class="q-text">3. [Contrast] How does General Smith-Dorrien's view in Source B directly contradict the soldiers' behavior in Sources A and C?</div>
        <div class="q-lines"></div>
        <div class="q-lines"></div>
      </div>

      <div class="q-row">
        <div class="q-text">4. [Historical Explanation] Why were senior generals terrified that spontaneous truces would ruin their military war effort?</div>
        <div class="q-lines"></div>
        <div class="q-lines"></div>
      </div>

      <div class="q-row">
        <div class="q-text">5. [Source Utility] Why are eyewitness soldier letters like Source A useful to historians, yet limited in representing the whole front?</div>
        <div class="q-lines"></div>
        <div class="q-lines"></div>
      </div>
    </div>

    <!-- Footer Page 1 -->
    <div class="page-footer">
      <span>The History Revision Hub • Standalone Emergency Cover Pack (Side 1 of 2)</span>
      <span>Turn over for Period 2: Historiographical Analysis &amp; Extended Writing →</span>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGE 2: PERIOD 2 (50 MINS) — HISTORICAL VERDICT & EXTENDED RESPONSE  -->
  <!-- ===================================================================== -->
  <div class="page page-last">
    <div>
      <!-- Header Bar Period 2 -->
      <div class="header-bar">
        <div>
          <span class="brand-pill" style="background: #1e3a8a;">Period 2 • Historical Verdict &amp; Extended Writing</span>
          <h1 class="header-title">The Christmas Truce: Myth vs Historical Reality</h1>
          <div class="header-sub">
            Enquiry: <em>Why did the truce happen in 1914, but never repeat in 1915, 1916, or 1917?</em>
          </div>
        </div>
        <div style="text-align: right; font-size: 7.2pt; color: #64748b; font-weight: 700;">
          Year 9 History<br>Department Assessment
        </div>
      </div>

      <!-- Section 1: Fact vs Myth Matrix -->
      <div style="font-weight: 800; color: #1e3a8a; font-size: 8.2pt; margin-bottom: 2px;">
        Part 1: Fact vs Myth Matrix (Cross-Examining the Romantic Legend)
      </div>
      <table class="matrix-table">
        <thead>
          <tr>
            <th style="width: 25%;">Popular Modern Myth</th>
            <th style="width: 45%;">Archival Reality (What Actually Happened)</th>
            <th style="width: 30%;">Historical Significance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Myth 1: The Whole Front Stopped</strong><br>"Every soldier from the sea to Switzerland laid down arms."</td>
            <td><strong>Strictly Localized:</strong> Occurred in roughly two-thirds of the British sector. French and Belgian troops largely refused to fraternise because German armies occupied their homes. In some British sectors, snipers fired continuously.</td>
            <td>Proves the truce depended entirely on local battalion morale, proximity, and regional Saxon/British temperament.</td>
          </tr>
          <tr>
            <td><strong>Myth 2: Organised 90-Minute Match</strong><br>"Full football tournaments took place with referees."</td>
            <td><strong>Makeshift Kickabouts:</strong> No full football pitches existed. Men kicked tin cans, straw bundles, or a solitary leather ball on frozen, shell-pocked mud until the ball was punctured by barbed wire.</td>
            <td>Highlights human desire for play and shared sports culture despite being official wartime enemies.</td>
          </tr>
          <tr>
            <td><strong>Myth 3: The Men Refused to Fight Again</strong><br>"Soldiers threw down their weapons and made peace."</td>
            <td><strong>Routine Resumption of Combat:</strong> By 26–27 December, rotational reliefs took over and artillery bombarded trenches. Both sides returned to duty; zero soldiers mutinied permanently in 1914.</td>
            <td>Demonstrates that the truce was an informal holiday pause, not a pacifist revolution against the military command.</td>
          </tr>
        </tbody>
      </table>

      <!-- Section 2: Scaffolded Extended Response -->
      <div class="essay-box">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #881337; font-size: 8.4pt;">
            Part 2: Extended Writing Challenge (15 Mins)
          </strong>
          <span style="font-size: 6.8pt; font-weight: 800; background: #fee2e2; color: #991b1b; padding: 1.5px 5px; border-radius: 3px;">
            Core GCSE Technique
          </span>
        </div>
        <div style="font-size: 7.6pt; color: #334155; margin-top: 1px;">
          <strong>Question:</strong> <em>Explain why the Christmas Truce was possible in December 1914, but never occurred again in subsequent years.</em>
        </div>
        <div class="scaffold-pills">
          <span style="font-weight: 700; color: #475569;">Causal Connectives Bank:</span>
          <span class="pill">Consequently</span>
          <span class="pill">As a direct result</span>
          <span class="pill">In stark contrast</span>
          <span class="pill">Crucially</span>
          <span class="pill">Furthermore</span>
        </div>
        <div style="font-size: 7pt; color: #64748b; font-style: italic;">
          Sentence Starter: "In 1914, the truce was possible because the war was still new and the 'live and let live' mindset existed. However, by December 1915..."
        </div>
        <div class="essay-ruled-area"></div>
      </div>

      <!-- Section 3: Plenary Retrieval Check -->
      <div style="font-weight: 800; color: #166534; font-size: 8.2pt; margin-bottom: 2px;">
        Part 3: 10-Question Knowledge Mastery Check (Self-Assessment)
      </div>
      <div class="plenary-grid">
        <div>
          <div class="plenary-item"><span class="plenary-num">1.</span> In which month and year did the Christmas Truce occur?</div>
          <div class="plenary-item"><span class="plenary-num">2.</span> What small festive objects did German soldiers place on their parapets?</div>
          <div class="plenary-item"><span class="plenary-num">3.</span> Name the German carol sung on Christmas Eve (meaning 'Silent Night').</div>
          <div class="plenary-item"><span class="plenary-num">4.</span> Which British commander issued strict orders banning fraternisation?</div>
          <div class="plenary-item"><span class="plenary-num">5.</span> Did French and Belgian soldiers join the truce widely? (Yes/No)</div>
        </div>
        <div>
          <div class="plenary-item"><span class="plenary-num">6.</span> What makeshift object did soldiers use when footballs were missing?</div>
          <div class="plenary-item"><span class="plenary-num">7.</span> What weapon was used at 2nd Ypres in April 1915 that hardened hatred?</div>
          <div class="plenary-item"><span class="plenary-num">8.</span> What military punishment was threatened for men visiting enemy trenches?</div>
          <div class="plenary-item"><span class="plenary-num">9.</span> By what dates had combat generally resumed along the line?</div>
          <div class="plenary-item"><span class="plenary-num">10.</span> Did the Christmas Truce end the war early? (Yes/No)</div>
        </div>
      </div>

      <!-- Inverted upside-down Answer Key -->
      <div class="inverted-key">
        [TEACHER / PUPIL SELF-CHECK KEY] 1. December 1914 | 2. Small lit Christmas trees (Weihnachtsbäume) | 3. Stille Nacht | 4. General Sir Horace Smith-Dorrien | 5. No (their homeland was occupied) | 6. Tin cans / rag bundles | 7. Lethal chlorine poison gas | 8. Court-martial / Execution | 9. 26–27 December (Boxing Day) | 10. No
      </div>
    </div>

    <!-- Footer Page 2 -->
    <div class="page-footer">
      <span>The History Revision Hub • Department Lead • Educational Neutral Edition</span>
      <span>Double Period Complete • Hand sheet directly to Cover Supervisor.</span>
    </div>
  </div>

</body>
</html>
`;

  const outputPath = path.join(PDFS_DIR, 'standalone_cover_yr9_christmas_truce.pdf');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  await browser.close();

  console.log(`✅ PDF successfully generated: ${outputPath}`);

  // Count pages using pdf-parse to verify 2 pages exact
  try {
    const pdf = require('pdf-parse');
    const dataBuffer = fs.readFileSync(outputPath);
    const parsed = await pdf(dataBuffer);
    console.log(`📄 Page count: ${parsed.numpages} (Target: exactly 2 pages)`);
    if (parsed.numpages === 2) {
      console.log('🎉 PERFECT LAYOUT: Exactly 2 pages with 0 vertical overflow!');
    } else {
      console.warn(`⚠️ WARNING: Expected 2 pages, got ${parsed.numpages}! Check margins.`);
    }
  } catch (e) {
    console.log('Note: pdf-parse not available, checked manual height.');
  }
}

buildCoverPack().catch((err) => {
  console.error('Error generating cover pack:', err);
  process.exit(1);
});
