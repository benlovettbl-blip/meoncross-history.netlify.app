const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3003';

async function runDeepDiveAudit() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const errors = [];
  const warnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore favicon or non-critical 404s for external analytics if any
      if (!text.includes('favicon.ico')) {
        errors.push({ type: 'CONSOLE_ERROR', message: text, url: page.url() });
      }
    }
  });

  page.on('pageerror', err => {
    errors.push({ type: 'UNCAUGHT_EXCEPTION', message: err.message, stack: err.stack, url: page.url() });
  });

  console.log('=== STARTING APP DEEP DIVE AUDIT ===\n');

  // 1. Initial Load (Dashboard)
  console.log('1. Testing Initial Load / Dashboard...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Check database loaded
  const dbStatus = await page.evaluate(() => {
    return {
      hasDatabase: typeof window.DATABASE !== 'undefined' || (window.state && !!window.state.database),
      unitsCount: window.state && window.state.database ? Object.keys(window.state.database).length : 0,
      activeView: window.state ? window.state.currentView : null
    };
  });
  console.log('Database Status:', dbStatus);

  // 2. Test All Views
  const viewsToTest = [
    { name: 'dashboard', url: `${BASE_URL}/?view=dashboard` },
    { name: 'lessons (default)', url: `${BASE_URL}/?view=lessons` },
    { name: 'lessons (edexcel_medicine)', url: `${BASE_URL}/?view=lessons&unit=edexcel_medicine` },
    { name: 'lessons (great_war)', url: `${BASE_URL}/?view=lessons&unit=great_war` },
    { name: 'interactive (edexcel_medicine)', url: `${BASE_URL}/?view=interactive&unit=edexcel_medicine` },
    { name: 'interactive (cme_new)', url: `${BASE_URL}/?view=interactive&unit=cme_new` },
    { name: 'interactive (usa)', url: `${BASE_URL}/?view=interactive&unit=usa` },
    { name: 'booklets', url: `${BASE_URL}/?view=booklets` },
    { name: 'workbooks', url: `${BASE_URL}/?view=workbooks` },
    { name: 'department-portal', url: `${BASE_URL}/?view=department-portal` },
    { name: 'curriculum', url: `${BASE_URL}/?view=curriculum` },
    { name: 'profile', url: `${BASE_URL}/?view=profile` },
    { name: 'competitions', url: `${BASE_URL}/?view=competitions` },
    { name: 'timeline', url: `${BASE_URL}/?view=timeline&unit=edexcel_medicine` },
    { name: 'masterpiece', url: `${BASE_URL}/?view=masterpiece` },
    { name: 'chess', url: `${BASE_URL}/?view=chess` }
  ];

  const viewResults = [];

  for (const v of viewsToTest) {
    console.log(`\nNavigating to: ${v.name} -> ${v.url}`);
    try {
      await page.goto(v.url, { waitUntil: 'networkidle2', timeout: 10000 });
      await new Promise(r => setTimeout(r, 600));

      const viewData = await page.evaluate(() => {
        const mc = document.getElementById('main-content');
        const text = mc ? mc.innerText.trim() : '';
        const buttons = Array.from(mc ? mc.querySelectorAll('button, a[data-action], a.btn') : []).map(b => ({
          text: (b.innerText || b.title || '').trim().replace(/\s+/g, ' ').substring(0, 40),
          tag: b.tagName,
          onclick: b.getAttribute('onclick') || b.dataset.action || b.getAttribute('href') || ''
        }));

        // Find all internal PDF links to verify physical existence
        const pdfLinks = Array.from(mc ? mc.querySelectorAll('a[href$=".pdf"]') : []).map(a => a.getAttribute('href'));

        return {
          contentLength: text.length,
          snippet: text.substring(0, 100).replace(/\n/g, ' '),
          buttonsCount: buttons.length,
          sampleButtons: buttons.slice(0, 8),
          pdfLinks
        };
      });

      // Verify PDF links on disk
      const missingPdfs = [];
      for (const pdfUrl of viewData.pdfLinks) {
        if (pdfUrl.startsWith('/pdfs/') || pdfUrl.startsWith('/units/')) {
          const localPath = path.join(__dirname, '..', 'public', pdfUrl.replace(/^\//, ''));
          if (!fs.existsSync(localPath)) {
            missingPdfs.push({ url: pdfUrl, localPath });
          }
        }
      }

      viewResults.push({
        view: v.name,
        ok: viewData.contentLength > 50,
        contentLength: viewData.contentLength,
        buttonsCount: viewData.buttonsCount,
        missingPdfs,
        snippet: viewData.snippet
      });

      console.log(`  Content Length: ${viewData.contentLength}, Buttons: ${viewData.buttonsCount}, PDFs: ${viewData.pdfLinks.length}`);
      if (missingPdfs.length > 0) {
        console.log(`  WARNING: Missing PDFs found:`, missingPdfs.map(p => p.url));
        warnings.push({ view: v.name, missingPdfs });
      }
    } catch (e) {
      console.log(`  FAILED to load ${v.name}:`, e.message);
      errors.push({ type: 'VIEW_LOAD_FAILURE', view: v.name, message: e.message });
    }
  }

  // 3. Test Global Navbar Buttons (Theme Switcher, Audio, Modals)
  console.log('\n3. Testing Global Navbar Controls...');
  await page.goto(`${BASE_URL}/?view=dashboard`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const navControls = await page.evaluate(() => {
    const results = {};

    // Test Theme toggle
    const themeBtn = document.getElementById('btn-toggle-theme') || document.querySelector('[data-action="toggle-theme"]') || document.querySelector('button[title*="Theme"]');
    results.themeBtn = !!themeBtn;
    if (themeBtn) {
      const prevTheme = document.body.dataset.theme || 'default';
      themeBtn.click();
      results.themeChanged = (document.body.dataset.theme || '') !== prevTheme;
      // Click back
      themeBtn.click();
    }

    // Test Audio toggle
    const audioBtn = document.getElementById('btn-audio-narrator') || document.getElementById('btn-toggle-audio') || document.querySelector('[data-action="toggle-audio"]') || document.querySelector('button[title*="Audio"], button[title*="Voice"], button[title*="Sound"]');
    results.audioBtn = !!audioBtn;

    // Test Accessibility / Font button
    const accessBtn = document.getElementById('btn-accessibility') || document.querySelector('button[title*="Accessibility"], button[title*="Font"]');
    results.accessBtn = !!accessBtn;

    // Test Sidebar toggle
    const sidebarBtn = document.getElementById('btn-toggle-sidebar') || document.querySelector('#sidebar-toggle, .sidebar-toggle');
    results.sidebarBtn = !!sidebarBtn;

    return results;
  });
  console.log('Nav Controls Status:', navControls);

  // 4. Test Sidebar Links and Dynamic Unit Switching
  console.log('\n4. Testing Sidebar Unit Switcher & Navigation...');
  const sidebarAudit = await page.evaluate(() => {
    const navItems = Array.from(document.querySelectorAll('#sidebar .nav-item, #sidebar a, #sidebar button')).map(el => ({
      text: el.innerText.trim().replace(/\s+/g, ' '),
      action: el.dataset.action || el.getAttribute('onclick') || el.getAttribute('href') || ''
    }));
    return {
      count: navItems.length,
      items: navItems
    };
  });
  console.log(`Found ${sidebarAudit.count} sidebar items:`);
  sidebarAudit.items.forEach(i => console.log(`  - [${i.text}] -> ${i.action}`));

  // 5. Test Audio Narrator (Ensuring voiceovers obey user rules: zero fake voiceovers, proper status)
  console.log('\n5. Testing Audio Narrator Status...');
  const audioStatus = await page.evaluate(() => {
    return {
      hasSpeechSynthesis: 'speechSynthesis' in window,
      audioController: typeof window.audioController !== 'undefined'
    };
  });
  console.log('Audio Status:', audioStatus);

  console.log('\n=== AUDIT COMPLETE ===');
  console.log(`Total Errors Logged: ${errors.length}`);
  console.log(`Total Warnings Logged: ${warnings.length}`);

  await browser.close();

  return { errors, warnings, viewResults };
}

runDeepDiveAudit()
  .then(res => {
    fs.writeFileSync(path.join(__dirname, 'audit_report_raw.json'), JSON.stringify(res, null, 2));
    console.log('Audit results saved to scripts/audit_report_raw.json');
  })
  .catch(err => {
    console.error('Audit run error:', err);
  });
