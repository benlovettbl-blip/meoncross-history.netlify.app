#!/usr/bin/env node
/**
 * History Revision Hub — Automated Publisher Textbook Balancer & Compiler
 *
 * Usage:
 *   node scripts/auto_balance_textbook.cjs [kt1|kt2|kt3|all] [--strict] [--no-compile] [--json]
 *
 * Key Capabilities:
 * 1. Single-Command Automated Workflow: Compiles HTML companions & PDF textbooks.
 * 2. High-Precision Layout Auditor: Evaluates dual-column flow, measuring dead gaps and 0px overflow.
 * 3. Component Bank Auto-Picker: Scans curriculum data.js to detect layout gaps and recommend
 *    calibrated pedagogical components (Concept Spotlight, Archival Dispatch, Key Figure Card).
 * 4. Executive Visual Summary: Formats multi-column audit tables with spread types and status badges.
 * 5. Strict School Anonymity & Sanitization Enforcement.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { auditTextbook, TEXTBOOK_CONFIGS } = require('./audit_textbook_pages.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');

// Helper to safely load curriculum data
function loadCurriculumData() {
  if (!fs.existsSync(dataPath)) return null;
  try {
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const startIndex = dataContent.indexOf('{');
    const endIndex = dataContent.lastIndexOf('}');
    return eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');
  } catch (err) {
    console.warn('[WARN] Could not parse curriculum data.js:', err.message);
    return null;
  }
}

// Module map for textbook compilers
const COMPILERS = {
  kt1: {
    id: 'kt1',
    name: 'Key Topic 1: The Creation of Israel (1945–1956)',
    script: path.join(__dirname, 'render_standard_textbook_kt1.cjs'),
    lessonRange: [0, 4], // Lessons 1 to 5
    run: () => require('./render_standard_textbook_kt1.cjs').run(),
  },
  kt2: {
    id: 'kt2',
    name: 'Key Topic 2: The Escalating Conflict (1964–1973)',
    script: path.join(__dirname, 'render_standard_textbook_kt2.cjs'),
    lessonRange: [4, 9], // Lessons 6 to 10
    run: () => require('./render_standard_textbook_kt2.cjs').run(),
  },
  kt3: {
    id: 'kt3',
    name: 'Key Topic 3: The Search for Peace (1974–1995)',
    script: path.join(__dirname, 'render_standard_textbook_kt3.cjs'),
    lessonRange: [9, 14], // Lessons 11 to 15
    run: () => require('./render_standard_textbook_kt3.cjs').run(),
  },
};

// Pedagogical Component Library Archetypes & Target Pixel Heights
const COMPONENT_ARCHETYPES = {
  CONCEPT_SPOTLIGHT: {
    name: 'Concept Spotlight Box',
    cssClass: 'concept-spotlight-box',
    typicalHeight: 160,
    minHeight: 120,
    maxHeight: 220,
    description:
      'Analytical box breaking down key causal mechanism or diplomatic concept with exam takeaway.',
  },
  ARCHIVAL_DISPATCH: {
    name: 'Archival Dispatch Box',
    cssClass: 'archival-source-box',
    typicalHeight: 125,
    minHeight: 90,
    maxHeight: 170,
    description:
      'Contemporary diplomatic memo, military directive, or radio communiqué with archival shelfmark.',
  },
  KEY_FIGURE: {
    name: 'Key Figure Profile Card',
    cssClass: 'key-figure-box',
    typicalHeight: 210,
    minHeight: 160,
    maxHeight: 260,
    description:
      'Biographical portrait card with role, significance, and 3 strategic decisions/actions.',
  },
  BOTTOM_ENQUIRY: {
    name: 'Bottom Enquiry Check Deck',
    cssClass: 'bottom-enquiry-box',
    typicalHeight: 100,
    minHeight: 85,
    maxHeight: 120,
    description:
      '3-column horizontal self-assessment deck checking understanding across key themes.',
  },
};

/**
 * Intelligent Component Gap Recommendation Engine
 * Analyzes pages that have sub-90% fill or large dead gaps and auto-picks suitable components from data.js.
 */
