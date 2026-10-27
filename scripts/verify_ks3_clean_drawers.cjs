const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });

  // 1. Test Cold War (KS3 Y9) Lesson 1
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=cold_war&lesson=1', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const details = document.querySelector('.cme-source-drawer');
    if (details) {
      details.open = true;
      const reveal = details.querySelector('.source-enquiry-reveal');
      if (reveal) reveal.open = true;
    }
  });

  await new Promise(r => setTimeout(r, 800));

  const cwDrawer = await page.$('.cme-source-drawer');
  if (cwDrawer) {
    await cwDrawer.screenshot({ path: 'public/images/ks3_cold_war_clean_model_preview.png' });
    console.log("Saved preview to public/images/ks3_cold_war_clean_model_preview.png");
  }

  // 2. Test Medieval England (KS3 Y7) Lesson 1
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=medieval_england&lesson=1', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const details = document.querySelector('.cme-source-drawer');
    if (details) {
      details.open = true;
      const reveal = details.querySelector('.source-enquiry-reveal');
      if (reveal) reveal.open = true;
    }
  });

  await new Promise(r => setTimeout(r, 800));

  const medDrawer = await page.$('.cme-source-drawer');
  if (medDrawer) {
    await medDrawer.screenshot({ path: 'public/images/ks3_medieval_clean_model_preview.png' });
    console.log("Saved preview to public/images/ks3_medieval_clean_model_preview.png");
  }

  await browser.close();
  console.log("Verification screenshots captured successfully!");
})();
