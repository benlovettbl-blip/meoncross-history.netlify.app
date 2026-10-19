const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testExpansion() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const res = await page.evaluate(() => {
    const p2 = document.querySelector('#page-2');
    const prose2 = p2.querySelector('.prose-two-column');
    const footer2 = p2.querySelector('.page-running-footer');

    const b1 = p2.querySelectorAll('.narrative-block')[0];
    const b2 = p2.querySelectorAll('.narrative-block')[1];

    // Add 1 test paragraph to b1 and 1 to b2
    const pSample1 =
      '<p class="prose-p"><span class="para-pill">[1.1]</span> The constitutional precedent established by the Witan reflected a long Germanic tradition where monarchical power was tempered by aristocratic consent. England was not yet a centralised autocracy; its stability relied upon fragile alliances between regional magnates and the crown. By choosing Harold Godwinson, the council prioritised immediate domestic military competence over dynastic bloodlines, knowing full well that foreign claimants would soon challenge the decision on the battlefield.</p>';
    const pSample2 =
      '<p class="prose-p"><span class="para-pill">[1.2]</span> William of Normandy was a relentless strategist who had spent decades consolidating his duchy through brutal warfare and diplomatic cunning. The receipt of the Papal Banner was a masterstroke of statecraft: it convinced Norman knights and mercenary soldiers from Brittany and Flanders that fighting for William was not merely a conquest for land, but a holy undertaking that would absolve their sins. In contrast, Harold was condemned as a perjurer whose broken vow had invited divine vengeance upon the realm.</p>';

    b1.insertAdjacentHTML('beforeend', pSample1);
    b2.insertAdjacentHTML('beforeend', pSample2);

    const leafElements = Array.from(p2.querySelectorAll('.prose-p, .block-title, .block-header'));
    const bottoms = leafElements.map((el) => el.getBoundingClientRect().bottom);
    const maxBottom = Math.max(...bottoms);
    const fTop = footer2.getBoundingClientRect().top;
    const gap = fTop - maxBottom;
    const overflow = p2.scrollHeight > p2.clientHeight + 4 ? p2.scrollHeight - p2.clientHeight : 0;

    return {
      gap: Math.round(gap),
      overflow: Math.round(overflow),
      totalWords: p2.innerText.split(/\s+/).length,
    };
  });

  console.log('Page 2 with test expansion:', res);

  const res3 = await page.evaluate(() => {
    const p3 = document.querySelector('#page-3');
    const footer3 = p3.querySelector('.page-running-footer');

    const b3 = p3.querySelectorAll('.narrative-block')[0];
    const b4 = p3.querySelectorAll('.narrative-block')[1];

    const pSample3 =
      '<p class="prose-p"><span class="para-pill">[1.3]</span> The forced march to Stamford Bridge demonstrated Harold’s exceptional capability as a field general, but it extracted a terrible physical toll on his veterans. Although the victory was total and shattered Scandinavian ambitions in Britain forever, hundreds of Harold’s most seasoned housecarls were killed or wounded. When the urgent news reached York that Norman sails had been sighted off the southern coast, Harold was forced to march his battered, bloodied army immediately back southward without adequate time to recruit fresh levies or allow his men proper recuperation.</p>';
    const pSample4 =
      '<p class="prose-p"><span class="para-pill">[1.4]</span> The defensive position chosen by Harold on Senlac Ridge was tactically formidable. By locking their heavy lime-wood shields together rim-to-rim, the Saxons formed an unbroken wall of oak and iron that blunted successive waves of Norman missile fire and cavalry charges. For hours the air was filled with the deafening roar of battle cries, the clash of swords, and the whistle of arrows, yet as long as the Saxon line held its formation, William’s knights could find no purchase on the bloody slopes.</p>';

    b3.insertAdjacentHTML('beforeend', pSample3);
    b4.insertAdjacentHTML('beforeend', pSample4);

    const leafElements = Array.from(p3.querySelectorAll('.prose-p, .block-title, .block-header'));
    const bottoms = leafElements.map((el) => el.getBoundingClientRect().bottom);
    const maxBottom = Math.max(...bottoms);
    const fTop = footer3.getBoundingClientRect().top;
    const gap = fTop - maxBottom;
    const overflow = p3.scrollHeight > p3.clientHeight + 4 ? p3.scrollHeight - p3.clientHeight : 0;

    return {
      gap: Math.round(gap),
      overflow: Math.round(overflow),
      totalWords: p3.innerText.split(/\s+/).length,
    };
  });

  console.log('Page 3 with test expansion:', res3);
  await browser.close();
}

testExpansion().catch(console.error);
