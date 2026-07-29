const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    console.log("Navigating...");
    const url = `file://${process.cwd()}/great_war/workbook.html`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    
    console.log("Generating PDF...");
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    
    const { PDFDocument } = require('pdf-lib');
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    console.log(`\n\nTotal Pages: ${pdfDoc.getPageCount()}`);
    
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
