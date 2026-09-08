const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function generatePoster() {
  console.log('🎨 Generating Hampshire Archives Trust Competition A4 Poster with QR codes...');

  // Generate QR Codes as base64 Data URLs
  const portalUrl =
    'https://meoncross-history.netlify.app/?view=lessons&unit=industrialisation_and_empire&lesson=0';
  const archivesUrl = 'https://www.hampshirearchivestrust.co.uk/education/';

  const qrPortalDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    width: 200,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const qrArchivesDataUrl = await QRCode.toDataURL(archivesUrl, {
    margin: 1,
    width: 200,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hampshire Archives Trust - History Competition Poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
      color: #1e293b;
      position: relative;
      overflow: hidden;
    }

    .poster-frame {
      width: 210mm;
      height: 297mm;
      padding: 9mm 11mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background: #ffffff;
    }

    /* Elegant double border */
    .inner-border {
      position: absolute;
      top: 5mm;
      left: 5mm;
      right: 5mm;
      bottom: 5mm;
      border: 2px solid #1e3a8a;
      pointer-events: none;
    }
    .inner-border-thin {
      position: absolute;
      top: 6.5mm;
      left: 6.5mm;
      right: 6.5mm;
      bottom: 6.5mm;
      border: 1px solid #d97706;
      pointer-events: none;
    }

    /* Header */
    .header-box {
      text-align: center;
      padding-top: 2mm;
      position: relative;
      z-index: 2;
    }
    .inst-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #1e3a8a;
      color: #ffffff;
      padding: 3.5px 14px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 2mm;
    }
    .main-title {
      font-family: 'Cinzel', 'Playfair Display', serif;
      font-size: 23pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 1.5mm 0;
      letter-spacing: -0.01em;
    }
    .main-subtitle {
      font-family: 'Playfair Display', serif;
      font-size: 12.5pt;
      font-weight: 700;
      color: #b45309;
      margin: 0 0 2mm 0;
    }
    .year-eligibility {
      display: inline-block;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 3px 14px;
      border-radius: 6px;
      font-size: 8.8pt;
      font-weight: 700;
      color: #334155;
    }

    /* Prize Podium Ribbon */
    .prize-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      border-radius: 8px;
      padding: 3.5mm 4mm;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
      display: grid;
      grid-template-columns: 1fr 1.25fr 1fr;
      gap: 3mm;
      margin: 2mm 0;
      text-align: center;
    }
    .prize-box {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 2.5mm 2mm;
    }
    .prize-label {
      font-size: 7.2pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #93c5fd;
      font-weight: 700;
      margin-bottom: 0.8mm;
    }
    .prize-val {
      font-family: 'Cinzel', serif;
      font-size: 14.5pt;
      font-weight: 800;
      color: #fbbf24;
      line-height: 1;
      margin-bottom: 0.8mm;
    }
    .prize-sub {
      font-size: 7pt;
      color: #e2e8f0;
      line-height: 1.2;
    }

    /* Core Mission Box */
    .mission-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 5px solid #0284c7;
      border-radius: 6px;
      padding: 2.8mm 3.5mm;
      margin: 1.5mm 0;
    }
    .mission-title {
      font-size: 9.5pt;
      font-weight: 800;
      color: #0369a1;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 1.2mm;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .mission-desc {
      font-size: 8.2pt;
      color: #334155;
      line-height: 1.4;
      margin: 0;
    }

    /* Local Sparks / Meoncross Connections */
    .sparks-section {
      margin: 1.5mm 0;
    }
    .section-heading {
      font-family: 'Cinzel', serif;
      font-size: 10pt;
      font-weight: 800;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5mm;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 0.8mm;
    }
    .sparks-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.2mm;
    }
    .spark-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 2.2mm 2.8mm;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .spark-tag {
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      color: #d97706;
      margin-bottom: 0.8mm;
      display: inline-block;
    }
    .spark-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 0.8mm;
      line-height: 1.2;
    }
    .spark-text {
      font-size: 7.2pt;
      color: #475569;
      line-height: 1.3;
      margin: 0;
    }

    /* Formats Grid */
    .formats-bar {
      display: flex;
      justify-content: space-between;
      gap: 2mm;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 2mm 3mm;
      margin: 1.5mm 0;
    }
    .format-item {
      text-align: center;
      flex: 1;
    }
    .format-item i {
      font-size: 9.5pt;
      color: #1e3a8a;
      margin-bottom: 0.8mm;
      display: block;
    }
    .format-item span {
      font-size: 6.8pt;
      font-weight: 700;
      color: #334155;
      display: block;
    }

    /* Footer & How to Enter with QR codes */
    .footer-box {
      background: #0f172a;
      border-radius: 8px;
      padding: 3mm 4mm;
      color: #ffffff;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 4mm;
      align-items: center;
      margin-top: 1.5mm;
    }
    .deadline-badge {
      background: #dc2626;
      color: #ffffff;
      padding: 2.2mm 3.5mm;
      border-radius: 6px;
      text-align: center;
      flex-shrink: 0;
    }
    .deadline-title {
      font-size: 7pt;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.06em;
    }
    .deadline-date {
      font-family: 'Cinzel', serif;
      font-size: 10.5pt;
      font-weight: 900;
      line-height: 1.15;
    }
    .contact-info {
      font-size: 7.8pt;
      color: #cbd5e1;
      line-height: 1.35;
    }
    .contact-info strong {
      color: #ffffff;
    }
    .qr-group {
      display: flex;
      gap: 3.5mm;
      align-items: center;
    }
    .qr-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #ffffff;
      padding: 2mm;
      border-radius: 6px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
    .qr-item img {
      width: 17mm;
      height: 17mm;
      display: block;
    }
    .qr-label {
      font-size: 5.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 1mm;
      max-width: 17mm;
      line-height: 1.15;
    }
  </style>
