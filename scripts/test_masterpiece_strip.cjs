const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.error('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:3003/?view=dashboard ...');
  await page.goto('http://localhost:3003/?view=dashboard', { waitUntil: 'networkidle2' });

  // Check strip existence
  const strip = await page.$('.masterpiece-starter-strip');
  console.log('Classroom Starter Strip found:', !!strip);

  // Check window helpers
  const windowState = await page.evaluate(() => {
    return {
      hasOpenProjector: typeof window.openMasterpieceProjector === 'function',
      hasCloseProjector: typeof window.closeMasterpieceProjector === 'function',
      currentId: window.state ? window.state.currentView : null,
    };
  });
  console.log('Window state:', windowState);

  // Take screenshot of dashboard
  const scratchDir = path.join(__dirname, '..', 'scratch');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });
  await page.screenshot({ path: path.join(scratchDir, 'dashboard_strip.png') });
  console.log('Saved dashboard_strip.png');

  // Click Launch Whiteboard Projector button
  console.log('Clicking .masterpiece-strip-projector-btn ...');
  await page.click('.masterpiece-strip-projector-btn');
  await new Promise((r) => setTimeout(r, 600));

  // Check modal
  const modalInfo = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    if (!modal) return { exists: false };
    const style = window.getComputedStyle(modal);
    return {
      exists: true,
      display: style.display,
      visibility: style.visibility,
      zIndex: style.zIndex,
      innerHTMLSnippet: modal.innerHTML.substring(0, 150),
    };
  });
  console.log('Projector Modal Info after click:', modalInfo);

  // Save screenshot of projector modal
  await page.screenshot({ path: path.join(scratchDir, 'projector_overlay.png') });
  console.log('Saved projector_overlay.png');

  // Test timer toggle
  console.log('Testing timer toggle ...');
  const timerStart = await page.evaluate(() => {
    const btn = document.querySelector(
      '#masterpiece-projector-modal .masterpiece-timer-toggle-btn',
    );
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Timer start clicked:', timerStart);
  await new Promise((r) => setTimeout(r, 2200));

  const timerText = await page.evaluate(() => {
    const digits = document.querySelector('#masterpiece-projector-modal .masterpiece-timer-digits');
    return digits ? digits.textContent : null;
  });
  console.log('Timer digits after 2s:', timerText);

  // Test painting click (Theater focus)
  console.log('Testing painting click inside projector (Theater focus) ...');
  const theaterStateBefore = await page.evaluate(() => {
    const rightCol = document.getElementById('projector-right-column');
    return rightCol ? rightCol.style.display : null;
  });
  await page.click('#projector-canvas-container');
  await new Promise((r) => setTimeout(r, 400));
  const theaterStateAfter = await page.evaluate(() => {
    const rightCol = document.getElementById('projector-right-column');
    return rightCol ? rightCol.style.display : null;
  });
  console.log('Theater Focus display rightCol:', theaterStateBefore, '->', theaterStateAfter);
  await page.screenshot({ path: path.join(scratchDir, 'theater_focus.png') });

  // Toggle back
  await page.click('#projector-canvas-container');
  await new Promise((r) => setTimeout(r, 300));

  // Click exit button
  console.log('Clicking exit button ...');
  await page.click('#projector-close-btn');
  await new Promise((r) => setTimeout(r, 400));

  const modalClosed = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    return modal ? modal.style.display : 'none';
  });
  console.log('Modal display after exit:', modalClosed);

  // Test thumbnail click on strip
  console.log('Testing thumbnail click on strip ...');
  await page.click('.masterpiece-strip-thumb-wrap');
  await new Promise((r) => setTimeout(r, 400));
  const modalOpenAgain = await page.evaluate(() => {
    const modal = document.getElementById('masterpiece-projector-modal');
    return modal ? modal.style.display : 'none';
  });
  console.log('Modal display after thumb click:', modalOpenAgain);
  await page.click('#projector-close-btn');
  await new Promise((r) => setTimeout(r, 300));

  // Test Open Starter Studio button
  console.log('Testing Open Starter Studio button ...');
  await page.click('.masterpiece-strip-open-btn');
  await new Promise((r) => setTimeout(r, 600));

  const currentView = await page.evaluate(() => {
    const studio = document.getElementById('masterpiece-studio-root');
    return {
      hasStudio: !!studio,
      url: window.location.search,
    };
  });
  console.log('Studio view info:', currentView);
  await page.screenshot({ path: path.join(scratchDir, 'studio_view.png') });

  await browser.close();
  console.log('All tests finished successfully!');
})();
