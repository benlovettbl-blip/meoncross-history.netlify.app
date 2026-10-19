const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ARTIFACTS_DIR =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\3be94ee6-9055-4e24-8028-18ca3f805ae4';
const ASSETS_DIR = path.join(__dirname, '..', 'units', 'ks2_ww2', 'assets');
const WORKSHEETS_SRC_DIR = path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets');
const WORKSHEETS_PUB_DIR = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
const PDF_PUB_DIR = path.join(__dirname, '..', 'public', 'pdfs', 'ks2_ww2');

// Ensure output directories exist
[ARTIFACTS_DIR, WORKSHEETS_PUB_DIR, PDF_PUB_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Recursively gather all image assets from assets directory
function getAssetMap(dir) {
  const map = {};
  if (!fs.existsSync(dir)) return map;

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const ent of entries) {
      const fullPath = path.join(currentDir, ent.name);
      if (ent.isDirectory()) {
        scan(fullPath);
      } else if (/\.(jpg|jpeg|png|webp|svg)$/i.test(ent.name)) {
        const ext = path.extname(ent.name).replace('.', '').toLowerCase();
        const mime = ext === 'jpg' ? 'jpeg' : ext === 'svg' ? 'svg+xml' : ext;
        const buf = fs.readFileSync(fullPath);
        const dataUri = `data:image/${mime};base64,${buf.toString('base64')}`;
        map[ent.name] = { dataUri, size: buf.length };
      }
    }
  }
  scan(dir);
  return map;
}

async function renderAllWorksheets() {
  console.log('🚀 Starting Universal KS2 Reprographic Compiler & Quality Audit Engine...');

  const assetMap = getAssetMap(ASSETS_DIR);
  console.log(`📦 Loaded ${Object.keys(assetMap).length} assets from assets directory.`);

  // Find all lesson worksheets
  const files = fs.readdirSync(WORKSHEETS_SRC_DIR).filter((f) => f.endsWith('.html'));
  console.log(`📄 Found ${files.length} worksheet(s) to compile: ${files.join(', ')}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const allResults = [];

  for (const filename of files) {
    const baseName = filename.replace('.html', '');
    console.log(`\n============================================================`);
    console.log(`🔨 Compiling & Auditing: ${filename}`);
    console.log(`============================================================`);

    const srcPath = path.join(WORKSHEETS_SRC_DIR, filename);
    const pubHtmlPath = path.join(WORKSHEETS_PUB_DIR, filename);
    const pdfPath = path.join(PDF_PUB_DIR, `${baseName}.pdf`);

    let htmlContent = fs.readFileSync(srcPath, 'utf8');

    // Inline all matched assets
    let inlinedCount = 0;
    for (const [imgName, info] of Object.entries(assetMap)) {
      const regex = new RegExp(`src=["'](${imgName}|.*/${imgName})["']`, 'g');
      if (regex.test(htmlContent)) {
        htmlContent = htmlContent.replace(regex, `src="${info.dataUri}"`);
        inlinedCount++;
      }
    }
    console.log(`✅ Inlined ${inlinedCount} image assets as Base64 Data URIs.`);

    // Write public standalone HTML
    fs.writeFileSync(pubHtmlPath, htmlContent, 'utf8');
    console.log(`✅ Mirrored standalone HTML to: ${pubHtmlPath}`);

    // Create Page in Puppeteer
    const page = await browser.newPage();
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2.0,
    });

    await page.setContent(htmlContent, { waitUntil: ['load', 'networkidle0'] });
    await page.evaluateHandle('document.fonts.ready');

    // Audit Page Metrics
    const pageMetrics = await page.evaluate(() => {
      const pages = Array.from(document.querySelectorAll('.worksheet-page'));
      return pages.map((p, idx) => {
        const pageNum = idx + 1;
        const clientH = p.clientHeight;
        const scrollH = p.scrollHeight;
        const overflowPx = Math.max(0, scrollH - clientH);
        const cutline = p.querySelector('.exercise-book-cutline');
        const cutlineH = cutline ? cutline.clientHeight : 0;
        const cutlineScrollH = cutline ? cutline.scrollHeight : 0;
        const cutlineOverflowPx = Math.max(0, cutlineScrollH - cutlineH);
        const footer = p.querySelector('.sheet-footer');
        const footerRect = footer ? footer.getBoundingClientRect() : null;
        const pageRect = p.getBoundingClientRect();
        const bottomGapPx = footerRect ? pageRect.bottom - footerRect.bottom : 0;

        return {
          pageNum,
          clientH,
          scrollH,
          overflowPx,
          cutlineOverflowPx,
          bottomGapPx: Math.round(bottomGapPx),
          isClean: overflowPx === 0 && cutlineOverflowPx === 0,
        };
      });
    });

    let lessonHasOverflow = false;
    pageMetrics.forEach((m) => {
      console.log(
        `   Page ${m.pageNum}: clientH=${m.clientH}px, scrollH=${m.scrollH}px, overflow=${m.overflowPx}px, cutlineOverflow=${m.cutlineOverflowPx}px, footerGap=${m.bottomGapPx}px [${m.isClean ? '✅ PERFECT 0px OVERFLOW' : '❌ OVERFLOW'}]`,
      );
      if (!m.isClean) lessonHasOverflow = true;
    });

    // Capture Preview Screenshots
    const pageNodes = await page.$$('.worksheet-page');
    for (let i = 0; i < pageNodes.length; i++) {
      const pageNum = i + 1;
      const screenshotName = `preview_${baseName}_p${pageNum}.png`;
      const artifactPath = path.join(ARTIFACTS_DIR, screenshotName);
      const pubPath = path.join(WORKSHEETS_PUB_DIR, screenshotName);

      await pageNodes[i].screenshot({ path: artifactPath, type: 'png' });
      fs.copyFileSync(artifactPath, pubPath);
      console.log(`📸 Saved Page ${pageNum} preview screenshot to: ${screenshotName}`);
    }

    // Generate Print-Ready PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
      preferCSSPageSize: true,
    });
    console.log(`🖨️ Generated Print-Ready A4 PDF: ${pdfPath}`);

    await page.close();

    allResults.push({
      filename,
      isClean: !lessonHasOverflow,
      pageMetrics,
    });
  }

  await browser.close();

  console.log('\n============================================================');
  console.log('🏁 BATCH COMPILATION & REPROGRAPHIC AUDIT SUMMARY');
  console.log('============================================================');
  allResults.forEach((r) => {
    console.log(
      `- ${r.filename}: ${r.isClean ? '✅ 100% REPROGRAPHIC COMPLIANCE (0px Overflow)' : '❌ OVERFLOW DETECTED'}`,
    );
  });
}

renderAllWorksheets().catch((err) => {
  console.error('❌ Batch compiler failed:', err);
  process.exit(1);
});
