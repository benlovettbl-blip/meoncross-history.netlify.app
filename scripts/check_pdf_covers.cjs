/**
 * check_pdf_covers.cjs
 * Pre-print sanity checker — verifies every *_FINAL_V17.pdf has a real photographic
 * cover image on page 1 (not just text/borders).
 * Uses Puppeteer to render each PDF page as an image and analyses pixel data.
 *
 * Pass criteria (both must be met):
 *   1. > 30% of sampled pixels are non-white (R,G,B all < 240)
 *   2. > 10% of sampled pixels are "richly coloured" (max channel - min channel > 20)
 *      — this distinguishes real photographs/paintings from black text on white.
 *
 * Usage:  node scripts/check_pdf_covers.cjs [unit_filter]
 * Example: node scripts/check_pdf_covers.cjs           (checks all PDFs)
 *          node scripts/check_pdf_covers.cjs medicine  (checks medicine PDFs only)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const pdfsDir = PATHS.PDFS;
const unitFilter = process.argv[2] || null;

// PDFs explicitly known to have text-only covers (no image expected)
const TEXT_ONLY_COVERS = new Set([
  // add filenames here if any unit legitimately has a spec-only cover
]);

async function analyseCover(page, pdfUrl) {
  await page.goto(pdfUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000)); // let the PDF viewer render

  // Take a screenshot of the cover image zone — below the spec box, above the school footer.
  // This area should be dominated by the historical photograph/illustration.
  const screenshot = await page.screenshot({
    clip: { x: 200, y: 200, width: 1000, height: 500 }, // cover image zone (centre of page)
    encoding: 'base64',
  });

  // Decode and analyse pixel data for two signals:
  //   1. nonWhiteRatio  — % of pixels where any channel < 240 (catches non-white content)
  //   2. richColorRatio — % of pixels where max(R,G,B) - min(R,G,B) > 20
  //      (text/line art has near-equal channels; photos have varied channel spread)
  const buf = Buffer.from(screenshot, 'base64');
  let nonWhiteCount = 0;
  let richColorCount = 0;
  let totalSamples = 0;
  for (let i = 100; i < buf.length - 4; i += 16) {
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];
    if (r !== undefined && g !== undefined && b !== undefined) {
      totalSamples++;
      if (r < 240 || g < 240 || b < 240) nonWhiteCount++;
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      if (spread > 20) richColorCount++;
    }
  }
  const nonWhiteRatio = totalSamples > 0 ? nonWhiteCount / totalSamples : 0;
  const richColorRatio = totalSamples > 0 ? richColorCount / totalSamples : 0;
  return { nonWhiteRatio, richColorRatio, screenshot };
}

(async () => {
  console.log('\n🖨️  Pre-Print PDF Cover Sanity Check');
  console.log('=====================================');
  if (unitFilter) console.log(`🔍 Filtering to: *${unitFilter}*\n`);

  const allPdfs = fs
    .readdirSync(pdfsDir)
    .filter((f) => f.endsWith('_FINAL_V17.pdf'))
    .filter((f) => !unitFilter || f.toLowerCase().includes(unitFilter.toLowerCase()))
    .sort();

  if (allPdfs.length === 0) {
    console.log('❌ No matching PDFs found in', pdfsDir);
    process.exit(1);
  }

  console.log(`Found ${allPdfs.length} PDFs to check...\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--allow-file-access-from-files'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const results = [];
  let passCount = 0;
  let failCount = 0;

  for (const fileName of allPdfs) {
    const pdfPath = path.join(pdfsDir, fileName);
    const pdfUrl = require('url').pathToFileURL(pdfPath).href;
    const isTextOnly = TEXT_ONLY_COVERS.has(fileName);

    process.stdout.write(`  Checking ${fileName}... `);

    try {
      const { nonWhiteRatio, richColorRatio } = await analyseCover(page, pdfUrl);
      // PASS requires BOTH: >30% non-white AND >10% richly coloured pixels.
      // Text + borders can hit 30% non-white but cannot hit 10% rich colour.
      // A real photo/painting easily hits both thresholds.
      const hasImage = nonWhiteRatio > 0.3 && richColorRatio > 0.1;
      const status =
        isTextOnly || hasImage
          ? '✅ PASS'
          : `❌ FAIL (non-white: ${Math.round(nonWhiteRatio * 100)}%, rich-colour: ${Math.round(richColorRatio * 100)}%)`;

      if (isTextOnly || hasImage) {
        passCount++;
      } else {
        failCount++;
      }

      console.log(
        `${status} (non-white: ${Math.round(nonWhiteRatio * 100)}%, rich-colour: ${Math.round(richColorRatio * 100)}%)`,
      );
      results.push({ fileName, hasImage, nonWhiteRatio, richColorRatio, status });
    } catch (err) {
      console.log(`⚠️  ERROR: ${err.message}`);
      results.push({
        fileName,
        hasImage: false,
        nonWhiteRatio: 0,
        status: `⚠️ ERROR: ${err.message}`,
      });
      failCount++;
    }
  }

  await browser.close();

  console.log('\n=====================================');
  console.log(`📊 Results: ${passCount} PASS  |  ${failCount} FAIL`);

  if (failCount > 0) {
    console.log('\n🚨 FAILED PDFs (fix before printing):');
    results.filter((r) => !r.hasImage).forEach((r) => console.log(`   • ${r.fileName}`));
    process.exit(1);
  } else {
    console.log('\n✅ All PDF covers look good — safe to print!');
    process.exit(0);
  }
})();
