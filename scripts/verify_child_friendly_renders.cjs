const puppeteer = require('puppeteer');

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('localhost:3003'));
  if (!page) {
    page = await browser.newPage();
  }

  // Clear any device metrics override to ensure full window
  const client = await page.target().createCDPSession();
  await client.send('Emulation.clearDeviceMetricsOverride');

  console.log('1. Navigating to Crown, Church, or Parliament Lesson 1...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=monarchy_religion_power&lesson=1', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1500));

  // Expand the first source enquiry reveal drawer
  const summaryInfo = await page.evaluate(() => {
    const details = document.querySelector('.source-enquiry-reveal');
    if (!details) return null;
    details.open = true;
    const badge = details.querySelector('span[style*="border-radius: 12px"]')?.textContent?.trim();
    const prompt = details.querySelector('.source-enquiry-prompt')?.textContent?.trim();
    const modelAns = details.querySelector('.source-enquiry-answer-body strong')?.nextElementSibling?.textContent?.trim() ||
                     details.querySelector('.source-enquiry-answer-body')?.textContent?.trim();
    return { badge, prompt, modelAnsSnippet: modelAns?.substring(0, 150) };
  });

  console.log('Crown Lesson 1 Source Enquiry Details:', summaryInfo);

  await page.screenshot({ path: 'public/mrp_lesson_1_source_revealed.png', fullPage: false });
  console.log('Saved public/mrp_lesson_1_source_revealed.png');

  console.log('2. Navigating to Crown, Church, or Parliament Lesson 4...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=monarchy_religion_power&lesson=4', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1500));

  const summaryInfoL4 = await page.evaluate(() => {
    const detailsList = document.querySelectorAll('.source-enquiry-reveal');
    const results = [];
    detailsList.forEach(d => {
      d.open = true;
      const badge = d.querySelector('span[style*="border-radius: 12px"]')?.textContent?.trim();
      const prompt = d.querySelector('.source-enquiry-prompt')?.textContent?.trim();
      results.push({ badge, prompt });
    });
    return results;
  });

  console.log('Crown Lesson 4 Source Enquiries:', summaryInfoL4);
  await page.screenshot({ path: 'public/mrp_lesson_4_sources.png', fullPage: false });
  console.log('Saved public/mrp_lesson_4_sources.png');

  console.log('3. Navigating to First British Empire Lesson 1 to re-verify...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=first_british_empire&lesson=1', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1500));

  const fbeInfo = await page.evaluate(() => {
    const details = document.querySelector('.source-enquiry-reveal');
    if (!details) return null;
    details.open = true;
    const badge = details.querySelector('span[style*="border-radius: 12px"]')?.textContent?.trim();
    const prompt = details.querySelector('.source-enquiry-prompt')?.textContent?.trim();
    return { badge, prompt };
  });
  console.log('FBE Lesson 1 Source Enquiry:', fbeInfo);
  await page.screenshot({ path: 'public/fbe_lesson_1_child_friendly_check.png', fullPage: false });
  console.log('Saved public/fbe_lesson_1_child_friendly_check.png');

  console.log('All verifications completed successfully!');
})();
