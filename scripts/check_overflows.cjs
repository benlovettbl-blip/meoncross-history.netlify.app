const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

(async () => {
  const args = process.argv.slice(2);
  const isStrict = args.includes('--strict') || args.includes('--ci') || Boolean(process.env.CI);
  const maxDeadSpaceArg = args.find((a) => a.startsWith('--max-dead-space='));
  const maxAllowedDeadSpace = maxDeadSpaceArg ? parseInt(maxDeadSpaceArg.split('=')[1], 10) : 150; // User specification: >150px dead space is blocked

  const nonFlagArgs = args.filter((a) => !a.startsWith('--'));
  const arg = nonFlagArgs[0] || 'great_war';

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 600000,
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  const targetFiles = [];

  if (arg.endsWith('.html')) {
    targetFiles.push(path.resolve(arg));
  } else if (arg === 'boosters' || arg === 'revision_sheets') {
    const boostersDir = path.join(__dirname, '..', 'public', 'revision_sheets');
    if (fs.existsSync(boostersDir)) {
      const htmls = fs.readdirSync(boostersDir).filter((f) => f.endsWith('.html'));
      htmls.forEach((h) => targetFiles.push(path.join(boostersDir, h)));
    }
  } else if (arg === 'all') {
    const publicUnits = path.join(__dirname, '..', 'public', 'units');
    if (fs.existsSync(publicUnits)) {
      const unitFolders = fs
        .readdirSync(publicUnits)
        .filter((d) => fs.statSync(path.join(publicUnits, d)).isDirectory() && !d.startsWith('.'));
      for (const u of unitFolders) {
        const uDir = path.join(publicUnits, u);
        const htmls = fs
          .readdirSync(uDir)
          .filter(
            (f) =>
              f.endsWith('.html') &&
              (f.startsWith('quiz_pack') ||
                f.startsWith('mastery_pack') ||
                f.startsWith('pupil_workbook')),
          );
        htmls.forEach((h) => targetFiles.push(path.join(uDir, h)));
      }
    }
    const boostersDir = path.join(__dirname, '..', 'public', 'revision_sheets');
    if (fs.existsSync(boostersDir)) {
      const htmls = fs.readdirSync(boostersDir).filter((f) => f.endsWith('.html'));
      htmls.forEach((h) => targetFiles.push(path.join(boostersDir, h)));
    }
  } else {
    const unitFolder = path.join(__dirname, '..', 'public', 'units', arg);
    if (fs.existsSync(unitFolder)) {
      const candidates = fs.readdirSync(unitFolder).filter((f) => f.endsWith('.html'));
      const priorityPrefixes = ['pupil_workbook', 'quiz_pack', 'mastery_pack', 'textbook'];
      const matched = candidates.filter((f) => priorityPrefixes.some((p) => f.startsWith(p)));
      if (matched.length > 0) {
        matched.forEach((f) => targetFiles.push(path.join(unitFolder, f)));
      } else {
        targetFiles.push(path.join(unitFolder, 'pupil_workbook.html'));
      }
    } else {
      console.error(`❌ Unit folder not found: ${unitFolder}`);
      await browser.close();
      process.exit(1);
    }
  }

  let totalErrors = 0;
  let totalBudgetViolations = 0;

  for (const htmlPath of targetFiles) {
    if (!fs.existsSync(htmlPath)) {
      continue;
    }

    const localUrl = require('url').pathToFileURL(htmlPath).href;
    const docName = path.basename(htmlPath);
    console.log(`\n🔍 Auditing Page Budget & Layout: ${docName}...`);

    try {
      await page.goto(localUrl, { waitUntil: 'domcontentloaded', timeout: 300000 });
      await new Promise((r) => setTimeout(r, 600));

      const audit = await auditPageBudget(page, {
        underflowThresholdPx: docName.includes('quiz_pack') ? 35 : 60,
        pageSelector: '.a5-page, .page, .page-landscape, .a4-page, .sheet-page',
      });

      printSpaceAuditReport(audit, docName);

      if (audit.hasErrors) {
        totalErrors += audit.results.filter((r) => r.isOverflow).length;
      }

      // Automated Space Budget Gate: dead space > maxAllowedDeadSpace (150px)
      const deadSpaceViolations = audit.results.filter(
        (r) =>
          !r.isOverflow && r.unusedBottom > maxAllowedDeadSpace && !r.pageId.includes('Continuous'),
      );
      if (deadSpaceViolations.length > 0) {
        deadSpaceViolations.forEach((v) => {
          console.warn(
            `  ⚠️ Space Budget Gate: ${v.pageId} exceeds max dead space threshold (${v.unusedBottom}px > ${maxAllowedDeadSpace}px limit)!`,
          );
        });
        totalBudgetViolations += deadSpaceViolations.length;
      }
    } catch (err) {
      console.error(`❌ Failed to audit ${docName}:`, err.message);
      totalErrors++;
    }
  }

  await browser.close();

  if (totalErrors > 0) {
    console.error(`\n❌ Layout Overflows detected! Total overflow errors: ${totalErrors}`);
    process.exit(1);
  }

  if (isStrict && totalBudgetViolations > 0) {
    console.error(
      `\n❌ Space Budget Gate Failed! ${totalBudgetViolations} page(s) exceeded the ${maxAllowedDeadSpace}px dead space limit.`,
    );
    process.exit(1);
  }

  if (totalBudgetViolations > 0) {
    console.warn(
      `\n⚠️ Note: ${totalBudgetViolations} page(s) have dead space > ${maxAllowedDeadSpace}px (run with --strict to enforce hard blocking).`,
    );
  } else {
    console.log(
      `\n🎉 Space Budget Gate Passed: 0 overflows and 0 pages exceeding ${maxAllowedDeadSpace}px dead space!`,
    );
  }
})();
