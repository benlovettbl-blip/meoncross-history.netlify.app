const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const unitDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new');
const globalPdfsDir = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });
if (!fs.existsSync(globalPdfsDir)) fs.mkdirSync(globalPdfsDir, { recursive: true });

const QUIZ_FILES = [
  {
    id: 'KT1',
    htmlFile: 'mastery_pack_KT1.html',
    pdfName: 'cme_recall_quiz_KT1.pdf',
    title: 'Key Topic 1 Recall Quiz (80 Questions & The Vault)',
  },
  {
    id: 'KT2',
    htmlFile: 'mastery_pack_KT2.html',
    pdfName: 'cme_recall_quiz_KT2.pdf',
    title: 'Key Topic 2 Recall Quiz (60 Questions & The Vault)',
  },
  {
    id: 'KT3',
    htmlFile: 'mastery_pack_KT3.html',
    pdfName: 'cme_recall_quiz_KT3.pdf',
    title: 'Key Topic 3 Recall Quiz (60 Questions & The Vault)',
  },
  {
    id: 'FULL',
    htmlFile: 'mastery_pack_full.html',
    pdfName: 'cme_recall_quiz_FULL.pdf',
    title: 'Complete Unit Master Recall Quiz (All 200 Questions & The Vault)',
  },
];

(async () => {
  console.log('🚀 Starting Middle East Recall Quiz PDF Generation...');

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 600000,
    timeout: 300000,
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  for (const item of QUIZ_FILES) {
    const htmlPath = path.join(unitDir, item.htmlFile);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`⚠️ HTML file missing: ${htmlPath}. Skipping.`);
      continue;
    }

    console.log(`\n📄 Compiling ${item.title}...`);
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(300000);

    await page.goto(pathToFileURL(htmlPath).href, {
      waitUntil: 'networkidle2',
      timeout: 300000,
    });

    // Ensure screen toolbars and overlays are cleanly hidden
    await page.evaluate(() => {
      const toolbars = document.querySelectorAll(
        '.screen-vault-toolbar, .leitner-modal-overlay, .vault-screen-controls, .vault-btn-group',
      );
      toolbars.forEach((el) => {
        el.style.display = 'none';
      });
    });

    const targetPdfPath = path.join(pdfsDir, item.pdfName);

    await page.pdf({
      path: targetPdfPath,
      format: 'A4',
      landscape: false,
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' },
      timeout: 180000,
    });

    await page.close();

    // Verify page count
    const buf = fs.readFileSync(targetPdfPath);
    const matches = buf.toString('latin1').match(/\/Type\s*\/Page\b/g);
    const pageCount = matches ? matches.length : 0;
    console.log(`   ✅ Exported: ${item.pdfName} (${pageCount} pages)`);

    // Copy to global public/pdfs/
    const globalCopyPath = path.join(globalPdfsDir, item.pdfName);
    fs.copyFileSync(targetPdfPath, globalCopyPath);
    console.log(`   📋 Synced to public/pdfs/${item.pdfName}`);
  }

  await browser.close();

  // Auto-sync to Google Drive Department File if available
  const driveBase =
    'G:\\My Drive\\AAMX\\Dep File\\02. GCSE (Years 10-11)\\Paper 2 - Conflict in the Middle East';
  if (fs.existsSync('G:\\My Drive')) {
    const targetDriveDir = path.join(driveBase, '03. Retrieval Quizzing & Mastery');
    try {
      if (!fs.existsSync(targetDriveDir)) {
        fs.mkdirSync(targetDriveDir, { recursive: true });
      }
      for (const item of QUIZ_FILES) {
        const src = path.join(pdfsDir, item.pdfName);
        if (fs.existsSync(src)) {
          const dest = path.join(targetDriveDir, item.pdfName);
          fs.copyFileSync(src, dest);
          console.log(`   ☁️ Google Drive synced: ${item.pdfName}`);
        }
      }
      console.log('✅ Google Drive Department File updated with Middle East Recall Quiz PDFs.');
    } catch (e) {
      console.warn(`   ⚠️ Could not sync to Google Drive: ${e.message}`);
    }
  }

  console.log('\n🎉 All Conflict in the Middle East Quiz PDFs successfully generated!');
})();
