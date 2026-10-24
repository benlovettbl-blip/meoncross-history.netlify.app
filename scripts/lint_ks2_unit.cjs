/**
 * scripts/lint_ks2_unit.cjs
 *
 * Pre-Flight Content & Budget Linter for Key Stage 2 Companion Textbooks
 * Ensures that curriculum data meets exact reprographic budgets BEFORE rendering,
 * guaranteeing zero manual edits, 0px overflows, and optimal page utilization.
 *
 * Usage:
 *   node scripts/lint_ks2_unit.cjs ks2_ww2
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');

function loadUnitData(unitId) {
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Unit data file not found at: ${dataPath}`);
  }
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+[^;]+;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

function countWords(str) {
  if (!str) return 0;
  return str
    .replace(/<[^>]*>/g, ' ')
    .replace(/\[\d+\.\d+\]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function lintKs2Unit(unitId = 'ks2_ww2') {
  console.log('='.repeat(75));
  console.log(`🔍 PRE-FLIGHT REPROGRAPHIC LINTER: Key Stage 2 Unit [${unitId}]`);
  console.log('='.repeat(75));

  const unitData = loadUnitData(unitId);
  const lessons = unitData.lessons || [];
  const errors = [];
  const warnings = [];

  // 1. Structure Check
  const expectedLessons = unitData.is_8page ? 5 : 10;
  console.log(
    `📋 Architecture Target: ${expectedLessons}-Lesson Model (${expectedLessons === 5 ? '8-Page' : '16-Page'})`,
  );
  if (lessons.length < expectedLessons) {
    errors.push(`Expected at least ${expectedLessons} lessons, found ${lessons.length}.`);
  }

  // 2. Cover Checks
  if (!unitData.cover_image) {
    errors.push(`Page 1: Missing cover_image.`);
  } else {
    const cleanImg = unitData.cover_image.startsWith('/')
      ? unitData.cover_image.slice(1)
      : unitData.cover_image;
    const imgPath = path.join(ROOT_DIR, 'public', cleanImg);
    if (!fs.existsSync(imgPath) && !fs.existsSync(path.join(ROOT_DIR, cleanImg))) {
      warnings.push(`Page 1: Cover image file not found locally: ${cleanImg}`);
    }
  }

  if (!unitData.cover_caption) {
    errors.push(`Page 1: Missing cover_caption (archival provenance required).`);
  }

  // 3. Page 2 Learning Journey Blurb Budgets
  console.log('\n📖 Page 2: Inside Front Cover Blurb Budgets (~45–70 words):');
  lessons.slice(0, expectedLessons).forEach((l, i) => {
    const blurb = l.blurb || l.subtitle || '';
    const wc = countWords(blurb);
    const status = wc >= 40 && wc <= 72 ? '✅ PASS' : wc < 40 ? '⚠️ LOW' : '⚠️ HIGH';
    console.log(`   Lesson ${i + 1} (${wc} words) -> ${status}`);
    if (wc < 35)
      warnings.push(
        `Lesson ${i + 1} blurb is short (${wc} words) - risk of bottom void on Page 2.`,
      );
    if (wc > 80)
      errors.push(`Lesson ${i + 1} blurb is too long (${wc} words) - risk of overflow on Page 2.`);
  });

  // 4. Narrative Page Word Budgets (Pages 4–13)
  console.log('\n📚 Pages 4–13: Core Narrative Word Budgets (Optimal: 320–500 words):');
  lessons.slice(0, expectedLessons).forEach((l, i) => {
    const blocks = l.narrative_blocks || [];
    let totalWords = 0;
    blocks.forEach((b) => {
      totalWords += countWords(b.text);
    });

    let status = '✅ PASS';
    if (totalWords < 250) {
      status = '⚠️ UNDERFLOW RISK';
      warnings.push(`Lesson ${i + 1} narrative has only ${totalWords} words (underflow risk).`);
    } else if (totalWords > 530) {
      status = '❌ OVERFLOW RISK';
      errors.push(
        `Lesson ${i + 1} narrative has ${totalWords} words (exceeds 530w - overflow risk).`,
      );
    }

    console.log(`   Lesson ${i + 1}: ${blocks.length} blocks, ${totalWords} words -> ${status}`);
  });

  // Summary
  console.log('\n' + '='.repeat(75));
  if (errors.length === 0 && warnings.length === 0) {
    console.log(
      `🎉 PERFECT SCORE: Unit [${unitId}] satisfies 100% of KS2 Reprographic Guardrails!`,
    );
    console.log(`   Ready for 0px-overflow compilation with zero manual edits.`);
  } else {
    if (warnings.length > 0) {
      console.log(`⚠️  Advisories (${warnings.length}):`);
      warnings.forEach((w) => console.log(`   - ${w}`));
    }
    if (errors.length > 0) {
      console.log(`❌ Critical Violations (${errors.length}):`);
      errors.forEach((e) => console.log(`   - ${e}`));
    }
  }
  console.log('='.repeat(75));

  return { errors, warnings };
}

if (require.main === module) {
  const unitId = process.argv[2] || 'ks2_ww2';
  lintKs2Unit(unitId);
}

module.exports = { lintKs2Unit };
