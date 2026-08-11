const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const unitsDir = path.join(__dirname, 'public', 'units');

// I will use single quotes for ALL replacements that act as quotes to prevent breaking JS string literals.
const replacements = {
  '\u00E2\u20AC\u02DC': "'", // left quote
  '\u00E2\u20AC\u2122': "'", // right quote
  '\u00E2\u20AC\u0153': "'", // left double quote -> single quote
  '\u00E2\u20AC\u009D': "'", // right double quote -> single quote
  '\u00E2\u20AC\u201C': '-', // en dash
  '\u00E2\u20AC\u201D': '-', // em dash
  '\u00E2\u20AC\u00A2': '•', // bullet
  '\u00E2\u20AC\u00A6': '…'  // ellipsis
};

function fixFileFromGit(filePath, commitHash) {
  try {
    // Read the file as it existed in the previous commit
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const contentBuffer = execSync(`git show ${commitHash}:${relativePath}`);
    let content = contentBuffer.toString('utf8');
    
    let changed = false;
    for (const [bad, good] of Object.entries(replacements)) {
      if (content.includes(bad)) {
        content = content.split(bad).join(good);
        changed = true;
      }
    }
    
    // Always write back the fixed content to overwrite the broken one
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Restored and fixed: ${relativePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

// Only the edexcel_medicine data.js files were affected in the last commit
fixFileFromGit(path.join(rootDir, 'edexcel_medicine', 'data.js'), '38d268d');
fixFileFromGit(path.join(unitsDir, 'edexcel_medicine', 'data.js'), '38d268d');
