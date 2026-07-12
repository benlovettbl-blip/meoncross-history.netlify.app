const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePdfs() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const publicDir = path.join(__dirname, 'public', 'cme_workbooks');

  const kts = ['KT1', 'KT2', 'KT3'];

  for (const kt of kts) {
    const htmlPath = path.join(publicDir, `workbook_${kt}.html`);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`Could not find HTML for ${kt} at ${htmlPath}`);
      continue;
    }

    const pdfPath = path.join(publicDir, `workbook_${kt}.pdf`);
    
    // We already generated KT1 in the previous run, let's skip it to save time
    if (fs.existsSync(pdfPath)) {
      console.log(`PDF already exists for ${kt}, skipping...`);
      continue;
    }
    
    console.log(`Generating PDF for ${kt}...`);
    const page = await browser.newPage();
    
    try {
      // Load local HTML file
      await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { 
        waitUntil: 'networkidle2', // Changed from networkidle0
        timeout: 30000 
      });
      
      // Wait an extra 2 seconds to ensure any React/DOM rendering is done
      await new Promise(r => setTimeout(r, 2000));
      
      // Generate PDF
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        timeout: 60000,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        }
      });
      console.log(`Saved ${pdfPath}`);
    } catch (e) {
      console.error(`Error generating PDF for ${kt}:`, e);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("Finished generating all chunked PDF workbooks.");
}

generatePdfs().catch(console.error);
