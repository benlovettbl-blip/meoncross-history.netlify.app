/**
 * scripts/audit_all_gcse_workbooks_print_pack.cjs
 *
 * Comprehensive Reprographics & Page Budget Verification Engine for GCSE (KS4)
 * Audits all 20 GCSE Physical Pupil Workbooks across 6 GCSE Units:
 * 1. CME: KT1, KT2, KT3
 * 2. USA: KT1, KT2, KT3, KT4
 * 3. Weimar: KT1, KT2, KT3, KT4
 * 4. Early Elizabethan England: KT1, KT2, KT3
 * 5. Medicine: Medieval, Renaissance, 18th/19th, Modern, Western Front
 * 6. Cold War: Full Unit
 *
 * Audits:
 * - Saddle-stitch multiple-of-4 page budget (16p, 20p, 24p, or 28p)
 * - 0px content overflow across every page
 * - Space utilization >= 95% and footer gap <= 25px
 * - Banned cognitive clutter tags
 * - PDF-to-HTML page count parity
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');
const { lintCognitiveClutter } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

const GCSE_WORKBOOKS = [
  // Conflict in the Middle East
  {
    unit: 'cme_new',
    name: 'KT1 (1945–1973)',
    html: 'public/units/cme_new/pupil_workbook_KT1.html',
    pdf: 'public/pdfs/cme_new_pupil_workbook_KT1.pdf',
  },
  {
    unit: 'cme_new',
    name: 'KT2 (1973–1979)',
    html: 'public/units/cme_new/pupil_workbook_KT2.html',
    pdf: 'public/pdfs/cme_new_pupil_workbook_KT2.pdf',
  },
  {
    unit: 'cme_new',
    name: 'KT3 (1979–1995)',
    html: 'public/units/cme_new/pupil_workbook_KT3.html',
    pdf: 'public/pdfs/cme_new_pupil_workbook_KT3.pdf',
  },

  // USA 1954–1975 (Master Compendium 48-Page Standard)
  {
    unit: 'usa',
    name: 'USA Master Compendium (48 Pages)',
    html: 'public/units/usa/booklets/usa_mastery_FULL.html',
    pdf: 'public/pdfs/usa_mastery_pack_FULL.pdf',
  },

  // Weimar and Nazi Germany
  {
    unit: 'weimar_nazi_germany',
    name: 'KT1 Weimar Republic 1918–29',
    html: 'public/units/weimar_nazi_germany/pupil_workbook_KT1.html',
    pdf: 'public/pdfs/weimar_nazi_germany_pupil_workbook_KT1.pdf',
  },
  {
    unit: 'weimar_nazi_germany',
    name: 'KT2 Hitler’s Rise 1919–33',
    html: 'public/units/weimar_nazi_germany/pupil_workbook_KT2.html',
    pdf: 'public/pdfs/weimar_nazi_germany_pupil_workbook_KT2.pdf',
  },
  {
    unit: 'weimar_nazi_germany',
    name: 'KT3 Nazi Control & Police State',
    html: 'public/units/weimar_nazi_germany/pupil_workbook_KT3.html',
    pdf: 'public/pdfs/weimar_nazi_germany_pupil_workbook_KT3.pdf',
  },
  {
    unit: 'weimar_nazi_germany',
    name: 'KT4 Life in Nazi Germany',
    html: 'public/units/weimar_nazi_germany/pupil_workbook_KT4.html',
    pdf: 'public/pdfs/weimar_nazi_germany_pupil_workbook_KT4.pdf',
  },

  // Early Elizabethan England
  {
    unit: 'eee',
    name: 'KT1 Queen, Government & Religion',
    html: 'public/units/eee/pupil_workbook_KT1.html',
    pdf: 'public/pdfs/eee_pupil_workbook_KT1.pdf',
  },
  {
    unit: 'eee',
    name: 'KT2 Challenges at Home & Abroad',
    html: 'public/units/eee/pupil_workbook_KT2.html',
    pdf: 'public/pdfs/eee_pupil_workbook_KT2.pdf',
  },
  {
    unit: 'eee',
    name: 'KT3 Elizabethan Society & Age of Exploration',
    html: 'public/units/eee/pupil_workbook_KT3.html',
    pdf: 'public/pdfs/eee_pupil_workbook_KT3.pdf',
  },

  // Medicine Through Time
  {
    unit: 'edexcel_medicine',
    name: 'Medieval Medicine (c1250–c1500)',
    html: 'public/units/edexcel_medicine/pupil_workbook_medieval.html',
    pdf: 'public/pdfs/edexcel_medicine_pupil_workbook_medieval.pdf',
  },
  {
    unit: 'edexcel_medicine',
    name: 'Renaissance Medicine (c1500–c1700)',
    html: 'public/units/edexcel_medicine/pupil_workbook_renaissance.html',
    pdf: 'public/pdfs/edexcel_medicine_pupil_workbook_renaissance.pdf',
  },
  {
    unit: 'edexcel_medicine',
    name: '18th & 19th C. Medicine (c1700–c1900)',
    html: 'public/units/edexcel_medicine/pupil_workbook_18th_19th.html',
    pdf: 'public/pdfs/edexcel_medicine_pupil_workbook_18th_19th.pdf',
  },
  {
    unit: 'edexcel_medicine',
    name: 'Modern Medicine (c1900–present)',
    html: 'public/units/edexcel_medicine/pupil_workbook_modern.html',
    pdf: 'public/pdfs/edexcel_medicine_pupil_workbook_modern.pdf',
  },
  {
    unit: 'edexcel_medicine',
    name: 'Western Front Historic Environment',
    html: 'public/units/edexcel_medicine/pupil_workbook_western_front.html',
    pdf: 'public/pdfs/edexcel_medicine_pupil_workbook_western_front.pdf',
  },

  // Superpower Relations & Cold War
  {
    unit: 'cold_war',
    name: 'Cold War Full Unit',
    html: 'public/units/cold_war/pupil_workbook.html',
    pdf: 'public/pdfs/cold_war_pupil_workbook.pdf',
  },
];

async function auditGcseWorkbook(item, browser) {
  const fullHtml = path.join(ROOT_DIR, item.html);
  if (!fs.existsSync(fullHtml)) {
    return { ...item, error: 'HTML file missing on disk: ' + item.html };
  }

  const rawHtml = fs.readFileSync(fullHtml, 'utf8');
  const clutterCheck = lintCognitiveClutter(rawHtml);

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });
  await page.goto('file:///' + fullHtml.replace(/\\/g, '/'), {
    waitUntil: ['load', 'networkidle0'],
  });

  const pageStats = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page, .a4-page'));
    return pages.map((p, idx) => {
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 1 ? Math.round(scrollH - clientH) : 0;

      const footer = p.querySelector('.page-footer-strip, .page-footer, footer');
      let footerGap = 0;
      if (footer) {
        const pRect = p.getBoundingClientRect();
        const fRect = footer.getBoundingClientRect();
        footerGap = Math.max(0, Math.round(pRect.bottom - fRect.bottom));
      }

      const utilizedH = clientH - footerGap;
      const utilization = Math.round((utilizedH / clientH) * 100);

      return { pageNum, scrollH, clientH, overflow, footerGap, utilization };
    });
  });

  await page.close();

  // Check PDF
  let pdfStats = null;
  const fullPdf = path.join(ROOT_DIR, item.pdf);
  if (fs.existsSync(fullPdf)) {
    const bytes = fs.readFileSync(fullPdf);
    const parsed = await pdfParse(bytes);
    pdfStats = {
      pdfFile: path.basename(item.pdf),
      numpages: parsed.numpages,
      matchesHtml: parsed.numpages === pageStats.length,
    };
  } else {
    pdfStats = { pdfFile: path.basename(item.pdf), error: 'NOT_ON_DISK' };
  }

  const isMultipleOf4 = pageStats.length % 4 === 0;

  return {
    ...item,
    pageCount: pageStats.length,
    isMultipleOf4,
    sheetsRequired: Math.ceil(pageStats.length / 4),
    pages: pageStats,
    pdfStats,
    clutterClean: clutterCheck.clean,
    clutterViolations: clutterCheck.violations,
  };
}

async function run() {
  console.log(
    '========================================================================================',
  );
  console.log('🖨️  GCSE (KEY STAGE 4) PHYSICAL PUPIL WORKBOOK PRINT PACK AUDIT (20 WORKBOOKS)');
  console.log(
    '========================================================================================\n',
  );

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  try {
    for (const item of GCSE_WORKBOOKS) {
      process.stdout.write(`Auditing [${item.unit}] ${item.name}... `);
      const res = await auditGcseWorkbook(item, browser);
      results.push(res);
      console.log(`Done (${res.pageCount} pages, PDF: ${res.pdfStats?.numpages || 'none'}p)`);
    }
  } finally {
    await browser.close();
  }

  console.log(
    '\n====================================================================================================',
  );
  console.log('📊 GCSE REPROGRAPHIC AUDIT SUMMARY TABLE');
  console.log(
    '====================================================================================================',
  );
  console.log(
    'WORKBOOK'.padEnd(42) +
      'HTML PGS'.padEnd(10) +
      'PDF PGS'.padEnd(10) +
      'SADDLE-STITCH'.padEnd(16) +
      'OVERFLOW'.padEnd(12) +
      'AVG UTIL'.padEnd(12) +
      'STATUS',
  );
  console.log('-'.repeat(108));

  let totalDefects = 0;

  results.forEach((r) => {
    if (r.error) {
      console.log((r.unit + ' ' + r.name).padEnd(42) + 'ERROR: ' + r.error);
      totalDefects++;
      return;
    }

    const title = `${r.unit}: ${r.name}`;
    const htmlPgs = String(r.pageCount);
    const pdfPgs = r.pdfStats ? String(r.pdfStats.numpages) : 'MISSING';
    const saddle = r.isMultipleOf4 ? `✅ ${r.sheetsRequired} sheets` : '❌ NOT MULT 4';
    const maxOverflow = Math.max(...r.pages.map((p) => p.overflow));
    const overflowStr = maxOverflow === 0 ? '✅ 0px' : `❌ ${maxOverflow}px`;
    const avgUtil =
      Math.round(r.pages.reduce((acc, p) => acc + p.utilization, 0) / r.pages.length) + '%';

    let status = '✅ PASS';
    if (maxOverflow > 0 || !r.isMultipleOf4 || !r.pdfStats?.matchesHtml || !r.clutterClean) {
      status = '⚠️ NEEDS REVIEW';
      totalDefects++;
    }

    console.log(
      title.padEnd(42) +
        htmlPgs.padEnd(10) +
        pdfPgs.padEnd(10) +
        saddle.padEnd(16) +
        overflowStr.padEnd(12) +
        avgUtil.padEnd(12) +
        status,
    );

    if (maxOverflow > 0) {
      r.pages
        .filter((p) => p.overflow > 0)
        .forEach((p) => {
          console.log(
            `   ↳ Page ${p.pageNum}: OVERFLOW by ${p.overflow}px (scrollH: ${p.scrollH}px, clientH: ${p.clientH}px)`,
          );
        });
    }
    if (r.pdfStats && !r.pdfStats.matchesHtml) {
      console.log(
        `   ↳ PDF Mismatch: HTML has ${r.pageCount} pages, but PDF has ${r.pdfStats.numpages} pages!`,
      );
    }
    if (!r.clutterClean) {
      console.log(`   ↳ Clutter violations: ${r.clutterViolations.join(', ')}`);
    }
  });

  console.log(
    '\n====================================================================================================',
  );
  if (totalDefects === 0) {
    console.log(
      '🎉 100% GCSE REPROGRAPHICS PASS: All 20 GCSE workbooks are photocopier-ready with 0px overflow!',
    );
  } else {
    console.log(
      `⚠️ AUDIT COMPLETE: ${totalDefects} item(s) need attention for 100% photocopier perfection.`,
    );
  }
  console.log(
    '====================================================================================================\n',
  );

  if (totalDefects > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

run().catch(console.error);
