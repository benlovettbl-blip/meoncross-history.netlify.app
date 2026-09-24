/**
 * audit_page_budget.cjs
 *
 * Universal Page Budget, Space Utilization & Cognitive Clutter Audit engine.
 * Inspects any loaded Puppeteer page and audits:
 * 1. Cognitive Clutter: Enforces 0 banned teacher-jargon / fake-badge strings
 * 2. Overflows: Content spilling outside container boundaries (scrollH > clientH or element.bottom > page.bottom)
 * 3. Void Gaps Above Footer: Enforces max 25px gap between content and footer
 * 4. Inter-Task Voids: Enforces max 35px gap between adjacent task blocks
 * 5. Space Utilization %: Precise metric of page budget consumption
 *
 * Compatible with:
 * - A5 Saddle-Stitch Booklets (.a5-page)
 * - A4 Pupil Workbooks & Worksheets (.page, .a4-page)
 * - Landscape Spread Guides (.page-landscape)
 */

const fs = require('fs');
const path = require('path');

const BANNED_PUPIL_FLUFF = [
  { regex: /BA-KOBLENZ/i, label: 'BA-KOBLENZ fake archive code' },
  { regex: /ACCESSION\s+RECORD/i, label: 'ACCESSION RECORD fake accession stamp' },
  { regex: /BA\s*183-RECORD/i, label: 'BA 183-RECORD fake shelfmark' },
  { regex: /GStA-RECORD/i, label: 'GStA-RECORD fake shelfmark' },
  { regex: /textbook-cite(-badge)?/i, label: 'textbook-cite badge or class' },
  { regex: /\([Pp][0-9]+([.–\-–][0-9]+)?\)/, label: 'cryptic paragraph reference (e.g. (P1-P3))' },
  { regex: /\[[Pp][0-9]+([.–\-–][0-9]+)?\]/, label: 'cryptic paragraph reference (e.g. [P1.2])' },
  { regex: /Analytical\s+Distinction/i, label: 'Analytical Distinction teacher taxonomy label' },
  { regex: /Vocabulary\s+Mapping/i, label: 'Vocabulary Mapping teacher taxonomy label' },
  { regex: /EXAM\s+MASTERY/i, label: 'EXAM MASTERY teacher taxonomy label' },
  { regex: /HISTORICAL\s+CAUSALITY/i, label: 'HISTORICAL CAUSALITY teacher taxonomy label' },
  { regex: /Forensic\s+Causation/i, label: 'Forensic Causation teacher taxonomy label' },
];

/**
 * Fast static scanner for cognitive clutter strings in HTML/text
 * @param {string} content - Raw HTML or file content
 * @returns {{ clean: boolean, violations: string[] }}
 */
function lintCognitiveClutter(content) {
  const violations = [];
  // Strip <script> and <style> tags to avoid false positives on CSS/JS definitions
  const stripped = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  for (const item of BANNED_PUPIL_FLUFF) {
    if (item.regex.test(stripped)) {
      violations.push(item.label);
    }
  }

  return {
    clean: violations.length === 0,
    violations,
  };
}

/**
 * Executes DOM budget & clutter audit inside a Puppeteer page
 * @param {import('puppeteer').Page} page
 * @param {Object} options
 * @returns {Promise<{ totalPages: number, hasErrors: boolean, hasWarnings: boolean, results: Array }>}
 */
