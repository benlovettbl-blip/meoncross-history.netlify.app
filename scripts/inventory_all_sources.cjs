const fs = require('fs');
const path = require('path');

const wsDir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
const files = fs
  .readdirSync(wsDir)
  .filter((f) => f.startsWith('lesson_') && f.endsWith('.html'))
  .sort();

console.log('Found', files.length, 'worksheets.\n');

files.forEach((f, idx) => {
  const content = fs.readFileSync(path.join(wsDir, f), 'utf8');
  console.log(`================================================================`);
  console.log(`LESSON ${idx + 1}: ${f}`);
  console.log(`================================================================`);

  // Title
  const titleMatch = content.match(/<h1>([^<]+)<\/h1>/);
  console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');

  // Source A
  const srcAMatch = content.match(/<p class="archival-caption">([\s\S]*?)<\/p>/);
  console.log('Source A Caption:', srcAMatch ? srcAMatch[1].replace(/\s+/g, ' ').trim() : 'N/A');

  // Task 1 Title
  const task1TitleMatch =
    content.match(/Task 1:[^<•]+•?([^<]+)<\/span>/i) || content.match(/Task 1:[^<]+/i);
  console.log(
    'Task 1 Title:',
    task1TitleMatch ? task1TitleMatch[0].replace(/\s+/g, ' ').trim() : 'N/A',
  );

  // Source B
  const srcBMatch = content.match(/<p class="artifact-caption">([\s\S]*?)<\/p>/);
  console.log('Source B Caption:', srcBMatch ? srcBMatch[1].replace(/\s+/g, ' ').trim() : 'N/A');

  // Task 1 Questions
  const qMatches = [...content.matchAll(/<p class="q-item">([\s\S]*?)<\/p>/g)];
  qMatches.forEach((q, qIdx) => {
    console.log(`Question ${qIdx + 1}:`, q[1].replace(/\s+/g, ' ').trim());
  });

  console.log('\n');
});
