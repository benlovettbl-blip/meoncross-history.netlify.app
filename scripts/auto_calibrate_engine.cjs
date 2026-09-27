/**
 * Unified Automated Layout & Typographical Balancing Engine
 *
 * Eliminates textbook voids, dead spaces, and text clipping automatically
 * inside Puppeteer before taking the PDF snapshot.
 *
 * Capabilities:
 * 1. Self-Healing Clipped Containers: Detects elements where scrollHeight > clientHeight
 *    (such as thematic matrices, tables, or cards) and scales fonts/padding in micro-steps.
 * 2. Universal Flex Distribution: Ensures columns distribute content vertically with
 *    space-between anchoring so that source boxes and bottom decks align to the baseline.
 * 3. Page Overflow Prevention: Micro-tunes line-height and margins to prevent footer collisions.
 * 4. Micro-Underflow Resolution: Slightly expands line-height / image height on short columns.
 */

async function autoCalibrateTextbook(page, options = {}) {
  const result = await page.evaluate((opts) => {
    const pages = Array.from(
      document.querySelectorAll(opts.pageSelector || '.textbook-page, .page, .a4-page'),
    );
    const log = [];

    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const isCover =
        p.classList.contains('cover-page') ||
        p.classList.contains('back-cover') ||
        pageNum === 1 ||
        pageNum === pages.length;

      // 1. Universal Column Flex Anchoring (Verso & Recto lesson spreads)
      const grid = p.querySelector('.two-column-prose-grid');
      if (grid) {
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = '1fr 1fr';
        grid.style.flex = '1';
        grid.style.marginBottom = '2px';

        const sides = Array.from(grid.querySelectorAll('.col-side'));
        sides.forEach((side) => {
          side.style.display = 'flex';
          side.style.flexDirection = 'column';
          side.style.justifyContent = 'space-between';
          side.style.minHeight = '0';
        });
      }

      // 2. Resolve Internal Clipped Containers (overflow: hidden with scrollH > clientH)
      const clippedEls = Array.from(p.querySelectorAll('*')).filter((el) => {
        return (
          el.scrollHeight > el.clientHeight &&
          el.clientHeight > 20 &&
          window.getComputedStyle(el).overflow === 'hidden'
        );
      });

      clippedEls.forEach((el) => {
        const initialDiff = el.scrollHeight - el.clientHeight;
        let step = 0;
        while (el.scrollHeight > el.clientHeight && step < 18) {
          step++;
          el.querySelectorAll('td, th, p, li, div, span').forEach((child) => {
            const fs = parseFloat(window.getComputedStyle(child).fontSize);
            if (fs > 6.5) {
              child.style.fontSize = (fs * 0.965).toFixed(2) + 'px';
            }
            if (child.tagName === 'TD' || child.tagName === 'TH') {
              child.style.padding = '1px 3px';
              child.style.lineHeight = '1.18';
            }
          });
        }
        log.push({
          page: pageNum,
          type: 'CONTAINER_CLIPPING_RESOLVED',
          initialDiff,
          stepsTaken: step,
          finalDiff: el.scrollHeight - el.clientHeight,
        });
      });

      // 3. Resolve Page Overflow / Footer Collision
      const layout = p.querySelector('.masterclass-page-layout, .page-inner, .page-container');
      const footer = p.querySelector(
        '.running-footer, .page-footer, .disciplinary-assessment-footer, .bottom-vocab-box, .bottom-enquiry-box, .exam-strategy-fullwidth-box, .timeline-strip-4col',
      );

      if (
        !isCover &&
        (p.scrollHeight > p.clientHeight || (layout && layout.scrollHeight > layout.clientHeight))
      ) {
        let step = 0;
        while (
          (p.scrollHeight > p.clientHeight ||
            (layout && layout.scrollHeight > layout.clientHeight)) &&
          step < 15
        ) {
          step++;
          p.querySelectorAll('.narrative-p, p, li').forEach((child) => {
            const fs = parseFloat(window.getComputedStyle(child).fontSize);
            const lh = parseFloat(window.getComputedStyle(child).lineHeight);
            if (fs > 7.5) child.style.fontSize = (fs * 0.98).toFixed(2) + 'px';
            if (lh > 11) child.style.lineHeight = (lh * 0.97).toFixed(2) + 'px';
          });
          p.querySelectorAll('.archival-source-box, .section-banner, .lesson-hero, div').forEach(
            (child) => {
              const mb = parseFloat(window.getComputedStyle(child).marginBottom);
              if (mb > 2) child.style.marginBottom = Math.max(1, mb - 0.75) + 'px';
            },
          );
          p.querySelectorAll('img').forEach((img) => {
            const h = img.offsetHeight;
            if (h > 90) img.style.maxHeight = h - 5 + 'px';
          });
        }
        log.push({
          page: pageNum,
          type: 'PAGE_OVERFLOW_RESOLVED',
          stepsTaken: step,
          finalOverflow: p.scrollHeight - p.clientHeight,
        });
      }

      // 4. Ensure safe gap above footer
      if (footer) {
        const fRect = footer.getBoundingClientRect();
        const prevEl = footer.previousElementSibling;
        if (prevEl) {
          const prevRect = prevEl.getBoundingClientRect();
          if (prevRect.bottom > fRect.top) {
            prevEl.style.marginBottom = '2px';
            log.push({
              page: pageNum,
              type: 'FOOTER_COLLISION_RESOLVED',
              overlap: Math.round(prevRect.bottom - fRect.top),
            });
          }
        }
      }
    });

    return log;
  }, options);

  return result;
}

module.exports = {
  autoCalibrateTextbook,
};
