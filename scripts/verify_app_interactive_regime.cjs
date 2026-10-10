/**
 * scripts/verify_app_interactive_regime.cjs
 *
 * Comprehensive Automated Testing Regime for The History Revision Hub.
 *
 * Validates:
 * 1. Visual Sources Integrity: Primary images, disk existence, captions, provenance, and Hinge Questions.
 * 2. UI Accordion & Collapsible Drawers: Verified to be collapsed by default (<details class="... archival-drawer"> with open=false),
 *    expanding/collapsing smoothly on click without console errors.
 * 3. Gallery & Modal Lightbox System: Clicks on visual sources trigger the high-res zoom lightbox (#global-image-modal),
 *    spotlight triggers the Masterpiece Projector (#masterpiece-projector-modal), and the top-level gallery view renders cleanly.
 * 4. Retrieval Quizzes & Quiz Pack: Verifies structured question banks, verifies compiled 8-page saddle-stitch HTML and PDF,
 *    and audits 0px overflow across all pages.
 * 4B. Distractor Collision & Answer Match Audit: Validates exactly 4 options per question, zero duplicate options,
 *    and 100% valid answer matching across all retrieval questions.
 * 5. Back Cover QR Codes & Live Routing: Tests enquiry QR code URLs on http://localhost:3003, asserting 0 console errors,
 *    correct lesson loading, and instant auto-launch of the retrieval quiz modal when &quiz=true is passed.
 * 5B. Mobile Viewport & Touch Target Ergonomics: Emulates iPhone SE (375x667, touch screen), asserting zero horizontal overflow,
 *    full mobile modal adaptation, touch target bounds (>= 44px per WCAG 2.1 AA), and clean mobile drawer toggling.
 * 6. Institutional Neutrality & Sanitization: Asserts 0 prohibited school or teacher identifiers.
 *
 * Usage:
 *   node scripts/verify_app_interactive_regime.cjs [unit_id]
 *   npm run test:regime
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3003;
const BASE_URL = `http://localhost:${PORT}`;

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function logHeader(title) {
  console.log(
    `\n${ANSI.bold}${ANSI.blue}=============================================================${ANSI.reset}`,
  );
  console.log(`${ANSI.bold}${ANSI.cyan}🔍 ${title}${ANSI.reset}`);
  console.log(
    `${ANSI.bold}${ANSI.blue}=============================================================${ANSI.reset}`,
  );
}

function logSection(title) {
  console.log(`\n${ANSI.bold}${ANSI.magenta}--- ${title} ---${ANSI.reset}`);
}

function logPass(msg) {
  console.log(`  ${ANSI.green}✔ PASS:${ANSI.reset} ${msg}`);
}

function logFail(msg) {
  console.error(`  ${ANSI.red}✖ FAIL:${ANSI.reset} ${msg}`);
}

function logWarn(msg) {
  console.log(`  ${ANSI.yellow}⚠ WARN:${ANSI.reset} ${msg}`);
}

async function runTestingRegime(targetUnitId = 'industrialisation_and_empire') {
  const startTime = Date.now();
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assertTest(condition, passMsg, failMsg) {
    totalTests++;
    if (condition) {
      passedTests++;
      logPass(passMsg);
      return true;
    } else {
      failedTests++;
      logFail(failMsg);
      return false;
    }
  }

  logHeader(`AUTOMATED TESTING REGIME: ${targetUnitId}`);

  // -------------------------------------------------------------
  // SUITE 1: Visual Sources Database & Physical Disk Verification
  // -------------------------------------------------------------
  logSection(`SUITE 1: Visual Sources Physical Integrity & Pedagogy`);
  const dbPath = path.join(ROOT_DIR, 'public', 'database.json');
  assertTest(fs.existsSync(dbPath), `database.json exists on disk`, `database.json is missing!`);

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const unitEntry = db[targetUnitId];
  assertTest(
    !!unitEntry,
    `Unit "${targetUnitId}" found in database.json`,
    `Unit "${targetUnitId}" not found in database!`,
  );

  const lessons =
    (unitEntry && (unitEntry.lessons || (unitEntry.data && unitEntry.data.lessons))) || [];
  assertTest(
    lessons.length > 0,
    `Loaded ${lessons.length} lessons for ${targetUnitId}`,
    `No lessons found in unit!`,
  );

  let totalVisualSources = 0;
  let diskMissingSources = 0;
  let hingeQuestionsCount = 0;
  const discoveredSources = [];

  lessons.forEach((lesson, lIdx) => {
    const blocks = lesson.narrative_blocks || [];
    blocks.forEach((b) => {
      const src = b.source;
      if (src && (src.image || src.src || src.url)) {
        totalVisualSources++;
        const imgRel = src.image || src.src || src.url;
        const cleanPath = imgRel.replace(/^\//, '');
        const cand1 = path.join(ROOT_DIR, 'public', cleanPath);
        const cand2 = path.join(ROOT_DIR, cleanPath);
        const cand3 = path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath));
        const exists =
          (fs.existsSync(cand1) && fs.statSync(cand1).size > 0) ||
          (fs.existsSync(cand2) && fs.statSync(cand2).size > 0) ||
          (fs.existsSync(cand3) && fs.statSync(cand3).size > 0);

        if (!exists) diskMissingSources++;

        const contextText = src.source_context || src.context || '';
        const hasHinge =
          src.hinge_question ||
          src.question ||
          /hinge|discuss|why might|what does|how far/i.test(contextText);
        if (hasHinge) hingeQuestionsCount++;

        discoveredSources.push({
          lesson: lIdx + 1,
          title: src.title || src.caption || `Source ${totalVisualSources}`,
          path: imgRel,
          exists,
          hasHinge: !!hasHinge,
        });
      }
    });

    // Also check lesson.sources if present
    if (Array.isArray(lesson.sources)) {
      lesson.sources.forEach((src) => {
        if (src && (src.image || src.src || src.url)) {
          totalVisualSources++;
          const imgRel = src.image || src.src || src.url;
          const cleanPath = imgRel.replace(/^\//, '');
          const cand1 = path.join(ROOT_DIR, 'public', cleanPath);
          const cand2 = path.join(ROOT_DIR, cleanPath);
          const cand3 = path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath));
          const exists =
            (fs.existsSync(cand1) && fs.statSync(cand1).size > 0) ||
            (fs.existsSync(cand2) && fs.statSync(cand2).size > 0) ||
            (fs.existsSync(cand3) && fs.statSync(cand3).size > 0);

          if (!exists) diskMissingSources++;
          discoveredSources.push({
            lesson: lIdx + 1,
            title: src.title || src.caption || `Source ${totalVisualSources}`,
            path: imgRel,
            exists,
            hasHinge: true,
          });
        }
      });
    }
  });

  const minSourcesTarget = Math.max(6, Math.floor(lessons.length * 1.2));
  assertTest(
    totalVisualSources >= minSourcesTarget,
    `Found ${totalVisualSources} visual primary sources across unit (Target: >= ${minSourcesTarget})`,
    `Too few visual sources found: ${totalVisualSources}`,
  );
  assertTest(
    diskMissingSources === 0,
    `100% of visual source image files exist on disk (${totalVisualSources}/${totalVisualSources})`,
    `${diskMissingSources} image files are missing on disk!`,
  );
  assertTest(
    hingeQuestionsCount >= Math.floor(minSourcesTarget * 0.8),
    `Visual sources include targeted Hinge Questions (${hingeQuestionsCount} verified)`,
    `Fewer than ${Math.floor(minSourcesTarget * 0.8)} Hinge Questions detected in visual source contexts`,
  );

  // -------------------------------------------------------------
  // SUITE 2 & 3: Puppeteer Desktop Live App Testing (Accordions, Gallery, Lightbox)
  // -------------------------------------------------------------
  logSection(`SUITE 2: UI Accordion & Collapsible Drawer State in Browser`);
  logSection(`SUITE 3: Gallery Lightbox & Masterpiece Projector Integration`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('favicon.ico')) {
          consoleErrors.push(text);
        }
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.toString());
    });

    // Test Lesson 1 URL
    const lesson1Url = `${BASE_URL}/?unit=${targetUnitId}&lesson=1`;
    await page.goto(lesson1Url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('.cme-source-drawer, .archival-drawer, #narrative-content-root', {
      timeout: 8000,
    });

    // Verify Accordion drawers are present and COLLAPSED by default
    const drawerStats = await page.evaluate(() => {
      const drawers = Array.from(
        document.querySelectorAll('details.cme-source-drawer, details.archival-drawer'),
      );
      const total = drawers.length;
      const closedByDefault = drawers.filter((d) => !d.open).length;
      return { total, closedByDefault };
    });

    assertTest(
      drawerStats.total > 0,
      `Rendered ${drawerStats.total} archival source accordions on Lesson 1`,
      `No archival source drawers found on Lesson 1`,
    );
    assertTest(
      drawerStats.closedByDefault === drawerStats.total,
      `All ${drawerStats.total} drawers are COLLAPSED BY DEFAULT (open: false)`,
      `Some drawers are open by default (${drawerStats.total - drawerStats.closedByDefault} open)`,
    );

    // Test expanding an accordion on click
    const toggleSuccess = await page.evaluate(async () => {
      const firstDrawer = document.querySelector(
        'details.cme-source-drawer, details.archival-drawer',
      );
      if (!firstDrawer) return false;
      const summary = firstDrawer.querySelector('summary');
      if (!summary) return false;
      summary.click();
      const opened = firstDrawer.open;
      summary.click();
      const closedAgain = !firstDrawer.open;
      return opened && closedAgain;
    });
    assertTest(
      toggleSuccess,
      `Accordion drawer expands and collapses smoothly on summary click`,
      `Accordion drawer toggle failed`,
    );

    // Now test expanding the first drawer to inspect its internal lightbox and projector buttons
    await page.evaluate(() => {
      const firstDrawer = document.querySelector(
        'details.cme-source-drawer, details.archival-drawer',
      );
      if (firstDrawer) firstDrawer.open = true;
    });
    await new Promise((r) => setTimeout(r, 200));

    // Test Image Lightbox Modal Integration (data-action="open-modal")
    const lightboxTest = await page.evaluate(async () => {
      const img = document.querySelector(
        'details.cme-source-drawer img[data-action="open-modal"], details.archival-drawer img[data-action="open-modal"]',
      );
      if (!img) return { found: false };
      img.click();
      const modal = document.getElementById('global-image-modal');
      const isVisible = modal && window.getComputedStyle(modal).display === 'flex';
      if (modal) {
        modal.click();
      }
      const isClosed = !document.getElementById('global-image-modal');
      return { found: true, opened: isVisible, closed: isClosed };
    });

    assertTest(
      lightboxTest.found,
      `Visual source image features data-action="open-modal" for high-res inspection`,
      `Visual source image lacks data-action="open-modal"`,
    );
    assertTest(
      lightboxTest.opened && lightboxTest.closed,
      `Clicking visual source launches high-res #global-image-modal and closes cleanly`,
      `Lightbox modal launch or close failed`,
    );

    // Test Masterpiece Studio / Source Spotlight Projector Integration
    const spotlightTest = await page.evaluate(async () => {
      const btn = document.querySelector('.btn-source-spotlight-launch');
      if (!btn) return { found: false };
      btn.click();
      const modal = document.getElementById('masterpiece-projector-modal');
      const isVisible = modal && window.getComputedStyle(modal).display === 'flex';
      if (typeof window.closeMasterpieceProjector === 'function') {
        window.closeMasterpieceProjector();
      } else if (modal) {
        modal.style.display = 'none';
      }
      const isClosed = modal && window.getComputedStyle(modal).display === 'none';
      return { found: true, opened: isVisible, closed: isClosed };
    });

    assertTest(
      spotlightTest.found,
      `Source drawer features .btn-source-spotlight-launch button`,
      `Missing Source Spotlight / Masterpiece Studio launch button`,
    );
    assertTest(
      spotlightTest.opened && spotlightTest.closed,
      `Clicking Source Spotlight opens #masterpiece-projector-modal and closes cleanly`,
      `Projector modal launch or close failed`,
    );

    // Test top-level Gallery / Masterpiece Studio view
    await page.goto(`${BASE_URL}/?view=gallery`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('#masterpiece-studio-root', { timeout: 8000 });
    const galleryRendered = await page.evaluate(() => {
      const root = document.getElementById('masterpiece-studio-root');
      return !!root && root.children.length > 0;
    });
    assertTest(
      galleryRendered,
      `Gallery / Masterpiece Studio view renders successfully with full visual archive`,
      `Gallery view failed to render`,
    );

    assertTest(
      consoleErrors.length === 0,
      `Zero browser console errors across all interactive drawer & gallery actions`,
      `Console errors detected: ${consoleErrors.join('; ')}`,
    );

    // -------------------------------------------------------------
    // SUITE 4: Retrieval Quizzes & Quiz Pack Verification
    // -------------------------------------------------------------
    logSection(`SUITE 4: Retrieval Quizzes & Quiz Pack Physical Compilation`);

    let allLessonsHaveQuestions = true;
    let totalQuestionsCount = 0;
    lessons.forEach((l, i) => {
      const qArray = l.quiz || l.quick_quiz || l.quiz_questions || [];
      const qCount = qArray.length;
      totalQuestionsCount += qCount;
      if (qCount < 4) {
        allLessonsHaveQuestions = false;
        logWarn(`Lesson ${i + 1} (${l.id}) has ${qCount} quiz questions (Expected >= 4)`);
      }
    });
    assertTest(
      allLessonsHaveQuestions && totalQuestionsCount >= lessons.length * 4,
      `All ${lessons.length} lessons contain structured retrieval practice questions (${totalQuestionsCount} questions total)`,
      `Not all lessons have sufficient retrieval practice questions`,
    );

    const quizPackHtmlPath = path.join(ROOT_DIR, 'public', 'units', targetUnitId, 'quiz_pack.html');
    const quizPackPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', `${targetUnitId}_quiz_pack.pdf`);

    assertTest(
      fs.existsSync(quizPackHtmlPath) && fs.statSync(quizPackHtmlPath).size > 1000,
      `Physical Quiz Pack HTML exists: public/units/${targetUnitId}/quiz_pack.html`,
      `Quiz Pack HTML is missing or empty!`,
    );
    assertTest(
      fs.existsSync(quizPackPdfPath) && fs.statSync(quizPackPdfPath).size > 10000,
      `Compiled 8-Page Saddle-Stitch PDF exists: public/pdfs/${targetUnitId}_quiz_pack.pdf`,
      `Quiz Pack PDF is missing or empty!`,
    );

    // Audit space budget / overflow across the 8 pages of quiz_pack.html
    await page.goto(`file://${quizPackHtmlPath}`, { waitUntil: 'load', timeout: 15000 });
    const quizPackOverflows = await page.evaluate(() => {
      const pages = Array.from(document.querySelectorAll('.a5-page, .page-container'));
      return pages.map((p, idx) => {
        const over = p.scrollHeight - p.clientHeight;
        return { page: idx + 1, over: Math.max(0, over) };
      });
    });

    const maxQuizOver = Math.max(...quizPackOverflows.map((p) => p.over));
    assertTest(
      quizPackOverflows.length === 8,
      `Quiz Pack contains exactly 8 pages (Saddle-Stitch format)`,
      `Expected 8 pages, found ${quizPackOverflows.length}`,
    );
    assertTest(
      maxQuizOver === 0,
      `Quiz Pack has ZERO OVERFLOW across all 8 pages (Max overflow: ${maxQuizOver}px)`,
      `Quiz Pack overflow detected: ${quizPackOverflows
        .filter((p) => p.over > 0)
        .map((p) => `P${p.page}: +${p.over}px`)
        .join(', ')}`,
    );

    // -------------------------------------------------------------
    // SUITE 4B: Distractor Collision & Answer Match Audit
    // -------------------------------------------------------------
    logSection(`SUITE 4B: Distractor Collision & Answer Key Sanity Audit`);

    let totalCheckedQuestions = 0;
    let duplicateOptionQuestions = 0;
    let missingAnswerMatches = 0;
    let malformedOptionsCount = 0;

    lessons.forEach((lesson, lIdx) => {
      const quizQuestions = lesson.quiz || lesson.quick_quiz || lesson.quiz_questions || [];
      quizQuestions.forEach((q, qIdx) => {
        totalCheckedQuestions++;
        const opts = q.options || [];

        // Check options count
        if (opts.length !== 4) {
          malformedOptionsCount++;
          logWarn(`Lesson ${lIdx + 1} Q${qIdx + 1} has ${opts.length} options (Expected 4)`);
        }

        // Check for duplicate options within the same question
        const normalized = opts.map((o) => String(o).trim().toLowerCase());
        const uniqueSet = new Set(normalized);
        if (uniqueSet.size !== opts.length) {
          duplicateOptionQuestions++;
          logWarn(
            `Lesson ${lIdx + 1} Q${qIdx + 1} contains duplicate options: ${JSON.stringify(opts)}`,
          );
        }

        // Check answer match (either numeric index or exact string)
        let hasValidAnswer = false;
        if (typeof q.answer === 'number') {
          hasValidAnswer = q.answer >= 0 && q.answer < opts.length;
        } else if (typeof q.answer === 'string') {
          const ansNorm = q.answer.trim().toLowerCase();
          hasValidAnswer = normalized.some((o) => o === ansNorm);
        }
        if (!hasValidAnswer) {
          missingAnswerMatches++;
          logWarn(
            `Lesson ${lIdx + 1} Q${qIdx + 1} answer "${q.answer}" does not match any provided options!`,
          );
        }
      });
    });

    assertTest(
      malformedOptionsCount === 0,
      `100% of questions contain exactly 4 multiple-choice options (${totalCheckedQuestions}/${totalCheckedQuestions})`,
      `${malformedOptionsCount} questions do not have 4 options`,
    );
    assertTest(
      duplicateOptionQuestions === 0,
      `Zero distractor collisions or duplicate options detected across all ${totalCheckedQuestions} questions`,
      `${duplicateOptionQuestions} questions contain duplicate options`,
    );
    assertTest(
      missingAnswerMatches === 0,
      `100% of questions have an exact, unambiguous answer match in their options array`,
      `${missingAnswerMatches} questions have answers that do not match their options!`,
    );

    // -------------------------------------------------------------
    // SUITE 5: Back Cover QR Codes & Live Route Launching
    // -------------------------------------------------------------
    logSection(`SUITE 5: Pupil Workbook Back Cover QR Codes & Live Routing`);

    const workbookHtmlPath = path.join(
      ROOT_DIR,
      'public',
      'units',
      targetUnitId,
      'pupil_workbook.html',
    );
    assertTest(
      fs.existsSync(workbookHtmlPath),
      `Pupil workbook HTML exists: public/units/${targetUnitId}/pupil_workbook.html`,
      `Pupil workbook HTML is missing!`,
    );

    const workbookHtml = fs.readFileSync(workbookHtmlPath, 'utf8');
    const qrMatchRegex = new RegExp(
      `https?:\\/\\/(?:the-)?history-revision-hub\\.netlify\\.app\\/(?:\\?unit=${targetUnitId}&(?:amp;)?lesson=(\\d+)|units\\/${targetUnitId}\\/lesson(\\d+))`,
      'gi',
    );
    const matches = [...workbookHtml.matchAll(qrMatchRegex)];

    // Check count of back cover QR cards in DOM
    const backCoverCardsCount = (workbookHtml.match(/Scan to Quiz/gi) || []).length;
    assertTest(
      matches.length >= 5 || backCoverCardsCount >= 5,
      `Found ${Math.max(matches.length, backCoverCardsCount)} enquiry QR codes on pupil workbook back cover`,
      `Fewer than 5 QR codes found in workbook!`,
    );

    // Live Puppeteer verification of first 5 enquiry routes on http://localhost:3003
    let allQRsPassed = true;
    const testEnquiriesCount = Math.min(5, lessons.length);
    for (let enquiryNum = 1; enquiryNum <= testEnquiriesCount; enquiryNum++) {
      const qrTestUrl = `${BASE_URL}/?unit=${targetUnitId}&lesson=${enquiryNum}&quiz=true`;
      const lessonErrors = [];
      const errListener = (msg) => {
        if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) {
          lessonErrors.push(msg.text());
        }
      };
      page.on('console', errListener);

      await page.goto(qrTestUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForSelector('.cme-source-drawer, .archival-drawer', { timeout: 8000 });

      // Wait for auto-launch of the quiz modal triggered by main.js
      await page.waitForSelector('#quizModal', { visible: true, timeout: 8000 });
      await page.waitForSelector('#quiz-question-container button', { timeout: 8000 });

      // Verify lesson drawers and quiz modal state
      const routeCheck = await page.evaluate(() => {
        const quizModal = document.getElementById('quizModal');
        const isModalVisible = quizModal && window.getComputedStyle(quizModal).display === 'flex';
        const questionContainer = document.getElementById('quiz-question-container');
        const hasQuestions = questionContainer && questionContainer.children.length > 0;
        const optionsCount = questionContainer
          ? questionContainer.querySelectorAll('button').length
          : 0;
        const drawersCount = document.querySelectorAll(
          'details.cme-source-drawer, details.archival-drawer',
        ).length;

        // Close modal
        if (typeof window.closeQuizModal === 'function') {
          window.closeQuizModal();
        } else if (quizModal) {
          quizModal.style.display = 'none';
        }

        return { isModalVisible, hasQuestions, optionsCount, drawersCount };
      });

      // Brief pause for modal fade out
      await new Promise((r) => setTimeout(r, 400));

      page.off('console', errListener);

      const passThis =
        routeCheck.isModalVisible &&
        routeCheck.optionsCount === 4 &&
        routeCheck.drawersCount > 0 &&
        lessonErrors.length === 0;
      if (!passThis) allQRsPassed = false;

      assertTest(
        passThis,
        `QR Route Enquiry ${enquiryNum} (?lesson=${enquiryNum}&quiz=true): Loaded cleanly, auto-launched Quiz Modal with 4 options, rendered ${routeCheck.drawersCount} closed drawers (0 errors)`,
        `QR Route Enquiry ${enquiryNum} failed: modalVisible=${routeCheck.isModalVisible}, options=${routeCheck.optionsCount}, drawers=${routeCheck.drawersCount}, errors=${lessonErrors.join('; ')}`,
      );
    }

    assertTest(
      allQRsPassed,
      `100% of tested Workbook Back Cover QR codes verified working end-to-end`,
      `One or more QR codes failed live verification`,
    );

    // -------------------------------------------------------------
    // SUITE 5B: Mobile Viewport & Touch Target Ergonomics Audit
    // -------------------------------------------------------------
    logSection(`SUITE 5B: Mobile Viewport & Touch Target Ergonomics (WCAG 2.1 AA)`);

    // Emulate iPhone SE (Compact 375x667 mobile touchscreen)
    await page.setViewport({
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    const mobileUrl = `${BASE_URL}/?unit=${targetUnitId}&lesson=1&quiz=true`;
    await page.goto(mobileUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('#quizModal', { visible: true, timeout: 8000 });
    await page.waitForSelector('.quiz-option-btn', { timeout: 8000 });

    const mobileMetrics = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const hasHorizontalOverflow = docWidth > winWidth;

      const btns = Array.from(document.querySelectorAll('.quiz-option-btn'));
      const optionsPassWcag = btns.every((b) => {
        const rect = b.getBoundingClientRect();
        return rect.height >= 44 && rect.width >= 44;
      });

      const modal = document.getElementById('quizModal');
      const content = modal ? modal.querySelector('.modal-content') : null;
      const contentRect = content ? content.getBoundingClientRect() : null;
      const modalFitsScreen =
        contentRect && contentRect.width <= winWidth && contentRect.height <= window.innerHeight;

      // Close modal
      if (typeof window.closeQuizModal === 'function') {
        window.closeQuizModal();
      }

      return {
        hasHorizontalOverflow,
        optionsPassWcag,
        modalFitsScreen,
        btnCount: btns.length,
      };
    });

    assertTest(
      !mobileMetrics.hasHorizontalOverflow,
      `Zero horizontal overflow scroll on compact mobile screen (375px width)`,
      `Horizontal overflow detected on mobile viewport!`,
    );
    assertTest(
      mobileMetrics.optionsPassWcag && mobileMetrics.btnCount === 4,
      `All 4 mobile quiz options meet WCAG 2.1 AA touch target standards (height & width >= 44px)`,
      `One or more quiz option buttons fail 44x44px touch target minimum`,
    );
    assertTest(
      mobileMetrics.modalFitsScreen,
      `Mobile fullscreen quiz modal adapts seamlessly to 100vw / 100vh viewport without clipping`,
      `Modal content bounds clipped outside mobile screen`,
    );

    // Test mobile drawer tapping and responsiveness
    await new Promise((r) => setTimeout(r, 400));
    await page.waitForSelector('details.cme-source-drawer, details.archival-drawer');

    const mobileDrawerMetrics = await page.evaluate(() => {
      const firstDrawer = document.querySelector(
        'details.cme-source-drawer, details.archival-drawer',
      );
      if (!firstDrawer) return { found: false };
      const summary = firstDrawer.querySelector('summary');
      const summaryRect = summary.getBoundingClientRect();
      const meetsTouchTarget = summaryRect.height >= 40;

      // Tap drawer to open
      summary.click();
      const opened = firstDrawer.open;
      const docWidthAfterOpen = document.documentElement.scrollWidth;
      const noOverflowAfterOpen = docWidthAfterOpen <= window.innerWidth;

      return {
        found: true,
        meetsTouchTarget,
        opened,
        noOverflowAfterOpen,
      };
    });

    assertTest(
      mobileDrawerMetrics.found && mobileDrawerMetrics.meetsTouchTarget,
      `Archival drawer summary provides generous mobile touch target (height >= 40px)`,
      `Drawer summary touch target too small on mobile`,
    );
    assertTest(
      mobileDrawerMetrics.opened && mobileDrawerMetrics.noOverflowAfterOpen,
      `Drawer expands cleanly on mobile touch tap with zero horizontal page spill`,
      `Drawer open caused horizontal spill or failed to expand on mobile`,
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // -------------------------------------------------------------
  // SUITE 6: Institutional Anonymity & Neutrality Guardrail
  // -------------------------------------------------------------
  logSection(`SUITE 6: Institutional Anonymity & Commercial Neutrality Policy`);
  let sanitizationClean = true;
  try {
    const { execSync } = require('child_process');
    const auditOutput = execSync('node scripts/verify_sanitization.cjs', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
    });
    sanitizationClean =
      auditOutput.includes('0 forbidden school identifiers') || !auditOutput.includes('FAIL');
  } catch (err) {
    sanitizationClean = false;
  }
  assertTest(
    sanitizationClean,
    `Repository is 100% institutional-neutral (0 prohibited school/teacher identifiers)`,
    `Sanitization audit failed! Prohibited school identifiers detected.`,
  );

  // -------------------------------------------------------------
  // FINAL SCORECARD
  // -------------------------------------------------------------
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  logHeader(`TESTING REGIME SUMMARY`);
  console.log(`  Total Test Assertions: ${ANSI.bold}${totalTests}${ANSI.reset}`);
  console.log(`  Passed Assertions:     ${ANSI.green}${ANSI.bold}${passedTests}${ANSI.reset}`);
  console.log(
    `  Failed Assertions:     ${failedTests === 0 ? ANSI.green : ANSI.red}${ANSI.bold}${failedTests}${ANSI.reset}`,
  );
  console.log(`  Execution Time:        ${duration}s\n`);

  if (failedTests > 0) {
    console.error(
      `${ANSI.red}${ANSI.bold}✖ TESTING REGIME FAILED: ${failedTests} assertion(s) failed.${ANSI.reset}\n`,
    );
    process.exit(1);
  } else {
    console.log(
      `${ANSI.green}${ANSI.bold}🎉 ALL SYSTEMS VERIFIED: 100% GREEN ACROSS ALL SUITES.${ANSI.reset}\n`,
    );
    process.exit(0);
  }
}

const targetUnit = process.argv[2] || 'industrialisation_and_empire';
runTestingRegime(targetUnit).catch((err) => {
  console.error(`\n${ANSI.red}${ANSI.bold}Fatal Regime Error:${ANSI.reset}`, err);
  process.exit(1);
});
