const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

  const allenbyBuf = fs.readFileSync('public/images/cme_allenby_jerusalem_1917.jpg');
  const allenbyBase64 = `data:image/jpeg;base64,${allenbyBuf.toString('base64')}`;

  const balfourBuf = fs.readFileSync('public/images/cme_balfour_declaration_1917.jpg');
  const balfourBase64 = `data:image/jpeg;base64,${balfourBuf.toString('base64')}`;

  await page.setContent(`
    <div style="display: flex; gap: 20px; padding: 20px; background: #fff; font-family: sans-serif;">
      <div style="width: 350px;">
        <h3>Allenby with object-position: 50% 88%</h3>
        <div style="border: 1px solid #ccc; height: 140px; overflow: hidden;">
          <img src="${allenbyBase64}" style="width: 100%; height: 100%; object-fit: cover; object-position: 50% 88%;">
        </div>
      </div>
      <div style="width: 350px;">
        <h3>Balfour with object-fit: contain</h3>
        <div style="border: 1px solid #ccc; height: 140px; background: #fafaf9;">
          <img src="${balfourBase64}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
      </div>
    </div>
  `);

  const out =
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\12de0527-a7b2-4ab8-b8ae-673122685716\\test_framing.png';
  await page.screenshot({ path: out });
  await browser.close();
  console.log('Saved', out);
})();
