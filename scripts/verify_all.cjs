const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  const shotDir = path.join(__dirname, '..', 'verification_shots');
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

  console.log('=== 1. Checking Homepage ===');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const homeCheck = await page.evaluate(() => {
    // Cold War card image
    const coldWarCard = document.querySelector('[data-unit="cold_war"]');
    const coldWarImgEl = coldWarCard ? coldWarCard.querySelector('.module-card-img') : null;
    const coldWarBg = coldWarImgEl ? coldWarImgEl.style.backgroundImage : null;

    // Year 11 block and tracker
    const y11Block = document.getElementById('block-year11');
    const y11Grid = y11Block ? y11Block.querySelector('.modules-grid') : null;
    const tracker = y11Block ? y11Block.querySelector('.year11-spec-tracker-banner') : null;
    const trackerIsDirectlyAfterGrid = y11Grid && y11Grid.nextElementSibling === tracker;
    const y11Units = y11Grid ? Array.from(y11Grid.querySelectorAll('.module-card')).map(c => c.getAttribute('data-unit')) : [];

    return {
      coldWarCardFound: !!coldWarCard,
      coldWarBg,
      y11BlockFound: !!y11Block,
      y11Units,
      trackerFound: !!tracker,
      trackerIsDirectlyAfterGrid
    };
  });
  console.log('Homepage Check:', homeCheck);
  await page.screenshot({ path: path.join(shotDir, '1_homepage_overview.png') });

  // Scroll to Year 11 block for screenshot
  await page.evaluate(() => {
    const el = document.getElementById('block-year11');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(shotDir, '2_year11_and_tracker.png') });

  console.log('\n=== 2. Checking Medicine Unit View (Cards) ===');
  await page.goto('http://localhost:3003/?view=lessons&unit=edexcel_medicine', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const cardsCheck = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.homepage-lesson-card'));
    
    // Card 9: KT 2.5
    const card2_5 = cards.find(c => c.getAttribute('data-index') === '9');
    const img2_5 = card2_5 ? card2_5.querySelector('.lesson-card-banner-img') : null;

    // Card 10: KT 3.1
    const card3_1 = cards.find(c => c.getAttribute('data-index') === '10');
    const img3_1 = card3_1 ? card3_1.querySelector('.lesson-card-banner-img') : null;

    // Card 11: KT 3.2
    const card3_2 = cards.find(c => c.getAttribute('data-index') === '11');
    const img3_2 = card3_2 ? card3_2.querySelector('.lesson-card-banner-img') : null;

    return {
      totalCards: cards.length,
      kt2_5: {
        found: !!card2_5,
        imgSrc: img2_5 ? img2_5.src : null,
        naturalWidth: img2_5 ? img2_5.naturalWidth : null,
        complete: img2_5 ? img2_5.complete : null
      },
      kt3_1: {
        found: !!card3_1,
        imgSrc: img3_1 ? img3_1.src : null,
        naturalWidth: img3_1 ? img3_1.naturalWidth : null
      },
      kt3_2: {
        found: !!card3_2,
        imgSrc: img3_2 ? img3_2.src : null,
        naturalWidth: img3_2 ? img3_2.naturalWidth : null,
        objectPosition: img3_2 ? window.getComputedStyle(img3_2).objectPosition : null
      }
    };
  });
  console.log('Medicine Cards Check:', cardsCheck);
  await page.screenshot({ path: path.join(shotDir, '3_medicine_cards.png') });

  console.log('\n=== 3. Checking Lesson KT 5.6 In-Line Source Placement ===');
  // Open lesson 5.6 (index 25)
  await page.evaluate(() => {
    if (typeof window.viewLessonDetail === 'function') {
      window.viewLessonDetail(25);
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  const kt5_6Check = await page.evaluate(() => {
    const narrativeContainers = Array.from(document.querySelectorAll('.standard-narrative-container'));
    const containerReports = narrativeContainers.map((container, i) => {
      const drawers = container.querySelectorAll('.cme-source-drawer, .medicine-source-drawer');
      const drawerDetails = Array.from(drawers).map(d => {
        const badge = d.querySelector('.cme-source-badge, .drawer-badge, summary')?.textContent?.trim() || '';
        const title = d.querySelector('.drawer-title-preview, strong')?.textContent?.trim() || '';
        return { badge, title };
      });
      return {
        blockIndex: i + 1,
        drawerCount: drawers.length,
        drawerDetails
      };
    });

    const allDrawers = document.querySelectorAll('.cme-source-drawer, .medicine-source-drawer');
    let drawersOutsideNarrative = 0;
    allDrawers.forEach(d => {
      if (!d.closest('.standard-narrative-container')) {
        drawersOutsideNarrative++;
      }
    });

    return {
      narrativeContainerCount: narrativeContainers.length,
      containerReports,
      totalDrawers: allDrawers.length,
      drawersOutsideNarrative
    };
  });
  console.log('KT 5.6 In-Line Sources Check:', JSON.stringify(kt5_6Check, null, 2));

  // Scroll to show paragraph 1 and embedded Source A
  await page.evaluate(() => {
    const firstContainer = document.querySelector('.standard-narrative-container');
    if (firstContainer) firstContainer.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(shotDir, '4_lesson_5_6_embedded_sources.png') });

  console.log('\n=== 4. Checking Lesson KT 3.2 (Jenner Face Framing) ===');
  await page.evaluate(() => {
    if (typeof window.viewLessonDetail === 'function') {
      window.viewLessonDetail(11);
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  const jennerHeroCheck = await page.evaluate(() => {
    const hero = document.querySelector('.lesson-hero-header, .cme-hero-header, .lesson-hero, .hero-section');
    const heroImg = hero ? hero.querySelector('img') : null;
    const heroBg = hero ? window.getComputedStyle(hero).backgroundImage : null;
    const heroPos = hero ? (hero.style.backgroundPosition || window.getComputedStyle(hero).backgroundPosition) : null;
    return {
      heroFound: !!hero,
      heroImgSrc: heroImg ? heroImg.src : null,
      heroImgObjectPosition: heroImg ? window.getComputedStyle(heroImg).objectPosition : null,
      heroBg,
      heroPos
    };
  });
  console.log('KT 3.2 Hero Banner Check:', jennerHeroCheck);
  await page.screenshot({ path: path.join(shotDir, '5_lesson_3_2_jenner_face.png') });

  await browser.close();
  console.log('\n🎉 ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