</head>
<body>
  <div class="inner-border"></div>
  <div class="inner-border-thin"></div>

  <div class="poster-frame">
    
    <!-- Top Header -->
    <div class="header-box">
      <div class="inst-badge">
        <i class="fa-solid fa-landmark-dome"></i> Hampshire Archives Trust · County Schools Competition
      </div>
      <h1 class="main-title">Hampshire History Awards</h1>
      <div class="main-subtitle">Annual Schools History Competition 2026–27</div>
      <div class="year-eligibility">
        Open to All Students in <strong>Years 7–9 (Key Stage 3)</strong> &amp; <strong>Years 10–11 (GCSE)</strong>
      </div>
    </div>

    <!-- Prize Showcase -->
    <div class="prize-banner">
      <div class="prize-box">
        <div class="prize-label">Individual Student</div>
        <div class="prize-val">£100 CASH</div>
        <div class="prize-sub">Awarded directly to student winners in KS3 &amp; GCSE categories</div>
      </div>
      <div class="prize-box" style="border-color: #f59e0b; background: rgba(245, 158, 11, 0.15);">
        <div class="prize-label" style="color: #fde68a;">School / Group Winner</div>
        <div class="prize-val" style="color: #fef08a;">£300 + TROPHY</div>
        <div class="prize-sub">Department grant &amp; Winner’s Trophy displayed at Meoncross</div>
      </div>
      <div class="prize-box">
        <div class="prize-label">Runners-Up &amp; Ceremony</div>
        <div class="prize-val" style="font-size: 11pt; padding-top: 2px;">WINCHESTER</div>
        <div class="prize-sub">Presented by the Lord Lieutenant at his Winchester offices</div>
      </div>
    </div>

    <!-- Core Criterion: Archival Evidence -->
    <div class="mission-box">
      <div class="mission-title">
        <i class="fa-solid fa-box-archive"></i> The Core Challenge: Discover Hampshire Archives
      </div>
      <p class="mission-desc">
        Explore <strong>any aspect of Hampshire history</strong>—your local village, school, family ancestry, or a famous local event. Projects will be judged primarily on the <strong>demonstrated use of authentic primary archives</strong>: historic maps, parish records, census returns, old newspapers, wartime diaries, letters, photographs, military service rolls, or oral recordings.
      </p>
    </div>

    <!-- Meoncross Curriculum Links & Inspiration -->
    <div class="sparks-section">
      <div class="section-heading">
        <span><i class="fa-solid fa-lightbulb" style="color: #d97706;"></i> Meoncross Hampshire Research Sparks</span>
        <span style="font-size: 7.2pt; font-family: 'Inter', sans-serif; font-weight: 600; color: #64748b;">Direct Links to our History Portal Lessons</span>
      </div>
      <div class="sparks-grid">
        
        <div class="spark-card" style="border-left: 3.5mm solid #2563eb;">
          <span class="spark-tag">Year 8 · Industrial Revolution</span>
          <div class="spark-title">Henry Cort at Funtley Ironworks</div>
          <p class="spark-text">
            Investigate how Henry Cort invented puddling and rolling right here in Funtley (Fareham) in 1783–84, transforming ironmaking and supplying Portsmouth Dockyard's Royal Navy ironclads.
          </p>
        </div>

        <div class="spark-card" style="border-left: 3.5mm solid #ea580c;">
          <span class="spark-tag">Year 8 · Local Social History</span>
          <div class="spark-title">Fareham Red Bricks &amp; Child Labour</div>
          <p class="spark-text">
            Use the 1881 Fareham Census and Poor Law archives to uncover Victorian 10-year-old 'pug boys' in the clay fields whose bricks built the Royal Albert Hall and Portsmouth Dockyard basins.
          </p>
        </div>

        <div class="spark-card" style="border-left: 3.5mm solid #16a34a;">
          <span class="spark-tag">Year 9 / GCSE · WW1 Remembrance</span>
          <div class="spark-title">The Fallen of Stubbington &amp; Lee</div>
          <p class="spark-text">
            Trace the military service, home addresses, and families of local Hampshire soldiers inscribed on the Stubbington village war memorial using CWGC archives, census rolls, and service records.
          </p>
        </div>

        <div class="spark-card" style="border-left: 3.5mm solid #8b5cf6;">
          <span class="spark-tag">Year 8 &amp; GCSE · Maritime Hampshire</span>
          <div class="spark-title">Portsmouth Dockyard &amp; Solent Heritage</div>
          <p class="spark-text">
            Examine the maritime heritage of the Solent—from Elizabethan privateers and HMS Warrior to Southampton's Titanic crew logs and the secret D-Day troop embarkations of June 1944.
          </p>
        </div>

      </div>
    </div>

    <!-- Any Medium Accepted -->
    <div>
      <div style="font-size: 7.5pt; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1.2mm; display: flex; align-items: center; gap: 5px;">
        <i class="fa-solid fa-shapes" style="color: #1e3a8a;"></i> Flexible Formats: Present Your Research In Any Medium
      </div>
      <div class="formats-bar">
        <div class="format-item">
          <i class="fa-solid fa-file-pen"></i>
          <span>Historical Essay</span>
        </div>
        <div class="format-item">
          <i class="fa-solid fa-film"></i>
          <span>Short Documentary</span>
        </div>
        <div class="format-item">
          <i class="fa-solid fa-podcast"></i>
          <span>Audio Podcast</span>
        </div>
        <div class="format-item">
          <i class="fa-solid fa-image"></i>
          <span>Illustrated Poster</span>
        </div>
        <div class="format-item">
          <i class="fa-solid fa-laptop-code"></i>
          <span>Website / Digital App</span>
        </div>
        <div class="format-item">
          <i class="fa-solid fa-person-chalkboard"></i>
          <span>Slide Presentation</span>
        </div>
      </div>
    </div>

    <!-- How to Enter & Footer with QR Codes -->
    <div class="footer-box">
      <div class="deadline-badge">
        <div class="deadline-title">Deadline</div>
        <div class="deadline-date">19 MARCH 2027</div>
      </div>
      
      <div class="contact-info">
        <div><strong>How to Enter:</strong> Individual or Group submissions via Meoncross School. Free entry.</div>
        <div>Speak to <strong>Mr Lovett (Head of History)</strong> to register your topic and get archival support.</div>
        <div style="margin-top: 1mm; color: #38bdf8;">
          <i class="fa-solid fa-mobile-screen"></i> Scan the QR codes on your phone to open our lesson portal &amp; archive guidelines!
        </div>
      </div>

      <div class="qr-group">
        <div class="qr-item">
          <img src="${qrPortalDataUrl}" alt="History Portal QR">
          <div class="qr-label">Henry Cort Lesson Portal</div>
        </div>
        <div class="qr-item">
          <img src="${qrArchivesDataUrl}" alt="Archives Guide QR">
          <div class="qr-label">Archives Guide</div>
        </div>
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
    'hampshire_competition_poster.html',
  );
  const pdfPath = path.join(
    __dirname,
    '..',
    'public',
    'pdfs',
    'hampshire_archives_competition_poster.pdf',
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

generatePoster().catch(console.error);
