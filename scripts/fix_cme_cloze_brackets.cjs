/**
 * scripts/fix_cme_cloze_brackets.cjs
 *
 * Replaces numbered blanks ____(N)____ in cme_new KT2 lessons with [bracketed vocab terms]
 * matching the canonical vocab array.
 */

const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '..', 'public', 'data', 'cme_new.json'),
  path.join(__dirname, '..', 'data', 'cme_new.json'),
];

targetFiles.forEach((fp) => {
  if (fs.existsSync(fp)) {
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const lessons = data.data?.lessons || data.lessons || [];

    for (let i = 4; i < 9; i++) {
      const l = lessons[i];
      if (l && l.vocab_cloze_text && l.vocab) {
        let text = l.vocab_cloze_text;
        l.vocab.forEach((v, vIdx) => {
          const num = vIdx + 1;
          const blankPattern = new RegExp(`____\\(${num}\\)____`, 'g');
          text = text.replace(blankPattern, `[${v.term}]`);
        });
        l.vocab_cloze_text = text;
      }
    }

    fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
    console.log(`  ✔ Injected bracketed terms into ${fp}`);
  }
});

// Update units/cme_new/data.js
const unitJs = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
if (fs.existsSync(unitJs)) {
  const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
  const unitObj = pubData.data || pubData;
  fs.writeFileSync(unitJs, `export default ${JSON.stringify(unitObj, null, 2)};\n`, 'utf8');
  console.log(`  ✔ Synchronized units/cme_new/data.js`);
}

console.log('✅ CME KT2 Cloze brackets updated.');