function analyzePageGaps(pageResult, topicConfig, curriculumData) {
  const {
    pageNum,
    type,
    fillPct,
    deadGap,
    overflow,
    availHeight,
    totalUsed,
    totalAvail,
    hasEnquiry,
    hasKeyFigure,
    sourceCount,
  } = pageResult;
  const isRightPage = pageNum % 2 === 1 && pageNum > 1 && pageNum < 12;

  // Only analyze content pages (exclude covers)
  if (pageNum === 1 || pageNum === 12) return null;

  const recommendations = [];
  const targetUsed = Math.round(totalAvail * 0.9);
  const neededPx = Math.max(0, targetUsed - totalUsed);

  // Determine lesson index corresponding to this page
  const lessonOffset = Math.floor((pageNum - 2) / 2);
  const compilerInfo = COMPILERS[topicConfig.id];
  const lessonGlobalIdx = compilerInfo ? compilerInfo.lessonRange[0] + lessonOffset : null;
  const lesson =
    curriculumData && lessonGlobalIdx !== null ? curriculumData.lessons[lessonGlobalIdx] : null;

  if (isRightPage) {
    // Missing pedagogical structural elements
    if (!hasKeyFigure) {
      const suggestedName =
        lesson && lesson.key_individual ? lesson.key_individual.name : 'Historical Leader';
      recommendations.push({
        type: 'KEY_FIGURE',
        priority: 'CRITICAL',
        estimatedPx: COMPONENT_ARCHETYPES.KEY_FIGURE.typicalHeight,
        action: `Inject Key Figure Card for ${suggestedName} (${COMPONENT_ARCHETYPES.KEY_FIGURE.typicalHeight}px).`,
      });
    }

    if (!hasEnquiry) {
      recommendations.push({
        type: 'BOTTOM_ENQUIRY',
        priority: 'HIGH',
        estimatedPx: COMPONENT_ARCHETYPES.BOTTOM_ENQUIRY.typicalHeight,
        action: `Add Bottom Enquiry Check Deck to anchor page bottom (${COMPONENT_ARCHETYPES.BOTTOM_ENQUIRY.typicalHeight}px).`,
      });
    }

    // Fill gap recommendations
    if (fillPct < 90 && neededPx > 0) {
      if (neededPx <= 40) {
        recommendations.push({
          type: 'CALIBRATION',
          priority: 'MEDIUM',
          estimatedPx: neededPx,
          action: `Micro-expand Concept Spotlight takeaway or add 1 exam-criteria sentence to column 1 (+${neededPx}px).`,
        });
      } else if (neededPx <= 130) {
        recommendations.push({
          type: 'ARCHIVAL_DISPATCH',
          priority: 'HIGH',
          estimatedPx: COMPONENT_ARCHETYPES.ARCHIVAL_DISPATCH.typicalHeight,
          action: `Inject Archival Dispatch from lesson sources or cabinet archives (~${COMPONENT_ARCHETYPES.ARCHIVAL_DISPATCH.typicalHeight}px).`,
        });
      } else {
        recommendations.push({
          type: 'CONCEPT_SPOTLIGHT',
          priority: 'HIGH',
          estimatedPx: COMPONENT_ARCHETYPES.CONCEPT_SPOTLIGHT.typicalHeight,
          action: `Inject Concept Spotlight Box for key historical mechanism (~${COMPONENT_ARCHETYPES.CONCEPT_SPOTLIGHT.typicalHeight}px).`,
        });
      }
    }
  } else {
    // Left-hand (Verso) spread: check column balance
    if (deadGap > 95) {
      recommendations.push({
        type: 'COLUMN_BALANCE',
        priority: 'MEDIUM',
        estimatedPx: deadGap,
        action: `Balance Column 2 text before vocabulary deck: add ~${Math.round(deadGap * 0.4)}px of text to Section 2.`,
      });
    }
  }

  return {
    pageNum,
    type,
    fillPct,
    deadGap,
    overflow,
    neededPx,
    lessonTitle: lesson ? lesson.title : `Lesson ${lessonOffset + 1}`,
    recommendations,
  };
}

