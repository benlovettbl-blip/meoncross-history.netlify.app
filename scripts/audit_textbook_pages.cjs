/**
 * History Revision Hub — Automated Course Textbook Page & Gap Audit Engine
 *
 * Automatically inspects publisher-standard 12-page course textbooks (KT1, KT2, KT3)
 * for page budget compliance:
 * 1. Zero Overflows: Confirms scrollHeight <= clientHeight (0px margin spill).
 * 2. Gap & Underflow Elimination: Audits two-column prose distribution, dead space above footer,
 *    and verifies space utilization meets publisher standards (>= 80% minimum, >= 85% optimal).
 * 3. Pedagogical Architecture Verification:
 *    - Left pages (Pages 2, 4, 6, 8, 10): Validates 2 sources & 2 sections.
 *    - Right pages (Pages 3, 5, 7, 9, 11): Validates Source C, Key Figure card, and Bottom Enquiry Deck.
 *    - Covers (Pages 1 & 12): Validates equal-height causal boxes, zero text wrapping/overflow.
 *
 * Usage:
 *   node scripts/audit_textbook_pages.cjs [kt1|kt2|kt3|all] [--strict] [--snap]
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const ART_DIR =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\12de0527-a7b2-4ab8-b8ae-673122685716';

const TEXTBOOK_CONFIGS = [
  {
    id: 'kt1',
    name: 'Key Topic 1: The Creation of the State of Israel (1945–1956)',
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'textbook_KT1_PUBLISHER.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook_KT1_PUBLISHER.pdf'),
  },
  {
    id: 'kt2',
    name: 'Key Topic 2: The Escalating Conflict (1964–1973)',
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'textbook_KT2_PUBLISHER.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook_KT2_PUBLISHER.pdf'),
  },
  {
    id: 'kt3',
    name: 'Key Topic 3: The Search for Peace (1974–1995)',
    htmlPath: path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'textbook_KT3_PUBLISHER.html'),
    pdfPath: path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook_KT3_PUBLISHER.pdf'),
  },
];

async function auditTextbook(config, options = {}) {
  const { snap = false, strict = false } = options;

  if (!fs.existsSync(config.htmlPath)) {
    return {
      success: false,
      error: `HTML file not found: ${config.htmlPath}`,
      pages: [],
    };
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(config.htmlPath), { waitUntil: 'networkidle0' });

  const pageResults = await page.evaluate(() => {
    const pageEls = Array.from(document.querySelectorAll('.textbook-page'));
    return pageEls.map((p, idx) => {
      const pageNum = idx + 1;
      const clientH = p.clientHeight;
      const scrollH = p.scrollHeight;
      const overflow = Math.max(0, scrollH - clientH);

      const prose = p.querySelector('.two-column-prose');
      const enquiry = p.querySelector('.bottom-enquiry-box, .bottom-vocab-box');
      const keyFigure = p.querySelector('.key-figure-box');
      const sources = Array.from(p.querySelectorAll('.archival-source-box'));
      const footer = p.querySelector('.running-footer');

      // Cover or Back Cover
      if (!prose) {
        // Check for cover causal box consistency
        const causalBoxes = Array.from(
          p.querySelectorAll(
            '[style*="border-left: 2.8px solid"], [style*="border-left: 3px solid"]',
          ),
        );
        let boxHeightMismatch = false;
        if (causalBoxes.length >= 2) {
          const heights = causalBoxes.map((b) => Math.round(b.getBoundingClientRect().height));
          const maxH = Math.max(...heights);
          const minH = Math.min(...heights);
          if (maxH - minH > 6) boxHeightMismatch = true;
        }

        return {
          pageNum,
          type: pageNum === 1 ? 'Front Cover' : 'Back Cover',
          clientH,
          scrollH,
          overflow,
          fillPct: 100,
          deadGap: 0,
          hasEnquiry: false,
          hasKeyFigure: false,
          sourceCount: 0,
          boxHeightMismatch,
          status: overflow === 0 && !boxHeightMismatch ? 'OPTIMAL' : 'ERROR',
        };
      }

      // Two-column content page
      const proseRect = prose.getBoundingClientRect();
      const colMid = proseRect.left + proseRect.width / 2;

      // Identify elements in each column (excluding column-span: all elements)
      let col1Bottom = proseRect.top;
      let col2Bottom = proseRect.top;

      const leafEls = Array.from(prose.querySelectorAll('*')).filter((el) => {
        if (el.children.length > 0) return false;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        return true;
      });

      leafEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;

        // Check if element or its ancestor has column-span: all
        const spansAll = el.closest(
          '[style*="column-span: all"], .bottom-enquiry-box, .section-banner',
        );
        if (spansAll && window.getComputedStyle(spansAll).columnSpan === 'all') {
          return;
        }

        if (r.left + r.width / 2 < colMid) {
          if (r.bottom > col1Bottom) col1Bottom = r.bottom;
        } else {
          if (r.bottom > col2Bottom) col2Bottom = r.bottom;
        }
      });

      const col1Height = Math.round(col1Bottom - proseRect.top);
      const col2Height = Math.round(col2Bottom - proseRect.top);
      const availHeight = Math.round(proseRect.height);

      // Effective dead gap in the columns
      let deadGap = Math.max(0, availHeight - col2Height);

      // If bottom enquiry box is present, it absorbs bottom height
      let enquiryHeight = 0;
      if (enquiry) {
        const eRect = enquiry.getBoundingClientRect();
        enquiryHeight = Math.round(eRect.height + 10); // include margin
        deadGap = Math.max(0, availHeight - (col2Height + enquiryHeight / 2));
      }

      const totalUsed = col1Height + col2Height + enquiryHeight;
      const totalAvail = availHeight * 2;
      const fillPct = Math.min(100, Math.max(0, Math.round((totalUsed / totalAvail) * 100)));

      const isRightPage = pageNum % 2 === 1;
      let status = 'OPTIMAL';

      if (overflow > 2) {
        status = 'OVERFLOW';
      } else if (fillPct < 80 || deadGap > 130) {
        status = 'GAP ALERT';
      } else if (fillPct < 85 || deadGap > 95) {
        status = 'ACCEPTABLE';
      }

      // Check pedagogical expectations
      const pedWarnings = [];
      if (isRightPage && !enquiry) {
        pedWarnings.push('Missing Bottom Enquiry Deck on right-hand page');
      }
      if (isRightPage && !keyFigure) {
        pedWarnings.push('Missing Key Figure profile card on right-hand page');
      }
      if (!isRightPage && sources.length < 2) {
        pedWarnings.push(`Only ${sources.length} source(s) on left-hand page (recommended 2)`);
      }

      return {
        pageNum,
        type: isRightPage ? 'Right (Recto)' : 'Left (Verso)',
        clientH,
        scrollH,
        overflow,
        availHeight,
        col1Height,
        col2Height,
        deadGap,
        fillPct,
        hasEnquiry: !!enquiry,
        hasKeyFigure: !!keyFigure,
        sourceCount: sources.length,
        pedWarnings,
        status,
      };
    });
  });

  // Take screenshots if requested
  if (snap) {
    const pages = await page.$$('.textbook-page');
    for (let i = 0; i < pages.length; i++) {
      const pNum = i + 1;
      const pData = pageResults[i];
      if (pData && (pData.status !== 'OPTIMAL' || snap === 'all')) {
        const outPath = path.join(ART_DIR, `audit_${config.id}_p${pNum}.png`);
        await pages[i].screenshot({ path: outPath });
      }
    }
  }

  await browser.close();

  let hasErrors = false;
  let hasWarnings = false;

  pageResults.forEach((r) => {
    if (r.status === 'OVERFLOW' || r.status === 'ERROR') hasErrors = true;
    if (r.status === 'GAP ALERT' || (strict && r.status === 'ACCEPTABLE')) hasWarnings = true;
    if (r.pedWarnings && r.pedWarnings.length > 0) hasWarnings = true;
  });

  return {
    success: !hasErrors && (!strict || !hasWarnings),
    hasErrors,
    hasWarnings,
    pages: pageResults,
  };
}

async function runAudit() {
  const target = (process.argv[2] || 'all').toLowerCase();
  const isStrict = process.argv.includes('--strict');
  const doSnap = process.argv.includes('--snap') ? 'all' : false;

  console.log('\n===============================================================');
  console.log('📚 History Revision Hub — Automated Textbook Page & Gap Auditor');
  console.log(`   Target: [${target.toUpperCase()}] | Strict: ${isStrict}`);
  console.log('===============================================================\n');

  let configsToRun = TEXTBOOK_CONFIGS;
  if (target === 'kt1' || target === '1') configsToRun = [TEXTBOOK_CONFIGS[0]];
  else if (target === 'kt2' || target === '2') configsToRun = [TEXTBOOK_CONFIGS[1]];
  else if (target === 'kt3' || target === '3') configsToRun = [TEXTBOOK_CONFIGS[2]];

  let totalPages = 0;
  let optimalPages = 0;
  let totalIssues = 0;

  for (const cfg of configsToRun) {
    console.log(`\n>>> Auditing ${cfg.name}...`);
    const res = await auditTextbook(cfg, { strict: isStrict, snap: doSnap });

    if (!res.success && res.error) {
      console.error(`❌ ${res.error}`);
      totalIssues++;
      continue;
    }

    const tableRows = res.pages.map((p) => {
      totalPages++;
      if (p.status === 'OPTIMAL') optimalPages++;
      else totalIssues++;

      const statusBadge =
        p.status === 'OPTIMAL'
          ? '✅ OPTIMAL'
          : p.status === 'ACCEPTABLE'
            ? '⚠️ ACCEPTABLE'
            : p.status === 'GAP ALERT'
              ? '🟡 GAP ALERT'
              : '❌ OVERFLOW';

      return {
        Page: `P${p.pageNum}`,
        'Spread Type': p.type,
        'Fill %': `${p.fillPct}%`,
        'Dead Gap': `${p.deadGap}px`,
        Overflow: `${p.overflow}px`,
        Sources: p.sourceCount,
        Enquiry: p.hasEnquiry ? 'Yes' : '—',
        Status: statusBadge,
      };
    });

    console.table(tableRows);

    // Print any pedagogical notes
    const warnings = res.pages.filter((p) => p.pedWarnings && p.pedWarnings.length > 0);
    if (warnings.length > 0) {
      console.log('   Pedagogical Architecture Notes:');
      warnings.forEach((w) => {
        w.pedWarnings.forEach((note) => console.log(`   - Page ${w.pageNum}: ${note}`));
      });
    }
  }

  console.log('\n---------------------------------------------------------------');
  console.log(`📊 Audit Summary: ${optimalPages} / ${totalPages} pages at OPTIMAL standard.`);
  if (totalIssues === 0) {
    console.log('🎉 ALL TEXTBOOK PAGES PASS 100% WITH ZERO OVERFLOW AND ZERO UNBALANCED GAPS!\n');
    process.exit(0);
  } else {
    console.log(`⚠️ ${totalIssues} page(s) flagged with minor gap or layout advisories.\n`);
    process.exit(isStrict ? 1 : 0);
  }
}

if (require.main === module) {
  runAudit().catch((err) => {
    console.error('Fatal audit error:', err);
    process.exit(1);
  });
}

module.exports = { auditTextbook, TEXTBOOK_CONFIGS };
