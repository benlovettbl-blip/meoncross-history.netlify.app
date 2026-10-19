const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.html'))
  .sort();

files.forEach((f) => {
  console.log('=== ' + f + ' ===');
  const content = fs.readFileSync(path.join(dir, f), 'utf8');

  // Extract Source A caption
  const srcAMatch = content.match(/<p class="archival-caption">([\s\S]*?)<\/p>/);
  if (srcAMatch) {
    console.log('SOURCE A CAPTION: ' + srcAMatch[1].replace(/<[^>]+>/g, '').trim());
  } else {
    console.log('SOURCE A: NOT FOUND');
  }

  // Extract Source B caption
  const srcBMatch = content.match(/<p class="(?:tag-caption|artifact-caption)">([\s\S]*?)<\/p>/);
  if (srcBMatch) {
    console.log('SOURCE B CAPTION: ' + srcBMatch[1].replace(/<[^>]+>/g, '').trim());
  } else {
    console.log('SOURCE B: NOT FOUND');
  }

  // Extract detective questions
  const qMatches = [...content.matchAll(/<p class="q-item"[^>]*>([\s\S]*?)<\/p>/g)];
  qMatches.slice(0, 2).forEach((qm, idx) => {
    console.log('Q' + (idx + 1) + ': ' + qm[1].replace(/<[^>]+>/g, '').trim());
  });
  console.log('');
});
