const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PUB_DIR = path.join(__dirname, '..', 'public');
const PDF_DIR = path.join(PUB_DIR, 'pdfs', 'ks2_ww2');

async function renderPdf(htmlPath, outPdfPath) {
  console.log(`Rendering PDF: ${path.basename(htmlPath)} -> ${path.basename(outPdfPath)}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve(htmlPath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'] });
  await page.evaluateHandle('document.fonts.ready');

  // Check if landscape or portrait
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`✅ Saved: ${outPdfPath} (${(fs.statSync(outPdfPath).size / 1024).toFixed(1)} KB)`);
}

async function run() {
  const targets = [
    {
      html: path.join(
        PUB_DIR,
        'units',
        'ks2_ww2',
        'worksheets',
        'lesson_02_evacuation_worksheet.html',
      ),
      pdf: path.join(PDF_DIR, 'lesson_02_evacuation_worksheet.pdf'),
    },
    {
      html: path.join(
        PUB_DIR,
        'units',
        'ks2_ww2',
        'worksheets',
        'lesson_03_kindertransport_worksheet.html',
      ),
      pdf: path.join(PDF_DIR, 'lesson_03_kindertransport_worksheet.pdf'),
    },
    {
      html: path.join(PUB_DIR, 'units', 'ks2_ww2', 'pupil_workbook.html'),
      pdf: path.join(PDF_DIR, 'ks2_ww2_pupil_workbook.pdf'),
    },
  ];

  for (const t of targets) {
    await renderPdf(t.html, t.pdf);
  }
  console.log('🎉 All target PDFs updated with blank suitcase canvas!');
}

run().catch((err) => {
  console.error('Error rendering PDFs:', err);
  process.exit(1);
});
