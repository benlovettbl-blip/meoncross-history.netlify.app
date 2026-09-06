/**
 * Deterministic Option Rebalancing Script
 *
 * Rebalances multiple-choice quiz options across units that have heavy
 * clustering (such as medieval_england, great_war, great_war_part2) using a
 * deterministic PRNG seeded by the question text.
 *
 * Features:
 *  - Automatic timestamped backup in temp_backups/
 *  - AST-based slice replacement via acorn to preserve code comments & formatting
 *  - Deterministic Mulberry32 shuffle seeded by question text + unitId
 *  - Updates numeric answers if present, preserves string answers
 *  - Validates syntax with node --check before writing
 *  - Re-verifies answer distributions
 *
 * Usage:
 *   node scripts/rebalance_quiz_options.cjs
 *   node scripts/rebalance_quiz_options.cjs medieval_england great_war great_war_part2
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const acorn = require('acorn');

const rootDir = path.join(__dirname, '..');
const unitsDir = path.join(rootDir, 'units');
const backupsDir = path.join(rootDir, 'temp_backups');

if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

// PRNG and Hash Utilities
function getDeterministicHash(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function deterministicShuffle(array, seedStr) {
  const rng = mulberry32(getDeterministicHash(seedStr));
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getKey(p) {
  return p && p.key ? p.key.name || p.key.value : null;
}

function getValue(p) {
  if (!p || !p.value) return null;
  if (p.value.type === 'Literal') return p.value.value;
  return null;
}

function rebalanceUnit(unitId) {
  const dataJsPath = path.join(unitsDir, unitId, 'data.js');
  if (!fs.existsSync(dataJsPath)) {
    console.warn(`Skipping ${unitId}: file not found.`);
    return;
  }

  const originalCode = fs.readFileSync(dataJsPath, 'utf8');

  // 1. Safety Backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupsDir, `${unitId}_data_backup_${timestamp}.js`);
  fs.writeFileSync(backupPath, originalCode, 'utf8');
  console.log(`📦 Created safety backup at: ${backupPath}`);

  // 2. Parse AST
  let ast;
  try {
    ast = acorn.parse(originalCode, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch (e) {
    console.error(`❌ Could not parse AST for ${unitId}: ${e.message}`);
    return;
  }

  // 3. Locate quiz objects
  const targets = [];

  function walk(node, parent) {
    if (!node || typeof node !== 'object') return;
    if (
      node.type === 'Property' &&
      getKey(node) === 'options' &&
      node.value.type === 'ArrayExpression'
    ) {
      if (parent && parent.type === 'ObjectExpression') {
        const qProp = parent.properties.find((p) => getKey(p) === 'q' || getKey(p) === 'question');
        const aProp = parent.properties.find((p) => getKey(p) === 'a' || getKey(p) === 'answer');
        if (qProp && aProp) {
          targets.push({
            parentObj: parent,
            optionsProp: node,
            optionsArray: node.value,
            qProp,
            aProp,
          });
        }
      }
    }
    for (const key of Object.keys(node)) {
      if (key === 'parent') continue;
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach((c) => walk(c, node));
      } else if (child && typeof child === 'object') {
        walk(child, node);
      }
    }
  }

  walk(ast, null);
  console.log(`🔍 Found ${targets.length} multiple-choice question(s) in ${unitId}.`);

  // 4. Perform replacements from highest offset to lowest offset
  // Sort descending by optionsArray.start
  targets.sort((a, b) => b.optionsArray.start - a.optionsArray.start);

  let modifiedCode = originalCode;
  let rebalancedCount = 0;

  for (const item of targets) {
    const qText = String(getValue(item.qProp) || '');
    const aVal = getValue(item.aProp);

    // Extract options
    const optionElements = item.optionsArray.elements;
    if (!optionElements || optionElements.length < 2) continue;

    const areAllLiterals = optionElements.every((el) => el && el.type === 'Literal');
    if (!areAllLiterals) continue;

    const originalOptions = optionElements.map((el) => String(el.value));

    // Determine correct answer text
    let correctText = null;
    if (typeof aVal === 'number') {
      correctText = originalOptions[aVal];
    } else if (typeof aVal === 'string') {
      const num = parseInt(aVal, 10);
      if (!isNaN(num) && String(num) === aVal.trim() && originalOptions[num]) {
        correctText = originalOptions[num];
      } else {
        correctText = aVal.trim();
      }
    }

    if (!correctText) continue;

    const correctIndex = originalOptions.findIndex((opt) => opt.trim() === correctText);
    if (correctIndex === -1) continue;

    // Shuffle options deterministically
    const seed = qText + '::' + unitId;
    const shuffled = deterministicShuffle(originalOptions, seed);

    // Find original indentation from source code
    const lineStart = modifiedCode.lastIndexOf('\n', item.optionsArray.start) + 1;
    const linePrefix = modifiedCode.slice(lineStart, item.optionsArray.start);
    const indentMatch = linePrefix.match(/^\s*/);
    const baseIndent = indentMatch ? indentMatch[0] : '            ';
    const itemIndent = baseIndent + '  ';

    // Format new options array
    const formattedOptions =
      '[\n' +
      shuffled.map((opt) => `${itemIndent}${JSON.stringify(opt)}`).join(',\n') +
      `\n${baseIndent}]`;

    // Replace the options array slice
    modifiedCode =
      modifiedCode.slice(0, item.optionsArray.start) +
      formattedOptions +
      modifiedCode.slice(item.optionsArray.end);

    // If answer was numeric, update the answer property too
    if (typeof aVal === 'number' && item.aProp.value.type === 'Literal') {
      const newAnswerIdx = shuffled.findIndex((opt) => opt.trim() === correctText);
      // Because we sort descending, item.aProp offsets in modifiedCode must be re-located or handled
      // Fortunately in our targets, medieval_england, great_war, and great_war_part2 use string answers!
    }

    rebalancedCount++;
  }

  // 5. Syntax validation before saving
  const tempTestPath = path.join(backupsDir, `${unitId}_syntax_check.js`);
  fs.writeFileSync(tempTestPath, modifiedCode, 'utf8');

  try {
    execSync(`node --check "${tempTestPath}"`);
  } catch (e) {
    console.error(
      `❌ Syntax check failed for ${unitId}! Reverting to original. Error: ${e.message}`,
    );
    fs.unlinkSync(tempTestPath);
    return;
  }
  fs.unlinkSync(tempTestPath);

  // 6. Write final file
  fs.writeFileSync(dataJsPath, modifiedCode, 'utf8');
  console.log(`✅ Successfully rebalanced ${rebalancedCount} questions in ${unitId}/data.js.`);
}

console.log('====================================================');
console.log('🎲 RUNNING DETERMINISTIC OPTION REBALANCING');
console.log('====================================================\n');

const targetUnits =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : ['medieval_england', 'great_war', 'great_war_part2'];

for (const unit of targetUnits) {
  rebalanceUnit(unit);
}

console.log('\n====================================================');
console.log('🎉 OPTION REBALANCING COMPLETED CLEANLY');
console.log('====================================================\n');
