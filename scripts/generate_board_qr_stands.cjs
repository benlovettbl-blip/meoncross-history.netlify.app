const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function generateBoardQRStands() {
  console.log('♟️ Generating Meoncross Chess Club Board Sign-In QR Stands (Boards 1–10)...');

  const boards = [];
  for (let i = 1; i <= 10; i++) {
    const url = `https://meoncross-history.netlify.app/?view=chess&board=${i}`;
    const qrDataUrl = await QRCode.toDataURL(url, {
      margin: 1,
      width: 320,
      color: { dark: '#0f172a', light: '#ffffff' },
    });
    boards.push({ num: i, url, qrDataUrl });
  }

  // Create HTML with 2 foldable tent stands per A4 page
  let pagesHtml = '';
  for (let p = 0; p < boards.length; p += 2) {
    const b1 = boards[p];
    const b2 = boards[p + 1];

    pagesHtml += `
      <div class="sheet">
        <!-- Stand Top / Board ${b1.num} -->
        <div class="tent-card">
          <div class="tent-half tent-front">
            <div class="header-strip">
              <div class="school-brand">
                <i class="fa-solid fa-graduation-cap"></i> MEONCROSS SCHOOL
              </div>
              <div class="club-tag">Period 6 Chess Club</div>
            </div>
            <div class="board-hero">
              <div class="board-pill">OFFICIAL MATCH BOARD</div>
              <div class="board-number">BOARD ${b1.num}</div>
            </div>
            <div class="qr-container">
              <img src="${b1.qrDataUrl}" alt="QR Code for Board ${b1.num}" class="qr-code">
              <div class="qr-caption">
                <strong>SCAN ON PHONE</strong><br>
                Instant Match Logger &amp; Check-In
              </div>
            </div>
            <div class="house-points-pill">
              <span>+3 Win</span> · <span>+2 Draw</span> · <span>+1 Participation</span>
            </div>
          </div>
          <div class="fold-line">
            <span>✁ CUT OR FOLD HERE ✁</span>
          </div>
          <div class="tent-half tent-back">
            <div class="rules-header">
              <i class="fa-solid fa-chess-knight"></i> BOARD ${b1.num} ETIQUETTE &amp; SCORING
            </div>
            <div class="rules-grid">
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-handshake"></i></div>
                <div class="rule-text"><strong>Respect:</strong> Shake hands before &amp; after each game.</div>
              </div>
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-hand-pointer"></i></div>
                <div class="rule-text"><strong>Touch-Move:</strong> If you touch a piece, you must move it.</div>
              </div>
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="rule-text"><strong>House Pride:</strong> Every completed game earns points for your House.</div>
              </div>
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-qrcode"></i></div>
                <div class="rule-text"><strong>Log It:</strong> Scan the QR code as soon as the match concludes.</div>
              </div>
            </div>
            <div class="footer-houses">
              <span style="color: #059669;">● Warrior</span>
              <span style="color: #dc2626;">● Dreadnought</span>
              <span style="color: #1e3a8a;">● Victory</span>
              <span style="color: #d97706;">● Invincible</span>
            </div>
          </div>
        </div>

        ${
          b2
            ? `
        <!-- Stand Bottom / Board ${b2.num} -->
        <div class="tent-card" style="margin-top: 18px;">
          <div class="tent-half tent-front">
            <div class="header-strip">
              <div class="school-brand">
                <i class="fa-solid fa-graduation-cap"></i> MEONCROSS SCHOOL
              </div>
              <div class="club-tag">Period 6 Chess Club</div>
            </div>
            <div class="board-hero">
              <div class="board-pill">OFFICIAL MATCH BOARD</div>
              <div class="board-number">BOARD ${b2.num}</div>
            </div>
            <div class="qr-container">
              <img src="${b2.qrDataUrl}" alt="QR Code for Board ${b2.num}" class="qr-code">
              <div class="qr-caption">
                <strong>SCAN ON PHONE</strong><br>
                Instant Match Logger &amp; Check-In
              </div>
            </div>
            <div class="house-points-pill">
              <span>+3 Win</span> · <span>+2 Draw</span> · <span>+1 Participation</span>
            </div>
          </div>
          <div class="fold-line">
            <span>✁ CUT OR FOLD HERE ✁</span>
          </div>
          <div class="tent-half tent-back">
            <div class="rules-header">
              <i class="fa-solid fa-chess-knight"></i> BOARD ${b2.num} ETIQUETTE &amp; SCORING
            </div>
            <div class="rules-grid">
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-handshake"></i></div>
                <div class="rule-text"><strong>Respect:</strong> Shake hands before &amp; after each game.</div>
              </div>
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-hand-pointer"></i></div>
                <div class="rule-text"><strong>Touch-Move:</strong> If you touch a piece, you must move it.</div>
              </div>
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="rule-text"><strong>House Pride:</strong> Every completed game earns points for your House.</div>
              </div>
              <div class="rule-box">
                <div class="rule-icon"><i class="fa-solid fa-qrcode"></i></div>
                <div class="rule-text"><strong>Log It:</strong> Scan the QR code as soon as the match concludes.</div>
              </div>
            </div>
            <div class="footer-houses">
              <span style="color: #059669;">● Warrior</span>
              <span style="color: #dc2626;">● Dreadnought</span>
              <span style="color: #1e3a8a;">● Victory</span>
              <span style="color: #d97706;">● Invincible</span>
            </div>
          </div>
        </div>
        `
            : ''
        }
      </div>
    `;
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Meoncross Chess Club - Board Sign-In QR Stands</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Outfit', sans-serif;
      background: #f8fafc;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet {
      width: 210mm;
      height: 297mm;
      padding: 12mm;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      overflow: hidden;
    }
    .tent-card {
      border: 2px solid #cbd5e1;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 132mm;
      background: #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
    }
    .tent-half {
      flex: 1;
      padding: 10mm 12mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tent-front {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      color: #ffffff;
      position: relative;
    }
    .header-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .school-brand {
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .club-tag {
      background: rgba(168, 85, 247, 0.25);
      border: 1px solid rgba(168, 85, 247, 0.5);
      color: #d8b4fe;
      padding: 2px 10px;
      border-radius: 14px;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
    }
    .board-hero {
      text-align: center;
      margin: 4mm 0 2mm;
    }
    .board-pill {
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #38bdf8;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    .board-number {
      font-family: 'Playfair Display', serif;
      font-size: 32pt;
      font-weight: 900;
      color: #ffffff;
      line-height: 1;
      text-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .qr-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 8px 14px;
      margin: 0 auto;
      max-width: 140mm;
    }
    .qr-code {
      width: 24mm;
      height: 24mm;
      border-radius: 6px;
      background: #ffffff;
      padding: 2px;
    }
    .qr-caption {
      font-size: 9.5pt;
      color: #e2e8f0;
      line-height: 1.35;
    }
    .qr-caption strong {
      color: #fde047;
      font-size: 10.5pt;
      letter-spacing: 0.04em;
    }
    .house-points-pill {
      display: flex;
      justify-content: center;
      gap: 12px;
      font-size: 9pt;
      font-weight: 700;
      color: #94a3b8;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 5px;
    }
    .house-points-pill span {
      color: #e2e8f0;
    }
    .fold-line {
      background: #f1f5f9;
      border-top: 1.5px dashed #94a3b8;
      border-bottom: 1.5px dashed #94a3b8;
      height: 7mm;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 7.5pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.15em;
    }
    .tent-back {
      background: #ffffff;
      color: #0f172a;
    }
    .rules-header {
      font-size: 11pt;
      font-weight: 800;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 3mm;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
    }
    .rules-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .rule-box {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 8px;
    }
    .rule-icon {
      color: #2563eb;
      font-size: 10pt;
      margin-top: 2px;
    }
    .rule-text {
      font-size: 8pt;
      color: #334155;
      line-height: 1.3;
    }
    .footer-houses {
      display: flex;
      justify-content: space-around;
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      padding-top: 4px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;

  const outputPath = path.join(
    __dirname,
    '..',
    'public',
    'pdfs',
    'meoncross_chess_board_qr_stands.pdf',
  );
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`✅ Saved ${outputPath}`);
}

generateBoardQRStands().catch(console.error);
