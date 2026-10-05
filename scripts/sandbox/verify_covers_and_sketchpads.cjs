const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const files = [
    { name: 'KT1', html: 'public/units/cme_new/pupil_workbook_KT1.html' },
    { name: 'KT2', html: 'public/units/cme_new/pupil_workbook_KT2.html' },
    { name: 'KT3', html: 'public/units/cme_new/pupil_workbook_KT3.html' },
  ];

  const results = {};

  for (const item of files) {
    const fullPath = path.resolve(__dirname, '../../', item.html);
    await page.goto('file:///' + fullPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

    const data = await page.evaluate(() => {
      const p1 = document.querySelector('#page-1');
      const p1Body = p1 ? p1.querySelector('.page-body-full') : null;
      const specBox = p1 ? p1.querySelector('.page-body-full > div:nth-child(5)') : null;
      const subtopics = specBox ? specBox.querySelector('div:nth-child(2)') : null;

      // Check if timeline sketchpads have the watermark
      const p2 = document.querySelector('#page-2');
      const p3 = document.querySelector('#page-3');
      const p2Text = p2 ? p2.innerText : '';
      const p3Text = p3 ? p3.innerText : '';

      const hasWatermarkP2 =
        p2Text.includes('Symbolic Sketch') || p2Text.includes('Visual Diagram');
      const hasWatermarkP3 =
        p3Text.includes('Symbolic Sketch') || p3Text.includes('Visual Diagram');

      // Check for Jadid on page 4
      const p4 = document.querySelector('#page-4');
      const hasJadid = p4 ? p4.innerText.includes('Jadid') : false;

      return {
        p1OffsetHeight: p1 ? p1.offsetHeight : 0,
        p1ScrollHeight: p1 ? p1.scrollHeight : 0,
        specBoxOffsetHeight: specBox ? specBox.offsetHeight : 0,
        specBoxScrollHeight: specBox ? specBox.scrollHeight : 0,
        columns: subtopics
          ? Array.from(subtopics.children).map((col, idx) => ({
              idx,
              clientHeight: col.clientHeight,
              scrollHeight: col.scrollHeight,
              overflow: col.scrollHeight > col.clientHeight,
            }))
          : [],
        hasWatermarkP2,
        hasWatermarkP3,
        hasJadid,
      };
    });

    results[item.name] = data;

    // Take screenshot of Page 1
    const p1Elem = await page.$('#page-1');
    if (p1Elem) {
      const screenshotPath = path.resolve(
        __dirname,
        `../../public/pdfs/cover_${item.name}_verified.png`,
      );
      await p1Elem.screenshot({ path: screenshotPath });
      console.log(`Saved screenshot: cover_${item.name}_verified.png`);
    }

    // Take screenshot of Page 2 (timeline)
    const p2Elem = await page.$('#page-2');
    if (p2Elem) {
      const screenshotPath = path.resolve(
        __dirname,
        `../../public/pdfs/timeline_${item.name}_verified.png`,
      );
      await p2Elem.screenshot({ path: screenshotPath });
      console.log(`Saved screenshot: timeline_${item.name}_verified.png`);
    }

    // Take screenshot of Page 4 (KT2 Lesson 1 spine)
    if (item.name === 'KT2') {
      const p4Elem = await page.$('#page-4');
      if (p4Elem) {
        const screenshotPath = path.resolve(
          __dirname,
          `../../public/pdfs/lesson1_${item.name}_verified.png`,
        );
        await p4Elem.screenshot({ path: screenshotPath });
        console.log(`Saved screenshot: lesson1_${item.name}_verified.png`);
      }
    }
  }

  console.log('AUDIT VERIFICATION SUMMARY:');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
