const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1100, deviceScaleFactor: 2 });

  // 1. Lesson 1: Source A (Demographics Map)
  console.log('Testing Lesson 1...');
  await page.goto('http://localhost:3003/?unit=the_shoah&lesson=lesson_1', {
    waitUntil: 'networkidle2',
  });
  await page.evaluate(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    const d = detailsList.find(
      (el) =>
        el.textContent.includes('Source A') || el.textContent.includes('Population Distribution'),
    );
    if (d) d.open = true;
  });
  await new Promise((r) => setTimeout(r, 400));
  const drawer1 = await page.evaluateHandle(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    return detailsList.find(
      (el) =>
        el.textContent.includes('Source A') || el.textContent.includes('Population Distribution'),
    );
  });
  if (drawer1 && drawer1.asElement()) {
    await drawer1
      .asElement()
      .screenshot({
        path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/ui_shoah_lesson1_map_open.png',
      });
    console.log('✅ Captured Lesson 1 Demographics Map Open Drawer');
  }

  // 2. Lesson 3: Source C (Warsaw Ghetto plan)
  console.log('Testing Lesson 3...');
  await page.goto('http://localhost:3003/?unit=the_shoah&lesson=lesson_3', {
    waitUntil: 'networkidle2',
  });
  await page.evaluate(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    const d = detailsList.find(
      (el) =>
        el.textContent.includes('Source C') || el.textContent.includes('Warsaw Ghetto Enclosure'),
    );
    if (d) d.open = true;
  });
  await new Promise((r) => setTimeout(r, 400));
  const drawer3 = await page.evaluateHandle(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    return detailsList.find(
      (el) =>
        el.textContent.includes('Source C') || el.textContent.includes('Warsaw Ghetto Enclosure'),
    );
  });
  if (drawer3 && drawer3.asElement()) {
    await drawer3
      .asElement()
      .screenshot({
        path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/ui_shoah_lesson3_map_open.png',
      });
    console.log('✅ Captured Lesson 3 Warsaw Ghetto Map Open Drawer');
  }

  // 3. Lesson 4: Source B (Stahlecker Report execution map)
  console.log('Testing Lesson 4...');
  await page.goto('http://localhost:3003/?unit=the_shoah&lesson=lesson_4', {
    waitUntil: 'networkidle2',
  });
  await page.evaluate(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    const d = detailsList.find(
      (el) => el.textContent.includes('Source B') || el.textContent.includes('Stahlecker'),
    );
    if (d) d.open = true;
  });
  await new Promise((r) => setTimeout(r, 400));
  const drawer4 = await page.evaluateHandle(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    return detailsList.find(
      (el) => el.textContent.includes('Source B') || el.textContent.includes('Stahlecker'),
    );
  });
  if (drawer4 && drawer4.asElement()) {
    await drawer4
      .asElement()
      .screenshot({
        path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/ui_shoah_lesson4_map_open.png',
      });
    console.log('✅ Captured Lesson 4 Stahlecker Map Open Drawer');
  }

  // 4. Lesson 5: Source C (Extermination camps and rail network map)
  console.log('Testing Lesson 5...');
  await page.goto('http://localhost:3003/?unit=the_shoah&lesson=lesson_5', {
    waitUntil: 'networkidle2',
  });
  await page.evaluate(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    const d = detailsList.find(
      (el) => el.textContent.includes('Source C') || el.textContent.includes('Extermination Camps'),
    );
    if (d) d.open = true;
  });
  await new Promise((r) => setTimeout(r, 400));
  const drawer5 = await page.evaluateHandle(() => {
    const detailsList = Array.from(document.querySelectorAll('details.cme-source-drawer'));
    return detailsList.find(
      (el) => el.textContent.includes('Source C') || el.textContent.includes('Extermination Camps'),
    );
  });
  if (drawer5 && drawer5.asElement()) {
    await drawer5
      .asElement()
      .screenshot({
        path: 'C:/Users/fives/.gemini/antigravity-ide/brain/865bbb9c-62ad-4f16-b492-279f24ff1e65/ui_shoah_lesson5_map_open.png',
      });
    console.log('✅ Captured Lesson 5 Extermination Camps Map Open Drawer');
  }

  await browser.close();
})();
