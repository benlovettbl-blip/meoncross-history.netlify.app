const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PATHS } = require('./config.cjs');
const ROOT_DIR = path.join(__dirname, "..");

require('./generate_textbooks.cjs');
require('./generate_pupil_workbooks.cjs');
require('./generate_timelines.cjs');

const publicDir = PATHS.PUBLIC;
const pdfsDir = PATHS.PDFS;
const cachePath = path.join(pdfsDir, '.build_cache.json');

if (!fs.existsSync(pdfsDir)){
    fs.mkdirSync(pdfsDir);
}

let buildCache = {};
if (fs.existsSync(cachePath)) {
    try {
        buildCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    } catch (e) {
        buildCache = {};
    }
}

function getFileHash(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 600000,
    timeout: 300000,
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(300000);
  
  const unitArg = process.argv[2] || 'all';
  const targetFile = process.argv[3];
  
  const units = unitArg === 'all' 
    ? fs.readdirSync(path.join(publicDir, 'units')).filter(f => fs.statSync(path.join(publicDir, 'units', f)).isDirectory()) 
    : [unitArg];

  let generatedCount = 0;

  for (const unit of units) {
    console.log('Starting PDF export for ' + unit + '...');
    const unitDir = path.join(publicDir, 'units', unit);
    if (fs.existsSync(unitDir)) {
      let files = fs.readdirSync(unitDir).filter(f => f.endsWith('.html'));
      
      // Only generate PDFs for core required documents
      const allowedPrefixes = ['textbook', 'pupil_workbook', 'mastery_pack_full', 'mastery_pack_KT'];
      files = files.filter(f => allowedPrefixes.some(prefix => f.startsWith(prefix) && f.endsWith('.html')));
      
      if (targetFile) {
        files = files.filter(f => f === targetFile);
      }
      for (const file of files) {
        const htmlPath = path.join(unitDir, file);
        const pdfFileName = unit + '_' + file.replace('.html', '_FINAL_V17.pdf');
        const pdfPath = path.join(pdfsDir, pdfFileName);
        
        const currentHash = getFileHash(htmlPath);
        const cacheKey = unit + '_' + file;
        
        if (buildCache[cacheKey] === currentHash && fs.existsSync(pdfPath)) {
            console.log(`Skipping ${pdfFileName} (unchanged)`);
            continue;
        }

        console.log('Generating PDF for ' + unit + '/' + file + '...');
        await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2', timeout: 300000 });

        // Convert all relative image src paths to base64 data URIs so Chromium's
        // file:// security policy cannot block them from rendering in the PDF.
        const htmlDir = path.dirname(htmlPath);
        const imgSrcs = await page.evaluate(() =>
          Array.from(document.querySelectorAll('img')).map(img => img.getAttribute('src'))
        );
        for (const src of imgSrcs) {
          if (!src || src.startsWith('data:') || src.startsWith('http')) continue;
          
          let absPath;
          if (src.startsWith('/')) {
            // It's a root-relative path (e.g., /images/...), so resolve from the public directory
            absPath = path.join(publicDir, src);
          } else {
            // It's a relative path (e.g., ../../images/...), so resolve from the HTML file's directory
            absPath = path.resolve(htmlDir, src);
          }
          
          if (!fs.existsSync(absPath)) {
            console.warn(`Warning: Image not found: ${absPath} (original src: ${src})`);
            continue;
          }
          const ext = path.extname(absPath).toLowerCase().replace('.', '');
          const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
                     : ext === 'png' ? 'image/png'
                     : ext === 'gif' ? 'image/gif'
                     : ext === 'webp' ? 'image/webp'
                     : 'image/jpeg';
          const b64 = fs.readFileSync(absPath).toString('base64');
          const dataUri = `data:${mime};base64,${b64}`;
          await page.evaluate((oldSrc, newSrc) => {
            document.querySelectorAll(`img[src="${oldSrc}"]`).forEach(img => img.src = newSrc);
          }, src, dataUri);
        }
        
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
            console.log('Saved ' + pdfPath);
            
            // Save cache immediately so we don't lose progress if it crashes
            buildCache[cacheKey] = currentHash;
            try {
              fs.writeFileSync(cachePath, JSON.stringify(buildCache, null, 2));
            } catch (err) {
              console.warn(`⚠️ Warning: Failed to write PDF cache to ${cachePath}`, err.message);
            }
            generatedCount++;
          } catch (err) {
            if (err.code === 'EBUSY' || err.code === 'EPERM') {
              console.warn(`File locked (${pdfFileName}). Retrying in 2 seconds... (${retries - 1} retries left)`);
              await new Promise(resolve => setTimeout(resolve, 2000));
              retries--;
            } else {
              throw err;
            }
          }
        }
        if (!success) {
          console.error(`Failed to export ${pdfFileName} after multiple retries due to file locking.`);
        }
      }
    }
  }
  
  await browser.close();
  console.log(`PDF generation complete! Generated ${generatedCount} new PDFs.`);
})();
