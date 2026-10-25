const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 950 });

    // 1. Lesson 2: Yalta to Potsdam
    console.log('Navigating to Cold War Lesson 2...');
    await page.goto('http://localhost:3003/?unit=cold_war&view=lessons&lesson=2', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to Block 3: Potsdam photo
    const potsdamImg = await page.$('img[src*="potsdam_conference_1945"]');
    if (potsdamImg) {
      console.log('Found Lesson 2 Potsdam photo!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), potsdamImg);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l2_potsdam_embedded.png' });
      console.log('Saved cold_war_l2_potsdam_embedded.png');
    }

    // Scroll to Block 5: Berlin ruins
    const ruinsImg = await page.$('img[src*="berlin_ruins_brandenburg_gate"]');
    if (ruinsImg) {
      console.log('Found Lesson 2 Berlin ruins photo!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), ruinsImg);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l2_ruins_embedded.png' });
      console.log('Saved cold_war_l2_ruins_embedded.png');
    }

    // 2. Lesson 4: Cuban Missile Crisis
    console.log('Navigating to Cold War Lesson 4...');
    await page.goto('http://localhost:3003/?unit=cold_war&view=lessons&lesson=4', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to Block 2: ExComm
    const excommImg = await page.$('img[src*="jfk_excomm_cabinet_room"]');
    if (excommImg) {
      console.log('Found Lesson 4 ExComm photo!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), excommImg);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l4_excomm_embedded.png' });
      console.log('Saved cold_war_l4_excomm_embedded.png');
    }

    // 3. Lesson 6: Berlin Wall & Collapse
    console.log('Navigating to Cold War Lesson 6...');
    await page.goto('http://localhost:3003/?unit=cold_war&view=lessons&lesson=6', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to Block 1: Conrad Schumann leap
    const schumannImg = await page.$('img[src*="conrad_schumann_berlin_wall_leap"]');
    if (schumannImg) {
      console.log('Found Lesson 6 Conrad Schumann photo!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), schumannImg);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l6_schumann_embedded.png' });
      console.log('Saved cold_war_l6_schumann_embedded.png');
    }

    // Scroll to Block 3: Reagan-Gorbachev Geneva
    const genevaImg = await page.$('img[src*="reagan_gorbachev_geneva_summit"]');
    if (genevaImg) {
      console.log('Found Lesson 6 Geneva summit photo!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), genevaImg);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l6_geneva_embedded.png' });
      console.log('Saved cold_war_l6_geneva_embedded.png');
    }

    console.log('Visual audit completed successfully!');
  } finally {
    await browser.close();
  }
})();
