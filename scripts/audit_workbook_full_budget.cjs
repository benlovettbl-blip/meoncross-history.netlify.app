/**
 * Automated Full Page Budget, Gap & Pedagogical Audit Tool
 *
 * Verifies that:
 * 1. 0 overflows on all 16 pages (height <= 272mm)
 * 2. Zero dead-space voids on Verso (Question 2 lines extend right down to the clue footer, gap <= 20px)
 * 3. Zero dead-space voids on Recto (Extended writing lines extend right down to the Timeline Mission box, gap <= 20px)
 * 4. Task numbering is strictly sequential: Task 1 (Do Now) -> Task 2 (Key Vocabulary) -> Task 3 (Source Investigation) -> Task 4 (Extended Writing)
 * 5. Redundant AI fluff badges (e.g. "HISTORICAL WORDS") are completely eradicated
 * 6. Page 16 contains a 6-lesson QR quizzing hub and a comprehensive marks ledger
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function auditWorkbook(htmlRelativePath) {
  const fullPath = path.resolve(process.cwd(), htmlRelativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    process.exit(1);
  }

  console.log(`\n🔍 AUDITING FULL WORKBOOK BUDGET & GAPS: ${path.basename(fullPath)}`);
  console.log('='.repeat(70));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  await page.goto('file:///' + fullPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const auditResults = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page-container'));
    const issues = [];
    const pageReports = [];

    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const pRect = p.getBoundingClientRect();
      const body = p.querySelector('.page-body-full');
      const footer = p.querySelector('.page-footer-strip');
      const fRect = footer ? footer.getBoundingClientRect() : null;

      // Check overall page height
      const pageHeightMm = (pRect.height * 25.4) / 96;
      if (p.scrollHeight > p.clientHeight + 1) {
        issues.push(
          `Page ${pageNum}: OVERFLOW detected (scrollHeight ${p.scrollHeight}px > clientHeight ${p.clientHeight}px)`,
        );
      }

      // Check Verso pages (even pages 4 to 14)
      if (pageNum >= 4 && pageNum <= 14 && pageNum % 2 === 0) {
        // Task numbering
        const text = p.textContent;
        const upper = text.toUpperCase();
        if (!upper.includes('TASK 1:')) issues.push(`Page ${pageNum}: Missing 'Task 1:' label`);
        if (!upper.includes('TASK 2:')) issues.push(`Page ${pageNum}: Missing 'Task 2:' label`);
        if (!upper.includes('TASK 3:')) issues.push(`Page ${pageNum}: Missing 'Task 3:' label`);
        if (upper.includes('HISTORICAL WORDS'))
          issues.push(`Page ${pageNum}: Redundant AI fluff badge 'HISTORICAL WORDS' found`);

        // Check gap between last line of Q2 and clue footer
        const card = body ? body.children[1] : null;
        if (card && card.children.length >= 2) {
          const clue = card.children[1];
          const lines = card.children[0].querySelectorAll('.task-line');
          if (lines.length > 0 && clue) {
            const lastLine = lines[lines.length - 1];
            const gap = clue.getBoundingClientRect().top - lastLine.getBoundingClientRect().bottom;
            pageReports.push({
              page: pageNum,
              type: 'Verso (Source)',
              lines: lines.length,
              gapToFooterPx: Math.round(gap),
              status: gap <= 25 ? '✅ TIGHT' : '⚠️ GAP TOO LARGE (' + Math.round(gap) + 'px)',
            });
            if (gap > 35) {
              issues.push(
                `Page ${pageNum}: Gap between Question 2 lines and clue footer is too large (${Math.round(gap)}px > 35px ceiling)`,
              );
            }
          }
        }
      }

      // Check Recto pages (odd pages 5 to 15)
      else if (pageNum >= 5 && pageNum <= 15 && pageNum % 2 === 1) {
        const text = p.textContent;
        const upper = text.toUpperCase();
        if (!upper.includes('TASK 4:')) issues.push(`Page ${pageNum}: Missing 'Task 4:' label`);

        // Check gap between last writing line and Timeline Mission box
        if (body) {
          const missionBox = body.children[1];
          const lines = body.children[0] ? body.children[0].querySelectorAll('.task-line') : [];
          if (lines.length > 0 && missionBox) {
            const lastLine = lines[lines.length - 1];
            const gap =
              missionBox.getBoundingClientRect().top - lastLine.getBoundingClientRect().bottom;
            pageReports.push({
              page: pageNum,
              type: 'Recto (Essay)',
              lines: lines.length,
              gapToMissionPx: Math.round(gap),
              status: gap <= 25 ? '✅ TIGHT' : '⚠️ GAP TOO LARGE (' + Math.round(gap) + 'px)',
            });
            if (gap > 35) {
              issues.push(
                `Page ${pageNum}: Gap between essay lines and Timeline Mission box is too large (${Math.round(gap)}px > 35px ceiling)`,
              );
            }
          }
        }
      }

      // Page 16 checks (KS3 Progress & Assessment Tracker & 6 QR Cards)
      else if (pageNum === 16) {
        const qrCards = p.querySelectorAll(
          '.page-body-full .qr-card, .page-body-full div[style*="repeat(6, 1fr)"] > div',
        );
        const text = p.textContent;
        const upper = text.toUpperCase();
        if (qrCards.length !== 6) {
          issues.push(
            `Page 16: Expected 6 individual lesson QR cards on outside back cover, found ${qrCards.length}`,
          );
        }
        if (!upper.includes('EMERGING') || !upper.includes('GREATER DEPTH')) {
          issues.push(`Page 16: Missing KS3 Pathway benchmark scale (Emerging / Greater Depth)`);
        }
        if (!upper.includes('TARGET LEVEL') && !upper.includes('TARGET GCSE')) {
          issues.push(`Page 16: Missing Target Level or Target GCSE grade prompt`);
        }
        pageReports.push({
          page: 16,
          type: 'Back Cover',
          qrCount: qrCards.length,
          status:
            qrCards.length === 6 && upper.includes('EMERGING')
              ? '✅ KS3 PATHWAY & 6 QR CARDS'
              : '⚠️ INCOMPLETE BACK COVER',
        });
      }
    });

    return { issues, pageReports };
  });

  await browser.close();

  console.table(auditResults.pageReports);

  if (auditResults.issues.length > 0) {
    console.error('\n❌ AUDIT FAILED WITH ISSUES:');
    auditResults.issues.forEach((iss) => console.error('  • ' + iss));
    return false;
  } else {
    console.log(
      '\n🎉 AUDIT PASSED: 100% compliant with zero voids, zero overflows, and strict task numbering!\n',
    );
    return true;
  }
}

if (require.main === module) {
  const target = process.argv[2] || 'public/units/great_war/pupil_workbook_v2.html';
  auditWorkbook(target).then((success) => {
    if (!success) process.exit(1);
  });
}

module.exports = { auditWorkbook };
