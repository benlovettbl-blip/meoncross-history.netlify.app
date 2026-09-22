const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pdfsDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

// Output paths: primary A4 companion + backward-compatible aliases
const outputPathA4 = path.join(pdfsDir, 'ypres_tour_leader_companion_a4.pdf');
const outputPathLegacyCompanion = path.join(pdfsDir, 'ypres_1914_1918_teacher_companion.pdf');
const outputPathLegacyPupil = path.join(pdfsDir, 'ypres_1914_1918_pupil_field_guide.pdf');
const outputPathPocketGuide = path.join(pdfsDir, 'ypres_tour_leader_pocket_guide.pdf');

// Helper to convert images to base64 for fast, reliable offline rendering
function getBase64Image(relPath) {
  const fullPath = path.join(__dirname, '../public', relPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).replace('.', '').toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'svg' ? 'image/svg+xml' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
  }
  console.warn('Could not find image at:', fullPath);
  return '';
}

const styles = require('./ypres_pages/styles.cjs');
const renderPage1 = require('./ypres_pages/page_1.cjs');
const renderPage2 = require('./ypres_pages/page_2.cjs');
const renderPage3 = require('./ypres_pages/page_3.cjs');
const renderPage4 = require('./ypres_pages/page_4.cjs');
const renderPage5 = require('./ypres_pages/page_5.cjs');
const renderPage6 = require('./ypres_pages/page_6.cjs');
const renderPage7 = require('./ypres_pages/page_7.cjs');
const renderPage8 = require('./ypres_pages/page_8.cjs');
const renderPage9 = require('./ypres_pages/page_9.cjs');
const renderPage10 = require('./ypres_pages/page_10.cjs');
const renderPage11 = require('./ypres_pages/page_11.cjs');
const renderPage12 = require('./ypres_pages/page_12.cjs');
const renderPage13 = require('./ypres_pages/page_13.cjs');
const renderPage14 = require('./ypres_pages/page_14.cjs');
const renderPage15 = require('./ypres_pages/page_15.cjs');
const renderPage16 = require('./ypres_pages/page_16.cjs');

function getHtmlContent() {
  const assets = {
    stubbingtonMem: getBase64Image('images/stubbington_memorial.jpg'),
    lowryWilliam: getBase64Image('images/lowry_william.png'),
    lowryCyril: getBase64Image('images/lowry_cyril.png'),
    lowryEric: getBase64Image('images/lowry_auriol.png'),
    salientMap: getBase64Image('images/ypres_salient_map_new.png'),
    headstoneImg: getBase64Image('images/cwgc_headstone_essex_farm.jpg'),
    broodingSoldier: getBase64Image('images/brooding_soldier_gas.jpg'),
    hoogeCrater: getBase64Image('images/hooge_crater.jpg'),
    tyneCot: getBase64Image('images/ypres_tyne_cot.jpg'),
    meninGate: getBase64Image('images/ypres_menin_gate.jpg'),
    passchendaeleDugout: getBase64Image('images/passchendaele_museum_dugout.jpg'),
    cheshireTrench: getBase64Image('images/cheshire_regiment_trench.png'),
    mccraeImg: getBase64Image('images/john_mccrae.jpg'),
    sorleyImg: getBase64Image('images/charles_sorley.jpg'),
    owenImg: getBase64Image('images/wilfred_owen.jpg'),
    rosenbergImg: getBase64Image('images/isaac_rosenberg.jpg'),
    binyonImg: getBase64Image('images/laurence_binyon.jpg'),
    sassoonImg: getBase64Image('images/siegfried_sassoon.jpg'),
    brookeImg: getBase64Image('images/rupert_brooke.jpg'),
    xrayFieldHospital: getBase64Image('images/mobile_xray_field_hospital_1917.jpg'),
    stretcherMud: getBase64Image('images/stretcher_bearers_passchendaele_1917.jpg'),
    clothHallRestored: getBase64Image('images/ypres_cloth_hall.jpg'),
    talbotHouse: getBase64Image('images/talbot_house_relaxing.jpg'),
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ypres 1914–1918: Tour Leader &amp; Teacher Field Companion (A4)</title>
  <style>
${styles}
  </style>
</head>
<body>
${renderPage1(assets)}
${renderPage2(assets)}
${renderPage3(assets)}
${renderPage4(assets)}
${renderPage5(assets)}
${renderPage6(assets)}
${renderPage7(assets)}
${renderPage8(assets)}
${renderPage9(assets)}
${renderPage10(assets)}
${renderPage11(assets)}
${renderPage12(assets)}
${renderPage13(assets)}
${renderPage14(assets)}
${renderPage15(assets)}
${renderPage16(assets)}
</body>
</html>
`;
}

async function generatePdf() {
  console.log('Generating Ypres Tour Leader A4 Master Field Companion (16 Pages)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  const html = getHtmlContent();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Evaluate page heights and overflow
  const pageEvaluations = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((p, idx) => ({
      pageIndex: idx + 1,
      scrollHeight: p.scrollHeight,
      clientHeight: p.clientHeight,
      overflowPx: Math.max(0, p.scrollHeight - p.clientHeight),
    }));
  });

  console.log('Page Height & Overflow Audit (A4):');
  pageEvaluations.forEach((p) => {
    console.log(
      `Page ${p.pageIndex}: scroll=${p.scrollHeight}px, client=${p.clientHeight}px, overflow=${p.overflowPx}px`,
    );
  });

  const totalOverflow = pageEvaluations.reduce((sum, p) => sum + p.overflowPx, 0);
  if (totalOverflow > 0) {
    console.warn(`⚠️ Warning: Detected ${totalOverflow}px overflow across pages!`);
  } else {
    console.log('✅ Perfect 0px overflow across all 16 pages in A4!');
  }

  // Generate primary A4 PDF
  await page.pdf({
    path: outputPathA4,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  // Also write copies to backward-compatible names so no URL ever 404s
  fs.copyFileSync(outputPathA4, outputPathLegacyCompanion);
  fs.copyFileSync(outputPathA4, outputPathLegacyPupil);
  fs.copyFileSync(outputPathA4, outputPathPocketGuide);

  await browser.close();
  console.log('✅ Ypres Tour Leader Companion (A4) successfully created at:');
  console.log('  -', outputPathA4);
  console.log('  -', outputPathLegacyCompanion);
  console.log('  -', outputPathLegacyPupil);
  console.log('  -', outputPathPocketGuide);
}

if (require.main === module) {
  generatePdf().catch((err) => {
    console.error('Error generating Tour Leader Field Companion PDF:', err);
    process.exit(1);
  });
}

module.exports = {
  getHtmlContent,
  generatePdf,
  outputPathA4,
  outputPathLegacyCompanion,
  outputPathLegacyPupil,
  outputPathPocketGuide,
};
