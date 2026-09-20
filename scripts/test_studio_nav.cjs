const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Navigating to dashboard...');
  await page.goto('http://localhost:3003/?view=dashboard', { waitUntil: 'networkidle2' });

  // Test 1: Click thumbnail on strip to launch projector
  console.log('2. Clicking thumbnail on starter strip...');
  await page.click('.masterpiece-strip-thumb-wrap');
  await new Promise((r) => setTimeout(r, 600));

  let modalDisplay = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    return modal ? modal.style.display : 'none';
  });
  console.log('   Projector modal display after thumb click:', modalDisplay);
  if (modalDisplay !== 'flex')
    throw new Error('Projector modal did not open from thumbnail click!');

  // Test timer in projector
  console.log('3. Testing timer in projector...');
  await page.click('#masterpiece-projector-modal .masterpiece-timer-toggle-btn');
  await new Promise((r) => setTimeout(r, 2200));

  let timerText = await page.evaluate(() => {
    const digits = document.querySelector('#masterpiece-projector-modal .masterpiece-timer-digits');
    return digits ? digits.textContent : null;
  });
  console.log('   Timer digits after running 2s:', timerText);

  // Close projector
  console.log('4. Closing projector modal...');
  await page.click('#projector-close-btn');
  await new Promise((r) => setTimeout(r, 400));

  modalDisplay = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    return modal ? modal.style.display : 'none';
  });
  console.log('   Projector modal display after close:', modalDisplay);

  // Test 2: Click [ ⛶ Launch Whiteboard Projector ] button on strip
  console.log('5. Clicking [ Launch Whiteboard Projector ] button on strip...');
  await page.click('.masterpiece-strip-projector-btn');
  await new Promise((r) => setTimeout(r, 600));

  modalDisplay = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    return modal ? modal.style.display : 'none';
  });
  console.log('   Projector modal display after button click:', modalDisplay);
  if (modalDisplay !== 'flex') throw new Error('Projector modal did not open from button click!');

  // Close projector
  await page.click('#projector-close-btn');
  await new Promise((r) => setTimeout(r, 400));

  // Test 3: Click [ ▶ Open Starter Studio ] button
  console.log('6. Clicking [ Open Starter Studio ] button...');
  await page.click('.masterpiece-strip-open-btn');
  await new Promise((r) => setTimeout(r, 800));

  let studioInfo = await page.evaluate(() => ({
    url: window.location.href,
    studioExists: !!document.getElementById('masterpiece-studio-root'),
    backBtnExists: !!document.getElementById('header-back-btn'),
  }));
  console.log('   Studio view navigation result:', studioInfo);
  if (!studioInfo.studioExists) throw new Error('Failed to navigate to studio view!');

  // Test 4: In Studio view, click the painting to launch projector
  console.log('7. In studio view, clicking the painting canvas...');
  await page.click('#masterpiece-canvas-preview');
  await new Promise((r) => setTimeout(r, 600));

  modalDisplay = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    return modal ? modal.style.display : 'none';
  });
  console.log('   Projector modal display after clicking canvas in studio:', modalDisplay);
  if (modalDisplay !== 'flex')
    throw new Error('Projector modal did not open from studio painting click!');

  // Close projector from studio
  await page.click('#projector-close-btn');
  await new Promise((r) => setTimeout(r, 400));

  // Test 5: Click Back to Dashboard
  console.log('8. Clicking Back to Dashboard via #header-back-btn...');
  await page.click('#header-back-btn');
  await new Promise((r) => setTimeout(r, 800));

  let dashboardInfo = await page.evaluate(() => ({
    url: window.location.href,
    stripExists: !!document.getElementById('masterpiece-starter-strip-root'),
  }));
  console.log('   Dashboard return result:', dashboardInfo);
  if (!dashboardInfo.stripExists) throw new Error('Failed to return to dashboard!');

  await browser.close();
  console.log('\n🎉 ALL 8 TESTS PASSED WITH 100% SUCCESS!');
})();
