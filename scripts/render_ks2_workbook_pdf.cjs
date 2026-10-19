const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ASSETS_DIR = path.join(__dirname, '..', 'units', 'ks2_ww2', 'assets');
const WORKBOOK_PATH = path.join(__dirname, '..', 'units', 'ks2_ww2', 'pupil_workbook.html');
const PUB_WORKBOOK_PATH = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'pupil_workbook.html',
);
const PDF_PATH = path.join(
  __dirname,
  '..',
  'public',
  'pdfs',
  'ks2_ww2',
  'ks2_ww2_pupil_workbook.pdf',
);

function getAssetMap(dir) {
  const map = {};
  if (!fs.existsSync(dir)) return map;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const fullPath = path.join(dir, ent.name);
    if (!ent.isDirectory() && /\.(jpg|jpeg|png|webp|svg)$/i.test(ent.name)) {
      const ext = path.extname(ent.name).replace('.', '').toLowerCase();
      const mime = ext === 'jpg' ? 'jpeg' : ext === 'svg' ? 'svg+xml' : ext;
      const buf = fs.readFileSync(fullPath);
      map[ent.name] = `data:image/${mime};base64,${buf.toString('base64')}`;
    }
  }
  return map;
}

async function renderWorkbook() {
  console.log('🚀 Compiling 24-Page KS2 Pupil Consumable Workbook to Print-Ready PDF...');
  const assetMap = getAssetMap(ASSETS_DIR);

  let html = fs.readFileSync(WORKBOOK_PATH, 'utf8');
  for (const [imgName, dataUri] of Object.entries(assetMap)) {
    const regex = new RegExp(`src=["'](${imgName}|.*/${imgName})["']`, 'g');
    html = html.replace(regex, `src="${dataUri}"`);
  }
  fs.writeFileSync(PUB_WORKBOOK_PATH, html, 'utf8');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.evaluateHandle('document.fonts.ready');

  const pageMetrics = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.workbook-page'));
    return pages.map((p, idx) => {
      const overflow = p.scrollHeight - p.clientHeight;
      return { pageNum: idx + 1, overflow };
    });
  });

  let hasOverflow = false;
  pageMetrics.forEach((m) => {
    if (m.overflow > 1) {
      console.log(`❌ Page ${m.pageNum} has ${m.overflow}px overflow!`);
      hasOverflow = true;
    } else {
      console.log(`✅ Page ${m.pageNum}: 0px overflow`);
    }
  });

  const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const pageEls = await page.$$('.workbook-page');
  for (let i = 0; i < pageEls.length; i++) {
    await pageEls[i].screenshot({
      path: path.join(screenshotDir, `ks2_workbook_page${i + 1}.png`),
    });
  }
  console.log(
    `📸 Captured screenshots for all ${pageEls.length} workbook pages into public/screenshots/`,
  );

  await page.pdf({
    path: PDF_PATH,
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  const FINAL_V17_PATH = path.join(
    __dirname,
    '..',
    'public',
    'pdfs',
    'ks2_ww2_pupil_workbook_FINAL_V17.pdf',
  );
  const ROOT_PDF_PATH = path.join(__dirname, '..', 'public', 'pdfs', 'ks2_ww2_pupil_workbook.pdf');
  fs.copyFileSync(PDF_PATH, FINAL_V17_PATH);
  fs.copyFileSync(PDF_PATH, ROOT_PDF_PATH);

  console.log(`🖨️ Successfully generated ${pageEls.length}-page PDF: ${PDF_PATH}`);
  console.log(`🖨️ Copied to: ${FINAL_V17_PATH}`);
  console.log(`🖨️ Copied to: ${ROOT_PDF_PATH}`);
  await browser.close();
}

renderWorkbook().catch((err) => {
  console.error(err);
  process.exit(1);
});
