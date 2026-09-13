const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const rootDir = path.join(__dirname, '..');
  const unitId = process.argv[2] || 'industrialisation_and_empire';
  const htmlPath = path.join(rootDir, 'public', 'units', unitId, 'pupil_workbook.html');
  const outputPath = path.join(rootDir, 'public', 'pdfs', `${unitId}_test_sample_p3_6.pdf `.trim());

  if (!fs.existsSync(htmlPath)) {
    console.error(`X Error: HTML file not found at ${htmlPath}`);
    process.exit(1);
  }

  console.log(`Generating 4-page test sample (pages 3-6) for ${unitId}...`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(require('url').pathToFileURL(htmlPath).href, {
    waitUntil: 'networkidle2',
    timeout: 300000,
  });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div style="font-size:10px; width:100%; text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span> (Physical Print Test Sample)</div>',
    margin: { top: '15mm', right: '20mm', bottom: '22mm', left: '20mm' },
    pageRanges: '3-6',
  });

  await browser.close();
  console.log(`�� Test sample successfully generated: ${outputPath}`);
})();
