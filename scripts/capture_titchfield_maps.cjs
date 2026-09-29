const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'titchfield');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  // Set viewport to capture crisp 1024x1024 square images
  await page.setViewport({ width: 1024, height: 1024 });

  console.log('Navigating to NLS maps for Titchfield Abbey...');
  // Coordinates perfectly framing Abbey, Fishponds, Great Barn, and River Meon
  // Lat: 50.8558, Lon: -1.2332, Zoom: 17.0
  await page.goto(
    'https://maps.nls.uk/geo/explore/side-by-side/#zoom=17.0&lat=50.8558&lon=-1.2332&layers=168&right=osm',
    {
      waitUntil: 'networkidle2',
      timeout: 60000,
    },
  );

  // Accept cookies and clean up UI
  await page.evaluate(() => {
    // Click Accept Cookies if button exists
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.innerText.includes('Accept Cookies'),
    );
    if (btn) btn.click();

    // Hide unnecessary UI elements
    const elementsToHide = [
      '.ui-dialog',
      '#search-dialog',
      '.leaflet-control-container',
      '.ol-control',
      '.ol-scale-line',
      '.ol-attribution',
      '.GPwidget',
      '.GPshowAdvancedToolPicto',
      '.GPshowDrawing',
      '#header',
      '#footer',
      '.guided-tour',
      '#panel1',
      '#panel2',
      '.side-by-side-header',
      '#bottom-bar',
      '.cookie-banner',
      '#cookie-notice',
      '.ol-overlaycontainer-stopevent',
    ];
    elementsToHide.forEach((sel) => {
      document
        .querySelectorAll(sel)
        .forEach((el) => el.style.setProperty('display', 'none', 'important'));
    });
    // Hide any links containing 'Display map details'
    document.querySelectorAll('a').forEach((a) => {
      if (a.innerText.includes('Display map details') || a.innerText.includes('Map Key')) {
        a.style.setProperty('display', 'none', 'important');
      }
    });
  });

  await new Promise((r) => setTimeout(r, 1500));

  // Inject global CSS rule to permanently hide all overlays, links, and toolbars
  await page.addStyleTag({
    content: `
      a, .ol-attribution, .ol-scale-line, .ol-control, .GPwidget, .ui-dialog, #search-dialog,
      [class*="ol-control"], [class*="GP"], .leaflet-control-container, #header, #footer {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
    `,
  });

  // --- 1. CAPTURE HISTORIC OS 25-INCH (LEFT MAP) ---
  console.log('Preparing Left Map (Historic OS 25-inch)...');
  await page.evaluate(() => {
    const left = document.getElementById('mapleft');
    const right = document.getElementById('mapright');
    left.style.position = 'fixed';
    left.style.top = '0';
    left.style.left = '0';
    left.style.width = '1024px';
    left.style.height = '1024px';
    left.style.zIndex = '9999';
    left.style.display = 'block';

    right.style.display = 'none';

    // Update OpenLayers map size
    if (window.mapleft) {
      window.mapleft.updateSize();
    }
  });

  // Wait for tiles to fully render
  await new Promise((r) => setTimeout(r, 4000));
  const historicPath = path.join(outputDir, 'titchfield_abbey_historic_os_map_1890s.jpg');
  await page.screenshot({ path: historicPath, type: 'jpeg', quality: 90 });
  console.log(`Saved historic OS map: ${historicPath}`);

  // --- 2. CAPTURE MODERN OPENSTREETMAP (RIGHT MAP - OSM) ---
  console.log('Preparing Right Map (Modern Street Map - OSM)...');
  await page.evaluate(() => {
    const left = document.getElementById('mapleft');
    const right = document.getElementById('mapright');
    left.style.display = 'none';

    right.style.position = 'fixed';
    right.style.top = '0';
    right.style.left = '0';
    right.style.width = '1024px';
    right.style.height = '1024px';
    right.style.zIndex = '9999';
    right.style.display = 'block';

    const sel = document.getElementById('overlaySelectLayerRight');
    if (sel) {
      sel.value = '8'; // OpenStreetMap
      sel.dispatchEvent(new Event('change'));
    }

    if (window.mapright) {
      window.mapright.updateSize();
    }
  });

  await new Promise((r) => setTimeout(r, 4000));
  const modernMapPath = path.join(outputDir, 'titchfield_abbey_modern_map.jpg');
  await page.screenshot({ path: modernMapPath, type: 'jpeg', quality: 90 });
  console.log(`Saved modern street map: ${modernMapPath}`);

  // --- 3. CAPTURE MODERN SATELLITE (RIGHT MAP - ESRI WORLD IMAGERY) ---
  console.log('Preparing Right Map (Modern Satellite Aerial - ESRI)...');
  await page.evaluate(() => {
    const sel = document.getElementById('overlaySelectLayerRight');
    if (sel) {
      sel.value = '0'; // ESRI World Imagery
      sel.dispatchEvent(new Event('change'));
    }

    if (window.mapright) {
      window.mapright.updateSize();
    }
  });

  await new Promise((r) => setTimeout(r, 5000));
  const modernSatPath = path.join(outputDir, 'titchfield_abbey_modern_satellite.jpg');
  await page.screenshot({ path: modernSatPath, type: 'jpeg', quality: 90 });
  console.log(`Saved modern satellite aerial: ${modernSatPath}`);

  await browser.close();

  // --- 4. PROCESS ANCIENT 1605 ESTATE MAP ---
  const sharp = require('sharp');
  const ancientGif = path.join(__dirname, '..', 'scratch', 'fig127.png');
  const ancientDest = path.join(outputDir, 'titchfield_estate_map_1605.jpg');
  if (fs.existsSync(ancientGif)) {
    await sharp(ancientGif)
      .resize({ width: 1600, height: 1200, fit: 'inside' })
      .jpeg({ quality: 90 })
      .toFile(ancientDest);
    console.log(`Saved 1605 estate map: ${ancientDest}`);
  }

  console.log('All Titchfield Abbey maps captured successfully!');
})();
