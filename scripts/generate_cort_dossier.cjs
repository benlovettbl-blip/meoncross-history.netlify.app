const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function generateCortDossier() {
  console.log('📜 Generating Henry Cort & Funtley Primary Source Starter Pack PDF...');

  const portalUrl =
    'https://meoncross-history.netlify.app/?view=lessons&unit=industrialisation_and_empire&lesson=0';
  const qrPortalDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    width: 200,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  // Convert local image assets to base64 so Puppeteer renders them reliably
  const funtleyImgPath = path.join(__dirname, '..', 'public', 'images', 'funtley_ironworks.jpg');
  const funtleyBase64 = fs.existsSync(funtleyImgPath)
    ? `data:image/jpeg;base64,${fs.readFileSync(funtleyImgPath).toString('base64')}`
    : '/images/funtley_ironworks.jpg';

  const mapImgPath = path.join(__dirname, '..', 'public', 'images', 'map_hampshire_1832.png');
  const mapBase64 = fs.existsSync(mapImgPath)
    ? `data:image/png;base64,${fs.readFileSync(mapImgPath).toString('base64')}`
    : '/images/map_hampshire_1832.png';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Henry Cort &amp; Funtley Ironworks - Primary Source Archival Dossier</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
      font-family: 'Inter', sans-serif;
      background: #ffffff;
      color: #0f172a;
      position: relative;
      overflow: hidden;
    }

    .dossier-frame {
      width: 210mm;
      height: 297mm;
      padding: 8mm 10mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background: #ffffff;
    }

    .outer-border {
      position: absolute;
      top: 5mm;
      left: 5mm;
      right: 5mm;
      bottom: 5mm;
      border: 1.5px solid #1e3a8a;
      pointer-events: none;
    }
    .inner-border {
      position: absolute;
      top: 6.2mm;
      left: 6.2mm;
      right: 6.2mm;
      bottom: 6.2mm;
      border: 0.8px solid #d97706;
      pointer-events: none;
    }

    /* Header */
    .header-bar {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 2mm;
      margin-bottom: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header-left {
      flex: 1;
    }
    .doc-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #1e3a8a;
      color: #ffffff;
      padding: 2.5px 9px;
      border-radius: 4px;
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1.5mm;
    }
    .main-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.2;
      margin: 0 0 1mm 0;
      letter-spacing: -0.01em;
    }
    .sub-title {
      font-size: 8.2pt;
      color: #b45309;
      font-weight: 700;
      margin: 0;
    }
    .header-right {
      text-align: right;
      font-size: 7.2pt;
      color: #64748b;
      line-height: 1.35;
      padding-left: 3mm;
    }
    .header-right strong {
      color: #0f172a;
    }

    /* Enquiry Question Ribbon */
    .enquiry-ribbon {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #d97706;
      border-radius: 4px;
      padding: 2mm 3mm;
      margin-bottom: 2.5mm;
      font-size: 8pt;
      color: #1e293b;
      line-height: 1.35;
    }
    .enquiry-ribbon strong {
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Sources Grid */
    .sources-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      margin-bottom: 2.5mm;
    }
    .source-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 2.2mm 2.8mm;
      display: flex;
      flex-direction: column;
    }
    .source-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1mm;
      margin-bottom: 1.5mm;
    }
    .source-label {
      font-family: 'Cinzel', serif;
      font-size: 8pt;
      font-weight: 800;
      color: #1e3a8a;
    }
    .source-origin {
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .source-img {
      width: 100%;
      height: 38mm;
      object-fit: contain;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      margin-bottom: 1.5mm;
    }
    .source-transcription {
      font-family: 'Newsreader', serif;
      font-style: italic;
      font-size: 7.6pt;
      line-height: 1.35;
      color: #1e293b;
      background: #fefce8;
      border-left: 2.5px solid #eab308;
      padding: 1.5mm 2.2mm;
      border-radius: 0 4px 4px 0;
      margin-bottom: 1.2mm;
    }
    .source-desc {
      font-size: 7pt;
      color: #475569;
      line-height: 1.3;
      margin: 0;
    }

    /* Document 3: Full Width Official Record */
    .doc-record-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 2.2mm 2.8mm;
      margin-bottom: 2.5mm;
    }
    .doc-record-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1mm;
      margin-bottom: 1.5mm;
    }
    .navy-quote {
      font-family: 'Newsreader', serif;
      font-size: 8.2pt;
      line-height: 1.4;
      color: #0f172a;
      background: #f1f5f9;
      border-left: 3px solid #0284c7;
      padding: 2mm 3mm;
      border-radius: 0 4px 4px 0;
      margin-bottom: 1.5mm;
    }

    /* Investigation & Scaffolding Prompts */
    .prompts-container {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 2.2mm 3mm;
      margin-bottom: 2mm;
    }
    .prompts-title {
      font-family: 'Cinzel', serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #1e3a8a;
      margin-bottom: 1.5mm;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .prompts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2.5mm;
    }
    .prompt-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 1.8mm 2.2mm;
    }
    .prompt-step {
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      color: #d97706;
      margin-bottom: 0.8mm;
    }
    .prompt-question {
      font-size: 7pt;
      color: #1e293b;
      line-height: 1.3;
      margin: 0;
      font-weight: 600;
    }

    /* Footer */
    .footer-bar {
      background: #0f172a;
      border-radius: 5px;
      padding: 2mm 3.5mm;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-text {
      font-size: 7.2pt;
      color: #cbd5e1;
      line-height: 1.35;
    }
    .footer-text strong {
      color: #ffffff;
    }
    .footer-qr {
      display: flex;
      align-items: center;
      gap: 2mm;
      background: #ffffff;
      padding: 1.5mm 2.5mm;
      border-radius: 4px;
      color: #0f172a;
    }
    .footer-qr img {
      width: 14mm;
      height: 14mm;
      display: block;
    }
    .footer-qr-caption {
      font-size: 5.8pt;
      font-weight: 800;
      text-transform: uppercase;
      line-height: 1.15;
      max-width: 26mm;
    }
  </style>
</head>
<body>
  <div class="outer-border"></div>
  <div class="inner-border"></div>

  <div class="dossier-frame">
    
    <!-- Header -->
    <div class="header-bar">
      <div class="header-left">
        <div class="doc-badge">
          <i class="fa-solid fa-box-archive"></i> Meoncross History Archive Starter Pack · Primary Source Dossier
        </div>
        <h1 class="main-title">Henry Cort &amp; The Funtley Ironworks (1783–1784)</h1>
        <div class="sub-title">Supporting the Hampshire Archives Trust Competition &amp; Year 8 Industrial Revolution Enquiry</div>
      </div>
      <div class="header-right">
        <div><strong>Location:</strong> Funtley Mill, River Meon (Fareham)</div>
        <div><strong>Archives:</strong> National Archives &amp; Hampshire Record Office</div>
        <div><strong>Topic:</strong> Metallurgy, Naval Logistics &amp; Empire</div>
      </div>
    </div>

    <!-- Enquiry Question -->
    <div class="enquiry-ribbon">
      <strong>Core Enquiry Question:</strong> "To what extent was Henry Cort's breakthrough at Funtley the result of technological innovation versus geographic proximity to Portsmouth Royal Dockyard?"
    </div>

    <!-- Top Two Sources -->
    <div class="sources-row">
      
      <!-- Source A -->
      <div class="source-box">
        <div class="source-head">
          <span class="source-label">Document 1: Patent Specification No. 1420</span>
          <span class="source-origin">1784 · Technical Diagram</span>
        </div>
        <img src="${funtleyBase64}" alt="Puddling Furnace Cross-Section" class="source-img">
        <div class="source-transcription">
          "My new method of manufacturing iron in a reverberatory air furnace heated by common raw pit coal... and rolling the same between grooved rollers without repeated hammering."
        </div>
        <p class="source-desc">
          <strong>Archival Significance:</strong> Cort's diagram proves the coal fuel was separated from the iron ore. The heat bounced off the curved ceiling, burning off carbon without contaminating the iron with sulfur.
        </p>
      </div>

      <!-- Source B -->
      <div class="source-box">
        <div class="source-head">
          <span class="source-label">Document 2: River Meon Survey &amp; Route</span>
          <span class="source-origin">c. 1780s · Cartographic Survey</span>
        </div>
        <img src="${mapBase64}" alt="Hampshire Map & River Meon" class="source-img">
        <div class="source-transcription">
          "Funtley Mill situated upon the Meon Stream, with water pond and millrace driving twin waterwheels... 2 miles from Fareham Haven Quay and 9 miles to Portsmouth Harbour."
        </div>
        <p class="source-desc">
          <strong>Archival Significance:</strong> Before steam engines were installed, Cort was reliant on the natural watercourse of the River Meon to turn the massive iron rollers, with easy river transport down to the Solent.
        </p>
      </div>

    </div>

    <!-- Source C: Official Navy Trial Minutes -->
    <div class="doc-record-box">
      <div class="doc-record-head">
        <span class="source-label">Document 3: Admiralty Board &amp; Navy Board Trial Minutes</span>
        <span class="source-origin">Portsmouth Dockyard · March 1784 · Official State Report</span>
      </div>
      <div class="navy-quote">
        "Pursuant to your Lordships' directions, trials have been made at Portsmouth Dockyard of the malleable iron manufactured by Mr Henry Cort at Fontley near Fareham. The master smiths report that Cort's iron was subjected to severe bending, cold-hammering, and welding into ship knees, mast hoops, and anchor shackles. They unanimously declare it to exceed in toughness and tensile strength any iron made in this kingdom, and to be fully equal to the finest imported Swedish Orgrounds iron."
      </div>
      <p class="source-desc" style="font-size: 7.2pt; line-height: 1.35; color: #334155; margin: 0;">
        <strong>Archival Analysis:</strong> Prior to 1784, Britain imported over 80% of its naval wrought iron from Sweden and Russia. This official Admiralty verification established Cort's Funtley works as a national strategic asset, transforming Portsmouth into the world's most formidable naval base.
      </p>
    </div>

    <!-- Scaffolding Enquiry Prompts -->
    <div class="prompts-container">
      <div class="prompts-title">
        <i class="fa-solid fa-magnifying-glass"></i> Young Historian Investigation Prompts (Hampshire Archives Trust Guide)
      </div>
      <div class="prompts-grid">
        <div class="prompt-card">
          <div class="prompt-step">1. Provenance &amp; Motive</div>
          <p class="prompt-question">Why was Henry Cort, an ex-navy agent, uniquely motivated to patent a process using cheap 'pit coal' instead of scarce timber charcoal?</p>
        </div>
        <div class="prompt-card">
          <div class="prompt-step">2. Archival Corroboration</div>
          <p class="prompt-question">How does Document 3 (Portsmouth Dockyard trial) corroborate the mechanical claims Cort made in Document 1 (his patent)?</p>
        </div>
        <div class="prompt-card">
          <div class="prompt-step">3. Local vs National Impact</div>
          <p class="prompt-question">Could Cort's breakthrough have happened without the water rights of the River Meon and the customer base of Portsmouth?</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <div class="footer-text">
        <div><strong>Meoncross School History Department</strong> · Archival Research Resource Pack</div>
        <div>Submit your Hampshire Archives Trust competition entries to <strong>Mr Lovett</strong> by <strong>19 March 2027</strong>.</div>
      </div>
      <div class="footer-qr">
        <img src="${qrPortalDataUrl}" alt="Lesson Portal QR">
        <div class="footer-qr-caption">Scan to open Lesson 1 on History Hub</div>
      </div>
    </div>

  </div>
</body>
</html>`;

  const htmlPath = path.join(
    __dirname,
    '..',
    'public',
    'pdfs',
    'henry_cort_primary_source_pack.html',
  );
  const pdfPath = path.join(
    __dirname,
    '..',
    'public',
    'pdfs',
    'henry_cort_funtley_primary_source_pack.pdf',
  );

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log('✅ Saved HTML preview to:', htmlPath);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  console.log('✅ Generated High-Resolution PDF to:', pdfPath);
  await browser.close();
}

generateCortDossier().catch(console.error);
