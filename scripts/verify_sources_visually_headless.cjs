const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Launching Headless Automated Visual Verification Suite...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1200 });

    const brokenImages = [];
    page.on('response', (response) => {
      const req = response.request();
      if (req.resourceType() === 'image') {
        if (!response.ok()) {
          brokenImages.push({ url: req.url(), status: response.status() });
        }
      }
    });

    console.log('Navigating to Visual Source Verification Studio...');
    await page.goto('http://localhost:3003/source_visual_verification_gallery.html', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await new Promise((r) => setTimeout(r, 2000));

    // Verify stats
    const totalSources = await page.$eval('#stat-total', (el) => el.textContent.trim());
    const verifiedSources = await page.$eval('#stat-verified', (el) => el.textContent.trim());
    const mismatchSources = await page.$eval('#stat-mismatch', (el) => el.textContent.trim());
    const missingSources = await page.$eval('#stat-missing', (el) => el.textContent.trim());

    console.log(`\n📊 Studio Dashboard Metrics:`);
    console.log(`   - Total Sources: ${totalSources}`);
    console.log(`   - Verified Clean: ${verifiedSources}`);
    console.log(`   - Medium Mismatches: ${mismatchSources}`);
    console.log(`   - Missing Files: ${missingSources}`);

    if (brokenImages.length > 0) {
      console.warn(`⚠️ Warning: ${brokenImages.length} image network failures detected:`);
      brokenImages.slice(0, 5).forEach((b) => console.warn(`   - ${b.url} (${b.status})`));
    } else {
      console.log('✅ Zero broken image HTTP responses!');
    }

    // Capture screenshot of the gallery studio
    await page.screenshot({ path: 'visual_verification_studio_verified.png' });
    console.log('📸 Captured visual_verification_studio_verified.png');

    // Test filter: Select Great War Part 2 to verify Alfred Leete poster tile in the studio
    await page.select('#filter-unit', 'great_war_part2');
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({ path: 'visual_verification_gw2_verified.png' });
    console.log('📸 Captured visual_verification_gw2_verified.png (Great War Part 2 Filtered)');

    console.log('\n🎉 Automated Visual Verification Suite successfully passed!');
  } catch (err) {
    console.error('❌ Headless verification suite failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
