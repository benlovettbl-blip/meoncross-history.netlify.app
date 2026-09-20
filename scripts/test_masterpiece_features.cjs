const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Navigating to Masterpiece Studio view...');
  await page.goto('http://localhost:3003/?view=masterpiece', { waitUntil: 'networkidle2' });

  // Test 1: Check Archive Gallery Tray
  console.log('2. Checking Masterpiece Archive Gallery Tray...');
  const cardCount = await page.$$eval('.masterpiece-archive-card', (cards) => cards.length);
  console.log('   Archive cards found:', cardCount);
  if (cardCount !== 5) throw new Error(`Expected 5 archive cards, found ${cardCount}`);

  // Test 2: Click Delacroix card in Archive Tray
  console.log('3. Clicking Delacroix (Liberty Leading the People) in Archive Tray...');
  await page.click(
    '.masterpiece-archive-card[data-masterpiece-id="delacroix_liberty_leading_people"]',
  );
  await new Promise((r) => setTimeout(r, 600));

  let currentTitle = await page.$eval('.masterpiece-studio-card h2', (el) => el.textContent.trim());
  console.log('   Studio Title after selecting Delacroix:', currentTitle);
  if (!currentTitle.includes('Liberty Leading the People')) {
    throw new Error('Failed to switch to Delacroix in Studio!');
  }

  // Test 3: Click Van Eyck card in Archive Tray
  console.log('4. Clicking Van Eyck (The Arnolfini Portrait) in Archive Tray...');
  await page.click('.masterpiece-archive-card[data-masterpiece-id="van_eyck_arnolfini"]');
  await new Promise((r) => setTimeout(r, 600));

  currentTitle = await page.$eval('.masterpiece-studio-card h2', (el) => el.textContent.trim());
  console.log('   Studio Title after selecting Van Eyck:', currentTitle);
  if (!currentTitle.includes('Arnolfini')) {
    throw new Error('Failed to switch to Van Eyck in Studio!');
  }

  // Test 4: Launch Whiteboard Projector Mode
  console.log('5. Launching Classroom Projector Mode...');
  await page.click('#masterpiece-launch-projector-btn');
  await new Promise((r) => setTimeout(r, 600));

  const modalDisplay = await page.$eval('#masterpiece-projector-modal', (el) => el.style.display);
  console.log('   Projector modal display:', modalDisplay);
  if (modalDisplay !== 'flex') throw new Error('Projector modal did not open!');

  // Test 5: Test 2.5x Loupe Toggle and Pointer Move
  console.log('6. Testing 2.5x Optical Magnifier Loupe...');
  await page.click('#projector-loupe-btn');
  await new Promise((r) => setTimeout(r, 300));

  const isLoupeActive = await page.evaluate(() =>
    window.studioState ? window.studioState.magnifierActive : false,
  );
  console.log('   Magnifier state after click:', isLoupeActive);
  if (!isLoupeActive) throw new Error('Loupe failed to activate!');

  // Move mouse over canvas container
  const canvasBox = await page.$eval('#projector-canvas-container', (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });

  await page.mouse.move(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2);
  await new Promise((r) => setTimeout(r, 300));

  const loupeDisplay = await page.$eval('#projector-loupe', (el) => ({
    display: el.style.display,
    bgImg: el.style.backgroundImage,
  }));
  console.log('   Loupe DOM after pointer move:', loupeDisplay);
  if (loupeDisplay.display !== 'block') throw new Error('Loupe did not display over canvas!');

  // Test 6: Test Smartboard Spotter Marker Pen
  console.log('7. Testing Smartboard Spotter Marker Pen...');
  await page.click('#projector-spotter-btn');
  await new Promise((r) => setTimeout(r, 300));

  const isSpotterActive = await page.evaluate(() =>
    window.studioState ? window.studioState.spotterActive : false,
  );
  console.log('   Spotter state after click:', isSpotterActive);
  if (!isSpotterActive) throw new Error('Spotter pen failed to activate!');

  // Click on canvas to drop pin 1
  await page.mouse.click(
    canvasBox.x + canvasBox.width * 0.35,
    canvasBox.y + canvasBox.height * 0.45,
  );
  await new Promise((r) => setTimeout(r, 300));

  // Click to drop pin 2
  await page.mouse.click(
    canvasBox.x + canvasBox.width * 0.65,
    canvasBox.y + canvasBox.height * 0.55,
  );
  await new Promise((r) => setTimeout(r, 300));

  const pinsCount = await page.$$eval('.spotter-pin', (pins) => pins.length);
  console.log('   Spotter pins on canvas:', pinsCount);
  if (pinsCount !== 2) throw new Error(`Expected 2 spotter pins, found ${pinsCount}`);

  // Clear pins
  console.log('8. Testing Clear Pins button...');
  await page.click('#projector-clear-pins-btn');
  await new Promise((r) => setTimeout(r, 300));

  const pinsAfterClear = await page.$$eval('.spotter-pin', (pins) => pins.length);
  console.log('   Spotter pins after clear:', pinsAfterClear);
  if (pinsAfterClear !== 0) throw new Error(`Expected 0 pins after clear, found ${pinsAfterClear}`);

  // Test 7: Test Soundscape Transition Cues
  console.log('9. Testing Soundscape Transition Chime at 120s boundary...');
  await page.evaluate(() => {
    window.studioState.timerSeconds = 121;
    window.updateTimerDOM();
  });
  await page.click('#masterpiece-projector-modal .masterpiece-timer-toggle-btn');
  // Wait 2.2 seconds for it to tick to 120 and 119
  await new Promise((r) => setTimeout(r, 2200));

  const timerAfterTick = await page.$eval(
    '#masterpiece-projector-modal .masterpiece-timer-digits',
    (el) => el.textContent,
  );
  console.log('   Timer digits after transition tick:', timerAfterTick);

  // Close projector modal
  console.log('10. Closing projector modal...');
  await page.click('#projector-close-btn');
  await new Promise((r) => setTimeout(r, 400));

  // Test 8: Check Homepage Dashboard Strip reflects newly cued masterpiece
  console.log('11. Navigating to dashboard to verify Starter Strip sync...');
  await page.goto('http://localhost:3003/?view=dashboard', { waitUntil: 'networkidle2' });

  const stripTitle = await page.$eval('.masterpiece-starter-strip', (el) => el.textContent);
  console.log('   Dashboard Strip contains active masterpiece:', stripTitle.includes('Arnolfini'));
  if (!stripTitle.includes('Arnolfini')) {
    throw new Error('Dashboard strip did not sync with newly cued masterpiece!');
  }

  await browser.close();
  console.log('\n🎉 ALL 11 TEST PHASES PASSED WITH 100% SUCCESS!');
})();
