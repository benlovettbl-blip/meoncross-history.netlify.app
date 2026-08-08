const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const publicUnitsDir = path.join(__dirname, 'public', 'units');
const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];

(async () => {
  console.log('Starting PDF export...');
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
  } catch (e) {
    console.log("Could not launch puppeteer. Attempting with standard headless mode.");
    browser = await puppeteer.launch({ headless: true });
  }
  
  let allDirs = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
    .map(dirent => dirent.name);
  if (process.argv[2]) allDirs = [process.argv[2]];

  for (const unitId of allDirs) {
    const unitPath = path.join(publicUnitsDir, unitId);
    if (!fs.existsSync(unitPath)) continue;
    
    const files = fs.readdirSync(unitPath).filter(f => f.startsWith('workbook') && f.endsWith('.html'));
    
    for (const file of files) {
      const htmlPath = path.join(unitPath, file);
      const pdfPath = htmlPath.replace('.html', '.pdf');
      console.log(`Generating PDF for ${unitId}/${file}...`);
      
      const page = await browser.newPage();
      // Ensure file URI format works cross-platform
      const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
      
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });
      
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; color: #64748b; font-family: Arial, sans-serif; padding-bottom: 5px;"><span class="pageNumber"></span></div>',
        margin: {
          top: '0px',
          right: '0px',
          bottom: '12mm',
          left: '0px'
        }
      });
      console.log(`Saved ${pdfPath}`);
      await page.close();
    }
  }

  await browser.close();
  console.log('PDF export completed successfully.');
})();
