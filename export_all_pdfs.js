const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// These scripts automatically loop through all units in public/units and generate the .html files
console.log("Generating HTML layouts for all units...");
require('./generate_textbooks.js');
require('./generate_pupil_workbooks.js');
require('./generate_timelines.js');
console.log("HTML generation complete.");

const publicDir = path.join(__dirname, 'public');
const pdfsDir = path.join(__dirname, 'public', 'pdfs');

if (!fs.existsSync(pdfsDir)){
    fs.mkdirSync(pdfsDir);
}

(async () => {
  // Read database.json to find all KS3 and GCSE units (i.e., non-trip units)
  const dbPath = path.join(publicDir, 'database.json');
  if (!fs.existsSync(dbPath)) {
      console.error("Master database.json not found!");
      process.exit(1);
  }
  
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  let targetUnits = [];
  for (const unitId of Object.keys(db)) {
    const unitData = db[unitId].data || {};
    if (unitData.type === 'trip') {
        console.log(`Skipping trip unit: ${unitId}`);
    } else {
        targetUnits.push(unitId);
    }
  }

  for (const unitId of targetUnits) {
    let browser;
    console.log('\n========================================');
    console.log(`Starting PDF export for unit: ${unitId}`);
    console.log('========================================');
    let browser = null;
    try {
      browser = await puppeteer.launch({ 
        headless: 'new', 
        protocolTimeout: 600000, 
        timeout: 300000,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
      });
      const unitDir = path.join(publicDir, 'units', unitId);
    
    if (!fs.existsSync(unitDir)) {
        console.warn(`Directory not found for unit: ${unitId}, skipping...`);
        continue;
    }

    try {
    let files = fs.readdirSync(unitDir).filter(f => f.endsWith('.html'));
    
    // Only generate PDFs for core required documents expected by the PDF Hub
    const allowedFiles = ['textbook.html', 'pupil_workbook.html', 'timeline.html', 'mastery_pack_full.html'];
    files = files.filter(f => allowedFiles.includes(f));
    
    for (const file of files) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(300000);
      
      const htmlPath = path.join(unitDir, file);
      console.log(`-> Rendering ${unitId}/${file}...`);
      await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2', timeout: 300000 });
      
      // Save directly with exact naming expected by the PDF Hub (e.g., [unit_id]_textbook.pdf)
      const pdfFileName = `${unitId}_${file.replace('.html', '.pdf')}`;
      const pdfPath = path.join(pdfsDir, pdfFileName);
      
      let success = false;
      let retries = 3;
      while (!success && retries > 0) {
        try {
          await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div></div>',
            footerTemplate: '<div style="font-size:10px; width:100%; text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
            margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
          });
          success = true;
          console.log(`   [SUCCESS] Saved ${pdfPath}`);
        } catch (err) {
          if (err.code === 'EBUSY' || err.code === 'EPERM') {
            console.warn(`   [WARNING] File locked (${pdfFileName}). Retrying in 2 seconds... (${retries - 1} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            retries--;
          } else {
            console.error(`   [ERROR] Failed to export ${pdfFileName}:`, err);
            break;
          }
        }
      }
      if (!success) {
        console.error(`   [FATAL] Failed to export ${pdfFileName} after multiple retries.`);
      }
      
      await page.close();
    }
    } finally {
      if (browser) await browser.close();
    }
  }
  
  console.log('\nGlobal PDF export complete!');
})();
