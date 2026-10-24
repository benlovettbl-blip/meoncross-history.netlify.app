const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const testCases = [
    {
      name: 'medicine_l8_source_b',
      url: 'http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=8',
      drawerMatcher: 'SOURCE B',
    },
    {
      name: 'medicine_l8_source_a',
      url: 'http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=8',
      drawerMatcher: 'SOURCE A',
    },
    {
      name: 'ks2_ww2_l11',
      url: 'http://localhost:3003/index.html?view=lessons&unit=ks2_ww2&lesson=11#year-6',
      drawerMatcher: 'SOURCE A',
    },
    {
      name: 'great_war_part2_l1',
      url: 'http://localhost:3003/index.html?view=lessons&unit=great_war_part2&lesson=1',
      drawerMatcher: 'SOURCE A',
    },
  ];

  for (const tc of testCases) {
    console.log(`Testing ${tc.name}...`);
    await page.goto(tc.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    // Find the matching drawer
    const drawers = await page.$$(
      'details.cme-source-drawer, details.archival-drawer, #source-card-A',
    );
    let drawer = drawers[0];
    if (tc.drawerMatcher) {
      for (const d of drawers) {
        const text = await page.evaluate((el) => el.innerText, d);
        if (text.includes(tc.drawerMatcher)) {
          drawer = d;
          break;
        }
      }
    }

    if (drawer) {
      // Ensure drawer is open
      await page.evaluate((d) => {
        d.open = true;
      }, drawer);
      await new Promise((r) => setTimeout(r, 400));

      await page.evaluate(
        (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }),
        drawer,
      );
      await new Promise((r) => setTimeout(r, 500));

      const colImgPath = path.join(__dirname, '..', `dual_stage_${tc.name}_collapsed.png`);
      await drawer.screenshot({ path: colImgPath });
      console.log(`Saved collapsed screenshot to ${colImgPath}`);

      const btn = await drawer.$('.btn-think-discuss-toggle');
      if (btn) {
        await page.evaluate((b) => b.click(), btn);
        await new Promise((r) => setTimeout(r, 600));
        const expImgPath = path.join(__dirname, '..', `dual_stage_${tc.name}_expanded.png`);
        await drawer.screenshot({ path: expImgPath });
        console.log(`Saved expanded screenshot to ${expImgPath}`);
      } else {
        console.log(`No toggle button found in drawer for ${tc.name}`);
      }
    } else {
      console.log(`Could not find drawer for ${tc.name}`);
    }
  }

  // Mobile responsiveness test
  // Mobile responsiveness test
  console.log('Testing mobile responsive layout (375x812)...');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=great_war_part2&lesson=1', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 2000));

  // Hide mobile sidebar and sticky bottom bar to capture pure element rendering
  await page.evaluate(() => {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    const bottomNav = document.querySelector('.bottom-nav, .mobile-bottom-bar, footer.mobile-bar');
    if (bottomNav) bottomNav.style.display = 'none';
  });

  const mobDrawers = await page.$$('details.cme-source-drawer, details.archival-drawer');
  if (mobDrawers.length > 0) {
    const mobDrawer = mobDrawers[0];
    await page.evaluate((d) => {
      d.open = true;
    }, mobDrawer);
    await new Promise((r) => setTimeout(r, 500));

    const mobImgPath = path.join(__dirname, '..', 'test_mobile_great_war_collapsed.png');
    await mobDrawer.screenshot({ path: mobImgPath });
    console.log(`Saved mobile collapsed to ${mobImgPath}`);

    const mobBtn = await mobDrawer.$('.btn-think-discuss-toggle');
    if (mobBtn) {
      await page.evaluate((el) => {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        el.click();
      }, mobBtn);
      await new Promise((r) => setTimeout(r, 600));
      const mobExpPath = path.join(__dirname, '..', 'test_mobile_great_war_expanded.png');
      await mobDrawer.screenshot({ path: mobExpPath });
      console.log(`Saved mobile expanded to ${mobExpPath}`);
    }
  }

  await browser.close();
  console.log('Verification completed successfully!');
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
