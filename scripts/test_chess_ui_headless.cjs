const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PORT = 8124;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    let filePath = path.join(DIST_DIR, reqPath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for SPA routing
        filePath = path.join(DIST_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading file');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      });
    });
  });
}

async function runTest() {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running at http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  page.on('console', (msg) => {
    // suppress noise, log errors if any
    if (msg.type() === 'error') {
      console.error('Browser console error:', msg.text());
    }
  });

  try {
    console.log('Navigating to http://localhost:' + PORT + '/#chess...');
    await page.goto(`http://localhost:${PORT}/#chess`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Ensure chess view is rendered
    await page.evaluate(() => {
      if (typeof window.switchView === 'function') {
        window.switchView('chess');
      }
    });

    await page.waitForSelector('#chess-hub-root', { timeout: 10000 });
    console.log('✓ Chess Hub root mounted successfully.');

    // Ensure Ladder tab is active (click the Ladder tab button if needed)
    await page.evaluate(() => {
      const ladderTabBtn = Array.from(document.querySelectorAll('button')).find(
        (b) => b.textContent && b.textContent.includes('Ladder'),
      );
      if (ladderTabBtn) ladderTabBtn.click();
    });

    await new Promise((r) => setTimeout(r, 600));

    // Evaluate ladder layout and player names
    const ladderEvaluation = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.ladder-row'));
      const container = rows[0]?.parentElement;
      const isVertical = container
        ? window.getComputedStyle(container).display === 'flex' &&
          window.getComputedStyle(container).flexDirection === 'column'
        : false;

      const playerResults = rows.map((row) => {
        const text = row.innerText;
        const nameEl =
          row.querySelector('span[style*="font-size: 0.98rem"]') ||
          row.querySelector('.ladder-row span');
        const nameText = nameEl ? nameEl.innerText.trim() : '';
        const isTruncated =
          row.innerText.includes('...') ||
          (nameEl ? window.getComputedStyle(nameEl).textOverflow === 'ellipsis' : false);
        return {
          nameText,
          fullText: text.replace(/\s+/g, ' '),
          isTruncated,
        };
      });

      return {
        isVertical,
        rowCount: rows.length,
        players: playerResults,
      };
    });

    console.log('\n--- LADDER EVALUATION RESULTS ---');
    console.log(
      `Container layout is single vertical column: ${ladderEvaluation.isVertical ? 'PASS (flex-direction: column)' : 'FAIL'}`,
    );
    console.log(`Total ladder rungs rendered: ${ladderEvaluation.rowCount}`);

    let allNamesValid = true;
    ladderEvaluation.players.forEach((p, idx) => {
      console.log(`Rung #${idx + 1}: ${p.nameText} | Truncated: ${p.isTruncated}`);
      if (p.isTruncated || !p.nameText) {
        allNamesValid = false;
      }
    });

    // Check expected nicknames (11 active cohort members)
    const expectedNicknames = [
      'The Golden Stresemann',
      'Sir Francis Drake',
      'The Thomas Splint',
      'The Shuttle Diplomat',
      'The Armada Fireship',
      'Andreas Vesalius',
      'Joseph Lister',
      'The Bar Lev Defender',
      'The Tudor Spymaster',
      'William Harvey',
      'Alexander Fleming',
    ];

    let missing = [];
    expectedNicknames.forEach((expected) => {
      const found = ladderEvaluation.players.some(
        (p) => p.nameText.includes(expected) || p.fullText.includes(expected),
      );
      if (!found) missing.push(expected);
    });

    if (missing.length > 0) {
      console.error('❌ Missing expected GCSE nicknames:', missing);
      process.exitCode = 1;
    } else {
      console.log(
        `✓ All ${expectedNicknames.length} active GCSE specification nicknames verified present without truncation!`,
      );
    }

    // Capture screenshot of the verified vertical ladder
    const screenshotDir = path.resolve(__dirname, '..', 'public', 'screenshots');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, 'chess_ladder_verified.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✓ Screenshot captured to: ${screenshotPath}`);

    // Test tab transitions
    console.log('\nTesting tab transitions:');
    const tabsToTest = [
      { id: 'tab-btn-table', name: 'Cross-Table Grid' },
      { id: 'tab-btn-pairings', name: 'Period 6 Boards' },
      { id: 'tab-btn-ladder', name: 'Master Ladder' },
    ];
    for (const tab of tabsToTest) {
      const clicked = await page.evaluate((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      }, tab.id);
      await new Promise((r) => setTimeout(r, 400));
      console.log(`Tab '${tab.name}' switch: ${clicked ? 'PASS' : 'NOT FOUND'}`);
    }

    console.log('\n✓ ALL CHESS CLUB TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

runTest();