async function auditPageBudget(page, options = {}) {
  const {
    underflowThresholdPx = 40,
    minUtilizationPct = 80,
    maxGapAboveFooterPx = 25,
    maxInterTaskGapPx = 35,
    pageSelector = '.a5-page, .page, .page-landscape, .a4-page',
  } = options;

  // Pass serialization-safe pattern definitions
  const bannedList = BANNED_PUPIL_FLUFF.map((b) => ({
    source: b.regex.source,
    flags: b.regex.flags,
    label: b.label,
  }));

  return await page.evaluate(
    ({
      pageSelector,
      underflowThresholdPx,
      minUtilizationPct,
      maxGapAboveFooterPx,
      maxInterTaskGapPx,
      bannedList,
    }) => {
      const pageNodes = document.querySelectorAll(pageSelector);
      const results = [];
      let hasErrors = false;
      let hasWarnings = false;

      const compiledPatterns = bannedList.map((b) => ({
        regex: new RegExp(b.source, b.flags),
        label: b.label,
      }));

      if (pageNodes.length > 0) {
        pageNodes.forEach((p, idx) => {
          const pageNum = idx + 1;
          const clientH = p.clientHeight || Math.round(p.getBoundingClientRect().height);
          const scrollH = p.scrollHeight;
          const pRect = p.getBoundingClientRect();

          // 1. Cognitive Clutter Audit
          const clutterViolations = [];
          // Inspect page HTML excluding scripts and styles
          const clone = p.cloneNode(true);
          clone.querySelectorAll('script, style, link').forEach((el) => el.remove());
          const pageHtml = clone.innerHTML;
          for (const item of compiledPatterns) {
            if (item.regex.test(pageHtml)) {
              clutterViolations.push(item.label);
            }
          }

          // 2. Physical Overflow Audit
          let overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;
          let maxChildBottom = pRect.top;
          let childOverflow = 0;
          const children = p.querySelectorAll('*');
          children.forEach((el) => {
            if (
              el.style.display === 'none' ||
              el.tagName === 'SCRIPT' ||
              el.tagName === 'STYLE' ||
              el.tagName === 'LINK'
            ) {
              return;
            }
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
              if (r.bottom > pRect.bottom + 4) {
                childOverflow = Math.max(childOverflow, Math.round(r.bottom - pRect.bottom));
              }
              if (r.bottom <= pRect.bottom + 2 && r.bottom > maxChildBottom) {
                maxChildBottom = r.bottom;
              }
            }
          });
          const totalOverflow = Math.max(overflow, childOverflow);

          // 2b. Internal Container Text Clipping & Truncation Audit
          // Inspects all cards, boxes, and sub-elements with overflow: hidden or restricted height
          const clippedElements = [];
          children.forEach((el) => {
            if (
              el.style.display === 'none' ||
              el.tagName === 'SCRIPT' ||
              el.tagName === 'STYLE' ||
              el.tagName === 'LINK'
            ) {
              return;
            }
            if (
              el.matches(
                '.page, .a5-page, .page-landscape, .a4-page, .sheet-page, .textbook-page, .page-container',
              )
            ) {
              return;
            }

            const style = window.getComputedStyle(el);
            const isHiddenY = style.overflowY === 'hidden' || style.overflow === 'hidden';
            if (isHiddenY) {
              const diff = el.scrollHeight - el.clientHeight;
              // Tolerance of 2px accounts for sub-pixel anti-aliasing / border rasterization
              if (diff > 2 && el.clientHeight > 0) {
                const text = (el.innerText || el.textContent || '')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .slice(0, 45);
                clippedElements.push({
                  tag: el.tagName.toLowerCase(),
                  className: el.className ? `.${el.className.split(' ').join('.')}` : '',
                  clippedPx: Math.round(diff),
                  textSnippet: text,
                });
              }
            }
          });
          const isTextClipped = clippedElements.length > 0;

          // 3. Gap Above Footer & Page Bottom Underflow Audit
          const footer =
            p.querySelector('.page-footer-strip') ||
            p.querySelector('.page-footer') ||
            p.querySelector('.footer-strip') ||
            p.querySelector('.grading-footer') ||
            p.querySelector('.cover-footer') ||
            p.querySelector(
              '.footer, [class*="footer"]:not(.archival-footer):not(.bqr-footer):not(.source-footer)',
            );
          let unusedBottom = 0;
          let gapAboveFooter = 0;
          let footerCollisionPx = 0;
          let collidingElementDesc = '';

          if (footer) {
            const fRect = footer.getBoundingClientRect();
            unusedBottom = Math.max(0, Math.round(pRect.bottom - fRect.bottom));

            // Inspect all content elements for footer collision or overlap
            const allContentElements = Array.from(p.querySelectorAll('*')).filter((el) => {
              if (el === footer || footer.contains(el)) return false;
              if (el.contains(footer)) return false;
              if (['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName)) return false;
              if (el.style.display === 'none') return false;
              if (
                el.matches(
                  '.page, .page-container, .a4-page, .a5-page, .page-landscape, .sheet-page, .textbook-page, .back-body-content, .back-container, .page-inner, .page-body-full, .page-flex-full, .page-body-stretch, .two-column-prose',
                )
              ) {
                return false;
              }
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0;
            });

            allContentElements.forEach((el) => {
              const r = el.getBoundingClientRect();
              if (r.bottom > fRect.top + 1.5) {
                const diff = Math.round(r.bottom - fRect.top);
                if (diff > footerCollisionPx) {
                  footerCollisionPx = diff;
                  collidingElementDesc = `<${el.tagName.toLowerCase()}${el.className ? '.' + el.className.split(' ').join('.') : ''}> "${(el.textContent || '').trim().slice(0, 35)}"`;
                }
              }
            });

            // Measure gap between footer top and the lowest content element above it
            const contentElementsAboveFooter = allContentElements.filter((el) => {
              const r = el.getBoundingClientRect();
              return r.bottom <= fRect.top + 2;
            });

            if (contentElementsAboveFooter.length > 0) {
              const maxContentBottomAboveFooter = Math.max(
                ...contentElementsAboveFooter.map((el) => el.getBoundingClientRect().bottom),
              );
              gapAboveFooter = Math.max(0, Math.round(fRect.top - maxContentBottomAboveFooter));
            }
          } else if (maxChildBottom > pRect.top) {
            unusedBottom = Math.max(0, Math.round(pRect.bottom - maxChildBottom));
            gapAboveFooter = unusedBottom;
          }

          // 4. Inter-Task Void Audit (Measure vertical distance between consecutive task blocks)
          let maxInterTaskGap = 0;
          const bodyContainer =
            p.querySelector(
              '.page-body-full, .page-flex-full, .page-body-stretch, .page-inner, .back-body-content',
            ) || p;
          const directChildren = Array.from(bodyContainer.children).filter((el) => {
            if (['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName)) return false;
            if (el.style.display === 'none') return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
          });

          for (let i = 0; i < directChildren.length - 1; i++) {
            const current = directChildren[i];
            const next = directChildren[i + 1];
            // If next element is the footer, it is handled by gapAboveFooter
            if (next === footer || (footer && footer.contains(next))) continue;

            const rCurrent = current.getBoundingClientRect();
            const rNext = next.getBoundingClientRect();
            const vGap = Math.max(0, Math.round(rNext.top - rCurrent.bottom));
            maxInterTaskGap = Math.max(maxInterTaskGap, vGap);
          }

          // 5. Internal Multi-Column Prose Void Audit
          let internalProseGap = 0;
          const prose = p.querySelector('.two-column-prose');
          if (prose) {
            const proseRect = prose.getBoundingClientRect();
            const nextSection = prose.nextElementSibling;
            const leaves = Array.from(prose.querySelectorAll('*')).filter(
              (el) =>
                !['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName) &&
                el.style.display !== 'none' &&
                el.children.length === 0 &&
                el.getBoundingClientRect().height > 0,
            );
            if (leaves.length > 0) {
              const maxLeafBottom = Math.max(
                ...leaves.map((el) => el.getBoundingClientRect().bottom),
              );
              const nextTop = nextSection
                ? nextSection.getBoundingClientRect().top
                : proseRect.bottom;
              internalProseGap = Math.max(0, Math.round(nextTop - maxLeafBottom));
            }
          }

          // 6. Back Cover Inter-Section Gap & Bottom Void Audit
          let maxSectionGap = 0;
          let backCoverBottomVoid = 0;
          const backSections = Array.from(p.querySelectorAll('.back-body-content > div'));
          if (backSections.length > 1) {
            for (let s = 0; s < backSections.length - 1; s++) {
              const r1 = backSections[s].getBoundingClientRect();
              const r2 = backSections[s + 1].getBoundingClientRect();
              const sGap = Math.max(0, Math.round(r2.top - r1.bottom));
              maxSectionGap = Math.max(maxSectionGap, sGap);
            }
          }
          if (backSections.length > 0 && footer) {
            const lastSection = backSections[backSections.length - 1];
            const rLast = lastSection.getBoundingClientRect();
            const rFooter = footer.getBoundingClientRect();
            backCoverBottomVoid = Math.max(0, Math.round(rFooter.top - rLast.bottom));
          }

          const utilizationPct =
            clientH > 0
              ? Math.min(100, Math.max(0, Math.round(((clientH - unusedBottom) / clientH) * 100)))
              : 100;

          const isFooterCollision = footerCollisionPx > 0;
          const isOverflow = totalOverflow > 0 || isFooterCollision;
          const isUnderflow =
            !isOverflow &&
            unusedBottom > underflowThresholdPx &&
            utilizationPct < minUtilizationPct;
          const isVoidFooter = gapAboveFooter > maxGapAboveFooterPx;
          const isVoidInterTask = maxInterTaskGap > maxInterTaskGapPx;
          const isVoidInternalProse = internalProseGap > 35;
          const isVoidSection = maxSectionGap > 25;
          const isVoidBackCover = backCoverBottomVoid > 35;
          const isClutterError = clutterViolations.length > 0;

          if (
            isOverflow ||
            isFooterCollision ||
            isClutterError ||
            isVoidFooter ||
            isVoidInterTask ||
            isVoidInternalProse ||
            isVoidSection ||
            isVoidBackCover ||
            isTextClipped
          ) {
            hasErrors = true;
          }
          if (isUnderflow) {
            hasWarnings = true;
          }

          results.push({
            pageNum,
            clientH,
            scrollH,
            overflow: Math.max(totalOverflow, footerCollisionPx),
            footerCollisionPx,
            collidingElementDesc,
            isFooterCollision,
            unusedBottom,
            gapAboveFooter,
            maxInterTaskGap,
            internalProseGap,
            maxSectionGap,
            backCoverBottomVoid,
            utilizationPct,
            isOverflow,
            isUnderflow,
            isVoidFooter,
            isVoidInterTask,
            isVoidInternalProse,
            isVoidSection,
            isVoidBackCover,
            isClutterError,
            clutterViolations,
            isTextClipped,
            clippedElements,
            pageId: p.id || `Page ${pageNum}`,
          });
        });
      } else {
        // Fallback for continuous flowing documents
        const bodyH = document.body.scrollHeight;
        const viewportH = window.innerHeight || 842;
        const estPages = Math.ceil(bodyH / viewportH) || 1;
        results.push({
          pageNum: 1,
          clientH: viewportH,
          scrollH: bodyH,
          overflow: 0,
          unusedBottom: 0,
          gapAboveFooter: 0,
          maxInterTaskGap: 0,
          utilizationPct: 100,
          isOverflow: false,
          isUnderflow: false,
          isVoidFooter: false,
          isVoidInterTask: false,
          isClutterError: false,
          clutterViolations: [],
          pageId: `Continuous (${estPages} estimated pages)`,
        });
      }

      return {
        totalPages: results.length,
        hasErrors,
        hasWarnings,
        results,
      };
    },
    {
      pageSelector,
      underflowThresholdPx,
      minUtilizationPct,
      maxGapAboveFooterPx,
      maxInterTaskGapPx,
      bannedList,
    },
  );
}

/**
 * Prints a formatted space and clutter audit report to console
 * @param {{ totalPages: number, hasErrors: boolean, hasWarnings: boolean, results: Array }} audit
 * @param {string} title
 */
function printSpaceAuditReport(audit, title = 'DOCUMENT') {
  console.log('\n=============================================================');
  console.log(`📐 AUTOMATED PAGE BUDGET & COGNITIVE CLUTTER AUDIT: ${title}`);
  console.log('=============================================================');

  audit.results.forEach((res) => {
    const issues = [];
    if (res.isClutterError) {
      issues.push(`❌ CLUTTER [${res.clutterViolations.join(', ')}]`);
    }
    if (res.isFooterCollision) {
      issues.push(
        `❌ FOOTER COLLISION (+${res.footerCollisionPx}px into footer by ${res.collidingElementDesc})`,
      );
    } else if (res.isOverflow) {
      issues.push(`❌ OVERFLOW (+${res.overflow}px)`);
    }
    if (res.isTextClipped) {
      const snippets = res.clippedElements
        .map((c) => `"${c.textSnippet}" (-${c.clippedPx}px)`)
        .join(', ');
      issues.push(`❌ TEXT CLIPPED [${snippets}]`);
    }
    if (res.isVoidFooter) {
      issues.push(`❌ VOID FOOTER (${res.gapAboveFooter}px > 25px max)`);
    }
    if (res.isVoidInterTask) {
      issues.push(`❌ INTER-TASK VOID (${res.maxInterTaskGap}px > 35px max)`);
    }
    if (res.isVoidInternalProse) {
      issues.push(`❌ INTERNAL PROSE VOID (${res.internalProseGap}px > 35px max)`);
    }
    if (res.isVoidSection) {
      issues.push(`❌ SECTION GAP (${res.maxSectionGap}px > 25px max)`);
    }
    if (res.isVoidBackCover) {
      issues.push(`❌ BACK COVER BOTTOM VOID (${res.backCoverBottomVoid}px > 35px max)`);
    }
    if (res.isUnderflow && !res.isVoidFooter) {
      issues.push(`⚠️ UNDERFLOW (${res.utilizationPct}% utilized, ${res.unusedBottom}px gap)`);
    }

    let status =
      issues.length > 0
        ? issues.join(' | ')
        : `✅ OPTIMAL (${res.utilizationPct}% utilized, footer gap: ${res.gapAboveFooter}px, max task void: ${res.maxInterTaskGap}px)`;

    const label = String(res.pageId).startsWith('Page')
      ? res.pageId
      : `Page ${String(res.pageNum).padStart(2, ' ')} (${res.pageId})`;
    console.log(`${label.padEnd(26, ' ')}: ${status}`);
  });

  console.log('=============================================================');
  if (audit.hasErrors) {
    console.warn(`❌ Audit Failed: Critical errors / cognitive clutter detected in ${title}!`);
  } else if (audit.hasWarnings) {
    console.log(`ℹ️ Audit Passed with minor underflow notes in ${title}.`);
  } else {
    console.log(`✅ Audit Passed: 100% clean across all ${audit.totalPages} pages in ${title}!`);
  }
  console.log('=============================================================\n');
}

// ============================================================================
// CLI RUNNER
// ============================================================================
if (require.main === module) {
  const args = process.argv.slice(2);
  const isClutterOnly = args.includes('--clutter-only');
  const isStrict = args.includes('--strict');
  const pathArgs = args.filter((a) => !a.startsWith('--'));

  if (pathArgs.length === 0 && !isClutterOnly) {
    console.log(
      'Usage: node scripts/audit_page_budget.cjs <html-file-or-dir>... [--clutter-only] [--strict]',
    );
    process.exit(0);
  }

  // Default target for --clutter-only if none specified
  const targets =
    pathArgs.length > 0
      ? pathArgs
      : [
          path.join(__dirname, '..', 'public', 'units', 'weimar_nazi_germany'),
          path.join(__dirname, '..', 'public', 'units', 'eee'),
          path.join(__dirname, '..', 'public', 'units', 'cme_new'),
        ];

  if (isClutterOnly) {
    // Fast static scan mode for pre-commit
    let totalFiles = 0;
    let totalViolations = 0;

    function scanFile(filePath) {
      if (!filePath.endsWith('.html')) return;
      totalFiles++;
      const content = fs.readFileSync(filePath, 'utf8');
      const lint = lintCognitiveClutter(content);
      if (!lint.clean) {
        totalViolations += lint.violations.length;
        console.error(`❌ Cognitive Clutter Found in ${path.relative(process.cwd(), filePath)}:`);
        lint.violations.forEach((v) => console.error(`   - ${v}`));
      }
    }

    function scanDir(dirPath) {
      if (!fs.existsSync(dirPath)) return;
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        const full = path.join(dirPath, item);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          scanDir(full);
        } else if (stat.isFile() && item.includes('pupil_workbook') && item.endsWith('.html')) {
          scanFile(full);
        }
      }
    }

    for (const t of targets) {
      const resolved = path.resolve(t);
      if (!fs.existsSync(resolved)) continue;
      const stat = fs.statSync(resolved);
      if (stat.isDirectory()) {
        scanDir(resolved);
      } else if (stat.isFile()) {
        scanFile(resolved);
      }
    }

    if (totalViolations > 0) {
      console.error(
        `\n❌ Cognitive Clutter Audit Failed: ${totalViolations} violations in ${totalFiles} scanned files.`,
      );
      process.exit(1);
    } else {
      console.log(
        `✅ Cognitive Clutter Audit Passed: 0 violations across all ${totalFiles} scanned workbooks.`,
      );
      process.exit(0);
    }
  } else {
    // Single file Puppeteer audit (legacy/individual)
    const targetPath = targets[0];
    const resolved = path.resolve(targetPath);
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      const content = fs.readFileSync(resolved, 'utf8');
      const lint = lintCognitiveClutter(content);
      if (!lint.clean) {
        console.error(`❌ Cognitive Clutter Found in ${path.basename(resolved)}:`);
        lint.violations.forEach((v) => console.error(`   - ${v}`));
        process.exit(1);
      } else {
        console.log(`✅ Clean: 0 cognitive clutter violations in ${path.basename(resolved)}.`);
        process.exit(0);
      }
    }
  }
}

module.exports = {
  BANNED_PUPIL_FLUFF,
  lintCognitiveClutter,
  auditPageBudget,
  printSpaceAuditReport,
};
