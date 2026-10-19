const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PUB_DIR = path.join(__dirname, '..', 'public');
const WS_DIR = path.join(PUB_DIR, 'units', 'ks2_ww2', 'worksheets');
const PDF_DIR = path.join(PUB_DIR, 'pdfs', 'ks2_ww2');

async function renderAll() {
  console.log('🚀 Rendering all 10 KS2 Worksheet PDFs & Master Workbook...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const files = fs
    .readdirSync(WS_DIR)
    .filter((f) => f.endsWith('.html'))
    .sort();

  for (const f of files) {
    const htmlPath = path.join(WS_DIR, f);
    const pdfPath = path.join(PDF_DIR, f.replace('.html', '.pdf'));
    const page = await browser.newPage();
    const fileUrl = 'file:///' + path.resolve(htmlPath).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'] });
    await page.evaluateHandle('document.fonts.ready');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await page.close();
    console.log(`✅ Rendered: ${path.basename(pdfPath)}`);
  }

  // Master workbook
  const wbHtml = path.join(PUB_DIR, 'units', 'ks2_ww2', 'pupil_workbook.html');
  const wbPdf = path.join(PDF_DIR, 'ks2_ww2_pupil_workbook.pdf');
  const wbPage = await browser.newPage();
  const wbUrl = 'file:///' + path.resolve(wbHtml).replace(/\\/g, '/');
  await wbPage.goto(wbUrl, { waitUntil: ['load', 'networkidle0'] });
  await wbPage.evaluateHandle('document.fonts.ready');
  await wbPage.pdf({
    path: wbPdf,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await wbPage.close();
  console.log(`✅ Rendered: ${path.basename(wbPdf)}`);

  await browser.close();
  console.log('🎉 All 10 worksheet PDFs & Master Workbook PDF rendered successfully!');
}

renderAll().catch((err) => {
  console.error('Error rendering PDFs:', err);
  process.exit(1);
});
