const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  console.log('♟️ Compiling 2-Page A3 Landscape Chess Tournament Master Pack...');

  const htmlPath = path.join(__dirname, '..', 'public', 'chess_tournament.html');
  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  const fullPackFile = path.join(outputDir, 'chess_tournament_bracket_11_players.pdf');
  const page1File = path.join(outputDir, 'chess_tournament_page1_championship_A3.pdf');
  const page2File = path.join(outputDir, 'chess_tournament_page2_wooden_spoon_A3.pdf');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Clean screen elements for high-res PDF capture
    await page.addStyleTag({
      content: `
        .screen-toolbar, .names-drawer { display: none !important; }
        body { padding: 0 !important; margin: 0 !important; background: #ffffff !important; gap: 0 !important; }
        .a3-page {
          box-shadow: none !important;
          border: none !important;
          width: 404mm !important;
          height: 281mm !important;
          border-radius: 0 !important;
          padding: 8mm 10mm !important;
          page-break-after: always !important;
        }
        .a3-page:last-of-type {
          page-break-after: avoid !important;
        }
      `,
    });

    // 1. Generate Complete 2-Page Master Pack (Pages 1 & 2)
    await page.pdf({
      path: fullPackFile,
      format: 'A3',
      landscape: true,
      printBackground: true,
      margin: { top: '6mm', right: '6mm', bottom: '6mm', left: '6mm' },
    });
    console.log(`✅ Complete 2-Page Master Pack compiled: ${fullPackFile}`);

    // 2. Generate Page 1 Only (Championship Knockout)
    await page.pdf({
      path: page1File,
      format: 'A3',
      landscape: true,
      printBackground: true,
      pageRanges: '1',
      margin: { top: '6mm', right: '6mm', bottom: '6mm', left: '6mm' },
    });
    console.log(`✅ Page 1 (Championship Bracket) compiled: ${page1File}`);

    // 3. Generate Page 2 Only (Wooden Spoon & Results Hub)
    await page.pdf({
      path: page2File,
      format: 'A3',
      landscape: true,
      printBackground: true,
      pageRanges: '2',
      margin: { top: '6mm', right: '6mm', bottom: '6mm', left: '6mm' },
    });
    console.log(`✅ Page 2 (Wooden Spoon & Results Hub) compiled: ${page2File}`);

    // Sync to dist if dist exists
    const distPdfs = path.join(__dirname, '..', 'dist', 'pdfs');
    if (fs.existsSync(distPdfs)) {
      fs.copyFileSync(fullPackFile, path.join(distPdfs, 'chess_tournament_bracket_11_players.pdf'));
      fs.copyFileSync(page1File, path.join(distPdfs, 'chess_tournament_page1_championship_A3.pdf'));
      fs.copyFileSync(page2File, path.join(distPdfs, 'chess_tournament_page2_wooden_spoon_A3.pdf'));
      console.log(`✅ Synced all 3 PDFs to dist/pdfs/`);
    }

    // Sync to Google Drive Chess Club folder
    const driveChess = 'G:\\My Drive\\AAMX\\Dep File\\Chess Club';
    if (fs.existsSync(driveChess)) {
      fs.copyFileSync(
        fullPackFile,
        path.join(driveChess, 'Tutor Group Chess Tournament Bracket (11 Players A3).pdf'),
      );
      fs.copyFileSync(
        fullPackFile,
        path.join(
          driveChess,
          'Tutor Group Chess - Complete 2-Page Tournament Pack (A3 Landscape).pdf',
        ),
      );
      fs.copyFileSync(
        page1File,
        path.join(driveChess, 'Tutor Group Chess - 1. Championship Bracket (A3 Landscape).pdf'),
      );
      fs.copyFileSync(
        page2File,
        path.join(
          driveChess,
          'Tutor Group Chess - 2. Wooden Spoon & Results Hub (A3 Landscape).pdf',
        ),
      );
      console.log(`✅ Synced all master and individual PDFs to Google Drive Chess Club folder!`);
    }
  } catch (err) {
    console.error('❌ Error compiling chess tournament PDFs:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
