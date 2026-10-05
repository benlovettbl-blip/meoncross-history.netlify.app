const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, '../../public/units/cme_new/pupil_workbook_KT1.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    const p1Body = document.querySelector('#page-1 .page-body-full');
    const header = p1Body.children[0];
    const banner = p1Body.children[1];
    const photo = p1Body.children[2];
    const pupilCard = p1Body.children[3];
    const specBox = p1Body.children[4];

    // Move pupilCard to top (between header and banner)
    p1Body.insertBefore(pupilCard, banner);

    // Adjust photo frame height to 100mm
    const photoFrame = photo.querySelector('div:first-child');
    photoFrame.style.height = '100mm';

    // Recalibrate typography in specBox
    const subtopics = specBox.querySelector('div:nth-child(2)');
    Array.from(subtopics.children).forEach((col) => {
      const strong = col.querySelector('strong');
      if (strong) {
        strong.style.fontSize = '8.0pt';
        strong.style.marginBottom = '4px';
        strong.style.paddingBottom = '2px';
      }
      const itemsDiv = col.querySelector('div');
      if (itemsDiv) {
        itemsDiv.style.fontSize = '7.3pt';
        itemsDiv.style.lineHeight = '1.28';
        Array.from(itemsDiv.children).forEach((item) => {
          item.style.marginBottom = '3px';
        });
      }
    });

    return {
      p1Height: document.querySelector('#page-1').offsetHeight,
      p1Scroll: document.querySelector('#page-1').scrollHeight,
      specBoxHeight: specBox.offsetHeight,
      specBoxScroll: specBox.scrollHeight,
      cols: Array.from(subtopics.children).map((c, i) => ({
        col: i,
        clientHeight: c.clientHeight,
        scrollHeight: c.scrollHeight,
        itemsHeight: c.querySelector('div').offsetHeight,
        itemsScroll: c.querySelector('div').scrollHeight,
      })),
    };
  });

  console.log('Result with 100mm photo & top pupil card:', JSON.stringify(result, null, 2));

  const p1 = await page.$('#page-1');
  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_cme_pupil_card_top_A_above_banner.png'),
  });
  console.log('Saved test_cme_pupil_card_top_A_above_banner.png');

  // Reload and test Position B: below banner, above photo
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const p1Body = document.querySelector('#page-1 .page-body-full');
    const banner = p1Body.children[1];
    const photo = p1Body.children[2];
    const pupilCard = p1Body.children[3];
    const specBox = p1Body.children[4];

    // Move pupilCard before photo
    p1Body.insertBefore(pupilCard, photo);

    // Adjust photo frame height to 100mm
    const photoFrame = photo.querySelector('div:first-child');
    photoFrame.style.height = '100mm';

    // Recalibrate typography in specBox
    const subtopics = specBox.querySelector('div:nth-child(2)');
    Array.from(subtopics.children).forEach((col) => {
      const strong = col.querySelector('strong');
      if (strong) {
        strong.style.fontSize = '8.0pt';
        strong.style.marginBottom = '4px';
        strong.style.paddingBottom = '2px';
      }
      const itemsDiv = col.querySelector('div');
      if (itemsDiv) {
        itemsDiv.style.fontSize = '7.3pt';
        itemsDiv.style.lineHeight = '1.28';
        Array.from(itemsDiv.children).forEach((item) => {
          item.style.marginBottom = '3px';
        });
      }
    });
  });

  const p1_b = await page.$('#page-1');
  await p1_b.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_cme_pupil_card_top_B_below_banner.png'),
  });
  console.log('Saved test_cme_pupil_card_top_B_below_banner.png');

  await browser.close();
})();
