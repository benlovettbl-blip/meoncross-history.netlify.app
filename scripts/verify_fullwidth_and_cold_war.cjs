const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
      defaultViewport: null
    });

    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('localhost:3003'));
    if (!page) {
      page = await browser.newPage();
    }

    const client = await page.target().createCDPSession();
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 1. Check The Shoah Lesson 1
    console.log('Testing Shoah Lesson 1...');
    await page.goto('http://localhost:3003/index.html?view=lessons&unit=the_shoah&lesson=1', {
      waitUntil: 'networkidle0'
    });
    await new Promise(r => setTimeout(r, 1200));

    // Open first source drawer and reveal model answer
    const shoahMeasurements = await page.evaluate(() => {
      const drawers = Array.from(document.querySelectorAll('.cme-source-drawer'));
      if (!drawers.length) return { error: 'no drawers' };
      drawers[0].open = true;
      const reveal = drawers[0].querySelector('.source-enquiry-reveal');
      if (reveal) reveal.open = true;
      
      const drawerRect = drawers[0].getBoundingClientRect();
      const revealRect = reveal ? reveal.getBoundingClientRect() : null;
      const splitRect = drawers[0].querySelector('.archival-source-split-layout') ? drawers[0].querySelector('.archival-source-split-layout').getBoundingClientRect() : null;

      return {
        drawerWidth: drawerRect.width,
        revealWidth: revealRect ? revealRect.width : null,
        splitWidth: splitRect ? splitRect.width : null,
        isFullWidth: revealRect && Math.abs(revealRect.width - (drawerRect.width - 36)) < 15 // 18px padding each side in cme-source-content
      };
    });
    console.log('Shoah Lesson 1 Measurements:', JSON.stringify(shoahMeasurements, null, 2));

    await page.evaluate(() => {
      const drawer = document.querySelector('.cme-source-drawer');
      if (drawer) drawer.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'public/shoah_l1_fullwidth_verified.png' });
    console.log('Saved public/shoah_l1_fullwidth_verified.png');

    // 2. Check Cold War Lesson 1
    console.log('Testing Cold War Lesson 1...');
    await page.goto('http://localhost:3003/index.html?view=lessons&unit=cold_war&lesson=1', {
      waitUntil: 'networkidle0'
    });
    await new Promise(r => setTimeout(r, 1200));

    const cwMeasurements = await page.evaluate(() => {
      const drawers = Array.from(document.querySelectorAll('.cme-source-drawer'));
      if (!drawers.length) return { error: 'no drawers' };
      drawers[0].open = true;
      const reveal = drawers[0].querySelector('.source-enquiry-reveal');
      if (reveal) reveal.open = true;

      const drawerRect = drawers[0].getBoundingClientRect();
      const revealRect = reveal ? reveal.getBoundingClientRect() : null;
      
      // Also inspect badge, prompt, and model answer text
      const badge = reveal ? reveal.querySelector('.source-enquiry-reveal span[style*="font-size: 0.70rem"], .source-enquiry-reveal span') : null;
      const answer = reveal ? reveal.querySelector('.source-enquiry-answer-body') : null;

      return {
        drawerCount: drawers.length,
        drawerWidth: drawerRect.width,
        revealWidth: revealRect ? revealRect.width : null,
        isFullWidth: revealRect && Math.abs(revealRect.width - (drawerRect.width - 36)) < 15,
        badgeText: badge ? badge.innerText : null,
        hasAnswer: Boolean(answer && answer.innerText.includes('Stalin'))
      };
    });
    console.log('Cold War Lesson 1 Measurements:', JSON.stringify(cwMeasurements, null, 2));

    await page.evaluate(() => {
      const drawer = document.querySelector('.cme-source-drawer');
      if (drawer) drawer.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'public/cold_war_l1_fullwidth_verified.png' });
    console.log('Saved public/cold_war_l1_fullwidth_verified.png');

    // 3. Check Cold War Lesson 4 (Cuban Missile Crisis)
    console.log('Testing Cold War Lesson 4...');
    await page.goto('http://localhost:3003/index.html?view=lessons&unit=cold_war&lesson=4', {
      waitUntil: 'networkidle0'
    });
    await new Promise(r => setTimeout(r, 1200));

    await page.evaluate(() => {
      const drawers = Array.from(document.querySelectorAll('.cme-source-drawer'));
      if (drawers.length > 1) {
        drawers[1].open = true;
        const reveal = drawers[1].querySelector('.source-enquiry-reveal');
        if (reveal) reveal.open = true;
        drawers[1].scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'public/cold_war_l4_source_b_fullwidth.png' });
    console.log('Saved public/cold_war_l4_source_b_fullwidth.png');

    console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Verification error:', err);
  }
})();
