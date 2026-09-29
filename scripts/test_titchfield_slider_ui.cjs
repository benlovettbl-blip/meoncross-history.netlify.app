const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Navigate to Year 7 Water & Sanitation, Lesson 2 (1-indexed lesson=2)
  console.log('Loading app on localhost:3003...');
  await page.goto('http://localhost:3003/?view=lessons&unit=water_and_sanitation&lesson=2', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  await page.waitForSelector('.photo-slider-container', { timeout: 15000 });

  // Find the slider container
  const sliderFound = await page.evaluate(() => {
    const slider = document.querySelector('.photo-slider-container');
    if (slider) {
      slider.scrollIntoView({ behavior: 'instant', block: 'center' });
      return true;
    }
    return false;
  });

  console.log('Photo slider container found in DOM:', sliderFound);

  await new Promise((r) => setTimeout(r, 1000));

  // 1. Screenshot at 50% split (Modern Street Map)
  await page.screenshot({ path: 'scratch/titchfield_slider_initial.png' });
  console.log('Saved scratch/titchfield_slider_initial.png');

  // 2. Drag range slider to 30%
  await page.evaluate(() => {
    const range = document.querySelector('.photo-range-slider');
    if (range) {
      range.value = 30;
      range.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/titchfield_slider_dragged.png' });
  console.log('Saved scratch/titchfield_slider_dragged.png');

  // 3. Switch to Satellite Aerial View and drag to 70%
  await page.evaluate(() => {
    const satBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.innerText.includes('Satellite'),
    );
    if (satBtn) satBtn.click();
    const range = document.querySelector('.photo-range-slider');
    if (range) {
      range.value = 70;
      range.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/titchfield_slider_satellite.png' });
  console.log('Saved scratch/titchfield_slider_satellite.png');

  await browser.close();
  console.log('UI verification complete!');
})();
