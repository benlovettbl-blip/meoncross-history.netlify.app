import fs from 'fs';
import path from 'path';

const extractUnitsPath = 'c:/Projects/meoncross-history.netlify.app/extract_units.js';
let content = fs.readFileSync(extractUnitsPath, 'utf8');

const oldCopyStyles = `    // Copy styles
    const sourceStyles = path.join(sourceDir, 'styles.css');
    if (fs.existsSync(sourceStyles)) {
      fs.copyFileSync(sourceStyles, path.join(unitTargetDir, 'styles.css'));
    }`;

const newCopyStyles = `    // Copy styles
    const sourceStyles = path.join(sourceDir, 'styles.css');
    if (fs.existsSync(sourceStyles)) {
      fs.copyFileSync(sourceStyles, path.join(unitTargetDir, 'styles.css'));
    }

    // Copy extra HTML tools (Quiz Pack, Workbooks, Answer Keys)
    ['quiz_pack.html', 'workbook.html', 'answer_key.html'].forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, path.join(unitTargetDir, file));
      }
    });`;

content = content.replace(oldCopyStyles, newCopyStyles);
fs.writeFileSync(extractUnitsPath, content, 'utf8');
console.log("Patched extract_units.js");