async function runAutoBalance() {
  const args = process.argv.slice(2);
  const target = (args.find((a) => !a.startsWith('-')) || 'all').toLowerCase();
  const isStrict = args.includes('--strict');
  const noCompile = args.includes('--no-compile') || args.includes('--audit-only');
  const isJson = args.includes('--json');

  console.log('\n===============================================================');
  console.log('⚡ History Revision Hub — Automated Textbook Balancer & Auditor');
  console.log(
    `   Target: [${target.toUpperCase()}] | Mode: ${noCompile ? 'AUDIT ONLY' : 'COMPILE & AUDIT'} | Strict: ${isStrict}`,
  );
  console.log('===============================================================\n');

  // Determine target configurations
  let selectedConfigs = [];
  if (target === 'all') {
    selectedConfigs = TEXTBOOK_CONFIGS;
  } else {
    const matched = TEXTBOOK_CONFIGS.find(
      (c) => c.id === target || c.id.replace('kt', '') === target,
    );
    if (!matched) {
      console.error(`❌ Unknown target: '${target}'. Choose from: kt1, kt2, kt3, all.`);
      process.exit(1);
    }
    selectedConfigs = [matched];
  }

  // Step 1: Compilation Phase
  if (!noCompile) {
    for (const config of selectedConfigs) {
      const compiler = COMPILERS[config.id];
      if (compiler) {
        console.log(`🚀 [Phase 1/3] Compiling Publisher Textbook: ${compiler.name}...`);
        const startTime = Date.now();
        await compiler.run();
        console.log(`   ✅ Compiled in ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
      }
    }
    console.log('');
  }

  // Step 2: Puppeteer Layout Audit Phase
  console.log(
    `🔍 [Phase 2/3] Launching Puppeteer Audit Engine across ${selectedConfigs.length} textbook(s)...`,
  );
  const curriculumData = loadCurriculumData();
  const allResults = [];
  let totalIssues = 0;
  let totalSub90RightPages = 0;

  for (const config of selectedConfigs) {
    console.log(`\n>>> Auditing: ${config.name}`);
    const auditRes = await auditTextbook(config, { strict: false, snap: false });
    if (!auditRes.success) {
      console.error(`   ❌ Audit failed for ${config.id}: ${auditRes.error}`);
      totalIssues++;
      continue;
    }

    const tableRows = auditRes.pages.map((p) => {
      const isRightPage = p.pageNum % 2 === 1 && p.pageNum > 1 && p.pageNum < 12;
      let statusBadge = '✅ OPTIMAL';
      if (p.overflow > 0) {
        statusBadge = '❌ OVERFLOW';
        totalIssues++;
      } else if (p.status === 'GAP ALERT') {
        statusBadge = '🟡 GAP ALERT';
      } else if (p.status === 'ACCEPTABLE') {
        statusBadge = '⚠️ ACCEPTABLE';
      }

      if (isRightPage && p.fillPct < 90 && p.overflow === 0) {
        statusBadge = '⚠️ SUB-90%';
        totalSub90RightPages++;
      }

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

    // Analyze gaps & build recommendations
    const gapAnalyses = auditRes.pages
      .map((p) => analyzePageGaps(p, config, curriculumData))
      .filter((a) => a && a.recommendations.length > 0);

    if (gapAnalyses.length > 0) {
      console.log('   📐 Intelligent Gap Detection & Component Bank Recommendations:');
      gapAnalyses.forEach((ga) => {
        ga.recommendations.forEach((rec) => {
          const icon = rec.priority === 'CRITICAL' ? '🔴' : rec.priority === 'HIGH' ? '🟠' : 'ℹ️';
          console.log(
            `   ${icon} Page ${ga.pageNum} (${ga.type} - ${ga.lessonTitle}): ${rec.action}`,
          );
        });
      });
    }

    // Verify PDF existence and size
    if (fs.existsSync(config.pdfPath)) {
      const stats = fs.statSync(config.pdfPath);
      const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(
        `   📄 Verified PDF Artifact: ${path.basename(config.pdfPath)} (${sizeMb} MB) ✅`,
      );
    } else {
      console.warn(`   ⚠️ PDF artifact not found on disk: ${config.pdfPath}`);
      totalIssues++;
    }

    allResults.push({ config, pages: auditRes.pages, gapAnalyses });
  }

  // Step 3: Commercial Neutrality & Sanitization Verification Guardrail
  console.log('\n🔒 [Phase 3/3] Commercial Neutrality & School Anonymity Verification...');
  try {
    const sanReport = execSync('node scripts/verify_sanitization.cjs', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
    });
    if (sanReport.includes('100% CLEAN')) {
      console.log(
        '   ✅ Sanitization Audit Passed: 0 institutional identifiers detected across all files.',
      );
    } else {
      console.warn(
        '   ⚠️ Sanitization warning detected. Review scripts/verify_sanitization.cjs output.',
      );
    }
  } catch (err) {
    console.error('   ❌ Sanitization audit failed with errors:', err.message);
    totalIssues++;
  }

  // Final Executive Summary
  console.log('\n---------------------------------------------------------------');
  console.log('📊 Auto-Balance Execution Summary:');
  console.log(`   • Textbooks Processed: ${selectedConfigs.length}`);
  console.log(`   • Sub-90% Right-Hand Pages: ${totalSub90RightPages}`);
  console.log(`   • Layout / Overflow Errors: ${totalIssues}`);

  if (totalIssues === 0 && totalSub90RightPages === 0) {
    console.log(
      '🎉 ALL TEXTBOOKS PASS AT 100% MASTER STANDARD: 0px OVERFLOW & >90% RIGHT-PAGE FILL!\n',
    );
    process.exit(0);
  } else if (totalIssues === 0) {
    console.log(
      '✅ ALL TEXTBOOKS COMPILED SAFELY WITH ZERO OVERFLOW. (Minor gap recommendations above).\n',
    );
    process.exit(isStrict ? 1 : 0);
  } else {
    console.error(`❌ Auto-balance completed with ${totalIssues} issue(s).\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  runAutoBalance().catch((err) => {
    console.error('Fatal Auto-Balance error:', err);
    process.exit(1);
  });
}

module.exports = { runAutoBalance, COMPILERS, COMPONENT_ARCHETYPES, analyzePageGaps };
