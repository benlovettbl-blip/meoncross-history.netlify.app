const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', defaultViewport: null });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('localhost:3003'));
  const reveals = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.source-enquiry-reveal')).map(r => ({
      tag: r.tagName,
      parentTag: r.parentElement.tagName,
      parentClass: r.parentElement.className,
      badge: r.querySelector('span[style*="border-radius: 12px"]')?.textContent?.trim(),
      prompt: r.querySelector('.source-enquiry-prompt')?.textContent?.trim(),
      modelAnswer: r.querySelector('.source-enquiry-answer-body')?.textContent?.trim().substring(0, 120)
    }));
  });
  console.log('Reveals in SBE L1:', JSON.stringify(reveals, null, 2));
  browser.disconnect();
})();
