const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');

for (let i = 1; i <= 10; i++) {
  const numStr = i < 10 ? '0' + i : '' + i;
  const file = fs
    .readdirSync(dir)
    .find((f) => f.startsWith('lesson_' + numStr) && f.endsWith('.html'));
  const html = fs.readFileSync(path.join(dir, file), 'utf8');
  console.log(`\n========================================`);
  console.log(`LESSON ${i} (${file})`);

  // Task 1
  const t1 = html.match(
    /class="task-card-expand p1-task1"[\s\S]*?<div class="task-header">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="task-card-expand p1-task2")/,
  );
  if (t1) {
    console.log(
      '--- TASK 1: ' +
        t1[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
    );
    const prompts = t1[2].match(
      /<p class="evidence-q-text">[\s\S]*?<\/p>|<div class="evidence-prompt-label">[\s\S]*?<\/div>|<span class="step-bold">[\s\S]*?<\/span>/g,
    );
    if (prompts) prompts.forEach((p) => console.log('   * ' + p.replace(/<[^>]+>/g, '').trim()));
  }

  // Task 2
  const t2 = html.match(
    /class="task-card-expand p1-task2"[\s\S]*?<div class="task-header">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="sheet-footer")/,
  );
  if (t2) {
    console.log(
      '--- TASK 2: ' +
        t2[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
    );
    const steps = t2[2].match(/<span class="step-bold">[\s\S]*?<\/span>/g);
    if (steps) steps.forEach((s) => console.log('   * ' + s.replace(/<[^>]+>/g, '').trim()));
  }

  // Task 3
  const t3 = html.match(
    /class="task-card-expand p2-task3"[\s\S]*?<div class="task-header">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="task-card-expand p2-task4")/,
  );
  if (t3) {
    console.log(
      '--- TASK 3: ' +
        t3[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
    );
  }

  // Task 4
  const t4 = html.match(
    /class="task-card-expand p2-task4"[\s\S]*?<div class="task-header">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="task-card-expand p2-task5")/,
  );
  if (t4) {
    console.log(
      '--- TASK 4: ' +
        t4[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
    );
    const heads = t4[2].match(/<span class="head-name">[\s\S]*?<\/span>/g);
    if (heads) heads.forEach((h) => console.log('   * ' + h.replace(/<[^>]+>/g, '').trim()));
  }

  // Task 5
  const t5 = html.match(
    /class="task-card-expand p2-task5"[\s\S]*?<div class="task-header">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="sheet-footer")/,
  );
  if (t5) {
    console.log(
      '--- TASK 5: ' +
        t5[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
    );
    const bigQ = t5[2].match(
      /Big Question:[\s\S]*?<\/p>|<p class="synthesis-header">[\s\S]*?<\/p>/,
    );
    if (bigQ)
      console.log(
        '   * ' +
          bigQ[0]
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim(),
      );
  }
}
