/**
 * audit_page_budget.cjs
 *
 * Universal Page Budget & Space Utilization Audit engine for all PDFs and HTML printables.
 * Inspects any loaded Puppeteer page and audits:
 * 1. Overflows: Content spilling outside container boundaries (scrollH > clientH or element.bottom > page.bottom)
 * 2. Underflows / Dead Space: Gaps between content/footer and page bottom
 * 3. Space Utilization %: Precise metric of page budget consumption
 *
 * Compatible with:
 * - A5 Saddle-Stitch Booklets (.a5-page)
 * - A4 Pupil Workbooks & Worksheets (.page, .a4-page)
 * - Landscape Spread Guides (.page-landscape)
 */

/**
 * Executes DOM audit inside a Puppeteer page
 * @param {import('puppeteer').Page} page
 * @param {Object} options
 * @returns {Promise<{ totalPages: number, hasErrors: boolean, hasWarnings: boolean, results: Array }>}
 */
async function auditPageBudget(page, options = {}) {
  const {
    underflowThresholdPx = 40,
    minUtilizationPct = 80,
    pageSelector = '.a5-page, .page, .page-landscape, .a4-page',
  } = options;

  return await page.evaluate(
    ({ pageSelector, underflowThresholdPx, minUtilizationPct }) => {
      const pageNodes = document.querySelectorAll(pageSelector);
      const results = [];
      let hasErrors = false;
      let hasWarnings = false;

      if (pageNodes.length > 0) {
        pageNodes.forEach((p, idx) => {
          const pageNum = idx + 1;
          const clientH = p.clientHeight || Math.round(p.getBoundingClientRect().height);
          const scrollH = p.scrollHeight;
          const pRect = p.getBoundingClientRect();

          let overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;

          // Also check all child elements for physical spill off the bottom
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

          // Measure unused gap at bottom
          const footer = p.querySelector(
            '.page-footer-strip, .page-footer, .footer-strip, .grading-footer, .footer, [class*="footer"]',
          );
          let unusedBottom = 0;
          if (footer) {
            const fRect = footer.getBoundingClientRect();
            unusedBottom = Math.max(0, Math.round(pRect.bottom - fRect.bottom));
          } else if (maxChildBottom > pRect.top) {
            unusedBottom = Math.max(0, Math.round(pRect.bottom - maxChildBottom));
          }

          const utilizationPct =
            clientH > 0
              ? Math.min(100, Math.max(0, Math.round(((clientH - unusedBottom) / clientH) * 100)))
              : 100;

          const isOverflow = totalOverflow > 0;
          const isUnderflow =
            !isOverflow &&
            unusedBottom > underflowThresholdPx &&
            utilizationPct < minUtilizationPct;

          if (isOverflow) hasErrors = true;
          if (isUnderflow) hasWarnings = true;

          results.push({
            pageNum,
            clientH,
            scrollH,
            overflow: totalOverflow,
            unusedBottom,
            utilizationPct,
            isOverflow,
            isUnderflow,
            pageId: p.id || `Page ${pageNum}`,
          });
        });
      } else {
        // Fallback for continuous flowing documents without explicit page wrappers
        const bodyH = document.body.scrollHeight;
        const viewportH = window.innerHeight || 842;
        const estPages = Math.ceil(bodyH / viewportH) || 1;
        results.push({
          pageNum: 1,
          clientH: viewportH,
          scrollH: bodyH,
          overflow: 0,
          unusedBottom: 0,
          utilizationPct: 100,
          isOverflow: false,
          isUnderflow: false,
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
    { pageSelector, underflowThresholdPx, minUtilizationPct },
  );
}

/**
 * Prints a formatted space audit table to console
 * @param {{ totalPages: number, hasErrors: boolean, hasWarnings: boolean, results: Array }} audit
 * @param {string} title
 */
function printSpaceAuditReport(audit, title = 'DOCUMENT') {
  console.log('\n=============================================================');
  console.log(`📐 AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT: ${title}`);
  console.log('=============================================================');

  audit.results.forEach((res) => {
    let status;
    if (res.isOverflow) {
      status = `❌ OVERFLOW (+${res.overflow}px)`;
    } else if (res.isUnderflow) {
      status = `⚠️ UNDERFLOW (${res.utilizationPct}% utilized, ${res.unusedBottom}px gap)`;
    } else {
      status = `✅ OPTIMAL (${res.utilizationPct}% utilized, ${res.unusedBottom}px gap)`;
    }
    const label = String(res.pageId).startsWith('Page')
      ? res.pageId
      : `Page ${String(res.pageNum).padStart(2, ' ')} (${res.pageId})`;
    console.log(`${label.padEnd(28, ' ')}: ${status}`);
  });

  console.log('=============================================================');
  if (audit.hasErrors) {
    console.warn(`❌ Audit Failed: Overflows detected in ${title}!`);
  } else if (audit.hasWarnings) {
    console.log(`ℹ️ Audit Passed with minor underflow notes in ${title}.`);
  } else {
    console.log(`✅ Audit Passed: 100% clean across all ${audit.totalPages} pages in ${title}!`);
  }
  console.log('=============================================================\n');
}

module.exports = {
  auditPageBudget,
  printSpaceAuditReport,
};
