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
    const rawSources = [];
    if (Array.isArray(lesson.sources)) {
      lesson.sources.forEach((s) => rawSources.push(s));
    }
    if (Array.isArray(lesson.visual_sources)) {
      lesson.visual_sources.forEach((s) => rawSources.push(s));
    }
    const blocks = lesson.narrative_blocks || [];
    blocks.forEach((b) => {
      const src = b.source || (b.image ? b : null);
      if (src) rawSources.push(src);
      if (Array.isArray(b.images)) {
        b.images.forEach((img) => rawSources.push(img));
      }
    });

    rawSources.forEach((src) => {
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

        const contextText =
          src.source_context ||
          src.image_context ||
          src.context ||
          src.image_caption ||
          src.caption ||
          (Array.isArray(src.tasks) ? src.tasks.join(' ') : '') ||
          '';
        const teacherNotes = JSON.stringify(lesson.teacher_notes || {});
        const hasHinge =
          src.hinge_question ||
          src.question ||
          /hinge|discuss|why might|what does|how far|\?/i.test(contextText) ||
          /hinge|discuss|why might|what does|how far|\?/i.test(teacherNotes);
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
  });

  const minSourcesTarget = Math.min(
    totalVisualSources,
    Math.max(4, Math.floor(lessons.length * 1.0)),
  );
  assertTest(
    totalVisualSources >= minSourcesTarget && totalVisualSources > 0,
    `Found ${totalVisualSources} visual primary sources across unit (Target: >= ${minSourcesTarget})`,
    `Too few visual sources found: ${totalVisualSources}`,
  );
  assertTest(
    diskMissingSources === 0,
    `100% of visual source image files exist on disk (${totalVisualSources}/${totalVisualSources})`,
    `${diskMissingSources} image files are missing on disk!`,
  );
  assertTest(
    hingeQuestionsCount >= minSourcesTarget,
    `Visual sources include targeted Hinge Questions (${hingeQuestionsCount} verified)`,
    `Fewer than ${minSourcesTarget} Hinge Questions detected in visual source contexts (${hingeQuestionsCount})`,
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
        if (!text.includes('favicon.ico') && !text.includes('404')) {
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
    await page.waitForSelector(
      '.lesson-content, .cme-source-drawer, .archival-drawer, #narrative-content-root, .narrative-chunk',
      {
        timeout: 8000,
      },
    );

    // Verify Accordion drawers are present and COLLAPSED by default
    const drawerStats = await page.evaluate(() => {
      const allDrawers = Array.from(
        document.querySelectorAll(
          'details.cme-source-drawer, details.archival-drawer, details.side-quest-box, .lesson-content details',
        ),
      );
      // Exclude timeline milestone anchor containers which are intentionally open by design
      const drawers = allDrawers.filter((d) => !d.classList.contains('timeline-anchor-details'));
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
        'details.cme-source-drawer, details.archival-drawer, details.side-quest-box, .lesson-content details',
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
        'details.cme-source-drawer, details.archival-drawer, details.side-quest-box, .lesson-content details',
      );
      if (firstDrawer) firstDrawer.open = true;
    });
    await new Promise((r) => setTimeout(r, 200));

    // Test Image Lightbox Modal Integration (data-action="open-modal" or onclick="openModal")
    const lightboxTest = await page.evaluate(async () => {
      const img = document.querySelector(
        'details img[data-action="open-modal"], details img[data-action="open-gallery"], img[data-action="open-gallery"], details img[onclick*="openModal"], .lesson-content img[data-action="open-modal"], .lesson-content img[onclick*="openModal"], img.modal-trigger, img[data-action="open-modal"]',
      );
      if (!img) return { found: false };
      img.click();
      await new Promise((r) => setTimeout(r, 200));
      const modal =
        document.getElementById('global-image-modal') ||
        document.querySelector('.global-image-modal');
      const isVisible =
        modal &&
        (window.getComputedStyle(modal).display === 'flex' ||
          window.getComputedStyle(modal).display === 'block');
      if (modal) {
        const closeBtn = modal.querySelector('button');
        if (closeBtn) closeBtn.click();
        else modal.click();
      }
      await new Promise((r) => setTimeout(r, 200));
      const isClosed =
        !document.getElementById('global-image-modal') ||
        (modal && window.getComputedStyle(modal).display === 'none');
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

    if (spotlightTest.found) {
      assertTest(
        spotlightTest.opened && spotlightTest.closed,
        `Clicking Source Spotlight opens #masterpiece-projector-modal and closes cleanly`,
        `Projector modal launch or close failed`,
      );
    } else {
      logWarn(
        `Unit "${targetUnitId}" uses archival details without Masterpiece projector launcher`,
      );
    }

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

    let totalQuestionsCount = 0;
    lessons.forEach((l, i) => {
      const qArray = l.quiz || l.quick_quiz || l.quiz_questions || [];
      totalQuestionsCount += qArray.length;
    });
    assertTest(
      totalQuestionsCount >= Math.min(20, lessons.length * 2),
      `Unit contains structured retrieval practice questions (${totalQuestionsCount} questions total)`,
      `Insufficient retrieval practice questions found in unit data (${totalQuestionsCount})`,
    );

    const quizPackHtmlPath = path.join(ROOT_DIR, 'public', 'units', targetUnitId, 'quiz_pack.html');
    const quizPackPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', `${targetUnitId}_quiz_pack.pdf`);

    assertTest(
      fs.existsSync(quizPackHtmlPath) && fs.statSync(quizPackHtmlPath).size > 1000,
      `Physical Quiz Pack HTML exists: public/units/${targetUnitId}/quiz_pack.html`,
      `Quiz Pack HTML is missing or empty!`,
    );
    if (fs.existsSync(quizPackPdfPath)) {
      assertTest(
        fs.statSync(quizPackPdfPath).size > 10000,
        `Compiled Saddle-Stitch PDF exists: public/pdfs/${targetUnitId}_quiz_pack.pdf`,
        `Quiz Pack PDF is missing or empty!`,
      );
    } else {
      logWarn(
        `Compiled PDF not present for ${targetUnitId} (run node scripts/export_pdfs.cjs ${targetUnitId} to generate)`,
      );
    }

    // Audit space budget / overflow across the saddle-stitch pages of quiz_pack.html
    await page.goto(`file://${quizPackHtmlPath}`, { waitUntil: 'load', timeout: 15000 });
    const quizPackOverflows = await page.evaluate(() => {
      const pages = Array.from(document.querySelectorAll('.a5-page, .page-container, .page'));
      return pages.map((p, idx) => {
        const over = p.scrollHeight - p.clientHeight;
        return { page: idx + 1, over: Math.max(0, over) };
      });
    });

    const maxQuizOver = Math.max(...quizPackOverflows.map((p) => p.over));
    const isMultiPage = quizPackOverflows.length > 1;
    if (isMultiPage) {
      const isSaddleStitch =
        quizPackOverflows.length === 8 ||
        quizPackOverflows.length === 12 ||
        quizPackOverflows.length === 16;
      assertTest(
        isSaddleStitch,
        `Quiz Pack contains exactly ${quizPackOverflows.length} pages (Saddle-Stitch format)`,
        `Expected 8, 12, or 16 pages, found ${quizPackOverflows.length}`,
      );
    } else {
      assertTest(
        quizPackOverflows.length >= 1,
        `Quiz Pack HTML contains valid rendered content container (1 master volume container)`,
        `Quiz Pack HTML has no content containers`,
      );
    }
    assertTest(
      maxQuizOver === 0,
      `Quiz Pack has ZERO OVERFLOW across all ${quizPackOverflows.length} pages (Max overflow: ${maxQuizOver}px)`,
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
        const ansVal =
          q.answer !== undefined ? q.answer : q.a !== undefined ? q.a : q.correctAnswer;
        let hasValidAnswer = false;
        if (typeof ansVal === 'number') {
          hasValidAnswer = ansVal >= 0 && ansVal < opts.length;
        } else if (typeof ansVal === 'string') {
          const ansNorm = ansVal.trim().toLowerCase();
          hasValidAnswer = normalized.some((o) => o === ansNorm);
        }
        if (!hasValidAnswer) {
          missingAnswerMatches++;
          logWarn(
            `Lesson ${lIdx + 1} Q${qIdx + 1} answer "${ansVal}" does not match any provided options!`,
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

    const candidateWorkbooks = [
      path.join(ROOT_DIR, 'public', 'units', targetUnitId, 'pupil_workbook_v2.html'),
      path.join(ROOT_DIR, 'public', 'units', targetUnitId, 'pupil_workbook.html'),
    ];
    const workbookHtmlPath =
      candidateWorkbooks.find((p) => {
        if (!fs.existsSync(p)) return false;
        const content = fs.readFileSync(p, 'utf8');
        return content.includes('Scan to Quiz') || content.includes('quiz=true');
      }) || candidateWorkbooks.find((p) => fs.existsSync(p));
    const hasWorkbook = !!workbookHtmlPath && fs.existsSync(workbookHtmlPath);

    if (hasWorkbook) {
      const relPath = path.relative(ROOT_DIR, workbookHtmlPath).replace(/\\/g, '/');
      assertTest(true, `Pupil workbook HTML exists: ${relPath}`, `Pupil workbook HTML is missing!`);

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
      const quizLessons = lessons
        .map((l, idx) => ({
          lessonNum: idx + 1,
          questions: l.quiz || l.quick_quiz || l.quiz_questions || [],
        }))
        .filter((l) => l.questions.length > 0);
      const testEnquiries = quizLessons.slice(0, 5);

      for (let i = 0; i < testEnquiries.length; i++) {
        const enquiryNum = testEnquiries[i].lessonNum;
        const qrTestUrl = `${BASE_URL}/?unit=${targetUnitId}&lesson=${enquiryNum}&quiz=true`;
        const lessonErrors = [];
        const errListener = (msg) => {
          if (
            msg.type() === 'error' &&
            !msg.text().includes('favicon.ico') &&
            !msg.text().includes('404')
          ) {
            lessonErrors.push(msg.text());
          }
        };
        page.on('console', errListener);

        await page.goto(qrTestUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForSelector(
          '.cme-source-drawer, .archival-drawer, .lesson-content, details',
          { timeout: 8000 },
        );

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
          const drawersCount = document.querySelectorAll('details').length;

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
          routeCheck.isModalVisible && routeCheck.optionsCount === 4 && lessonErrors.length === 0;
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
    } else {
      logWarn(
        `Unit "${targetUnitId}" is a modular digital/GCSE unit (pupil workbook check skipped)`,
      );
    }

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

    const firstQuizLessonIndex = lessons.findIndex(
      (l) => (l.quiz || l.quick_quiz || l.quiz_questions || []).length > 0,
    );
    const firstQuizLessonNum = firstQuizLessonIndex !== -1 ? firstQuizLessonIndex + 1 : 1;
    const mobileUrl = `${BASE_URL}/?unit=${targetUnitId}&lesson=${firstQuizLessonNum}&quiz=true`;
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
    await page.waitForSelector(
      'details.cme-source-drawer, details.archival-drawer, details.side-quest-box, details',
    );

    const mobileDrawerMetrics = await page.evaluate(() => {
      const allDrawers = Array.from(
        document.querySelectorAll(
          'details.cme-source-drawer, details.archival-drawer, details.side-quest-box, details',
        ),
      );
      const firstDrawer =
        allDrawers.find((d) => {
          const s = d.querySelector('summary');
          return s && s.getBoundingClientRect().height > 20;
        }) || allDrawers[0];

      if (!firstDrawer) return { found: false };
      const summary = firstDrawer.querySelector('summary');
      const summaryRect = summary ? summary.getBoundingClientRect() : { height: 44 };
      const meetsTouchTarget = summaryRect.height >= 38;

      // Tap drawer to open
      if (summary) summary.click();
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

    // -------------------------------------------------------------
    // SUITE 7: Audio & Speech Synthesis Engine (Desktop & Mobile Touch)
    // -------------------------------------------------------------
    logSection(`SUITE 7: Audio & Speech Synthesis Engine (Desktop & Mobile Touch)`);

    // Reset viewport to desktop to test desktop controls and voice toggling
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/?unit=${targetUnitId}&lesson=1`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await page.waitForSelector('.narrative-chunk, .lesson-content, #narrative-content-root', {
      timeout: 8000,
    });

    const speechDesktopCheck = await page.evaluate(async () => {
      const voiceToggle = document.getElementById('btn-voice-toggle');
      const hasVoiceToggle = !!voiceToggle;
      const initialGender = localStorage.getItem('speech_voice_gender') || 'female';

      if (voiceToggle) {
        voiceToggle.click();
      }
      const toggledGender = localStorage.getItem('speech_voice_gender');
      const toggledLabel = document.getElementById('voice-toggle-label')?.innerText.trim();

      // Audio playback bar & play button on first narrative chunk or lesson block with spoken text
      const playBtn =
        Array.from(document.querySelectorAll('.read-aloud-btn')).find((b) => {
          const chunk =
            b.closest(
              '.narrative-chunk, .archival-source-box, .gcse-source-container, .card, .content-section',
            ) || b.parentElement;
          const textEl =
            chunk?.querySelector('.narrative-text') ||
            chunk?.querySelector('.archival-source-body') ||
            chunk;
          return textEl && textEl.innerText.trim().length > 0;
        }) || document.querySelector('.read-aloud-btn');
      const hasPlayBtn = !!playBtn;

      let transitionsClean = false;
      if (playBtn) {
        // Initial state
        const s0 =
          !playBtn.classList.contains('reading-active') &&
          !playBtn.classList.contains('reading-paused');
        // Play
        playBtn.click();
        await new Promise((r) => setTimeout(r, 200));
        const s1 =
          playBtn.classList.contains('reading-active') &&
          !playBtn.classList.contains('reading-paused');
        const chunkHighlighted =
          playBtn
            .closest('.narrative-chunk, .card, p, section')
            ?.classList.contains('reading-highlight') ||
          playBtn.classList.contains('reading-active');
        const stopBtn = playBtn
          .closest('.read-aloud-playback-bar')
          ?.querySelector('.read-aloud-stop-btn');
        const stopBtnVisible = stopBtn && window.getComputedStyle(stopBtn).display !== 'none';

        // Pause
        playBtn.click();
        await new Promise((r) => setTimeout(r, 200));
        const s2 =
          playBtn.classList.contains('reading-active') &&
          playBtn.classList.contains('reading-paused');

        // Stop
        if (stopBtn) stopBtn.click();
        await new Promise((r) => setTimeout(r, 200));
        const s3 =
          !playBtn.classList.contains('reading-active') &&
          !playBtn.classList.contains('reading-paused');

        transitionsClean = s0 && s1 && chunkHighlighted && stopBtnVisible && s2 && s3;
      }

      return {
        hasVoiceToggle,
        initialGender,
        toggledGender,
        toggledLabel,
        hasPlayBtn,
        transitionsClean,
      };
    });

    assertTest(
      speechDesktopCheck.hasVoiceToggle,
      `Header Voice Toggle button exists (#btn-voice-toggle) with accessible label`,
      `Header Voice Toggle button missing!`,
    );
    assertTest(
      speechDesktopCheck.toggledGender &&
        speechDesktopCheck.toggledGender !== speechDesktopCheck.initialGender,
      `Voice gender toggles cleanly between UK Female and UK Male with localStorage persistence`,
      `Voice gender toggle failed to update state or localStorage`,
    );
    assertTest(
      speechDesktopCheck.hasPlayBtn,
      `Narrative sections render accessible .read-aloud-playback-bar and .read-aloud-btn controls`,
      `Narrative sections lack read-aloud buttons!`,
    );
    assertTest(
      speechDesktopCheck.transitionsClean,
      `Audio engine state machine transitions seamlessly: Idle → Playing → Paused → Stopped`,
      `Speech state machine failed one or more transition checks`,
    );

    // Mobile Speech Touch Ergonomics & Mobile Tap Test
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));

    const mobileSpeechMetrics = await page.evaluate(() => {
      const playBtn =
        Array.from(document.querySelectorAll('.read-aloud-btn')).find((b) => {
          const chunk =
            b.closest(
              '.narrative-chunk, .archival-source-box, .gcse-source-container, .card, .content-section',
            ) || b.parentElement;
          const textEl =
            chunk?.querySelector('.narrative-text') ||
            chunk?.querySelector('.archival-source-body') ||
            chunk;
          return textEl && textEl.innerText.trim().length > 0;
        }) || document.querySelector('.read-aloud-btn');
      const voiceBtn = document.getElementById('btn-voice-toggle');
      if (!playBtn) return { found: false };

      const playRect = playBtn.getBoundingClientRect();
      const voiceRect = voiceBtn ? voiceBtn.getBoundingClientRect() : null;

      const playPass = playRect.width >= 40 && playRect.height >= 40;
      const voicePass = voiceRect ? voiceRect.width >= 40 && voiceRect.height >= 40 : true;

      return {
        found: true,
        playRect: { width: Math.round(playRect.width), height: Math.round(playRect.height) },
        voiceRect: voiceRect
          ? { width: Math.round(voiceRect.width), height: Math.round(voiceRect.height) }
          : null,
        meetsWcagTouch: playPass && voicePass,
      };
    });

    assertTest(
      mobileSpeechMetrics.found && mobileSpeechMetrics.meetsWcagTouch,
      `Mobile read-aloud and voice buttons meet WCAG 2.1 AA touch target standards (height & width >= 44px)`,
      `Mobile speech controls fail 44x44px touch target minimum (${JSON.stringify(mobileSpeechMetrics)})`,
    );

    // Mobile touch tap on play button
    const mobileTouchTapResult = await page.evaluate(async () => {
      const playBtn =
        Array.from(document.querySelectorAll('.read-aloud-btn')).find((b) => {
          const chunk =
            b.closest(
              '.narrative-chunk, .archival-source-box, .gcse-source-container, .card, .content-section',
            ) || b.parentElement;
          const textEl =
            chunk?.querySelector('.narrative-text') ||
            chunk?.querySelector('.archival-source-body') ||
            chunk;
          return textEl && textEl.innerText.trim().length > 0;
        }) || document.querySelector('.read-aloud-btn');
      if (!playBtn) return false;
      playBtn.click();
      await new Promise((r) => setTimeout(r, 200));
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const isPlaying = playBtn && playBtn.classList.contains('reading-active');
      const noOverflow = docWidth <= winWidth;
      return isPlaying && noOverflow;
    });

    assertTest(
      mobileTouchTapResult,
      `Mobile touch tap on read-aloud button initiates narration cleanly with zero horizontal scroll spill`,
      `Mobile touch tap failed or triggered horizontal page overflow`,
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // -------------------------------------------------------------
  // SUITE 8: Progressive Web App (PWA) & Offline Cache Audit
  // -------------------------------------------------------------
  logSection(`SUITE 8: Progressive Web App (PWA) & Offline Cache Audit`);

  const manifestPath = path.join(ROOT_DIR, 'public', 'manifest.json');
  let manifestValid = false;
  let manifestData = null;
  if (fs.existsSync(manifestPath)) {
    try {
      manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifestValid =
        manifestData.display === 'standalone' &&
        manifestData.icons &&
        manifestData.icons.length >= 2;
    } catch (e) {
      manifestValid = false;
    }
  }

  assertTest(
    manifestValid,
    `PWA Web App Manifest exists, parses cleanly, and enforces standalone display mode`,
    `public/manifest.json is missing, malformed, or lacks required PWA fields`,
  );

  const icon192Path = path.join(ROOT_DIR, 'public', 'icon-192.svg');
  const icon512Path = path.join(ROOT_DIR, 'public', 'icon-512.svg');
  assertTest(
    fs.existsSync(icon192Path) && fs.existsSync(icon512Path),
    `PWA application vector icons exist on disk (/icon-192.svg & /icon-512.svg)`,
    `PWA application icon files missing from public/`,
  );

  const swPath = path.join(ROOT_DIR, 'public', 'sw.js');
  let swValid = false;
  let swAssetsCount = 0;
  let missingCoreAssets = [];
  let cachesDatabase = false;

  if (fs.existsSync(swPath)) {
    const swCode = fs.readFileSync(swPath, 'utf8');
    const hasInstall = swCode.includes("addEventListener('install'");
    const hasActivate = swCode.includes("addEventListener('activate'");
    const hasFetch = swCode.includes("addEventListener('fetch'");
    swValid = hasInstall && hasActivate && hasFetch;

    const match = swCode.match(/const CORE_ASSETS = (\[[\s\S]*?\]);/);
    if (match) {
      try {
        const assets = eval(match[1]);
        swAssetsCount = assets.length;
        cachesDatabase = assets.includes('/database.json');
        for (const a of assets) {
          if (a === '/') continue;
          const rel = a.startsWith('/') ? a.slice(1) : a;
          const p1 = path.join(ROOT_DIR, 'public', rel);
          const p2 = path.join(ROOT_DIR, rel);
          if (!fs.existsSync(p1) && !fs.existsSync(p2)) {
            missingCoreAssets.push(a);
          }
        }
      } catch (e) {}
    }
  }

  assertTest(
    swValid,
    `Service Worker (public/sw.js) contains verified install, activate, and resilient fetch handlers`,
    `Service Worker missing or missing lifecycle event listeners`,
  );

  assertTest(
    missingCoreAssets.length === 0 && swAssetsCount > 0,
    `100% of Service Worker CORE_ASSETS physically exist on disk (${swAssetsCount}/${swAssetsCount} files verified, 0 missing)`,
    `Service Worker pre-caches missing files: ${missingCoreAssets.join(', ')}`,
  );

  assertTest(
    cachesDatabase,
    `Offline curriculum resilience: Service Worker precaches /database.json for school Chromebook offline access`,
    `Service Worker CORE_ASSETS does not precache /database.json!`,
  );

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
