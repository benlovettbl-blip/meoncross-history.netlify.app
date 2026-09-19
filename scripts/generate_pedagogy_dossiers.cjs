/**
 * Compilation Pipeline for Departmental Pedagogical Research Dossiers
 * Renders print-ready, publication-grade PDFs of the History Department's
 * pedagogical doctrines, evidence base, and teaching choreographies.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const pedagogyDir = path.join(ROOT_DIR, 'pedagogy');
const outputPdfsDir = path.join(PATHS.PDFS, 'pedagogy');
const publicPedagogyDir = path.join(ROOT_DIR, 'public', 'pedagogy');

if (!fs.existsSync(outputPdfsDir)) {
  fs.mkdirSync(outputPdfsDir, { recursive: true });
}
if (!fs.existsSync(publicPedagogyDir)) {
  fs.mkdirSync(publicPedagogyDir, { recursive: true });
}

async function compilePedagogyDossiers() {
  console.log('🏛️ Compiling Departmental Pedagogical Dossiers into publication PDFs...');

  if (!fs.existsSync(pedagogyDir)) {
    console.warn('⚠️ No pedagogy directory found.');
    return;
  }

  const htmlFiles = fs.readdirSync(pedagogyDir).filter((file) => file.endsWith('.html'));

  if (htmlFiles.length === 0) {
    console.log('ℹ️ No HTML dossiers found in pedagogy directory.');
    return;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 600000,
    timeout: 300000,
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  try {
    const page = await browser.newPage();

    for (const file of htmlFiles) {
      const srcPath = path.join(pedagogyDir, file);
      const baseName = path.basename(file, '.html');
      const destPdf = path.join(outputPdfsDir, `${baseName}.pdf`);

      console.log(`📄 Rendering ${file} -> public/pdfs/pedagogy/${baseName}.pdf...`);
      const fileUrl = 'file://' + path.resolve(srcPath).replace(/\\/g, '/');

      await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.evaluateHandle('document.fonts.ready');

      await page.pdf({
        path: destPdf,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      });

      // Also mirror HTML to public/pedagogy for web viewing
      fs.copyFileSync(srcPath, path.join(publicPedagogyDir, file));

      const stats = fs.statSync(destPdf);
      console.log(`   ✅ Exported: ${baseName}.pdf (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  } finally {
    await browser.close();
  }

  console.log('🎉 All Pedagogical Dossiers compiled successfully.\n');
}

if (require.main === module) {
  compilePedagogyDossiers().catch((err) => {
    console.error('❌ Error compiling pedagogy dossiers:', err);
    process.exit(1);
  });
}

module.exports = { compilePedagogyDossiers };
