const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Simple static server for public dir
function createStaticServer(port) {
  const publicDir = path.resolve(__dirname, '..', 'public');
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/source_visual_verification_gallery.html';
    const filePath = path.join(publicDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function captureUnits() {
  const port = 49215;
  const server = await createStaticServer(port);
  console.log(`Static server listening on http://localhost:${port}`);

  const artifactDir = path.join('C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\efc3adb5-b930-4aa0-8eff-b383b1c606ab', '.tempmediaStorage');
  if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 1 });

    const unitsToCapture = [
      { id: 'medieval_england', name: 'medieval_england_studio_contact_sheet' },
      { id: 'second_british_empire', name: 'second_british_empire_studio_contact_sheet' }
    ];

    for (const u of unitsToCapture) {
      console.log(`Navigating to gallery for ${u.id}...`);
      await page.goto(`http://localhost:${port}/source_visual_verification_gallery.html`, { waitUntil: 'networkidle0' });
      
      await page.waitForSelector('#filter-unit');
      await page.select('#filter-unit', u.id);
      await page.evaluate(() => {
        if (typeof renderGallery === 'function') renderGallery();
      });

      await new Promise(r => setTimeout(r, 1200));

      const outPath = path.join(artifactDir, `${u.name}_${Date.now()}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`SAVED_CONTACT_SHEET:${u.id}:` + outPath);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

captureUnits().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
