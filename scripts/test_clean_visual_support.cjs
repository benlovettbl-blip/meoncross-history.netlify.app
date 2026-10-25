const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const dataJsPath = path.join(__dirname, '..', 'units', 'cold_war', 'data.js');
const pubDataJsPath = path.join(__dirname, '..', 'public', 'units', 'cold_war', 'data.js');
const dataJsonPath = path.join(__dirname, '..', 'data', 'cold_war.json');
const pubJsonPath = path.join(__dirname, '..', 'public', 'data', 'cold_war.json');

const mod = require(dataJsPath);
const coldWarData = mod.cold_war_data || mod.default || mod;

const l1 = coldWarData.lessons[0];
delete l1.narrative_blocks[2].image_context;
delete l1.narrative_blocks[3].image_context;
delete l1.narrative_blocks[4].image_context;

function generateDataJsContent(dataObj) {
  const jsonStr = JSON.stringify(dataObj, null, 2);
  return `const cold_war_data = ${jsonStr};

export default cold_war_data;
export { cold_war_data };
if (typeof window !== "undefined") {
  window.cold_war_data = cold_war_data;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = cold_war_data;
}
`;
}

fs.writeFileSync(dataJsPath, generateDataJsContent(coldWarData), 'utf8');
fs.writeFileSync(pubDataJsPath, generateDataJsContent(coldWarData), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify({ id: 'cold_war', data: coldWarData }, null, 2), 'utf8');
fs.writeFileSync(pubJsonPath, JSON.stringify(coldWarData, null, 2), 'utf8');
console.log('✅ Removed image_context from Lesson 1 narrative blocks.');

// Rebuild database
const { execSync } = require('child_process');
execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

// Capture Puppeteer screenshot
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 950 });

    console.log('Navigating to Cold War Lesson 1...');
    await page.goto('http://localhost:3003/?unit=cold_war&view=lessons&lesson=1', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await new Promise(r => setTimeout(r, 2000));

    const block3Img = await page.$('img[src*="molotov_ribbentrop_pact"]');
    if (block3Img) {
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), block3Img);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_clean_visual_support.png' });
      console.log('Saved cold_war_clean_visual_support.png');
    }
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
  }
})();
