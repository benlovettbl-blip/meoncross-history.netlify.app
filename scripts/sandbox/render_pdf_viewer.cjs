const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 2000 });
  const pdfUrl =
    'file:///' +
    path.resolve('public/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf').replace(/\\/g, '/');

  // Open page 6 directly using PDF anchor #page=6
  await page.goto(pdfUrl + '#page=6', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/units/sandbox_pilot/pdf_view_page6.png' });

  // Open page 10 directly using PDF anchor #page=10
  await page.goto(pdfUrl + '#page=10', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/units/sandbox_pilot/pdf_view_page10.png' });

  await browser.close();
  console.log('Saved pdf_view_page6.png and pdf_view_page10.png');
})();
