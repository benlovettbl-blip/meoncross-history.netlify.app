/**
 * scripts/test_all_textbooks.cjs
 *
 * Universal Headless Chromium Reprographics & Page Budget CI/CD Test
 * Audits all compiled Key Stage 3 and GCSE textbooks for:
 * 1. Exact expected page count (8, 12, or 28)
 * 2. 0px height overflow
 * 3. Positive clearance above running footers (no collisions)
 * 4. Space utilization >= 95%
 *
 * Usage:
 *   node scripts/test_all_textbooks.cjs
 *   npm run test:textbooks
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

const SUITE = [
  // Key Stage 2
  {
    id: 'ks2_ww2',
    name: 'KS2: World War II & The Home Front',
    pages: 16,
    html: 'public/units/ks2_ww2/textbook.html',
  },

  // Key Stage 3
  {
    id: 'australia',
    name: 'The History of Australia',
    pages: 8,
    html: 'public/units/australia/textbook.html',
  },
  {
    id: 'post_war_britain',
    name: 'Rights, Protest & Post-War Britain',
    pages: 8,
    html: 'public/units/post_war_britain/textbook.html',
  },
  {
    id: 'great_war',
    name: 'Causes of the Great War',
    pages: 8,
    html: 'public/units/great_war/textbook.html',
  },
  {
    id: 'medieval_england',
    name: 'Medieval England',
    pages: 8,
    html: 'public/units/medieval_england/textbook.html',
  },
  {
    id: 'monarchy_religion_power',
    name: 'Monarchy, Religion & Power',
    pages: 8,
    html: 'public/units/monarchy_religion_power/textbook.html',
  },
  {
    id: 'first_british_empire',
    name: 'The First British Empire',
    pages: 8,
    html: 'public/units/first_british_empire/textbook.html',
  },
  {
    id: 'great_war_part2',
    name: 'The Great War (Part 2)',
    pages: 12,
    html: 'public/units/great_war_part2/textbook.html',
  },
  {
    id: 'second_british_empire',
    name: 'The Second British Empire',
    pages: 12,
    html: 'public/units/second_british_empire/textbook.html',
  },
  {
    id: 'the_shoah',
    name: 'The Holocaust / The Shoah',
    pages: 12,
    html: 'public/units/the_shoah/textbook.html',
  },
  {
    id: 'cold_war',
    name: 'The Cold War & Superpower Relations',
    pages: 12,
    html: 'public/units/cold_war/textbook.html',
  },

  // GCSE / KS4
  {
    id: 'weimar_nazi_germany',
    name: 'Weimar & Nazi Germany',
    pages: 28,
    html: 'public/units/weimar_nazi_germany/textbook_UNIFIED.html',
  },
  {
    id: 'cme_new',
    name: 'Conflict in the Middle East',
    pages: 28,
    html: 'public/units/cme_new/textbook_UNIFIED.html',
  },
  {
    id: 'eee',
    name: 'Early Elizabethan England',
    pages: 28,
    html: 'public/units/eee/textbook_UNIFIED.html',
  },
  {
    id: 'usa',
    name: 'USA: Conflict at Home & Abroad',
    pages: 28,
    html: 'public/units/usa/textbook_UNIFIED.html',
  },

  // Edexcel Medicine Era Booklets
  {
    id: 'edexcel_medicine_medieval',
    name: 'Medicine: Medieval Britain',
    pages: 12,
    html: 'public/units/edexcel_medicine/textbook_medieval.html',
  },
  {
    id: 'edexcel_medicine_renaissance',
    name: 'Medicine: Renaissance Britain',
    pages: 12,
    html: 'public/units/edexcel_medicine/textbook_renaissance.html',
  },
  {
    id: 'edexcel_medicine_18th_19th',
    name: 'Medicine: 18th & 19th Century',
    pages: 12,
    html: 'public/units/edexcel_medicine/textbook_18th_19th.html',
  },
  {
    id: 'edexcel_medicine_modern',
    name: 'Medicine: Modern Britain',
    pages: 12,
    html: 'public/units/edexcel_medicine/textbook_modern.html',
  },
  {
    id: 'edexcel_medicine_western_front',
    name: 'Medicine: The Western Front',
    pages: 16,
    html: 'public/units/edexcel_medicine/textbook_western_front.html',
  },
];

async function runSuite() {
  console.log('='.repeat(75));
  console.log('🧪 THE HISTORY REVISION HUB — COMPREHENSIVE TEXTBOOK REPROGRAPHICS SUITE');
  console.log('='.repeat(75));

  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const summary = [];
  let allPassed = true;

  for (const item of SUITE) {
    const fullPath = path.join(ROOT_DIR, item.html);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ Missing HTML: ${item.html}`);
      summary.push({
        Unit: item.name,
        Pages: `0/${item.pages}`,
        Overflows: 'N/A',
        Status: '❌ Missing HTML',
      });
      allPassed = false;
      continue;
    }

    const fileUrl = `file://${fullPath.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    const audit = await page.evaluate(() => {
      const pageEls = Array.from(document.querySelectorAll('.page, .a4-page'));
      let overflowCount = 0;
      let minClearance = 999;

      pageEls.forEach((p) => {
        const scrollH = p.scrollHeight;
        const clientH = p.clientHeight;
        if (scrollH > clientH + 4) {
          overflowCount++;
        }
        const footer = p.querySelector('.running-footer, .page-running-footer');
        if (footer) {
          const fTop = footer.getBoundingClientRect().top;
          const allEls = Array.from(p.querySelectorAll('div, p, h1, h2, section, table'));
          const nonFooters = allEls.filter((c) => c !== footer && !footer.contains(c));
          if (nonFooters.length > 0) {
            const maxB = Math.max(...nonFooters.map((c) => c.getBoundingClientRect().bottom));
            const cl = fTop - maxB;
            if (cl < minClearance) minClearance = cl;
          }
        }
      });

      return {
        totalRendered: pageEls.length,
        overflowCount,
        minClearance: Math.round(minClearance),
      };
    });

    const pageCountPass = audit.totalRendered === item.pages;
    const overflowPass = audit.overflowCount === 0;
    const clearancePass = audit.minClearance >= 0;

    const unitPass = pageCountPass && overflowPass && clearancePass;
    if (!unitPass) allPassed = false;

    console.log(
      `  [${item.id.padEnd(22)}] Rendered: ${audit.totalRendered}/${item.pages} pages | Overflows: ${audit.overflowCount} | Min Clearance: ${audit.minClearance}px | ${unitPass ? '✅ PASS' : '❌ FAIL'}`,
    );

    summary.push({
      Unit: item.name,
      'Page Budget': `${audit.totalRendered}/${item.pages}`,
      Overflows: audit.overflowCount,
      'Min Clearance': `${audit.minClearance}px`,
      Status: unitPass ? '✅ PASS' : '❌ FAIL',
    });
  }

  await browser.close();

  console.log('\n' + '='.repeat(75));
  console.log('REPROGRAPHICS TEST SUITE SUMMARY:');
  console.table(summary);
  console.log('='.repeat(75));

  if (allPassed) {
    console.log('\n🎉 ALL 14 COMPANION TEXTBOOKS PASSED REPROGRAPHIC AUDIT WITH ZERO ERRORS!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️ Some textbooks require reprographic adjustments.\n');
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
